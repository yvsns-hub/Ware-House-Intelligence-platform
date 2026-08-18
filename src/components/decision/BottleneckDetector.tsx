'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  Layers,
} from 'lucide-react';
import { OperationalBottleneck } from '@/services/decisionIntelligenceService';

export function BottleneckDetector({
  bottlenecks,
}: {
  bottlenecks: OperationalBottleneck[];
}) {
  const [resolvedMap, setResolvedMap] = useState<Record<string, boolean>>({});

  const handleResolve = (id: string) => {
    setResolvedMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Activity className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Operational Bottleneck Detector &amp; Flow Diagnostics
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Automated floor diagnostics identifying cycle-time drag points, staging lane buffer limits, and operator load deviations.
          </p>
        </div>

        <span className="text-xs text-rose-400 font-bold bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
          {bottlenecks.length} Active Bottlenecks
        </span>
      </div>

      {/* Grid of Bottleneck Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bottlenecks.map((b) => {
          const isResolved = resolvedMap[b.id];
          return (
            <motion.div
              key={b.id}
              whileHover={{ y: -2 }}
              className="p-5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                        b.severity === 'Critical'
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {b.severity}
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {b.area}
                    </h3>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {b.metrics.label}: <b className="text-slate-200">{b.metrics.value}</b>
                  </span>
                </div>

                {/* Cause & Impact */}
                <div className="space-y-1 text-xs">
                  <p className="text-slate-300">
                    <b className="text-slate-400">Root Cause: </b>
                    {b.cause}
                  </p>
                  <p className="text-slate-400">
                    <b className="text-slate-500">Business Impact: </b>
                    {b.businessImpact}
                  </p>
                </div>

                {/* AI Recommendation */}
                <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/40 text-xs space-y-1">
                  <span className="font-bold text-blue-300 flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-blue-400" />
                    Recommended Resolution:
                  </span>
                  <p className="text-blue-200/90 leading-relaxed font-medium">
                    {b.recommendation}
                  </p>
                </div>
              </div>

              {/* Footer: Improvement & Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Expected: {b.expectedImprovement}</span>
                </div>

                {isResolved ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Resolved
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleResolve(b.id)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors"
                  >
                    Execute Fix
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
