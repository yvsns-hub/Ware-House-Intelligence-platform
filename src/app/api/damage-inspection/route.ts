import { NextResponse } from 'next/server';
import { damageInspectionService } from '@/services/damageInspectionService';

export async function GET(request: Request) {
  try {
    const records = damageInspectionService.getInspections();
    return NextResponse.json({
      success: true,
      data: records,
      meta: { total: records.length },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch damage inspections' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sku, productName, overrideDamageType } = body;

    if (!sku || !productName) {
      return NextResponse.json(
        { success: false, error: 'sku and productName are required' },
        { status: 400 }
      );
    }

    const result = damageInspectionService.analyzePackageImage({
      sku,
      productName,
      overrideDamageType,
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Damage inspection completed via computer vision simulation model.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process damage inspection' },
      { status: 500 }
    );
  }
}
