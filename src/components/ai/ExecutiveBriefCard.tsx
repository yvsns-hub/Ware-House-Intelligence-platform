'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { AIAnalysisOutput } from '@/services/aiCopilotService';

export function ExecutiveBriefCard({
  analysis,
  onAnalyzeWarehouse,
  isAnalyzing,
}: {
  analysis?: AIAnalysisOutput;
  onAnalyzeWarehouse?: () => void;
  isAnalyzing?: boolean;
}) {
  if (!analysis) return null;

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-950 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BrainCircuit className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Daily Operations Director Executive Briefing
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Synthesized operational telemetry and strategic risk directives for shift managers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onAnalyzeWarehouse}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isAnalyzing ? 'Analyzing Warehouse...' : 'Re-Analyze Warehouse'}</span>
          </button>
        </div>
      </div>

      {/* Strategic Executive Summary Banner */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Strategic State Assessment
          </span>
          <span className="text-xs font-bold text-white font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
            Health: {analysis.warehouseHealth.score}% ({analysis.warehouseHealth.status})
          </span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed font-medium">
          {analysis.executiveSummary}
        </p>
      </div>

      {/* Critical Issues (3 Key Risks) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
          Urgent Critical Exceptions Requiring Manager Action:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {analysis.criticalIssues.map((issue) => (
            <div
              key={issue.id}
              className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                    {issue.severity}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {issue.affectedArea}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white leading-snug">
                  {issue.title}
                </h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {issue.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Actions Checklist */}
      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Director Immediate Action Directives
        </span>

        <ul className="space-y-1.5 text-xs text-emerald-200">
          {analysis.priorityActions.map((act, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>{act}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Director Memo Message */}
      <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 block">
          Operations Director Floor Memo:
        </span>
        <p className="italic text-slate-300/90 leading-relaxed font-sans">
          "{analysis.managerMessage}"
        </p>
      </div>
    </div>
  );
}
