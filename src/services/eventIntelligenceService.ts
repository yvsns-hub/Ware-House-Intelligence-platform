import {
  WarehouseEvent,
  EventSeverity,
  EventType,
  EventStatus,
  Product,
  Order,
  WarehouseEmployee,
  WeatherData,
} from '@/types';
import { prisma } from '@/lib/prisma';
import { mockProducts, mockOrders, mockEmployees } from '@/data/mockData';

export class EventIntelligenceService {
  private static instance: EventIntelligenceService;

  // In-memory fallback buffer of live events (for instant reactive demo & resilient persistence)
  private memoryEvents: WarehouseEvent[] = [
    {
      id: 'evt-001',
      eventType: 'DEMAND_SPIKE',
      severity: 'CRITICAL',
      warehouseId: 'hub-01',
      productId: 'prod-01',
      orderId: 'ord-102',
      description: 'Demand spike detected for High-Performance Wireless Headphones (+47% order velocity in 4h). Stockout predicted in 9 hours.',
      metadata: {
        sku: 'ELEC-WHD-001',
        velocityIncreasePercent: 47,
        hoursToStockout: 9,
        impactedOrdersCount: 23,
        platinumCustomersAffected: 2,
        recommendedAction: 'Transfer 80 units from Hub West-02 (Los Angeles) -> Hub East-01',
      },
      status: 'ACTIVE',
      source: 'EVENT_ENGINE',
      timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    },
    {
      id: 'evt-002',
      eventType: 'DELIVERY_RISK',
      severity: 'HIGH',
      warehouseId: 'hub-01',
      orderId: 'ord-105',
      description: 'Order #ORD-1005 (Platinum VIP) delivery deadline approaching (< 4h) with picking queue delay.',
      metadata: {
        orderNumber: 'ORD-1005',
        customerTier: 'Platinum',
        deadlineHoursRemaining: 3.5,
        riskScore: 84,
        recommendedAction: 'Expedite picking priority to Zone A1',
      },
      status: 'ACTIVE',
      source: 'SLA_MONITOR',
      timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    },
    {
      id: 'evt-003',
      eventType: 'PACKING_BOTTLENECK',
      severity: 'WARNING',
      warehouseId: 'hub-01',
      description: 'Packing Station Beta queue exceeding normal threshold (34 pending orders, 1 packer active).',
      metadata: {
        station: 'Packing Line Beta',
        queueDepth: 34,
        activePackers: 1,
        recommendedAction: 'Reassign 1 worker from Restocking to Packing Station Beta',
      },
      status: 'ACTIVE',
      source: 'WORKFORCE_ENGINE',
      timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    },
    {
      id: 'evt-004',
      eventType: 'WEATHER_RISK',
      severity: 'WARNING',
      warehouseId: 'hub-02',
      description: 'Adverse weather alert in Pacific Northwest transit corridor. Cross-hub transfers may face 2-hour delay.',
      metadata: {
        region: 'Hub West-02 Corridor',
        weatherCondition: 'Heavy Precipitation & Wind',
        bufferAdjustmentHours: 2,
      },
      status: 'ACKNOWLEDGED',
      source: 'WEATHER_SERVICE',
      timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    },
    {
      id: 'evt-005',
      eventType: 'SUPPLIER_DELAY',
      severity: 'HIGH',
      warehouseId: 'hub-01',
      description: 'Supplier "Apex Electronics" shipment PO-8821 delayed by 2 days. Inventory buffer low for 3 SKUs.',
      metadata: {
        supplier: 'Apex Electronics',
        poNumber: 'PO-8821',
        delayDays: 2,
        affectedSkus: ['ELEC-CBL-004', 'ELEC-ADP-009'],
      },
      status: 'ACTIVE',
      source: 'SUPPLIER_TRACKER',
      timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    },
  ];

  public static getInstance(): EventIntelligenceService {
    if (!EventIntelligenceService.instance) {
      EventIntelligenceService.instance = new EventIntelligenceService();
    }
    return EventIntelligenceService.instance;
  }

  /**
   * Scan warehouse state for real-time risk anomalies and return synthetic + dynamic events
   */
  public detectAnomalies(
    products: Product[] = mockProducts,
    orders: Order[] = mockOrders,
    employees: WarehouseEmployee[] = mockEmployees,
    weather?: WeatherData,
    warehouseId: string = 'hub-01'
  ): WarehouseEvent[] {
    const dynamicEvents: WarehouseEvent[] = [];

    // 1. Scan for critical stockouts
    const criticalStockouts = products.filter((p) => p.stock === 0);
    criticalStockouts.slice(0, 2).forEach((p, idx) => {
      dynamicEvents.push({
        id: `dyn-stockout-${p.sku}-${idx}`,
        eventType: 'STOCKOUT_RISK',
        severity: 'CRITICAL',
        warehouseId,
        productId: p.id,
        description: `CRITICAL STOCKOUT: ${p.name} (SKU: ${p.sku}) has 0 units in stock with active pending orders.`,
        metadata: {
          sku: p.sku,
          stock: 0,
          reorderLevel: p.reorderLevel,
          suggestedAction: 'Initiate Level 1 Cross-Hub Transfer or Level 2 Vendor Expedite',
        },
        status: 'ACTIVE',
        source: 'INVENTORY_SCANNER',
        timestamp: new Date().toISOString(),
      });
    });

    // 2. Scan for urgent pending VIP orders
    const urgentVipOrders = orders.filter(
      (o) =>
        (o.customerTier === 'Platinum' || o.priority === 'URGENT') &&
        (o.status === 'PENDING' || o.status === 'PROCESSING')
    );
    if (urgentVipOrders.length > 0) {
      const topUrgent = urgentVipOrders[0];
      dynamicEvents.push({
        id: `dyn-vip-${topUrgent.id}`,
        eventType: 'CRITICAL_CUSTOMER_ORDER',
        severity: 'HIGH',
        warehouseId,
        orderId: topUrgent.id,
        description: `High-priority ${topUrgent.customerTier} order #${topUrgent.orderNumber} requires expedited fulfillment.`,
        metadata: {
          orderNumber: topUrgent.orderNumber,
          customerName: topUrgent.customerName,
          orderValue: topUrgent.orderValue,
          deadline: topUrgent.deliveryDeadline,
        },
        status: 'ACTIVE',
        source: 'ORDER_PIPELINE',
        timestamp: new Date().toISOString(),
      });
    }

    // 3. Scan for weather disruptions
    if (weather?.isAdverse) {
      dynamicEvents.push({
        id: `dyn-weather-${Date.now()}`,
        eventType: 'WEATHER_RISK',
        severity: 'WARNING',
        warehouseId,
        description: `Adverse local weather (${weather.condition}, ${weather.windSpeed} km/h wind) may delay outbound freight carriers.`,
        metadata: {
          condition: weather.condition,
          windSpeed: weather.windSpeed,
          source: weather.source,
        },
        status: 'ACTIVE',
        source: 'WEATHER_RADAR',
        timestamp: new Date().toISOString(),
      });
    }

    // Combine static memory events with newly detected anomalies (deduplicating by ID)
    const combined = [...dynamicEvents, ...this.memoryEvents];
    const uniqueMap = new Map<string, WarehouseEvent>();
    combined.forEach((evt) => uniqueMap.set(evt.id, evt));
    return Array.from(uniqueMap.values()).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  /**
   * Get all active events, optionally filtered by warehouse and severity
   */
  public async getEvents(
    warehouseId?: string,
    severity?: EventSeverity,
    status?: EventStatus
  ): Promise<WarehouseEvent[]> {
    let events = this.detectAnomalies();

    if (warehouseId && warehouseId !== 'all') {
      events = events.filter((e) => e.warehouseId === warehouseId || e.warehouseId === 'hub-01');
    }
    if (severity) {
      events = events.filter((e) => e.severity === severity);
    }
    if (status) {
      events = events.filter((e) => e.status === status);
    }

    return events;
  }

  /**
   * Record a new event into the event intelligence stream
   */
  public recordEvent(eventData: Omit<WarehouseEvent, 'id' | 'timestamp'>): WarehouseEvent {
    const newEvent: WarehouseEvent = {
      ...eventData,
      id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    this.memoryEvents.unshift(newEvent);
    return newEvent;
  }

  /**
   * Acknowledge or resolve an active event
   */
  public updateEventStatus(eventId: string, newStatus: EventStatus): boolean {
    const event = this.memoryEvents.find((e) => e.id === eventId);
    if (event) {
      event.status = newStatus;
      return true;
    }
    return false;
  }
}

export const eventIntelligenceService = EventIntelligenceService.getInstance();
