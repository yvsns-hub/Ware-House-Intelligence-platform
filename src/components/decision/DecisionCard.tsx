'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { OperationalDecision } from '@/services/decisionIntelligenceService';
import { cn } from '@/lib/utils';

export function DecisionCard({
  decision,
  onExecuteAction,
}: {
  decision: OperationalDecision;
  onExecuteAction?: (decision: OperationalDecision) => void;
}) {
  const [isExecuted, setIsExecuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const severityConfig = {
    Critical: {
      border: 'border-rose-500/30 hover:border-rose-500/60',
      badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      btn: 'bg-rose-600 hover:bg-rose-500 text-white',
    },
    High: {
      border: 'border-amber-500/30 hover:border-amber-500/60',
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      btn: 'bg-amber-600 hover:bg-amber-500 text-white',
    },
    Medium: {
      border: 'border-blue-500/30 hover:border-blue-500/60',
      badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      btn: 'bg-blue-600 hover:bg-blue-500 text-white',
    },
    Low: {
      border: 'border-slate-800 hover:border-slate-700',
      badge: 'bg-slate-800 text-slate-300 border-slate-700',
      btn: 'bg-slate-800 hover:bg-slate-700 text-slate-200',
    },
  };

  const config = severityConfig[decision.severity] || severityConfig.Medium;

  const handleAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsExecuted(true);
      if (onExecuteAction) onExecuteAction(decision);
    }, 500);
  };

  return (
    <motion.div
      whileHover={{ y: -1.5 }}
      className={cn(
        'relative rounded-xl border bg-slate-900/90 p-4 shadow-md backdrop-blur-sm transition-all duration-150 flex flex-col justify-between space-y-3 overflow-hidden',
        config.border
      )}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border',
              config.badge
            )}
          >
            ● {decision.severity}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
            {decision.category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
            {decision.confidenceScore}% Confidence
          </span>
          <span className="text-slate-500 font-mono text-[10px]">
            {decision.timestamp}
          </span>
        </div>
      </div>

      {/* Decision Title */}
      <h3 className="text-xs font-bold text-white tracking-tight leading-snug">
        {decision.title}
      </h3>

      {/* 2-Column Compact Comparison: Problem vs AI Recommendation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {/* Problem */}
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
            Problem &amp; Impact
          </span>
          <p className="text-[11px] text-slate-300 leading-snug">
            {decision.problem}
          </p>
        </div>

        {/* AI Recommendation */}
        <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-900/40 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block flex items-center gap-1">
            <BrainCircuit className="h-3 w-3" />
            AI Action
          </span>
          <p className="text-[11px] text-blue-200 leading-snug">
            {decision.aiRecommendation}
          </p>
        </div>
      </div>

      {/* Footer: Benefit & Action */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1 truncate max-w-[200px]">
          <TrendingUp className="h-3 w-3 shrink-0" />
          <span className="truncate">{decision.estimatedBenefit}</span>
        </div>

        <div>
          {isExecuted ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold rounded-lg">
              <CheckCircle2 className="h-3 w-3" />
              Applied
            </span>
          ) : (
            <button
              type="button"
              onClick={handleAction}
              disabled={isLoading}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg shadow transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50',
                config.btn
              )}
            >
              <span>{isLoading ? '...' : decision.actionLabel}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
