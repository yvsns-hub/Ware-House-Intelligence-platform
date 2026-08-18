'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Building2,
  TrendingUp,
  DollarSign,
  Truck,
  Boxes,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Split,
  X,
  PieChart,
  Zap,
  Clock,
  Layers,
} from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { formatCurrency } from '@/lib/utils';

export interface WarehouseNode {
  id: string;
  name: string;
  code: string;
  region: string;
  healthScore: number;
  activeOrders: number;
  totalStockUnits: number;
  utilization: number;
  status: 'Nominal' | 'Warning' | 'High Demand';
  dailyRevenue: number;
  monthlyBudget: number;
  dailyExpenses: number;
  expensesBreakdown: {
    payroll: number;
    energy: number;
    freight: number;
    maintenance: number;
  };
  netProfit: number;
  profitMargin: number;
}

export function MultiWarehouseCommand() {
  const [facilities, setFacilities] = useState<WarehouseNode[]>([
    {
      id: 'hub-01',
      name: 'Hub Central-01 (New York)',
      code: 'NA-EAST-NY',
      region: 'Long Island City, NY',
      healthScore: 91,
      activeOrders: 50,
      totalStockUnits: 7322,
      utilization: 78.4,
      status: 'Nominal',
      dailyRevenue: 52400,
      monthlyBudget: 380000,
      dailyExpenses: 34100,
      expensesBreakdown: {
        payroll: 18500,
        energy: 4200,
        freight: 8900,
        maintenance: 2500,
      },
      netProfit: 18300,
      profitMargin: 34.9,
    },
    {
      id: 'hub-02',
      name: 'Hub West-02 (Los Angeles)',
      code: 'NA-WEST-CA',
      region: 'Ontario, CA',
      healthScore: 94,
      activeOrders: 64,
      totalStockUnits: 9140,
      utilization: 82.1,
      status: 'Nominal',
      dailyRevenue: 68900,
      monthlyBudget: 450000,
      dailyExpenses: 42300,
      expensesBreakdown: {
        payroll: 22000,
        energy: 5100,
        freight: 11800,
        maintenance: 3400,
      },
      netProfit: 26600,
      profitMargin: 38.6,
    },
    {
      id: 'hub-03',
      name: 'Hub South-03 (Dallas)',
      code: 'NA-SOUTH-TX',
      region: 'Grapevine, TX',
      healthScore: 78,
      activeOrders: 38,
      totalStockUnits: 4890,
      utilization: 88.6,
      status: 'Warning',
      dailyRevenue: 34100,
      monthlyBudget: 290000,
      dailyExpenses: 25600,
      expensesBreakdown: {
        payroll: 14200,
        energy: 3800,
        freight: 5900,
        maintenance: 1700,
      },
      netProfit: 8500,
      profitMargin: 24.9,
    },
    {
      id: 'hub-04',
      name: 'Hub Midwest-04 (Chicago)',
      code: 'NA-MID-IL',
      region: 'Elk Grove Village, IL',
      healthScore: 88,
      activeOrders: 45,
      totalStockUnits: 6200,
      utilization: 71.0,
      status: 'Nominal',
      dailyRevenue: 46200,
      monthlyBudget: 330000,
      dailyExpenses: 30800,
      expensesBreakdown: {
        payroll: 16800,
        energy: 4100,
        freight: 7600,
        maintenance: 2300,
      },
      netProfit: 15400,
      profitMargin: 33.3,
    },
  ]);

  const [selectedFacility, setSelectedFacility] = useState<WarehouseNode | null>(null);
  const [transferExecuted, setTransferExecuted] = useState(false);

  const totalNetworkRevenue = facilities.reduce((sum, f) => sum + f.dailyRevenue, 0);
  const totalNetworkExpenses = facilities.reduce((sum, f) => sum + f.dailyExpenses, 0);
  const totalNetworkProfit = facilities.reduce((sum, f) => sum + f.netProfit, 0);
  const totalNetworkBudget = facilities.reduce((sum, f) => sum + f.monthlyBudget, 0);
  const avgHealth = Math.round(
    facilities.reduce((sum, f) => sum + f.healthScore, 0) / facilities.length
  );

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* 1. Executive Network Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-900/30 shadow-xl backdrop-blur-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <Globe className="h-3.5 w-3.5" />
            <span>VP Global Supply Chain Executive Portal • 4 Facilities Online</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Multi-Warehouse Financial &amp; Operations Command
          </h1>
          <p className="text-xs text-slate-400">
            Click any facility card below to inspect individual P&amp;L, operating expenses breakdown, budgets, and stock health.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Network Operating Margin
            </span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">
              +34.1% Net Margin
            </span>
          </div>
        </div>
      </div>

      {/* 2. Global Network P&L Aggregates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Network Daily Revenue"
          value={formatCurrency(totalNetworkRevenue)}
          subtitle="4 Facilities Combined"
          icon={TrendingUp}
          trend={{ value: '+18.4%', isPositive: true }}
          variant="emerald"
        />
        <StatCard
          title="Total Daily Operating Profit"
          value={formatCurrency(totalNetworkProfit)}
          subtitle="After All Variable Expenses"
          icon={DollarSign}
          trend={{ value: '+22.1%', isPositive: true }}
          variant="blue"
        />
        <StatCard
          title="Monthly Operating Budget"
          value={formatCurrency(totalNetworkBudget)}
          subtitle="Combined CapEx &amp; OpEx"
          icon={Building2}
          variant="purple"
        />
        <StatCard
          title="Total Daily Expenses"
          value={formatCurrency(totalNetworkExpenses)}
          subtitle="Payroll, Freight &amp; Energy"
          icon={Boxes}
          variant="amber"
        />
      </div>

      {/* 3. 4-Warehouse Cards (Click to Drill Down) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Regional Warehouses (Click Facility Card for Detailed Financials &amp; Expenses)
          </h2>
          <span className="text-xs text-purple-400 font-semibold">
            4 Facilities Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              onClick={() => setSelectedFacility(fac)}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/90 hover:border-purple-500/50 hover:bg-slate-850 cursor-pointer shadow-md transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-base group-hover:text-purple-300 transition-colors">
                        {fac.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.2 rounded border border-slate-800">
                        {fac.code}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">{fac.region}</span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider border font-mono ${
                      fac.healthScore >= 90
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    ● Health: {fac.healthScore}%
                  </span>
                </div>

                {/* Financial Overview Tiles */}
                <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      Daily Revenue
                    </span>
                    <span className="font-mono font-bold text-emerald-400 mt-0.5 block">
                      {formatCurrency(fac.dailyRevenue)}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      Daily Expenses
                    </span>
                    <span className="font-mono font-bold text-rose-400 mt-0.5 block">
                      {formatCurrency(fac.dailyExpenses)}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      Net Profit
                    </span>
                    <span className="font-mono font-bold text-white mt-0.5 block">
                      {formatCurrency(fac.netProfit)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  Profit Margin: <b className="text-emerald-400 font-mono">{fac.profitMargin}%</b>
                </span>
                <span className="text-purple-400 font-bold text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Financial Breakdown</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Financial & Operational Drilldown Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-white">
                      {selectedFacility.name}
                    </h3>
                    <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/30">
                      {selectedFacility.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Location: {selectedFacility.region} • Operational Health: <b className="text-emerald-400 font-mono">{selectedFacility.healthScore}%</b>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedFacility(null)}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Financial Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Daily Revenue
                  </span>
                  <span className="text-base font-extrabold text-emerald-400 font-mono block">
                    {formatCurrency(selectedFacility.dailyRevenue)}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Monthly Budget
                  </span>
                  <span className="text-base font-extrabold text-purple-400 font-mono block">
                    {formatCurrency(selectedFacility.monthlyBudget)}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Daily Expenses
                  </span>
                  <span className="text-base font-extrabold text-rose-400 font-mono block">
                    {formatCurrency(selectedFacility.dailyExpenses)}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Net Profit (Margin)
                  </span>
                  <span className="text-base font-extrabold text-white font-mono block">
                    {formatCurrency(selectedFacility.netProfit)} ({selectedFacility.profitMargin}%)
                  </span>
                </div>
              </div>

              {/* Detailed Expense Line Items */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-purple-400" />
                  <span>Daily Operating Expenses Breakdown (OpEx)</span>
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="text-slate-300 font-medium">1. Shift Workforce &amp; Overtime Payroll</span>
                    <span className="font-mono font-bold text-white">
                      {formatCurrency(selectedFacility.expensesBreakdown.payroll)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="text-slate-300 font-medium">2. Courier Freight &amp; Outbound Logistics</span>
                    <span className="font-mono font-bold text-white">
                      {formatCurrency(selectedFacility.expensesBreakdown.freight)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="text-slate-300 font-medium">3. Facility Energy &amp; Cold-Chain Refrigeration</span>
                    <span className="font-mono font-bold text-white">
                      {formatCurrency(selectedFacility.expensesBreakdown.energy)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="text-slate-300 font-medium">4. Conveyor, Forklift &amp; Aisle Maintenance</span>
                    <span className="font-mono font-bold text-white">
                      {formatCurrency(selectedFacility.expensesBreakdown.maintenance)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Operational & Capacity Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Warehouse Storage &amp; Utilization
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Total Stored SKUs / Units:</span>
                    <span className="font-mono font-bold text-white">
                      {selectedFacility.totalStockUnits.toLocaleString()} units
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Rack Bay Capacity:</span>
                    <span className="font-mono font-bold text-amber-400">
                      {selectedFacility.utilization}% Full
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Fulfillment Throughput
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Active Daily Orders:</span>
                    <span className="font-mono font-bold text-white">
                      {selectedFacility.activeOrders} orders
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Status Classification:</span>
                    <span className="font-bold text-emerald-400">
                      {selectedFacility.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedFacility(null)}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Close Financial Drilldown
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Cross-Warehouse Stock Rebalancing */}
      <div className="p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/20 via-slate-900/90 to-slate-950 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Split className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Inter-Facility Stock Rebalancing
              </h3>
              <p className="text-xs text-slate-400">
                Autonomous inter-hub freight transfer solving stockout contention between regional warehouses
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Network Transfer
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-purple-400 block">
              Recommended Freight Transfer Route:
            </span>
            <p className="text-slate-200 font-medium">
              Transfer <b>150 units of HyperDrive NVMe SSD 2TB</b> from <span className="text-blue-400 font-bold">Hub West-02 (Los Angeles)</span> $\rightarrow$ <span className="text-emerald-400 font-bold">Hub Central-01 (New York)</span>.
            </p>
            <p className="text-[11px] text-slate-400">
              Rationale: Hub West has 420 surplus units; Hub Central has 8 units remaining with 10 demanded by VIP accounts.
            </p>
          </div>

          <div className="shrink-0">
            {transferExecuted ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-500/15 px-4 py-2 rounded-xl border border-emerald-500/30">
                <CheckCircle2 className="h-4 w-4" />
                Transfer Manifest Dispatched
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setTransferExecuted(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02]"
              >
                <Truck className="h-4 w-4" />
                <span>Execute Inter-Hub Transfer</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
