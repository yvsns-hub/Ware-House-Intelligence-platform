'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Boxes,
  ShoppingCart,
  Truck,
  Users,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Download,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

import { useDashboardSummary, useProducts, useOrders, useEmployees } from '@/hooks';
import { StatCard } from '@/components/ui/StatCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { formatCurrency } from '@/lib/utils';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  const { data: dashboard } = useDashboardSummary();
  const { data: productsData } = useProducts({ limit: 100 });
  const { data: ordersData } = useOrders({ limit: 50 });
  const { data: employeesData } = useEmployees();

  // Multi-tier chart data based on time range
  const hourlyThroughputData = [
    { time: '06:00', orders: 12, pickTime: 5.8, sla: 99 },
    { time: '08:00', orders: 28, pickTime: 6.4, sla: 98 },
    { time: '10:00', orders: 42, pickTime: 6.9, sla: 96 },
    { time: '12:00', orders: 55, pickTime: 6.2, sla: 97 },
    { time: '14:00', orders: 48, pickTime: 5.9, sla: 98 },
    { time: '16:00', orders: 60, pickTime: 6.5, sla: 95 },
    { time: '18:00', orders: 34, pickTime: 5.4, sla: 99 },
  ];

  const categoryTurnoverData = [
    { category: 'Electronics', velocity: 9.4, units: 1420, revenue: 184500 },
    { category: 'Apparel', velocity: 7.2, units: 980, revenue: 58800 },
    { category: 'Groceries', velocity: 12.8, units: 2150, revenue: 47300 },
    { category: 'Hardware', velocity: 5.6, units: 640, revenue: 64000 },
    { category: 'Medical', velocity: 8.9, units: 1100, revenue: 132000 },
    { category: 'Home', velocity: 6.1, units: 820, revenue: 49200 },
  ];

  const carrierChannelData = [
    { name: 'SameDay Express Couriers', value: 42, color: '#3b82f6' },
    { name: 'Overnight Air Cargo', value: 28, color: '#8b5cf6' },
    { name: 'Regional Freight Carrier', value: 20, color: '#10b981' },
    { name: 'Standard Ground Transit', value: 10, color: '#f59e0b' },
  ];

  const zoneDensityData = [
    { zone: 'Zone A (Fast Moving)', bins: 8, occupied: 7, utilization: 88, risk: 'High Turnover' },
    { zone: 'Zone B (High Value Cage)', bins: 8, occupied: 6, utilization: 75, risk: 'Secure Access' },
    { zone: 'Zone C (Cold Chain Storage)', bins: 8, occupied: 7, utilization: 84, risk: 'Capacity Warning' },
    { zone: 'Zone D (Bulk Pallet Cargo)', bins: 8, occupied: 5, utilization: 62, risk: 'Optimal Staging' },
    { zone: 'Zone E (Standard Storage)', bins: 8, occupied: 6, utilization: 70, risk: 'Stable' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Hero Operations Analytics Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/30 shadow-2xl backdrop-blur-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <BarChart3 className="h-3.5 w-3.5 text-blue-400" />
            <span>Supply Chain Operations &amp; Velocity Intelligence</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            WarehouseIQ Operations Analytics
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Realtime operational telemetry tracking fulfillment latency, category velocity, carrier distribution, and zone storage density.
          </p>
        </div>

        {/* Time Range Filter Buttons */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          {[
            { id: 'today', label: 'Today (Shift 1)' },
            { id: 'week', label: 'This Week' },
            { id: 'month', label: 'This Month' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTimeRange(t.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                timeRange === t.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Key Performance Metrics Grid (11 KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Inventory Turnover Rate"
          value="8.4x"
          subtitle="Annualized velocity"
          icon={Boxes}
          trend={{ value: '+12.4%', isPositive: true }}
          variant="blue"
        />
        <StatCard
          title="Fulfillment SLA Rate"
          value="96.8%"
          subtitle="On-time delivery commitment"
          icon={ShoppingCart}
          trend={{ value: '+1.8%', isPositive: true }}
          variant="emerald"
        />
        <StatCard
          title="Average Pick Latency"
          value="6.2 mins"
          subtitle="Target: < 8.0 mins"
          icon={Clock}
          trend={{ value: '-8.5%', isPositive: true }}
          variant="cyan"
        />
        <StatCard
          title="Average Packing Latency"
          value="4.5 mins"
          subtitle="Conveyor station average"
          icon={Zap}
          trend={{ value: '-3.2%', isPositive: true }}
          variant="purple"
        />

        <StatCard
          title="Average Dispatch Time"
          value="14.8 mins"
          subtitle="Dock handoff latency"
          icon={Truck}
          trend={{ value: '-4.1%', isPositive: true }}
          variant="blue"
        />
        <StatCard
          title="Warehouse Utilization"
          value="78.4%"
          subtitle="40 active rack bays"
          icon={Layers}
          variant="amber"
        />
        <StatCard
          title="Workforce Productivity"
          value="91.6%"
          subtitle="20 staff across 3 shifts"
          icon={Users}
          trend={{ value: '+2.4%', isPositive: true }}
          variant="emerald"
        />
        <StatCard
          title="Revenue Fulfilled"
          value="$52,400"
          subtitle="Today's total dispatches"
          icon={TrendingUp}
          trend={{ value: '+15.6%', isPositive: true }}
          variant="emerald"
        />
      </div>

      {/* 3. Recharts Section: Line Chart + Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Throughput & SLA Line Chart */}
        <ChartCard
          title="Hourly Fulfillment Throughput & SLA Compliance"
          subtitle="Order velocity vs On-time SLA rate throughout today's shift"
        >
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyThroughputData}>
                <defs>
                  <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="orders"
                  name="Orders Processed"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#orderGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="sla"
                  name="SLA Compliance %"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Category Velocity & Turnover Bar Chart */}
        <ChartCard
          title="Category Velocity & Revenue Contribution"
          subtitle="Turnover velocity multiplier by primary product category"
        >
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryTurnoverData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="category" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                <Bar
                  dataKey="velocity"
                  name="Turnover Velocity (x)"
                  fill="#8b5cf6"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="units"
                  name="Units Dispatched"
                  fill="#06b6d4"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* 4. Shipping Channels Pie Chart + Zone Storage Heatmap Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping Channels Pie */}
        <ChartCard
          title="Outbound Courier Logistics Breakdown"
          subtitle="Volume distribution by carrier shipping channel"
        >
          <div className="h-72 w-full flex items-center justify-center pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={carrierChannelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {carrierChannelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Zone Storage Density Matrix */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="space-y-0.5">
              <h3 className="text-base font-extrabold text-white">
                Warehouse Spatial Utilization &amp; Heat Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Volumetric capacity saturation across all 5 active warehouse aisles
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              40 Total Bays
            </span>
          </div>

          <div className="space-y-3">
            {zoneDensityData.map((z, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{z.zone}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ({z.occupied}/{z.bins} bays occupied)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.2 rounded border ${
                        z.utilization >= 80
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                      }`}
                    >
                      {z.risk}
                    </span>
                    <span className="font-mono font-extrabold text-white">
                      {z.utilization}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      z.utilization >= 80
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                        : 'bg-gradient-to-r from-blue-500 to-emerald-500'
                    }`}
                    style={{ width: `${z.utilization}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
