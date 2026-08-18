import { NextResponse } from 'next/server';
import { workforceOptimizationService } from '@/services/workforceOptimizationService';

export async function GET(request: Request) {
  try {
    const plan = workforceOptimizationService.getCurrentPlan();

    return NextResponse.json({
      success: true,
      data: plan,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch workforce plan' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, planId, user } = body;

    if (action === 'APPROVE' && planId) {
      workforceOptimizationService.approvePlan(planId, user || 'Operations Manager');
      return NextResponse.json({
        success: true,
        message: 'Workforce allocation plan approved and scheduled for dispatch.',
      });
    }

    const newPlan = workforceOptimizationService.generateAllocationPlan();
    return NextResponse.json({
      success: true,
      data: newPlan,
      message: 'New workforce allocation plan generated.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process workforce action' },
      { status: 500 }
    );
  }
}
