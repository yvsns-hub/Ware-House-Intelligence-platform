'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Clock,
  CheckCircle2,
  DollarSign,
  Zap,
  AlertTriangle,
  PackageX,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  CloudSun,
  Users,
  Layers,
  MapPin,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from 'recharts';

import {
  useDashboardSummary,
  useOrders,
  useWeather,
  useEmployees,
  useLocations,
} from '@/hooks';
import { StatCard } from '@/components/ui/StatCard';
import { AlertCard, AlertItem } from '@/components/ui/AlertCard';
import { ChartCard } from '@/components/ui/ChartCard';
import {
  OrderStatusBadge,
  PriorityBadge,
  CustomerTierBadge,
} from '@/components/ui/StatusBadge';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { CardSkeleton, TableSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';
import { RealtimeEventTicker } from '@/components/events/RealtimeEventTicker';


import { useAuth } from '@/context/AuthContext';
import { PickerConsole } from '@/components/picker/PickerConsole';
import { MultiWarehouseCommand } from '@/components/head/MultiWarehouseCommand';

export default function DashboardPage() {
  const router = useRouter();
  const { role, user, activeFacility } = useAuth();
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // React Query Hooks
  const { data: dashboard, isLoading: isDashboardLoading } = useDashboardSummary();
  const { data: weatherData } = useWeather();
  const { data: employeesData } = useEmployees();
  const { data: ordersData, isLoading: isOrdersLoading } = useOrders({
    search: orderSearch || undefined,
    status: orderStatusFilter !== 'all' ? orderStatusFilter : undefined,
    page: currentPage,
    limit: pageSize,
  });

  // If Picker role is active, show the dedicated Picker Operator Console
  if (role === 'PICKER') {
    return <PickerConsole />;
  }

  // If VP / Head of Supply Chain role is active, show Multi-Warehouse Network Command
  if (role === 'HEAD') {
    return <MultiWarehouseCommand />;
  }

  // Dynamic Warehouse Alerts based on backend state
  const alerts: AlertItem[] = [
    {
      id: 'alt-1',
      title: 'Critical Stock Shortage Detected',
      description: `${dashboard?.inventory.lowStockCount ?? 5} high-demand SKUs are below critical safety stock thresholds.`,
      severity: 'critical',
      category: 'Inventory',
      timestamp: '10m ago',
      actionLabel: 'View Low Stock',
      onAction: () => router.push('/inventory?status=low_stock'),
    },
    {
      id: 'alt-2',
      title: '5 VIP Platinum Orders in Staging Queue',
      description: 'Expedited SameDay orders for Apex Logistics & BioPharma Corp have deadlines within 3 hours.',
      severity: 'warning',
      category: 'Fulfillment',
      timestamp: '25m ago',
      actionLabel: 'Inspect Orders',
      onAction: () => router.push('/orders?priority=URGENT'),
    },
    {
      id: 'alt-3',
      title: `${dashboard?.inventory.damagedStockCount ?? 4} Items Quarantined in Damaged Bay`,
      description: 'Physical inspection and supplier credit claims required before shift turnover.',
      severity: 'warning',
      category: 'QA / Audit',
      timestamp: '1h ago',
      actionLabel: 'Review Damaged',
      onAction: () => router.push('/inventory?status=damaged'),
    },
    {
      id: 'alt-4',
      title: weatherData?.weather?.isAdverse
        ? 'Adverse Weather Impacting Inbound Shipments'
        : 'Logistics Route Optimization Nominal',
      description: weatherData?.impactAnalysis?.recommendation || 'Weather conditions are optimal for cross-dock delivery.',
      severity: weatherData?.weather?.isAdverse ? 'critical' : 'info',
      category: 'Telemetry',
      timestamp: 'Just now',
    },
  ];

  // Prepare Recharts Category Data
  const categoryChartData = dashboard?.inventory?.categoryDistribution
    ? Object.entries(dashboard.inventory.categoryDistribution).map(([name, count]) => ({
        name,
        count,
      }))
    : [
        { name: 'Electronics', count: 20 },
        { name: 'Groceries', count: 16 },
        { name: 'Medicine', count: 16 },
        { name: 'Fashion', count: 16 },
        { name: 'Furniture', count: 16 },
        { name: 'Automotive', count: 16 },
      ];

  // Prepare Recharts Order Status Data
  const orderStatusColors: Record<string, string> = {
    DELIVERED: '#10b981', // emerald
    SHIPPED: '#06b6d4', // cyan
    PACKED: '#a855f7', // purple
    PICKED: '#6366f1', // indigo
    PROCESSING: '#3b82f6', // blue
    PENDING: '#f59e0b', // amber
  };

  const orderStatusPieData = [
    { name: 'Pending', value: dashboard?.orders.pendingOrders ?? 8, color: '#f59e0b' },
    { name: 'Processing', value: dashboard?.orders.processingOrders ?? 12, color: '#3b82f6' },
    { name: 'Picked', value: 8, color: '#6366f1' },
    { name: 'Packed', value: 8, color: '#a855f7' },
    { name: 'Shipped', value: 10, color: '#06b6d4' },
    { name: 'Delivered', value: 4, color: '#10b981' },
  ];

  // Prepare Zone Utilization Data
  const zoneChartData = dashboard?.locations?.zoneUtilization
    ? Object.entries(dashboard.locations.zoneUtilization).map(([zone, count]) => ({
        zone,
        capacity: count * 25, // percentage scaling
      }))
    : [
        { zone: 'Fast Moving', capacity: 88 },
        { zone: 'High Value', capacity: 75 },
        { zone: 'Cold Storage', capacity: 84 },
        { zone: 'Bulk Cargo', capacity: 62 },
        { zone: 'Standard', capacity: 70 },
      ];

  // Stock Movement Trend Mock Data
  const throughputTrendData = [
    { time: '06:00', inbound: 120, outbound: 45 },
    { time: '08:00', inbound: 240, outbound: 180 },
    { time: '10:00', inbound: 310, outbound: 350 },
    { time: '12:00', inbound: 190, outbound: 420 },
    { time: '14:00', inbound: 280, outbound: 390 },
    { time: '16:00', inbound: 340, outbound: 480 },
    { time: '18:00', inbound: 150, outbound: 260 },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Header Hero Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-slate-900 border border-blue-900/30 shadow-2xl backdrop-blur-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
              {activeFacility.name}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              • Manager: <b className="text-white">{user.name}</b> ({activeFacility.region})
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {activeFacility.name} Decision Intelligence
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Live telemetry stream monitoring inventory velocity ({activeFacility.totalStockUnits.toLocaleString()} units), high-priority orders ({activeFacility.activeOrders} active), and health index ({activeFacility.healthScore}%).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <Link
            href="/decision-center"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Launch Decision Center</span>
          </Link>
          <Link
            href="/decision-center/simulator"
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02]"
          >
            <Zap className="h-4 w-4" />
            <span>What-If Simulator</span>
          </Link>
          <Link
            href="/approvals"
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-bold rounded-xl border border-indigo-500/30 transition-all hover:scale-[1.02]"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Approvals</span>
          </Link>
        </div>
      </div>

      {/* Live Real-Time Event Intelligence Ticker */}
      <RealtimeEventTicker />


      {/* 2. KPI Cards Grid (8 Cards) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-400" />
            Operational Key Performance Indicators
          </h2>
          <span className="text-xs text-slate-500 font-mono">Updated Real-Time</span>
        </div>

        {isDashboardLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Orders"
              value={dashboard?.orders.totalOrders ?? 50}
              subtitle="All lifetime processed orders"
              icon={ShoppingCart}
              variant="blue"
              trend={{ value: '+12.4%', isPositive: true, label: 'vs yesterday' }}
            />
            <StatCard
              title="Pending Orders"
              value={dashboard?.orders.pendingOrders ?? 8}
              subtitle="Awaiting allocation & pick"
              icon={Clock}
              variant="amber"
              trend={{ value: '-5.1%', isPositive: true, label: 'queue velocity' }}
            />
            <StatCard
              title="Completed / Dispatched"
              value={dashboard?.orders.totalOrders ? dashboard.orders.totalOrders - (dashboard.orders.pendingOrders + dashboard.orders.processingOrders) : 30}
              subtitle="Fulfillment rate 94.8%"
              icon={CheckCircle2}
              variant="emerald"
              trend={{ value: '+8.2%', isPositive: true, label: 'on-time rate' }}
            />
            <StatCard
              title="Today's Dispatch Value"
              value={formatCurrency(dashboard?.orders.todayOrderValue ?? 52400)}
              subtitle="Total merchandise cleared"
              icon={DollarSign}
              variant="purple"
              trend={{ value: '+14.6%', isPositive: true, label: 'daily revenue' }}
            />
            <StatCard
              title="Warehouse Efficiency"
              value={`${dashboard?.workforce.averageEfficiency ?? 91.6}%`}
              subtitle="Staff picking throughput index"
              icon={Zap}
              variant="cyan"
              trend={{ value: '+2.1%', isPositive: true, label: 'shift avg' }}
            />
            <StatCard
              title="Low Stock Items"
              value={dashboard?.inventory.lowStockCount ?? 6}
              subtitle="Under reorder threshold"
              icon={AlertTriangle}
              variant="amber"
              badge="Action Required"
            />
            <StatCard
              title="Out of Stock"
              value={dashboard?.inventory.outOfStockCount ?? 5}
              subtitle="0 inventory remaining"
              icon={PackageX}
              variant="rose"
              badge="Critical"
            />
            <StatCard
              title="Damaged Inventory"
              value={dashboard?.inventory.damagedStockCount ?? 4}
              subtitle="Quarantine hold bay"
              icon={ShieldAlert}
              variant="rose"
              badge="Audit"
            />
          </div>
        )}
      </section>

      {/* 2.5 Business Impact & ROI Metric Panel */}
      <section className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-900/90 to-slate-950 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Autonomous Decision Business Impact &amp; ROI
              </h2>
              <p className="text-xs text-slate-400">
                Quantified operational value generated by WarehouseIQ intelligence rules
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            $48,000 Revenue Protected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              VIP Orders Protected
            </span>
            <span className="text-lg font-extrabold text-white font-mono">14 Orders</span>
            <span className="text-[10px] text-emerald-400 block font-semibold">100% SLA Retained</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Transit Delay Cut
            </span>
            <span className="text-lg font-extrabold text-cyan-400 font-mono">-34% Delay</span>
            <span className="text-[10px] text-slate-400 block">Early Dispatch Window</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Revenue Protected
            </span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">$48,000</span>
            <span className="text-[10px] text-emerald-400 block font-semibold">Zero Churn Default</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Efficiency Gain
            </span>
            <span className="text-lg font-extrabold text-purple-400 font-mono">+18.5%</span>
            <span className="text-[10px] text-slate-400 block">Workforce Rebalanced</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Monthly Savings
            </span>
            <span className="text-lg font-extrabold text-blue-400 font-mono">$12,400</span>
            <span className="text-[10px] text-slate-400 block">Reduced Overtime</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Customer CSAT
            </span>
            <span className="text-lg font-extrabold text-amber-400 font-mono">96.8%</span>
            <span className="text-[10px] text-emerald-400 block font-semibold">+4.2% vs Baseline</span>
          </div>
        </div>
      </section>

      {/* 3. Warehouse Alerts Feed */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            Live Warehouse Operational Alerts
          </h2>
          <span className="text-xs text-amber-400/90 font-medium">4 Active Alerts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </section>

      {/* 4. Interactive Charts Section (Recharts) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Layers className="h-4 w-4 text-purple-400" />
            Operational Analytics &amp; Inventory Distribution
          </h2>
          <span className="text-xs text-slate-500">Live Metric Visualization</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Stock Categories Distribution */}
          <ChartCard
            title="Products by Category"
            subtitle="SKU allocation across 6 distinct merchandise lines"
            badge="100 SKUs Total"
            badgeVariant="blue"
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} name="SKU Count" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Chart 2: Order Status Distribution */}
          <ChartCard
            title="Order Status Breakdown"
            subtitle="Fulfillment pipeline queue distribution"
            badge="50 Active Orders"
            badgeVariant="emerald"
          >
            <div className="flex flex-col sm:flex-row items-center justify-around w-full gap-4">
              <ResponsiveContainer width={180} height={200}>
                <PieChart>
                  <Pie
                    data={orderStatusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {orderStatusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                {orderStatusPieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-400">{item.name}:</span>
                    <span className="font-bold text-slate-200">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          {/* Chart 3: Stock Movement Hourly Throughput */}
          <ChartCard
            title="Hourly Stock Movements"
            subtitle="Inbound receiving vs outbound picking throughput"
            badge="Shift Telemetry"
            badgeVariant="purple"
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={throughputTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area
                  type="monotone"
                  dataKey="inbound"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorInbound)"
                  name="Inbound Received"
                />
                <Area
                  type="monotone"
                  dataKey="outbound"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOutbound)"
                  name="Outbound Dispatched"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Chart 4: Warehouse Zone Space Utilization */}
          <ChartCard
            title="Warehouse Zone Space Utilization"
            subtitle="Storage capacity utilization per spatial zone"
            badge="40 Locations"
            badgeVariant="amber"
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                layout="vertical"
                data={zoneChartData}
                margin={{ top: 10, right: 20, left: 30, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={11} unit="%" />
                <YAxis dataKey="zone" type="category" stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`${val}% Occupancy`, 'Utilization']}
                />
                <Bar dataKey="capacity" fill="#8b5cf6" radius={[0, 6, 6, 0]} name="Capacity %" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      {/* 5. Weather & Workforce Summary Dual Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Telemetry Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-sm shadow-xl space-y-4 lg:col-span-1 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CloudSun className="h-4 w-4 text-cyan-400" />
                Transit Weather Telemetry
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                  weatherData?.impactAnalysis?.inboundRisk === 'HIGH'
                    ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                    : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                }`}
              >
                {weatherData?.impactAnalysis?.inboundRisk ?? 'LOW'} Risk
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">Hub Meteorology</h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-white">
                {weatherData?.weather.temperature ?? 19.4}°C
              </span>
              <span className="text-xs font-semibold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                {weatherData?.weather.condition ?? 'Partly Cloudy'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
              <div>
                <span className="text-slate-500">Wind Velocity:</span>
                <p className="font-semibold text-slate-200">
                  {weatherData?.weather.windSpeed ?? 11.2} km/h
                </p>
              </div>
              <div>
                <span className="text-slate-500">Relative Humidity:</span>
                <p className="font-semibold text-slate-200">
                  {weatherData?.weather.humidity ?? 48}%
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-950/30 rounded-xl border border-blue-900/40 text-xs text-blue-200 leading-relaxed">
            <span className="font-bold text-blue-300 block mb-1">Operational Advisory:</span>
            {weatherData?.impactAnalysis?.recommendation ??
              'Normal highway transit times in effect across regional logistics corridor.'}
          </div>
        </div>

        {/* Workforce & Shift Summary Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-sm shadow-xl space-y-4 lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Users className="h-4 w-4 text-indigo-400" />
                Workforce Deployment
              </span>
              <h3 className="text-lg font-bold text-white">
                Active Shifts &amp; Staff Efficiency
              </h3>
            </div>
            <Link
              href="/employees"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Manage Staff</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="text-xs text-slate-400">Total Workforce</span>
              <div className="text-2xl font-bold text-white mt-1">
                {dashboard?.workforce.totalEmployees ?? 20}
              </div>
              <span className="text-[11px] text-slate-500">Across 3 shifts</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="text-xs text-slate-400">Active Pickers</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">
                {dashboard?.workforce.activePickers ?? 10}
              </div>
              <span className="text-[11px] text-emerald-400/80">In aisle picking</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="text-xs text-slate-400">Active Packers</span>
              <div className="text-2xl font-bold text-cyan-400 mt-1">
                {dashboard?.workforce.activePackers ?? 7}
              </div>
              <span className="text-[11px] text-cyan-400/80">Packing lines 1-4</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="text-xs text-slate-400">Avg Efficiency</span>
              <div className="text-2xl font-bold text-purple-400 mt-1">
                {dashboard?.workforce.averageEfficiency ?? 91.6}%
              </div>
              <span className="text-[11px] text-purple-400/80">+2.4% above SLA</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">Current Shift:</span>
              <span className="font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                ☀️ Morning Shift (06:00 - 14:00)
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span>Pickers on floor: <b className="text-slate-200">10</b></span>
              <span>•</span>
              <span>Packers active: <b className="text-slate-200">7</b></span>
              <span>•</span>
              <span>Supervisors: <b className="text-slate-200">3</b></span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Recent Orders Table */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-blue-400" />
              Recent Orders Queue
            </h2>
            <p className="text-xs text-slate-400">
              Realtime fulfillment queue with priority allocations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-48 sm:w-64">
              <SearchBar
                value={orderSearch}
                onChange={(val) => {
                  setOrderSearch(val);
                  setCurrentPage(1);
                }}
                placeholder="Search orders..."
                hotkey=""
              />
            </div>

            <select
              value={orderStatusFilter}
              onChange={(e) => {
                setOrderStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              suppressHydrationWarning
              className="h-10 px-3 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg outline-none focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="PICKED">Picked</option>
              <option value="PACKED">Packed</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl overflow-hidden">
          {isOrdersLoading ? (
            <TableSkeleton rows={pageSize} cols={7} />
          ) : ordersData && ordersData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Order #</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Tier</th>
                    <th className="py-3.5 px-4">Priority</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Deadline</th>
                    <th className="py-3.5 px-4">Shipping</th>
                    <th className="py-3.5 px-4 text-right">Value</th>
                    <th className="py-3.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {ordersData.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => router.push(`/orders/${order.id}`)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-blue-400 group-hover:text-blue-300">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-4 font-medium text-white truncate max-w-[160px]">
                        {order.customerName}
                      </td>
                      <td className="py-3 px-4">
                        <CustomerTierBadge tier={order.customerTier} />
                      </td>
                      <td className="py-3 px-4">
                        <PriorityBadge priority={order.priority} />
                      </td>
                      <td className="py-3 px-4">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {formatDate(order.deliveryDeadline)}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
                          {order.shippingType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-400 font-mono">
                        {formatCurrency(order.orderValue)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center text-slate-500 group-hover:text-blue-400 transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="No orders found"
              description="No active orders match your search or filter selection."
              actionLabel="Clear Filters"
              onAction={() => {
                setOrderSearch('');
                setOrderStatusFilter('all');
              }}
            />
          )}

          {ordersData && ordersData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil((dashboard?.orders.totalOrders ?? 50) / pageSize)}
              totalItems={dashboard?.orders.totalOrders ?? 50}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>
    </div>
  );
}
