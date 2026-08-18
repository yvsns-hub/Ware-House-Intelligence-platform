// Base Entity Types matching Prisma Models

export type ProductCategory =
  | 'Electronics'
  | 'Groceries'
  | 'Medicine'
  | 'Fashion'
  | 'Furniture'
  | 'Automotive';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory | string;
  description: string | null;
  stock: number;
  reservedStock: number;
  damagedStock: number;
  reorderLevel: number;
  supplier: string;
  warehouseLocation: string;
  warehouseId?: string;
  imageUrl?: string;
  unitPrice: number;
  demandScore: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  orderItems?: OrderItem[];
  inventoryTransactions?: InventoryTransaction[];
}

export interface CreateProductDTO {
  name: string;
  sku: string;
  category: ProductCategory | string;
  description?: string;
  stock: number;
  reorderLevel: number;
  supplier: string;
  warehouseLocation: string;
  warehouseId?: string;
  imageUrl?: string;
  unitPrice: number;
}

export type CustomerTier = 'Platinum' | 'Gold' | 'Silver' | 'Standard';
export type OrderPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ShippingType = 'Express' | 'SameDay' | 'Standard' | 'Freight';
export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'PICKED'
  | 'PACKED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerTier: CustomerTier | string;
  priority: OrderPriority | string;
  shippingType: ShippingType | string;
  deliveryDeadline: Date | string;
  orderValue: number;
  status: OrderStatus | string;
  totalItems: number;
  createdAt: Date | string;
  items?: OrderItem[];
}

export type OrderItemStatus =
  | 'ALLOCATED'
  | 'PARTIALLY_ALLOCATED'
  | 'BACKORDERED'
  | 'PICKED'
  | 'PACKED';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  allocatedQuantity: number;
  status: OrderItemStatus | string;
  order?: Order;
  product?: Product;
}

export type EmployeeRole = 'Picker' | 'Packer' | 'Supervisor';
export type EmployeeShift = 'Morning' | 'Evening' | 'Night';

export interface WarehouseEmployee {
  id: string;
  name: string;
  role: EmployeeRole | string;
  efficiencyScore: number; // e.g. 70.0 - 99.5
  activeOrders: number;
  shift: EmployeeShift | string;
}

export type WarehouseZone =
  | 'Cold Storage'
  | 'High Value'
  | 'Bulk Cargo'
  | 'Fast Moving'
  | 'Standard';

export interface WarehouseLocation {
  id: string;
  aisle: string;
  rack: string;
  shelf: string;
  zone: WarehouseZone | string;
}

export type InventoryTransactionType =
  | 'Inbound'
  | 'Outbound'
  | 'Damaged'
  | 'Adjusted'
  | 'Transferred';

export interface InventoryTransaction {
  id: string;
  productId: string;
  quantity: number;
  type: InventoryTransactionType | string;
  timestamp: Date | string;
  product?: Product;
}

// DTOs & Request / Response Types

export interface CreateOrderDTO {
  customerName: string;
  customerTier?: CustomerTier | string;
  priority?: OrderPriority | string;
  shippingType?: ShippingType | string;
  deliveryDeadline: string | Date;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export interface UpdateOrderDTO {
  status?: OrderStatus | string;
  priority?: OrderPriority | string;
  shippingType?: ShippingType | string;
  deliveryDeadline?: string | Date;
}

export interface UpdateProductDTO {
  name?: string;
  sku?: string;
  category?: ProductCategory | string;
  description?: string | null;
  stock?: number;
  reservedStock?: number;
  damagedStock?: number;
  reorderLevel?: number;
  supplier?: string;
  warehouseLocation?: string;
  warehouseId?: string;
  imageUrl?: string;
  unitPrice?: number;
  demandScore?: number;
}

export interface ProductFilters {
  category?: string;
  status?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'damaged';
  search?: string;
  warehouseId?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'stock' | 'demandScore' | 'unitPrice' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface OrderFilters {
  status?: string;
  priority?: string;
  customerTier?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'deliveryDeadline' | 'orderValue' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

export interface EmployeeFilters {
  role?: string;
  shift?: string;
  minEfficiency?: number;
}

export interface LocationFilters {
  zone?: string;
  aisle?: string;
}

// API Response Standard Wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

// Dashboard Aggregated Metrics
export interface DashboardSummary {
  inventory: {
    totalProducts: number;
    totalStockUnits: number;
    totalStockValue: number;
    lowStockCount: number;
    outOfStockCount: number;
    damagedStockCount: number;
    categoryDistribution: Record<string, number>;
  };
  orders: {
    totalOrders: number;
    pendingOrders: number;
    processingOrders: number;
    urgentOrders: number;
    todayOrderValue: number;
    fulfillmentRate: number;
  };
  workforce: {
    totalEmployees: number;
    activePickers: number;
    activePackers: number;
    averageEfficiency: number;
    currentShiftStaff: number;
  };
  locations: {
    totalLocations: number;
    zoneUtilization: Record<string, number>;
  };
  weatherImpact: {
    condition: string;
    temperature: number;
    disruptionRisk: 'LOW' | 'MEDIUM' | 'HIGH';
    logisticsAdvisory: string;
  };
}

// AI & Decision Engine Types
export interface AIAnalysisRequest {
  query?: string;
  context?: 'inventory' | 'orders' | 'workforce' | 'bottlenecks' | 'general';
  parameters?: Record<string, any>;
}

export interface AIAnalysisResponse {
  insights: string[];
  recommendations: Array<{
    id: string;
    type: 'RESTOCK' | 'REALLOCATE' | 'PRIORITIZE_ORDER' | 'STAFFING_ADJUSTMENT';
    title: string;
    description: string;
    impactLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    suggestedAction: string;
    confidenceScore: number;
  }>;
  riskAssessment: {
    bottleneckZone: string;
    delayedOrdersCount: number;
    stockoutRiskProducts: string[];
  };
  generatedAt: string;
}

// Weather Types
export interface WeatherData {
  temperature: number;
  windSpeed: number;
  precipitation: number;
  condition: string;
  humidity: number;
  isAdverse: boolean;
  source: 'OpenWeather' | 'Open-Meteo' | 'Fallback';
  timestamp: string;
}

// 3-Level Inventory Allocation & Stock Shortage Decision Strategy Types
export type ShortageDecisionStage = 'ALLOCATED' | 'TRANSFER' | 'AI_RECOMMENDATION' | 'DELAY';

export type AIStrategyType =
  | 'Split Shipment'
  | 'Partial Fulfillment'
  | 'Reserve Incoming Stock'
  | 'Urgent Purchase Order'
  | 'Substitute Product'
  | 'Expedite Supplier'
  | 'Prioritize Premium Order'
  | 'Notify Customer';

export interface CrossHubTransferInfo {
  sourceHubId: string;
  sourceHubName: string;
  destinationHubId: string;
  destinationHubName: string;
  transferQuantity: number;
  estimatedArrivalTime: string; // e.g. "3 hours"
  transportationCost: number; // e.g. 150
  message: string; // e.g. "12 units are available in Hub B. Estimated transfer time is 3 hours. Transfer inventory to fulfill the order without affecting SLA."
}

export interface AIShortageRecommendation {
  strategyType: AIStrategyType;
  problem: string; // e.g. "Insufficient inventory across all hubs"
  recommendation: string; // e.g. "Ship 5 units now, Backorder 3 units"
  reason: string; // e.g. "Maintains premium SLA for Platinum account"
  businessImpact: string; // e.g. "Revenue Protected ₹1,80,000"
  confidenceScore: number; // e.g. 96
  estimatedSLAImpact: string; // e.g. "0% SLA Breach Penalty"
}

export interface DelayOrderInfo {
  delayReason: string; // e.g. "Global stock shortage across all regional hubs and suppliers"
  expectedRestockTime: string; // e.g. "48 hours"
  newDeliveryDate: string; // e.g. "Aug 22, 2026"
  priorityLevel: string; // e.g. "URGENT_PO_BACKORDER"
  notificationSent: boolean;
}

export interface StockShortageResolution {
  orderId: string;
  orderNumber: string;
  productSku: string;
  productName: string;
  currentStock: number;
  requiredStock: number;
  decisionStage: ShortageDecisionStage;
  stepsProgress: {
    step1CrossHubCheck: boolean; // Check Nearby Warehouse Hubs
    step2AIRecommendation: boolean; // AI Recommendation Engine
    step3Delay: boolean; // Delay Order (Last Resort)
  };
  transferInfo?: CrossHubTransferInfo;
  aiRecommendation?: AIShortageRecommendation;
  delayInfo?: DelayOrderInfo;
  businessImpact: string;
  actionLabel: string;
  notificationMessage: string;
}

// ----------------------------------------------------
// WAREHOUSEIQ 2.0 DOMAIN TYPES
// ----------------------------------------------------

export type EventSeverity = 'INFO' | 'WARNING' | 'HIGH' | 'CRITICAL';

export type EventType =
  | 'DEMAND_SPIKE'
  | 'STOCKOUT_RISK'
  | 'ORDER_SURGE'
  | 'DELAYED_ORDER'
  | 'EMPLOYEE_SHORTAGE'
  | 'PICKER_OVERLOAD'
  | 'PACKING_BOTTLENECK'
  | 'WAREHOUSE_CONGESTION'
  | 'SUPPLIER_DELAY'
  | 'WEATHER_RISK'
  | 'DAMAGED_INVENTORY'
  | 'FAILED_TRANSFER'
  | 'CRITICAL_CUSTOMER_ORDER'
  | 'DELIVERY_RISK';

export type EventStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED' | 'DISMISSED';

export interface WarehouseEvent {
  id: string;
  eventType: EventType | string;
  severity: EventSeverity;
  warehouseId: string;
  productId?: string | null;
  orderId?: string | null;
  description: string;
  metadata?: Record<string, any> | string | null;
  status: EventStatus | string;
  source: string;
  timestamp: Date | string;
}

export type DecisionStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'EXECUTED'
  | 'FAILED'
  | 'SIMULATED';

export type DecisionType =
  | 'CROSS_HUB_TRANSFER'
  | 'PRODUCT_SUBSTITUTION'
  | 'EXPEDITE_SUPPLIER'
  | 'SPLIT_SHIPMENT'
  | 'DELAY_ORDER'
  | 'WORKFORCE_REBALANCE'
  | 'REORDER';

export interface ExplainableDecision {
  decisionId: string;
  decisionType: DecisionType | string;
  recommendation: string;
  confidence: number;
  reasons: string[];
  evidence: Record<string, string | number | boolean>;
  expectedImpact: string;
  estimatedCost: number;
  estimatedSavings?: number;
  alternatives: Array<{
    title: string;
    cost: number;
    impact: string;
    tradeoff: string;
  }>;
  createdAt: string | Date;
  status: DecisionStatus;
  warehouseId: string;
  targetEntityId?: string;
  approvedBy?: string | null;
  executedAt?: string | Date | null;
}

export interface AuditLogEntry {
  id: string;
  user: string;
  role: string;
  action: string;
  decisionId?: string | null;
  previousState?: string | null;
  newState?: string | null;
  reason: string;
  source: string;
  approvalStatus: string;
  timestamp: Date | string;
}

export interface SupplierInfo {
  id: string;
  name: string;
  code: string;
  category: string;
  reliabilityScore: number;
  qualityScore: number;
  avgDelayDays: number;
  costIndex: number;
  responseTimeHours: number;
  emergencySupported: boolean;
  contactEmail?: string | null;
}

export interface DamageInspectionRecord {
  id: string;
  sku: string;
  productName: string;
  damageType: 'TORN_PACKAGING' | 'DENT' | 'LEAKAGE' | 'MISSING_LABEL' | 'CRUSHED';
  severity: 'MINOR' | 'MODERATE' | 'SEVERE' | 'CRITICAL';
  imageUrl?: string | null;
  confidenceScore: number;
  status: 'QUARANTINED' | 'DISPOSED' | 'REPACKAGED' | 'RETURNED_TO_VENDOR';
  notes?: string | null;
  inspectedBy: string;
  timestamp: Date | string;
}

export interface WhatIfSimulationParams {
  demandChangePercent: number; // e.g. +30% or -20%
  additionalOrders: number; // e.g. 500
  inventoryReductionPercent: number; // e.g. 15%
  supplierDelayDays: number; // e.g. 3
  workforceChangePercent: number; // e.g. -10% or +20%
  warehouseClosure?: string | null; // e.g. 'hub-03'
  weatherDisruptionSeverity?: 'NONE' | 'MODERATE' | 'SEVERE';
}

export interface SimulationStateMetrics {
  fulfillmentRate: number; // e.g. 96.4%
  stockoutRiskSKUs: number; // e.g. 8
  delayedOrders: number; // e.g. 4
  warehouseWorkloadPercent: number; // e.g. 78%
  requiredWorkforceHeadcount: number; // e.g. 24
  estimatedTotalCost: number; // e.g. ₹42,000
  slaBreachRiskPercent: number; // e.g. 5%
}

export interface WhatIfSimulationResult {
  scenarioId: string;
  params: WhatIfSimulationParams;
  currentState: SimulationStateMetrics;
  simulatedState: SimulationStateMetrics;
  difference: {
    fulfillmentRateDelta: number;
    stockoutSKUsDelta: number;
    delayedOrdersDelta: number;
    workloadDelta: number;
    workforceHeadcountDelta: number;
    costDelta: number;
    slaRiskDelta: number;
  };
  recommendedActions: Array<{
    id: string;
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    action: string;
    impact: string;
    confidence: number;
  }>;
  calculatedAt: string;
}

export interface WorkforceAllocationPlan {
  id: string;
  warehouseId: string;
  timestamp: string;
  allocations: Array<{
    employeeId: string;
    employeeName: string;
    role: 'Picker' | 'Packer' | 'Supervisor';
    currentZone: string;
    recommendedZone: string;
    reason: string;
    efficiencyScore: number;
  }>;
  expectedOutcomes: {
    pickingWaitTimeDeltaPercent: number; // e.g. -23%
    throughputDeltaPercent: number; // e.g. +17%
    slaProtectedOrdersCount: number; // e.g. 31
  };
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'APPLIED';
}

export interface DeliveryRiskScoring {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerTier: string;
  destination: string;
  lateProbability: number; // 0 - 100%
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskFactors: string[];
  recommendedAction: string;
  estimatedDeliveryWindow: string;
}

export interface CostOptimizationOption {
  optionId: string;
  name: string;
  type: 'TRANSFER' | 'EMERGENCY_PO' | 'DELAY' | 'SUBSTITUTE';
  breakdown: {
    transferCost: number;
    storageCost: number;
    laborCost: number;
    supplierCost: number;
    delayCost: number;
    customerImpactCost: number;
  };
  totalCost: number;
  slaBreached: boolean;
  recommended: boolean;
  rationale: string;
}


