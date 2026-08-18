import { NextResponse } from 'next/server';
import { auditService } from '@/services/auditService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const logs = auditService.getLogs(limit);

    return NextResponse.json({
      success: true,
      data: logs,
      meta: { total: logs.length },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch audit log' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.user || !body.action || !body.reason) {
      return NextResponse.json(
        { success: false, error: 'user, action, and reason are required' },
        { status: 400 }
      );
    }

    const newLog = auditService.logAction({
      user: body.user,
      role: body.role || 'USER',
      action: body.action,
      decisionId: body.decisionId,
      previousState: body.previousState,
      newState: body.newState,
      reason: body.reason,
      source: body.source || 'CLIENT_AUDIT',
      approvalStatus: body.approvalStatus || 'LOGGED',
    });

    return NextResponse.json({
      success: true,
      data: newLog,
      message: 'Action logged to immutable audit trail',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create audit log entry' },
      { status: 500 }
    );
  }
}
