import { NextResponse } from 'next/server';
import { simulationEngine } from '@/services/simulationEngine';
import { WhatIfSimulationParams } from '@/types';

export async function POST(request: Request) {
  try {
    const body: WhatIfSimulationParams = await request.json();

    // Default safe fallback parameters
    const params: WhatIfSimulationParams = {
      demandChangePercent: Number(body.demandChangePercent) || 0,
      additionalOrders: Number(body.additionalOrders) || 0,
      inventoryReductionPercent: Number(body.inventoryReductionPercent) || 0,
      supplierDelayDays: Number(body.supplierDelayDays) || 0,
      workforceChangePercent: Number(body.workforceChangePercent) || 0,
      warehouseClosure: body.warehouseClosure || null,
      weatherDisruptionSeverity: body.weatherDisruptionSeverity || 'NONE',
    };

    const result = simulationEngine.runSimulation(params);

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Simulation calculated successfully (NO REAL DATA MODIFIED)',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Simulation execution failed' },
      { status: 500 }
    );
  }
}
