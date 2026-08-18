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
  category?: ProductCategory | string;
  description?: string | null;
  stock?: number;
  reservedStock?: number;
  damagedStock?: number;
  reorderLevel?: number;
  supplier?: string;
  warehouseLocation?: string;
  unitPrice?: number;
  demandScore?: number;
}

export interface ProductFilters {
  category?: string;
  status?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'damaged';
  search?: string;
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

