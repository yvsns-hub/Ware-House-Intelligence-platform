import { z } from 'zod';

export const createOrderSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  customerTier: z.enum(['Platinum', 'Gold', 'Silver', 'Standard']).optional().default('Standard'),
  priority: z.enum(['URGENT', 'HIGH', 'MEDIUM', 'LOW']).optional().default('MEDIUM'),
  shippingType: z.enum(['Express', 'SameDay', 'Standard', 'Freight']).optional().default('Standard'),
  deliveryDeadline: z.string().datetime().or(z.string().min(10)),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'Product ID is required'),
        quantity: z.number().int().positive('Quantity must be positive'),
      })
    )
    .min(1, 'Order must contain at least one item'),
});

export const updateOrderSchema = z.object({
  status: z
    .enum(['PENDING', 'PROCESSING', 'PICKED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
    .optional(),
  priority: z.enum(['URGENT', 'HIGH', 'MEDIUM', 'LOW']).optional(),
  shippingType: z.enum(['Express', 'SameDay', 'Standard', 'Freight']).optional(),
  deliveryDeadline: z.string().datetime().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().optional(),
  description: z.string().optional().nullable(),
  stock: z.number().int().nonnegative().optional(),
  reservedStock: z.number().int().nonnegative().optional(),
  damagedStock: z.number().int().nonnegative().optional(),
  reorderLevel: z.number().int().positive().optional(),
  supplier: z.string().optional(),
  warehouseLocation: z.string().optional(),
  unitPrice: z.number().positive().optional(),
  demandScore: z.number().min(0).max(10).optional(),
});

export const aiAnalyzeSchema = z.object({
  query: z.string().optional(),
  context: z.enum(['inventory', 'orders', 'workforce', 'bottlenecks', 'general']).optional(),
  parameters: z.record(z.any()).optional(),
});
