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

    if (body.stockAction && body.quantity !== undefined) {
      const updated = await inventoryService.updateStock(id, Number(body.quantity), body.stockAction);
      return successResponse(updated, 'Stock updated successfully');
    }

    const updatedProduct = await inventoryService.updateProduct(id, body);
    return successResponse(updatedProduct, 'Product updated successfully');
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to update product', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await inventoryService.deleteProduct(id);
    if (!deleted) {
      return errorResponse(`Product with ID '${id}' could not be deleted`, 404);
    }

    return successResponse({ id }, 'Product deleted successfully');
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to delete product', 500);
  }
}
