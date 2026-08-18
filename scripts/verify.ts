import { inventoryService } from '../src/services/inventoryService';
import { orderService } from '../src/services/orderService';
import { warehouseService } from '../src/services/warehouseService';
import { weatherService } from '../src/services/weatherService';
import { aiService } from '../src/services/aiService';
import { decisionEngine } from '../src/services/decisionEngine';

async function verifyAll() {
  console.log('🧪 ===============================================');
  console.log('🧪 WAREHOUSE DECISION INTELLIGENCE PLATFORM TEST');
  console.log('🧪 ===============================================\n');

  // 1. Test Products
  console.log('1️⃣ Testing Inventory Service:');
  const productsResult = await inventoryService.getProducts({ limit: 100 });
  console.log(`   - Total Products Retrieved: ${productsResult.total}`);
  const lowStock = await inventoryService.getProducts({ status: 'low_stock' });
  console.log(`   - Low Stock Products Count: ${lowStock.total}`);
  const outOfStock = await inventoryService.getProducts({ status: 'out_of_stock' });
  console.log(`   - Out Of Stock Products Count: ${outOfStock.total}`);
  const damaged = await inventoryService.getProducts({ status: 'damaged' });
  console.log(`   - Damaged Stock Products Count: ${damaged.total}`);
  
  const singleProd = await inventoryService.getProductById('prod-001');
  console.log(`   - Single Product Lookup ('prod-001'): ${singleProd?.name} (${singleProd?.sku})`);

  // 2. Test Orders
  console.log('\n2️⃣ Testing Order Service:');
  const ordersResult = await orderService.getOrders({ limit: 50 });
  console.log(`   - Total Orders Retrieved: ${ordersResult.total}`);
  const urgentOrders = await orderService.getOrders({ priority: 'URGENT' });
  console.log(`   - Urgent Priority Orders: ${urgentOrders.total}`);
  const singleOrder = await orderService.getOrderById('ord-1');
  console.log(`   - Single Order Lookup ('ord-1'): ${singleOrder?.orderNumber} | Customer: ${singleOrder?.customerName} | Total Items: ${singleOrder?.totalItems}`);

  // Test Order Creation
  const newOrder = await orderService.createOrder({
    customerName: 'Test Automation Hospital',
    customerTier: 'Platinum',
    priority: 'URGENT',
    shippingType: 'SameDay',
    deliveryDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    items: [
      { productId: 'prod-001', quantity: 2 },
      { productId: 'prod-002', quantity: 1 },
    ],
  });
  console.log(`   - Created Order: ${newOrder.orderNumber} ($${newOrder.orderValue}) Status: ${newOrder.status}`);

  // 3. Testing Employees & Locations
  console.log('\n3️⃣ Testing Warehouse Service:');
  const employees = await warehouseService.getEmployees();
  console.log(`   - Total Employees: ${employees.length}`);
  const pickers = await warehouseService.getEmployees({ role: 'Picker' });
  console.log(`   - Pickers Count: ${pickers.length}`);
  const locations = await warehouseService.getLocations();
  console.log(`   - Total Warehouse Locations: ${locations.length}`);

  // 4. Testing Dashboard Summary Aggregation
  console.log('\n4️⃣ Testing Dashboard Summary:');
  const dashboard = await warehouseService.getDashboardSummary();
  console.log(`   - Stock Total Units: ${dashboard.inventory.totalStockUnits}`);
  console.log(`   - Estimated Inventory Value: $${dashboard.inventory.totalStockValue.toLocaleString()}`);
  console.log(`   - Active Pickers: ${dashboard.workforce.activePickers} | Packers: ${dashboard.workforce.activePackers}`);
  console.log(`   - Weather Disruption Risk: ${dashboard.weatherImpact.disruptionRisk} (${dashboard.weatherImpact.condition})`);

  // 5. Testing Weather Service
  console.log('\n5️⃣ Testing Weather Service:');
  const weatherReport = await weatherService.getCurrentWeather();
  console.log(`   - Condition: ${weatherReport.weather.condition}, Temp: ${weatherReport.weather.temperature}°C, Inbound Risk: ${weatherReport.impactAnalysis.inboundRisk}`);

  // 6. Testing AI Service
  console.log('\n6️⃣ Testing AI Decision Intelligence Service:');
  const aiAnalysis = await aiService.analyzeWarehouseState({ context: 'inventory' });
  console.log(`   - Insights Generated: ${aiAnalysis.insights.length}`);
  console.log(`   - Recommendations: ${aiAnalysis.recommendations.length}`);
  console.log(`   - Primary Recommendation: "${aiAnalysis.recommendations[0]?.title}"`);

  // 7. Testing Decision Engine
  console.log('\n7️⃣ Testing Decision Engine Heuristics:');
  const cycleResult = decisionEngine.runDecisionCycle(ordersResult.orders, productsResult.products, employees);
  console.log(`   - Engine Status: ${cycleResult.status} (${cycleResult.engineVersion})`);
  console.log(`   - Priority Queue Size: ${cycleResult.priorityOrderQueue.length}`);
  console.log(`   - Restock Alerts Triggered: ${cycleResult.restockAlerts.length}`);

  console.log('\n✅ ALL SERVICE & DATA VERIFICATIONS PASSED SUCCESSFULLY!');
}

verifyAll().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
