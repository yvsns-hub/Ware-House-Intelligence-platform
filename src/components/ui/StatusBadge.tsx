import React from 'react';
import { cn } from '@/lib/utils';
import {
  OrderStatus,
  OrderPriority,
  CustomerTier,
  EmployeeRole,
  EmployeeShift,
} from '@/types';

// Order Status Badge
export function OrderStatusBadge({ status }: { status: OrderStatus | string }) {
  const styles: Record<string, string> = {
    PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/20 ring-amber-500/10',
    PROCESSING: 'bg-blue-500/10 text-blue-400 border-blue-500/20 ring-blue-500/10',
    PICKED: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 ring-indigo-500/10',
    PACKED: 'bg-purple-500/10 text-purple-400 border-purple-500/20 ring-purple-500/10',
    SHIPPED: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 ring-cyan-500/10',
    DELIVERED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 ring-emerald-500/10',
    CANCELLED: 'bg-rose-500/10 text-rose-400 border-rose-500/20 ring-rose-500/10',
  };

  const currentStyle =
    styles[status?.toUpperCase()] || 'bg-slate-800 text-slate-400 border-slate-700';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ring-1',
        currentStyle
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}

// Order Priority Badge
export function PriorityBadge({ priority }: { priority: OrderPriority | string }) {
  const styles: Record<string, { style: string; icon: string }> = {
    URGENT: { style: 'bg-red-500/15 text-red-400 border-red-500/30 ring-red-500/20 animate-pulse', icon: '🔴' },
    HIGH: { style: 'bg-amber-500/10 text-amber-400 border-amber-500/25 ring-amber-500/10', icon: '🟠' },
    MEDIUM: { style: 'bg-blue-500/10 text-blue-400 border-blue-500/20 ring-blue-500/10', icon: '🟡' },
    LOW: { style: 'bg-slate-800/80 text-slate-400 border-slate-700/80 ring-slate-700/20', icon: '⚪' },
  };

  const current =
    styles[priority?.toUpperCase()] || { style: 'bg-slate-800 text-slate-400 border-slate-700', icon: '•' };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ring-1',
        current.style
      )}
      aria-label={`Priority: ${priority}`}
    >
      <span className="text-[10px]" aria-hidden="true">{current.icon}</span>
      <span>{priority}</span>
    </span>
  );
}


// Customer Tier Badge
export function CustomerTierBadge({ tier }: { tier: CustomerTier | string }) {
  const styles: Record<string, { bg: string; text: string; icon: string }> = {
    Platinum: {
      bg: 'bg-purple-950/50 border-purple-500/30 text-purple-300',
      text: 'Platinum',
      icon: '✦',
    },
    Gold: {
      bg: 'bg-amber-950/40 border-amber-500/30 text-amber-300',
      text: 'Gold',
      icon: '★',
    },
    Silver: {
      bg: 'bg-slate-800/70 border-slate-600/30 text-slate-300',
      text: 'Silver',
      icon: '◈',
    },
    Standard: {
      bg: 'bg-slate-900 border-slate-800 text-slate-400',
      text: 'Standard',
      icon: '•',
    },
  };

  const current = styles[tier] || styles.Standard;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border',
        current.bg
      )}
    >
      <span className="text-[10px]">{current.icon}</span>
      <span>{tier}</span>
    </span>
  );
}

// Stock Level Status Badge
export function StockStatusBadge({
  stock,
  reorderLevel,
  damagedStock = 0,
}: {
  stock: number;
  reorderLevel: number;
  damagedStock?: number;
}) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        Out of Stock
      </span>
    );
  }

  if (stock <= reorderLevel) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Low Stock ({stock})
      </span>
    );
  }

  if (damagedStock > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
        Damaged ({damagedStock})
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      In Stock ({stock})
    </span>
  );
}

// Employee Role Badge
export function EmployeeRoleBadge({ role }: { role: EmployeeRole | string }) {
  const styles: Record<string, string> = {
    Supervisor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    Picker: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Packer: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border',
        styles[role] || 'bg-slate-800 text-slate-300 border-slate-700'
      )}
    >
      {role}
    </span>
  );
}

// Shift Badge
export function ShiftBadge({ shift }: { shift: EmployeeShift | string }) {
  const icons: Record<string, string> = {
    Morning: '☀️',
    Evening: '⛅',
    Night: '🌙',
  };

  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
      <span>{icons[shift] || '⏱️'}</span>
      <span>{shift}</span>
    </span>
  );
}
