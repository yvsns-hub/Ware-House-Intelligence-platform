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

// 40 Warehouse Locations across 5 distinct zones
export const mockWarehouseLocations: WarehouseLocation[] = [
  // Fast Moving Zone (Aisle A)
  { id: 'loc-a01-1', aisle: 'A', rack: '01', shelf: '1', zone: 'Fast Moving' },
  { id: 'loc-a01-2', aisle: 'A', rack: '01', shelf: '2', zone: 'Fast Moving' },
  { id: 'loc-a02-1', aisle: 'A', rack: '02', shelf: '1', zone: 'Fast Moving' },
  { id: 'loc-a02-2', aisle: 'A', rack: '02', shelf: '2', zone: 'Fast Moving' },
  { id: 'loc-a03-1', aisle: 'A', rack: '03', shelf: '1', zone: 'Fast Moving' },
  { id: 'loc-a03-2', aisle: 'A', rack: '03', shelf: '2', zone: 'Fast Moving' },
  { id: 'loc-a04-1', aisle: 'A', rack: '04', shelf: '1', zone: 'Fast Moving' },
  { id: 'loc-a04-2', aisle: 'A', rack: '04', shelf: '2', zone: 'Fast Moving' },

  // High Value Zone (Aisle B - Secure Cage)
  { id: 'loc-b01-1', aisle: 'B', rack: '01', shelf: '1', zone: 'High Value' },
  { id: 'loc-b01-2', aisle: 'B', rack: '01', shelf: '2', zone: 'High Value' },
  { id: 'loc-b02-1', aisle: 'B', rack: '02', shelf: '1', zone: 'High Value' },
  { id: 'loc-b02-2', aisle: 'B', rack: '02', shelf: '2', zone: 'High Value' },
  { id: 'loc-b03-1', aisle: 'B', rack: '03', shelf: '1', zone: 'High Value' },
  { id: 'loc-b03-2', aisle: 'B', rack: '03', shelf: '2', zone: 'High Value' },
  { id: 'loc-b04-1', aisle: 'B', rack: '04', shelf: '1', zone: 'High Value' },
  { id: 'loc-b04-2', aisle: 'B', rack: '04', shelf: '2', zone: 'High Value' },

  // Cold Storage Zone (Aisle C - Temperature Controlled)
  { id: 'loc-c01-1', aisle: 'C', rack: '01', shelf: '1', zone: 'Cold Storage' },
  { id: 'loc-c01-2', aisle: 'C', rack: '01', shelf: '2', zone: 'Cold Storage' },
  { id: 'loc-c02-1', aisle: 'C', rack: '02', shelf: '1', zone: 'Cold Storage' },
  { id: 'loc-c02-2', aisle: 'C', rack: '02', shelf: '2', zone: 'Cold Storage' },
  { id: 'loc-c03-1', aisle: 'C', rack: '03', shelf: '1', zone: 'Cold Storage' },
  { id: 'loc-c03-2', aisle: 'C', rack: '03', shelf: '2', zone: 'Cold Storage' },
  { id: 'loc-c04-1', aisle: 'C', rack: '04', shelf: '1', zone: 'Cold Storage' },
  { id: 'loc-c04-2', aisle: 'C', rack: '04', shelf: '2', zone: 'Cold Storage' },

  // Bulk Cargo Zone (Aisle D - Pallet Racking)
  { id: 'loc-d01-1', aisle: 'D', rack: '01', shelf: '1', zone: 'Bulk Cargo' },
  { id: 'loc-d01-2', aisle: 'D', rack: '01', shelf: '2', zone: 'Bulk Cargo' },
  { id: 'loc-d02-1', aisle: 'D', rack: '02', shelf: '1', zone: 'Bulk Cargo' },
  { id: 'loc-d02-2', aisle: 'D', rack: '02', shelf: '2', zone: 'Bulk Cargo' },
  { id: 'loc-d03-1', aisle: 'D', rack: '03', shelf: '1', zone: 'Bulk Cargo' },
  { id: 'loc-d03-2', aisle: 'D', rack: '03', shelf: '2', zone: 'Bulk Cargo' },
  { id: 'loc-d04-1', aisle: 'D', rack: '04', shelf: '1', zone: 'Bulk Cargo' },
  { id: 'loc-d04-2', aisle: 'D', rack: '04', shelf: '2', zone: 'Bulk Cargo' },

  // Standard Zone (Aisle E)
  { id: 'loc-e01-1', aisle: 'E', rack: '01', shelf: '1', zone: 'Standard' },
  { id: 'loc-e01-2', aisle: 'E', rack: '01', shelf: '2', zone: 'Standard' },
  { id: 'loc-e02-1', aisle: 'E', rack: '02', shelf: '1', zone: 'Standard' },
  { id: 'loc-e02-2', aisle: 'E', rack: '02', shelf: '2', zone: 'Standard' },
  { id: 'loc-e03-1', aisle: 'E', rack: '03', shelf: '1', zone: 'Standard' },
  { id: 'loc-e03-2', aisle: 'E', rack: '03', shelf: '2', zone: 'Standard' },
  { id: 'loc-e04-1', aisle: 'E', rack: '04', shelf: '1', zone: 'Standard' },
  { id: 'loc-e04-2', aisle: 'E', rack: '04', shelf: '2', zone: 'Standard' },
];

// 20 Warehouse Employees
export const mockEmployees: WarehouseEmployee[] = [
  // Supervisors
  { id: 'emp-01', name: 'Marcus Vance', role: 'Supervisor', efficiencyScore: 97.5, activeOrders: 0, shift: 'Morning' },
  { id: 'emp-02', name: 'Elena Rostova', role: 'Supervisor', efficiencyScore: 96.0, activeOrders: 0, shift: 'Evening' },
  { id: 'emp-03', name: 'David Chen', role: 'Supervisor', efficiencyScore: 94.8, activeOrders: 0, shift: 'Night' },

  // Pickers - Morning
  { id: 'emp-04', name: 'Sarah Jenkins', role: 'Picker', efficiencyScore: 92.4, activeOrders: 4, shift: 'Morning' },
  { id: 'emp-05', name: 'Carlos Mendez', role: 'Picker', efficiencyScore: 88.6, activeOrders: 5, shift: 'Morning' },
  { id: 'emp-06', name: 'Aisha Patel', role: 'Picker', efficiencyScore: 95.1, activeOrders: 3, shift: 'Morning' },
  { id: 'emp-07', name: 'Liam O’Connor', role: 'Picker', efficiencyScore: 84.2, activeOrders: 6, shift: 'Morning' },

  // Pickers - Evening
  { id: 'emp-08', name: 'Devon Brooks', role: 'Picker', efficiencyScore: 91.0, activeOrders: 4, shift: 'Evening' },
  { id: 'emp-09', name: 'Mei-Ling Zhou', role: 'Picker', efficiencyScore: 93.8, activeOrders: 3, shift: 'Evening' },
  { id: 'emp-10', name: 'Tariq Al-Mansoor', role: 'Picker', efficiencyScore: 86.5, activeOrders: 5, shift: 'Evening' },
  { id: 'emp-11', name: 'Hanna Lindqvist', role: 'Picker', efficiencyScore: 89.2, activeOrders: 4, shift: 'Evening' },

  // Pickers - Night
  { id: 'emp-12', name: 'Jackson Reed', role: 'Picker', efficiencyScore: 87.0, activeOrders: 2, shift: 'Night' },
  { id: 'emp-13', name: 'Fatima Zahra', role: 'Picker', efficiencyScore: 90.5, activeOrders: 3, shift: 'Night' },

  // Packers - Morning
  { id: 'emp-14', name: 'James Wilson', role: 'Packer', efficiencyScore: 94.0, activeOrders: 5, shift: 'Morning' },
  { id: 'emp-15', name: 'Chloe Dubois', role: 'Packer', efficiencyScore: 91.5, activeOrders: 4, shift: 'Morning' },
  { id: 'emp-16', name: 'Rajesh Kumar', role: 'Packer', efficiencyScore: 96.2, activeOrders: 6, shift: 'Morning' },

  // Packers - Evening
  { id: 'emp-17', name: 'Sofia Rodriguez', role: 'Packer', efficiencyScore: 89.9, activeOrders: 4, shift: 'Evening' },
  { id: 'emp-18', name: 'Lucas Meyer', role: 'Packer', efficiencyScore: 92.7, activeOrders: 5, shift: 'Evening' },

  // Packers - Night
  { id: 'emp-19', name: 'Kavita Sharma', role: 'Packer', efficiencyScore: 88.0, activeOrders: 2, shift: 'Night' },
  { id: 'emp-20', name: 'Dmitri Volkov', role: 'Packer', efficiencyScore: 93.3, activeOrders: 3, shift: 'Night' },
];

// Product Template Items for 100 Products across 6 categories
const rawProductTemplates: Array<{
  name: string;
  category: ProductCategory;
  description: string;
  stock: number;
  reservedStock: number;
  damagedStock: number;
  reorderLevel: number;
  supplier: string;
  unitPrice: number;
  demandScore: number;
  preferredZone: WarehouseZone;
}> = [
  // 1-20 Electronics (High Value & Fast Moving)
  { name: 'Quantum Pro 4K Monitor 27"', category: 'Electronics', description: 'UHD 144Hz IPS display with HDR600', stock: 45, reservedStock: 12, damagedStock: 0, reorderLevel: 20, supplier: 'Apex Display Corp', unitPrice: 429.99, demandScore: 8.8, preferredZone: 'High Value' },
  { name: 'AeroSound Noise-Cancelling Headphones', category: 'Electronics', description: 'Wireless ANC headphones with 40hr battery', stock: 120, reservedStock: 35, damagedStock: 2, reorderLevel: 30, supplier: 'SonicWave Labs', unitPrice: 249.50, demandScore: 9.2, preferredZone: 'High Value' },
  { name: 'Vortex Mechanical Gaming Keyboard RGB', category: 'Electronics', description: 'Hot-swappable linear optical switches', stock: 85, reservedStock: 18, damagedStock: 1, reorderLevel: 25, supplier: 'PeriphX Inc', unitPrice: 129.99, demandScore: 7.9, preferredZone: 'Fast Moving' },
  { name: 'HyperDrive NVMe Gen4 SSD 2TB', category: 'Electronics', description: '7400MB/s Read PCIe 4.0 storage', stock: 8, reservedStock: 8, damagedStock: 0, reorderLevel: 25, supplier: 'SiliconEdge Ltd', unitPrice: 169.00, demandScore: 9.5, preferredZone: 'High Value' }, // LOW STOCK
  { name: 'UltraStream 4K AI Webcam', category: 'Electronics', description: 'Dual mic auto-framing 60fps sensor', stock: 0, reservedStock: 0, damagedStock: 4, reorderLevel: 15, supplier: 'Apex Display Corp', unitPrice: 99.00, demandScore: 8.1, preferredZone: 'High Value' }, // OUT OF STOCK + DAMAGED
  { name: 'PowerHub 140W GaN Fast Charger', category: 'Electronics', description: '3x USB-C PD 3.1 multi-device brick', stock: 210, reservedStock: 40, damagedStock: 3, reorderLevel: 50, supplier: 'Voltaic Systems', unitPrice: 69.99, demandScore: 8.7, preferredZone: 'Fast Moving' },
  { name: 'OmniSmart Mesh WiFi 7 Router', category: 'Electronics', description: 'Tri-band up to 10 Gbps 6000 sq ft coverage', stock: 32, reservedStock: 10, damagedStock: 0, reorderLevel: 15, supplier: 'NetCore Networks', unitPrice: 299.99, demandScore: 7.4, preferredZone: 'High Value' },
  { name: 'EchoGrip Wireless Ergonomic Mouse', category: 'Electronics', description: 'Vertical 57-degree ergonomic bluetooth mouse', stock: 95, reservedStock: 22, damagedStock: 0, reorderLevel: 30, supplier: 'PeriphX Inc', unitPrice: 79.95, demandScore: 6.8, preferredZone: 'Fast Moving' },
  { name: 'TitanShield Rugged Power Bank 30,000mAh', category: 'Electronics', description: 'IP67 waterproof solar-assisted battery', stock: 14, reservedStock: 10, damagedStock: 2, reorderLevel: 30, supplier: 'Voltaic Systems', unitPrice: 89.50, demandScore: 8.3, preferredZone: 'Fast Moving' }, // LOW STOCK
  { name: 'Lumina Smart Ambient Light Bar 2-Pack', category: 'Electronics', description: 'Screen syncing RGB lighting bars', stock: 65, reservedStock: 14, damagedStock: 0, reorderLevel: 20, supplier: 'Lumina Tech', unitPrice: 119.00, demandScore: 7.2, preferredZone: 'Standard' },
  { name: 'ProCapture Drone 4K Gimbal', category: 'Electronics', description: 'Foldable obstacle avoidance quadcopter', stock: 18, reservedStock: 5, damagedStock: 1, reorderLevel: 10, supplier: 'SkyHigh Aero', unitPrice: 799.00, demandScore: 8.9, preferredZone: 'High Value' },
  { name: 'SmartDock 12-in-1 Thunderbolt 4 Dock', category: 'Electronics', description: 'Dual 4K display 96W host charging station', stock: 54, reservedStock: 16, damagedStock: 0, reorderLevel: 15, supplier: 'SiliconEdge Ltd', unitPrice: 219.00, demandScore: 7.6, preferredZone: 'High Value' },
  { name: 'StudioLink USB-C Condenser Mic', category: 'Electronics', description: 'Cardioid polar pattern 24bit/96kHz audio', stock: 40, reservedStock: 12, damagedStock: 0, reorderLevel: 15, supplier: 'SonicWave Labs', unitPrice: 139.99, demandScore: 6.5, preferredZone: 'Fast Moving' },
  { name: 'SyncTab 11" Android Pro Tablet', category: 'Electronics', description: '120Hz OLED 256GB with stylus support', stock: 3, reservedStock: 3, damagedStock: 2, reorderLevel: 20, supplier: 'Apex Display Corp', unitPrice: 489.00, demandScore: 8.5, preferredZone: 'High Value' }, // LOW STOCK + DAMAGED
  { name: 'PulseFit Smart Fitness Tracker Gen3', category: 'Electronics', description: 'Continuous SpO2 ECG heart rate band', stock: 145, reservedStock: 30, damagedStock: 0, reorderLevel: 40, supplier: 'PulseTech Wearables', unitPrice: 99.95, demandScore: 9.1, preferredZone: 'Fast Moving' },
  { name: 'ApexVR Headset Spatial Audio 512GB', category: 'Electronics', description: 'Standalone mixed reality headset', stock: 22, reservedStock: 8, damagedStock: 0, reorderLevel: 10, supplier: 'Apex Display Corp', unitPrice: 649.99, demandScore: 8.4, preferredZone: 'High Value' },
  { name: 'MagSafe Multi-Stand Qi2 15W', category: 'Electronics', description: '3-in-1 folding magnetic charging stand', stock: 180, reservedStock: 45, damagedStock: 5, reorderLevel: 40, supplier: 'Voltaic Systems', unitPrice: 59.99, demandScore: 8.0, preferredZone: 'Fast Moving' },
  { name: 'SoundBeam Dolby Atmos Soundbar', category: 'Electronics', description: 'Compact soundbar with wireless subwoofer', stock: 28, reservedStock: 6, damagedStock: 0, reorderLevel: 10, supplier: 'SonicWave Labs', unitPrice: 349.00, demandScore: 7.1, preferredZone: 'Bulk Cargo' },
  { name: 'MicroPoint Laser Barcode Scanner', category: 'Electronics', description: 'Industrial wireless 2D QR reader', stock: 62, reservedStock: 10, damagedStock: 0, reorderLevel: 15, supplier: 'PeriphX Inc', unitPrice: 159.00, demandScore: 6.2, preferredZone: 'Standard' },
  { name: 'OptiClean Ultrasonic Record Cleaner', category: 'Electronics', description: 'Automated vinyl groove cleaning machine', stock: 15, reservedStock: 2, damagedStock: 0, reorderLevel: 8, supplier: 'SonicWave Labs', unitPrice: 289.00, demandScore: 5.4, preferredZone: 'High Value' },

  // 21-36 Groceries & Perishables (Cold Storage & Fast Moving)
  { name: 'Artisan Aged Gruyère Cheese 500g', category: 'Groceries', description: 'Swiss raw milk cave-aged cheese', stock: 60, reservedStock: 15, damagedStock: 0, reorderLevel: 20, supplier: 'Alpine Dairy Exports', unitPrice: 18.50, demandScore: 8.2, preferredZone: 'Cold Storage' },
  { name: 'Organic Cold Pressed EVOO 1L', category: 'Groceries', description: 'Single origin extra virgin olive oil', stock: 140, reservedStock: 30, damagedStock: 4, reorderLevel: 35, supplier: 'Mediterranean Grove', unitPrice: 24.99, demandScore: 8.9, preferredZone: 'Standard' },
  { name: 'Wild Alaskan Sockeye Salmon Fillet 1kg', category: 'Groceries', description: 'Flash frozen vacuum sealed wild salmon', stock: 5, reservedStock: 5, damagedStock: 2, reorderLevel: 25, supplier: 'Pacific Coast Seafood', unitPrice: 38.00, demandScore: 9.3, preferredZone: 'Cold Storage' }, // LOW STOCK
  { name: 'Fair Trade Espresso Roast Beans 1kg', category: 'Groceries', description: '100% Arabica shade-grown whole beans', stock: 220, reservedStock: 50, damagedStock: 0, reorderLevel: 45, supplier: 'Equator Botanicals', unitPrice: 22.00, demandScore: 9.6, preferredZone: 'Fast Moving' },
  { name: 'Raw Manuka Honey MGO 550+ 250g', category: 'Groceries', description: 'Certified New Zealand active monovector honey', stock: 45, reservedStock: 8, damagedStock: 0, reorderLevel: 15, supplier: 'Kiwi Apiaries Ltd', unitPrice: 54.00, demandScore: 7.8, preferredZone: 'High Value' },
  { name: 'A5 Miyazaki Wagyu Ribeye Steak 400g', category: 'Groceries', description: 'Certified Japanese black cattle BMS 11', stock: 0, reservedStock: 0, damagedStock: 0, reorderLevel: 10, supplier: 'Nippon Premium Meats', unitPrice: 120.00, demandScore: 8.7, preferredZone: 'Cold Storage' }, // OUT OF STOCK
  { name: 'Matcha Ceremonial Grade Green Tea 100g', category: 'Groceries', description: 'First harvest stone-ground Uji matcha', stock: 85, reservedStock: 20, damagedStock: 1, reorderLevel: 20, supplier: 'Kyoto Tea House', unitPrice: 32.50, demandScore: 8.0, preferredZone: 'Standard' },
  { name: 'Alfonso Mango Puree Frozen 2kg', category: 'Groceries', description: 'Unsweetened premium pulp for culinary use', stock: 75, reservedStock: 14, damagedStock: 0, reorderLevel: 25, supplier: 'TropiHarvest Foods', unitPrice: 16.20, demandScore: 6.9, preferredZone: 'Cold Storage' },
  { name: 'Gluten-Free Artisan Sourdough 6-Pack', category: 'Groceries', description: 'Fermented ancient grain sandwich loaf', stock: 12, reservedStock: 8, damagedStock: 3, reorderLevel: 30, supplier: 'BakeCraft Mills', unitPrice: 28.50, demandScore: 7.5, preferredZone: 'Cold Storage' }, // LOW STOCK + DAMAGED
  { name: 'Organic Cold-Pressed Juice Variety 12-Pack', category: 'Groceries', description: 'Raw HPP treated cleanse juices 350ml', stock: 90, reservedStock: 25, damagedStock: 0, reorderLevel: 30, supplier: 'PureVitality Brands', unitPrice: 42.00, demandScore: 8.4, preferredZone: 'Cold Storage' },
  { name: 'Black Truffle Infused Sea Salt 200g', category: 'Groceries', description: 'Guerande sea salt with dehydrated summer truffle', stock: 110, reservedStock: 18, damagedStock: 0, reorderLevel: 25, supplier: 'Mediterranean Grove', unitPrice: 19.95, demandScore: 6.4, preferredZone: 'Standard' },
  { name: 'Organic Almond Milk Barista Blend 6x1L', category: 'Groceries', description: 'Creamy frothable plant-based milk', stock: 180, reservedStock: 40, damagedStock: 0, reorderLevel: 50, supplier: 'Equator Botanicals', unitPrice: 26.00, demandScore: 8.6, preferredZone: 'Fast Moving' },
  { name: 'Single Estate Dark Chocolate 72% 500g', category: 'Groceries', description: 'Bean-to-bar Madagascar criollo cacao', stock: 65, reservedStock: 10, damagedStock: 0, reorderLevel: 20, supplier: 'Cacao Origins', unitPrice: 21.00, demandScore: 7.1, preferredZone: 'Standard' },
  { name: 'Premium Greek Saffron Stigmas 5g', category: 'Groceries', description: 'Krokos Kozanis PDO certified saffron', stock: 35, reservedStock: 6, damagedStock: 0, reorderLevel: 10, supplier: 'Mediterranean Grove', unitPrice: 45.00, demandScore: 6.1, preferredZone: 'High Value' },
  { name: 'Aged Balsamic Vinegar of Modena 250ml', category: 'Groceries', description: 'Traditional IGP 12-year barrel aged condimento', stock: 48, reservedStock: 12, damagedStock: 0, reorderLevel: 15, supplier: 'Mediterranean Grove', unitPrice: 36.00, demandScore: 7.0, preferredZone: 'Standard' },
  { name: 'Organic Quinoa & Ancient Seed Mix 5kg', category: 'Groceries', description: 'Triple washed royal white, red & black quinoa', stock: 95, reservedStock: 15, damagedStock: 0, reorderLevel: 25, supplier: 'Andean Superfoods', unitPrice: 34.00, demandScore: 6.8, preferredZone: 'Bulk Cargo' },

  // 37-52 Medicine & Healthcare (Cold Storage & Secure High Value)
  { name: 'Insulin Glargine Pen Cartridges 5x3ml', category: 'Medicine', description: 'Long-acting basal human insulin analog (2-8°C)', stock: 42, reservedStock: 15, damagedStock: 0, reorderLevel: 20, supplier: 'PharmaCore Global', unitPrice: 94.00, demandScore: 9.8, preferredZone: 'Cold Storage' },
  { name: 'Amoxicillin Trihydrate 500mg 100 Caps', category: 'Medicine', description: 'Broad-spectrum beta-lactam antibiotic', stock: 150, reservedStock: 35, damagedStock: 0, reorderLevel: 40, supplier: 'BioMedix Life Sciences', unitPrice: 28.50, demandScore: 8.9, preferredZone: 'Standard' },
  { name: 'Epinephrine Auto-Injector 0.3mg 2-Pack', category: 'Medicine', description: 'Emergency anaphylaxis delivery system', stock: 6, reservedStock: 6, damagedStock: 0, reorderLevel: 20, supplier: 'Emergency Health Corp', unitPrice: 185.00, demandScore: 9.4, preferredZone: 'High Value' }, // LOW STOCK
  { name: 'Liposomal Vitamin C 1000mg 60 Sachets', category: 'Medicine', description: 'High bioavailability liquid vitamin pouches', stock: 130, reservedStock: 25, damagedStock: 0, reorderLevel: 30, supplier: 'NutraPure Labs', unitPrice: 39.99, demandScore: 8.1, preferredZone: 'Fast Moving' },
  { name: 'Digital Blood Glucose Monitor Kit', category: 'Medicine', description: 'Bluetooth glucometer + 100 test strips', stock: 80, reservedStock: 18, damagedStock: 2, reorderLevel: 20, supplier: 'DiaTech Healthcare', unitPrice: 49.99, demandScore: 7.9, preferredZone: 'Standard' },
  { name: 'Sterile Surgical Glove Powder-Free Box 100', category: 'Medicine', description: 'Textured nitrile medical examination gloves (Size M)', stock: 350, reservedStock: 80, damagedStock: 0, reorderLevel: 80, supplier: 'MedGuard Supply', unitPrice: 15.20, demandScore: 9.0, preferredZone: 'Fast Moving' },
  { name: 'Pulse Oximeter Finger Sensor Pro', category: 'Medicine', description: 'Hospital grade OLED SpO2 & pulse rate monitor', stock: 0, reservedStock: 0, damagedStock: 6, reorderLevel: 25, supplier: 'DiaTech Healthcare', unitPrice: 34.00, demandScore: 8.5, preferredZone: 'Standard' }, // OUT OF STOCK + DAMAGED
  { name: 'Recombinant Factor VIII Lyophilized 500IU', category: 'Medicine', description: 'Hemophilia A antihemophilic factor (Cold chain)', stock: 18, reservedStock: 4, damagedStock: 0, reorderLevel: 8, supplier: 'PharmaCore Global', unitPrice: 420.00, demandScore: 9.1, preferredZone: 'Cold Storage' },
  { name: 'Ibuprofen Suspension 100mg/5ml Pediatric', category: 'Medicine', description: 'Sugar-free fever and pain reducer 200ml', stock: 160, reservedStock: 40, damagedStock: 0, reorderLevel: 40, supplier: 'BioMedix Life Sciences', unitPrice: 11.50, demandScore: 8.7, preferredZone: 'Fast Moving' },
  { name: 'Hydrocortisone Cream 1% USP 50g', category: 'Medicine', description: 'Topical anti-inflammatory corticosteroid', stock: 95, reservedStock: 20, damagedStock: 0, reorderLevel: 25, supplier: 'BioMedix Life Sciences', unitPrice: 8.75, demandScore: 7.3, preferredZone: 'Standard' },
  { name: 'Automated External Defibrillator AED Pad Set', category: 'Medicine', description: 'Universal adult/pediatric electrode pads', stock: 24, reservedStock: 6, damagedStock: 0, reorderLevel: 12, supplier: 'Emergency Health Corp', unitPrice: 88.00, demandScore: 7.7, preferredZone: 'High Value' },
  { name: 'Bio-Collagen Wound Dressing Matrix 10-Pack', category: 'Medicine', description: 'Advanced wound healing hydrogel pads', stock: 55, reservedStock: 12, damagedStock: 0, reorderLevel: 15, supplier: 'MedGuard Supply', unitPrice: 62.00, demandScore: 6.9, preferredZone: 'Standard' },
  { name: 'Omega-3 Ultra Pure Fish Oil 1200mg 180 Caps', category: 'Medicine', description: 'Molecularly distilled EPA/DHA softgels', stock: 190, reservedStock: 35, damagedStock: 0, reorderLevel: 45, supplier: 'NutraPure Labs', unitPrice: 31.90, demandScore: 8.3, preferredZone: 'Fast Moving' },
  { name: 'Saline 0.9% IV Infusion Solution 10x500ml', category: 'Medicine', description: 'Sterile sodium chloride irrigation solution', stock: 110, reservedStock: 30, damagedStock: 0, reorderLevel: 30, supplier: 'MedGuard Supply', unitPrice: 22.50, demandScore: 8.8, preferredZone: 'Bulk Cargo' },
  { name: 'Zinc Picolinate 50mg High Potency 120 Vcaps', category: 'Medicine', description: 'Immune support mineral supplement', stock: 140, reservedStock: 22, damagedStock: 0, reorderLevel: 30, supplier: 'NutraPure Labs', unitPrice: 17.50, demandScore: 7.2, preferredZone: 'Standard' },
  { name: 'Antiseptic Povidone Iodine Solution 500ml', category: 'Medicine', description: '10% surgical scrub and first aid solution', stock: 75, reservedStock: 15, damagedStock: 0, reorderLevel: 20, supplier: 'MedGuard Supply', unitPrice: 13.40, demandScore: 6.6, preferredZone: 'Standard' },

  // 53-68 Fashion & Apparel (Standard & Fast Moving)
  { name: 'ThermalShield Merino Wool Base Layer Top', category: 'Fashion', description: '100% 200gsm breathable merino wool long sleeve', stock: 115, reservedStock: 28, damagedStock: 0, reorderLevel: 30, supplier: 'Nordic Weave Apparel', unitPrice: 85.00, demandScore: 8.4, preferredZone: 'Fast Moving' },
  { name: 'WeatherProof All-Season Shell Jacket', category: 'Fashion', description: '3-layer GORE-TEX breathable storm parka', stock: 45, reservedStock: 12, damagedStock: 1, reorderLevel: 15, supplier: 'Summit Gear Co', unitPrice: 290.00, demandScore: 8.7, preferredZone: 'High Value' },
  { name: 'FlexTech Stretch Chino Pants Slim Fit', category: 'Fashion', description: 'Water-repellent 4-way stretch commuter trousers', stock: 140, reservedStock: 35, damagedStock: 0, reorderLevel: 35, supplier: 'UrbanThread Tailors', unitPrice: 78.00, demandScore: 8.1, preferredZone: 'Standard' },
  { name: 'AeroLite Carbon Running Shoes (Size 10)', category: 'Fashion', description: 'Marathon racing shoes with carbon propulsion plate', stock: 9, reservedStock: 8, damagedStock: 0, reorderLevel: 25, supplier: 'Veloce Footwear', unitPrice: 195.00, demandScore: 9.3, preferredZone: 'Fast Moving' }, // LOW STOCK
  { name: 'Italian Full-Grain Leather Chelsea Boots', category: 'Fashion', description: 'Handcrafted Goodyear welted calfskin boots', stock: 0, reservedStock: 0, damagedStock: 3, reorderLevel: 15, supplier: 'Tuscan Leatherworks', unitPrice: 260.00, demandScore: 7.9, preferredZone: 'High Value' }, // OUT OF STOCK + DAMAGED
  { name: 'Organic Supima Cotton Crewneck Tee 3-Pack', category: 'Fashion', description: 'Heavyweight 220gsm ring-spun combed cotton', stock: 260, reservedStock: 60, damagedStock: 0, reorderLevel: 50, supplier: 'UrbanThread Tailors', unitPrice: 49.99, demandScore: 9.5, preferredZone: 'Fast Moving' },
  { name: 'Cashmere Ribbed Knit Beanie Unisex', category: 'Fashion', description: '100% Grade-A Mongolian cashmere winter cap', stock: 80, reservedStock: 14, damagedStock: 0, reorderLevel: 20, supplier: 'Nordic Weave Apparel', unitPrice: 55.00, demandScore: 7.2, preferredZone: 'Standard' },
  { name: 'Heavyweight French Terry Pullover Hoodie', category: 'Fashion', description: '450gsm custom milled organic cotton hoodie', stock: 95, reservedStock: 25, damagedStock: 0, reorderLevel: 25, supplier: 'UrbanThread Tailors', unitPrice: 95.00, demandScore: 8.6, preferredZone: 'Fast Moving' },
  { name: 'Tactical Modular Everyday Backpack 28L', category: 'Fashion', description: 'Cordura 1000D water-resistant laptop commuter bag', stock: 70, reservedStock: 16, damagedStock: 0, reorderLevel: 20, supplier: 'Summit Gear Co', unitPrice: 145.00, demandScore: 8.0, preferredZone: 'Standard' },
  { name: 'Polarized Aviator Titanium Sunglasses', category: 'Fashion', description: 'Ultra-lightweight titanium frame with UV400 lenses', stock: 50, reservedStock: 10, damagedStock: 0, reorderLevel: 15, supplier: 'Optix Design Labs', unitPrice: 175.00, demandScore: 7.5, preferredZone: 'High Value' },
  { name: 'Seamless High-Impact Sports Bra', category: 'Fashion', description: 'Moisture wicking compression sports bra', stock: 110, reservedStock: 25, damagedStock: 0, reorderLevel: 30, supplier: 'Veloce Footwear', unitPrice: 42.00, demandScore: 8.2, preferredZone: 'Fast Moving' },
  { name: 'Waterproof Trail Gaiters Low-Cut', category: 'Fashion', description: 'Breathable debris protection for trail running', stock: 65, reservedStock: 12, damagedStock: 0, reorderLevel: 20, supplier: 'Summit Gear Co', unitPrice: 32.00, demandScore: 6.1, preferredZone: 'Standard' },
  { name: 'Silk Knit Necktie Handmade Blue Chevron', category: 'Fashion', description: '100% Mulberry Italian silk knitted tie', stock: 40, reservedStock: 5, damagedStock: 0, reorderLevel: 10, supplier: 'Tuscan Leatherworks', unitPrice: 68.00, demandScore: 5.5, preferredZone: 'Standard' },
  { name: 'DownFill Compact Packable Vest 800-Fill', category: 'Fashion', description: 'Ultralight RDS certified goose down vest', stock: 58, reservedStock: 14, damagedStock: 0, reorderLevel: 18, supplier: 'Summit Gear Co', unitPrice: 120.00, demandScore: 7.8, preferredZone: 'Standard' },
  { name: 'Quick-Dry Boardshorts 4-Way Stretch', category: 'Fashion', description: 'Recycled ocean polyester beach swim shorts', stock: 85, reservedStock: 15, damagedStock: 0, reorderLevel: 25, supplier: 'Veloce Footwear', unitPrice: 48.00, demandScore: 6.9, preferredZone: 'Standard' },
  { name: 'Waxed Canvas Utility Duffle Bag 45L', category: 'Fashion', description: 'Heavy duty brass hardware weekend travel bag', stock: 35, reservedStock: 6, damagedStock: 0, reorderLevel: 12, supplier: 'Tuscan Leatherworks', unitPrice: 180.00, demandScore: 7.4, preferredZone: 'Standard' },

  // 69-84 Furniture & Heavy Goods (Bulk Cargo & Standard)
  { name: 'ErgoDynamic Mesh Executive Desk Chair', category: 'Furniture', description: 'Adjustable 4D armrests, lumbar support, aluminum base', stock: 35, reservedStock: 10, damagedStock: 1, reorderLevel: 12, supplier: 'ErgoForm Workspaces', unitPrice: 389.00, demandScore: 8.9, preferredZone: 'Bulk Cargo' },
  { name: 'Dual-Motor Electric Standing Desk 60x30', category: 'Furniture', description: 'Solid bamboo tabletop with digital memory keypad', stock: 22, reservedStock: 8, damagedStock: 0, reorderLevel: 10, supplier: 'ErgoForm Workspaces', unitPrice: 499.00, demandScore: 8.7, preferredZone: 'Bulk Cargo' },
  { name: 'Modular Sectional Sofa 3-Piece Charcoal', category: 'Furniture', description: 'High resilience foam with stain-resistant linen weave', stock: 4, reservedStock: 4, damagedStock: 1, reorderLevel: 8, supplier: 'Nordic Living Furniture', unitPrice: 1199.00, demandScore: 7.6, preferredZone: 'Bulk Cargo' }, // LOW STOCK
  { name: 'Solid Walnut Mid-Century Coffee Table', category: 'Furniture', description: 'Solid American black walnut with tapered brass legs', stock: 18, reservedStock: 4, damagedStock: 0, reorderLevel: 8, supplier: 'CraftWood Artisans', unitPrice: 340.00, demandScore: 6.8, preferredZone: 'Bulk Cargo' },
  { name: 'Acoustic Desk Privacy Panel 48" Clamp-On', category: 'Furniture', description: 'Recycled PET sound-absorbing felt partition', stock: 75, reservedStock: 15, damagedStock: 0, reorderLevel: 20, supplier: 'ErgoForm Workspaces', unitPrice: 89.00, demandScore: 7.1, preferredZone: 'Standard' },
  { name: 'Industrial Steel Frame Bookshelf 5-Tier', category: 'Furniture', description: 'Rustic oak shelves with matte black powdercoat frame', stock: 0, reservedStock: 0, damagedStock: 2, reorderLevel: 10, supplier: 'CraftWood Artisans', unitPrice: 220.00, demandScore: 7.3, preferredZone: 'Bulk Cargo' }, // OUT OF STOCK + DAMAGED
  { name: 'Ergonomic Active Balance Wobble Stool', category: 'Furniture', description: 'Height-adjustable tilting pneumatic sit-stand perch', stock: 45, reservedStock: 10, damagedStock: 0, reorderLevel: 15, supplier: 'ErgoForm Workspaces', unitPrice: 139.00, demandScore: 6.5, preferredZone: 'Standard' },
  { name: 'Dimmable LED Architect Drafting Floor Lamp', category: 'Furniture', description: 'Counterbalance arm 3000K-6000K touch control lamp', stock: 60, reservedStock: 12, damagedStock: 0, reorderLevel: 15, supplier: 'Lumina Tech', unitPrice: 110.00, demandScore: 6.9, preferredZone: 'Standard' },
  { name: 'Memory Foam Hybrid Mattress Queen 12"', category: 'Furniture', description: 'Pocketed coil base with cooling gel infused layer', stock: 15, reservedStock: 5, damagedStock: 0, reorderLevel: 8, supplier: 'Nordic Living Furniture', unitPrice: 650.00, demandScore: 8.3, preferredZone: 'Bulk Cargo' },
  { name: 'Under-Desk Cable Management Spine Metal', category: 'Furniture', description: 'Flexible snake conduit for standing desk wiring', stock: 120, reservedStock: 25, damagedStock: 0, reorderLevel: 30, supplier: 'ErgoForm Workspaces', unitPrice: 34.50, demandScore: 7.0, preferredZone: 'Standard' },
  { name: 'Minimalist Dining Chair Set of 2 Bentwood', category: 'Furniture', description: 'Molded ash veneer with stackable design', stock: 28, reservedStock: 6, damagedStock: 0, reorderLevel: 10, supplier: 'Nordic Living Furniture', unitPrice: 210.00, demandScore: 6.4, preferredZone: 'Bulk Cargo' },
  { name: 'Mobile Rolling Storage File Cabinet 3-Drawer', category: 'Furniture', description: 'Heavy gauge steel with anti-tip locking mechanism', stock: 32, reservedStock: 7, damagedStock: 0, reorderLevel: 10, supplier: 'ErgoForm Workspaces', unitPrice: 165.00, demandScore: 6.7, preferredZone: 'Bulk Cargo' },
  { name: 'Floating Wall Shelf Solid Oak 36" 2-Pack', category: 'Furniture', description: 'Concealed steel bracket heavy load shelves', stock: 65, reservedStock: 14, damagedStock: 0, reorderLevel: 20, supplier: 'CraftWood Artisans', unitPrice: 75.00, demandScore: 6.2, preferredZone: 'Standard' },
  { name: 'Hand-Tufted Wool Area Rug 8x10 Geometric', category: 'Furniture', description: '100% New Zealand wool plush pile rug', stock: 12, reservedStock: 3, damagedStock: 0, reorderLevel: 6, supplier: 'Nordic Living Furniture', unitPrice: 480.00, demandScore: 7.0, preferredZone: 'Bulk Cargo' },
  { name: 'Dual Monitor Heavy Duty Gas Spring Arm', category: 'Furniture', description: 'Supports dual 32" screens up to 19.8 lbs each', stock: 55, reservedStock: 12, damagedStock: 0, reorderLevel: 15, supplier: 'ErgoForm Workspaces', unitPrice: 129.99, demandScore: 8.0, preferredZone: 'Standard' },
  { name: 'Outdoor Teak Folding Patio Dining Table', category: 'Furniture', description: 'Weather resistant plantation-grown teakwood', stock: 10, reservedStock: 2, damagedStock: 0, reorderLevel: 5, supplier: 'CraftWood Artisans', unitPrice: 390.00, demandScore: 5.8, preferredZone: 'Bulk Cargo' },

  // 85-100 Automotive & Industrial (Bulk Cargo & Standard)
  { name: 'Full Synthetic Motor Oil 5W-30 5-Quart Jug', category: 'Automotive', description: 'Advanced protection high mileage motor oil', stock: 190, reservedStock: 45, damagedStock: 0, reorderLevel: 40, supplier: 'Apex Lubricants LLC', unitPrice: 32.99, demandScore: 9.4, preferredZone: 'Bulk Cargo' },
  { name: 'Heavy Duty 3-Ton Low Profile Floor Jack', category: 'Automotive', description: 'Steel hydraulic dual piston rapid pump garage jack', stock: 26, reservedStock: 8, damagedStock: 0, reorderLevel: 10, supplier: 'TorqueTools Pro', unitPrice: 189.00, demandScore: 8.2, preferredZone: 'Bulk Cargo' },
  { name: 'OBD2 Bluetooth Diagnostic Scanner Tool', category: 'Automotive', description: 'Live sensor graphing and ECU fault code reader', stock: 85, reservedStock: 20, damagedStock: 0, reorderLevel: 25, supplier: 'AutoSensor Technologies', unitPrice: 69.95, demandScore: 8.8, preferredZone: 'Fast Moving' },
  { name: 'High Output Cordless Tire Inflator 150PSI', category: 'Automotive', description: '20V rechargeable digital auto-stop air pump', stock: 7, reservedStock: 6, damagedStock: 1, reorderLevel: 20, supplier: 'TorqueTools Pro', unitPrice: 79.99, demandScore: 9.0, preferredZone: 'Fast Moving' }, // LOW STOCK
  { name: 'Universal Ceramic Brake Pad Set Front', category: 'Automotive', description: 'Low-dust silent braking multi-vehicle compound', stock: 110, reservedStock: 25, damagedStock: 0, reorderLevel: 30, supplier: 'BremShield Systems', unitPrice: 58.00, demandScore: 8.5, preferredZone: 'Standard' },
  { name: 'Car Battery Jump Starter 2000A Peak', category: 'Automotive', description: 'Ultra-safe lithium booster pack for up to 8L gas', stock: 95, reservedStock: 22, damagedStock: 0, reorderLevel: 25, supplier: 'Voltaic Systems', unitPrice: 119.00, demandScore: 9.1, preferredZone: 'High Value' },
  { name: 'Ceramic Coating Paint Sealant Kit 50ml', category: 'Automotive', description: '9H hardness hydrophobic protective crystal coat', stock: 60, reservedStock: 10, damagedStock: 0, reorderLevel: 15, supplier: 'AutoSensor Technologies', unitPrice: 75.00, demandScore: 7.7, preferredZone: 'Standard' },
  { name: 'LED Headlight Conversion Kit H11 12000LM', category: 'Automotive', description: '6500K cool white plug & play replacement bulbs', stock: 0, reservedStock: 0, damagedStock: 5, reorderLevel: 25, supplier: 'Lumina Tech', unitPrice: 49.99, demandScore: 8.3, preferredZone: 'Standard' }, // OUT OF STOCK + DAMAGED
  { name: 'Mechanic Magnetic Tool Tray & Socket Rail Set', category: 'Automotive', description: 'Heavy neodymium magnetic base stainless trays', stock: 130, reservedStock: 20, damagedStock: 0, reorderLevel: 30, supplier: 'TorqueTools Pro', unitPrice: 38.50, demandScore: 7.3, preferredZone: 'Standard' },
  { name: '1/2" Cordless High-Torque Impact Wrench', category: 'Automotive', description: 'Brushless 1000 ft-lbs breakaway torque tool kit', stock: 30, reservedStock: 7, damagedStock: 0, reorderLevel: 10, supplier: 'TorqueTools Pro', unitPrice: 249.00, demandScore: 8.6, preferredZone: 'High Value' },
  { name: 'Windshield Wiper Blades All-Season 24" Pair', category: 'Automotive', description: 'Silicone coated beam blade with universal adapters', stock: 160, reservedStock: 35, damagedStock: 0, reorderLevel: 40, supplier: 'BremShield Systems', unitPrice: 29.99, demandScore: 8.9, preferredZone: 'Fast Moving' },
  { name: 'Heavy Duty Ratchet Tie-Down Straps 4-Pack', category: 'Automotive', description: '1.5" x 15ft 3300 lbs break strength with padded handles', stock: 140, reservedStock: 28, damagedStock: 0, reorderLevel: 35, supplier: 'TorqueTools Pro', unitPrice: 42.00, demandScore: 7.8, preferredZone: 'Standard' },
  { name: 'Automotive Coolant Antifreeze 50/50 1 Gallon', category: 'Automotive', description: 'Universal extended life OAT silicate-free formula', stock: 125, reservedStock: 25, damagedStock: 0, reorderLevel: 30, supplier: 'Apex Lubricants LLC', unitPrice: 21.50, demandScore: 8.0, preferredZone: 'Bulk Cargo' },
  { name: 'Cabin & Engine Air Filter Combo Set', category: 'Automotive', description: 'Activated carbon HEPA cabin filter with pleated intake filter', stock: 90, reservedStock: 18, damagedStock: 0, reorderLevel: 25, supplier: 'BremShield Systems', unitPrice: 36.00, demandScore: 7.5, preferredZone: 'Standard' },
  { name: 'Dual Channel 4K WiFi GPS Dash Cam', category: 'Automotive', description: 'Front 4K & rear 1080P night vision loop recorder', stock: 40, reservedStock: 12, damagedStock: 0, reorderLevel: 15, supplier: 'AutoSensor Technologies', unitPrice: 159.99, demandScore: 8.7, preferredZone: 'High Value' },
  { name: 'Heavy Duty Rubber All-Weather Floor Mats Set', category: 'Automotive', description: 'Custom-trimmable deep dish spill channel mats', stock: 50, reservedStock: 10, damagedStock: 0, reorderLevel: 15, supplier: 'TorqueTools Pro', unitPrice: 64.00, demandScore: 7.1, preferredZone: 'Bulk Cargo' },
];

// Helper to assign mock products to suitable location IDs
export const mockProducts: Product[] = rawProductTemplates.map((template, index) => {
  const paddedIndex = String(index + 1).padStart(3, '0');
  const sku = `SKU-${template.category.substring(0, 3).toUpperCase()}-${paddedIndex}`;
  
  // Find a matching warehouse location ID based on preferred zone
  const matchingLocations = mockWarehouseLocations.filter((loc) => loc.zone === template.preferredZone);
  const locationIndex = index % (matchingLocations.length || 1);
  const assignedLoc = matchingLocations[locationIndex] || mockWarehouseLocations[0];
  const locationStr = `${assignedLoc.zone} [${assignedLoc.aisle}-${assignedLoc.rack}-${assignedLoc.shelf}]`;

  return {
    id: `prod-${paddedIndex}`,
    sku,
    name: template.name,
    category: template.category,
    description: template.description,
    stock: template.stock,
    reservedStock: template.reservedStock,
    damagedStock: template.damagedStock,
    reorderLevel: template.reorderLevel,
    supplier: template.supplier,
    warehouseLocation: locationStr,
    unitPrice: template.unitPrice,
    demandScore: template.demandScore,
    createdAt: new Date(Date.now() - (100 - index) * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - index * 2 * 60 * 60 * 1000).toISOString(),
  };
});

// Realistic customer names & details for 50 orders
const customerList: Array<{ name: string; tier: CustomerTier }> = [
  { name: 'Apex Logistics Hub', tier: 'Platinum' },
  { name: 'BioPharma Global Corp', tier: 'Platinum' },
  { name: 'Metropolitan Health Network', tier: 'Platinum' },
  { name: 'Velocity Fleet Solutions', tier: 'Platinum' },
  { name: 'Global Tech Retailers', tier: 'Gold' },
  { name: 'Pacific Horizon Traders', tier: 'Gold' },
  { name: 'Summit Outdoor Outfitters', tier: 'Gold' },
  { name: 'Nordic Style Living LLC', tier: 'Gold' },
  { name: 'OmniCare Diagnostic Centers', tier: 'Gold' },
  { name: 'Silverline Auto Dynamics', tier: 'Silver' },
  { name: 'Emerald Isle Gourmet', tier: 'Silver' },
  { name: 'Vanguard Electronics Inc', tier: 'Silver' },
  { name: 'Urban Craft Emporium', tier: 'Silver' },
  { name: 'Starlight Medical Supplies', tier: 'Silver' },
  { name: 'Quantum Cloud Robotics', tier: 'Silver' },
  { name: 'Horizon Motors Service', tier: 'Standard' },
  { name: 'Cascade Fresh Foods', tier: 'Standard' },
  { name: 'Highland Ridge Outfitters', tier: 'Standard' },
  { name: 'Pioneer Workstation Design', tier: 'Standard' },
  { name: 'Dr. Amanda Sterling Clinic', tier: 'Standard' },
  { name: 'Atlas Distribution West', tier: 'Platinum' },
  { name: 'Prime Automotive Works', tier: 'Gold' },
  { name: 'Beacon Health Systems', tier: 'Platinum' },
  { name: 'Coastal Culinary Grocers', tier: 'Silver' },
  { name: 'NextGen Gadget Stores', tier: 'Gold' },
];

const priorityList: OrderPriority[] = ['URGENT', 'HIGH', 'MEDIUM', 'LOW'];
const shippingList: ShippingType[] = ['Express', 'SameDay', 'Standard', 'Freight'];
const statusList: OrderStatus[] = [
  'PENDING',
  'PROCESSING',
  'PICKED',
  'PACKED',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

// Generate 50 realistic orders with embedded items
export const mockOrders: Order[] = Array.from({ length: 50 }, (_, i) => {
  const orderNum = `ORD-${2026000 + i + 1}`;
  const customer = customerList[i % customerList.length];
  const priority = i < 5 ? 'URGENT' : i < 15 ? 'HIGH' : i < 35 ? 'MEDIUM' : 'LOW';
  const shippingType = i % 4 === 0 ? 'SameDay' : i % 3 === 0 ? 'Express' : i % 2 === 0 ? 'Standard' : 'Freight';
  const status = i < 8 ? 'PENDING' : i < 20 ? 'PROCESSING' : i < 28 ? 'PICKED' : i < 36 ? 'PACKED' : i < 46 ? 'SHIPPED' : 'DELIVERED';
  
  // Pick 2-4 products for each order
  const itemCount = (i % 3) + 2;
  let totalOrderValue = 0;
  let totalUnits = 0;
  
  const items = Array.from({ length: itemCount }, (_, itemIdx) => {
    const prodIndex = (i * 3 + itemIdx * 7) % mockProducts.length;
    const product = mockProducts[prodIndex];
    const quantity = (itemIdx + 1) * 2;
    const allocated = status === 'PENDING' ? Math.floor(quantity / 2) : quantity;
    const itemStatus = allocated >= quantity ? 'ALLOCATED' : allocated > 0 ? 'PARTIALLY_ALLOCATED' : 'BACKORDERED';
    
    totalOrderValue += product.unitPrice * quantity;
    totalUnits += quantity;

    return {
      id: `ord-item-${i + 1}-${itemIdx + 1}`,
      orderId: `ord-${i + 1}`,
      productId: product.id,
      quantity,
      allocatedQuantity: allocated,
      status: itemStatus,
      product,
    };
  });

  // Calculate deadline from creation
  const createdDate = new Date(Date.now() - (50 - i) * 6 * 60 * 60 * 1000);
  const deadlineHours = priority === 'URGENT' ? 8 : priority === 'HIGH' ? 24 : 72;
  const deadlineDate = new Date(createdDate.getTime() + deadlineHours * 60 * 60 * 1000);

  return {
    id: `ord-${i + 1}`,
    orderNumber: orderNum,
    customerName: customer.name,
    customerTier: customer.tier,
    priority,
    shippingType,
    deliveryDeadline: deadlineDate.toISOString(),
    orderValue: Number(totalOrderValue.toFixed(2)),
    status,
    totalItems: totalUnits,
    createdAt: createdDate.toISOString(),
    items,
  };
});

// Generate realistic Inventory Transactions
const transactionTypes: InventoryTransactionType[] = ['Inbound', 'Outbound', 'Damaged', 'Adjusted', 'Transferred'];

export const mockTransactions: InventoryTransaction[] = Array.from({ length: 80 }, (_, i) => {
  const prodIndex = (i * 11) % mockProducts.length;
  const product = mockProducts[prodIndex];
  const type = i % 5 === 0 ? 'Inbound' : i % 5 === 1 ? 'Outbound' : i % 5 === 2 ? 'Transferred' : i % 5 === 3 ? 'Adjusted' : 'Damaged';
  const quantity = type === 'Damaged' ? (i % 3) + 1 : type === 'Inbound' ? (i % 5 + 1) * 20 : (i % 4 + 1) * 5;
  const timestamp = new Date(Date.now() - (80 - i) * 8 * 60 * 60 * 1000).toISOString();

  return {
    id: `tx-${i + 1}`,
    productId: product.id,
    quantity,
    type,
    timestamp,
    product,
  };
});
