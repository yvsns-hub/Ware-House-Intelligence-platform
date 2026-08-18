'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react';
import { OperationalException } from '@/services/decisionIntelligenceService';

export function ExceptionCenter({
  exceptions,
}: {
  exceptions: OperationalException[];
}) {
  const [resolvedIds, setResolvedIds] = useState<Record<string, boolean>>({});

  const handleResolve = (id: string) => {
    setResolvedIds((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Operational Exception Center
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Structured 3-step resolution matrix: <span className="text-rose-300 font-bold">Problem</span> $\rightarrow$ <span className="text-blue-300 font-bold">Autonomous Decision</span> $\rightarrow$ <span className="text-emerald-300 font-bold">Resolution Execution</span>.
          </p>
        </div>

        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
          Total Exceptions: <b className="text-white">{exceptions.length}</b>
        </span>
      </div>

      {/* Exceptions Grid */}
      <div className="space-y-3">
        {exceptions.map((exc) => {
          const isResolved = resolvedIds[exc.id] || exc.isResolved;
          return (
            <div
              key={exc.id}
              className="p-5 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-colors space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                      exc.severity === 'Critical'
                        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    ● {exc.type}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{exc.id}</span>
                </div>

                <span className="text-[11px] text-slate-500 font-mono">
                  {exc.timestamp}
                </span>
              </div>

              {/* 3-Step Horizontal Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* 1. Problem */}
                <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-400 block">
                    1. Problem
                  </span>
                  <p className="text-rose-200/90 leading-relaxed font-medium">
                    {exc.problem}
                  </p>
                </div>

                {/* 2. Decision */}
                <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/30 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-400 block">
                    2. Autonomous Decision
                  </span>
                  <p className="text-blue-200/90 leading-relaxed font-medium">
                    {exc.decision}
                  </p>
                </div>

                {/* 3. Resolution */}
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                    3. Resolution
                  </span>
                  <p className="text-emerald-200/90 leading-relaxed font-medium">
                    {exc.resolution}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-end pt-1">
                {isResolved ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="h-4 w-4" />
                    Exception Resolved
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleResolve(exc.id)}
                    className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors"
                  >
                    Resolve Exception
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
