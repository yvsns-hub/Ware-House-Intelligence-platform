import { NextRequest } from 'next/server';
import { aiCopilotService, AIContextPayload, WhatIfSimulationInput } from '@/services/aiCopilotService';
import { successResponse, errorResponse } from '@/utils/apiResponse';
import { inventoryService } from '@/services/inventoryService';
import { orderService } from '@/services/orderService';
import { warehouseService } from '@/services/warehouseService';
import { weatherService } from '@/services/weatherService';
import { decisionIntelligenceService } from '@/services/decisionIntelligenceService';

export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Empty body default
    }

    const action = body.action || 'analyze'; // 'analyze' | 'chat' | 'simulate' | 'explain' | 'report'

    // Fetch real-time live data to construct rich context
    const [productsRes, ordersRes, employees, dashboard, weatherReport] = await Promise.all([
      inventoryService.getProducts({ limit: 100 }),
      orderService.getOrders({ limit: 50 }),
      warehouseService.getEmployees(),
      warehouseService.getDashboardSummary(),
      weatherService.getCurrentWeather(),
    ]);

    const products = productsRes.products || [];
    const orders = ordersRes.orders || [];
    const weather = weatherReport.weather;

    // Run deterministic intelligence calculations
    const healthSummary = decisionIntelligenceService.calculateHealthScores(products, orders, employees, weather);
    const decisions = decisionIntelligenceService.generateOperationalDecisions(products, orders, employees, weather);
    const prioritizedOrders = decisionIntelligenceService.calculateOrderPriorities(orders, weather);
    const reorderAlerts = decisionIntelligenceService.generateReorderRecommendations(products);

    const contextPayload: AIContextPayload = {
      healthSummary,
      products,
      orders,
      employees,
      weather,
      dashboard,
      decisions,
      prioritizedOrders,
      reorderAlerts,
    };

    // 1. Action: Natural Language Chat
    if (action === 'chat') {
      const message = body.message || 'Summarize today\'s warehouse operations';
      const history = body.history || [];
      const chatResult = await aiCopilotService.chatWithDirector(message, history, contextPayload);
      return successResponse(chatResult, 'Chat response generated');
    }

    // 2. Action: What-If Scenario Simulation
    if (action === 'simulate') {
      const simulationInput: WhatIfSimulationInput = body.simulationInput || {
        weatherCondition: 'Clear',
        demandMultiplier: 1.0,
        availableWorkers: 20,
        supplierDelayDays: 0,
        inventoryBufferPct: 100,
      };

      const simulationResult = await aiCopilotService.simulateScenario(simulationInput, contextPayload);
      return successResponse(simulationResult, 'Simulation completed');
    }

    // 3. Action: Comprehensive Operations Director Analysis (Default)
    const analysis = await aiCopilotService.analyzeWarehouse(contextPayload);
    return successResponse(analysis, 'AI Operations Director Analysis completed');
  } catch (error: any) {
    console.error('AI Analysis Route error:', error);
    return errorResponse(error.message || 'AI Operations Director Analysis failed', 500);
  }
}
