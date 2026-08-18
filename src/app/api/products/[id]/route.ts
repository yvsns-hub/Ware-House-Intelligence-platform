import { NextRequest } from 'next/server';
import { inventoryService } from '@/services/inventoryService';
import { successResponse, errorResponse } from '@/utils/apiResponse';
import { updateProductSchema } from '@/utils/validation';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await inventoryService.getProductById(id);

    if (!product) {
      return errorResponse(`Product with ID '${id}' not found`, 404);
    }

    return successResponse(product, 'Product retrieved successfully');
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch product', 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = updateProductSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse('Validation failed', 422, validation.error.flatten().fieldErrors);
    }

    const updatedProduct = await inventoryService.updateProduct(id, validation.data);

    return successResponse(updatedProduct, 'Product updated successfully');
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to update product', 500);
  }
}
