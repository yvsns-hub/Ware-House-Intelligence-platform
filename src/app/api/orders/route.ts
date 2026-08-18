import { NextRequest } from 'next/server';
import { orderService } from '@/services/orderService';
import { paginatedResponse, successResponse, errorResponse } from '@/utils/apiResponse';
import { createOrderSchema } from '@/utils/validation';
import { OrderFilters } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: OrderFilters = {
      status: searchParams.get('status') || undefined,
      priority: searchParams.get('priority') || undefined,
      customerTier: searchParams.get('customerTier') || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.has('page') ? Number(searchParams.get('page')) : 1,
      limit: searchParams.has('limit') ? Number(searchParams.get('limit')) : 20,
      sortBy: (searchParams.get('sortBy') as any) || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc',
    };

    const result = await orderService.getOrders(filters);

    return paginatedResponse(
      result.orders,
      result.total,
      result.page,
      result.limit,
      'Orders retrieved successfully'
    );
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch orders', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = createOrderSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse('Validation failed', 422, validation.error.flatten().fieldErrors);
    }

    const newOrder = await orderService.createOrder(validation.data);

    return successResponse(newOrder, 'Order created successfully', undefined, 201);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to create order', 500);
  }
}
