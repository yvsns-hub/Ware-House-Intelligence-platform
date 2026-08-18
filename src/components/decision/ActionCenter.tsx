'use client';

import React, { useState } from 'react';
import {
  Zap,
  Boxes,
  Split,
  Clock,
  UserCheck,
  FilePlus,
  Send,
  Truck,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

export function ActionCenter() {
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const actions = [
    {
      id: 'act-reserve',
      title: 'Reserve Inventory',
      desc: 'Lock 50 units of High-Demand SSDs for VIP Platinum queues.',
      icon: Boxes,
      color: 'hover:border-blue-500/50 text-blue-400 bg-blue-500/10',
      toast: '50 units of SKU-ELE-004 reserved for Platinum priority orders.',
    },
    {
      id: 'act-split',
      title: 'Split Shipment',
      desc: 'Auto-split partially allocated orders for immediate dispatch.',
      icon: Split,
      color: 'hover:border-purple-500/50 text-purple-400 bg-purple-500/10',
      toast: 'Split shipment generated: 8 units dispatched today, 2 backordered.',
    },
    {
      id: 'act-delay',
      title: 'Delay Low-Priority Order',
      desc: 'Defer standard ground shipments by 24h to prioritize rush SLA.',
      icon: Clock,
      color: 'hover:border-amber-500/50 text-amber-400 bg-amber-500/10',
      toast: 'Standard orders deferred to evening pick wave.',
    },
    {
      id: 'act-reassign',
      title: 'Reassign Pickers',
      desc: 'Move 2 morning pickers to relieve packing station backlog.',
      icon: UserCheck,
      color: 'hover:border-indigo-500/50 text-indigo-400 bg-indigo-500/10',
      toast: 'Carlos Mendez & Devon Brooks reassigned to Pack Line 3.',
    },
    {
      id: 'act-po',
      title: 'Generate Vendor PO',
      desc: 'Draft emergency replenishment order for Epinephrine injectors.',
      icon: FilePlus,
      color: 'hover:border-emerald-500/50 text-emerald-400 bg-emerald-500/10',
      toast: 'Purchase Order #PO-88192 dispatched to Emergency Health Corp.',
    },
    {
      id: 'act-notify',
      title: 'Notify Customers',
      desc: 'Broadcast proactive weather transit advisory to accounts.',
      icon: Send,
      color: 'hover:border-cyan-500/50 text-cyan-400 bg-cyan-500/10',
      toast: 'Automated delivery notice sent to 14 affected customer accounts.',
    },
    {
      id: 'act-dispatch',
      title: 'Dispatch Early',
      desc: 'Accelerate outbound trailer handoff before storm front.',
      icon: Truck,
      color: 'hover:border-blue-500/50 text-blue-400 bg-blue-500/10',
      toast: 'Express outbound freight dispatched 45 mins ahead of schedule.',
    },
    {
      id: 'act-damage',
      title: 'Quarantine Damaged SKU',
      desc: 'Move damaged inventory to holding bay and claim credit.',
      icon: ShieldAlert,
      color: 'hover:border-rose-500/50 text-rose-400 bg-rose-500/10',
      toast: 'Damaged merchandise moved to Quarantine Bay 9. Vendor claim logged.',
    },
  ];

  const handleActionClick = (toastMsg: string) => {
    setActiveToast(toastMsg);
    setTimeout(() => setActiveToast(null), 4500);
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Operational Action Center
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            One-click operational triggers executing autonomous allocation, rebalancing, and vendor orders.
          </p>
        </div>

        {activeToast && (
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-pulse">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{activeToast}</span>
          </div>
        )}
      </div>

      {/* Grid of Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => handleActionClick(act.toast)}
              className={`text-left p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900/90 transition-all group flex flex-col justify-between space-y-3 ${act.color}`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-white">
                  Execute
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white tracking-tight">
                  {act.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
