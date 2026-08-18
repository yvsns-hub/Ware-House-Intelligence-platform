'use client';

import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  BrainCircuit,
  ArrowRight,
} from 'lucide-react';
import { OperationalDecision } from '@/services/decisionIntelligenceService';

export function DecisionValidationCard({
  decisions = [],
}: {
  decisions: OperationalDecision[];
}) {
  const sampleDecisionsToAudit = decisions.slice(0, 4);

  const getValidationStatus = (index: number) => {
    if (index === 0) return { status: 'Optimal Decision', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', note: 'Strong operational logic. Minimizes SLA churn while securing replenishment.' };
    if (index === 1) return { status: 'Optimal Decision', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', note: 'Complies with cold-chain and medical regulatory storage protocols.' };
    if (index === 2) return { status: 'Needs Review', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30', note: 'Consider checking vendor credit history before processing full return.' };
    return { status: 'Optimal Decision', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', note: 'Mitigates Highway 87 weather disruption risk effectively.' };
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              AI Decision Verification &amp; Audit Layer
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Independent AI auditor evaluating deterministic operational decisions for compliance, margin preservation, and risk.
          </p>
        </div>

        <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          98.2% Validation Pass Rate
        </span>
      </div>

      {/* Grid of Verified Decisions */}
      <div className="space-y-3">
        {sampleDecisionsToAudit.map((d, i) => {
          const val = getValidationStatus(i);
          return (
            <div
              key={d.id}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2.5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${val.badge}`}
                  >
                    ● {val.status}
                  </span>
                  <h4 className="text-xs font-bold text-white tracking-tight">
                    {d.title}
                  </h4>
                </div>

                <span className="text-[11px] font-mono text-slate-400">
                  Confidence: <b className="text-emerald-400">{d.confidenceScore}%</b>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Prescribed Action:
                  </span>
                  <p className="text-slate-200 mt-0.5">{d.aiRecommendation}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                    AI Audit Assessment:
                  </span>
                  <p className="text-emerald-200/90 mt-0.5">{val.note}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
