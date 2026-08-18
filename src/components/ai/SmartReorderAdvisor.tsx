'use client';

import React, { useState } from 'react';
import {
  Boxes,
  Truck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { AIAnalysisOutput } from '@/services/aiCopilotService';

export function SmartReorderAdvisor({
  advice = [],
}: {
  advice?: AIAnalysisOutput['smartReorderAdvice'];
}) {
  const [approvedMap, setApprovedMap] = useState<Record<string, boolean>>({});

  if (!advice || advice.length === 0) return null;

  const handleApprove = (sku: string) => {
    setApprovedMap((prev) => ({ ...prev, [sku]: true }));
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Boxes className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              AI Smart Replenishment Advisor
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Algorithmic supplier replenishment recommendations with automated order drafting.
          </p>
        </div>

        <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          {advice.length} Recommended POs
        </span>
      </div>

      {/* Grid of Advice Items */}
      <div className="space-y-3">
        {advice.map((item) => {
          const isApproved = approvedMap[item.sku];
          return (
            <div
              key={item.sku}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400">
                    {item.sku}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {item.productName}
                  </h4>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    item.supplierPriority === 'Urgent'
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                      : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                  }`}
                >
                  ● {item.supplierPriority} PO
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <p>
                  <b className="text-slate-400">Demand Rationale: </b>
                  {item.reason}
                </p>
                <p className="text-emerald-400 text-[11px]">
                  <b>Business Protection: </b>
                  {item.businessImpact}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-slate-200">
                  Suggested Quantity: <b className="text-emerald-400">+{item.suggestedQty} units</b>
                </span>

                {isApproved ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    PO Dispatched
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleApprove(item.sku)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors"
                  >
                    Approve PO (+{item.suggestedQty})
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
