'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit,
  Sparkles,
  Zap,
  Activity,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Boxes,
  Users,
  CloudSun,
  Truck,
  ArrowRight,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Clock,
  Layers,
  Bot,
  ExternalLink,
} from 'lucide-react';

import {
  useDashboardSummary,
  useProducts,
  useOrders,
  useEmployees,
  useWeather,
} from '@/hooks';
import {
  decisionIntelligenceService,
  OperationalDecision,
} from '@/services/decisionIntelligenceService';

import { StatCard } from '@/components/ui/StatCard';
import { StockResolutionCard } from '@/components/decision/StockResolutionCard';
import { AllocationSimulator } from '@/components/decision/AllocationSimulator';
import { ReorderEngine } from '@/components/decision/ReorderEngine';
import { BottleneckDetector } from '@/components/decision/BottleneckDetector';
import { WorkforceOptimizer } from '@/components/decision/WorkforceOptimizer';
import { ExceptionCenter } from '@/components/decision/ExceptionCenter';
import { DecisionTimeline } from '@/components/decision/DecisionTimeline';
import { CardSkeleton } from '@/components/ui/LoadingSkeleton';
import { formatCurrency } from '@/lib/utils';

export default function DecisionCenterPage() {
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);
  const [activeAdvancedTab, setActiveAdvancedTab] = useState<
    'allocation' | 'reorder' | 'bottlenecks' | 'workforce' | 'exceptions' | 'timeline'
  >('allocation');

  // React Query Data Fetching
  const { data: dashboard, isLoading: isDashboardLoading } = useDashboardSummary();
  const { data: productsData, isLoading: isProductsLoading } = useProducts({ limit: 100 });
  const { data: ordersData, isLoading: isOrdersLoading } = useOrders({ limit: 50 });
  const { data: employeesData } = useEmployees();
  const { data: weatherData } = useWeather();

  const products = productsData || [];
  const orders = ordersData || [];
  const employees = employeesData || [];
  const weather = weatherData?.weather;

  // 1. Calculate Health Scores
  const healthScores = useMemo(() => {
    return decisionIntelligenceService.calculateHealthScores(
      products,
      orders,
      employees,
      weather
    );
  }, [products, orders, employees, weather]);

  // 2. Generate Operational Decisions
  const allDecisions = useMemo(() => {
    return decisionIntelligenceService.generateOperationalDecisions(
      products,
      orders,
      employees,
      weather
    );
  }, [products, orders, employees, weather]);

  // 3. Calculate Dynamic Order Priorities
  const prioritizedOrders = useMemo(() => {
    return decisionIntelligenceService.calculateOrderPriorities(orders, weather);
  }, [orders, weather]);

  // 4. Generate Reorder Recommendations
  const reorderRecommendations = useMemo(() => {
    return decisionIntelligenceService.generateReorderRecommendations(products);
  }, [products]);

  // 5. Generate Operational Bottlenecks
  const bottlenecks = useMemo(() => {
    return decisionIntelligenceService.generateBottlenecks(
      employees,
      dashboard,
      weather
    );
  }, [employees, dashboard, weather]);

  // 6. Generate Operational Exceptions
  const exceptions = useMemo(() => {
    return decisionIntelligenceService.generateExceptions();
  }, []);

  const criticalIssuesCount = allDecisions.filter(
    (d) => d.severity === 'Critical' || d.severity === 'High'
  ).length;

  const ordersAtRiskCount = prioritizedOrders.filter(
    (o) => o.priorityScore >= 70 || o.order.priority === 'URGENT'
  ).length;

  // Top 5 Alerts
  const displayedAlerts = showAllAlerts ? allDecisions : allDecisions.slice(0, 5);

  // Top 5 Priority Orders
  const top5Orders = prioritizedOrders.slice(0, 5);

  // Top 5 Products Needing Reorder Attention
  const top5Products = reorderRecommendations.slice(0, 5);

  const isLoading = isDashboardLoading || isProductsLoading || isOrdersLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-16">
        <CardSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. EXECUTIVE SUMMARY (TOP) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <BrainCircuit className="h-4 w-4" />
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Executive Decision Center
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Operations executive overview • Real-time actionable decision intelligence
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Autonomous Engine Active
            </span>
          </div>
        </div>

        {/* 4 KPI Cards ONLY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Warehouse Health"
            value={`${healthScores.overall}%`}
            subtitle="Overall Facility Status"
            icon={Activity}
            variant="emerald"
            badge="Healthy"
          />
          <StatCard
            title="Active Critical Issues"
            value={`${criticalIssuesCount}`}
            subtitle="Requires Manager Action"
            icon={AlertTriangle}
            variant="rose"
            badge="Action Needed"
          />
          <StatCard
            title="Orders at Risk"
            value={`${ordersAtRiskCount}`}
            subtitle="Impending SLA Cutoffs"
            icon={Clock}
            variant="amber"
            badge="Priority"
          />
          <StatCard
            title="AI Recommendations"
            value={`${allDecisions.length}`}
            subtitle="Prescribed Optimizations"
            icon={Sparkles}
            variant="purple"
            badge="Active"
          />
        </div>

        {/* Today's Warehouse Summary Card */}
        <div className="p-4 sm:p-5 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/30 via-slate-900/90 to-slate-950 shadow-lg space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold text-purple-400 tracking-wider flex items-center gap-1.5">
              <Bot className="h-3.5 w-3.5" />
              Today&apos;s Warehouse Summary
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Facility Health: <b className="text-emerald-400">{healthScores.overall}%</b> • Issues: <b className="text-rose-400">{criticalIssuesCount}</b> • At Risk: <b className="text-amber-400">{ordersAtRiskCount}</b>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
            <b className="text-white">Top Directive: </b>
            {weather?.isAdverse
              ? 'Advance courier dispatch window by 45 minutes for all Express & SameDay orders prior to the 2:00 PM incoming rainstorm corridor.'
              : 'Execute split allocation on VIP Order #ORD-2026001 for Apex Logistics to protect 100% SLA and fulfill remaining 2 SSDs from Zone B.'}
          </p>
        </div>

        {/* 3-Level Stock Shortage Resolution Decision Strategy Card */}
        <StockResolutionCard />
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. CRITICAL ALERTS (TOP 5 HIGHEST PRIORITY) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-400" />
              Critical Alerts ({allDecisions.length} Total)
            </h2>
            <p className="text-[11px] text-slate-400">
              Showing top {displayedAlerts.length} highest-priority operational issues
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAllAlerts(!showAllAlerts)}
            className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
          >
            <span>{showAllAlerts ? 'Show Top 5' : `View All (${allDecisions.length})`}</span>
            {showAllAlerts ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="space-y-3">
          {displayedAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider border font-mono ${
                      alert.severity === 'Critical'
                        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        : alert.severity === 'High'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                    }`}
                  >
                    ● {alert.severity}
                  </span>
                  <span className="font-bold text-white">{alert.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {alert.problem}
                </p>
                <div className="text-[11px] text-blue-300/90 font-medium">
                  <b className="text-blue-400">Action: </b>
                  {alert.aiRecommendation}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                  {alert.confidenceScore}% Conf
                </span>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow transition-all hover:scale-[1.02] active:scale-95"
                >
                  {alert.actionLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. PRIORITY ORDERS (TOP 5 ONLY) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              Priority Orders (Top 5)
            </h2>
            <p className="text-[11px] text-slate-400">
              Ranked dynamically by VIP Tier, SLA Deadline, Order Value, and Weather Risk
            </p>
          </div>

          <Link
            href="/orders"
            className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase font-bold text-slate-400">
                <th className="py-2.5 px-3">Order ID</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Priority Score</th>
                <th className="py-2.5 px-3">Reason</th>
                <th className="py-2.5 px-3 text-right">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {top5Orders.map((ord) => (
                <tr key={ord.order.id} className="hover:bg-slate-950/60 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-white">
                    <Link href={`/orders/${ord.order.id}`} className="text-blue-400 hover:underline">
                      {ord.order.orderNumber}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 font-medium">
                    {ord.order.customerName}
                    <span className="ml-1.5 text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                      {ord.order.customerTier}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        ord.priorityScore >= 80
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          : ord.priorityScore >= 60
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {ord.priorityScore} / 100
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] truncate max-w-xs">
                    {ord.reason}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      {ord.recommendedAction}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. INVENTORY RISKS (TOP 5 ONLY) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Boxes className="h-4 w-4 text-rose-400" />
              Inventory Risks (Top 5 Products Needing Attention)
            </h2>
            <p className="text-[11px] text-slate-400">
              Low-stock items with high sales velocity requiring immediate replenishment
            </p>
          </div>

          <Link
            href="/inventory?status=low_stock"
            className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            <span>View All Stock</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase font-bold text-slate-400">
                <th className="py-2.5 px-3">SKU &amp; Product</th>
                <th className="py-2.5 px-3">Current Stock</th>
                <th className="py-2.5 px-3">Reorder Level</th>
                <th className="py-2.5 px-3">Stock Risk</th>
                <th className="py-2.5 px-3">Recommended Qty</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {top5Products.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-950/60 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="font-mono font-bold text-blue-400">{rec.sku}</div>
                    <div className="text-slate-300 font-medium text-[11px]">{rec.productName}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-400">
                    {rec.currentStock} units
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">
                    {rec.reorderLevel} units
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase font-mono ${
                        rec.priority === 'Critical'
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                    +{rec.suggestedQuantity} units
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="text-[11px] text-blue-400 font-bold">
                      PO Suggested
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 5. OPERATIONS OVERVIEW (3 COMPACT CARDS) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Operations Overview (3 Strategic Pillars)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Weather Impact */}
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-md space-y-2.5 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CloudSun className="h-4 w-4 text-cyan-400" />
                  Weather Impact
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.2 rounded border uppercase font-mono ${
                    weather?.isAdverse
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {weather?.isAdverse ? 'High Risk' : 'Nominal'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Current: <b className="text-white">{weather?.temperature ?? 19.4}°C, {weather?.condition ?? 'Partly Cloudy'}</b>
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px]">
              <span className="text-slate-500 font-semibold">Recommendation: </span>
              <span className="text-slate-200">
                {weather?.isAdverse
                  ? 'Advance SameDay couriers by 45m before rainstorm front.'
                  : 'Maintain regular pickup staging intervals.'}
              </span>
            </div>
          </div>

          {/* Card 2: Workforce Status */}
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-md space-y-2.5 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-blue-400" />
                  Workforce Status
                </span>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded border bg-emerald-500/15 text-emerald-300 border-emerald-500/30 uppercase font-mono">
                  91.6% Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Floor Roster: <b className="text-white">20 staff across 3 shifts</b>
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px]">
              <span className="text-slate-500 font-semibold">Recommendation: </span>
              <span className="text-slate-200">
                Reassign 2 idle pickers to Packing Conveyor Station 3.
              </span>
            </div>
          </div>

          {/* Card 3: Current Bottleneck */}
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-md space-y-2.5 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-400" />
                  Current Bottleneck
                </span>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded border bg-amber-500/15 text-amber-300 border-amber-500/30 uppercase font-mono">
                  Packing Buffer
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Throughput Drag: <b className="text-white">Conveyor 3 buffer at 88%</b>
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px]">
              <span className="text-slate-500 font-semibold">Recommendation: </span>
              <span className="text-slate-200">
                Route high-volume single-line parcels to Express Bay 2.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 6. AI RECOMMENDATIONS (TOP 3 ONLY) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="p-5 sm:p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/20 via-slate-900/90 to-slate-950 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-tight">
                AI Operations Director Recommendations (Top 3)
              </h2>
              <p className="text-[11px] text-slate-400">
                Synthesized prescriptive priorities generated from real-time facility telemetry
              </p>
            </div>
          </div>

          <Link
            href="/ai-assistant"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-purple-600/25 transition-all hover:scale-[1.02] w-fit"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Open AI Assistant</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 font-bold text-[11px]">
              1
            </span>
            <p className="text-slate-200 leading-snug">
              <b className="text-white">Dispatch Express loads before 2:00 PM: </b>
              Accelerate pickup for all 14 SameDay orders to avoid transit delays from the incoming precipitation front.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 font-bold text-[11px]">
              2
            </span>
            <p className="text-slate-200 leading-snug">
              <b className="text-white">Expedite Purchase Order for SKU-ELE-004: </b>
              Only 8 units of HyperDrive NVMe SSD 2TB remain with 10 demanded by VIP accounts. Reorder +150 units.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 font-bold text-[11px]">
              3
            </span>
            <p className="text-slate-200 leading-snug">
              <b className="text-white">Reallocate 2 Floor Pickers to Packing Station 3: </b>
              Relieves the 42-unit packing backlog and prevents dispatch cutoff misses.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* COLLAPSIBLE ADVANCED INTELLIGENCE TOOLS & SIMULATORS */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="pt-2">
        <button
          type="button"
          onClick={() => setShowAdvancedTools(!showAdvancedTools)}
          className="w-full p-4 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition-all flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-purple-400" />
            <span>Advanced Decision Tools &amp; Simulators (Allocation, Reorder, Bottlenecks, Timeline)</span>
          </div>
          <div className="flex items-center gap-1.5 text-purple-400">
            <span>{showAdvancedTools ? 'Hide Advanced Modules' : 'Expand Advanced Modules'}</span>
            {showAdvancedTools ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </button>

        <AnimatePresence>
          {showAdvancedTools && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6 pt-4 overflow-hidden"
            >
              {/* Tab Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
                {[
                  { id: 'allocation', label: 'Allocation Simulator' },
                  { id: 'reorder', label: 'Reorder Engine' },
                  { id: 'bottlenecks', label: 'Bottleneck Detector' },
                  { id: 'workforce', label: 'Workforce Optimizer' },
                  { id: 'exceptions', label: 'Exception Center' },
                  { id: 'timeline', label: 'Decision Timeline' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveAdvancedTab(t.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                      activeAdvancedTab === t.id
                        ? 'bg-purple-600/20 text-purple-300 border-purple-500/40 shadow-sm'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Render Active Advanced Tool */}
              {activeAdvancedTab === 'allocation' && <AllocationSimulator />}
              {activeAdvancedTab === 'reorder' && <ReorderEngine recommendations={reorderRecommendations} />}
              {activeAdvancedTab === 'bottlenecks' && <BottleneckDetector bottlenecks={bottlenecks} />}
              {activeAdvancedTab === 'workforce' && <WorkforceOptimizer employees={employees} />}
              {activeAdvancedTab === 'exceptions' && <ExceptionCenter exceptions={exceptions} />}
              {activeAdvancedTab === 'timeline' && <DecisionTimeline />}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
