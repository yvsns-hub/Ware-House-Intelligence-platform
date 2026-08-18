import { NextResponse } from 'next/server';
import { supplierService } from '@/services/supplierService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const suppliers = category
      ? supplierService.getSuppliersByCategory(category)
      : supplierService.getSuppliers();

    return NextResponse.json({
      success: true,
      data: suppliers,
      meta: { total: suppliers.length },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch suppliers' },
      { status: 500 }
    );
  }
}
