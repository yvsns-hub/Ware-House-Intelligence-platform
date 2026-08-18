'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  CloudRain,
  Users,
  Boxes,
  Truck,
  Loader2,
} from 'lucide-react';
import { WhatIfSimulationInput, WhatIfSimulationOutput } from '@/services/aiCopilotService';

export function WhatIfSimulator() {
  const [weatherCondition, setWeatherCondition] = useState<'Clear' | 'Rain / Storm' | 'High Winds' | 'Snow'>('Clear');
  const [demandMultiplier, setDemandMultiplier] = useState<number>(1.25);
  const [availableWorkers, setAvailableWorkers] = useState<number>(18);
  const [supplierDelayDays, setSupplierDelayDays] = useState<number>(1);
  const [inventoryBufferPct, setInventoryBufferPct] = useState<number>(80);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<WhatIfSimulationOutput | null>({
    scenarioName: 'Simulated: 1.25x Peak Demand Surge, 18 Active Workers, Rain / Storm',
    projectedFulfillmentRate: 86.4,
    projectedRevenueImpact: '-$14,200 potential delay penalty',
    customerSatisfactionScore: 81,
    bottleneckForecast: 'Severe Packing Station 3 Tote Accumulation & Dock 4 Trailer Queue Stagnation',
    aiPrescription: 'Pre-allocate Platinum VIP order waves 2 hours ahead of 14:00 courier deadline and authorize 2 hours overtime for morning pickers.',
    keyRisks: [
      'Stockout probability reaches 48% on top-velocity NVMe SSDs.',
      'Carrier handoff delay increases from 12 mins to 42 mins on Interstate 87.',
    ],
    recommendedMitigations: [
      'Shift 2 evening pickers to morning inbound receiving bay.',
      'Issue electronic early dispatch manifest to freight carriers.',
    ],
  });

  const handleRunSimulation = async () => {
    setIsLoading(true);
    const input: WhatIfSimulationInput = {
      weatherCondition,
      demandMultiplier,
      availableWorkers,
      supplierDelayDays,
      inventoryBufferPct,
    };

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'simulate',
          simulationInput: input,
        }),
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {}
      if (data?.data) {
        setResult(data.data);
      }
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sliders className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Interactive "What-If" Operations Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Stress-test warehouse resilience against demand spikes, labor shortages, supplier delays, and severe weather.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunSimulation}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02] disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" />
              <span>Run AI Simulation</span>
            </>
          )}
        </button>
      </div>

      {/* Simulator Grid: Controls (1 col) + AI Predictions (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Controls Column */}
        <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Operational Variables
          </h3>

          {/* 1. Weather Condition */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-medium">Weather Condition:</label>
            <select
              value={weatherCondition}
              onChange={(e) => setWeatherCondition(e.target.value as any)}
              className="w-full h-9 px-3 bg-slate-900 border border-slate-700 text-white rounded-lg outline-none focus:border-purple-500 text-xs"
            >
              <option value="Clear">Clear / Nominal</option>
              <option value="Rain / Storm">Rain / Heavy Storm</option>
              <option value="High Winds">High Crosswinds</option>
              <option value="Snow">Winter Snow / Ice</option>
            </select>
          </div>

          {/* 2. Demand Surge Multiplier */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-slate-400 font-medium">Order Demand Surge:</label>
              <span className="font-mono font-bold text-purple-400">{demandMultiplier}x ({Math.round(demandMultiplier * 50)} orders)</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="2.0"
              step="0.1"
              value={demandMultiplier}
              onChange={(e) => setDemandMultiplier(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          {/* 3. Available Shift Workers */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-slate-400 font-medium">Available Floor Staff:</label>
              <span className="font-mono font-bold text-cyan-400">{availableWorkers} / 20 staff</span>
            </div>
            <input
              type="range"
              min="10"
              max="25"
              step="1"
              value={availableWorkers}
              onChange={(e) => setAvailableWorkers(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          {/* 4. Supplier Inbound Delay */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-slate-400 font-medium">Supplier Lead Time Delay:</label>
              <span className="font-mono font-bold text-amber-400">+{supplierDelayDays} days</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={supplierDelayDays}
              onChange={(e) => setSupplierDelayDays(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>
        </div>

        {/* AI Simulation Forecast Results */}
        {result && (
          <div className="lg:col-span-2 p-5 rounded-xl bg-gradient-to-br from-purple-950/30 via-slate-950/70 to-slate-950 border border-purple-900/30 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                  Simulation Results
                </span>
                <h4 className="text-sm font-extrabold text-white">
                  {result.scenarioName}
                </h4>
              </div>
            </div>

            {/* 3 Metric Scores */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Projected SLA Rate
                </span>
                <span
                  className={`text-xl font-extrabold font-mono ${
                    result.projectedFulfillmentRate >= 90
                      ? 'text-emerald-400'
                      : result.projectedFulfillmentRate >= 75
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  {result.projectedFulfillmentRate}%
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Revenue at Risk
                </span>
                <span className="text-sm font-extrabold text-rose-400 font-mono mt-1 block">
                  {result.projectedRevenueImpact}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Customer CSAT Score
                </span>
                <span className="text-xl font-extrabold text-cyan-400 font-mono">
                  {result.customerSatisfactionScore}%
                </span>
              </div>
            </div>

            {/* Bottleneck Forecast & AI Prescription */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/30 space-y-1">
                <span className="text-[10px] uppercase font-bold text-rose-400 block">
                  Predicted Bottleneck Hotspot:
                </span>
                <p className="text-rose-200/90 font-medium">
                  {result.bottleneckForecast}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-900/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-400 block flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Director AI Operational Prescription:
                </span>
                <p className="text-blue-100 font-medium leading-relaxed">
                  {result.aiPrescription}
                </p>
              </div>
            </div>

            {/* Mitigations */}
            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-xs space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Recommended Preventative Mitigations:
              </span>
              <ul className="space-y-1 text-emerald-200">
                {result.recommendedMitigations.map((m, idx) => (
                  <li key={idx}>• {m}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
