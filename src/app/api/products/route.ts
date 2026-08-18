import { NextRequest } from 'next/server';
import { inventoryService } from '@/services/inventoryService';
import { paginatedResponse, errorResponse } from '@/utils/apiResponse';
import { ProductFilters } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: ProductFilters = {
      category: searchParams.get('category') || undefined,
      status: (searchParams.get('status') as any) || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.has('page') ? Number(searchParams.get('page')) : 1,
      limit: searchParams.has('limit') ? Number(searchParams.get('limit')) : 20,
      sortBy: (searchParams.get('sortBy') as any) || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc',
    };

    const result = await inventoryService.getProducts(filters);

    return paginatedResponse(
      result.products,
      result.total,
      result.page,
      result.limit,
      'Products retrieved successfully'
    );
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch products', 500);
  }
}
