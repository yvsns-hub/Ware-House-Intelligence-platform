import { NextRequest } from 'next/server';
import { warehouseService } from '@/services/warehouseService';
import { successResponse, errorResponse } from '@/utils/apiResponse';

export async function GET(request: NextRequest) {
  try {
    const summary = await warehouseService.getDashboardSummary();
    return successResponse(summary, 'Dashboard metrics retrieved successfully');
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to generate dashboard metrics', 500);
  }
}
