import {
  Product,
  Order,
  WarehouseEmployee,
  WarehouseLocation,
  DashboardSummary,
  WeatherData,
  CustomerTier,
  OrderPriority,
  ShippingType,
  OrderStatus,
} from '@/types';

// Decision Item Interface
export type DecisionSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface OperationalDecision {
  id: string;
  severity: DecisionSeverity;
  category: 'Fulfillment' | 'Inventory' | 'Workforce' | 'Logistics' | 'Quality' | 'Spatial';
  title: string;
  problem: string;
  businessImpact: string;
  aiRecommendation: string;
  businessReason: string;
  confidenceScore: number; // e.g. 96 (%)
  estimatedBenefit: string;
  actionLabel: string;
  actionType: string;
  affectedEntityId?: string;
  timestamp: string;
}

// Health Score Summary
export interface HealthScoreSummary {
  overall: number; // 0 - 100
  inventory: number;
  fulfillment: number;
  dispatch: number;
  workforce: number;
  weatherRisk: number;
  status: 'Excellent' | 'Healthy' | 'Warning' | 'Critical';
}

// Priority Scored Order
export interface PrioritizedOrder {
  rank: number;
  order: Order;
  priorityScore: number;
  scoreBreakdown: {
    vipCustomer: number;
    expressShipping: number;
    highValue: number;
    imminentDeadline: number;
    weatherRisk: number;
    inventoryAvailable: number;
    customerTier: number;
  };
  reason: string;
  recommendedAction: string;
}

// Reorder Suggestion
export interface ReorderRecommendation {
  id: string;
  sku: string;
  productName: string;
  category: string;
  currentStock: number;
  reorderLevel: number;
  predictedDaysRemaining: number;
  suggestedQuantity: number;
  supplier: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  reason: string;
  unitPrice: number;
  estimatedCost: number;
}

// Bottleneck Diagnostic
export interface OperationalBottleneck {
  id: string;
  area: 'Picking Velocity' | 'Packing Station' | 'Dispatch Dock' | 'Workforce Load' | 'Zone Congestion' | 'Inbound Transit';
  severity: 'Critical' | 'Warning' | 'Moderate';
  cause: string;
  businessImpact: string;
  recommendation: string;
  expectedImprovement: string;
  metrics: {
    label: string;
    value: string;
  };
}

// Operational Exception
export interface OperationalException {
  id: string;
  type: 'Low Stock' | 'Out of Stock' | 'Damaged Items' | 'Wrong Allocation' | 'Missed Deadline' | 'Packing Delay' | 'Weather Risk' | 'Supplier Delay';
  severity: DecisionSeverity;
  problem: string;
  decision: string;
  resolution: string;
  isResolved: boolean;
  timestamp: string;
}

export class DecisionIntelligenceService {
  /**
   * 1. Calculate Warehouse Health Scores (0-100)
   */
  public calculateHealthScores(
    products: Product[] = [],
    orders: Order[] = [],
    employees: WarehouseEmployee[] = [],
    weather?: WeatherData
  ): HealthScoreSummary {
    // Inventory Health (penalized by out of stock and low stock)
    const outOfStockCount = products.filter((p) => p.stock === 0).length;
    const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.reorderLevel).length;
    const damagedCount = products.filter((p) => p.damagedStock > 0).length;
    const totalProducts = Math.max(1, products.length);

    const inventoryHealth = Math.max(
      30,
      Math.min(
        100,
        Math.round(100 - (outOfStockCount * 4 + lowStockCount * 2 + damagedCount * 1.5))
      )
    );

    // Fulfillment Health (on-time rate & urgent orders in queue)
    const urgentPending = orders.filter(
      (o) => o.priority === 'URGENT' && o.status === 'PENDING'
    ).length;
    const fulfillmentHealth = Math.max(
      45,
      Math.min(100, Math.round(96 - urgentPending * 3.5))
    );

    // Dispatch Health (carrier velocity and shipped volume)
    const dispatchHealth = 92;

    // Workforce Health (based on average efficiency and active balance)
    const avgEfficiency = employees.length
      ? employees.reduce((sum, e) => sum + e.efficiencyScore, 0) / employees.length
      : 90;
    const workforceHealth = Math.round(avgEfficiency);

    // Weather Risk (0-100 where 100 is ideal, lower means high disruption risk)
    const weatherRisk = weather?.isAdverse ? 48 : weather && weather.windSpeed > 15 ? 72 : 94;

    // Overall Composite Score (weighted average)
    const overall = Math.round(
      inventoryHealth * 0.25 +
        fulfillmentHealth * 0.3 +
        dispatchHealth * 0.15 +
        workforceHealth * 0.2 +
        weatherRisk * 0.1
    );

    let status: 'Excellent' | 'Healthy' | 'Warning' | 'Critical' = 'Healthy';
    if (overall >= 90) status = 'Excellent';
    else if (overall >= 75) status = 'Healthy';
    else if (overall >= 60) status = 'Warning';
    else status = 'Critical';

    return {
      overall,
      inventory: inventoryHealth,
      fulfillment: fulfillmentHealth,
      dispatch: dispatchHealth,
      workforce: workforceHealth,
      weatherRisk,
      status,
    };
  }

  /**
   * 2. Calculate Order Priority Scores based on exact business formula:
   * VIP Customer: +40, Express Shipping: +25, High Order Value (>$500): +20,
   * Deadline <24h: +20, Weather Risk: +15, Inventory Available: +10, Customer Tier: +15
   */
  public calculateOrderPriorities(
    orders: Order[] = [],
    weather?: WeatherData
  ): PrioritizedOrder[] {
    const scored = orders.map((order) => {
      let vipCustomer = 0;
      let expressShipping = 0;
      let highValue = 0;
      let imminentDeadline = 0;
      let weatherRiskScore = 0;
      let inventoryAvailable = 10; // 100% available by default
      let customerTierScore = 0;

      // 1. VIP Customer (+40)
      if (order.customerTier === 'Platinum') {
        vipCustomer = 40;
      }

      // 2. Express Shipping (+25)
      if (order.shippingType === 'Express' || order.shippingType === 'SameDay') {
        expressShipping = 25;
      }

      // 3. High Order Value (>$500) (+20)
      if (order.orderValue >= 500) {
        highValue = 20;
      }

      // 4. Deadline < 24h (+20)
      const hoursRemaining =
        (new Date(order.deliveryDeadline).getTime() - Date.now()) / (1000 * 60 * 60);
      if (hoursRemaining > 0 && hoursRemaining < 24) {
        imminentDeadline = 20;
      } else if (order.priority === 'URGENT') {
        imminentDeadline = 20;
      }

      // 5. Weather Risk (+15)
      if (weather?.isAdverse || (weather && weather.windSpeed > 15)) {
        weatherRiskScore = 15;
      }

      // 6. Customer Tier (+15 for Gold/Platinum)
      if (order.customerTier === 'Platinum') {
        customerTierScore = 15;
      } else if (order.customerTier === 'Gold') {
        customerTierScore = 10;
      } else if (order.customerTier === 'Silver') {
        customerTierScore = 5;
      }

      const priorityScore =
        vipCustomer +
        expressShipping +
        highValue +
        imminentDeadline +
        weatherRiskScore +
        inventoryAvailable +
        customerTierScore;

      // Build Reason & Recommended Action
      let reason = '';
      let recommendedAction = '';

      if (priorityScore >= 110) {
        reason = 'VIP Tier account with SameDay carrier cutoff and high cart valuation.';
        recommendedAction = 'Fast-track batch pick to Station 1; pre-stage at Dock Bay 04.';
      } else if (priorityScore >= 80) {
        reason = 'Express order requiring fulfillment within standard SLA delivery window.';
        recommendedAction = 'Assign to current morning shift pick wave.';
      } else if (priorityScore >= 50) {
        reason = 'Standard fulfillment priority with ample buffer before carrier collection.';
        recommendedAction = 'Queue in standard picking cycle.';
      } else {
        reason = 'Low-urgency shipment with extended delivery deadline.';
        recommendedAction = 'Consolidate with evening freight dispatch.';
      }

      return {
        rank: 0,
        order,
        priorityScore,
        scoreBreakdown: {
          vipCustomer,
          expressShipping,
          highValue,
          imminentDeadline,
          weatherRisk: weatherRiskScore,
          inventoryAvailable,
          customerTier: customerTierScore,
        },
        reason,
        recommendedAction,
      };
    });

    // Sort descending by priorityScore
    scored.sort((a, b) => b.priorityScore - a.priorityScore);

    // Assign rank 1..N
    return scored.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
  }

  /**
   * 3. Generate 15+ Deterministic Operational Decisions
   */
  public generateOperationalDecisions(
    products: Product[] = [],
    orders: Order[] = [],
    employees: WarehouseEmployee[] = [],
    weather?: WeatherData
  ): OperationalDecision[] {
    const decisions: OperationalDecision[] = [];

    // Decision 1: VIP Order Stock Shortage & Allocation
    decisions.push({
      id: 'DEC-01',
      severity: 'Critical',
      category: 'Fulfillment',
      title: 'VIP Order Allocation Shortage on High-Value Items',
      problem: 'Apex Logistics Hub (Platinum Tier) ordered 10 units of SSD Storage; only 8 available.',
      businessImpact: 'Risk of SLA breach penalty ($2,400) and premium client relationship churn.',
      aiRecommendation: 'Allocate 8 available units immediately, backorder remaining 2, and trigger expedited supplier delivery.',
      businessReason: 'Maintains 99.4% SLA commitment for top 5% revenue generating account.',
      confidenceScore: 96,
      estimatedBenefit: 'Avoids customer churn and preserves $48,000 annual contract value.',
      actionLabel: 'Allocate Available Stock',
      actionType: 'ALLOCATE_STOCK',
      timestamp: '5m ago',
    });

    // Decision 2: Critical Low Stock on Lifesaving Medicine / Top Electronics
    decisions.push({
      id: 'DEC-02',
      severity: 'Critical',
      category: 'Inventory',
      title: 'Emergency PO Required for SKU-MED-039 (Epinephrine Auto-Injector)',
      problem: 'Only 6 units remaining in Secure Cage B while average daily consumption is 4.2 units.',
      businessImpact: 'Complete hospital supply stockout within 34 hours.',
      aiRecommendation: 'Auto-dispatch purchase order for 50 units to Emergency Health Corp with courier priority.',
      businessReason: 'Lead time is 24h; safety buffer is currently below 1.5 days.',
      confidenceScore: 98,
      estimatedBenefit: 'Prevents medical backorders and guarantees critical healthcare fulfillment.',
      actionLabel: 'Create Emergency PO',
      actionType: 'CREATE_PO',
      timestamp: '12m ago',
    });

    // Decision 3: Damaged Stock in Quarantine Bay
    decisions.push({
      id: 'DEC-03',
      severity: 'High',
      category: 'Quality',
      title: 'Quarantine Inspection & Supplier Credit Claim for Damaged Goods',
      problem: '4 units of Wild Alaskan Salmon & 3 units of Organic Juice flagged with packaging damage in Zone C.',
      businessImpact: 'Inventory shrinkage and unsellable warehouse footprint holding cost.',
      aiRecommendation: 'Transfer damaged SKUs to Quarantine Bay 9 and generate automated supplier return credit memo.',
      businessReason: 'Adheres to Cold Chain QA standards and recovers $280 in supplier credits.',
      confidenceScore: 94,
      estimatedBenefit: '100% cost recovery and zero defective customer dispatches.',
      actionLabel: 'File Supplier Claim',
      actionType: 'MARK_DAMAGED',
      timestamp: '28m ago',
    });

    // Decision 4: Severe Weather Disruption & Advance Dispatch
    decisions.push({
      id: 'DEC-04',
      severity: weather?.isAdverse ? 'Critical' : 'High',
      category: 'Logistics',
      title: 'Accelerate Outbound SameDay Dispatches Prior to Storm Front',
      problem: weather?.isAdverse
        ? 'Heavy precipitation & high wind velocity detected at regional transport hub.'
        : 'Forecast indicates storm system entering corridor within 18 hours.',
      businessImpact: 'Estimated 3.5 hour transit delay for 14 outbound regional express couriers.',
      aiRecommendation: 'Advance carrier pickup window by 90 minutes and route northern freight via Highway 87 bypass.',
      businessReason: 'Pre-empts road closures and bypasses hub congestion.',
      confidenceScore: 91,
      estimatedBenefit: '34% delay reduction and 100% on-time SLA protection.',
      actionLabel: 'Dispatch Early',
      actionType: 'DISPATCH_EARLY',
      timestamp: '40m ago',
    });

    // Decision 5: Packing Station 3 Buffer Bottleneck
    decisions.push({
      id: 'DEC-05',
      severity: 'High',
      category: 'Workforce',
      title: 'Packing Station 3 Queue Exceeding Buffer Threshold',
      problem: 'Picker throughput (120 units/hr) is outpacing Packing Station 3 capacity (85 units/hr).',
      businessImpact: 'Floor congestion in Zone A conveyor staging lane.',
      aiRecommendation: 'Temporarily reallocate Carlos Mendez and Devon Brooks from picking to Packing Line 3.',
      businessReason: 'Restores 1.4:1.0 picker-to-packer balance and clears staging backlog.',
      confidenceScore: 89,
      estimatedBenefit: '+28% outbound clearing velocity before 14:00 courier deadline.',
      actionLabel: 'Reassign 2 Workers',
      actionType: 'REASSIGN_WORKER',
      timestamp: '55m ago',
    });

    // Decision 6: Overloaded Picker Shift Load
    decisions.push({
      id: 'DEC-06',
      severity: 'Medium',
      category: 'Workforce',
      title: 'Picker Workload Imbalance in Morning Shift',
      problem: 'Liam O’Connor is assigned 6 active multi-line orders while Aisha Patel has only 3.',
      businessImpact: 'Risk of operator fatigue and pick sequence errors.',
      aiRecommendation: 'Rebalance 2 active orders from Liam O’Connor to Aisha Patel in Aisle A.',
      businessReason: 'Equalizes task distribution and reduces order cycle time by 18 mins.',
      confidenceScore: 92,
      estimatedBenefit: 'Balanced workload and zero missed pick deadlines.',
      actionLabel: 'Balance Pick Load',
      actionType: 'REBALANCE_LOAD',
      timestamp: '1h ago',
    });

    // Decision 7: Cold Storage Zone C Capacity Utilization Warning
    decisions.push({
      id: 'DEC-07',
      severity: 'High',
      category: 'Spatial',
      title: 'Cold Storage Zone C Approaching 84% Volumetric Threshold',
      problem: 'Incoming pallet shipment of A5 Wagyu and Artisan Cheeses arriving at 15:00.',
      businessImpact: 'Lack of compliant temperature-controlled bin space upon arrival.',
      aiRecommendation: 'Consolidate 6 partial shelves in Racks C01-C03 to open 4 full pallet spaces.',
      businessReason: 'Prevents cold-chain staging dock violation.',
      confidenceScore: 95,
      estimatedBenefit: 'Zero dock dwell time for perishable inbound goods.',
      actionLabel: 'Optimize Zone C Shelves',
      actionType: 'OPTIMIZE_SPATIAL',
      timestamp: '1h 15m ago',
    });

    // Decision 8: High Velocity Demand Surge on Fast Chargers
    decisions.push({
      id: 'DEC-08',
      severity: 'Medium',
      category: 'Inventory',
      title: 'Re-slot SKU-ELE-006 (140W GaN Charger) to Fast Moving Aisle A',
      problem: 'Product pick frequency increased by 310% over the last 48 hours; currently in Standard Aisle E.',
      businessImpact: 'Pickers walk an extra 420 meters per shift to retrieve chargers.',
      aiRecommendation: 'Relocate 150 units from Shelf E-02-1 to Golden Pick Zone A-01-2.',
      businessReason: 'Slotting optimization reduces average pick transit time by 4.2 mins per batch.',
      confidenceScore: 93,
      estimatedBenefit: 'Saves 2.8 labor hours per shift across morning and evening pickers.',
      actionLabel: 'Relocate to Aisle A',
      actionType: 'RELOCATE_SKU',
      timestamp: '1h 30m ago',
    });

    // Decision 9: Night Shift Restock Optimization
    decisions.push({
      id: 'DEC-09',
      severity: 'Low',
      category: 'Workforce',
      title: 'Pre-stage 22 Fast-Moving SKUs for Night Shift Restocking',
      problem: 'Morning shift pick waves depleted front bins in Aisle A by 65%.',
      businessImpact: 'Morning shift pickers would face stock starvation at 06:00 tomorrow.',
      aiRecommendation: 'Assign Night Shift Crew (Dmitri & Jackson) to bulk replenishment from Zone D to Zone A.',
      businessReason: 'Guarantees 100% bin availability before peak morning dispatches.',
      confidenceScore: 97,
      estimatedBenefit: 'Eliminates 45 minutes of morning shift downtime.',
      actionLabel: 'Schedule Night Restock',
      actionType: 'SCHEDULE_RESTOCK',
      timestamp: '2h ago',
    });

    // Decision 10: High-Value Secure Cage Access Protocol
    decisions.push({
      id: 'DEC-10',
      severity: 'Medium',
      category: 'Spatial',
      title: 'Batch Pick Consolidation for High-Value Cage B',
      problem: '8 separate orders require single-item access to biometric High Value Cage B.',
      businessImpact: 'Supervisor keycard bottleneck causing queue delays.',
      aiRecommendation: 'Consolidate all 8 items into a single secure batch pick route under Supervisor Marcus Vance.',
      businessReason: 'Reduces vault entry/exit cycles from 8 down to 1.',
      confidenceScore: 96,
      estimatedBenefit: 'Cuts high-value item retrieval time by 75%.',
      actionLabel: 'Consolidate Vault Pick',
      actionType: 'CONSOLIDATE_PICK',
      timestamp: '2h 15m ago',
    });

    // Decision 11: Cross-Docking Opportunity for Same-Day Dispatches
    decisions.push({
      id: 'DEC-11',
      severity: 'High',
      category: 'Fulfillment',
      title: 'Direct Cross-Dock Opportunity for 12 Inbound Audio Monitors',
      problem: 'Incoming shipment from Apex Display matches 3 pending Platinum customer backorders.',
      businessImpact: 'Avoids putting goods away into high racks only to pick them 1 hour later.',
      aiRecommendation: 'Route 6 boxes directly from Inbound Receiving Bay 1 to Outbound Pack Station 2.',
      businessReason: 'Zero put-away labor and immediate customer dispatch.',
      confidenceScore: 99,
      estimatedBenefit: 'Eliminates 2 hours of handling and meets 13:00 SameDay courier cutoff.',
      actionLabel: 'Enable Cross-Docking',
      actionType: 'CROSS_DOCK',
      timestamp: '2h 45m ago',
    });

    // Decision 12: Slow-Moving Obsolete Inventory in Bulk Zone D
    decisions.push({
      id: 'DEC-12',
      severity: 'Low',
      category: 'Inventory',
      title: 'Consolidate 3 Pallets of Slow-Moving Teak Furniture',
      problem: 'SKU-FUR-084 has had 0 picks in 30 days while occupying 3 prime ground pallet slots in Zone D.',
      businessImpact: 'Occupies valuable high-turnover bulk staging space.',
      aiRecommendation: 'Move pallets to Tier 4 upper rack storage to free ground slots for motor oil.',
      businessReason: 'Optimizes ergonomic access for fast-moving bulk liquids.',
      confidenceScore: 88,
      estimatedBenefit: 'Frees 3 ground pallet positions for high-velocity goods.',
      actionLabel: 'Move to Upper Rack',
      actionType: 'MOVE_UPPER_RACK',
      timestamp: '3h ago',
    });

    // Decision 13: Express Order Imminent SLA Breach
    decisions.push({
      id: 'DEC-13',
      severity: 'Critical',
      category: 'Fulfillment',
      title: 'Order #ORD-2026001 Delivery SLA Within 90 Minutes',
      problem: 'Order value $3,450 for BioPharma Global Corp is currently in PICKED status, awaiting packing.',
      businessImpact: 'Courier departure in 45 mins; missing it results in delivery contract default.',
      aiRecommendation: 'Fast-track tote directly to Pack Station 1 with VIP packaging label.',
      businessReason: 'Guarantees courier handoff before 12:30 outbound cutoff.',
      confidenceScore: 97,
      estimatedBenefit: '100% on-time delivery SLA compliance.',
      actionLabel: 'Fast-Track Packing',
      actionType: 'FAST_TRACK',
      timestamp: '3h 10m ago',
    });

    // Decision 14: Barcode Scanning & Bin Audit Mismatch
    decisions.push({
      id: 'DEC-14',
      severity: 'Medium',
      category: 'Quality',
      title: 'Cycle Count Audit for Aisle E Shelf 03-1',
      problem: 'Picker reported picking discrepancy on Ergonomic Stools (system says 45, physical count seems 42).',
      businessImpact: 'Potential future order backorder if phantom inventory is allocated.',
      aiRecommendation: 'Trigger 10-minute cycle count audit to adjust system inventory before next order batch.',
      businessReason: 'Maintains 99.8% database inventory accuracy.',
      confidenceScore: 91,
      estimatedBenefit: 'Prevents mis-picks and phantom stock allocations.',
      actionLabel: 'Trigger Cycle Count',
      actionType: 'CYCLE_COUNT',
      timestamp: '3h 30m ago',
    });

    // Decision 15: Supplier Lead Time SLA Delay from Pacific Coast Seafood
    decisions.push({
      id: 'DEC-15',
      severity: 'High',
      category: 'Logistics',
      title: 'Supplier Delayed Shipment Alert: Pacific Coast Seafood',
      problem: 'Vendor notified 14-hour delivery delay on Wild Salmon due to fleet mechanical issue.',
      businessImpact: '4 upcoming Gold Tier restaurant orders cannot be filled on time tomorrow morning.',
      aiRecommendation: 'Notify customers with proactive compensation credit and reserve substitute Mediterranean trout.',
      businessReason: 'Maintains transparent communication and avoids unexpected customer cancellations.',
      confidenceScore: 94,
      estimatedBenefit: '90% retention of affected customer orders.',
      actionLabel: 'Notify Customers',
      actionType: 'NOTIFY_CUSTOMERS',
      timestamp: '4h ago',
    });

    return decisions;
  }

  /**
   * 4. Generate Reorder Recommendations
   */
  public generateReorderRecommendations(products: Product[] = []): ReorderRecommendation[] {
    return products
      .filter((p) => p.stock <= p.reorderLevel * 1.5)
      .map((p) => {
        const dailyBurnRate = Math.max(0.5, (p.demandScore * 1.2));
        const daysRemaining = Math.max(0, Math.round((p.stock / dailyBurnRate) * 10) / 10);
        const suggestedQty = Math.max(30, p.reorderLevel * 3 - p.stock);
        const estimatedCost = suggestedQty * p.unitPrice;

        let priority: 'Critical' | 'High' | 'Medium' | 'Low' = 'Medium';
        if (p.stock === 0) priority = 'Critical';
        else if (daysRemaining <= 2) priority = 'Critical';
        else if (daysRemaining <= 5) priority = 'High';
        else priority = 'Medium';

        let reason = '';
        if (p.stock === 0) {
          reason = 'Product is completely out of stock with active order demand.';
        } else if (daysRemaining <= 2) {
          reason = `High velocity demand will exhaust remaining stock within ${daysRemaining} days.`;
        } else {
          reason = 'Stock level has breached minimum safety reorder threshold.';
        }

        return {
          id: `reorder-${p.id}`,
          sku: p.sku,
          productName: p.name,
          category: p.category,
          currentStock: p.stock,
          reorderLevel: p.reorderLevel,
          predictedDaysRemaining: daysRemaining,
          suggestedQuantity: suggestedQty,
          supplier: p.supplier,
          priority,
          reason,
          unitPrice: p.unitPrice,
          estimatedCost: Math.round(estimatedCost),
        };
      })
      .sort((a, b) => a.predictedDaysRemaining - b.predictedDaysRemaining);
  }

  /**
   * 5. Generate Operational Bottlenecks
   */
  public generateBottlenecks(
    employees: WarehouseEmployee[] = [],
    dashboard?: DashboardSummary,
    weather?: WeatherData
  ): OperationalBottleneck[] {
    return [
      {
        id: 'bot-1',
        area: 'Packing Station',
        severity: 'Critical',
        cause: 'High ratio of multi-item orders needing custom cardboard void fill at Pack Station 3.',
        businessImpact: 'Totes accumulating in front of packing conveyor; slowing down overall line velocity.',
        recommendation: 'Reallocate 2 morning shift pickers to packing lines 2 & 3 for the next 90 minutes.',
        expectedImprovement: '+32% packing throughput and backlog clearance in 45 mins.',
        metrics: {
          label: 'Queue Dwell Time',
          value: '18.4 mins (SLA: <8 mins)',
        },
      },
      {
        id: 'bot-2',
        area: 'Workforce Load',
        severity: 'Warning',
        cause: 'Picker Liam O’Connor & Carlos Mendez have 5+ concurrent active pick batches assigned.',
        businessImpact: 'Picker fatigue and elevated cycle time per SKU line item.',
        recommendation: 'Auto-reassign 3 pick batches to Aisha Patel and Mei-Ling Zhou in Aisle A.',
        expectedImprovement: '-22% average order pick latency.',
        metrics: {
          label: 'Operator Load Variance',
          value: '3.2x deviation between staff',
        },
      },
      {
        id: 'bot-3',
        area: 'Zone Congestion',
        severity: 'Warning',
        cause: 'Cold Chain Storage Zone C is operating at 84% capacity utilization ahead of afternoon dairy truck.',
        businessImpact: 'Limited pallet maneuvering space for electric pallet jacks.',
        recommendation: 'Execute immediate bin consolidation across Racks C01 and C02.',
        expectedImprovement: 'Opens 4 full pallet spaces and cuts staging dock dwell by 15 mins.',
        metrics: {
          label: 'Zone C Capacity',
          value: '84% utilized (Max: 85%)',
        },
      },
      {
        id: 'bot-4',
        area: 'Inbound Transit',
        severity: weather?.isAdverse ? 'Critical' : 'Moderate',
        cause: weather?.isAdverse
          ? 'Regional thunderstorm front slowing Interstate freight transport.'
          : 'High crosswinds causing minor delivery corridor speed reductions.',
        businessImpact: 'Inbound raw merchandise delivery delayed by ~45 minutes.',
        recommendation: 'Pre-allocate current safety stock for morning express dispatches.',
        expectedImprovement: '100% on-time dispatch rate preserved.',
        metrics: {
          label: 'Transit Delay Index',
          value: weather?.isAdverse ? '+45 mins delay' : '+15 mins delay',
        },
      },
    ];
  }

  /**
   * 6. Generate Operational Exceptions ($Problem \rightarrow Decision \rightarrow Resolution$)
   */
  public generateExceptions(): OperationalException[] {
    return [
      {
        id: 'exc-1',
        type: 'Low Stock',
        severity: 'Critical',
        problem: 'SKU-ELE-004 (HyperDrive SSD 2TB) stock is 8 units, below safety threshold 25.',
        decision: 'Prioritize allocation exclusively for Platinum Tier customers; backorder standard accounts.',
        resolution: 'Generated Emergency PO #PO-88192 to SiliconEdge Ltd for 100 units with overnight freight.',
        isResolved: false,
        timestamp: '14m ago',
      },
      {
        id: 'exc-2',
        type: 'Damaged Items',
        severity: 'High',
        problem: '3 boxes of French Terry Hoodies discovered torn in Bulk Pallet Zone D.',
        decision: 'Remove from sellable inventory and isolate in Quarantine Bay 4.',
        resolution: 'Supplier credit claim filed with UrbanThread Tailors; inventory ledger adjusted.',
        isResolved: false,
        timestamp: '42m ago',
      },
      {
        id: 'exc-3',
        type: 'Packing Delay',
        severity: 'High',
        problem: 'Packing line 2 conveyor jam halted outbound processing for 18 minutes.',
        decision: 'Reroute overflow totes to packing line 4 and notify dock supervisor.',
        resolution: 'Maintenance team cleared jam; 2 additional packers assigned to clear backlog.',
        isResolved: true,
        timestamp: '1h 10m ago',
      },
      {
        id: 'exc-4',
        type: 'Weather Risk',
        severity: 'Medium',
        problem: 'Heavy rain advisory for outbound delivery route to Hub West.',
        decision: 'Accelerate carrier pickup by 45 minutes and wrap outbound pallets in weather seal.',
        resolution: 'Pallets sealed and loaded onto early dispatch truck #TRK-901.',
        isResolved: true,
        timestamp: '2h ago',
      },
      {
        id: 'exc-5',
        type: 'Missed Deadline',
        severity: 'Critical',
        problem: 'Order #ORD-2026048 was delayed in picking due to missing barcode on shelf.',
        decision: 'Supervisor manual override and express courier handoff.',
        resolution: 'Shelf barcode replaced; customer issued $50 credit and expedited tracking.',
        isResolved: false,
        timestamp: '2h 30m ago',
      },
    ];
  }
}

export const decisionIntelligenceService = new DecisionIntelligenceService();
