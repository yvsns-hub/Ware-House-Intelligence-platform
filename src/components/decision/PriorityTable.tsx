'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  ArrowUpDown,
  Search,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Zap,
  Info,
  Clock,
} from 'lucide-react';
import { PrioritizedOrder } from '@/services/decisionIntelligenceService';
import { CustomerTierBadge, PriorityBadge } from '@/components/ui/StatusBadge';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { formatCurrency, formatDate } from '@/lib/utils';

export function PriorityTable({ orders }: { orders: PrioritizedOrder[] }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'rank' | 'value' | 'deadline'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const filtered = orders.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      item.order.orderNumber.toLowerCase().includes(q) ||
      item.order.customerName.toLowerCase().includes(q) ||
      item.reason.toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    let diff = 0;
    if (sortBy === 'score') diff = b.priorityScore - a.priorityScore;
    else if (sortBy === 'rank') diff = a.rank - b.rank;
    else if (sortBy === 'value') diff = b.order.orderValue - a.order.orderValue;
    else if (sortBy === 'deadline')
      diff =
        new Date(a.order.deliveryDeadline).getTime() -
        new Date(b.order.deliveryDeadline).getTime();

    return sortOrder === 'asc' ? -diff : diff;
  });

  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (field: 'score' | 'rank' | 'value' | 'deadline') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl space-y-6">
      {/* Header & Formula Explanation Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Flame className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Dynamic Order Priority Engine (Non-FIFO)
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Multi-variable dynamic ranking prioritizing high-LTV customer accounts, tight SLAs, and weather transit windows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-56 sm:w-64">
            <SearchBar
              value={search}
              onChange={(val) => {
                setSearch(val);
                setCurrentPage(1);
              }}
              placeholder="Search priority queue..."
              hotkey=""
            />
          </div>
        </div>
      </div>

      {/* Formula Pills Banner */}
      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <span className="font-bold text-slate-200 flex items-center gap-1 mr-1">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          Scoring Formula:
        </span>
        <span className="bg-purple-950/40 text-purple-300 border border-purple-800/40 px-2 py-0.5 rounded font-mono">
          VIP Tier: +40
        </span>
        <span className="bg-blue-950/40 text-blue-300 border border-blue-800/40 px-2 py-0.5 rounded font-mono">
          Express Shipping: +25
        </span>
        <span className="bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded font-mono">
          Order &gt;$500: +20
        </span>
        <span className="bg-rose-950/40 text-rose-300 border border-rose-800/40 px-2 py-0.5 rounded font-mono">
          Deadline &lt;24h: +20
        </span>
        <span className="bg-amber-950/40 text-amber-300 border border-amber-800/40 px-2 py-0.5 rounded font-mono">
          Weather Risk: +15
        </span>
        <span className="bg-cyan-950/40 text-cyan-300 border border-cyan-800/40 px-2 py-0.5 rounded font-mono">
          In-Stock: +10
        </span>
      </div>

      {/* Main Priority Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                  onClick={() => toggleSort('rank')}
                >
                  <div className="flex items-center gap-1">
                    <span>Rank</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer Account</th>
                <th
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                  onClick={() => toggleSort('score')}
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    <span>Priority Score</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Algorithmic Rationale</th>
                <th className="py-3 px-4">Recommended Action</th>
                <th
                  className="py-3 px-4 text-right cursor-pointer hover:text-white transition-colors"
                  onClick={() => toggleSort('value')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Value</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginated.map((item) => (
                <tr key={item.order.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-extrabold">
                    <span
                      className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                        item.rank <= 3
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 ring-2 ring-rose-500/10'
                          : item.rank <= 10
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      #{item.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Link
                      href={`/orders/${item.order.id}`}
                      className="font-mono font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {item.order.orderNumber}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white truncate max-w-[150px]">
                      {item.order.customerName}
                    </div>
                    <CustomerTierBadge tier={item.order.customerTier} />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold font-mono text-amber-400">
                          {item.priorityScore} pts
                        </span>
                      </div>
                      {/* Breakdown Progress Meter */}
                      <div className="w-24 bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                          style={{ width: `${Math.min(100, (item.priorityScore / 145) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 leading-snug max-w-[220px]">
                    <span className="text-[11px] text-slate-300">{item.reason}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block text-[11px] font-semibold text-blue-300 bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/60 max-w-[200px]">
                      {item.recommendedAction}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                    {formatCurrency(item.order.orderValue)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Link
                      href={`/orders/${item.order.id}`}
                      className="p-1 text-slate-400 hover:text-blue-400 transition-colors inline-block"
                      title="Open Order Details"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sorted.length / pageSize)}
          totalItems={sorted.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
