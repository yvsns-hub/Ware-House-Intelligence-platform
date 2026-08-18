'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'blue' | 'emerald' | 'purple' | 'amber';
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  badge,
  badgeVariant = 'blue',
  children,
  className,
  action,
}: ChartCardProps) {
  const badgeStyles = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  return (
    <section
      role="region"
      aria-label={`Chart: ${title}${subtitle ? ` - ${subtitle}` : ''}`}
      className={cn(
        'rounded-xl border border-slate-800/90 bg-slate-900/90 p-5 backdrop-blur-sm shadow-xl flex flex-col justify-between',
        className
      )}
    >

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              {title}
            </h3>
            {badge && (
              <span
                className={cn(
                  'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border',
                  badgeStyles[badgeVariant]
                )}
              >
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400">{subtitle}</p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div className="w-full flex-1 min-h-[240px] flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}

