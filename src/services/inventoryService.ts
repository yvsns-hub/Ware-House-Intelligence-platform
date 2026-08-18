import prisma from '../lib/prisma';
import {
  Product,
  ProductFilters,
  UpdateProductDTO,
  InventoryTransaction,
  InventoryTransactionType,
} from '../types';
import { mockProducts, mockTransactions } from '../data/mockData';

// In-memory fallback store with globalThis persistence across Next.js reloads
declare global {
  var __warehouseiq_products: Product[] | undefined;
  var __warehouseiq_transactions: InventoryTransaction[] | undefined;
}

if (!globalThis.__warehouseiq_products) {
  globalThis.__warehouseiq_products = [...mockProducts];
}
if (!globalThis.__warehouseiq_transactions) {
  globalThis.__warehouseiq_transactions = [...mockTransactions];
}

const getMemoryProducts = (): Product[] => globalThis.__warehouseiq_products!;
const getMemoryTransactions = (): InventoryTransaction[] => globalThis.__warehouseiq_transactions!;

export class InventoryService {
  /**
   * Fetch products with multi-criteria filtering, hub isolation, and pagination
   */
  public async getProducts(filters: ProductFilters = {}): Promise<{
    products: Product[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(filters.limit) || 20));
    const skip = (page - 1) * limit;

    try {
      // Build Prisma query condition
      const where: any = {};

      if (filters.category && filters.category !== 'all') {
        where.category = { equals: filters.category, mode: 'insensitive' };
      }

      if (filters.warehouseId && filters.warehouseId !== 'all') {
        where.warehouseId = { equals: filters.warehouseId };
      }

      if (filters.search) {
        where.OR = [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { sku: { contains: filters.search, mode: 'insensitive' } },
          { supplier: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      if (filters.status === 'out_of_stock') {
        where.stock = 0;
      } else if (filters.status === 'low_stock') {
        where.stock = { gt: 0, lte: prisma.product.fields?.reorderLevel || 20 };
      } else if (filters.status === 'damaged') {
        where.damagedStock = { gt: 0 };
      }

      const orderBy: any = {};
      const sortBy = filters.sortBy || 'createdAt';
      const sortOrder = filters.sortOrder || 'desc';
      orderBy[sortBy] = sortOrder;

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: {
            inventoryTransactions: {
              take: 5,
              orderBy: { timestamp: 'desc' },
            },
          },
        }),
        prisma.product.count({ where }),
      ]);

      return {
        products: products as unknown as Product[],
        total,
        page,
        limit,
      };
    } catch (error) {
      // Fallback to in-memory dataset with full hub isolation support
      let filtered = [...getMemoryProducts()];

      if (filters.warehouseId && filters.warehouseId !== 'all') {
        filtered = filtered.filter((p) => (p.warehouseId || 'hub-01') === filters.warehouseId);
      }

      if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === filters.category?.toLowerCase()
        );
      }

      if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.sku.toLowerCase().includes(query) ||
            p.supplier.toLowerCase().includes(query)
        );
      }

      if (filters.status === 'out_of_stock') {
        filtered = filtered.filter((p) => p.stock === 0);
      } else if (filters.status === 'low_stock') {
        filtered = filtered.filter((p) => p.stock > 0 && p.stock <= p.reorderLevel);
      } else if (filters.status === 'damaged') {
        filtered = filtered.filter((p) => p.damagedStock > 0);
      }

      const total = filtered.length;
      const paginated = filtered.slice(skip, skip + limit);

      return {
        products: paginated,
        total,
        page,
        limit,
      };
    }
  }

  /**
   * Get single product by ID or SKU with transaction history
   */
  public async getProductById(idOrSku: string): Promise<Product | null> {
    try {
      const product = await prisma.product.findFirst({
        where: {
          OR: [{ id: idOrSku }, { sku: idOrSku }],
        },
        include: {
          inventoryTransactions: {
            orderBy: { timestamp: 'desc' },
            take: 10,
          },
        },
      });

      return (product as unknown as Product) || null;
    } catch (error) {
      const found = getMemoryProducts().find(
        (p) => p.id === idOrSku || p.sku === idOrSku
      );
      if (!found) return null;

      const txs = getMemoryTransactions().filter((t) => t.productId === found.id);
      return {
        ...found,
        inventoryTransactions: txs,
      };
    }
  }

  /**
   * Create a new product
   */
  public async createProduct(data: Partial<Product>): Promise<Product> {
    const newId = `prod-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      id: newId,
      sku: data.sku || `SKU-GEN-${Date.now().toString().slice(-4)}`,
      name: data.name || 'New Product Item',
      category: data.category || 'Electronics',
      description: data.description || '',
      stock: Number(data.stock) || 0,
      reservedStock: Number(data.reservedStock) || 0,
      damagedStock: Number(data.damagedStock) || 0,
      reorderLevel: Number(data.reorderLevel) || 15,
      supplier: data.supplier || 'Apex Supply Network',
      warehouseLocation: data.warehouseLocation || 'Standard [E-01-1]',
      warehouseId: data.warehouseId || 'hub-01',
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      unitPrice: Number(data.unitPrice) || 49.99,
      demandScore: Number(data.demandScore) || 7.5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Always update in-memory store so it reflects immediately
    getMemoryProducts().unshift(newProduct);

    try {
      const { orderItems, inventoryTransactions, ...productPayload } = newProduct;
      const created = await prisma.product.create({
        data: {
          ...productPayload,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any,
      });
      return created as unknown as Product;
    } catch {
      return newProduct;
    }
  }

  /**
   * Delete a product by ID
   */
  public async deleteProduct(id: string): Promise<boolean> {
    const prods = getMemoryProducts();
    const idx = prods.findIndex((p) => p.id === id);
    if (idx !== -1) prods.splice(idx, 1);

    try {
      await prisma.product.delete({ where: { id } });
      return true;
    } catch {
      return idx !== -1;
    }
  }

  /**
   * Update product attributes, stock levels, or location
   */
  public async updateProduct(id: string, data: UpdateProductDTO): Promise<Product> {
    // Update in-memory store directly
    const prods = getMemoryProducts();
    const index = prods.findIndex((p) => p.id === id);
    if (index !== -1) {
      prods[index] = {
        ...prods[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
    }

    try {
      const updated = await prisma.product.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        } as any,
      });

      return updated as unknown as Product;
    } catch (error) {
      if (index === -1) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return prods[index];
    }
  }

  /**
   * Quick update stock
   */
  public async updateStock(
    id: string,
    quantity: number,
    mode: 'set' | 'increment' | 'decrement' = 'set'
  ): Promise<Product> {
    const product = await this.getProductById(id);
    if (!product) throw new Error(`Product ${id} not found`);

    let newStock = product.stock;
    if (mode === 'set') newStock = Math.max(0, quantity);
    else if (mode === 'increment') newStock = product.stock + quantity;
    else if (mode === 'decrement') newStock = Math.max(0, product.stock - quantity);

    return this.updateProduct(id, { stock: newStock });
  }

  /**
   * Record inventory transaction (Inbound, Outbound, Damaged, Adjusted, Transferred)
   */
  public async recordTransaction(
    productId: string,
    quantity: number,
    type: InventoryTransactionType
  ): Promise<InventoryTransaction> {
    const newTx: InventoryTransaction = {
      id: `tx-${Date.now()}`,
      productId,
      quantity,
      type,
      timestamp: new Date().toISOString(),
    };

    getMemoryTransactions().unshift(newTx);
    const product = getMemoryProducts().find((p) => p.id === productId);
    if (product) {
      if (type === 'Inbound') product.stock += quantity;
      if (type === 'Outbound') product.stock = Math.max(0, product.stock - quantity);
      if (type === 'Damaged') {
        product.stock = Math.max(0, product.stock - quantity);
        product.damagedStock += quantity;
      }
    }

    try {
      const tx = await prisma.inventoryTransaction.create({
        data: {
          productId,
          quantity,
          type,
          timestamp: new Date(),
        },
      });

      // Update product stock accordingly
      if (type === 'Inbound') {
        await prisma.product.update({
          where: { id: productId },
          data: { stock: { increment: quantity } },
        });
      } else if (type === 'Outbound') {
        await prisma.product.update({
          where: { id: productId },
          data: { stock: { decrement: quantity } },
        });
      } else if (type === 'Damaged') {
        await prisma.product.update({
          where: { id: productId },
          data: {
            stock: { decrement: quantity },
            damagedStock: { increment: quantity },
          },
        });
      }

      return tx as unknown as InventoryTransaction;
    } catch (error) {
      return newTx;
    }
  }
}

export const inventoryService = new InventoryService();
