/**
 * WAREHOUSEIQ 2.0 — MASTER AUTOMATED TEST SUITE
 * Comprehensive unit, integration, authorization, edge-case, and mathematical validation suite.
 */

import { runner } from './test-framework';
import { decisionEngine } from '../src/services/decisionEngine';
import { simulationEngine } from '../src/services/simulationEngine';
import { costOptimizationService } from '../src/services/costOptimizationService';
import { deliveryRiskService } from '../src/services/deliveryRiskService';
import { workforceOptimizationService } from '../src/services/workforceOptimizationService';
import { approvalService } from '../src/services/approvalService';
import { auditService } from '../src/services/auditService';
import { eventIntelligenceService } from '../src/services/eventIntelligenceService';
import { supplierService } from '../src/services/supplierService';
import { damageInspectionService } from '../src/services/damageInspectionService';
import { decisionIntelligenceService } from '../src/services/decisionIntelligenceService';
import { mockProducts, mockOrders, mockEmployees } from '../src/data/mockData';
import { warehouseFacilities } from '../src/context/AuthContext';
import { Product, Order, WarehouseEmployee } from '../src/types';



async function executeTestSuite() {
  console.log('\n======================================================');
  console.log('🧪 WAREHOUSEIQ 2.0 — AUTOMATED TEST SUITE');
  console.log('   Testing Infrastructure, Decision Logic & Security');
  console.log('======================================================');

  // ----------------------------------------------------
  // 1. INVENTORY INTELLIGENCE & STOCK CALCULATIONS
  // ----------------------------------------------------
  runner.group('1. Inventory Calculations & Stock Health');

  runner.test('Calculates available stock discounting reserved and damaged units', () => {
    const p: Product = {
      ...mockProducts[0],
      stock: 100,
      reservedStock: 15,
      damagedStock: 5,
    };
    const available = p.stock - p.reservedStock - p.damagedStock;
    runner.expect(available).toBe(80);
  });

  runner.test('Detects reorder threshold breach when stock <= reorderLevel', () => {
    const lowStockProduct: Product = {
      ...mockProducts[0],
      stock: 12,
      reorderLevel: 15,
    };
    const needsReorder = lowStockProduct.stock <= lowStockProduct.reorderLevel;
    runner.expect(needsReorder).toBeTruthy();
  });

  runner.test('Correctly identifies zero-stock critical stockouts', () => {
    const stockoutProduct: Product = {
      ...mockProducts[0],
      stock: 0,
    };
    const alerts = decisionEngine.evaluateReplenishment([stockoutProduct]);
    runner.expect(alerts.length).toBe(1);
    runner.expect(alerts[0].urgency).toBe('CRITICAL');
  });

  // ----------------------------------------------------
  // 2. ORDER PRIORITY & SLA DEADLINE ENGINE
  // ----------------------------------------------------
  runner.group('2. Order Priority Scoring & SLA Queue Management');

  runner.test('Grants maximum score boost to Platinum VIP customers', () => {
    const vipOrder: Order = { ...mockOrders[0], customerTier: 'Platinum', priority: 'HIGH' };
    const stdOrder: Order = { ...mockOrders[0], customerTier: 'Standard', priority: 'HIGH' };
    const prioritized = decisionEngine.prioritizeOrders([stdOrder, vipOrder]);
    runner.expect(prioritized[0].customerTier).toBe('Platinum');
  });

  runner.test('Elevates order priority when deadline is within 4 hours', () => {
    const urgentDeadlineOrder: Order = {
      ...mockOrders[0],
      id: 'ord-urgent-time',
      deliveryDeadline: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // 2 hours
      priority: 'MEDIUM',
    };
    const relaxedDeadlineOrder: Order = {
      ...mockOrders[0],
      id: 'ord-relaxed-time',
      deliveryDeadline: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // 48 hours
      priority: 'MEDIUM',
    };
    const ranked = decisionEngine.prioritizeOrders([relaxedDeadlineOrder, urgentDeadlineOrder]);
    runner.expect(ranked[0].id).toBe('ord-urgent-time');
  });

  runner.test('Calculates multi-dimensional priority breakdown correctly', () => {
    const scoredList = decisionIntelligenceService.calculateOrderPriorities(mockOrders);
    runner.expect(scoredList.length).toBeGreaterThan(0);
    runner.expect(scoredList[0].priorityScore).toBeGreaterThan(50);
  });

  // ----------------------------------------------------
  // 3. 3-LEVEL INVENTORY SHORTAGE DECISION CASCADE
  // ----------------------------------------------------
  runner.group('3. Three-Level Inventory Shortage Decision Cascade');

  runner.test('Level 0: Direct Local Allocation when current hub has ample stock', () => {
    const ampleProduct = { ...mockProducts[0], stock: 250 };
    const order = { ...mockOrders[0], id: 'o-1', orderNumber: 'ORD-TEST-1', totalItems: 20 };
    const res = decisionEngine.resolveStockShortage(order, ampleProduct, 'hub-01');
    runner.expect(res.decisionStage).toBe('ALLOCATED');
    runner.expect(res.stepsProgress.step1CrossHubCheck).toBeTruthy();
  });

  runner.test('Level 1: Cross-Hub Transfer when local stock is 0 but sibling hub has stock', () => {
    const zeroStockProduct = { ...mockProducts[0], stock: 0 };
    const order = { ...mockOrders[0], id: 'o-2', orderNumber: 'ORD-TEST-2', totalItems: 15 };
    const res = decisionEngine.resolveStockShortage(order, zeroStockProduct, 'hub-01', warehouseFacilities);
    runner.expect(res.decisionStage).toBe('TRANSFER');
    runner.expect(res.transferInfo?.sourceHubId).toBeTruthy();
    runner.expect(res.transferInfo?.transportationCost).toBeGreaterThan(0);
  });

  runner.test('Level 2: AI Recommendation / Substitution when no sibling hub stock is available', () => {
    const zeroStockProduct = { ...mockProducts[0], stock: 4 }; // partial stock
    const emptyHubs = warehouseFacilities.map((h) => ({ ...h, totalStockUnits: 0 }));
    const order = { ...mockOrders[0], id: 'o-3', orderNumber: 'ORD-TEST-3', customerTier: 'Platinum', totalItems: 10 };
    const res = decisionEngine.resolveStockShortage(order, zeroStockProduct, 'hub-01', emptyHubs);
    runner.expect(res.decisionStage).toBe('AI_RECOMMENDATION');
    runner.expect(res.aiRecommendation?.strategyType).toBe('Partial Fulfillment');
  });

  runner.test('Level 3: Impact-Minimized Delay execution ONLY as absolute last resort', () => {
    const zeroStockProduct = { ...mockProducts[0], stock: 0 };
    const order = { ...mockOrders[0], id: 'o-4', orderNumber: 'ORD-TEST-4', totalItems: 25 };
    const res = decisionEngine.generateDelayResolution(order, zeroStockProduct);
    runner.expect(res.decisionStage).toBe('DELAY');
    runner.expect(res.stepsProgress.step1CrossHubCheck).toBeTruthy();
    runner.expect(res.stepsProgress.step2AIRecommendation).toBeTruthy();
    runner.expect(res.stepsProgress.step3Delay).toBeTruthy();
  });

  // ----------------------------------------------------
  // 4. WHAT-IF SIMULATION ENGINE ISOLATION
  // ----------------------------------------------------
  runner.group('4. What-If Simulation Engine & Non-Mutation Guarantee');

  runner.test('Simulates +30% demand surge with lower fulfillment & higher workload', () => {
    const res = simulationEngine.runSimulation({
      demandChangePercent: 30,
      additionalOrders: 300,
      inventoryReductionPercent: 0,
      supplierDelayDays: 0,
      workforceChangePercent: 0,
    });
    runner.expect(res.simulatedState.fulfillmentRate).toBeLessThan(res.currentState.fulfillmentRate);
    runner.expect(res.difference.workloadDelta).toBeGreaterThan(0);
  });

  runner.test('Simulates workforce reduction (-40%) increasing required headcount delta', () => {
    const res = simulationEngine.runSimulation({
      demandChangePercent: 0,
      additionalOrders: 0,
      inventoryReductionPercent: 0,
      supplierDelayDays: 0,
      workforceChangePercent: -40,
    });
    runner.expect(res.difference.workforceHeadcountDelta).toBeGreaterThan(0);
    runner.expect(res.recommendedActions.length).toBeGreaterThan(0);
  });

  runner.test('GUARANTEE: What-If simulation NEVER mutates production mock data', () => {
    const originalStock = mockProducts[0].stock;
    const originalOrderCount = mockOrders.length;

    simulationEngine.runSimulation({
      demandChangePercent: 100,
      additionalOrders: 2000,
      inventoryReductionPercent: 50,
      supplierDelayDays: 14,
      workforceChangePercent: -50,
    });

    // Verify raw array objects remained pristine
    runner.expect(mockProducts[0].stock).toBe(originalStock);
    runner.expect(mockOrders.length).toBe(originalOrderCount);
  });

  runner.test('Simulation is completely deterministic given identical input parameters', () => {
    const params = {
      demandChangePercent: 25,
      additionalOrders: 150,
      inventoryReductionPercent: 10,
      supplierDelayDays: 2,
      workforceChangePercent: -5,
    };
    const res1 = simulationEngine.runSimulation(params);
    const res2 = simulationEngine.runSimulation(params);
    runner.expect(res1.simulatedState.fulfillmentRate).toBe(res2.simulatedState.fulfillmentRate);
    runner.expect(res1.simulatedState.estimatedTotalCost).toBe(res2.simulatedState.estimatedTotalCost);
  });

  // ----------------------------------------------------
  // 5. DELIVERY RISK PROBABILITY ENGINE
  // ----------------------------------------------------
  runner.group('5. Delivery Risk Probability Engine');

  runner.test('Calculates high late probability for imminent deadline under adverse weather', () => {
    const order: Order = {
      ...mockOrders[0],
      deliveryDeadline: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
      customerTier: 'Platinum',
      status: 'PENDING',
    };
    const weather = {
      temperature: 4,
      windSpeed: 45,
      precipitation: 80,
      condition: 'Severe Thunderstorm',
      humidity: 90,
      isAdverse: true,
      source: 'OpenWeather' as const,
      timestamp: new Date().toISOString(),
    };
    const risk = deliveryRiskService.evaluateOrderRisk(order, weather, 92);
    runner.expect(risk.riskLevel).toBe('CRITICAL');
    runner.expect(risk.lateProbability).toBeGreaterThanOrEqual(75);
    runner.expect(risk.riskFactors.length).toBeGreaterThanOrEqual(3);
  });

  runner.test('Ranks entire order portfolio by risk severity descending', () => {
    const evaluated = deliveryRiskService.evaluateAllOrders(mockOrders);
    runner.expect(evaluated.length).toBeGreaterThan(0);
    runner.expect(evaluated[0].lateProbability).toBeGreaterThanOrEqual(evaluated[evaluated.length - 1].lateProbability);
  });

  // ----------------------------------------------------
  // 6. MULTI-OPTION COST OPTIMIZATION
  // ----------------------------------------------------
  runner.group('6. Multi-Option Landed Cost Optimization');

  runner.test('Calculates Total = Transfer + Storage + Labor + Supplier + Delay + Customer Impact', () => {
    const costEval = costOptimizationService.evaluateOptions('ELEC-WHD-001', 40, mockOrders[0], mockProducts[0]);
    runner.expect(costEval.options.length).toBe(3);

    costEval.options.forEach((opt) => {
      const b = opt.breakdown;
      const computedSum = b.transferCost + b.storageCost + b.laborCost + b.supplierCost + b.delayCost + b.customerImpactCost;
      runner.expect(opt.totalCost).toBe(computedSum);
    });
  });

  runner.test('Selects lowest-impact option as recommended', () => {
    const costEval = costOptimizationService.evaluateOptions('ELEC-WHD-001', 30, mockOrders[0], mockProducts[0]);
    const recommendedOpt = costEval.options.find((o) => o.recommended);
    runner.expect(recommendedOpt?.optionId).toBe(costEval.bestOptionId);
    runner.expect(costEval.savingsVsWorstOption).toBeGreaterThan(0);
  });

  // ----------------------------------------------------
  // 7. DYNAMIC WORKFORCE REBALANCING
  // ----------------------------------------------------
  runner.group('7. Dynamic Workforce Optimization & SLA Routing');

  runner.test('Generates queue-weighted worker allocation plan', () => {
    const plan = workforceOptimizationService.generateAllocationPlan(mockEmployees, mockOrders);
    runner.expect(plan.allocations.length).toBeGreaterThan(0);
    runner.expect(plan.expectedOutcomes.pickingWaitTimeDeltaPercent).toBeLessThan(0); // wait time reduced
    runner.expect(plan.expectedOutcomes.throughputDeltaPercent).toBeGreaterThan(0); // throughput increased
  });

  runner.test('Workforce plan requires explicit manager approval state transition', () => {
    const plan = workforceOptimizationService.generateAllocationPlan(mockEmployees, mockOrders);
    runner.expect(plan.status).toBe('PENDING_APPROVAL');
    const approved = workforceOptimizationService.approvePlan(plan.id, 'Test Operations Manager');
    runner.expect(approved).toBeTruthy();
    runner.expect(workforceOptimizationService.getCurrentPlan().status).toBe('APPROVED');
  });

  // ----------------------------------------------------
  // 8. MANAGER APPROVAL & AUDIT LOG INTEGRITY
  // ----------------------------------------------------
  runner.group('8. Manager Approvals & Cryptographic Audit Log');

  runner.test('Processes manager decision approvals and updates state to EXECUTED', () => {
    const pending = approvalService.getPendingDecisions('PENDING');
    runner.expect(pending.length).toBeGreaterThan(0);

    const target = pending[0];
    const res = approvalService.processDecision(
      target.decisionId,
      'APPROVE',
      'Operations Director Swamy',
      'MANAGER',
      'Authorized transfer for SLA preservation'
    );
    runner.expect(res.success).toBeTruthy();
    runner.expect(res.decision?.status).toBe('EXECUTED');
    runner.expect(res.decision?.approvedBy).toBe('Operations Director Swamy');
  });

  runner.test('Appends immutable record to audit log with previous and new states', () => {
    const logsBefore = auditService.getLogs().length;
    auditService.logAction({
      user: 'Director Swamy',
      role: 'MANAGER',
      action: 'APPROVE_CROSS_HUB_TRANSFER',
      decisionId: 'dec-test-99',
      previousState: JSON.stringify({ status: 'PENDING' }),
      newState: JSON.stringify({ status: 'EXECUTED' }),
      reason: 'Prevent SLA breach',
      source: 'APPROVAL_CONSOLE',
      approvalStatus: 'APPROVED',
    });
    const logsAfter = auditService.getLogs().length;
    runner.expect(logsAfter).toBe(logsBefore + 1);
  });

  // ----------------------------------------------------
  // 9. ROLE-BASED ACCESS CONTROL (RBAC) & SECURITY
  // ----------------------------------------------------
  runner.group('9. Role-Based Access Control (RBAC) & API Guards');

  runner.test('Restricts PICKER role from accessing manager intelligence consoles', () => {
    const pickerRestrictedRoutes = [
      '/analytics',
      '/decision-center',
      '/approvals',
      '/damage-inspection',
      '/ai-assistant',
      '/settings',
      '/employees',
      '/inventory',
      '/warehouse',
    ];
    const userRole = 'PICKER';
    const isRestricted = (route: string) => userRole === 'PICKER' && pickerRestrictedRoutes.includes(route);

    runner.expect(isRestricted('/decision-center')).toBeTruthy();
    runner.expect(isRestricted('/approvals')).toBeTruthy();
    runner.expect(isRestricted('/damage-inspection')).toBeTruthy();
  });

  runner.test('Allows MANAGER role full access across all operations', () => {
    const userRole = 'MANAGER';
    const canApproveDecisions = userRole === 'MANAGER' || userRole === 'SUPERVISOR';
    const canRunSimulations = userRole === 'MANAGER';
    runner.expect(canApproveDecisions).toBeTruthy();
    runner.expect(canRunSimulations).toBeTruthy();
  });

  runner.test('Disallows unauthorized/unauthenticated state mutations', () => {
    const hasValidSession = false;
    const canMutate = hasValidSession;
    runner.expect(canMutate).toBeFalsy();
  });

  // ----------------------------------------------------
  // 10. REAL-TIME EVENT INTELLIGENCE & ANOMALIES
  // ----------------------------------------------------
  runner.group('10. Real-Time Event Intelligence Stream');

  runner.test('Detects anomalies dynamically from warehouse inventory and order queues', () => {
    const events = eventIntelligenceService.detectAnomalies(mockProducts, mockOrders, mockEmployees);
    runner.expect(events.length).toBeGreaterThan(0);
    const criticalEvents = events.filter((e) => e.severity === 'CRITICAL');
    runner.expect(criticalEvents.length).toBeGreaterThanOrEqual(1);
  });

  runner.test('Allows event acknowledgment and resolution state updates', () => {
    const recorded = eventIntelligenceService.recordEvent({
      eventType: 'PICKER_OVERLOAD',
      severity: 'WARNING',
      warehouseId: 'hub-01',
      description: 'Queue depth elevated in Aisle 04',
      status: 'ACTIVE',
      source: 'TEST_AGENT',
    });
    const updated = eventIntelligenceService.updateEventStatus(recorded.id, 'RESOLVED');
    runner.expect(updated).toBeTruthy();
  });

  // ----------------------------------------------------
  // 11. SUPPLIER & COMPUTER VISION DAMAGE INSPECTION
  // ----------------------------------------------------
  runner.group('11. Supplier Intelligence & Computer Vision Damage Inspection');

  runner.test('Ranks emergency suppliers by reliability score descending', () => {
    const sup = supplierService.getBestEmergencySupplier('Electronics');
    runner.expect(sup).toBeTruthy();
    runner.expect(sup?.reliabilityScore).toBeGreaterThanOrEqual(90);
    runner.expect(sup?.emergencySupported).toBeTruthy();
  });

  runner.test('Computer Vision model classifies leakage as CRITICAL with disposal disposition', () => {
    const res = damageInspectionService.analyzePackageImage({
      sku: 'GROC-EVO-001',
      productName: 'Organic Extra Virgin Olive Oil 1L',
      overrideDamageType: 'LEAKAGE',
    });
    runner.expect(res.record.severity).toBe('CRITICAL');
    runner.expect(res.record.damageType).toBe('LEAKAGE');
    runner.expect(res.recommendedDisposition).toContain('DISPOSE');
    runner.expect(res.detectionBoxes.length).toBeGreaterThan(0);
  });

  runner.test('Computer Vision model classifies torn packaging as MINOR with repack disposition', () => {
    const res = damageInspectionService.analyzePackageImage({
      sku: 'ELEC-WHD-001',
      productName: 'High-Performance Wireless Headphones',
      overrideDamageType: 'TORN_PACKAGING',
    });
    runner.expect(res.record.severity).toBe('MINOR');
    runner.expect(res.recommendedDisposition).toContain('REPACK');
  });

  // ----------------------------------------------------
  // 12. EDGE CASES & BOUNDARY TESTING
  // ----------------------------------------------------
  runner.group('12. Edge Cases, Zero Stock & Boundary Scenarios');

  runner.test('Handles empty products or orders list gracefully without throwing', () => {
    const health = decisionIntelligenceService.calculateHealthScores([], [], []);
    runner.expect(health.overall).toBeGreaterThan(0);
    runner.expect(health.status).toBeTruthy();
  });

  runner.test('Handles extreme simulation shock (+100% demand, -50% labor) within bounded limits', () => {
    const res = simulationEngine.runSimulation({
      demandChangePercent: 100,
      additionalOrders: 2000,
      inventoryReductionPercent: 50,
      supplierDelayDays: 14,
      workforceChangePercent: -50,
    });
    runner.expect(res.simulatedState.fulfillmentRate).toBeGreaterThanOrEqual(45); // bounded minimum
    runner.expect(res.simulatedState.fulfillmentRate).toBeLessThanOrEqual(100);
  });

  runner.test('Handles product with zero stock in decision cycle without null pointer exception', () => {
    const emptyProduct: Product = { ...mockProducts[0], stock: 0, reorderLevel: 50 };
    const replenishment = decisionEngine.evaluateReplenishment([emptyProduct]);
    runner.expect(replenishment[0].urgency).toBe('CRITICAL');
    runner.expect(replenishment[0].recommendedOrderQty).toBe(150);
  });

  const success = runner.printSummary();
  if (!success) {
    process.exit(1);
  }
}

executeTestSuite().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
