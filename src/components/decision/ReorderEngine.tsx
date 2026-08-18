'use client';

import React, { useState } from 'react';
import {
  Boxes,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  DollarSign,
  Plus,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { ReorderRecommendation } from '@/services/decisionIntelligenceService';
import { formatCurrency } from '@/lib/utils';

export function ReorderEngine({
  recommendations,
}: {
  recommendations: ReorderRecommendation[];
}) {
  const [createdPOs, setCreatedPOs] = useState<Record<string, boolean>>({});

  const handleCreatePO = (id: string) => {
    setCreatedPOs((prev) => ({ ...prev, [id]: true }));
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30 ring-rose-500/20';
      case 'High':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30 ring-amber-500/20';
      case 'Medium':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30 ring-blue-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Boxes className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Predictive Reorder Recommendation Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Demand velocity forecasting predicting SKU depletion horizons and drafting automated supplier replenishment orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            Recommendations: <b className="text-white">{recommendations.length} SKUs</b>
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">SKU / Product</th>
                <th className="py-3 px-4 text-center">Current Stock</th>
                <th className="py-3 px-4 text-center">Reorder Level</th>
                <th className="py-3 px-4 text-center">Days Remaining</th>
                <th className="py-3 px-4 text-center">Suggested PO Qty</th>
                <th className="py-3 px-4">Primary Supplier</th>
                <th className="py-3 px-4">Priority &amp; Reason</th>
                <th className="py-3 px-4 text-right">Est. Cost</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recommendations.slice(0, 8).map((rec) => {
                const isCreated = createdPOs[rec.id];
                return (
                  <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-blue-400">
                        {rec.sku}
                      </div>
                      <div className="font-semibold text-white truncate max-w-[180px]">
                        {rec.productName}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold">
                      <span className={rec.currentStock === 0 ? 'text-rose-400' : 'text-amber-400'}>
                        {rec.currentStock} units
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                      {rec.reorderLevel}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold ${
                          rec.predictedDaysRemaining <= 1
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : rec.predictedDaysRemaining <= 3
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}
                      >
                        <Calendar className="h-3 w-3" />
                        {rec.predictedDaysRemaining} days
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-400">
                      +{rec.suggestedQuantity} units
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 truncate max-w-[140px]">
                      {rec.supplier}
                    </td>
                    <td className="py-3.5 px-4 max-w-[220px]">
                      <div className="space-y-1">
                        <span
                          className={`inline-block px-2 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider border ${getPriorityBadge(
                            rec.priority
                          )}`}
                        >
                          {rec.priority}
                        </span>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {rec.reason}
                        </p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-200">
                      {formatCurrency(rec.estimatedCost)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {isCreated ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" />
                          PO Sent
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleCreatePO(rec.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors"
                        >
                          Create PO
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
