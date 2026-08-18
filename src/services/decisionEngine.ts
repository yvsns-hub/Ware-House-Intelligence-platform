import {
  Order,
  Product,
  WarehouseEmployee,
  StockShortageResolution,
  AIStrategyType,
} from '../types';
import { warehouseFacilities, WarehouseFacility } from '../context/AuthContext';

export interface DecisionResult {
  engineVersion: string;
  status: 'OPERATIONAL' | 'DEGRADED';
  priorityOrderQueue: string[];
  restockAlerts: Array<{
    sku: string;
    productName: string;
    currentStock: number;
    recommendedOrderQty: number;
    urgency: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  }>;
  workforceOptimization: {
    recommendedPickerToPackerRatio: string;
    bottleneckStation: string;
  };
}

export class DecisionEngine {
  private version: string = 'v2.0.0-architecture';

  /**
   * 3-LEVEL STOCK SHORTAGE DECISION STRATEGY
   * WarehouseIQ NEVER immediately delays an order because of insufficient inventory.
   * Workflow:
   * 1. Check Local Stock -> Enough? -> Allocate
   * 2. Search Other Warehouse Hubs (Level 1) -> Found? -> Recommend Transfer
   * 3. Invoke AI Recommendation Engine (Level 2) -> Resolved? -> Execute AI Strategy
   * 4. Delay Order (Level 3) -> Execute ONLY as Last Resort
   */
  public resolveStockShortage(
    order: Partial<Order> & { id: string; orderNumber: string },
    product: Product,
    currentHubId: string = 'hub-01',
    allHubs: WarehouseFacility[] = warehouseFacilities
  ): StockShortageResolution {
    const currentStock = product.stock;
    const requiredStock = order.totalItems || 10;

    // STEP 1: Check local stock
    if (currentStock >= requiredStock) {
      return {
        orderId: order.id,
        orderNumber: order.orderNumber,
        productSku: product.sku,
        productName: product.name,
        currentStock,
        requiredStock,
        decisionStage: 'ALLOCATED',
        stepsProgress: {
          step1CrossHubCheck: true,
          step2AIRecommendation: false,
          step3Delay: false,
        },
        businessImpact: 'Order fully allocated from current hub. Zero SLA risk.',
        actionLabel: 'Stock Allocated',
        notificationMessage: 'Stock allocated successfully from local facility.',
      };
    }

    // STEP 2 / LEVEL 1: Check Nearby Warehouse Hubs (Cross-Hub Inventory Transfer)
    const currentHub = allHubs.find((h) => h.id === currentHubId) || allHubs[0];
    const otherHubs = allHubs.filter((h) => h.id !== currentHubId);

    // Check if another hub has sufficient stock (e.g. Hub West-02 or Hub Central-01)
    const candidateHub = otherHubs.find((h) => h.totalStockUnits > 0) || otherHubs[0];

    // If Level 1 Transfer is available (default to Hub West-02 for demo)
    if (candidateHub) {
      const transferQty = Math.max(requiredStock, 12);
      const estTimeHours = candidateHub.id === 'hub-02' ? 3 : 4;
      const estCost = 150;
      const hubLabel = candidateHub.name.includes('Los Angeles')
        ? 'Hub B (Los Angeles)'
        : candidateHub.name.includes('Dallas')
        ? 'Hub C (Dallas)'
        : 'Hub B';

      return {
        orderId: order.id,
        orderNumber: order.orderNumber,
        productSku: product.sku,
        productName: product.name,
        currentStock,
        requiredStock,
        decisionStage: 'TRANSFER',
        stepsProgress: {
          step1CrossHubCheck: true,
          step2AIRecommendation: false,
          step3Delay: false,
        },
        transferInfo: {
          sourceHubId: candidateHub.id,
          sourceHubName: hubLabel,
          destinationHubId: currentHub.id,
          destinationHubName: currentHub.name.split(' ')[0] + ' ' + (currentHub.name.split(' ')[1] || ''),
          transferQuantity: transferQty,
          estimatedArrivalTime: `${estTimeHours} hours`,
          transportationCost: estCost,
          message: `${transferQty} units are available in ${hubLabel}. Estimated transfer time is ${estTimeHours} hours. Transfer inventory to fulfill the order without affecting SLA.`,
        },
        businessImpact: 'Fulfills order without affecting SLA. Zero revenue loss.',
        actionLabel: 'Approve Transfer',
        notificationMessage: `Inventory transfer approved from ${hubLabel}.`,
      };
    }

    // STEP 3 / LEVEL 2: AI Recommendation Engine
    const isVip = order.customerTier === 'Platinum' || order.customerTier === 'Gold';
    let aiStrategy: AIStrategyType = 'Partial Fulfillment';
    let recommendationText = `Ship ${currentStock} units now, Backorder ${requiredStock - currentStock} units`;
    let reasonText = `Maintains premium SLA for ${order.customerTier || 'Platinum'} account`;
    let impactText = `Revenue Protected ₹1,80,000`;

    if (isVip && currentStock > 0) {
      aiStrategy = 'Partial Fulfillment';
      recommendationText = `Ship ${currentStock} units now, Backorder ${requiredStock - currentStock} units`;
      reasonText = `Maintains premium SLA for ${order.customerTier || 'Platinum'} tier account`;
      impactText = `Revenue Protected ₹1,80,000`;
    } else {
      aiStrategy = 'Split Shipment';
      recommendationText = `Split shipment into 2 waves: Dispatch wave 1 from regional depot and wave 2 on restock.`;
      reasonText = `Optimizes customer fulfillment velocity while supplier PO is in transit.`;
      impactText = `SLA Preserved & Revenue Protected ₹1,40,000`;
    }

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      productSku: product.sku,
      productName: product.name,
      currentStock,
      requiredStock,
      decisionStage: 'AI_RECOMMENDATION',
      stepsProgress: {
        step1CrossHubCheck: true,
        step2AIRecommendation: true,
        step3Delay: false,
      },
      aiRecommendation: {
        strategyType: aiStrategy,
        problem: `Insufficient inventory across all regional hubs (${currentStock} available, ${requiredStock} requested)`,
        recommendation: recommendationText,
        reason: reasonText,
        businessImpact: impactText,
        confidenceScore: 96,
        estimatedSLAImpact: '0% SLA Breach Penalty',
      },
      businessImpact: impactText,
      actionLabel: 'Apply AI Recommendation',
      notificationMessage: 'AI recommends partial fulfillment to maintain SLA.',
    };
  }

  /**
   * Helper to force Level 3 Delay Order resolution (for Last Resort testing/demo)
   */
  public generateDelayResolution(
    order: Partial<Order> & { id: string; orderNumber: string },
    product: Product
  ): StockShortageResolution {
    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      productSku: product.sku,
      productName: product.name,
      currentStock: 0,
      requiredStock: order.totalItems || 10,
      decisionStage: 'DELAY',
      stepsProgress: {
        step1CrossHubCheck: true,
        step2AIRecommendation: true,
        step3Delay: true,
      },
      delayInfo: {
        delayReason: 'Global stock shortage across all regional hubs and active supplier POs.',
        expectedRestockTime: '48 hours',
        newDeliveryDate: 'Aug 22, 2026',
        priorityLevel: 'URGENT_PO_BACKORDER',
        notificationSent: true,
      },
      businessImpact: 'Order delayed as final option. Customer notified with courtesy credit.',
      actionLabel: 'Confirm Delay & Notify Customer',
      notificationMessage: 'Order delayed due to global stock shortage.',
    };
  }

  /**
   * Evaluate dynamic priority scores for active orders based on tier, deadline, and value
   */
  public prioritizeOrders(orders: Order[]): Order[] {
    return [...orders].sort((a, b) => {
      const getPriorityScore = (o: Order) => {
        let score = 0;
        if (o.priority === 'URGENT') score += 1000;
        else if (o.priority === 'HIGH') score += 500;
        else if (o.priority === 'MEDIUM') score += 200;

        if (o.customerTier === 'Platinum') score += 300;
        else if (o.customerTier === 'Gold') score += 150;
        else if (o.customerTier === 'Silver') score += 50;

        const hoursRemaining =
          (new Date(o.deliveryDeadline).getTime() - Date.now()) / (1000 * 60 * 60);
        if (hoursRemaining < 4) score += 400;
        else if (hoursRemaining < 12) score += 200;

        return score;
      };

      return getPriorityScore(b) - getPriorityScore(a);
    });
  }

  /**
   * Evaluate products requiring replenishment
   */
  public evaluateReplenishment(products: Product[]) {
    return products
      .filter((p) => p.stock <= p.reorderLevel)
      .map((p) => ({
        sku: p.sku,
        productName: p.name,
        currentStock: p.stock,
        recommendedOrderQty: Math.max(50, p.reorderLevel * 3 - p.stock),
        urgency: p.stock === 0 ? ('CRITICAL' as const) : ('HIGH' as const),
      }));
  }

  /**
   * Run general decision evaluation cycle
   */
  public runDecisionCycle(
    orders: Order[],
    products: Product[],
    employees: WarehouseEmployee[]
  ): DecisionResult {
    const prioritized = this.prioritizeOrders(orders);
    const restockAlerts = this.evaluateReplenishment(products);

    return {
      engineVersion: this.version,
      status: 'OPERATIONAL',
      priorityOrderQueue: prioritized.slice(0, 10).map((o) => o.orderNumber),
      restockAlerts,
      workforceOptimization: {
        recommendedPickerToPackerRatio: '1.4 : 1.0',
        bottleneckStation: 'Packing Line Beta (Zone B Outbound)',
      },
    };
  }
}

export const decisionEngine = new DecisionEngine();

