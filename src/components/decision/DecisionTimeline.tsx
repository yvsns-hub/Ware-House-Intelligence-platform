'use client';

import React from 'react';
import {
  Clock,
  Sparkles,
  Boxes,
  ShoppingCart,
  CloudSun,
  Users,
  Truck,
  ShieldCheck,
  Split,
} from 'lucide-react';

export function DecisionTimeline() {
  const events = [
    {
      id: 'evt-1',
      time: '12:14 PM',
      category: 'Workforce',
      title: 'Dynamic Shift Balancing Executed',
      desc: 'Carlos Mendez & Devon Brooks reassigned from Aisle A to Pack Station 3.',
      icon: Users,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    },
    {
      id: 'evt-2',
      time: '11:45 AM',
      category: 'Fulfillment',
      title: 'VIP Order Contention Solved',
      desc: 'Order #ORD-2026001 allocated 8 available units; 2 backordered with expedited PO.',
      icon: Split,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    {
      id: 'evt-3',
      time: '11:10 AM',
      category: 'Telemetry',
      title: 'Adverse Weather Dispatch Window Advanced',
      desc: 'SameDay regional freight pickup advanced 45 minutes ahead of storm system.',
      icon: CloudSun,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      id: 'evt-4',
      time: '10:30 AM',
      category: 'Inventory',
      title: 'Emergency PO Drafted for Epinephrine Auto-Injectors',
      desc: 'Automated electronic PO #PO-88192 sent to Emergency Health Corp.',
      icon: Boxes,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    },
    {
      id: 'evt-5',
      time: '09:15 AM',
      category: 'Quality',
      title: 'Quarantine Bay Transfer for Damaged Goods',
      desc: '4 damaged seafood units quarantined; $280 vendor return credit logged.',
      icon: ShieldCheck,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'evt-6',
      time: '08:00 AM',
      category: 'System',
      title: 'Morning Shift Decision Intelligence Cycle Initialized',
      desc: 'Processed 50 active orders, 100 SKUs, and 20 staff allocations with 99.8% health.',
      icon: Sparkles,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
  ];

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Clock className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Decision Intelligence Event Stream
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Chronological audit log of autonomous decision executions throughout today's shift.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-mono">Today's Log</span>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {events.map((evt) => {
          const Icon = evt.icon;
          return (
            <div key={evt.id} className="relative group flex items-start gap-4">
              {/* Dot Icon */}
              <div
                className={`absolute -left-6 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border bg-slate-950 shadow-sm ${evt.color}`}
              >
                <Icon className="h-2.5 w-2.5" />
              </div>

              {/* Content */}
              <div className="flex-1 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white tracking-tight">
                      {evt.title}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">
                      {evt.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 shrink-0">
                    {evt.time}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  {evt.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
