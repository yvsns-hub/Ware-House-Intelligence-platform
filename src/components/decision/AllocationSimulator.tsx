'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Boxes,
  Split,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  User,
} from 'lucide-react';
import { CustomerTierBadge } from '@/components/ui/StatusBadge';

export function AllocationSimulator() {
  const [totalAvailable, setTotalAvailable] = useState<number>(7);
  const [vipRequested, setVipRequested] = useState<number>(10);
  const [standardRequested, setStandardRequested] = useState<number>(5);

  const [applied, setApplied] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Dynamic calculation based on state
  const vipAllocated = Math.min(vipRequested, totalAvailable);
  const vipBackorder = Math.max(0, vipRequested - vipAllocated);
  const standardAllocated = Math.max(0, Math.min(standardRequested, totalAvailable - vipAllocated));
  const standardBackorder = standardRequested - standardAllocated;

  const handleApply = () => {
    setApplied(true);
    setFeedback('Autonomous Smart Allocation applied! VIP SLA preserved & Emergency PO drafted for remaining 3 units.');
  };

  const handleReset = () => {
    setApplied(false);
    setFeedback(null);
    setTotalAvailable(7);
    setVipRequested(10);
    setStandardRequested(5);
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Split className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Smart Inventory Allocation &amp; Shortage Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Multi-order inventory contention solver dynamically allocating scarce stock to maximize customer retention.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {applied ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-xl">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Allocation Applied
            </span>
          ) : (
            <button
              type="button"
              onClick={handleApply}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-200" />
              <span>Apply Recommendation</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors"
            title="Reset Simulator"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{feedback}</span>
        </motion.div>
      )}

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Contention Scenario Inputs (1 col) */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Inventory Contention Scenario
          </h3>

          <div className="space-y-2">
            <label className="text-slate-400 font-medium block">
              Physical Stock Available in Bay:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="50"
                value={totalAvailable}
                onChange={(e) => setTotalAvailable(Math.max(0, Number(e.target.value)))}
                className="w-24 h-9 px-3 bg-slate-900 border border-slate-700 text-white font-mono font-bold rounded-lg outline-none focus:border-purple-500"
              />
              <span className="text-slate-400">units of SKU-ELE-004 (2TB SSD)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-3">
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-900/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Order A (Apex Logistics)</span>
                <CustomerTierBadge tier="Platinum" />
              </div>
              <p className="text-[11px] text-slate-400">Demands 10 units • SameDay SLA</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Order B (Horizon Motors)</span>
                <CustomerTierBadge tier="Standard" />
              </div>
              <p className="text-[11px] text-slate-400">Demands 5 units • Standard SLA</p>
            </div>
          </div>
        </div>

        {/* AI Allocation Strategy Recommendation (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-gradient-to-br from-purple-950/30 via-slate-950/60 to-slate-950 border border-purple-900/30 space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                Autonomous Allocation Logic
              </span>
              <h3 className="text-sm font-extrabold text-white">
                Recommended Allocation Execution
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">SLA Retention</span>
              <span className="text-sm font-extrabold text-emerald-400 font-mono">
                95.2% Score
              </span>
            </div>
          </div>

          {/* Allocation Visual Split Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* VIP Allocation Box */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300">Order A (VIP Account)</span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {vipAllocated} Allocated
                </span>
              </div>

              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(vipAllocated / vipRequested) * 100}%` }}
                />
                <div
                  className="bg-amber-500 h-full opacity-60"
                  style={{ width: `${(vipBackorder / vipRequested) * 100}%` }}
                />
              </div>

              <div className="text-[11px] text-slate-300 space-y-1">
                <p>• <b className="text-white">Allocate {vipAllocated} units</b> to avoid full delivery failure.</p>
                <p>• <b className="text-amber-400">Backorder {vipBackorder} units</b> with supplier tracking notice.</p>
              </div>
            </div>

            {/* Standard Allocation Box */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Order B (Standard)</span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {standardAllocated} Allocated ({standardBackorder} Delayed)
                </span>
              </div>

              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(standardAllocated / standardRequested) * 100}%` }}
                />
                <div
                  className="bg-slate-700 h-full"
                  style={{ width: `${(standardBackorder / standardRequested) * 100}%` }}
                />
              </div>

              <div className="text-[11px] text-slate-300 space-y-1">
                <p>• <b className="text-slate-400">Delay standard order</b> to preserve high-margin account.</p>
                <p>• Send customer courtesy discount code &amp; expected 24h restock arrival.</p>
              </div>
            </div>
          </div>

          {/* Purchasing Trigger Notice */}
          <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200 flex items-center justify-between gap-3">
            <span>
              <b>Purchasing Notification:</b> Automated replenishment PO generated for SiliconEdge Ltd for 100 units.
            </span>
            <span className="font-bold text-blue-300 shrink-0 font-mono">PO-88192</span>
          </div>
        </div>
      </div>
    </div>
  );
}
