'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  ArrowUpRight,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  category: string;
  timestamp?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function AlertCard({
  alert,
  onDismiss,
}: {
  alert: AlertItem;
  onDismiss?: (id: string) => void;
}) {
  const config: Record<
    AlertSeverity,
    {
      border: string;
      bg: string;
      text: string;
      badge: string;
      icon: LucideIcon;
      iconColor: string;
    }
  > = {
    critical: {
      border: 'border-rose-500/30 hover:border-rose-500/50',
      bg: 'bg-rose-950/20',
      text: 'text-rose-200',
      badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      icon: AlertCircle,
      iconColor: 'text-rose-400',
    },
    warning: {
      border: 'border-amber-500/30 hover:border-amber-500/50',
      bg: 'bg-amber-950/20',
      text: 'text-amber-200',
      badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
    },
    info: {
      border: 'border-blue-500/30 hover:border-blue-500/50',
      bg: 'bg-blue-950/20',
      text: 'text-blue-200',
      badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      icon: Info,
      iconColor: 'text-blue-400',
    },
  };

  const style = config[alert.severity] || config.info;
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.005 }}
      className={cn(
        'relative rounded-xl border p-4 shadow-md transition-all duration-200 backdrop-blur-sm',
        style.bg,
        style.border
      )}
    >
      <div className="flex items-start gap-3.5">
        <div
          className={cn(
            'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-slate-950/60 shadow-inner',
            style.iconColor,
            style.border
          )}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold text-white tracking-tight">
                {alert.title}
              </h4>
              <span
                className={cn(
                  'text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border',
                  style.badge
                )}
              >
                {alert.category}
              </span>
            </div>

            {alert.timestamp && (
              <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0">
                <Clock className="h-3 w-3" />
                {alert.timestamp}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {alert.description}
          </p>

          {alert.actionLabel && (
            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={alert.onAction}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 transition-colors"
              >
                <span>{alert.actionLabel}</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
