import { DeliveryRiskScoring, Order, WeatherData } from '@/types';
import { mockOrders } from '@/data/mockData';

export class DeliveryRiskService {
  private static instance: DeliveryRiskService;

  public static getInstance(): DeliveryRiskService {
    if (!DeliveryRiskService.instance) {
      DeliveryRiskService.instance = new DeliveryRiskService();
    }
    return DeliveryRiskService.instance;
  }

  /**
   * Calculate deterministic Delivery Risk Probability and Scoring for orders
   */
  public evaluateOrderRisk(order: Order, weather?: WeatherData, warehouseCongestionPercent: number = 78): DeliveryRiskScoring {
    const riskFactors: string[] = [];
    let riskScore = 15; // base level risk (15%)

    // 1. Deadline Proximity
    const hoursRemaining = (new Date(order.deliveryDeadline).getTime() - Date.now()) / (1000 * 60 * 60);
    if (hoursRemaining < 4) {
      riskScore += 35;
      riskFactors.push(`Critical deadline: ${Math.max(0.5, Math.round(hoursRemaining * 10) / 10)}h remaining`);
    } else if (hoursRemaining < 12) {
      riskScore += 18;
      riskFactors.push(`Approaching deadline: ${Math.round(hoursRemaining)}h remaining`);
    }

    // 2. Customer Tier Sensitivity
    if (order.customerTier === 'Platinum') {
      riskScore += 10;
      riskFactors.push('Platinum VIP SLA (zero tolerance penalty)');
    }

    // 3. Status Pipeline Delay
    if (order.status === 'PENDING') {
      riskScore += 15;
      riskFactors.push('Order pending in picking queue');
    } else if (order.status === 'PROCESSING') {
      riskScore += 5;
    }

    // 4. Warehouse Floor Congestion
    if (warehouseCongestionPercent > 80) {
      riskScore += 15;
      riskFactors.push(`Warehouse congestion elevated (${warehouseCongestionPercent}% workload)`);
    }

    // 5. Weather Conditions
    if (weather?.isAdverse) {
      riskScore += 15;
      riskFactors.push(`Adverse weather conditions (${weather.condition}) impacting freight transit`);
    }

    const lateProbability = Math.min(96, Math.max(5, riskScore));

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    if (lateProbability >= 75) riskLevel = 'CRITICAL';
    else if (lateProbability >= 50) riskLevel = 'HIGH';
    else if (lateProbability >= 30) riskLevel = 'MEDIUM';

    let recommendedAction = 'Standard operational monitoring';
    if (riskLevel === 'CRITICAL') {
      recommendedAction = 'Expedite picking immediately & assign priority Express Carrier dispatch';
    } else if (riskLevel === 'HIGH') {
      recommendedAction = 'Prioritize in batch wave picking & reserve dedicated packing lane';
    } else if (riskLevel === 'MEDIUM') {
      recommendedAction = 'Queue for next outbound dispatch wave';
    }

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerTier: order.customerTier,
      destination: 'Regional Transit Depot',
      lateProbability,
      riskLevel,
      riskFactors,
      recommendedAction,
      estimatedDeliveryWindow: `${Math.max(1, Math.round(hoursRemaining))} hours`,
    };
  }

  /**
   * Evaluate all active orders and return ranked delivery risk list
   */
  public evaluateAllOrders(orders: Order[] = mockOrders, weather?: WeatherData): DeliveryRiskScoring[] {
    return orders
      .filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED')
      .map((o) => this.evaluateOrderRisk(o, weather))
      .sort((a, b) => b.lateProbability - a.lateProbability);
  }
}

export const deliveryRiskService = DeliveryRiskService.getInstance();
