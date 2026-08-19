/**
 * WarehouseIQ 2.0 — Real Dataset Integration
 * =============================================
 * AUTO-GENERATED from UCI Online Retail II Dataset
 * Source: online+retail+ii/online_retail_II.xlsx
 * Generated: 2026-08-19T06:24:57.376Z
 *
 * Data sourced from:
 * Chen, D., Sain, S.L., and Guo, K. (2012), Data mining for the online retail industry:
 * A case study of RFM model-based customer segmentation using data mining.
 * UCI Machine Learning Repository.
 */

import {
  Product,
  Order,
  WarehouseEmployee,
  WarehouseLocation,
  InventoryTransaction,
  ProductCategory,
  CustomerTier,
  OrderPriority,
  ShippingType,
  OrderStatus,
  EmployeeRole,
  EmployeeShift,
  WarehouseZone,
  InventoryTransactionType,
} from '../types';

// 40 Warehouse Locations across 5 distinct zones (unchanged)
export const mockWarehouseLocations: WarehouseLocation[] = [
  {
    "id": "loc-a01-1",
    "aisle": "A",
    "rack": "01",
    "shelf": "1",
    "zone": "Fast Moving"
  },
  {
    "id": "loc-a01-2",
    "aisle": "A",
    "rack": "01",
    "shelf": "2",
    "zone": "Fast Moving"
  },
  {
    "id": "loc-a02-1",
    "aisle": "A",
    "rack": "02",
    "shelf": "1",
    "zone": "Fast Moving"
  },
  {
    "id": "loc-a02-2",
    "aisle": "A",
    "rack": "02",
    "shelf": "2",
    "zone": "Fast Moving"
  },
  {
    "id": "loc-a03-1",
    "aisle": "A",
    "rack": "03",
    "shelf": "1",
    "zone": "Fast Moving"
  },
  {
    "id": "loc-a03-2",
    "aisle": "A",
    "rack": "03",
    "shelf": "2",
    "zone": "Fast Moving"
  },
  {
    "id": "loc-a04-1",
    "aisle": "A",
    "rack": "04",
    "shelf": "1",
    "zone": "Fast Moving"
  },
  {
    "id": "loc-a04-2",
    "aisle": "A",
    "rack": "04",
    "shelf": "2",
    "zone": "Fast Moving"
  },
  {
    "id": "loc-b01-1",
    "aisle": "B",
    "rack": "01",
    "shelf": "1",
    "zone": "High Value"
  },
  {
    "id": "loc-b01-2",
    "aisle": "B",
    "rack": "01",
    "shelf": "2",
    "zone": "High Value"
  },
  {
    "id": "loc-b02-1",
    "aisle": "B",
    "rack": "02",
    "shelf": "1",
    "zone": "High Value"
  },
  {
    "id": "loc-b02-2",
    "aisle": "B",
    "rack": "02",
    "shelf": "2",
    "zone": "High Value"
  },
  {
    "id": "loc-b03-1",
    "aisle": "B",
    "rack": "03",
    "shelf": "1",
    "zone": "High Value"
  },
  {
    "id": "loc-b03-2",
    "aisle": "B",
    "rack": "03",
    "shelf": "2",
    "zone": "High Value"
  },
  {
    "id": "loc-b04-1",
    "aisle": "B",
    "rack": "04",
    "shelf": "1",
    "zone": "High Value"
  },
  {
    "id": "loc-b04-2",
    "aisle": "B",
    "rack": "04",
    "shelf": "2",
    "zone": "High Value"
  },
  {
    "id": "loc-c01-1",
    "aisle": "C",
    "rack": "01",
    "shelf": "1",
    "zone": "Cold Storage"
  },
  {
    "id": "loc-c01-2",
    "aisle": "C",
    "rack": "01",
    "shelf": "2",
    "zone": "Cold Storage"
  },
  {
    "id": "loc-c02-1",
    "aisle": "C",
    "rack": "02",
    "shelf": "1",
    "zone": "Cold Storage"
  },
  {
    "id": "loc-c02-2",
    "aisle": "C",
    "rack": "02",
    "shelf": "2",
    "zone": "Cold Storage"
  },
  {
    "id": "loc-c03-1",
    "aisle": "C",
    "rack": "03",
    "shelf": "1",
    "zone": "Cold Storage"
  },
  {
    "id": "loc-c03-2",
    "aisle": "C",
    "rack": "03",
    "shelf": "2",
    "zone": "Cold Storage"
  },
  {
    "id": "loc-c04-1",
    "aisle": "C",
    "rack": "04",
    "shelf": "1",
    "zone": "Cold Storage"
  },
  {
    "id": "loc-c04-2",
    "aisle": "C",
    "rack": "04",
    "shelf": "2",
    "zone": "Cold Storage"
  },
  {
    "id": "loc-d01-1",
    "aisle": "D",
    "rack": "01",
    "shelf": "1",
    "zone": "Bulk Cargo"
  },
  {
    "id": "loc-d01-2",
    "aisle": "D",
    "rack": "01",
    "shelf": "2",
    "zone": "Bulk Cargo"
  },
  {
    "id": "loc-d02-1",
    "aisle": "D",
    "rack": "02",
    "shelf": "1",
    "zone": "Bulk Cargo"
  },
  {
    "id": "loc-d02-2",
    "aisle": "D",
    "rack": "02",
    "shelf": "2",
    "zone": "Bulk Cargo"
  },
  {
    "id": "loc-d03-1",
    "aisle": "D",
    "rack": "03",
    "shelf": "1",
    "zone": "Bulk Cargo"
  },
  {
    "id": "loc-d03-2",
    "aisle": "D",
    "rack": "03",
    "shelf": "2",
    "zone": "Bulk Cargo"
  },
  {
    "id": "loc-d04-1",
    "aisle": "D",
    "rack": "04",
    "shelf": "1",
    "zone": "Bulk Cargo"
  },
  {
    "id": "loc-d04-2",
    "aisle": "D",
    "rack": "04",
    "shelf": "2",
    "zone": "Bulk Cargo"
  },
  {
    "id": "loc-e01-1",
    "aisle": "E",
    "rack": "01",
    "shelf": "1",
    "zone": "Standard"
  },
  {
    "id": "loc-e01-2",
    "aisle": "E",
    "rack": "01",
    "shelf": "2",
    "zone": "Standard"
  },
  {
    "id": "loc-e02-1",
    "aisle": "E",
    "rack": "02",
    "shelf": "1",
    "zone": "Standard"
  },
  {
    "id": "loc-e02-2",
    "aisle": "E",
    "rack": "02",
    "shelf": "2",
    "zone": "Standard"
  },
  {
    "id": "loc-e03-1",
    "aisle": "E",
    "rack": "03",
    "shelf": "1",
    "zone": "Standard"
  },
  {
    "id": "loc-e03-2",
    "aisle": "E",
    "rack": "03",
    "shelf": "2",
    "zone": "Standard"
  },
  {
    "id": "loc-e04-1",
    "aisle": "E",
    "rack": "04",
    "shelf": "1",
    "zone": "Standard"
  },
  {
    "id": "loc-e04-2",
    "aisle": "E",
    "rack": "04",
    "shelf": "2",
    "zone": "Standard"
  }
];

// 20 Warehouse Employees (unchanged)
export const mockEmployees: WarehouseEmployee[] = [
  {
    "id": "emp-01",
    "name": "Marcus Vance",
    "role": "Supervisor",
    "efficiencyScore": 97.5,
    "activeOrders": 0,
    "shift": "Morning"
  },
  {
    "id": "emp-02",
    "name": "Elena Rostova",
    "role": "Supervisor",
    "efficiencyScore": 96,
    "activeOrders": 0,
    "shift": "Evening"
  },
  {
    "id": "emp-03",
    "name": "David Chen",
    "role": "Supervisor",
    "efficiencyScore": 94.8,
    "activeOrders": 0,
    "shift": "Night"
  },
  {
    "id": "emp-04",
    "name": "Sarah Jenkins",
    "role": "Picker",
    "efficiencyScore": 92.4,
    "activeOrders": 4,
    "shift": "Morning"
  },
  {
    "id": "emp-05",
    "name": "Carlos Mendez",
    "role": "Picker",
    "efficiencyScore": 88.6,
    "activeOrders": 5,
    "shift": "Morning"
  },
  {
    "id": "emp-06",
    "name": "Aisha Patel",
    "role": "Picker",
    "efficiencyScore": 95.1,
    "activeOrders": 3,
    "shift": "Morning"
  },
  {
    "id": "emp-07",
    "name": "Liam OConnor",
    "role": "Picker",
    "efficiencyScore": 84.2,
    "activeOrders": 6,
    "shift": "Morning"
  },
  {
    "id": "emp-08",
    "name": "Devon Brooks",
    "role": "Picker",
    "efficiencyScore": 91,
    "activeOrders": 4,
    "shift": "Evening"
  },
  {
    "id": "emp-09",
    "name": "Mei-Ling Zhou",
    "role": "Picker",
    "efficiencyScore": 93.8,
    "activeOrders": 3,
    "shift": "Evening"
  },
  {
    "id": "emp-10",
    "name": "Tariq Al-Mansoor",
    "role": "Picker",
    "efficiencyScore": 86.5,
    "activeOrders": 5,
    "shift": "Evening"
  },
  {
    "id": "emp-11",
    "name": "Hanna Lindqvist",
    "role": "Picker",
    "efficiencyScore": 89.2,
    "activeOrders": 4,
    "shift": "Evening"
  },
  {
    "id": "emp-12",
    "name": "Jackson Reed",
    "role": "Picker",
    "efficiencyScore": 87,
    "activeOrders": 2,
    "shift": "Night"
  },
  {
    "id": "emp-13",
    "name": "Fatima Zahra",
    "role": "Picker",
    "efficiencyScore": 90.5,
    "activeOrders": 3,
    "shift": "Night"
  },
  {
    "id": "emp-14",
    "name": "James Wilson",
    "role": "Packer",
    "efficiencyScore": 94,
    "activeOrders": 5,
    "shift": "Morning"
  },
  {
    "id": "emp-15",
    "name": "Chloe Dubois",
    "role": "Packer",
    "efficiencyScore": 91.5,
    "activeOrders": 4,
    "shift": "Morning"
  },
  {
    "id": "emp-16",
    "name": "Rajesh Kumar",
    "role": "Packer",
    "efficiencyScore": 96.2,
    "activeOrders": 6,
    "shift": "Morning"
  },
  {
    "id": "emp-17",
    "name": "Sofia Rodriguez",
    "role": "Packer",
    "efficiencyScore": 89.9,
    "activeOrders": 4,
    "shift": "Evening"
  },
  {
    "id": "emp-18",
    "name": "Lucas Meyer",
    "role": "Packer",
    "efficiencyScore": 92.7,
    "activeOrders": 5,
    "shift": "Evening"
  },
  {
    "id": "emp-19",
    "name": "Kavita Sharma",
    "role": "Packer",
    "efficiencyScore": 88,
    "activeOrders": 2,
    "shift": "Night"
  },
  {
    "id": "emp-20",
    "name": "Dmitri Volkov",
    "role": "Packer",
    "efficiencyScore": 93.3,
    "activeOrders": 3,
    "shift": "Night"
  }
];

// ─── 100 REAL Products from UCI Online Retail II Dataset ─────────────────────
export const mockProducts: Product[] = [
  {
    "id": "prod-real-001",
    "sku": "85123A",
    "name": "White Hanging Heart T-Light Holder",
    "category": "Furniture",
    "description": "White Hanging Heart T-Light Holder — Sourced from UCI Online Retail dataset (141 real orders)",
    "stock": 152,
    "reservedStock": 20,
    "damagedStock": 4,
    "reorderLevel": 84,
    "supplier": "Eastern Imports Ltd",
    "warehouseLocation": "loc-a01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.95,
    "demandScore": 10,
    "createdAt": "2026-06-26T06:24:57.370Z",
    "updatedAt": "2026-08-06T06:24:57.370Z"
  },
  {
    "id": "prod-real-002",
    "sku": "22086",
    "name": "Paper Chain Kit 50'S Christmas",
    "category": "Electronics",
    "description": "Paper Chain Kit 50'S Christmas — Sourced from UCI Online Retail dataset (108 real orders)",
    "stock": 164,
    "reservedStock": 1,
    "damagedStock": 7,
    "reorderLevel": 66,
    "supplier": "Continental Goods Ltd",
    "warehouseLocation": "loc-a01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.95,
    "demandScore": 7.7,
    "createdAt": "2026-04-18T06:24:57.370Z",
    "updatedAt": "2026-07-22T06:24:57.370Z"
  },
  {
    "id": "prod-real-003",
    "sku": "22111",
    "name": "Scottie Dog Hot Water Bottle",
    "category": "Electronics",
    "description": "Scottie Dog Hot Water Bottle — Sourced from UCI Online Retail dataset (91 real orders)",
    "stock": 27,
    "reservedStock": 5,
    "damagedStock": 0,
    "reorderLevel": 21,
    "supplier": "Global Wholesale UK",
    "warehouseLocation": "loc-a02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 4.25,
    "demandScore": 6.5,
    "createdAt": "2026-05-25T06:24:57.370Z",
    "updatedAt": "2026-08-03T06:24:57.370Z"
  },
  {
    "id": "prod-real-004",
    "sku": "21232",
    "name": "Strawberry Ceramic Trinket Box",
    "category": "Furniture",
    "description": "Strawberry Ceramic Trinket Box — Sourced from UCI Online Retail dataset (87 real orders)",
    "stock": 87,
    "reservedStock": 2,
    "damagedStock": 1,
    "reorderLevel": 54,
    "supplier": "Eastern Imports Ltd",
    "warehouseLocation": "loc-a02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.25,
    "demandScore": 6.2,
    "createdAt": "2026-05-03T06:24:57.370Z",
    "updatedAt": "2026-07-20T06:24:57.370Z"
  },
  {
    "id": "prod-real-005",
    "sku": "22139",
    "name": "Retro Spot Tea Set Ceramic 11 Pc",
    "category": "Groceries",
    "description": "Retro Spot Tea Set Ceramic 11 Pc — Sourced from UCI Online Retail dataset (85 real orders)",
    "stock": 47,
    "reservedStock": 5,
    "damagedStock": 0,
    "reorderLevel": 15,
    "supplier": "Summit Supplies PLC",
    "warehouseLocation": "loc-a03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 4.95,
    "demandScore": 6,
    "createdAt": "2026-01-31T06:24:57.370Z",
    "updatedAt": "2026-07-25T06:24:57.370Z"
  },
  {
    "id": "prod-real-006",
    "sku": "22114",
    "name": "Hot Water Bottle Tea And Sympathy",
    "category": "Groceries",
    "description": "Hot Water Bottle Tea And Sympathy — Sourced from UCI Online Retail dataset (83 real orders)",
    "stock": 22,
    "reservedStock": 4,
    "damagedStock": 0,
    "reorderLevel": 24,
    "supplier": "Premier Source Inc",
    "warehouseLocation": "loc-a03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 3.95,
    "demandScore": 5.9,
    "createdAt": "2026-08-15T06:24:57.370Z",
    "updatedAt": "2026-08-15T06:24:57.370Z"
  },
  {
    "id": "prod-real-007",
    "sku": "22138",
    "name": "Baking Set 9 Piece Retrospot",
    "category": "Electronics",
    "description": "Baking Set 9 Piece Retrospot — Sourced from UCI Online Retail dataset (81 real orders)",
    "stock": 25,
    "reservedStock": 5,
    "damagedStock": 1,
    "reorderLevel": 15,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-a04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 4.95,
    "demandScore": 5.7,
    "createdAt": "2026-04-15T06:24:57.370Z",
    "updatedAt": "2026-08-09T06:24:57.370Z"
  },
  {
    "id": "prod-real-008",
    "sku": "85099B",
    "name": "Jumbo Bag Red White Spotty",
    "category": "Fashion",
    "description": "Jumbo Bag Red White Spotty — Sourced from UCI Online Retail dataset (67 real orders)",
    "stock": 50,
    "reservedStock": 9,
    "damagedStock": 0,
    "reorderLevel": 69,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-a04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.95,
    "demandScore": 4.8,
    "createdAt": "2025-10-30T06:24:57.370Z",
    "updatedAt": "2026-07-27T06:24:57.370Z"
  },
  {
    "id": "prod-real-009",
    "sku": "21212",
    "name": "Pack Of 72 Retro Spot Cake Cases",
    "category": "Groceries",
    "description": "Pack Of 72 Retro Spot Cake Cases — Sourced from UCI Online Retail dataset (66 real orders)",
    "stock": 141,
    "reservedStock": 9,
    "damagedStock": 4,
    "reorderLevel": 81,
    "supplier": "Pacific Trade Corp",
    "warehouseLocation": "loc-b01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.55,
    "demandScore": 4.7,
    "createdAt": "2026-06-07T06:24:57.370Z",
    "updatedAt": "2026-08-07T06:24:57.370Z"
  },
  {
    "id": "prod-real-010",
    "sku": "21479",
    "name": "White Skull Hot Water Bottle",
    "category": "Electronics",
    "description": "White Skull Hot Water Bottle — Sourced from UCI Online Retail dataset (63 real orders)",
    "stock": 27,
    "reservedStock": 0,
    "damagedStock": 1,
    "reorderLevel": 15,
    "supplier": "Atlantic Trading Co",
    "warehouseLocation": "loc-b01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 3.75,
    "demandScore": 4.5,
    "createdAt": "2025-09-29T06:24:57.370Z",
    "updatedAt": "2026-08-07T06:24:57.370Z"
  },
  {
    "id": "prod-real-011",
    "sku": "21034",
    "name": "Rex Cash+Carry Jumbo Shopper",
    "category": "Automotive",
    "description": "Rex Cash+Carry Jumbo Shopper — Sourced from UCI Online Retail dataset (63 real orders)",
    "stock": 5,
    "reservedStock": 1,
    "damagedStock": 0,
    "reorderLevel": 10,
    "supplier": "Eastern Imports Ltd",
    "warehouseLocation": "loc-b02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.95,
    "demandScore": 4.5,
    "createdAt": "2026-03-04T06:24:57.370Z",
    "updatedAt": "2026-08-08T06:24:57.370Z"
  },
  {
    "id": "prod-real-012",
    "sku": "21733",
    "name": "Red Hanging Heart T-Light Holder",
    "category": "Furniture",
    "description": "Red Hanging Heart T-Light Holder — Sourced from UCI Online Retail dataset (60 real orders)",
    "stock": 69,
    "reservedStock": 20,
    "damagedStock": 3,
    "reorderLevel": 33,
    "supplier": "Global Wholesale UK",
    "warehouseLocation": "loc-b02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.55,
    "demandScore": 4.3,
    "createdAt": "2025-10-10T06:24:57.370Z",
    "updatedAt": "2026-08-07T06:24:57.370Z"
  },
  {
    "id": "prod-real-013",
    "sku": "21485",
    "name": "Red Spot Heart Hot Water Bottle",
    "category": "Electronics",
    "description": "Red Spot Heart Hot Water Bottle — Sourced from UCI Online Retail dataset (60 real orders)",
    "stock": 52,
    "reservedStock": 14,
    "damagedStock": 2,
    "reorderLevel": 18,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-b03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 4.95,
    "demandScore": 4.3,
    "createdAt": "2026-02-25T06:24:57.370Z",
    "updatedAt": "2026-08-16T06:24:57.370Z"
  },
  {
    "id": "prod-real-014",
    "sku": "21231",
    "name": "Sweetheart Ceramic Trinket Box",
    "category": "Furniture",
    "description": "Sweetheart Ceramic Trinket Box — Sourced from UCI Online Retail dataset (60 real orders)",
    "stock": 54,
    "reservedStock": 4,
    "damagedStock": 2,
    "reorderLevel": 39,
    "supplier": "Heritage Wholesale Ltd",
    "warehouseLocation": "loc-b03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.25,
    "demandScore": 4.3,
    "createdAt": "2026-02-06T06:24:57.370Z",
    "updatedAt": "2026-07-25T06:24:57.370Z"
  },
  {
    "id": "prod-real-015",
    "sku": "22112",
    "name": "Chocolate Hot Water Bottle",
    "category": "Electronics",
    "description": "Chocolate Hot Water Bottle — Sourced from UCI Online Retail dataset (59 real orders)",
    "stock": 34,
    "reservedStock": 5,
    "damagedStock": 1,
    "reorderLevel": 24,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-b04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 4.95,
    "demandScore": 4.2,
    "createdAt": "2026-08-01T06:24:57.370Z",
    "updatedAt": "2026-08-03T06:24:57.370Z"
  },
  {
    "id": "prod-real-016",
    "sku": "85014B",
    "name": "Red/White Dots Ruffled Umbrella",
    "category": "Electronics",
    "description": "Red/White Dots Ruffled Umbrella — Sourced from UCI Online Retail dataset (59 real orders)",
    "stock": 140,
    "reservedStock": 40,
    "damagedStock": 5,
    "reorderLevel": 45,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-b04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 5.95,
    "demandScore": 4.2,
    "createdAt": "2025-11-16T06:24:57.370Z",
    "updatedAt": "2026-08-05T06:24:57.370Z"
  },
  {
    "id": "prod-real-017",
    "sku": "82482",
    "name": "Wooden Picture Frame White Finish",
    "category": "Furniture",
    "description": "Wooden Picture Frame White Finish — Sourced from UCI Online Retail dataset (58 real orders)",
    "stock": 61,
    "reservedStock": 1,
    "damagedStock": 3,
    "reorderLevel": 24,
    "supplier": "Eastern Imports Ltd",
    "warehouseLocation": "loc-c01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.55,
    "demandScore": 4.1,
    "createdAt": "2025-09-23T06:24:57.370Z",
    "updatedAt": "2026-08-04T06:24:57.370Z"
  },
  {
    "id": "prod-real-018",
    "sku": "72756",
    "name": "Fairy Cake Candles",
    "category": "Furniture",
    "description": "Fairy Cake Candles — Sourced from UCI Online Retail dataset (57 real orders)",
    "stock": 215,
    "reservedStock": 63,
    "damagedStock": 5,
    "reorderLevel": 72,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-c01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.49,
    "demandScore": 4,
    "createdAt": "2026-02-08T06:24:57.370Z",
    "updatedAt": "2026-07-26T06:24:57.370Z"
  },
  {
    "id": "prod-real-019",
    "sku": "79323W",
    "name": "White Cherry Lights",
    "category": "Electronics",
    "description": "White Cherry Lights — Sourced from UCI Online Retail dataset (56 real orders)",
    "stock": 62,
    "reservedStock": 17,
    "damagedStock": 3,
    "reorderLevel": 27,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-c02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 6.75,
    "demandScore": 4,
    "createdAt": "2026-08-02T06:24:57.370Z",
    "updatedAt": "2026-08-01T06:24:57.370Z"
  },
  {
    "id": "prod-real-020",
    "sku": "84879",
    "name": "Assorted Colour Bird Ornament",
    "category": "Electronics",
    "description": "Assorted Colour Bird Ornament — Sourced from UCI Online Retail dataset (54 real orders)",
    "stock": 246,
    "reservedStock": 32,
    "damagedStock": 11,
    "reorderLevel": 132,
    "supplier": "Heritage Wholesale Ltd",
    "warehouseLocation": "loc-c02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.69,
    "demandScore": 3.8,
    "createdAt": "2026-08-06T06:24:57.370Z",
    "updatedAt": "2026-08-03T06:24:57.370Z"
  },
  {
    "id": "prod-real-021",
    "sku": "82494L",
    "name": "Wooden Frame Antique White",
    "category": "Furniture",
    "description": "Wooden Frame Antique White — Sourced from UCI Online Retail dataset (54 real orders)",
    "stock": 54,
    "reservedStock": 15,
    "damagedStock": 1,
    "reorderLevel": 24,
    "supplier": "Premier Source Inc",
    "warehouseLocation": "loc-c03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.95,
    "demandScore": 3.8,
    "createdAt": "2025-12-22T06:24:57.370Z",
    "updatedAt": "2026-07-23T06:24:57.370Z"
  },
  {
    "id": "prod-real-022",
    "sku": "21181",
    "name": "Please One Person Metal Sign",
    "category": "Electronics",
    "description": "Please One Person Metal Sign — Sourced from UCI Online Retail dataset (53 real orders)",
    "stock": 29,
    "reservedStock": 8,
    "damagedStock": 0,
    "reorderLevel": 27,
    "supplier": "Heritage Wholesale Ltd",
    "warehouseLocation": "loc-c03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.1,
    "demandScore": 3.8,
    "createdAt": "2026-05-22T06:24:57.370Z",
    "updatedAt": "2026-07-22T06:24:57.370Z"
  },
  {
    "id": "prod-real-023",
    "sku": "84029E",
    "name": "Red Woolly Hottie White Heart.",
    "category": "Electronics",
    "description": "Red Woolly Hottie White Heart. — Sourced from UCI Online Retail dataset (53 real orders)",
    "stock": 103,
    "reservedStock": 9,
    "damagedStock": 1,
    "reorderLevel": 36,
    "supplier": "Summit Supplies PLC",
    "warehouseLocation": "loc-c04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.95,
    "demandScore": 3.8,
    "createdAt": "2025-12-09T06:24:57.370Z",
    "updatedAt": "2026-08-09T06:24:57.370Z"
  },
  {
    "id": "prod-real-024",
    "sku": "22083",
    "name": "Paper Chain Kit Retro Spot",
    "category": "Electronics",
    "description": "Paper Chain Kit Retro Spot — Sourced from UCI Online Retail dataset (53 real orders)",
    "stock": 136,
    "reservedStock": 3,
    "damagedStock": 4,
    "reorderLevel": 42,
    "supplier": "Eastern Imports Ltd",
    "warehouseLocation": "loc-c04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.95,
    "demandScore": 3.8,
    "createdAt": "2026-02-09T06:24:57.370Z",
    "updatedAt": "2026-07-29T06:24:57.370Z"
  },
  {
    "id": "prod-real-025",
    "sku": "21754",
    "name": "Home Building Block Word",
    "category": "Electronics",
    "description": "Home Building Block Word — Sourced from UCI Online Retail dataset (50 real orders)",
    "stock": 10,
    "reservedStock": 2,
    "damagedStock": 0,
    "reorderLevel": 12,
    "supplier": "Summit Supplies PLC",
    "warehouseLocation": "loc-d01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 5.95,
    "demandScore": 3.5,
    "createdAt": "2026-08-08T06:24:57.370Z",
    "updatedAt": "2026-07-26T06:24:57.370Z"
  },
  {
    "id": "prod-real-026",
    "sku": "84946",
    "name": "Antique Silver Tea Glass Etched",
    "category": "Groceries",
    "description": "Antique Silver Tea Glass Etched — Sourced from UCI Online Retail dataset (50 real orders)",
    "stock": 98,
    "reservedStock": 0,
    "damagedStock": 4,
    "reorderLevel": 60,
    "supplier": "Pacific Trade Corp",
    "warehouseLocation": "loc-d01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.25,
    "demandScore": 3.5,
    "createdAt": "2025-12-01T06:24:57.370Z",
    "updatedAt": "2026-07-27T06:24:57.370Z"
  },
  {
    "id": "prod-real-027",
    "sku": "84029G",
    "name": "Knitted Union Flag Hot Water Bottle",
    "category": "Electronics",
    "description": "Knitted Union Flag Hot Water Bottle — Sourced from UCI Online Retail dataset (50 real orders)",
    "stock": 21,
    "reservedStock": 6,
    "damagedStock": 0,
    "reorderLevel": 30,
    "supplier": "Continental Goods Ltd",
    "warehouseLocation": "loc-d02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 3.75,
    "demandScore": 3.5,
    "createdAt": "2026-06-01T06:24:57.370Z",
    "updatedAt": "2026-07-26T06:24:57.370Z"
  },
  {
    "id": "prod-real-028",
    "sku": "79323P",
    "name": "Pink Cherry Lights",
    "category": "Electronics",
    "description": "Pink Cherry Lights — Sourced from UCI Online Retail dataset (49 real orders)",
    "stock": 49,
    "reservedStock": 12,
    "damagedStock": 1,
    "reorderLevel": 27,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-d02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 6.75,
    "demandScore": 3.5,
    "createdAt": "2026-07-02T06:24:57.370Z",
    "updatedAt": "2026-07-30T06:24:57.370Z"
  },
  {
    "id": "prod-real-029",
    "sku": "21491",
    "name": "Set Of Three Vintage Gift Wraps",
    "category": "Fashion",
    "description": "Set Of Three Vintage Gift Wraps — Sourced from UCI Online Retail dataset (49 real orders)",
    "stock": 50,
    "reservedStock": 3,
    "damagedStock": 2,
    "reorderLevel": 30,
    "supplier": "Premier Source Inc",
    "warehouseLocation": "loc-d03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.95,
    "demandScore": 3.5,
    "createdAt": "2025-11-13T06:24:57.370Z",
    "updatedAt": "2026-07-22T06:24:57.370Z"
  },
  {
    "id": "prod-real-030",
    "sku": "22113",
    "name": "Grey Heart Hot Water Bottle",
    "category": "Electronics",
    "description": "Grey Heart Hot Water Bottle — Sourced from UCI Online Retail dataset (49 real orders)",
    "stock": 76,
    "reservedStock": 19,
    "damagedStock": 2,
    "reorderLevel": 24,
    "supplier": "Eastern Imports Ltd",
    "warehouseLocation": "loc-d03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 3.45,
    "demandScore": 3.5,
    "createdAt": "2025-12-27T06:24:57.370Z",
    "updatedAt": "2026-07-30T06:24:57.370Z"
  },
  {
    "id": "prod-real-031",
    "sku": "21931",
    "name": "Jumbo Storage Bag Suki",
    "category": "Fashion",
    "description": "Jumbo Storage Bag Suki — Sourced from UCI Online Retail dataset (48 real orders)",
    "stock": 48,
    "reservedStock": 7,
    "damagedStock": 0,
    "reorderLevel": 27,
    "supplier": "Eastern Imports Ltd",
    "warehouseLocation": "loc-d04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.95,
    "demandScore": 3.4,
    "createdAt": "2025-12-23T06:24:57.370Z",
    "updatedAt": "2026-07-23T06:24:57.370Z"
  },
  {
    "id": "prod-real-032",
    "sku": "21955",
    "name": "Union Jack Guns & Roses Doormat",
    "category": "Electronics",
    "description": "Union Jack Guns & Roses Doormat — Sourced from UCI Online Retail dataset (47 real orders)",
    "stock": 26,
    "reservedStock": 0,
    "damagedStock": 0,
    "reorderLevel": 12,
    "supplier": "Pacific Trade Corp",
    "warehouseLocation": "loc-d04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 6.75,
    "demandScore": 3.3,
    "createdAt": "2026-04-04T06:24:57.370Z",
    "updatedAt": "2026-07-29T06:24:57.370Z"
  },
  {
    "id": "prod-real-033",
    "sku": "20685",
    "name": "Red Spotty Coir Doormat",
    "category": "Electronics",
    "description": "Red Spotty Coir Doormat — Sourced from UCI Online Retail dataset (47 real orders)",
    "stock": 38,
    "reservedStock": 6,
    "damagedStock": 1,
    "reorderLevel": 12,
    "supplier": "Premier Source Inc",
    "warehouseLocation": "loc-e01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 6.75,
    "demandScore": 3.3,
    "createdAt": "2026-06-07T06:24:57.370Z",
    "updatedAt": "2026-08-10T06:24:57.370Z"
  },
  {
    "id": "prod-real-034",
    "sku": "20914",
    "name": "Set/5 Red Spotty Lid Glass Bowls",
    "category": "Electronics",
    "description": "Set/5 Red Spotty Lid Glass Bowls — Sourced from UCI Online Retail dataset (47 real orders)",
    "stock": 68,
    "reservedStock": 0,
    "damagedStock": 2,
    "reorderLevel": 21,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-e01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.95,
    "demandScore": 3.3,
    "createdAt": "2026-08-05T06:24:57.370Z",
    "updatedAt": "2026-08-04T06:24:57.370Z"
  },
  {
    "id": "prod-real-035",
    "sku": "21481",
    "name": "Fawn Blue Hot Water Bottle",
    "category": "Electronics",
    "description": "Fawn Blue Hot Water Bottle — Sourced from UCI Online Retail dataset (46 real orders)",
    "stock": 22,
    "reservedStock": 5,
    "damagedStock": 0,
    "reorderLevel": 15,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-e02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.95,
    "demandScore": 3.3,
    "createdAt": "2026-05-08T06:24:57.370Z",
    "updatedAt": "2026-07-30T06:24:57.370Z"
  },
  {
    "id": "prod-real-036",
    "sku": "21490",
    "name": "Set Of Three 50'S Gift Wraps",
    "category": "Fashion",
    "description": "Set Of Three 50'S Gift Wraps — Sourced from UCI Online Retail dataset (46 real orders)",
    "stock": 54,
    "reservedStock": 16,
    "damagedStock": 2,
    "reorderLevel": 42,
    "supplier": "Pacific Trade Corp",
    "warehouseLocation": "loc-e02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.95,
    "demandScore": 3.3,
    "createdAt": "2026-07-13T06:24:57.370Z",
    "updatedAt": "2026-08-01T06:24:57.370Z"
  },
  {
    "id": "prod-real-037",
    "sku": "20725",
    "name": "Lunch Bag Red Spotty",
    "category": "Fashion",
    "description": "Lunch Bag Red Spotty — Sourced from UCI Online Retail dataset (44 real orders)",
    "stock": 33,
    "reservedStock": 4,
    "damagedStock": 0,
    "reorderLevel": 27,
    "supplier": "Atlantic Trading Co",
    "warehouseLocation": "loc-e03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.65,
    "demandScore": 3.1,
    "createdAt": "2026-04-01T06:24:57.370Z",
    "updatedAt": "2026-08-02T06:24:57.370Z"
  },
  {
    "id": "prod-real-038",
    "sku": "21868",
    "name": "Potting Shed Tea Mug",
    "category": "Furniture",
    "description": "Potting Shed Tea Mug — Sourced from UCI Online Retail dataset (44 real orders)",
    "stock": 92,
    "reservedStock": 13,
    "damagedStock": 2,
    "reorderLevel": 30,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-e03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.25,
    "demandScore": 3.1,
    "createdAt": "2025-11-17T06:24:57.370Z",
    "updatedAt": "2026-07-22T06:24:57.370Z"
  },
  {
    "id": "prod-real-039",
    "sku": "22348",
    "name": "Tea Bag Plate Red Spotty",
    "category": "Fashion",
    "description": "Tea Bag Plate Red Spotty — Sourced from UCI Online Retail dataset (44 real orders)",
    "stock": 222,
    "reservedStock": 62,
    "damagedStock": 7,
    "reorderLevel": 75,
    "supplier": "Pacific Trade Corp",
    "warehouseLocation": "loc-e04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.85,
    "demandScore": 3.1,
    "createdAt": "2026-04-11T06:24:57.370Z",
    "updatedAt": "2026-07-30T06:24:57.370Z"
  },
  {
    "id": "prod-real-040",
    "sku": "84836",
    "name": "Zinc Metal Heart Decoration",
    "category": "Electronics",
    "description": "Zinc Metal Heart Decoration — Sourced from UCI Online Retail dataset (43 real orders)",
    "stock": 132,
    "reservedStock": 28,
    "damagedStock": 0,
    "reorderLevel": 51,
    "supplier": "Eastern Imports Ltd",
    "warehouseLocation": "loc-e04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.25,
    "demandScore": 3,
    "createdAt": "2026-05-08T06:24:57.370Z",
    "updatedAt": "2026-07-25T06:24:57.370Z"
  },
  {
    "id": "prod-real-041",
    "sku": "22189",
    "name": "Cream Heart Card Holder",
    "category": "Furniture",
    "description": "Cream Heart Card Holder — Sourced from UCI Online Retail dataset (43 real orders)",
    "stock": 40,
    "reservedStock": 4,
    "damagedStock": 2,
    "reorderLevel": 27,
    "supplier": "Eastern Imports Ltd",
    "warehouseLocation": "loc-a01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 3.95,
    "demandScore": 3,
    "createdAt": "2025-11-27T06:24:57.370Z",
    "updatedAt": "2026-08-02T06:24:57.370Z"
  },
  {
    "id": "prod-real-042",
    "sku": "21755",
    "name": "Love Building Block Word",
    "category": "Electronics",
    "description": "Love Building Block Word — Sourced from UCI Online Retail dataset (42 real orders)",
    "stock": 8,
    "reservedStock": 0,
    "damagedStock": 0,
    "reorderLevel": 12,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-a01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 5.45,
    "demandScore": 3,
    "createdAt": "2026-05-09T06:24:57.370Z",
    "updatedAt": "2026-08-19T06:24:57.370Z"
  },
  {
    "id": "prod-real-043",
    "sku": "21791",
    "name": "Vintage Heads And Tails Card Game",
    "category": "Automotive",
    "description": "Vintage Heads And Tails Card Game — Sourced from UCI Online Retail dataset (42 real orders)",
    "stock": 66,
    "reservedStock": 14,
    "damagedStock": 2,
    "reorderLevel": 30,
    "supplier": "Summit Supplies PLC",
    "warehouseLocation": "loc-a02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.06,
    "demandScore": 3,
    "createdAt": "2025-09-29T06:24:57.370Z",
    "updatedAt": "2026-08-07T06:24:57.370Z"
  },
  {
    "id": "prod-real-044",
    "sku": "21527",
    "name": "Retro Spot Traditional Teapot",
    "category": "Groceries",
    "description": "Retro Spot Traditional Teapot — Sourced from UCI Online Retail dataset (42 real orders)",
    "stock": 33,
    "reservedStock": 1,
    "damagedStock": 0,
    "reorderLevel": 12,
    "supplier": "Heritage Wholesale Ltd",
    "warehouseLocation": "loc-a02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 7.95,
    "demandScore": 3,
    "createdAt": "2026-01-04T06:24:57.370Z",
    "updatedAt": "2026-08-08T06:24:57.370Z"
  },
  {
    "id": "prod-real-045",
    "sku": "21523",
    "name": "Fancy Font Home Sweet Home Doormat",
    "category": "Electronics",
    "description": "Fancy Font Home Sweet Home Doormat — Sourced from UCI Online Retail dataset (41 real orders)",
    "stock": 45,
    "reservedStock": 12,
    "damagedStock": 1,
    "reorderLevel": 15,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-a03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 5.95,
    "demandScore": 2.9,
    "createdAt": "2025-10-04T06:24:57.370Z",
    "updatedAt": "2026-07-25T06:24:57.370Z"
  },
  {
    "id": "prod-real-046",
    "sku": "21790",
    "name": "Vintage Snap Cards",
    "category": "Automotive",
    "description": "Vintage Snap Cards — Sourced from UCI Online Retail dataset (41 real orders)",
    "stock": 24,
    "reservedStock": 5,
    "damagedStock": 0,
    "reorderLevel": 27,
    "supplier": "Continental Goods Ltd",
    "warehouseLocation": "loc-a03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.85,
    "demandScore": 2.9,
    "createdAt": "2025-12-24T06:24:57.370Z",
    "updatedAt": "2026-08-14T06:24:57.370Z"
  },
  {
    "id": "prod-real-047",
    "sku": "22125",
    "name": "Union Jack Hot Water Bottle",
    "category": "Electronics",
    "description": "Union Jack Hot Water Bottle — Sourced from UCI Online Retail dataset (41 real orders)",
    "stock": 29,
    "reservedStock": 2,
    "damagedStock": 0,
    "reorderLevel": 15,
    "supplier": "Heritage Wholesale Ltd",
    "warehouseLocation": "loc-a04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 5.95,
    "demandScore": 2.9,
    "createdAt": "2025-09-21T06:24:57.370Z",
    "updatedAt": "2026-07-27T06:24:57.370Z"
  },
  {
    "id": "prod-real-048",
    "sku": "82486",
    "name": "Wood S/3 Cabinet Ant White Finish",
    "category": "Electronics",
    "description": "Wood S/3 Cabinet Ant White Finish — Sourced from UCI Online Retail dataset (41 real orders)",
    "stock": 18,
    "reservedStock": 5,
    "damagedStock": 0,
    "reorderLevel": 15,
    "supplier": "Premier Source Inc",
    "warehouseLocation": "loc-a04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 7.95,
    "demandScore": 2.9,
    "createdAt": "2026-03-24T06:24:57.370Z",
    "updatedAt": "2026-08-10T06:24:57.370Z"
  },
  {
    "id": "prod-real-049",
    "sku": "21843",
    "name": "Retro Spot Cake Stand",
    "category": "Groceries",
    "description": "Retro Spot Cake Stand — Sourced from UCI Online Retail dataset (41 real orders)",
    "stock": 29,
    "reservedStock": 7,
    "damagedStock": 0,
    "reorderLevel": 10,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-b01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 21.7,
    "demandScore": 2.9,
    "createdAt": "2026-05-27T06:24:57.370Z",
    "updatedAt": "2026-07-22T06:24:57.370Z"
  },
  {
    "id": "prod-real-050",
    "sku": "21080",
    "name": "Set/20 Red Spotty Paper Napkins",
    "category": "Electronics",
    "description": "Set/20 Red Spotty Paper Napkins — Sourced from UCI Online Retail dataset (40 real orders)",
    "stock": 72,
    "reservedStock": 15,
    "damagedStock": 1,
    "reorderLevel": 30,
    "supplier": "Summit Supplies PLC",
    "warehouseLocation": "loc-b01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.85,
    "demandScore": 2.8,
    "createdAt": "2026-08-17T06:24:57.370Z",
    "updatedAt": "2026-08-08T06:24:57.370Z"
  },
  {
    "id": "prod-real-051",
    "sku": "85014A",
    "name": "Black/Blue Dots Ruffled Umbrella",
    "category": "Electronics",
    "description": "Black/Blue Dots Ruffled Umbrella — Sourced from UCI Online Retail dataset (39 real orders)",
    "stock": 164,
    "reservedStock": 7,
    "damagedStock": 3,
    "reorderLevel": 60,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-b02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 5.95,
    "demandScore": 2.8,
    "createdAt": "2025-12-30T06:24:57.370Z",
    "updatedAt": "2026-08-19T06:24:57.370Z"
  },
  {
    "id": "prod-real-052",
    "sku": "21484",
    "name": "Chick Grey Hot Water Bottle",
    "category": "Electronics",
    "description": "Chick Grey Hot Water Bottle — Sourced from UCI Online Retail dataset (39 real orders)",
    "stock": 18,
    "reservedStock": 0,
    "damagedStock": 0,
    "reorderLevel": 24,
    "supplier": "Eastern Imports Ltd",
    "warehouseLocation": "loc-b02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 3.45,
    "demandScore": 2.8,
    "createdAt": "2026-03-21T06:24:57.370Z",
    "updatedAt": "2026-08-12T06:24:57.370Z"
  },
  {
    "id": "prod-real-053",
    "sku": "84991",
    "name": "60 Teatime Fairy Cake Cases",
    "category": "Groceries",
    "description": "60 Teatime Fairy Cake Cases — Sourced from UCI Online Retail dataset (38 real orders)",
    "stock": 92,
    "reservedStock": 17,
    "damagedStock": 1,
    "reorderLevel": 60,
    "supplier": "Atlantic Trading Co",
    "warehouseLocation": "loc-b03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.55,
    "demandScore": 2.7,
    "createdAt": "2026-04-26T06:24:57.370Z",
    "updatedAt": "2026-08-18T06:24:57.370Z"
  },
  {
    "id": "prod-real-054",
    "sku": "21175",
    "name": "Gin + Tonic Diet Metal Sign",
    "category": "Electronics",
    "description": "Gin + Tonic Diet Metal Sign — Sourced from UCI Online Retail dataset (38 real orders)",
    "stock": 55,
    "reservedStock": 15,
    "damagedStock": 1,
    "reorderLevel": 18,
    "supplier": "Global Wholesale UK",
    "warehouseLocation": "loc-b03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.1,
    "demandScore": 2.7,
    "createdAt": "2026-01-29T06:24:57.370Z",
    "updatedAt": "2026-07-23T06:24:57.370Z"
  },
  {
    "id": "prod-real-055",
    "sku": "15056BL",
    "name": "Edwardian Parasol Black",
    "category": "Electronics",
    "description": "Edwardian Parasol Black — Sourced from UCI Online Retail dataset (38 real orders)",
    "stock": 254,
    "reservedStock": 69,
    "damagedStock": 1,
    "reorderLevel": 96,
    "supplier": "Atlantic Trading Co",
    "warehouseLocation": "loc-b04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 5.95,
    "demandScore": 2.7,
    "createdAt": "2026-08-18T06:24:57.370Z",
    "updatedAt": "2026-07-22T06:24:57.370Z"
  },
  {
    "id": "prod-real-056",
    "sku": "82483",
    "name": "Wood 2 Drawer Cabinet White Finish",
    "category": "Electronics",
    "description": "Wood 2 Drawer Cabinet White Finish — Sourced from UCI Online Retail dataset (37 real orders)",
    "stock": 27,
    "reservedStock": 4,
    "damagedStock": 0,
    "reorderLevel": 15,
    "supplier": "Eastern Imports Ltd",
    "warehouseLocation": "loc-b04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 5.95,
    "demandScore": 2.6,
    "createdAt": "2025-12-17T06:24:57.370Z",
    "updatedAt": "2026-08-18T06:24:57.370Z"
  },
  {
    "id": "prod-real-057",
    "sku": "47591D",
    "name": "Pink Fairy Cake Child'S Apron",
    "category": "Fashion",
    "description": "Pink Fairy Cake Child'S Apron — Sourced from UCI Online Retail dataset (37 real orders)",
    "stock": 41,
    "reservedStock": 12,
    "damagedStock": 1,
    "reorderLevel": 33,
    "supplier": "Global Wholesale UK",
    "warehouseLocation": "loc-c01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1621881440371-1c9f96c4c9e6?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.65,
    "demandScore": 2.6,
    "createdAt": "2026-05-17T06:24:57.370Z",
    "updatedAt": "2026-07-27T06:24:57.370Z"
  },
  {
    "id": "prod-real-058",
    "sku": "35400",
    "name": "Wooden Box Advent Calendar",
    "category": "Furniture",
    "description": "Wooden Box Advent Calendar — Sourced from UCI Online Retail dataset (36 real orders)",
    "stock": 11,
    "reservedStock": 3,
    "damagedStock": 0,
    "reorderLevel": 10,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-c01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 8.95,
    "demandScore": 2.6,
    "createdAt": "2026-05-01T06:24:57.370Z",
    "updatedAt": "2026-08-16T06:24:57.370Z"
  },
  {
    "id": "prod-real-059",
    "sku": "20975",
    "name": "12 Pencils Small Tube Red Spotty",
    "category": "Electronics",
    "description": "12 Pencils Small Tube Red Spotty — Sourced from UCI Online Retail dataset (35 real orders)",
    "stock": 73,
    "reservedStock": 4,
    "damagedStock": 2,
    "reorderLevel": 30,
    "supplier": "Heritage Wholesale Ltd",
    "warehouseLocation": "loc-c02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.65,
    "demandScore": 2.5,
    "createdAt": "2026-01-03T06:24:57.370Z",
    "updatedAt": "2026-07-31T06:24:57.370Z"
  },
  {
    "id": "prod-real-060",
    "sku": "22352",
    "name": "Lunchbox With Cutlery Retrospot",
    "category": "Furniture",
    "description": "Lunchbox With Cutlery Retrospot — Sourced from UCI Online Retail dataset (34 real orders)",
    "stock": 39,
    "reservedStock": 7,
    "damagedStock": 0,
    "reorderLevel": 21,
    "supplier": "Atlantic Trading Co",
    "warehouseLocation": "loc-c02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.55,
    "demandScore": 2.4,
    "createdAt": "2025-10-13T06:24:57.370Z",
    "updatedAt": "2026-08-15T06:24:57.370Z"
  },
  {
    "id": "prod-real-061",
    "sku": "20754",
    "name": "Retro Red Spotty Washing Up Gloves",
    "category": "Fashion",
    "description": "Retro Red Spotty Washing Up Gloves — Sourced from UCI Online Retail dataset (34 real orders)",
    "stock": 10,
    "reservedStock": 0,
    "damagedStock": 0,
    "reorderLevel": 15,
    "supplier": "Summit Supplies PLC",
    "warehouseLocation": "loc-c03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.1,
    "demandScore": 2.4,
    "createdAt": "2026-02-26T06:24:57.370Z",
    "updatedAt": "2026-07-26T06:24:57.370Z"
  },
  {
    "id": "prod-real-062",
    "sku": "21217",
    "name": "Red Spotty Round Cake Tins",
    "category": "Furniture",
    "description": "Red Spotty Round Cake Tins — Sourced from UCI Online Retail dataset (34 real orders)",
    "stock": 18,
    "reservedStock": 4,
    "damagedStock": 0,
    "reorderLevel": 12,
    "supplier": "Heritage Wholesale Ltd",
    "warehouseLocation": "loc-c03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 8.95,
    "demandScore": 2.4,
    "createdAt": "2026-02-18T06:24:57.370Z",
    "updatedAt": "2026-08-19T06:24:57.370Z"
  },
  {
    "id": "prod-real-063",
    "sku": "21429",
    "name": "Red Gingham Rose Jewellery Box",
    "category": "Furniture",
    "description": "Red Gingham Rose Jewellery Box — Sourced from UCI Online Retail dataset (34 real orders)",
    "stock": 31,
    "reservedStock": 0,
    "damagedStock": 0,
    "reorderLevel": 15,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-c04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.65,
    "demandScore": 2.4,
    "createdAt": "2025-12-14T06:24:57.370Z",
    "updatedAt": "2026-07-23T06:24:57.370Z"
  },
  {
    "id": "prod-real-064",
    "sku": "84347",
    "name": "Rotating Silver Angels T-Light Hldr",
    "category": "Furniture",
    "description": "Rotating Silver Angels T-Light Hldr — Sourced from UCI Online Retail dataset (34 real orders)",
    "stock": 312,
    "reservedStock": 45,
    "damagedStock": 11,
    "reorderLevel": 168,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-c04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.55,
    "demandScore": 2.4,
    "createdAt": "2025-09-02T06:24:57.370Z",
    "updatedAt": "2026-08-05T06:24:57.370Z"
  },
  {
    "id": "prod-real-065",
    "sku": "20727",
    "name": "Lunch Bag Black Skull.",
    "category": "Fashion",
    "description": "Lunch Bag Black Skull. — Sourced from UCI Online Retail dataset (34 real orders)",
    "stock": 44,
    "reservedStock": 4,
    "damagedStock": 0,
    "reorderLevel": 24,
    "supplier": "Global Wholesale UK",
    "warehouseLocation": "loc-d01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.65,
    "demandScore": 2.4,
    "createdAt": "2025-11-27T06:24:57.370Z",
    "updatedAt": "2026-07-27T06:24:57.370Z"
  },
  {
    "id": "prod-real-066",
    "sku": "20679",
    "name": "Edwardian Parasol Red",
    "category": "Electronics",
    "description": "Edwardian Parasol Red — Sourced from UCI Online Retail dataset (34 real orders)",
    "stock": 180,
    "reservedStock": 30,
    "damagedStock": 1,
    "reorderLevel": 87,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-d01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 5.95,
    "demandScore": 2.4,
    "createdAt": "2026-02-25T06:24:57.370Z",
    "updatedAt": "2026-07-28T06:24:57.370Z"
  },
  {
    "id": "prod-real-067",
    "sku": "22109",
    "name": "Full English Breakfast Plate",
    "category": "Electronics",
    "description": "Full English Breakfast Plate — Sourced from UCI Online Retail dataset (33 real orders)",
    "stock": 22,
    "reservedStock": 0,
    "damagedStock": 1,
    "reorderLevel": 18,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-d02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 3.39,
    "demandScore": 2.3,
    "createdAt": "2026-06-04T06:24:57.370Z",
    "updatedAt": "2026-07-23T06:24:57.370Z"
  },
  {
    "id": "prod-real-068",
    "sku": "21912",
    "name": "Vintage Snakes & Ladders",
    "category": "Electronics",
    "description": "Vintage Snakes & Ladders — Sourced from UCI Online Retail dataset (33 real orders)",
    "stock": 25,
    "reservedStock": 0,
    "damagedStock": 0,
    "reorderLevel": 12,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-d02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 3.75,
    "demandScore": 2.3,
    "createdAt": "2026-02-23T06:24:57.370Z",
    "updatedAt": "2026-07-21T06:24:57.370Z"
  },
  {
    "id": "prod-real-069",
    "sku": "22294",
    "name": "Heart Filigree Dove Small",
    "category": "Electronics",
    "description": "Heart Filigree Dove Small — Sourced from UCI Online Retail dataset (33 real orders)",
    "stock": 59,
    "reservedStock": 13,
    "damagedStock": 0,
    "reorderLevel": 69,
    "supplier": "Premier Source Inc",
    "warehouseLocation": "loc-d03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.25,
    "demandScore": 2.3,
    "createdAt": "2026-01-28T06:24:57.370Z",
    "updatedAt": "2026-08-03T06:24:57.370Z"
  },
  {
    "id": "prod-real-070",
    "sku": "22356",
    "name": "Charlotte Bag , Pink/White Spots",
    "category": "Fashion",
    "description": "Charlotte Bag , Pink/White Spots — Sourced from UCI Online Retail dataset (33 real orders)",
    "stock": 67,
    "reservedStock": 17,
    "damagedStock": 0,
    "reorderLevel": 39,
    "supplier": "Pacific Trade Corp",
    "warehouseLocation": "loc-d03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.85,
    "demandScore": 2.3,
    "createdAt": "2026-05-08T06:24:57.370Z",
    "updatedAt": "2026-07-28T06:24:57.370Z"
  },
  {
    "id": "prod-real-071",
    "sku": "20724",
    "name": "Red Spotty Charlotte Bag",
    "category": "Fashion",
    "description": "Red Spotty Charlotte Bag — Sourced from UCI Online Retail dataset (33 real orders)",
    "stock": 85,
    "reservedStock": 11,
    "damagedStock": 0,
    "reorderLevel": 39,
    "supplier": "Pacific Trade Corp",
    "warehouseLocation": "loc-d04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.85,
    "demandScore": 2.3,
    "createdAt": "2026-01-23T06:24:57.370Z",
    "updatedAt": "2026-08-19T06:24:57.370Z"
  },
  {
    "id": "prod-real-072",
    "sku": "21977",
    "name": "Pack Of 60 Pink Paisley Cake Cases",
    "category": "Groceries",
    "description": "Pack Of 60 Pink Paisley Cake Cases — Sourced from UCI Online Retail dataset (33 real orders)",
    "stock": 194,
    "reservedStock": 25,
    "damagedStock": 5,
    "reorderLevel": 66,
    "supplier": "Pacific Trade Corp",
    "warehouseLocation": "loc-d04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.55,
    "demandScore": 2.3,
    "createdAt": "2026-04-24T06:24:57.370Z",
    "updatedAt": "2026-08-14T06:24:57.370Z"
  },
  {
    "id": "prod-real-073",
    "sku": "85231B",
    "name": "Cinammon Set Of 9 T-Lights",
    "category": "Electronics",
    "description": "Cinammon Set Of 9 T-Lights — Sourced from UCI Online Retail dataset (33 real orders)",
    "stock": 25,
    "reservedStock": 0,
    "damagedStock": 1,
    "reorderLevel": 21,
    "supplier": "Premier Source Inc",
    "warehouseLocation": "loc-e01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.85,
    "demandScore": 2.3,
    "createdAt": "2026-06-28T06:24:57.370Z",
    "updatedAt": "2026-08-09T06:24:57.370Z"
  },
  {
    "id": "prod-real-074",
    "sku": "22355",
    "name": "Charlotte Bag , Suki Design",
    "category": "Fashion",
    "description": "Charlotte Bag , Suki Design — Sourced from UCI Online Retail dataset (33 real orders)",
    "stock": 31,
    "reservedStock": 5,
    "damagedStock": 1,
    "reorderLevel": 33,
    "supplier": "Global Wholesale UK",
    "warehouseLocation": "loc-e01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.85,
    "demandScore": 2.3,
    "createdAt": "2026-03-20T06:24:57.370Z",
    "updatedAt": "2026-07-25T06:24:57.370Z"
  },
  {
    "id": "prod-real-075",
    "sku": "20979",
    "name": "36 Pencils Tube Red Spotty",
    "category": "Electronics",
    "description": "36 Pencils Tube Red Spotty — Sourced from UCI Online Retail dataset (33 real orders)",
    "stock": 91,
    "reservedStock": 4,
    "damagedStock": 0,
    "reorderLevel": 39,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-e02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.25,
    "demandScore": 2.3,
    "createdAt": "2026-03-20T06:24:57.370Z",
    "updatedAt": "2026-07-22T06:24:57.370Z"
  },
  {
    "id": "prod-real-076",
    "sku": "22353",
    "name": "Lunchbox With Cutlery Fairy Cakes",
    "category": "Furniture",
    "description": "Lunchbox With Cutlery Fairy Cakes — Sourced from UCI Online Retail dataset (32 real orders)",
    "stock": 39,
    "reservedStock": 11,
    "damagedStock": 0,
    "reorderLevel": 12,
    "supplier": "Atlantic Trading Co",
    "warehouseLocation": "loc-e02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.55,
    "demandScore": 2.3,
    "createdAt": "2026-07-14T06:24:57.370Z",
    "updatedAt": "2026-08-06T06:24:57.370Z"
  },
  {
    "id": "prod-real-077",
    "sku": "22271",
    "name": "Feltcraft Doll Rosie",
    "category": "Electronics",
    "description": "Feltcraft Doll Rosie — Sourced from UCI Online Retail dataset (32 real orders)",
    "stock": 43,
    "reservedStock": 3,
    "damagedStock": 2,
    "reorderLevel": 24,
    "supplier": "Continental Goods Ltd",
    "warehouseLocation": "loc-e03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.95,
    "demandScore": 2.3,
    "createdAt": "2026-06-27T06:24:57.370Z",
    "updatedAt": "2026-07-30T06:24:57.370Z"
  },
  {
    "id": "prod-real-078",
    "sku": "22273",
    "name": "Feltcraft Doll Molly",
    "category": "Electronics",
    "description": "Feltcraft Doll Molly — Sourced from UCI Online Retail dataset (32 real orders)",
    "stock": 30,
    "reservedStock": 2,
    "damagedStock": 1,
    "reorderLevel": 24,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-e03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.95,
    "demandScore": 2.3,
    "createdAt": "2026-04-28T06:24:57.370Z",
    "updatedAt": "2026-08-01T06:24:57.370Z"
  },
  {
    "id": "prod-real-079",
    "sku": "85042",
    "name": "Antique Lily Fairy Lights",
    "category": "Electronics",
    "description": "Antique Lily Fairy Lights — Sourced from UCI Online Retail dataset (32 real orders)",
    "stock": 46,
    "reservedStock": 11,
    "damagedStock": 1,
    "reorderLevel": 27,
    "supplier": "Global Wholesale UK",
    "warehouseLocation": "loc-e04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 4.25,
    "demandScore": 2.3,
    "createdAt": "2026-06-11T06:24:57.370Z",
    "updatedAt": "2026-08-15T06:24:57.370Z"
  },
  {
    "id": "prod-real-080",
    "sku": "22082",
    "name": "Ribbon Reel Stripes Design",
    "category": "Fashion",
    "description": "Ribbon Reel Stripes Design — Sourced from UCI Online Retail dataset (32 real orders)",
    "stock": 85,
    "reservedStock": 9,
    "damagedStock": 1,
    "reorderLevel": 33,
    "supplier": "Pacific Trade Corp",
    "warehouseLocation": "loc-e04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.65,
    "demandScore": 2.3,
    "createdAt": "2026-06-28T06:24:57.370Z",
    "updatedAt": "2026-08-06T06:24:57.370Z"
  },
  {
    "id": "prod-real-081",
    "sku": "22196",
    "name": "Small Heart Measuring Spoons",
    "category": "Electronics",
    "description": "Small Heart Measuring Spoons — Sourced from UCI Online Retail dataset (32 real orders)",
    "stock": 58,
    "reservedStock": 16,
    "damagedStock": 1,
    "reorderLevel": 18,
    "supplier": "Pacific Trade Corp",
    "warehouseLocation": "loc-a01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.85,
    "demandScore": 2.3,
    "createdAt": "2026-01-14T06:24:57.370Z",
    "updatedAt": "2026-08-14T06:24:57.370Z"
  },
  {
    "id": "prod-real-082",
    "sku": "21622",
    "name": "Vintage Union Jack Cushion Cover",
    "category": "Electronics",
    "description": "Vintage Union Jack Cushion Cover — Sourced from UCI Online Retail dataset (32 real orders)",
    "stock": 43,
    "reservedStock": 1,
    "damagedStock": 2,
    "reorderLevel": 15,
    "supplier": "Heritage Wholesale Ltd",
    "warehouseLocation": "loc-a01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 4.95,
    "demandScore": 2.3,
    "createdAt": "2025-11-18T06:24:57.370Z",
    "updatedAt": "2026-07-30T06:24:57.370Z"
  },
  {
    "id": "prod-real-083",
    "sku": "22149",
    "name": "Feltcraft 6 Flower Friends",
    "category": "Electronics",
    "description": "Feltcraft 6 Flower Friends — Sourced from UCI Online Retail dataset (32 real orders)",
    "stock": 120,
    "reservedStock": 18,
    "damagedStock": 0,
    "reorderLevel": 42,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-a02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 4.3,
    "demandScore": 2.3,
    "createdAt": "2026-06-11T06:24:57.370Z",
    "updatedAt": "2026-08-05T06:24:57.370Z"
  },
  {
    "id": "prod-real-084",
    "sku": "82600",
    "name": "No Singing Metal Sign",
    "category": "Electronics",
    "description": "No Singing Metal Sign — Sourced from UCI Online Retail dataset (31 real orders)",
    "stock": 58,
    "reservedStock": 13,
    "damagedStock": 2,
    "reorderLevel": 24,
    "supplier": "Summit Supplies PLC",
    "warehouseLocation": "loc-a02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.1,
    "demandScore": 2.2,
    "createdAt": "2026-07-02T06:24:57.370Z",
    "updatedAt": "2026-07-28T06:24:57.370Z"
  },
  {
    "id": "prod-real-085",
    "sku": "21889",
    "name": "Wooden Box Of Dominoes",
    "category": "Furniture",
    "description": "Wooden Box Of Dominoes — Sourced from UCI Online Retail dataset (31 real orders)",
    "stock": 51,
    "reservedStock": 3,
    "damagedStock": 0,
    "reorderLevel": 27,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-a03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.25,
    "demandScore": 2.2,
    "createdAt": "2026-02-23T06:24:57.370Z",
    "updatedAt": "2026-07-22T06:24:57.370Z"
  },
  {
    "id": "prod-real-086",
    "sku": "21186",
    "name": "White Dove Honeycomb Paper Garland",
    "category": "Groceries",
    "description": "White Dove Honeycomb Paper Garland — Sourced from UCI Online Retail dataset (31 real orders)",
    "stock": 58,
    "reservedStock": 9,
    "damagedStock": 2,
    "reorderLevel": 33,
    "supplier": "Global Wholesale UK",
    "warehouseLocation": "loc-a03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.65,
    "demandScore": 2.2,
    "createdAt": "2026-08-01T06:24:57.370Z",
    "updatedAt": "2026-07-25T06:24:57.370Z"
  },
  {
    "id": "prod-real-087",
    "sku": "37503",
    "name": "Tea Time Cake Stand In Gift Box",
    "category": "Furniture",
    "description": "Tea Time Cake Stand In Gift Box — Sourced from UCI Online Retail dataset (31 real orders)",
    "stock": 38,
    "reservedStock": 10,
    "damagedStock": 0,
    "reorderLevel": 12,
    "supplier": "Premier Source Inc",
    "warehouseLocation": "loc-a04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 10.75,
    "demandScore": 2.2,
    "createdAt": "2026-08-04T06:24:57.370Z",
    "updatedAt": "2026-08-18T06:24:57.370Z"
  },
  {
    "id": "prod-real-088",
    "sku": "20750",
    "name": "Red/White Dot Mini Cases",
    "category": "Electronics",
    "description": "Red/White Dot Mini Cases — Sourced from UCI Online Retail dataset (31 real orders)",
    "stock": 8,
    "reservedStock": 0,
    "damagedStock": 0,
    "reorderLevel": 10,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-a04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 7.95,
    "demandScore": 2.2,
    "createdAt": "2025-12-01T06:24:57.370Z",
    "updatedAt": "2026-08-12T06:24:57.370Z"
  },
  {
    "id": "prod-real-089",
    "sku": "21888",
    "name": "Bingo Set",
    "category": "Electronics",
    "description": "Bingo Set — Sourced from UCI Online Retail dataset (30 real orders)",
    "stock": 40,
    "reservedStock": 6,
    "damagedStock": 0,
    "reorderLevel": 12,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-b01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 3.75,
    "demandScore": 2.1,
    "createdAt": "2026-08-05T06:24:57.370Z",
    "updatedAt": "2026-08-14T06:24:57.370Z"
  },
  {
    "id": "prod-real-090",
    "sku": "21929",
    "name": "Jumbo Bag Pink Vintage Paisley",
    "category": "Fashion",
    "description": "Jumbo Bag Pink Vintage Paisley — Sourced from UCI Online Retail dataset (30 real orders)",
    "stock": 18,
    "reservedStock": 0,
    "damagedStock": 0,
    "reorderLevel": 24,
    "supplier": "Summit Supplies PLC",
    "warehouseLocation": "loc-b01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.95,
    "demandScore": 2.1,
    "createdAt": "2025-11-05T06:24:57.370Z",
    "updatedAt": "2026-08-04T06:24:57.370Z"
  },
  {
    "id": "prod-real-091",
    "sku": "48187",
    "name": "Door Mat New England",
    "category": "Electronics",
    "description": "Door Mat New England — Sourced from UCI Online Retail dataset (30 real orders)",
    "stock": 26,
    "reservedStock": 6,
    "damagedStock": 0,
    "reorderLevel": 10,
    "supplier": "Nordic Supply Co",
    "warehouseLocation": "loc-b02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 6.75,
    "demandScore": 2.1,
    "createdAt": "2025-12-12T06:24:57.370Z",
    "updatedAt": "2026-08-09T06:24:57.370Z"
  },
  {
    "id": "prod-real-092",
    "sku": "21535",
    "name": "Retro Spot Small Milk Jug",
    "category": "Electronics",
    "description": "Retro Spot Small Milk Jug — Sourced from UCI Online Retail dataset (30 real orders)",
    "stock": 21,
    "reservedStock": 2,
    "damagedStock": 1,
    "reorderLevel": 12,
    "supplier": "Heritage Wholesale Ltd",
    "warehouseLocation": "loc-b02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.55,
    "demandScore": 2.1,
    "createdAt": "2026-08-14T06:24:57.370Z",
    "updatedAt": "2026-08-12T06:24:57.370Z"
  },
  {
    "id": "prod-real-093",
    "sku": "21488",
    "name": "Red White Scarf Hot Water Bottle",
    "category": "Fashion",
    "description": "Red White Scarf Hot Water Bottle — Sourced from UCI Online Retail dataset (30 real orders)",
    "stock": 71,
    "reservedStock": 11,
    "damagedStock": 1,
    "reorderLevel": 24,
    "supplier": "Atlantic Trading Co",
    "warehouseLocation": "loc-b03-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 3.95,
    "demandScore": 2.1,
    "createdAt": "2026-01-10T06:24:57.370Z",
    "updatedAt": "2026-08-05T06:24:57.370Z"
  },
  {
    "id": "prod-real-094",
    "sku": "85099C",
    "name": "Jumbo Bag Baroque Black White",
    "category": "Fashion",
    "description": "Jumbo Bag Baroque Black White — Sourced from UCI Online Retail dataset (30 real orders)",
    "stock": 243,
    "reservedStock": 70,
    "damagedStock": 5,
    "reorderLevel": 75,
    "supplier": "Summit Supplies PLC",
    "warehouseLocation": "loc-b03-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.95,
    "demandScore": 2.1,
    "createdAt": "2026-06-30T06:24:57.370Z",
    "updatedAt": "2026-07-25T06:24:57.370Z"
  },
  {
    "id": "prod-real-095",
    "sku": "21558",
    "name": "Skull Lunchbox With Cutlery",
    "category": "Furniture",
    "description": "Skull Lunchbox With Cutlery — Sourced from UCI Online Retail dataset (30 real orders)",
    "stock": 34,
    "reservedStock": 0,
    "damagedStock": 0,
    "reorderLevel": 12,
    "supplier": "Global Wholesale UK",
    "warehouseLocation": "loc-b04-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 2.55,
    "demandScore": 2.1,
    "createdAt": "2026-04-20T06:24:57.370Z",
    "updatedAt": "2026-08-05T06:24:57.370Z"
  },
  {
    "id": "prod-real-096",
    "sku": "20974",
    "name": "12 Pencils Small Tube Skull",
    "category": "Electronics",
    "description": "12 Pencils Small Tube Skull — Sourced from UCI Online Retail dataset (30 real orders)",
    "stock": 16,
    "reservedStock": 2,
    "damagedStock": 0,
    "reorderLevel": 15,
    "supplier": "Atlantic Trading Co",
    "warehouseLocation": "loc-b04-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.65,
    "demandScore": 2.1,
    "createdAt": "2025-08-22T06:24:57.370Z",
    "updatedAt": "2026-07-27T06:24:57.370Z"
  },
  {
    "id": "prod-real-097",
    "sku": "22195",
    "name": "Heart Measuring Spoons Large",
    "category": "Electronics",
    "description": "Heart Measuring Spoons Large — Sourced from UCI Online Retail dataset (29 real orders)",
    "stock": 88,
    "reservedStock": 22,
    "damagedStock": 4,
    "reorderLevel": 27,
    "supplier": "Continental Goods Ltd",
    "warehouseLocation": "loc-c01-1",
    "warehouseId": "hub-01",
    "imageUrl": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.65,
    "demandScore": 2.1,
    "createdAt": "2026-03-18T06:24:57.370Z",
    "updatedAt": "2026-07-29T06:24:57.370Z"
  },
  {
    "id": "prod-real-098",
    "sku": "22142",
    "name": "Christmas Craft White Fairy",
    "category": "Electronics",
    "description": "Christmas Craft White Fairy — Sourced from UCI Online Retail dataset (29 real orders)",
    "stock": 34,
    "reservedStock": 5,
    "damagedStock": 1,
    "reorderLevel": 21,
    "supplier": "Apex Distribution Ltd",
    "warehouseLocation": "loc-c01-2",
    "warehouseId": "hub-02",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.45,
    "demandScore": 2.1,
    "createdAt": "2025-10-04T06:24:57.370Z",
    "updatedAt": "2026-08-16T06:24:57.370Z"
  },
  {
    "id": "prod-real-099",
    "sku": "22130",
    "name": "Party Cone Christmas Decoration",
    "category": "Electronics",
    "description": "Party Cone Christmas Decoration — Sourced from UCI Online Retail dataset (29 real orders)",
    "stock": 42,
    "reservedStock": 12,
    "damagedStock": 2,
    "reorderLevel": 42,
    "supplier": "Global Wholesale UK",
    "warehouseLocation": "loc-c02-1",
    "warehouseId": "hub-03",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 0.85,
    "demandScore": 2.1,
    "createdAt": "2025-10-13T06:24:57.370Z",
    "updatedAt": "2026-08-09T06:24:57.370Z"
  },
  {
    "id": "prod-real-100",
    "sku": "20728",
    "name": "Lunch Bag Cars Blue",
    "category": "Fashion",
    "description": "Lunch Bag Cars Blue — Sourced from UCI Online Retail dataset (29 real orders)",
    "stock": 14,
    "reservedStock": 3,
    "damagedStock": 0,
    "reorderLevel": 18,
    "supplier": "Continental Goods Ltd",
    "warehouseLocation": "loc-c02-2",
    "warehouseId": "hub-04",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "unitPrice": 1.65,
    "demandScore": 2.1,
    "createdAt": "2025-09-05T06:24:57.370Z",
    "updatedAt": "2026-08-07T06:24:57.370Z"
  }
] as unknown as Product[];

// ─── 50 REAL Orders derived from UCI Invoice data ────────────────────────────
export const mockOrders: Order[] = [
  {
    "id": "ord-real-001",
    "orderNumber": "ORD-UCI-490074",
    "customerName": "Premier Gift Distributors",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-04T09:08:50.000Z",
    "orderValue": 5637.96,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-03T09:08:50.000Z",
    "items": [
      {
        "id": "oi-real-001-1",
        "productId": "prod-real-071",
        "quantity": 9,
        "allocatedQuantity": 9,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-001-2",
        "productId": "prod-real-037",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-001-3",
        "productId": "prod-real-096",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "PACKED"
      },
      {
        "id": "oi-real-001-4",
        "productId": "prod-real-059",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-001-5",
        "productId": "prod-real-075",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-002",
    "orderNumber": "ORD-UCI-490149",
    "customerName": "Greenfield Distributors",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-05T04:12:50.000Z",
    "orderValue": 5607.06,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-04T04:12:50.000Z",
    "items": [
      {
        "id": "oi-real-002-1",
        "productId": "prod-real-073",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-002-2",
        "productId": "prod-real-033",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-002-3",
        "productId": "prod-real-071",
        "quantity": 3,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-002-4",
        "productId": "prod-real-003",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-002-5",
        "productId": "prod-real-039",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-003",
    "orderNumber": "ORD-UCI-490741",
    "customerName": "Maple Leaf Imports",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-08T12:25:50.000Z",
    "orderValue": 5508.08,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-07T12:25:50.000Z",
    "items": [
      {
        "id": "oi-real-003-1",
        "productId": "prod-real-078",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-003-2",
        "productId": "prod-real-069",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-003-3",
        "productId": "prod-real-039",
        "quantity": 7,
        "allocatedQuantity": 6,
        "status": "PACKED"
      },
      {
        "id": "oi-real-003-4",
        "productId": "prod-real-076",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-003-5",
        "productId": "prod-real-074",
        "quantity": 12,
        "allocatedQuantity": 10,
        "status": "PICKED"
      }
    ]
  },
  {
    "id": "ord-real-004",
    "orderNumber": "ORD-UCI-489857",
    "customerName": "Westfield Trading",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-03T09:12:49.999Z",
    "orderValue": 4966.72,
    "status": "PACKED",
    "totalItems": 5,
    "createdAt": "2009-12-02T09:12:49.999Z",
    "items": [
      {
        "id": "oi-real-004-1",
        "productId": "prod-real-094",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-004-2",
        "productId": "prod-real-001",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-004-3",
        "productId": "prod-real-073",
        "quantity": 3,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-004-4",
        "productId": "prod-real-041",
        "quantity": 3,
        "allocatedQuantity": 3,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-004-5",
        "productId": "prod-real-097",
        "quantity": 3,
        "allocatedQuantity": 2,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-005",
    "orderNumber": "ORD-UCI-490745",
    "customerName": "Westfield Trading",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-08T12:31:49.999Z",
    "orderValue": 4571.02,
    "status": "SHIPPED",
    "totalItems": 5,
    "createdAt": "2009-12-07T12:31:49.999Z",
    "items": [
      {
        "id": "oi-real-005-1",
        "productId": "prod-real-071",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-005-2",
        "productId": "prod-real-065",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-005-3",
        "productId": "prod-real-100",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-005-4",
        "productId": "prod-real-061",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-005-5",
        "productId": "prod-real-096",
        "quantity": 3,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-006",
    "orderNumber": "ORD-UCI-489597",
    "customerName": "Maple Leaf Imports",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-02T08:57:50.000Z",
    "orderValue": 4450.63,
    "status": "PICKED",
    "totalItems": 5,
    "createdAt": "2009-12-01T08:57:50.000Z",
    "items": [
      {
        "id": "oi-real-006-1",
        "productId": "prod-real-071",
        "quantity": 3,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-006-2",
        "productId": "prod-real-037",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-006-3",
        "productId": "prod-real-061",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-006-4",
        "productId": "prod-real-034",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-006-5",
        "productId": "prod-real-096",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-007",
    "orderNumber": "ORD-UCI-490963",
    "customerName": "Orion Retail Solutions",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-09T10:18:50.000Z",
    "orderValue": 4085.62,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-08T10:18:50.000Z",
    "items": [
      {
        "id": "oi-real-007-1",
        "productId": "prod-real-055",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-007-2",
        "productId": "prod-real-066",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-007-3",
        "productId": "prod-real-033",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-007-4",
        "productId": "prod-real-071",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-007-5",
        "productId": "prod-real-037",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      }
    ]
  },
  {
    "id": "ord-real-008",
    "orderNumber": "ORD-UCI-489856",
    "customerName": "Summit Retail Partners",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-03T09:05:49.999Z",
    "orderValue": 3993.5,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-02T09:05:49.999Z",
    "items": [
      {
        "id": "oi-real-008-1",
        "productId": "prod-real-073",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-008-2",
        "productId": "prod-real-028",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-008-3",
        "productId": "prod-real-019",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-008-4",
        "productId": "prod-real-084",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-008-5",
        "productId": "prod-real-064",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-009",
    "orderNumber": "ORD-UCI-491041",
    "customerName": "Westfield Trading",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-10T04:11:50.000Z",
    "orderValue": 2024,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-09T04:11:50.000Z",
    "items": [
      {
        "id": "oi-real-009-1",
        "productId": "prod-real-065",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-009-2",
        "productId": "prod-real-100",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-009-3",
        "productId": "prod-real-061",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "PICKED"
      },
      {
        "id": "oi-real-009-4",
        "productId": "prod-real-034",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-009-5",
        "productId": "prod-real-096",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-010",
    "orderNumber": "ORD-UCI-490957",
    "customerName": "Premier Gift Distributors",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-09T09:41:50.000Z",
    "orderValue": 3796.37,
    "status": "PACKED",
    "totalItems": 5,
    "createdAt": "2009-12-08T09:41:50.000Z",
    "items": [
      {
        "id": "oi-real-010-1",
        "productId": "prod-real-027",
        "quantity": 12,
        "allocatedQuantity": 2,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-010-2",
        "productId": "prod-real-013",
        "quantity": 6,
        "allocatedQuantity": 3,
        "status": "PICKED"
      },
      {
        "id": "oi-real-010-3",
        "productId": "prod-real-052",
        "quantity": 8,
        "allocatedQuantity": 7,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-010-4",
        "productId": "prod-real-003",
        "quantity": 9,
        "allocatedQuantity": 6,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-010-5",
        "productId": "prod-real-030",
        "quantity": 12,
        "allocatedQuantity": 6,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-011",
    "orderNumber": "ORD-UCI-489536",
    "customerName": "Northern Wholesale Ltd",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-03T06:42:50.000Z",
    "orderValue": 367.41,
    "status": "PICKED",
    "totalItems": 5,
    "createdAt": "2009-12-01T06:42:50.000Z",
    "items": [
      {
        "id": "oi-real-011-1",
        "productId": "prod-real-067",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-011-2",
        "productId": "prod-real-086",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "PACKED"
      },
      {
        "id": "oi-real-011-3",
        "productId": "prod-real-002",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-011-4",
        "productId": "prod-real-030",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-011-5",
        "productId": "prod-real-061",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-012",
    "orderNumber": "ORD-UCI-489866",
    "customerName": "Royal Oak Supplies",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-03T09:33:50.000Z",
    "orderValue": 1003.83,
    "status": "PICKED",
    "totalItems": 5,
    "createdAt": "2009-12-02T09:33:50.000Z",
    "items": [
      {
        "id": "oi-real-012-1",
        "productId": "prod-real-030",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-012-2",
        "productId": "prod-real-013",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "PICKED"
      },
      {
        "id": "oi-real-012-3",
        "productId": "prod-real-035",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-012-4",
        "productId": "prod-real-012",
        "quantity": 11,
        "allocatedQuantity": 3,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-012-5",
        "productId": "prod-real-001",
        "quantity": 10,
        "allocatedQuantity": 7,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-013",
    "orderNumber": "ORD-UCI-490461",
    "customerName": "Continental Imports UK",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-07T06:36:50.000Z",
    "orderValue": 720.79,
    "status": "PACKED",
    "totalItems": 5,
    "createdAt": "2009-12-06T06:36:50.000Z",
    "items": [
      {
        "id": "oi-real-013-1",
        "productId": "prod-real-014",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-013-2",
        "productId": "prod-real-053",
        "quantity": 20,
        "allocatedQuantity": 15,
        "status": "PICKED"
      },
      {
        "id": "oi-real-013-3",
        "productId": "prod-real-039",
        "quantity": 6,
        "allocatedQuantity": 6,
        "status": "PACKED"
      },
      {
        "id": "oi-real-013-4",
        "productId": "prod-real-009",
        "quantity": 20,
        "allocatedQuantity": 8,
        "status": "PICKED"
      },
      {
        "id": "oi-real-013-5",
        "productId": "prod-real-004",
        "quantity": 8,
        "allocatedQuantity": 7,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-014",
    "orderNumber": "ORD-UCI-489522",
    "customerName": "Silver Birch Wholesale",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-02T06:14:50.000Z",
    "orderValue": 700.31,
    "status": "PICKED",
    "totalItems": 5,
    "createdAt": "2009-12-01T06:14:50.000Z",
    "items": [
      {
        "id": "oi-real-014-1",
        "productId": "prod-real-010",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-014-2",
        "productId": "prod-real-030",
        "quantity": 4,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-014-3",
        "productId": "prod-real-003",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-014-4",
        "productId": "prod-real-027",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-014-5",
        "productId": "prod-real-006",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      }
    ]
  },
  {
    "id": "ord-real-015",
    "orderNumber": "ORD-UCI-490017",
    "customerName": "Apex Consumer Goods",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-05T07:00:50.000Z",
    "orderValue": 393.65,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-03T07:00:50.000Z",
    "items": [
      {
        "id": "oi-real-015-1",
        "productId": "prod-real-094",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-015-2",
        "productId": "prod-real-040",
        "quantity": 6,
        "allocatedQuantity": 2,
        "status": "PICKED"
      },
      {
        "id": "oi-real-015-3",
        "productId": "prod-real-071",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-015-4",
        "productId": "prod-real-074",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-015-5",
        "productId": "prod-real-037",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-016",
    "orderNumber": "ORD-UCI-489875",
    "customerName": "Eastside Wholesale Co",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-03T10:10:50.000Z",
    "orderValue": 530.76,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-02T10:10:50.000Z",
    "items": [
      {
        "id": "oi-real-016-1",
        "productId": "prod-real-008",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-016-2",
        "productId": "prod-real-065",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-016-3",
        "productId": "prod-real-070",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-016-4",
        "productId": "prod-real-071",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-016-5",
        "productId": "prod-real-037",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-017",
    "orderNumber": "ORD-UCI-490403",
    "customerName": "Eastside Wholesale Co",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-08T05:42:50.000Z",
    "orderValue": 316.74,
    "status": "PACKED",
    "totalItems": 5,
    "createdAt": "2009-12-06T05:42:50.000Z",
    "items": [
      {
        "id": "oi-real-017-1",
        "productId": "prod-real-027",
        "quantity": 3,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-017-2",
        "productId": "prod-real-011",
        "quantity": 3,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-017-3",
        "productId": "prod-real-063",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-017-4",
        "productId": "prod-real-003",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-017-5",
        "productId": "prod-real-013",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-018",
    "orderNumber": "ORD-UCI-490014",
    "customerName": "Eastside Wholesale Co",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-04T06:57:49.999Z",
    "orderValue": 744.21,
    "status": "PROCESSING",
    "totalItems": 5,
    "createdAt": "2009-12-03T06:57:49.999Z",
    "items": [
      {
        "id": "oi-real-018-1",
        "productId": "prod-real-040",
        "quantity": 12,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-018-2",
        "productId": "prod-real-059",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "PACKED"
      },
      {
        "id": "oi-real-018-3",
        "productId": "prod-real-009",
        "quantity": 6,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-018-4",
        "productId": "prod-real-075",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-018-5",
        "productId": "prod-real-096",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "PICKED"
      }
    ]
  },
  {
    "id": "ord-real-019",
    "orderNumber": "ORD-UCI-490300",
    "customerName": "Northern Wholesale Ltd",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-06T08:48:50.000Z",
    "orderValue": 259.58,
    "status": "SHIPPED",
    "totalItems": 5,
    "createdAt": "2009-12-04T08:48:50.000Z",
    "items": [
      {
        "id": "oi-real-019-1",
        "productId": "prod-real-090",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-019-2",
        "productId": "prod-real-046",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-019-3",
        "productId": "prod-real-059",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-019-4",
        "productId": "prod-real-096",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-019-5",
        "productId": "prod-real-043",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-020",
    "orderNumber": "ORD-UCI-490685",
    "customerName": "Thames Valley Retail",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-08T08:17:49.999Z",
    "orderValue": 1066.82,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-07T08:17:49.999Z",
    "items": [
      {
        "id": "oi-real-020-1",
        "productId": "prod-real-029",
        "quantity": 12,
        "allocatedQuantity": 9,
        "status": "PICKED"
      },
      {
        "id": "oi-real-020-2",
        "productId": "prod-real-005",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-020-3",
        "productId": "prod-real-002",
        "quantity": 6,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-020-4",
        "productId": "prod-real-007",
        "quantity": 4,
        "allocatedQuantity": 4,
        "status": "PACKED"
      },
      {
        "id": "oi-real-020-5",
        "productId": "prod-real-097",
        "quantity": 6,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-021",
    "orderNumber": "ORD-UCI-489814",
    "customerName": "Continental Imports UK",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-03T07:35:49.999Z",
    "orderValue": 824.18,
    "status": "SHIPPED",
    "totalItems": 5,
    "createdAt": "2009-12-02T07:35:49.999Z",
    "items": [
      {
        "id": "oi-real-021-1",
        "productId": "prod-real-053",
        "quantity": 20,
        "allocatedQuantity": 7,
        "status": "PICKED"
      },
      {
        "id": "oi-real-021-2",
        "productId": "prod-real-034",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-021-3",
        "productId": "prod-real-077",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-021-4",
        "productId": "prod-real-073",
        "quantity": 6,
        "allocatedQuantity": 6,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-021-5",
        "productId": "prod-real-002",
        "quantity": 6,
        "allocatedQuantity": 5,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-022",
    "orderNumber": "ORD-UCI-490490",
    "customerName": "Highland Merchants Ltd",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-07T07:39:50.000Z",
    "orderValue": 547.73,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-06T07:39:50.000Z",
    "items": [
      {
        "id": "oi-real-022-1",
        "productId": "prod-real-069",
        "quantity": 6,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-022-2",
        "productId": "prod-real-097",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-022-3",
        "productId": "prod-real-001",
        "quantity": 10,
        "allocatedQuantity": 5,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-022-4",
        "productId": "prod-real-012",
        "quantity": 6,
        "allocatedQuantity": 2,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-022-5",
        "productId": "prod-real-039",
        "quantity": 6,
        "allocatedQuantity": 3,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-023",
    "orderNumber": "ORD-UCI-489572",
    "customerName": "Nordic Home Supplies",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-02T07:58:50.000Z",
    "orderValue": 507.49,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-01T07:58:50.000Z",
    "items": [
      {
        "id": "oi-real-023-1",
        "productId": "prod-real-091",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-023-2",
        "productId": "prod-real-033",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-023-3",
        "productId": "prod-real-021",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-023-4",
        "productId": "prod-real-017",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-023-5",
        "productId": "prod-real-094",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-024",
    "orderNumber": "ORD-UCI-490100",
    "customerName": "Westfield Trading",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-04T10:50:50.000Z",
    "orderValue": 869.93,
    "status": "PROCESSING",
    "totalItems": 5,
    "createdAt": "2009-12-03T10:50:50.000Z",
    "items": [
      {
        "id": "oi-real-024-1",
        "productId": "prod-real-001",
        "quantity": 12,
        "allocatedQuantity": 6,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-024-2",
        "productId": "prod-real-012",
        "quantity": 4,
        "allocatedQuantity": 3,
        "status": "PICKED"
      },
      {
        "id": "oi-real-024-3",
        "productId": "prod-real-063",
        "quantity": 3,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-024-4",
        "productId": "prod-real-038",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-024-5",
        "productId": "prod-real-005",
        "quantity": 4,
        "allocatedQuantity": 0,
        "status": "PICKED"
      }
    ]
  },
  {
    "id": "ord-real-025",
    "orderNumber": "ORD-UCI-490279",
    "customerName": "Maple Leaf Imports",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-06T07:06:49.999Z",
    "orderValue": 317.83,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-04T07:06:49.999Z",
    "items": [
      {
        "id": "oi-real-025-1",
        "productId": "prod-real-027",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-025-2",
        "productId": "prod-real-076",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-025-3",
        "productId": "prod-real-020",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-025-4",
        "productId": "prod-real-082",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-025-5",
        "productId": "prod-real-006",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-026",
    "orderNumber": "ORD-UCI-489599",
    "customerName": "Thames Valley Retail",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-02T09:09:50.000Z",
    "orderValue": 2454.68,
    "status": "PICKED",
    "totalItems": 5,
    "createdAt": "2009-12-01T09:09:50.000Z",
    "items": [
      {
        "id": "oi-real-026-1",
        "productId": "prod-real-003",
        "quantity": 3,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-026-2",
        "productId": "prod-real-030",
        "quantity": 8,
        "allocatedQuantity": 4,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-026-3",
        "productId": "prod-real-006",
        "quantity": 8,
        "allocatedQuantity": 4,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-026-4",
        "productId": "prod-real-007",
        "quantity": 3,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-026-5",
        "productId": "prod-real-088",
        "quantity": 12,
        "allocatedQuantity": 5,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-027",
    "orderNumber": "ORD-UCI-490143",
    "customerName": "Cedar Grove Trading",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-05T03:09:50.000Z",
    "orderValue": 1610.52,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-04T03:09:50.000Z",
    "items": [
      {
        "id": "oi-real-027-1",
        "productId": "prod-real-068",
        "quantity": 12,
        "allocatedQuantity": 8,
        "status": "PICKED"
      },
      {
        "id": "oi-real-027-2",
        "productId": "prod-real-088",
        "quantity": 6,
        "allocatedQuantity": 6,
        "status": "PACKED"
      },
      {
        "id": "oi-real-027-3",
        "productId": "prod-real-059",
        "quantity": 20,
        "allocatedQuantity": 17,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-027-4",
        "productId": "prod-real-036",
        "quantity": 20,
        "allocatedQuantity": 18,
        "status": "PACKED"
      },
      {
        "id": "oi-real-027-5",
        "productId": "prod-real-029",
        "quantity": 20,
        "allocatedQuantity": 14,
        "status": "PICKED"
      }
    ]
  },
  {
    "id": "ord-real-028",
    "orderNumber": "ORD-UCI-490719",
    "customerName": "Highland Merchants Ltd",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-08T10:11:50.000Z",
    "orderValue": 668.1,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-07T10:11:50.000Z",
    "items": [
      {
        "id": "oi-real-028-1",
        "productId": "prod-real-068",
        "quantity": 4,
        "allocatedQuantity": 2,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-028-2",
        "productId": "prod-real-018",
        "quantity": 9,
        "allocatedQuantity": 5,
        "status": "PICKED"
      },
      {
        "id": "oi-real-028-3",
        "productId": "prod-real-046",
        "quantity": 4,
        "allocatedQuantity": 4,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-028-4",
        "productId": "prod-real-080",
        "quantity": 5,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-028-5",
        "productId": "prod-real-043",
        "quantity": 3,
        "allocatedQuantity": 2,
        "status": "PICKED"
      }
    ]
  },
  {
    "id": "ord-real-029",
    "orderNumber": "ORD-UCI-490937",
    "customerName": "Greenfield Distributors",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-09T08:27:49.999Z",
    "orderValue": 2285.58,
    "status": "PROCESSING",
    "totalItems": 5,
    "createdAt": "2009-12-08T08:27:49.999Z",
    "items": [
      {
        "id": "oi-real-029-1",
        "productId": "prod-real-078",
        "quantity": 20,
        "allocatedQuantity": 10,
        "status": "PICKED"
      },
      {
        "id": "oi-real-029-2",
        "productId": "prod-real-072",
        "quantity": 20,
        "allocatedQuantity": 6,
        "status": "PACKED"
      },
      {
        "id": "oi-real-029-3",
        "productId": "prod-real-009",
        "quantity": 20,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-029-4",
        "productId": "prod-real-001",
        "quantity": 20,
        "allocatedQuantity": 11,
        "status": "PACKED"
      },
      {
        "id": "oi-real-029-5",
        "productId": "prod-real-077",
        "quantity": 20,
        "allocatedQuantity": 15,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-030",
    "orderNumber": "ORD-UCI-489787",
    "customerName": "BlueBell Stores Ltd",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-04T06:22:50.000Z",
    "orderValue": 319.54,
    "status": "PROCESSING",
    "totalItems": 5,
    "createdAt": "2009-12-02T06:22:50.000Z",
    "items": [
      {
        "id": "oi-real-030-1",
        "productId": "prod-real-092",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-030-2",
        "productId": "prod-real-049",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-030-3",
        "productId": "prod-real-097",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-030-4",
        "productId": "prod-real-067",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-030-5",
        "productId": "prod-real-067",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-031",
    "orderNumber": "ORD-UCI-490099",
    "customerName": "Maple Leaf Imports",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-04T10:41:50.000Z",
    "orderValue": 1225.98,
    "status": "PROCESSING",
    "totalItems": 5,
    "createdAt": "2009-12-03T10:41:50.000Z",
    "items": [
      {
        "id": "oi-real-031-1",
        "productId": "prod-real-051",
        "quantity": 3,
        "allocatedQuantity": 2,
        "status": "PACKED"
      },
      {
        "id": "oi-real-031-2",
        "productId": "prod-real-016",
        "quantity": 3,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-031-3",
        "productId": "prod-real-079",
        "quantity": 4,
        "allocatedQuantity": 3,
        "status": "PICKED"
      },
      {
        "id": "oi-real-031-4",
        "productId": "prod-real-094",
        "quantity": 10,
        "allocatedQuantity": 7,
        "status": "PICKED"
      },
      {
        "id": "oi-real-031-5",
        "productId": "prod-real-066",
        "quantity": 3,
        "allocatedQuantity": 3,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-032",
    "orderNumber": "ORD-UCI-490711",
    "customerName": "Maple Leaf Imports",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-09T09:55:50.000Z",
    "orderValue": 448.96,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-07T09:55:50.000Z",
    "items": [
      {
        "id": "oi-real-032-1",
        "productId": "prod-real-074",
        "quantity": 20,
        "allocatedQuantity": 9,
        "status": "PICKED"
      },
      {
        "id": "oi-real-032-2",
        "productId": "prod-real-022",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-032-3",
        "productId": "prod-real-024",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-032-4",
        "productId": "prod-real-073",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-032-5",
        "productId": "prod-real-037",
        "quantity": 3,
        "allocatedQuantity": 2,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-033",
    "orderNumber": "ORD-UCI-489830",
    "customerName": "Continental Imports UK",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-03T08:26:50.000Z",
    "orderValue": 637.04,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-02T08:26:50.000Z",
    "items": [
      {
        "id": "oi-real-033-1",
        "productId": "prod-real-069",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-033-2",
        "productId": "prod-real-009",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-033-3",
        "productId": "prod-real-034",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-033-4",
        "productId": "prod-real-002",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-033-5",
        "productId": "prod-real-001",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-034",
    "orderNumber": "ORD-UCI-490302",
    "customerName": "Harrington Retail Group",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-06T08:58:50.000Z",
    "orderValue": 303.62,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-04T08:58:50.000Z",
    "items": [
      {
        "id": "oi-real-034-1",
        "productId": "prod-real-062",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-034-2",
        "productId": "prod-real-002",
        "quantity": 3,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-034-3",
        "productId": "prod-real-065",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-034-4",
        "productId": "prod-real-037",
        "quantity": 4,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-034-5",
        "productId": "prod-real-070",
        "quantity": 5,
        "allocatedQuantity": 1,
        "status": "PICKED"
      }
    ]
  },
  {
    "id": "ord-real-035",
    "orderNumber": "ORD-UCI-490465",
    "customerName": "Orion Retail Solutions",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-07T06:43:50.000Z",
    "orderValue": 933.35,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-06T06:43:50.000Z",
    "items": [
      {
        "id": "oi-real-035-1",
        "productId": "prod-real-007",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-035-2",
        "productId": "prod-real-088",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-035-3",
        "productId": "prod-real-024",
        "quantity": 3,
        "allocatedQuantity": 2,
        "status": "PACKED"
      },
      {
        "id": "oi-real-035-4",
        "productId": "prod-real-014",
        "quantity": 6,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-035-5",
        "productId": "prod-real-004",
        "quantity": 6,
        "allocatedQuantity": 6,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-036",
    "orderNumber": "ORD-UCI-490990",
    "customerName": "Coastal Trading PLC",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-10T11:39:50.000Z",
    "orderValue": 271.85,
    "status": "PROCESSING",
    "totalItems": 5,
    "createdAt": "2009-12-08T11:39:50.000Z",
    "items": [
      {
        "id": "oi-real-036-1",
        "productId": "prod-real-009",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-036-2",
        "productId": "prod-real-004",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-036-3",
        "productId": "prod-real-001",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-036-4",
        "productId": "prod-real-004",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-036-5",
        "productId": "prod-real-014",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-037",
    "orderNumber": "ORD-UCI-489574",
    "customerName": "Highland Merchants Ltd",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-02T08:00:50.000Z",
    "orderValue": 551.33,
    "status": "SHIPPED",
    "totalItems": 5,
    "createdAt": "2009-12-01T08:00:50.000Z",
    "items": [
      {
        "id": "oi-real-037-1",
        "productId": "prod-real-091",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-037-2",
        "productId": "prod-real-016",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-037-3",
        "productId": "prod-real-051",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-037-4",
        "productId": "prod-real-024",
        "quantity": 5,
        "allocatedQuantity": 2,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-037-5",
        "productId": "prod-real-047",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-038",
    "orderNumber": "ORD-UCI-489791",
    "customerName": "Coastal Trading PLC",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-04T06:35:50.000Z",
    "orderValue": 221.19,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-02T06:35:50.000Z",
    "items": [
      {
        "id": "oi-real-038-1",
        "productId": "prod-real-006",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-038-2",
        "productId": "prod-real-027",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-038-3",
        "productId": "prod-real-036",
        "quantity": 3,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-038-4",
        "productId": "prod-real-004",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-038-5",
        "productId": "prod-real-085",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-039",
    "orderNumber": "ORD-UCI-490323",
    "customerName": "Orion Retail Solutions",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-06T09:56:50.000Z",
    "orderValue": 236.69,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-04T09:56:50.000Z",
    "items": [
      {
        "id": "oi-real-039-1",
        "productId": "prod-real-058",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-039-2",
        "productId": "prod-real-069",
        "quantity": 3,
        "allocatedQuantity": 3,
        "status": "PACKED"
      },
      {
        "id": "oi-real-039-3",
        "productId": "prod-real-007",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-039-4",
        "productId": "prod-real-009",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-039-5",
        "productId": "prod-real-037",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-040",
    "orderNumber": "ORD-UCI-490008",
    "customerName": "Highland Merchants Ltd",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-04T06:39:50.000Z",
    "orderValue": 503.93,
    "status": "PROCESSING",
    "totalItems": 5,
    "createdAt": "2009-12-03T06:39:50.000Z",
    "items": [
      {
        "id": "oi-real-040-1",
        "productId": "prod-real-090",
        "quantity": 4,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-040-2",
        "productId": "prod-real-060",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-040-3",
        "productId": "prod-real-025",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-040-4",
        "productId": "prod-real-006",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-040-5",
        "productId": "prod-real-087",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      }
    ]
  },
  {
    "id": "ord-real-041",
    "orderNumber": "ORD-UCI-490093",
    "customerName": "Westfield Trading",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-04T10:25:50.000Z",
    "orderValue": 1794.7,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-03T10:25:50.000Z",
    "items": [
      {
        "id": "oi-real-041-1",
        "productId": "prod-real-027",
        "quantity": 8,
        "allocatedQuantity": 3,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-041-2",
        "productId": "prod-real-020",
        "quantity": 16,
        "allocatedQuantity": 4,
        "status": "PICKED"
      },
      {
        "id": "oi-real-041-3",
        "productId": "prod-real-026",
        "quantity": 20,
        "allocatedQuantity": 12,
        "status": "PICKED"
      },
      {
        "id": "oi-real-041-4",
        "productId": "prod-real-053",
        "quantity": 20,
        "allocatedQuantity": 18,
        "status": "PACKED"
      },
      {
        "id": "oi-real-041-5",
        "productId": "prod-real-001",
        "quantity": 12,
        "allocatedQuantity": 2,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-042",
    "orderNumber": "ORD-UCI-490292",
    "customerName": "Premier Gift Distributors",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-06T07:52:50.000Z",
    "orderValue": 460.55,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-04T07:52:50.000Z",
    "items": [
      {
        "id": "oi-real-042-1",
        "productId": "prod-real-046",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-042-2",
        "productId": "prod-real-072",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-042-3",
        "productId": "prod-real-021",
        "quantity": 6,
        "allocatedQuantity": 5,
        "status": "PICKED"
      },
      {
        "id": "oi-real-042-4",
        "productId": "prod-real-096",
        "quantity": 4,
        "allocatedQuantity": 2,
        "status": "PICKED"
      },
      {
        "id": "oi-real-042-5",
        "productId": "prod-real-059",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      }
    ]
  },
  {
    "id": "ord-real-043",
    "orderNumber": "ORD-UCI-490083",
    "customerName": "Highland Merchants Ltd",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-04T10:04:49.999Z",
    "orderValue": 2506.14,
    "status": "PENDING",
    "totalItems": 5,
    "createdAt": "2009-12-03T10:04:49.999Z",
    "items": [
      {
        "id": "oi-real-043-1",
        "productId": "prod-real-023",
        "quantity": 20,
        "allocatedQuantity": 6,
        "status": "PACKED"
      },
      {
        "id": "oi-real-043-2",
        "productId": "prod-real-020",
        "quantity": 20,
        "allocatedQuantity": 20,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-043-3",
        "productId": "prod-real-027",
        "quantity": 20,
        "allocatedQuantity": 13,
        "status": "PICKED"
      },
      {
        "id": "oi-real-043-4",
        "productId": "prod-real-016",
        "quantity": 4,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-043-5",
        "productId": "prod-real-051",
        "quantity": 4,
        "allocatedQuantity": 0,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-044",
    "orderNumber": "ORD-UCI-490294",
    "customerName": "Coastal Trading PLC",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-06T08:10:50.000Z",
    "orderValue": 378.96,
    "status": "DELIVERED",
    "totalItems": 5,
    "createdAt": "2009-12-04T08:10:50.000Z",
    "items": [
      {
        "id": "oi-real-044-1",
        "productId": "prod-real-069",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PACKED"
      },
      {
        "id": "oi-real-044-2",
        "productId": "prod-real-085",
        "quantity": 3,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-044-3",
        "productId": "prod-real-059",
        "quantity": 4,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-044-4",
        "productId": "prod-real-096",
        "quantity": 4,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-044-5",
        "productId": "prod-real-073",
        "quantity": 3,
        "allocatedQuantity": 3,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-045",
    "orderNumber": "ORD-UCI-490312",
    "customerName": "Continental Imports UK",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-06T09:45:50.000Z",
    "orderValue": 326.13,
    "status": "DELIVERED",
    "totalItems": 3,
    "createdAt": "2009-12-04T09:45:50.000Z",
    "items": [
      {
        "id": "oi-real-045-1",
        "productId": "prod-real-007",
        "quantity": 3,
        "allocatedQuantity": 3,
        "status": "PICKED"
      },
      {
        "id": "oi-real-045-2",
        "productId": "prod-real-002",
        "quantity": 10,
        "allocatedQuantity": 10,
        "status": "PICKED"
      },
      {
        "id": "oi-real-045-3",
        "productId": "prod-real-005",
        "quantity": 4,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-046",
    "orderNumber": "ORD-UCI-490941",
    "customerName": "Greenfield Distributors",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-09T08:32:50.000Z",
    "orderValue": 644.52,
    "status": "PICKED",
    "totalItems": 5,
    "createdAt": "2009-12-08T08:32:50.000Z",
    "items": [
      {
        "id": "oi-real-046-1",
        "productId": "prod-real-001",
        "quantity": 6,
        "allocatedQuantity": 5,
        "status": "PICKED"
      },
      {
        "id": "oi-real-046-2",
        "productId": "prod-real-028",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-046-3",
        "productId": "prod-real-019",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-046-4",
        "productId": "prod-real-093",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "PICKED"
      },
      {
        "id": "oi-real-046-5",
        "productId": "prod-real-015",
        "quantity": 2,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-047",
    "orderNumber": "ORD-UCI-490709",
    "customerName": "Highland Merchants Ltd",
    "customerTier": "Silver",
    "priority": "MEDIUM",
    "shippingType": "Standard",
    "deliveryDeadline": "2009-12-12T09:44:50.000Z",
    "orderValue": 198.98,
    "status": "PROCESSING",
    "totalItems": 5,
    "createdAt": "2009-12-07T09:44:50.000Z",
    "items": [
      {
        "id": "oi-real-047-1",
        "productId": "prod-real-002",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-047-2",
        "productId": "prod-real-068",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-047-3",
        "productId": "prod-real-089",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PICKED"
      },
      {
        "id": "oi-real-047-4",
        "productId": "prod-real-027",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-047-5",
        "productId": "prod-real-052",
        "quantity": 1,
        "allocatedQuantity": 0,
        "status": "ALLOCATED"
      }
    ]
  },
  {
    "id": "ord-real-048",
    "orderNumber": "ORD-UCI-489537",
    "customerName": "Orion Retail Solutions",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-02T06:43:50.000Z",
    "orderValue": 633.33,
    "status": "PICKED",
    "totalItems": 5,
    "createdAt": "2009-12-01T06:43:50.000Z",
    "items": [
      {
        "id": "oi-real-048-1",
        "productId": "prod-real-045",
        "quantity": 1,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-048-2",
        "productId": "prod-real-033",
        "quantity": 2,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-048-3",
        "productId": "prod-real-012",
        "quantity": 10,
        "allocatedQuantity": 1,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-048-4",
        "productId": "prod-real-078",
        "quantity": 2,
        "allocatedQuantity": 2,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-048-5",
        "productId": "prod-real-073",
        "quantity": 5,
        "allocatedQuantity": 5,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-049",
    "orderNumber": "ORD-UCI-489556",
    "customerName": "Northern Wholesale Ltd",
    "customerTier": "Gold",
    "priority": "HIGH",
    "shippingType": "Express",
    "deliveryDeadline": "2009-12-03T07:16:49.999Z",
    "orderValue": 379.65,
    "status": "PACKED",
    "totalItems": 5,
    "createdAt": "2009-12-01T07:16:49.999Z",
    "items": [
      {
        "id": "oi-real-049-1",
        "productId": "prod-real-075",
        "quantity": 4,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-049-2",
        "productId": "prod-real-059",
        "quantity": 8,
        "allocatedQuantity": 2,
        "status": "PACKED"
      },
      {
        "id": "oi-real-049-3",
        "productId": "prod-real-096",
        "quantity": 3,
        "allocatedQuantity": 0,
        "status": "PACKED"
      },
      {
        "id": "oi-real-049-4",
        "productId": "prod-real-001",
        "quantity": 3,
        "allocatedQuantity": 0,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-049-5",
        "productId": "prod-real-009",
        "quantity": 20,
        "allocatedQuantity": 13,
        "status": "PACKED"
      }
    ]
  },
  {
    "id": "ord-real-050",
    "orderNumber": "ORD-UCI-490161",
    "customerName": "Premier Gift Distributors",
    "customerTier": "Platinum",
    "priority": "URGENT",
    "shippingType": "SameDay",
    "deliveryDeadline": "2009-12-05T05:26:50.000Z",
    "orderValue": 825.94,
    "status": "PROCESSING",
    "totalItems": 5,
    "createdAt": "2009-12-04T05:26:50.000Z",
    "items": [
      {
        "id": "oi-real-050-1",
        "productId": "prod-real-074",
        "quantity": 10,
        "allocatedQuantity": 5,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-050-2",
        "productId": "prod-real-070",
        "quantity": 10,
        "allocatedQuantity": 9,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-050-3",
        "productId": "prod-real-057",
        "quantity": 8,
        "allocatedQuantity": 8,
        "status": "PARTIALLY_ALLOCATED"
      },
      {
        "id": "oi-real-050-4",
        "productId": "prod-real-053",
        "quantity": 20,
        "allocatedQuantity": 8,
        "status": "ALLOCATED"
      },
      {
        "id": "oi-real-050-5",
        "productId": "prod-real-071",
        "quantity": 10,
        "allocatedQuantity": 10,
        "status": "PICKED"
      }
    ]
  }
] as unknown as Order[];

// ─── Inventory Transactions derived from real quantity movements ──────────────
export const mockTransactions: InventoryTransaction[] = [
  {
    "id": "tx-real-001",
    "productId": "prod-real-001",
    "quantity": 79,
    "type": "Inbound",
    "timestamp": "2026-07-10T06:24:57.370Z"
  },
  {
    "id": "tx-real-002",
    "productId": "prod-real-002",
    "quantity": 175,
    "type": "Outbound",
    "timestamp": "2026-07-21T06:24:57.370Z"
  },
  {
    "id": "tx-real-003",
    "productId": "prod-real-003",
    "quantity": 169,
    "type": "Adjusted",
    "timestamp": "2026-06-24T06:24:57.370Z"
  },
  {
    "id": "tx-real-004",
    "productId": "prod-real-004",
    "quantity": 91,
    "type": "Transferred",
    "timestamp": "2026-06-27T06:24:57.370Z"
  },
  {
    "id": "tx-real-005",
    "productId": "prod-real-005",
    "quantity": 22,
    "type": "Damaged",
    "timestamp": "2026-07-15T06:24:57.370Z"
  },
  {
    "id": "tx-real-006",
    "productId": "prod-real-006",
    "quantity": 10,
    "type": "Inbound",
    "timestamp": "2026-08-18T06:24:57.370Z"
  },
  {
    "id": "tx-real-007",
    "productId": "prod-real-007",
    "quantity": 131,
    "type": "Outbound",
    "timestamp": "2026-07-18T06:24:57.370Z"
  },
  {
    "id": "tx-real-008",
    "productId": "prod-real-008",
    "quantity": 6,
    "type": "Adjusted",
    "timestamp": "2026-07-29T06:24:57.370Z"
  },
  {
    "id": "tx-real-009",
    "productId": "prod-real-009",
    "quantity": 187,
    "type": "Transferred",
    "timestamp": "2026-07-04T06:24:57.370Z"
  },
  {
    "id": "tx-real-010",
    "productId": "prod-real-010",
    "quantity": 104,
    "type": "Damaged",
    "timestamp": "2026-06-30T06:24:57.370Z"
  },
  {
    "id": "tx-real-011",
    "productId": "prod-real-011",
    "quantity": 105,
    "type": "Inbound",
    "timestamp": "2026-07-27T06:24:57.370Z"
  },
  {
    "id": "tx-real-012",
    "productId": "prod-real-012",
    "quantity": 168,
    "type": "Outbound",
    "timestamp": "2026-08-14T06:24:57.370Z"
  },
  {
    "id": "tx-real-013",
    "productId": "prod-real-013",
    "quantity": 139,
    "type": "Adjusted",
    "timestamp": "2026-07-16T06:24:57.370Z"
  },
  {
    "id": "tx-real-014",
    "productId": "prod-real-014",
    "quantity": 10,
    "type": "Transferred",
    "timestamp": "2026-07-12T06:24:57.370Z"
  },
  {
    "id": "tx-real-015",
    "productId": "prod-real-015",
    "quantity": 111,
    "type": "Damaged",
    "timestamp": "2026-07-14T06:24:57.370Z"
  },
  {
    "id": "tx-real-016",
    "productId": "prod-real-016",
    "quantity": 115,
    "type": "Inbound",
    "timestamp": "2026-06-29T06:24:57.370Z"
  },
  {
    "id": "tx-real-017",
    "productId": "prod-real-017",
    "quantity": 34,
    "type": "Outbound",
    "timestamp": "2026-06-23T06:24:57.370Z"
  },
  {
    "id": "tx-real-018",
    "productId": "prod-real-018",
    "quantity": 195,
    "type": "Adjusted",
    "timestamp": "2026-06-21T06:24:57.370Z"
  },
  {
    "id": "tx-real-019",
    "productId": "prod-real-019",
    "quantity": 111,
    "type": "Transferred",
    "timestamp": "2026-08-02T06:24:57.370Z"
  },
  {
    "id": "tx-real-020",
    "productId": "prod-real-020",
    "quantity": 92,
    "type": "Damaged",
    "timestamp": "2026-07-17T06:24:57.370Z"
  },
  {
    "id": "tx-real-021",
    "productId": "prod-real-021",
    "quantity": 30,
    "type": "Inbound",
    "timestamp": "2026-08-03T06:24:57.370Z"
  },
  {
    "id": "tx-real-022",
    "productId": "prod-real-022",
    "quantity": 191,
    "type": "Outbound",
    "timestamp": "2026-07-22T06:24:57.370Z"
  },
  {
    "id": "tx-real-023",
    "productId": "prod-real-023",
    "quantity": 50,
    "type": "Adjusted",
    "timestamp": "2026-06-24T06:24:57.370Z"
  },
  {
    "id": "tx-real-024",
    "productId": "prod-real-024",
    "quantity": 98,
    "type": "Transferred",
    "timestamp": "2026-07-07T06:24:57.370Z"
  },
  {
    "id": "tx-real-025",
    "productId": "prod-real-025",
    "quantity": 86,
    "type": "Damaged",
    "timestamp": "2026-07-05T06:24:57.370Z"
  },
  {
    "id": "tx-real-026",
    "productId": "prod-real-026",
    "quantity": 96,
    "type": "Inbound",
    "timestamp": "2026-08-08T06:24:57.370Z"
  },
  {
    "id": "tx-real-027",
    "productId": "prod-real-027",
    "quantity": 178,
    "type": "Outbound",
    "timestamp": "2026-07-15T06:24:57.370Z"
  },
  {
    "id": "tx-real-028",
    "productId": "prod-real-028",
    "quantity": 46,
    "type": "Adjusted",
    "timestamp": "2026-06-26T06:24:57.370Z"
  },
  {
    "id": "tx-real-029",
    "productId": "prod-real-029",
    "quantity": 26,
    "type": "Transferred",
    "timestamp": "2026-07-02T06:24:57.370Z"
  },
  {
    "id": "tx-real-030",
    "productId": "prod-real-030",
    "quantity": 45,
    "type": "Damaged",
    "timestamp": "2026-06-28T06:24:57.370Z"
  },
  {
    "id": "tx-real-031",
    "productId": "prod-real-031",
    "quantity": 160,
    "type": "Inbound",
    "timestamp": "2026-07-02T06:24:57.370Z"
  },
  {
    "id": "tx-real-032",
    "productId": "prod-real-032",
    "quantity": 167,
    "type": "Outbound",
    "timestamp": "2026-08-17T06:24:57.370Z"
  },
  {
    "id": "tx-real-033",
    "productId": "prod-real-033",
    "quantity": 53,
    "type": "Adjusted",
    "timestamp": "2026-07-21T06:24:57.370Z"
  },
  {
    "id": "tx-real-034",
    "productId": "prod-real-034",
    "quantity": 72,
    "type": "Transferred",
    "timestamp": "2026-07-18T06:24:57.370Z"
  },
  {
    "id": "tx-real-035",
    "productId": "prod-real-035",
    "quantity": 89,
    "type": "Damaged",
    "timestamp": "2026-06-25T06:24:57.370Z"
  },
  {
    "id": "tx-real-036",
    "productId": "prod-real-036",
    "quantity": 170,
    "type": "Inbound",
    "timestamp": "2026-06-20T06:24:57.370Z"
  },
  {
    "id": "tx-real-037",
    "productId": "prod-real-037",
    "quantity": 112,
    "type": "Outbound",
    "timestamp": "2026-07-17T06:24:57.370Z"
  },
  {
    "id": "tx-real-038",
    "productId": "prod-real-038",
    "quantity": 79,
    "type": "Adjusted",
    "timestamp": "2026-07-06T06:24:57.370Z"
  },
  {
    "id": "tx-real-039",
    "productId": "prod-real-039",
    "quantity": 115,
    "type": "Transferred",
    "timestamp": "2026-08-14T06:24:57.370Z"
  },
  {
    "id": "tx-real-040",
    "productId": "prod-real-040",
    "quantity": 165,
    "type": "Damaged",
    "timestamp": "2026-06-26T06:24:57.370Z"
  },
  {
    "id": "tx-real-041",
    "productId": "prod-real-041",
    "quantity": 126,
    "type": "Inbound",
    "timestamp": "2026-07-18T06:24:57.370Z"
  },
  {
    "id": "tx-real-042",
    "productId": "prod-real-042",
    "quantity": 116,
    "type": "Outbound",
    "timestamp": "2026-07-16T06:24:57.370Z"
  },
  {
    "id": "tx-real-043",
    "productId": "prod-real-043",
    "quantity": 169,
    "type": "Adjusted",
    "timestamp": "2026-08-07T06:24:57.370Z"
  },
  {
    "id": "tx-real-044",
    "productId": "prod-real-044",
    "quantity": 76,
    "type": "Transferred",
    "timestamp": "2026-07-05T06:24:57.370Z"
  },
  {
    "id": "tx-real-045",
    "productId": "prod-real-045",
    "quantity": 142,
    "type": "Damaged",
    "timestamp": "2026-07-31T06:24:57.370Z"
  },
  {
    "id": "tx-real-046",
    "productId": "prod-real-046",
    "quantity": 76,
    "type": "Inbound",
    "timestamp": "2026-08-18T06:24:57.370Z"
  },
  {
    "id": "tx-real-047",
    "productId": "prod-real-047",
    "quantity": 181,
    "type": "Outbound",
    "timestamp": "2026-07-20T06:24:57.370Z"
  },
  {
    "id": "tx-real-048",
    "productId": "prod-real-048",
    "quantity": 105,
    "type": "Adjusted",
    "timestamp": "2026-06-26T06:24:57.370Z"
  },
  {
    "id": "tx-real-049",
    "productId": "prod-real-049",
    "quantity": 28,
    "type": "Transferred",
    "timestamp": "2026-07-23T06:24:57.370Z"
  },
  {
    "id": "tx-real-050",
    "productId": "prod-real-050",
    "quantity": 165,
    "type": "Damaged",
    "timestamp": "2026-06-25T06:24:57.370Z"
  },
  {
    "id": "tx-real-051",
    "productId": "prod-real-051",
    "quantity": 101,
    "type": "Inbound",
    "timestamp": "2026-07-05T06:24:57.370Z"
  },
  {
    "id": "tx-real-052",
    "productId": "prod-real-052",
    "quantity": 151,
    "type": "Outbound",
    "timestamp": "2026-06-20T06:24:57.370Z"
  },
  {
    "id": "tx-real-053",
    "productId": "prod-real-053",
    "quantity": 197,
    "type": "Adjusted",
    "timestamp": "2026-06-24T06:24:57.370Z"
  },
  {
    "id": "tx-real-054",
    "productId": "prod-real-054",
    "quantity": 143,
    "type": "Transferred",
    "timestamp": "2026-07-15T06:24:57.370Z"
  },
  {
    "id": "tx-real-055",
    "productId": "prod-real-055",
    "quantity": 28,
    "type": "Damaged",
    "timestamp": "2026-08-12T06:24:57.370Z"
  },
  {
    "id": "tx-real-056",
    "productId": "prod-real-056",
    "quantity": 85,
    "type": "Inbound",
    "timestamp": "2026-07-25T06:24:57.370Z"
  },
  {
    "id": "tx-real-057",
    "productId": "prod-real-057",
    "quantity": 115,
    "type": "Outbound",
    "timestamp": "2026-07-10T06:24:57.370Z"
  },
  {
    "id": "tx-real-058",
    "productId": "prod-real-058",
    "quantity": 199,
    "type": "Adjusted",
    "timestamp": "2026-08-13T06:24:57.370Z"
  },
  {
    "id": "tx-real-059",
    "productId": "prod-real-059",
    "quantity": 104,
    "type": "Transferred",
    "timestamp": "2026-06-22T06:24:57.370Z"
  },
  {
    "id": "tx-real-060",
    "productId": "prod-real-060",
    "quantity": 26,
    "type": "Damaged",
    "timestamp": "2026-07-14T06:24:57.370Z"
  }
] as unknown as InventoryTransaction[];
