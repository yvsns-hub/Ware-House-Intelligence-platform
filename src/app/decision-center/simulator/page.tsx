'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sliders,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Users,
  Truck,
  Boxes,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  DollarSign,
  Activity,
} from 'lucide-react';
import { simulationEngine } from '@/services/simulationEngine';
import { WhatIfSimulationParams, WhatIfSimulationResult } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function WhatIfSimulatorPage() {
  // Configurable scenario parameters
  const [params, setParams] = useState<WhatIfSimulationParams>({
    demandChangePercent: 30,
    additionalOrders: 500,
    inventoryReductionPercent: 0,
    supplierDelayDays: 3,
    workforceChangePercent: -10,
    warehouseClosure: null,
    weatherDisruptionSeverity: 'NONE',
  });

  const [result, setResult] = useState<WhatIfSimulationResult>(() =>
    simulationEngine.runSimulation({
      demandChangePercent: 30,
      additionalOrders: 500,
      inventoryReductionPercent: 0,
      supplierDelayDays: 3,
      workforceChangePercent: -10,
      warehouseClosure: null,
      weatherDisruptionSeverity: 'NONE',
    })
  );

  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = async (updatedParams: WhatIfSimulationParams) => {
    setIsSimulating(true);
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedParams),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setResult(simulationEngine.runSimulation(updatedParams));
      }
    } catch (e) {
      setResult(simulationEngine.runSimulation(updatedParams));
    } finally {
      setIsSimulating(false);
    }
  };

  const handleParamChange = (field: keyof WhatIfSimulationParams, value: any) => {
    const updated = { ...params, [field]: value };
    setParams(updated);
    handleRunSimulation(updated);
  };

  const handleReset = () => {
    const defaultParams: WhatIfSimulationParams = {
      demandChangePercent: 0,
      additionalOrders: 0,
      inventoryReductionPercent: 0,
      supplierDelayDays: 0,
      workforceChangePercent: 0,
      warehouseClosure: null,
      weatherDisruptionSeverity: 'NONE',
    };
    setParams(defaultParams);
    handleRunSimulation(defaultParams);
  };

  const handlePreset = (presetName: string) => {
    let p: WhatIfSimulationParams = { ...params };
    if (presetName === 'flash_sale') {
      p = {
        demandChangePercent: 50,
        additionalOrders: 1200,
        inventoryReductionPercent: 0,
        supplierDelayDays: 0,
        workforceChangePercent: 0,
        warehouseClosure: null,
        weatherDisruptionSeverity: 'NONE',
      };
    } else if (presetName === 'supply_crisis') {
      p = {
        demandChangePercent: 15,
        additionalOrders: 200,
        inventoryReductionPercent: 25,
        supplierDelayDays: 7,
        workforceChangePercent: -15,
        warehouseClosure: null,
        weatherDisruptionSeverity: 'SEVERE',
      };
    } else if (presetName === 'strike_shortage') {
      p = {
        demandChangePercent: 0,
        additionalOrders: 0,
        inventoryReductionPercent: 0,
        supplierDelayDays: 2,
        workforceChangePercent: -40,
        warehouseClosure: null,
        weatherDisruptionSeverity: 'NONE',
      };
    }
    setParams(p);
    handleRunSimulation(p);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8">
      {/* Simulation Banner Notice */}
      <div className="bg-amber-500/10 border-2 border-dashed border-amber-500/40 rounded-xl p-3 px-5 flex items-center justify-between gap-4 text-amber-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold tracking-wide uppercase text-sm block">
              SIMULATION MODE — NO REAL DATA MODIFIED
            </span>
            <span className="text-xs text-amber-200/80">
              All scenarios run against deterministic operational models in isolated memory. Safe to stress-test extreme edge cases.
            </span>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-500/30 hover:bg-amber-500/20 text-xs font-semibold text-amber-300 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Baseline
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              Predictive Decision Intelligence
            </span>
            <span className="text-xs text-slate-400">Deterministic Scenario Engine v2.0</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Sliders className="w-8 h-8 text-indigo-400" />
            What-If Operations Simulator
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Model demand shocks, labor shortages, supplier disruptions, and weather storms before they impact production.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/decision-center"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sm font-medium text-slate-300 transition-colors"
          >
            Back to Decision Center
          </Link>
          <Link
            href="/approvals"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Manager Approvals
          </Link>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
          Instant Stress Scenarios:
        </span>
        <button
          onClick={() => handlePreset('flash_sale')}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-indigo-500/30 hover:border-indigo-500/70 text-xs font-medium text-indigo-300 transition-colors"
        >
          ⚡ Flash Sale Demand Spike (+50%)
        </button>
        <button
          onClick={() => handlePreset('supply_crisis')}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-rose-500/30 hover:border-rose-500/70 text-xs font-medium text-rose-300 transition-colors"
        >
          🌧️ Severe Weather & Supplier Lag
        </button>
        <button
          onClick={() => handlePreset('strike_shortage')}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-500/30 hover:border-amber-500/70 text-xs font-medium text-amber-300 transition-colors"
        >
          👷 Workforce Reduction (-40%)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Parameter Controls */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Scenario Variables
            </h2>
            <span className="text-xs text-slate-500">Live Updating</span>
          </div>

          {/* 1. Demand Change % */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-slate-300 font-medium">Demand Surge / Drop</label>
              <span className={`font-bold ${params.demandChangePercent >= 0 ? 'text-indigo-400' : 'text-rose-400'}`}>
                {params.demandChangePercent > 0 ? `+${params.demandChangePercent}%` : `${params.demandChangePercent}%`}
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="100"
              step="5"
              value={params.demandChangePercent}
              onChange={(e) => handleParamChange('demandChangePercent', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>-50%</span>
              <span>Baseline (0%)</span>
              <span>+100%</span>
            </div>
          </div>

          {/* 2. Additional Orders */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-slate-300 font-medium">Additional Surprise Orders</label>
              <span className="font-bold text-indigo-400">+{params.additionalOrders} orders</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={params.additionalOrders}
              onChange={(e) => handleParamChange('additionalOrders', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0</span>
              <span>+1,000</span>
              <span>+2,000</span>
            </div>
          </div>

          {/* 3. Inventory Reduction % */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-slate-300 font-medium">Inventory Loss / Damage</label>
              <span className="font-bold text-rose-400">-{params.inventoryReductionPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={params.inventoryReductionPercent}
              onChange={(e) => handleParamChange('inventoryReductionPercent', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0% (No Loss)</span>
              <span>-25%</span>
              <span>-50% (Severe)</span>
            </div>
          </div>

          {/* 4. Supplier Delay Days */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-slate-300 font-medium">Supplier Lead-Time Delay</label>
              <span className="font-bold text-amber-400">+{params.supplierDelayDays} days</span>
            </div>
            <input
              type="range"
              min="0"
              max="14"
              step="1"
              value={params.supplierDelayDays}
              onChange={(e) => handleParamChange('supplierDelayDays', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>On-Time (0d)</span>
              <span>+7 days</span>
              <span>+14 days</span>
            </div>
          </div>

          {/* 5. Workforce Headcount Adjustment */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-slate-300 font-medium">Available Workforce</label>
              <span className={`font-bold ${params.workforceChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {params.workforceChangePercent > 0 ? `+${params.workforceChangePercent}%` : `${params.workforceChangePercent}%`}
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              step="5"
              value={params.workforceChangePercent}
              onChange={(e) => handleParamChange('workforceChangePercent', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>-50% (Shortage)</span>
              <span>Baseline (0%)</span>
              <span>+50% (Overtime)</span>
            </div>
          </div>

          {/* 6. Weather Disruption */}
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium block">Weather Disruption Severity</label>
            <div className="grid grid-cols-3 gap-2">
              {(['NONE', 'MODERATE', 'SEVERE'] as const).map((sev) => (
                <button
                  key={sev}
                  onClick={() => handleParamChange('weatherDisruptionSeverity', sev)}
                  className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                    params.weatherDisruptionSeverity === sev
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {sev === 'NONE' ? 'Clear' : sev === 'MODERATE' ? 'Moderate' : 'Severe Storm'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Simulation Results & AI Interventions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Key Metric Transition Matrix */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-base font-bold text-white mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Operational Impact Breakdown: Current vs. Simulated
              </span>
              <span className="text-xs font-normal text-slate-400">
                Calculated at {new Date(result.calculatedAt).toLocaleTimeString()}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Metric 1: Fulfillment Rate */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs text-slate-400 font-semibold uppercase">Fulfillment SLA Rate</div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Baseline</span>
                    <span className="text-lg font-bold text-slate-300">{result.currentState.fulfillmentRate}%</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div>
                    <span className="text-xs text-slate-500 block">Simulated</span>
                    <span
                      className={`text-xl font-black ${
                        result.simulatedState.fulfillmentRate >= 90
                          ? 'text-emerald-400'
                          : result.simulatedState.fulfillmentRate >= 80
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {result.simulatedState.fulfillmentRate}%
                    </span>
                  </div>
                </div>
                <div className="text-xs text-rose-400/90 font-medium pt-1 border-t border-slate-800/60">
                  Delta: {result.difference.fulfillmentRateDelta}%
                </div>
              </div>

              {/* Metric 2: Stockout Risk SKUs */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs text-slate-400 font-semibold uppercase">Stockout Risk SKUs</div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Baseline</span>
                    <span className="text-lg font-bold text-slate-300">{result.currentState.stockoutRiskSKUs} SKUs</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div>
                    <span className="text-xs text-slate-500 block">Simulated</span>
                    <span className="text-xl font-black text-rose-400">
                      {result.simulatedState.stockoutRiskSKUs} SKUs
                    </span>
                  </div>
                </div>
                <div className="text-xs text-rose-400/90 font-medium pt-1 border-t border-slate-800/60">
                  +{result.difference.stockoutSKUsDelta} at risk
                </div>
              </div>

              {/* Metric 3: Delayed Orders */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs text-slate-400 font-semibold uppercase">Projected Delayed Orders</div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Baseline</span>
                    <span className="text-lg font-bold text-slate-300">{result.currentState.delayedOrders}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div>
                    <span className="text-xs text-slate-500 block">Simulated</span>
                    <span className="text-xl font-black text-amber-400">
                      {result.simulatedState.delayedOrders}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-amber-400/90 font-medium pt-1 border-t border-slate-800/60">
                  +{result.difference.delayedOrdersDelta} SLA risks
                </div>
              </div>

              {/* Metric 4: Warehouse Workload */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs text-slate-400 font-semibold uppercase">Warehouse Workload</div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Baseline</span>
                    <span className="text-lg font-bold text-slate-300">{result.currentState.warehouseWorkloadPercent}%</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div>
                    <span className="text-xs text-slate-500 block">Simulated</span>
                    <span className="text-xl font-black text-indigo-400">
                      {result.simulatedState.warehouseWorkloadPercent}%
                    </span>
                  </div>
                </div>
                <div className="text-xs text-indigo-400/90 font-medium pt-1 border-t border-slate-800/60">
                  {result.difference.workloadDelta > 0 ? `+${result.difference.workloadDelta}% capacity load` : `${result.difference.workloadDelta}%`}
                </div>
              </div>

              {/* Metric 5: Required Workforce Headcount */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs text-slate-400 font-semibold uppercase">Required Headcount</div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Current Staff</span>
                    <span className="text-lg font-bold text-slate-300">{result.currentState.requiredWorkforceHeadcount}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div>
                    <span className="text-xs text-slate-500 block">Required</span>
                    <span className="text-xl font-black text-emerald-400">
                      {result.simulatedState.requiredWorkforceHeadcount} staff
                    </span>
                  </div>
                </div>
                <div className="text-xs text-emerald-400/90 font-medium pt-1 border-t border-slate-800/60">
                  {result.difference.workforceHeadcountDelta > 0 ? `Need +${result.difference.workforceHeadcountDelta} workers` : 'Workforce balanced'}
                </div>
              </div>

              {/* Metric 6: Estimated Cost Impact */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs text-slate-400 font-semibold uppercase">Total Landed Cost</div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Baseline</span>
                    <span className="text-lg font-bold text-slate-300">{formatCurrency(result.currentState.estimatedTotalCost)}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div>
                    <span className="text-xs text-slate-500 block">Simulated</span>
                    <span className="text-xl font-black text-rose-400">
                      {formatCurrency(result.simulatedState.estimatedTotalCost)}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-rose-400/90 font-medium pt-1 border-t border-slate-800/60">
                  +{formatCurrency(result.difference.costDelta)} delta
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommended Preventative Interventions */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                AI Preventative Mitigation Plan
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                Autonomous Recommendations
              </span>
            </div>

            <div className="space-y-3">
              {result.recommendedActions.map((rec, index) => (
                <div
                  key={rec.id}
                  className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-bold ${
                          rec.priority === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : rec.priority === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {rec.priority}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Confidence: {rec.confidence}%</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200">{rec.action}</p>
                    <p className="text-xs text-emerald-400/90 font-medium">Impact: {rec.impact}</p>
                  </div>

                  <Link
                    href="/approvals"
                    className="px-3.5 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-semibold transition-all shrink-0 text-center"
                  >
                    Submit for Approval
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
