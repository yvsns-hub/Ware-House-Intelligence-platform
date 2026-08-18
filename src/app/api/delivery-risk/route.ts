import { NextResponse } from 'next/server';
import { deliveryRiskService } from '@/services/deliveryRiskService';
import { mockOrders } from '@/data/mockData';

export async function GET(request: Request) {
  try {
    const risks = deliveryRiskService.evaluateAllOrders(mockOrders);

    return NextResponse.json({
      success: true,
      data: risks,
      meta: {
        total: risks.length,
        criticalCount: risks.filter((r) => r.riskLevel === 'CRITICAL').length,
        highCount: risks.filter((r) => r.riskLevel === 'HIGH').length,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to calculate delivery risk' },
      { status: 500 }
    );
  }
}
