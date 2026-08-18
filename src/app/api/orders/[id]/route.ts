import { NextRequest } from 'next/server';
import { orderService } from '@/services/orderService';
import { successResponse, errorResponse } from '@/utils/apiResponse';
import { updateOrderSchema } from '@/utils/validation';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await orderService.getOrderById(id);

    if (!order) {
      return errorResponse(`Order with ID '${id}' not found`, 404);
    }

    return successResponse(order, 'Order retrieved successfully');
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch order', 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = updateOrderSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse('Validation failed', 422, validation.error.flatten().fieldErrors);
    }

    const updatedOrder = await orderService.updateOrder(id, validation.data);

    return successResponse(updatedOrder, 'Order updated successfully');
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to update order', 500);
  }
}
