import { PrismaClient } from '@prisma/client';
import {
  mockProducts,
  mockOrders,
  mockEmployees,
  mockWarehouseLocations,
  mockTransactions,
} from '../src/data/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Warehouse Decision Intelligence Database Seed...');

  // Clear existing records in reverse dependency order
  console.log('🧹 Cleaning existing data...');
  try {
    await prisma.inventoryTransaction.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.warehouseEmployee.deleteMany();
    await prisma.warehouseLocation.deleteMany();
  } catch (error) {
    console.warn('⚠️ Note: Tables might be empty or initializing for the first time.');
  }

  // 1. Seed Warehouse Locations (40)
  console.log(`📍 Seeding ${mockWarehouseLocations.length} Warehouse Locations...`);
  for (const loc of mockWarehouseLocations) {
    await prisma.warehouseLocation.create({
      data: {
        id: loc.id,
        aisle: loc.aisle,
        rack: loc.rack,
        shelf: loc.shelf,
        zone: loc.zone,
      },
    });
  }

  // 2. Seed Warehouse Employees (20)
  console.log(`👷 Seeding ${mockEmployees.length} Warehouse Employees...`);
  for (const emp of mockEmployees) {
    await prisma.warehouseEmployee.create({
      data: {
        id: emp.id,
        name: emp.name,
        role: emp.role,
        efficiencyScore: emp.efficiencyScore,
        activeOrders: emp.activeOrders,
        shift: emp.shift,
      },
    });
  }

  // 3. Seed Products (100)
  console.log(`📦 Seeding ${mockProducts.length} Products...`);
  for (const prod of mockProducts) {
    await prisma.product.create({
      data: {
        id: prod.id,
        sku: prod.sku,
        name: prod.name,
        category: prod.category,
        description: prod.description,
        stock: prod.stock,
        reservedStock: prod.reservedStock,
        damagedStock: prod.damagedStock,
        reorderLevel: prod.reorderLevel,
        supplier: prod.supplier,
        warehouseLocation: prod.warehouseLocation,
        unitPrice: prod.unitPrice,
        demandScore: prod.demandScore,
        createdAt: new Date(prod.createdAt),
        updatedAt: new Date(prod.updatedAt),
      },
    });
  }

  // 4. Seed Orders & OrderItems (50 Orders)
  console.log(`🛒 Seeding ${mockOrders.length} Orders with OrderItems...`);
  for (const ord of mockOrders) {
    await prisma.order.create({
      data: {
        id: ord.id,
        orderNumber: ord.orderNumber,
        customerName: ord.customerName,
        customerTier: ord.customerTier,
        priority: ord.priority,
        shippingType: ord.shippingType,
        deliveryDeadline: new Date(ord.deliveryDeadline),
        orderValue: ord.orderValue,
        status: ord.status,
        totalItems: ord.totalItems,
        createdAt: new Date(ord.createdAt),
        items: {
          create: (ord.items || []).map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            allocatedQuantity: item.allocatedQuantity,
            status: item.status,
          })),
        },
      },
    });
  }

  // 5. Seed Inventory Transactions
  console.log(`🔄 Seeding ${mockTransactions.length} Inventory Transactions...`);
  for (const tx of mockTransactions) {
    await prisma.inventoryTransaction.create({
      data: {
        id: tx.id,
        productId: tx.productId,
        quantity: tx.quantity,
        type: tx.type,
        timestamp: new Date(tx.timestamp),
      },
    });
  }

  console.log('✅ Database seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
