'use client';

import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Zap,
  Briefcase,
} from 'lucide-react';
import { WarehouseEmployee } from '@/types';

export function WorkforceOptimizer({
  employees = [],
}: {
  employees: WarehouseEmployee[];
}) {
  const [rebalanced, setRebalanced] = useState(false);

  const morningPickers = employees.filter((e) => e.role === 'Picker' && e.shift === 'Morning');
  const morningPackers = employees.filter((e) => e.role === 'Packer' && e.shift === 'Morning');

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Autonomous Workforce Optimizer &amp; Ratio Balancer
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Realtime ratio optimization between picking waves and packing conveyor throughput.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {rebalanced ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-500/15 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              <CheckCircle2 className="h-4 w-4" />
              Workforce Rebalanced
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setRebalanced(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Execute Rebalancing</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid: Current vs Recommended Load */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current State Box */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Current Shift Allocation
            </span>
            <span className="text-xs font-mono text-amber-400 font-bold">
              Ratio 1.8 : 1.0 (Imbalanced)
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-300">Active Pickers (Morning Shift):</span>
              <span className="font-bold text-white font-mono">{morningPickers.length || 4} Staff</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-300">Active Packers (Morning Shift):</span>
              <span className="font-bold text-white font-mono">{morningPackers.length || 3} Staff</span>
            </div>
            <p className="text-[11px] text-amber-400/90 leading-relaxed">
              ⚠️ Picking throughput is generating 35 totes/hour excess backlog in packing line buffer.
            </p>
          </div>
        </div>

        {/* Recommended State Box */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/30 via-slate-950/60 to-slate-950 border border-indigo-900/40 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Recommended Optimal Balance
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              Ratio 1.3 : 1.0 (Optimal)
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/90 border border-indigo-900/40">
              <span className="text-slate-200">Reassign 2 Pickers to Pack Line 3:</span>
              <span className="font-bold text-emerald-400 font-mono">Carlos M. &amp; Devon B.</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/90 border border-indigo-900/40">
              <span className="text-slate-200">Expected Shift Efficiency Gain:</span>
              <span className="font-bold text-emerald-400 font-mono">+18.5% Throughput</span>
            </div>
            <p className="text-[11px] text-emerald-300/90 leading-relaxed">
              ✓ Completely clears packing queue backlog within 40 minutes before 14:00 courier cutoff.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
