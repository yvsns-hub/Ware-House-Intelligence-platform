'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Boxes,
  Truck,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building2,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { StockShortageResolution, ShortageDecisionStage } from '@/types';
import { decisionEngine } from '@/services/decisionEngine';

interface StockResolutionCardProps {
  initialResolution?: StockShortageResolution;
}

export function StockResolutionCard({ initialResolution }: StockResolutionCardProps) {
  // Preset default mock order & product if not passed
  const defaultOrder = { id: 'ord-vip-001', orderNumber: 'ORD-2026-VIP01', totalItems: 10, customerTier: 'Platinum', shippingType: 'SameDay', orderValue: 2250 };
  const defaultProduct = { id: 'prod-elec-004', sku: 'SKU-ELE-004', name: 'HyperDrive NVMe Gen4 SSD 2TB', description: 'HyperDrive NVMe Gen4 SSD 2TB High-performance drive', stock: 5, reorderLevel: 20, unitPrice: 180, category: 'Electronics', supplier: 'SiliconEdge Ltd', warehouseLocation: 'Zone A-01-2', demandScore: 9.2, reservedStock: 2, damagedStock: 0, createdAt: new Date(), updatedAt: new Date() };

  // Current active demo level ('TRANSFER' | 'AI_RECOMMENDATION' | 'DELAY')
  const [activeStage, setActiveStage] = useState<ShortageDecisionStage>(
    initialResolution?.decisionStage || 'TRANSFER'
  );
  const [notification, setNotification] = useState<string | null>(null);

  // Generate dynamic resolution based on activeStage
  const currentResolution: StockShortageResolution = React.useMemo(() => {
    if (activeStage === 'TRANSFER') {
      return decisionEngine.resolveStockShortage(defaultOrder, defaultProduct, 'hub-01');
    } else if (activeStage === 'AI_RECOMMENDATION') {
      // Force AI recommendation
      const res = decisionEngine.resolveStockShortage(defaultOrder, { ...defaultProduct, stock: 5 }, 'hub-01');
      res.decisionStage = 'AI_RECOMMENDATION';
      res.stepsProgress.step2AIRecommendation = true;
      return res;
    } else {
      // Force Delay Order Level 3 (Last Resort)
      return decisionEngine.generateDelayResolution(defaultOrder, { ...defaultProduct, stock: 0 });
    }
  }, [activeStage]);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAction = () => {
    if (currentResolution.decisionStage === 'TRANSFER') {
      showToast(currentResolution.notificationMessage || 'Inventory transfer approved from Hub B.');
    } else if (currentResolution.decisionStage === 'AI_RECOMMENDATION') {
      showToast(currentResolution.notificationMessage || 'AI recommends partial fulfillment to maintain SLA.');
    } else {
      showToast(currentResolution.notificationMessage || 'Order delayed due to global stock shortage.');
    }
  };

  return (
    <div className="p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Toast Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-300"
          >
            <CheckCircle2 className="h-4 w-4 text-white" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Zap className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white tracking-tight">
                  Stock Shortage Resolution
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30">
                  3-Level Hierarchy
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Order <b className="text-white font-mono">{currentResolution.orderNumber}</b> • {currentResolution.productName} ({currentResolution.productSku})
              </p>
            </div>
          </div>
        </div>

        {/* Demo Stage Switcher (Level 1, Level 2, Level 3) */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-500 uppercase px-2">Demo Stage:</span>
          <button
            type="button"
            onClick={() => setActiveStage('TRANSFER')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeStage === 'TRANSFER'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Level 1: Transfer
          </button>
          <button
            type="button"
            onClick={() => setActiveStage('AI_RECOMMENDATION')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeStage === 'AI_RECOMMENDATION'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Level 2: AI Engine
          </button>
          <button
            type="button"
            onClick={() => setActiveStage('DELAY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeStage === 'DELAY'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Level 3: Delay
          </button>
        </div>
      </div>

      {/* Inventory Stock Contention Banner (Current vs Required) */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center text-xs">
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Current Hub Stock</span>
          <span className="text-lg font-mono font-black text-amber-400">{currentResolution.currentStock} units</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Required Stock</span>
          <span className="text-lg font-mono font-black text-white">{currentResolution.requiredStock} units</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Stock Shortage</span>
          <span className="text-lg font-mono font-black text-rose-400">
            -{Math.max(0, currentResolution.requiredStock - currentResolution.currentStock)} units
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Account Status</span>
          <span className="text-xs font-bold text-purple-300 bg-purple-950/60 px-2 py-1 rounded-lg border border-purple-500/20 inline-block font-mono">
            Platinum VIP
          </span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────────── */}
      {/* 3-STEP PROGRESS STEPPER */}
      {/* ───────────────────────────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <span>Decision Pipeline Progress</span>
          <span className="text-purple-400">Enforcing Zero-Delay Policy</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Step 1: Cross Hub Check */}
          <div
            className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
              currentResolution.stepsProgress.step1CrossHubCheck
                ? 'bg-blue-950/40 border-blue-500/40 text-blue-300'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            <div
              className={`h-7 w-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                currentResolution.stepsProgress.step1CrossHubCheck
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              ✓
            </div>
            <div>
              <div className="text-xs font-bold text-white">Step 1: Cross Hub Check</div>
              <div className="text-[10px] text-slate-400">
                {activeStage === 'TRANSFER' ? 'Found in Hub B' : 'Checked all 4 hubs'}
              </div>
            </div>
          </div>

          {/* Step 2: AI Recommendation */}
          <div
            className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
              currentResolution.stepsProgress.step2AIRecommendation
                ? 'bg-purple-950/40 border-purple-500/40 text-purple-300'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            <div
              className={`h-7 w-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                currentResolution.stepsProgress.step2AIRecommendation
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {currentResolution.stepsProgress.step2AIRecommendation ? '✓' : '2'}
            </div>
            <div>
              <div className="text-xs font-bold text-white">Step 2: AI Engine</div>
              <div className="text-[10px] text-slate-400">
                {activeStage === 'AI_RECOMMENDATION' || activeStage === 'DELAY'
                  ? 'Prescribed Strategy'
                  : 'Bypassed (Hub found)'}
              </div>
            </div>
          </div>

          {/* Step 3: Delay Order (Only if necessary) */}
          <div
            className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
              currentResolution.stepsProgress.step3Delay
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                : 'bg-slate-950 border-slate-800 opacity-60 text-slate-500'
            }`}
          >
            <div
              className={`h-7 w-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                currentResolution.stepsProgress.step3Delay
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {currentResolution.stepsProgress.step3Delay ? '✓' : '3'}
            </div>
            <div>
              <div className="text-xs font-bold text-white">Step 3: Delay Order</div>
              <div className="text-[10px] text-slate-400">
                {currentResolution.stepsProgress.step3Delay ? 'Executed as Last Resort' : 'Avoided'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────────── */}
      {/* DECISION CARD BODY (DYNAMIC BASED ON LEVEL) */}
      {/* ───────────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {/* LEVEL 1: CROSS-HUB TRANSFER */}
        {activeStage === 'TRANSFER' && currentResolution.transferInfo && (
          <motion.div
            key="level-1-transfer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 rounded-3xl bg-blue-950/30 border border-blue-500/30 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-blue-400 tracking-wider flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Level 1 Strategy: Cross-Hub Inventory Transfer
              </span>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                SLA Preserved
              </span>
            </div>

            {/* Message Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-blue-900/50 text-xs text-slate-200 leading-relaxed font-medium">
              &quot;12 units are available in Hub B. Estimated transfer time is 3 hours. Transfer inventory to fulfill the order without affecting SLA.&quot;
            </div>

            {/* Transfer Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Source Hub</span>
                <span className="font-bold text-white">{currentResolution.transferInfo.sourceHubName}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Destination Hub</span>
                <span className="font-bold text-white">{currentResolution.transferInfo.destinationHubName}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Transfer Qty</span>
                <span className="font-bold font-mono text-emerald-400">
                  {currentResolution.transferInfo.transferQuantity} units
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">ETA &amp; Transit Cost</span>
                <span className="font-bold text-slate-200">
                  {currentResolution.transferInfo.estimatedArrivalTime} (${currentResolution.transferInfo.transportationCost})
                </span>
              </div>
            </div>

            {/* Business Impact & Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-blue-900/30">
              <div className="text-xs text-slate-300">
                <b className="text-white">Business Impact: </b>
                {currentResolution.businessImpact}
              </div>

              <button
                type="button"
                onClick={handleAction}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shrink-0"
              >
                <Truck className="h-4 w-4" />
                <span>Approve Transfer</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* LEVEL 2: AI RECOMMENDATION ENGINE */}
        {activeStage === 'AI_RECOMMENDATION' && currentResolution.aiRecommendation && (
          <motion.div
            key="level-2-ai"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 rounded-3xl bg-purple-950/30 border border-purple-500/30 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-purple-300 tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                Level 2 Strategy: AI Recommendation Engine ({currentResolution.aiRecommendation.strategyType})
              </span>
              <span className="text-[11px] font-mono font-bold text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                {currentResolution.aiRecommendation.confidenceScore}% Confidence
              </span>
            </div>

            {/* Recommendation Table / Key Values */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-900/40 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <b className="text-slate-400 shrink-0 min-w-[110px]">Problem:</b>
                <span className="text-slate-200">{currentResolution.aiRecommendation.problem}</span>
              </div>
              <div className="flex items-start gap-2">
                <b className="text-purple-400 shrink-0 min-w-[110px]">Recommendation:</b>
                <span className="text-white font-extrabold">{currentResolution.aiRecommendation.recommendation}</span>
              </div>
              <div className="flex items-start gap-2">
                <b className="text-slate-400 shrink-0 min-w-[110px]">Reason:</b>
                <span className="text-slate-300">{currentResolution.aiRecommendation.reason}</span>
              </div>
              <div className="flex items-start gap-2">
                <b className="text-emerald-400 shrink-0 min-w-[110px]">Business Impact:</b>
                <span className="text-emerald-400 font-extrabold">{currentResolution.aiRecommendation.businessImpact}</span>
              </div>
            </div>

            {/* Actions & SLA Impact */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-purple-900/30">
              <div className="text-xs text-slate-300">
                <b className="text-white">Estimated SLA Impact: </b>
                <span className="text-emerald-400 font-bold">{currentResolution.aiRecommendation.estimatedSLAImpact}</span>
              </div>

              <button
                type="button"
                onClick={handleAction}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shrink-0"
              >
                <Sparkles className="h-4 w-4" />
                <span>Apply AI Recommendation</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* LEVEL 3: DELAY ORDER (LAST RESORT) */}
        {activeStage === 'DELAY' && currentResolution.delayInfo && (
          <motion.div
            key="level-3-delay"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 rounded-3xl bg-rose-950/30 border border-rose-500/30 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-rose-400 tracking-wider flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Level 3 Strategy: Delay Order (Executed Strictly as Last Resort)
              </span>
              <span className="text-[10px] font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/30 uppercase font-mono">
                Last Resort
              </span>
            </div>

            {/* Delay Info Grid */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <b className="text-slate-400 shrink-0 min-w-[120px]">Delay Reason:</b>
                <span className="text-rose-300 font-semibold">{currentResolution.delayInfo.delayReason}</span>
              </div>
              <div className="flex items-start gap-2">
                <b className="text-slate-400 shrink-0 min-w-[120px]">Expected Restock:</b>
                <span className="text-white font-mono font-bold">{currentResolution.delayInfo.expectedRestockTime}</span>
              </div>
              <div className="flex items-start gap-2">
                <b className="text-slate-400 shrink-0 min-w-[120px]">New Delivery Date:</b>
                <span className="text-amber-400 font-mono font-bold">{currentResolution.delayInfo.newDeliveryDate}</span>
              </div>
              <div className="flex items-start gap-2">
                <b className="text-slate-400 shrink-0 min-w-[120px]">Priority Level:</b>
                <span className="text-purple-300 font-mono">{currentResolution.delayInfo.priorityLevel}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-rose-900/30">
              <div className="text-xs text-slate-300">
                <b className="text-white">Customer Notification: </b>
                Auto-generates courtesy PO backorder ticket &amp; sends tracking link.
              </div>

              <button
                type="button"
                onClick={handleAction}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shrink-0"
              >
                <Clock className="h-4 w-4" />
                <span>Confirm Delay &amp; Notify Customer</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
