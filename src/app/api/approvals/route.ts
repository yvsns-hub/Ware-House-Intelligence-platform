import { NextResponse } from 'next/server';
import { approvalService } from '@/services/approvalService';
import { DecisionStatus } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get('status') as DecisionStatus) || undefined;
    const decisions = approvalService.getPendingDecisions(status);

    return NextResponse.json({
      success: true,
      data: decisions,
      meta: { total: decisions.length },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch approval decisions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { decisionId, action, user, role, notes } = body;

    if (!decisionId || !action) {
      return NextResponse.json(
        { success: false, error: 'decisionId and action (APPROVE|REJECT|MODIFY) are required' },
        { status: 400 }
      );
    }

    const result = approvalService.processDecision(
      decisionId,
      action,
      user || 'Operations Manager',
      role || 'MANAGER',
      notes || ''
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Decision not found or could not be processed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.decision,
      audit: result.auditEntry,
      message: `Decision successfully ${action.toLowerCase()}ed and logged to immutable audit trail.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process decision' },
      { status: 500 }
    );
  }
}
