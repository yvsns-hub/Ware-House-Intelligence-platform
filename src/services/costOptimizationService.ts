import { CostOptimizationOption, Order, Product } from '@/types';

export class CostOptimizationService {
  private static instance: CostOptimizationService;

  public static getInstance(): CostOptimizationService {
    if (!CostOptimizationService.instance) {
      CostOptimizationService.instance = new CostOptimizationService();
    }
    return CostOptimizationService.instance;
  }

  /**
   * Evaluate multiple operational options to resolve an inventory shortage / bottleneck
   * Formula: Total = Transfer + Storage + Labor + Supplier + Delay + Customer Impact
   */
  public evaluateOptions(
    sku: string,
    requiredQty: number,
    order?: Partial<Order>,
    product?: Partial<Product>
  ): {
    bestOptionId: string;
    options: CostOptimizationOption[];
    savingsVsWorstOption: number;
    recommendedRationale: string;
  } {
    const isVip = order?.customerTier === 'Platinum' || order?.customerTier === 'Gold';
    const unitPrice = product?.unitPrice || 450;
    const orderValue = order?.orderValue || unitPrice * requiredQty;

    // Option A: Cross-Hub Inventory Transfer
    const transferCost = Math.round(120 + requiredQty * 8.5);
    const storageCostA = Math.round(requiredQty * 1.2);
    const laborCostA = 180;
    const supplierCostA = 0;
    const delayCostA = 0; // SLA preserved
    const customerImpactA = 0;
    const totalCostA = transferCost + storageCostA + laborCostA + supplierCostA + delayCostA + customerImpactA;

    const optionA: CostOptimizationOption = {
      optionId: 'opt-transfer',
      name: 'Option A: Cross-Hub Transfer (Hub West-02 -> Hub East-01)',
      type: 'TRANSFER',
      breakdown: {
        transferCost,
        storageCost: storageCostA,
        laborCost: laborCostA,
        supplierCost: supplierCostA,
        delayCost: delayCostA,
        customerImpactCost: customerImpactA,
      },
      totalCost: totalCostA,
      slaBreached: false,
      recommended: true,
      rationale: 'Lowest cost resolution while preserving 100% on-time delivery SLA.',
    };

    // Option B: Emergency Supplier Expedited Purchase Order
    const supplierCostB = Math.round(requiredQty * unitPrice * 1.15); // 15% emergency premium
    const storageCostB = Math.round(requiredQty * 1.5);
    const laborCostB = 250;
    const transferCostB = 0;
    const delayCostB = 400; // slight processing buffer
    const customerImpactB = isVip ? 500 : 100;
    const totalCostB = transferCostB + storageCostB + laborCostB + supplierCostB + delayCostB + customerImpactB;

    const optionB: CostOptimizationOption = {
      optionId: 'opt-emergency-po',
      name: 'Option B: Emergency Expedited Supplier PO (24h Delivery)',
      type: 'EMERGENCY_PO',
      breakdown: {
        transferCost: transferCostB,
        storageCost: storageCostB,
        laborCost: laborCostB,
        supplierCost: supplierCostB,
        delayCost: delayCostB,
        customerImpactCost: customerImpactB,
      },
      totalCost: totalCostB,
      slaBreached: false,
      recommended: false,
      rationale: 'Fast supplier turnaround but incurs 15% expediting fee.',
    };

    // Option C: Delay Order / Backorder Fulfillment (Last Resort)
    const delayPenalty = Math.round(orderValue * 0.12); // 12% SLA breach penalty
    const customerChurnRisk = isVip ? Math.round(orderValue * 0.35) : Math.round(orderValue * 0.08);
    const courtesyCredit = isVip ? 750 : 250;
    const laborCostC = 50;
    const totalDelayCost = delayPenalty + courtesyCredit;
    const totalCustomerImpact = customerChurnRisk;
    const totalCostC = totalDelayCost + totalCustomerImpact + laborCostC;


    const optionC: CostOptimizationOption = {
      optionId: 'opt-delay',
      name: 'Option C: Delay Order & Issue Customer Courtesy Credit',
      type: 'DELAY',
      breakdown: {
        transferCost: 0,
        storageCost: 0,
        laborCost: laborCostC,
        supplierCost: 0,
        delayCost: totalDelayCost,
        customerImpactCost: totalCustomerImpact,
      },
      totalCost: totalCostC,

      slaBreached: true,
      recommended: false,
      rationale: 'Highest total cost due to customer dissatisfaction and SLA breach penalties.',
    };

    const options = [optionA, optionB, optionC];
    // Find option with lowest total cost
    const sorted = [...options].sort((a, b) => a.totalCost - b.totalCost);
    const bestOption = sorted[0];
    const worstOption = sorted[sorted.length - 1];

    // Mark best as recommended
    options.forEach((opt) => {
      opt.recommended = opt.optionId === bestOption.optionId;
    });

    return {
      bestOptionId: bestOption.optionId,
      options,
      savingsVsWorstOption: worstOption.totalCost - bestOption.totalCost,
      recommendedRationale: bestOption.rationale,
    };
  }
}

export const costOptimizationService = CostOptimizationService.getInstance();
