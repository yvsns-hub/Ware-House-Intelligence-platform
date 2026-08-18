import { NextResponse } from 'next/server';
import { eventIntelligenceService } from '@/services/eventIntelligenceService';
import { EventSeverity, EventStatus } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const warehouseId = searchParams.get('warehouseId') || undefined;
    const severity = (searchParams.get('severity') as EventSeverity) || undefined;
    const status = (searchParams.get('status') as EventStatus) || undefined;

    const events = await eventIntelligenceService.getEvents(warehouseId, severity, status);

    return NextResponse.json({
      success: true,
      data: events,
      meta: {
        total: events.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch warehouse events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.eventType || !body.description) {
      return NextResponse.json(
        { success: false, error: 'eventType and description are required' },
        { status: 400 }
      );
    }

    const newEvent = eventIntelligenceService.recordEvent({
      eventType: body.eventType,
      severity: body.severity || 'INFO',
      warehouseId: body.warehouseId || 'hub-01',
      productId: body.productId,
      orderId: body.orderId,
      description: body.description,
      metadata: body.metadata,
      status: body.status || 'ACTIVE',
      source: body.source || 'USER_SIMULATION',
    });

    return NextResponse.json({
      success: true,
      data: newEvent,
      message: 'Event recorded successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create event' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { eventId, status } = body;

    if (!eventId || !status) {
      return NextResponse.json(
        { success: false, error: 'eventId and status are required' },
        { status: 400 }
      );
    }

    const updated = eventIntelligenceService.updateEventStatus(eventId, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Event status updated to ${status}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update event status' },
      { status: 500 }
    );
  }
}
