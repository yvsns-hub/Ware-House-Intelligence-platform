'use client';

import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimelineStep {
  id: string;
  label: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming' | 'error';
  timestamp?: string;
}

export function OrderTimeline({
  currentStatus,
  createdAt,
  deadline,
}: {
  currentStatus: string;
  createdAt: string | Date;
  deadline?: string | Date;
}) {
  const allStages = [
    { id: 'created', label: 'Order Created', desc: 'Received & validated in system' },
    { id: 'inventory', label: 'Inventory Checked', desc: 'SKU availability confirmed' },
    { id: 'allocated', label: 'Stock Allocated', desc: 'Reserved in warehouse bins' },
    { id: 'picking', label: 'Picking in Progress', desc: 'Picker assigned to aisles' },
    { id: 'packing', label: 'Packing & Staging', desc: 'Consolidated at pack station' },
    { id: 'qc', label: 'Quality Check', desc: 'Weight & barcode verification' },
    { id: 'dispatch', label: 'Dispatched', desc: 'Handed off to outbound carrier' },
    { id: 'delivered', label: 'Delivered', desc: 'Proof of delivery verified' },
  ];

  // Map backend status to stage index
  const statusToStageIndex: Record<string, number> = {
    PENDING: 1, // Inventory checked, waiting allocation
    PROCESSING: 3, // Picking in progress
    PICKED: 4, // Packing & staging
    PACKED: 5, // Quality check
    SHIPPED: 6, // Dispatched
    DELIVERED: 7, // Delivered
    CANCELLED: -1,
  };

  const currentIdx = statusToStageIndex[currentStatus?.toUpperCase()] ?? 2;

  return (
    <div className="w-full py-2">
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        {/* Horizontal Connector Line for desktop */}
        <div className="hidden md:block absolute top-5 left-8 right-8 h-0.5 bg-slate-800 -z-0" />

        {allStages.map((stage, index) => {
          const isCompleted = index < currentIdx;
          const isCurrent = index === currentIdx;
          const isUpcoming = index > currentIdx;
          const isCancelled = currentStatus?.toUpperCase() === 'CANCELLED';

          return (
            <div
              key={stage.id}
              className="relative z-10 flex md:flex-col items-center md:items-center gap-3 md:gap-2 flex-1 group"
            >
              {/* Step Circle */}
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 shadow-md',
                  isCompleted &&
                    'bg-emerald-600 border-emerald-500 text-white shadow-emerald-950/50',
                  isCurrent &&
                    'bg-blue-600 border-blue-400 text-white ring-4 ring-blue-500/20 animate-pulse',
                  isUpcoming &&
                    'bg-slate-900 border-slate-800 text-slate-500',
                  isCancelled &&
                    'bg-rose-950 border-rose-500 text-rose-400'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 stroke-[3]" />
                ) : isCurrent ? (
                  <Clock className="h-4 w-4" />
                ) : isCancelled ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Step Details */}
              <div className="md:text-center space-y-0.5">
                <p
                  className={cn(
                    'text-xs font-bold tracking-tight',
                    isCurrent ? 'text-blue-400' : isCompleted ? 'text-slate-200' : 'text-slate-500'
                  )}
                >
                  {stage.label}
                </p>
                <p className="text-[11px] text-slate-400 hidden sm:block max-w-[110px] md:mx-auto">
                  {stage.desc}
                </p>
                {index === 0 && (
                  <p className="text-[10px] text-slate-500 font-mono">
                    {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
                {isCurrent && (
                  <span className="inline-block mt-0.5 px-1.5 py-0.2 text-[9px] font-bold bg-blue-500/20 text-blue-300 rounded border border-blue-500/30 uppercase">
                    Active
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
