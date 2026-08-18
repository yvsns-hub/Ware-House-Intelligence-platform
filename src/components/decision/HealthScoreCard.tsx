'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Boxes, ShoppingCart, Truck, Users, CloudSun, ShieldCheck } from 'lucide-react';
import { HealthScoreSummary } from '@/services/decisionIntelligenceService';

export function CircularProgress({
  value,
  size = 72,
  strokeWidth = 6,
  color = '#3b82f6',
  label,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="font-extrabold text-white text-sm font-mono tracking-tight">
            {value}
          </span>
          <span className="text-[9px] text-slate-400 font-bold uppercase -mt-0.5">%</span>
        </div>
      </div>
      {label && (
        <span className="text-xs text-slate-300 font-semibold mt-2 text-center truncate max-w-[90px]">
          {label}
        </span>
      )}
    </div>
  );
}

export function HealthScoreCard({ health }: { health: HealthScoreSummary }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Excellent':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 ring-emerald-500/20';
      case 'Healthy':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30 ring-blue-500/20';
      case 'Warning':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30 ring-amber-500/20';
      default:
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30 ring-rose-500/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981'; // emerald
    if (score >= 75) return '#3b82f6'; // blue
    if (score >= 60) return '#f59e0b'; // amber
    return '#f43f5e'; // rose
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950 p-6 backdrop-blur-sm shadow-xl space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Activity className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Warehouse Operational Health Index
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Composite telemetry scoring across 5 operational pillars and live weather risk.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ring-1 ${getStatusBadge(
              health.status
            )}`}
          >
            ● Status: {health.status}
          </span>
          <span className="text-xs text-slate-500 font-mono">Updated Real-Time</span>
        </div>
      </div>

      {/* Main Overall Score + 5 Pillar Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
        {/* Pillar 1: Overall Composite Score */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 shadow-inner">
          <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider mb-2 flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            Overall
          </span>
          <CircularProgress
            value={health.overall}
            size={80}
            strokeWidth={7}
            color={getScoreColor(health.overall)}
          />
          <span className="text-[11px] font-bold text-slate-200 mt-2">
            Warehouse Health
          </span>
        </div>

        {/* Pillar 2: Inventory Health */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 shadow-inner">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1">
            <Boxes className="h-3.5 w-3.5 text-blue-400" />
            Inventory
          </span>
          <CircularProgress
            value={health.inventory}
            size={70}
            strokeWidth={6}
            color={getScoreColor(health.inventory)}
          />
          <span className="text-[11px] font-medium text-slate-300 mt-2">
            Stock Availability
          </span>
        </div>

        {/* Pillar 3: Fulfillment Health */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 shadow-inner">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1">
            <ShoppingCart className="h-3.5 w-3.5 text-emerald-400" />
            Fulfillment
          </span>
          <CircularProgress
            value={health.fulfillment}
            size={70}
            strokeWidth={6}
            color={getScoreColor(health.fulfillment)}
          />
          <span className="text-[11px] font-medium text-slate-300 mt-2">
            Order SLA Rate
          </span>
        </div>

        {/* Pillar 4: Dispatch Health */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 shadow-inner">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1">
            <Truck className="h-3.5 w-3.5 text-purple-400" />
            Dispatch
          </span>
          <CircularProgress
            value={health.dispatch}
            size={70}
            strokeWidth={6}
            color={getScoreColor(health.dispatch)}
          />
          <span className="text-[11px] font-medium text-slate-300 mt-2">
            Carrier Velocity
          </span>
        </div>

        {/* Pillar 5: Workforce Health */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 shadow-inner">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-cyan-400" />
            Workforce
          </span>
          <CircularProgress
            value={health.workforce}
            size={70}
            strokeWidth={6}
            color={getScoreColor(health.workforce)}
          />
          <span className="text-[11px] font-medium text-slate-300 mt-2">
            Efficiency Balance
          </span>
        </div>

        {/* Pillar 6: Weather Risk */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 shadow-inner">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1">
            <CloudSun className="h-3.5 w-3.5 text-amber-400" />
            Weather Risk
          </span>
          <CircularProgress
            value={health.weatherRisk}
            size={70}
            strokeWidth={6}
            color={getScoreColor(health.weatherRisk)}
          />
          <span className="text-[11px] font-medium text-slate-300 mt-2">
            Corridor Transit
          </span>
        </div>
      </div>
    </div>
  );
}
