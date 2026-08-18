'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  variant?: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'cyan' | 'slate';
  className?: string;
  badge?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'blue',
  className,
  badge,
}: StatCardProps) {
  const variantStyles = {
    blue: {
      border: 'border-blue-500/20 hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      glow: 'from-blue-500/5 to-transparent',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    },
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'from-emerald-500/5 to-transparent',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    amber: {
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      glow: 'from-amber-500/5 to-transparent',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
    rose: {
      border: 'border-rose-500/20 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      glow: 'from-rose-500/5 to-transparent',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    },
    purple: {
      border: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      glow: 'from-purple-500/5 to-transparent',
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    },
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      glow: 'from-cyan-500/5 to-transparent',
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    },
    slate: {
      border: 'border-slate-800 hover:border-slate-700',
      iconBg: 'bg-slate-800 text-slate-300 border-slate-700',
      glow: 'from-slate-800/20 to-transparent',
      badge: 'bg-slate-800 text-slate-400 border-slate-700',
    },
  };

  const style = variantStyles[variant];

  return (
    <motion.div
      whileHover={{ y: -1.5, transition: { duration: 0.15 } }}
      className={cn(
        'relative overflow-hidden rounded-xl bg-slate-900/90 p-4 border backdrop-blur-sm shadow-md transition-all duration-200 group flex flex-col justify-between',
        style.border,
        className
      )}
    >
      {/* Background Gradient Glow */}
      <div
        className={cn(
          'pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br opacity-40 blur-lg transition-opacity group-hover:opacity-75',
          style.glow
        )}
      />

      <div className="flex items-start justify-between gap-2">
        <div className="space-y-0.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-xl font-extrabold tracking-tight text-white font-mono">
              {value}
            </h3>
            {badge && (
              <span
                className={cn(
                  'text-[9px] font-bold px-1.5 py-0.2 rounded border',
                  style.badge
                )}
              >
                {badge}
              </span>
            )}
          </div>
        </div>

        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border shadow-sm',
            style.iconBg
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-2.5 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[11px]">
          {trend ? (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  'flex items-center gap-0.5 font-bold',
                  trend.isPositive ? 'text-emerald-400' : 'text-rose-400'
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {trend.value}
              </span>
              {trend.label && (
                <span className="text-slate-500 font-normal">{trend.label}</span>
              )}
            </div>
          ) : (
            <span className="text-slate-400 truncate">{subtitle}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
