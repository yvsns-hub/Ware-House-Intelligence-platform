import { NextRequest } from 'next/server';
import { warehouseService } from '@/services/warehouseService';
import { successResponse, errorResponse } from '@/utils/apiResponse';
import { EmployeeFilters } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: EmployeeFilters = {
      role: searchParams.get('role') || undefined,
      shift: searchParams.get('shift') || undefined,
      minEfficiency: searchParams.has('minEfficiency')
        ? Number(searchParams.get('minEfficiency'))
        : undefined,
    };

    const employees = await warehouseService.getEmployees(filters);

    return successResponse(employees, 'Employees retrieved successfully', {
      total: employees.length,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch employees', 500);
  }
}
