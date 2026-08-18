import {
  WhatIfSimulationParams,
  WhatIfSimulationResult,
  SimulationStateMetrics,
  Product,
  Order,
  WarehouseEmployee,
} from '@/types';
import { mockProducts, mockOrders, mockEmployees } from '@/data/mockData';

export class SimulationEngine {
  private static instance: SimulationEngine;

  public static getInstance(): SimulationEngine {
    if (!SimulationEngine.instance) {
      SimulationEngine.instance = new SimulationEngine();
    }
    return SimulationEngine.instance;
  }

  /**
   * Run a What-If Scenario Simulation
   * STRICT GUARANTEE: Does NOT modify database or production state.
   */
  public runSimulation(
    params: WhatIfSimulationParams,
    products: Product[] = mockProducts,
    orders: Order[] = mockOrders,
    employees: WarehouseEmployee[] = mockEmployees
  ): WhatIfSimulationResult {
    // 1. Calculate Baseline (Current State)
    const baseTotalOrders = orders.length;
    const baseStockouts = products.filter((p) => p.stock === 0).length;
    const baseLowStock = products.filter((p) => p.stock > 0 && p.stock <= p.reorderLevel).length;
    const baseDelayed = orders.filter((o) => o.status === 'PENDING' && o.priority === 'URGENT').length;
    const baseWorkforce = employees.length;

    const currentState: SimulationStateMetrics = {
      fulfillmentRate: 96.4,
      stockoutRiskSKUs: baseStockouts + baseLowStock,
      delayedOrders: Math.max(2, baseDelayed),
      warehouseWorkloadPercent: 78,
      requiredWorkforceHeadcount: baseWorkforce,
      estimatedTotalCost: 38500,
      slaBreachRiskPercent: 4.2,
    };

    // 2. Compute Simulated State based on deterministic formulas
    const demandMultiplier = 1 + (params.demandChangePercent || 0) / 100;
    const orderSurgeCount = params.additionalOrders || 0;
    const inventoryRetention = 1 - Math.max(0, Math.min(100, params.inventoryReductionPercent || 0)) / 100;
    const supplierDelayDays = Math.max(0, params.supplierDelayDays || 0);
    const workforceMultiplier = 1 + (params.workforceChangePercent || 0) / 100;
    const isClosure = !!params.warehouseClosure;
    const weatherImpact =
      params.weatherDisruptionSeverity === 'SEVERE' ? 1.35 : params.weatherDisruptionSeverity === 'MODERATE' ? 1.15 : 1.0;

    // Simulated Fulfillment Rate
    let simFulfillment = currentState.fulfillmentRate;
    simFulfillment -= (demandMultiplier - 1) * 22;
    simFulfillment -= (orderSurgeCount / 100) * 1.8;
    simFulfillment -= (1 - inventoryRetention) * 35;
    simFulfillment -= supplierDelayDays * 2.2;
    if (workforceMultiplier < 1) {
      simFulfillment -= (1 - workforceMultiplier) * 28;
    }
    if (isClosure) simFulfillment -= 12;
    simFulfillment /= weatherImpact;
    const boundedFulfillment = Math.max(45.0, Math.min(99.9, Math.round(simFulfillment * 10) / 10));

    // Simulated Stockout SKUs
    let simStockouts = currentState.stockoutRiskSKUs;
    simStockouts += Math.round((demandMultiplier - 1) * 25);
    simStockouts += Math.round((1 - inventoryRetention) * 30);
    simStockouts += Math.round(supplierDelayDays * 3.5);
    if (isClosure) simStockouts += 8;
    const boundedStockouts = Math.max(0, Math.min(products.length, simStockouts));

    // Simulated Delayed Orders
    let simDelayed = currentState.delayedOrders;
    simDelayed += Math.round((orderSurgeCount / 50) * 3);
    simDelayed += Math.round((demandMultiplier - 1) * 20);
    simDelayed += Math.round(supplierDelayDays * 4);
    if (workforceMultiplier < 1) {
      simDelayed += Math.round((1 - workforceMultiplier) * 15);
    }
    if (params.weatherDisruptionSeverity === 'SEVERE') simDelayed += 9;
    const boundedDelayed = Math.max(0, simDelayed);

    // Simulated Workload
    let simWorkload = currentState.warehouseWorkloadPercent * demandMultiplier * (1 + orderSurgeCount / 1000);
    if (workforceMultiplier < 1) {
      simWorkload /= workforceMultiplier;
    }
    if (isClosure) simWorkload *= 1.25;
    const boundedWorkload = Math.max(20, Math.min(185, Math.round(simWorkload)));

    // Required Workforce Headcount
    const requiredHeadcount = Math.max(
      10,
      Math.round(baseWorkforce * (boundedWorkload / 100) * (1 / Math.max(0.5, workforceMultiplier)))
    );

    // Estimated Financial Cost (in INR ₹)
    const baseLaborRate = 800; // per extra worker/shift
    const penaltyPerDelayedOrder = 1200;
    const emergencyTransferCost = Math.round(boundedStockouts * 450);
    const extraLaborCost = Math.max(0, requiredHeadcount - baseWorkforce) * baseLaborRate * 3;
    const delayPenaltyCost = boundedDelayed * penaltyPerDelayedOrder;
    const simulatedCost = currentState.estimatedTotalCost + emergencyTransferCost + extraLaborCost + delayPenaltyCost;

    // SLA Breach Risk
    const simSlaRisk = Math.min(95.0, Math.round((100 - boundedFulfillment) * 0.95 * 10) / 10);

    const simulatedState: SimulationStateMetrics = {
      fulfillmentRate: boundedFulfillment,
      stockoutRiskSKUs: boundedStockouts,
      delayedOrders: boundedDelayed,
      warehouseWorkloadPercent: boundedWorkload,
      requiredWorkforceHeadcount: requiredHeadcount,
      estimatedTotalCost: simulatedCost,
      slaBreachRiskPercent: simSlaRisk,
    };

    // 3. Difference Deltas
    const difference = {
      fulfillmentRateDelta: Math.round((simulatedState.fulfillmentRate - currentState.fulfillmentRate) * 10) / 10,
      stockoutSKUsDelta: simulatedState.stockoutRiskSKUs - currentState.stockoutRiskSKUs,
      delayedOrdersDelta: simulatedState.delayedOrders - currentState.delayedOrders,
      workloadDelta: simulatedState.warehouseWorkloadPercent - currentState.warehouseWorkloadPercent,
      workforceHeadcountDelta: simulatedState.requiredWorkforceHeadcount - currentState.requiredWorkforceHeadcount,
      costDelta: simulatedState.estimatedTotalCost - currentState.estimatedTotalCost,
      slaRiskDelta: Math.round((simulatedState.slaBreachRiskPercent - currentState.slaBreachRiskPercent) * 10) / 10,
    };

    // 4. Generate Deterministic Action Recommendations for the Scenario
    const recommendedActions = [];

    if (difference.stockoutSKUsDelta > 0) {
      recommendedActions.push({
        id: 'rec-sim-1',
        priority: 'CRITICAL' as const,
        action: `Initiate proactive inter-hub transfer of ~${Math.min(480, difference.stockoutSKUsDelta * 25)} units from Hub West-02 & Hub South-04.`,
        impact: `Protects ~${Math.round(difference.stockoutSKUsDelta * 1.8)} SKUs from impending stockouts and preserves ₹${(difference.stockoutSKUsDelta * 4200).toLocaleString('en-IN')} in order value.`,
        confidence: 94,
      });
    }

    if (difference.workforceHeadcountDelta > 0) {
      recommendedActions.push({
        id: 'rec-sim-2',
        priority: 'HIGH' as const,
        action: `Schedule ${difference.workforceHeadcountDelta} additional pickers/packers across Shift A & B to absorb ${boundedWorkload}% workload.`,
        impact: `Reduces picking wait time by ~28% and prevents ${Math.round(difference.delayedOrdersDelta * 0.7)} projected order delays.`,
        confidence: 91,
      });
    }

    if (supplierDelayDays > 0 || params.demandChangePercent > 20) {
      recommendedActions.push({
        id: 'rec-sim-3',
        priority: 'HIGH' as const,
        action: 'Issue expedited Purchase Orders with secondary tier-1 supplier (Zenith Supplies) with guaranteed 24h lead time.',
        impact: 'Buffers fast-moving categories and mitigates supply chain lag.',
        confidence: 88,
      });
    }

    recommendedActions.push({
      id: 'rec-sim-4',
      priority: 'MEDIUM' as const,
      action: 'Prioritize VIP / Platinum tier customer orders in the dynamic dispatch queue.',
      impact: 'Eliminates high-value SLA breach financial penalties and protects customer satisfaction.',
      confidence: 97,
    });

    return {
      scenarioId: `sim-${Date.now()}`,
      params,
      currentState,
      simulatedState,
      difference,
      recommendedActions,
      calculatedAt: new Date().toISOString(),
    };
  }
}

export const simulationEngine = SimulationEngine.getInstance();
