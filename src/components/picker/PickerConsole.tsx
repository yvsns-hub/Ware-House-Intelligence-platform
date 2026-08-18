'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Barcode,
  CheckCircle2,
  MapPin,
  Clock,
  Boxes,
  Zap,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { StatCard } from '../ui/StatCard';

export interface PickItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  location: string;
  quantityRequired: number;
  quantityPicked: number;
  orderNumber: string;
  customerTier: string;
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
  isComplete: boolean;
}

export function PickerConsole() {
  const [items, setItems] = useState<PickItem[]>([
    {
      id: 'pick-1',
      sku: 'SKU-ELE-004',
      name: 'HyperDrive NVMe SSD 2TB Gen4',
      category: 'Electronics',
      location: 'Aisle B • Rack 02 • Shelf 1 (Bay B-02-1)',
      quantityRequired: 8,
      quantityPicked: 0,
      orderNumber: 'ORD-2026001',
      customerTier: 'Platinum',
      priority: 'URGENT',
      isComplete: false,
    },
    {
      id: 'pick-2',
      sku: 'SKU-MED-039',
      name: 'Epinephrine Auto-Injector 2-Pack',
      category: 'Medical',
      location: 'Aisle B • Vault Cage • Shelf 3 (Bay B-04-3)',
      quantityRequired: 2,
      quantityPicked: 0,
      orderNumber: 'ORD-2026004',
      customerTier: 'Gold',
      priority: 'HIGH',
      isComplete: false,
    },
    {
      id: 'pick-3',
      sku: 'SKU-ELE-006',
      name: '140W GaN Fast Charger Multi-Port',
      category: 'Electronics',
      location: 'Aisle A • Golden Zone • Shelf 2 (Bay A-01-2)',
      quantityRequired: 4,
      quantityPicked: 0,
      orderNumber: 'ORD-2026012',
      customerTier: 'Standard',
      priority: 'NORMAL',
      isComplete: false,
    },
    {
      id: 'pick-4',
      sku: 'SKU-GRO-023',
      name: 'Wild Alaskan Sockeye Salmon 1kg',
      category: 'Perishable',
      location: 'Aisle C • Cold Storage • Shelf 1 (Bay C-01-1)',
      quantityRequired: 3,
      quantityPicked: 0,
      orderNumber: 'ORD-2026019',
      customerTier: 'Gold',
      priority: 'HIGH',
      isComplete: false,
    },
  ]);

  const [completedPicksCount, setCompletedPicksCount] = useState(48);
  const [scannedFeedback, setScannedFeedback] = useState<string | null>(null);

  const activeIndex = items.findIndex((i) => !i.isComplete);
  const currentItem = activeIndex !== -1 ? items[activeIndex] : null;

  const handleScanAndPick = () => {
    if (!currentItem) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === currentItem.id
          ? { ...item, quantityPicked: item.quantityRequired, isComplete: true }
          : item
      )
    );

    setCompletedPicksCount((prev) => prev + 1);
    setScannedFeedback(`Barcode verified for ${currentItem.sku}! Pick confirmed.`);
    setTimeout(() => setScannedFeedback(null), 3000);
  };

  const handleResetBatch = () => {
    setItems((prev) =>
      prev.map((item) => ({ ...item, quantityPicked: 0, isComplete: false }))
    );
    setScannedFeedback(null);
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/30 shadow-xl backdrop-blur-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <Boxes className="h-3.5 w-3.5" />
            <span>Fulfillment Operator Console • Morning Shift</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Assigned Pick Wave: Batch #PK-904
          </h1>
          <p className="text-xs text-slate-400">
            Assigned Picker: <b className="text-white">Marcus Vance</b> (Target SLA: 14:00 SameDay Courier Cutoff)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetBatch}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Wave</span>
          </button>
        </div>
      </div>

      {/* 2. Personal Picker KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Today's Items Picked"
          value={`${completedPicksCount} units`}
          subtitle="Target: 60 units/shift"
          icon={Boxes}
          trend={{ value: '+14%', isPositive: true }}
          variant="blue"
        />
        <StatCard
          title="Average Pick Velocity"
          value="4.8 mins"
          subtitle="Per multi-line order batch"
          icon={Zap}
          trend={{ value: '-12%', isPositive: true }}
          variant="emerald"
        />
        <StatCard
          title="Barcode Scan Accuracy"
          value="99.8%"
          subtitle="Zero mis-pick errors logged"
          icon={CheckCircle2}
          variant="purple"
        />
      </div>

      {/* 3. Hero Item To Pick Console */}
      {currentItem ? (
        <div className="p-6 rounded-2xl border border-blue-500/40 bg-gradient-to-br from-blue-950/30 via-slate-900/90 to-slate-950 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                Current Active Task • Step {items.filter((i) => i.isComplete).length + 1} of {items.length}
              </span>
              <h2 className="text-lg font-extrabold text-white mt-0.5">
                Navigate to Picking Bay &amp; Scan Item
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono">
                ● {currentItem.priority} Priority
              </span>
              <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                Order #{currentItem.orderNumber}
              </span>
            </div>
          </div>

          {/* Location & SKU Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Target Bin Coordinates */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                <MapPin className="h-4 w-4" />
                <span>Exact Bin Location Coordinates:</span>
              </div>
              <p className="text-base font-extrabold text-emerald-400 font-mono">
                {currentItem.location}
              </p>
              <p className="text-[11px] text-slate-400">
                Optimized route: Proceed along Center Aisle B toward Rack 02.
              </p>
            </div>

            {/* Item Details */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400">
                  {currentItem.sku}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Category: {currentItem.category}
                </span>
              </div>
              <p className="text-sm font-bold text-white leading-tight">
                {currentItem.name}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-400">Pick Quantity:</span>
                <span className="text-base font-extrabold text-amber-400 font-mono">
                  {currentItem.quantityRequired} units
                </span>
              </div>
            </div>
          </div>

          {scannedFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{scannedFeedback}</span>
            </motion.div>
          )}

          {/* Action Trigger */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="button"
              onClick={handleScanAndPick}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Barcode className="h-5 w-5" />
              <span>Scan Barcode &amp; Confirm Pick ({currentItem.quantityRequired} units)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white">
            Wave Batch #PK-904 Completed!
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            All 17 units have been scanned, verified, and staged at Packing Conveyor Station 3.
          </p>
          <button
            type="button"
            onClick={handleResetBatch}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            Start Next Wave Batch
          </button>
        </div>
      )}

      {/* 4. Complete Pick Wave Queue Table */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Assigned Pick Queue Items ({items.length})
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {items.filter((i) => i.isComplete).length} / {items.length} Completed
          </span>
        </div>

        <div className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                item.isComplete
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-60 text-slate-400'
                  : idx === activeIndex
                  ? 'bg-slate-950 border-blue-500/50 shadow-md text-white'
                  : 'bg-slate-950/80 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-xs text-slate-500">
                  #{idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-400">{item.sku}</span>
                    <span className="font-bold text-white">{item.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{item.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="font-mono font-bold text-amber-400">
                  {item.quantityRequired} units
                </span>
                {item.isComplete ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Picked
                  </span>
                ) : (
                  <span className="text-slate-400 font-semibold">Queued</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
