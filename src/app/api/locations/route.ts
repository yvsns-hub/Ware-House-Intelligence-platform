import { NextRequest } from 'next/server';
import { warehouseService } from '@/services/warehouseService';
import { successResponse, errorResponse } from '@/utils/apiResponse';
import { LocationFilters } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: LocationFilters = {
      zone: searchParams.get('zone') || undefined,
      aisle: searchParams.get('aisle') || undefined,
    };

    const locations = await warehouseService.getLocations(filters);

    return successResponse(locations, 'Warehouse locations retrieved successfully', {
      total: locations.length,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch warehouse locations', 500);
  }
}
