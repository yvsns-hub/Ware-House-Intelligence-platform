import { Order, Product, WarehouseEmployee } from '../types';

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
  private version: string = 'v1.0.0-alpha';

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
   * Run general decision evaluation cycle (Placeholder for Phase 2 AI orchestration)
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
