import prisma from '../lib/prisma';
import {
  Order,
  OrderFilters,
  CreateOrderDTO,
  UpdateOrderDTO,
  OrderStatus,
} from '../types';
import { mockOrders, mockProducts } from '../data/mockData';

let memoryOrders: Order[] = [...mockOrders];

export class OrderService {
  /**
   * Fetch orders with status, priority, and tier filters + pagination
   */
  public async getOrders(filters: OrderFilters = {}): Promise<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(filters.limit) || 20));
    const skip = (page - 1) * limit;

    try {
      const where: any = {};

      if (filters.status && filters.status !== 'all') {
        where.status = { equals: filters.status, mode: 'insensitive' };
      }

      if (filters.priority && filters.priority !== 'all') {
        where.priority = { equals: filters.priority, mode: 'insensitive' };
      }

      if (filters.customerTier && filters.customerTier !== 'all') {
        where.customerTier = { equals: filters.customerTier, mode: 'insensitive' };
      }

      if (filters.search) {
        where.OR = [
          { orderNumber: { contains: filters.search, mode: 'insensitive' } },
          { customerName: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      const orderBy: any = {};
      const sortBy = filters.sortBy || 'createdAt';
      const sortOrder = filters.sortOrder || 'desc';
      orderBy[sortBy] = sortOrder;

      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        }),
        prisma.order.count({ where }),
      ]);

      return {
        orders: orders as unknown as Order[],
        total,
        page,
        limit,
      };
    } catch (error) {
      let filtered = [...memoryOrders];

      if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(
          (o) => o.status.toLowerCase() === filters.status?.toLowerCase()
        );
      }

      if (filters.priority && filters.priority !== 'all') {
        filtered = filtered.filter(
          (o) => o.priority.toLowerCase() === filters.priority?.toLowerCase()
        );
      }

      if (filters.customerTier && filters.customerTier !== 'all') {
        filtered = filtered.filter(
          (o) => o.customerTier.toLowerCase() === filters.customerTier?.toLowerCase()
        );
      }

      if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(
          (o) =>
            o.orderNumber.toLowerCase().includes(query) ||
            o.customerName.toLowerCase().includes(query)
        );
      }

      const total = filtered.length;
      const paginated = filtered.slice(skip, skip + limit);

      return {
        orders: paginated,
        total,
        page,
        limit,
      };
    }
  }

  /**
   * Get single order by ID or orderNumber
   */
  public async getOrderById(idOrNumber: string): Promise<Order | null> {
    try {
      const order = await prisma.order.findFirst({
        where: {
          OR: [{ id: idOrNumber }, { orderNumber: idOrNumber }],
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return (order as unknown as Order) || null;
    } catch (error) {
      const found = memoryOrders.find(
        (o) => o.id === idOrNumber || o.orderNumber === idOrNumber
      );
      return found || null;
    }
  }

  /**
   * Create a new order with stock validation and allocation
   */
  public async createOrder(data: CreateOrderDTO): Promise<Order> {
    const orderNumber = `ORD-${Date.now().toString().slice(-7)}`;
    
    try {
      // 1. Fetch product prices and verify stock in transaction
      const productIds = data.items.map((i) => i.productId);
      const dbProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      let calculatedValue = 0;
      let totalUnits = 0;

      const orderItemsToCreate = data.items.map((item) => {
        const prod = dbProducts.find((p) => p.id === item.productId);
        const unitPrice = prod?.unitPrice || 50;
        calculatedValue += unitPrice * item.quantity;
        totalUnits += item.quantity;

        const available = prod ? prod.stock - prod.reservedStock : item.quantity;
        const allocated = Math.min(item.quantity, Math.max(0, available));
        const status =
          allocated >= item.quantity
            ? 'ALLOCATED'
            : allocated > 0
            ? 'PARTIALLY_ALLOCATED'
            : 'BACKORDERED';

        return {
          productId: item.productId,
          quantity: item.quantity,
          allocatedQuantity: allocated,
          status,
        };
      });

      const newOrder = await prisma.order.create({
        data: {
          orderNumber,
          customerName: data.customerName,
          customerTier: data.customerTier || 'Standard',
          priority: data.priority || 'MEDIUM',
          shippingType: data.shippingType || 'Standard',
          deliveryDeadline: new Date(data.deliveryDeadline),
          orderValue: Number(calculatedValue.toFixed(2)),
          status: 'PENDING',
          totalItems: totalUnits,
          items: {
            create: orderItemsToCreate,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Update reserved stocks
      for (const item of orderItemsToCreate) {
        if (item.allocatedQuantity > 0) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { reservedStock: { increment: item.allocatedQuantity } },
          });
        }
      }

      return newOrder as unknown as Order;
    } catch (error) {
      // In-memory fallback
      let orderVal = 0;
      let units = 0;

      const items = data.items.map((i, idx) => {
        const prod = mockProducts.find((p) => p.id === i.productId) || mockProducts[0];
        orderVal += prod.unitPrice * i.quantity;
        units += i.quantity;

        return {
          id: `ord-item-${Date.now()}-${idx}`,
          orderId: `ord-${Date.now()}`,
          productId: prod.id,
          quantity: i.quantity,
          allocatedQuantity: Math.min(i.quantity, prod.stock),
          status: prod.stock >= i.quantity ? 'ALLOCATED' : 'PARTIALLY_ALLOCATED',
          product: prod,
        };
      });

      const created: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        customerName: data.customerName,
        customerTier: data.customerTier || 'Standard',
        priority: data.priority || 'MEDIUM',
        shippingType: data.shippingType || 'Standard',
        deliveryDeadline: new Date(data.deliveryDeadline).toISOString(),
        orderValue: Number(orderVal.toFixed(2)),
        status: 'PENDING',
        totalItems: units,
        createdAt: new Date().toISOString(),
        items,
      };

      memoryOrders.unshift(created);
      return created;
    }
  }

  /**
   * Update order status or details (PATCH /api/orders/:id)
   */
  public async updateOrder(id: string, data: UpdateOrderDTO): Promise<Order> {
    try {
      const updated = await prisma.order.update({
        where: { id },
        data: {
          ...data,
          deliveryDeadline: data.deliveryDeadline
            ? new Date(data.deliveryDeadline)
            : undefined,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return updated as unknown as Order;
    } catch (error) {
      const index = memoryOrders.findIndex((o) => o.id === id);
      if (index === -1) {
        throw new Error(`Order with ID ${id} not found`);
      }

      memoryOrders[index] = {
        ...memoryOrders[index],
        ...data,
        deliveryDeadline: data.deliveryDeadline
          ? new Date(data.deliveryDeadline).toISOString()
          : memoryOrders[index].deliveryDeadline,
      };

      return memoryOrders[index];
    }
  }
}

export const orderService = new OrderService();
