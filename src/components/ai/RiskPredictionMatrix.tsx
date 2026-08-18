'use client';

import React from 'react';
import {
  TrendingDown,
  AlertTriangle,
  Clock,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { AIAnalysisOutput } from '@/services/aiCopilotService';

export function RiskPredictionMatrix({
  predictions,
}: {
  predictions: AIAnalysisOutput['predictions'];
}) {
  if (!predictions || predictions.length === 0) return null;

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <TrendingDown className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Predictive Risk &amp; Vulnerability Matrix
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Forward-looking probability modeling forecasting stockouts, SLA breaches, and buffer bottlenecks.
          </p>
        </div>

        <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          {predictions.length} Modeled Risks
        </span>
      </div>

      {/* Grid of Risk Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictions.map((p, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-500" />
                  {p.timeHorizon}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/20 font-mono">
                  <span>{p.probability}% Probability</span>
                </div>
              </div>

              <h4 className="text-xs font-extrabold text-white leading-snug">
                {p.risk}
              </h4>

              {/* Progress bar */}
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                  style={{ width: `${p.probability}%` }}
                />
              </div>

              <div className="text-[11px] text-slate-400 leading-snug">
                <span className="font-semibold text-slate-300">Financial Impact: </span>
                {p.businessImpact}
              </div>
            </div>

            {/* Mitigation */}
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Director Mitigation:
              </span>
              <p className="text-[11px] text-emerald-200/90 leading-tight">
                {p.mitigation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
