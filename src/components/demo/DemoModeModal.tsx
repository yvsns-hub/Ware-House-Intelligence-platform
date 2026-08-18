'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Split,
  BrainCircuit,
  CloudSun,
  FileText,
  Boxes,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export interface DemoStep {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  category: string;
  description: string;
  aiRationale: string;
  actionTaken: string;
  targetLink: string;
  metricLabel: string;
  metricValue: string;
}

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: 'Step 1: VIP Platinum Inbound Demand Surge',
    subtitle: 'Apex Logistics Hub places Rush Order #ORD-2026001 for 10 units of 2TB NVMe SSDs ($2,400).',
    badge: 'Inbound Demand',
    category: 'Fulfillment',
    description: 'A high-LTV enterprise customer submits a SameDay delivery order. Order priority score spikes to 135 points based on the dynamic formula.',
    aiRationale: 'Platinum accounts represent top 5% revenue; immediate automated priority elevation triggered.',
    actionTaken: 'Order #ORD-2026001 prioritized at Rank #1 in picking queue.',
    targetLink: '/orders',
    metricLabel: 'Priority Score',
    metricValue: '135 pts (Rank #1)',
  },
  {
    id: 2,
    title: 'Step 2: Inventory Contention & Shortage Detected',
    subtitle: 'Physical bin inventory in Secure Cage B indicates only 8 units available (2-unit shortage).',
    badge: 'Stock Shortage',
    category: 'Inventory',
    description: 'Traditional FIFO WMS would stall and fail SLA on standard account queues. WarehouseIQ recognizes the contention between Order A (VIP) and Order B (Standard).',
    aiRationale: 'Failing to fulfill 100% of order risks SLA contract penalty ($2,400) and account churn.',
    actionTaken: 'Flagged for Autonomous Decision Intelligence resolution.',
    targetLink: '/inventory',
    metricLabel: 'Stock Deficit',
    metricValue: '8 Avail / 10 Demanded',
  },
  {
    id: 3,
    title: 'Step 3: Autonomous Split Allocation & Replenishment',
    subtitle: 'Decision Engine computes optimal split: allocate 8 units to VIP, backorder 2, draft emergency PO.',
    badge: 'Autonomous Decision',
    category: 'Decision Center',
    description: 'The Smart Allocation Simulator routes 8 available SSDs to Order A for immediate pick wave staging. Order B is deferred with courtesy discount.',
    aiRationale: 'Preserves 95.2% customer retention score while avoiding full order cancellation.',
    actionTaken: 'Emergency PO #PO-88192 dispatched to SiliconEdge Ltd for +100 units.',
    targetLink: '/decision-center',
    metricLabel: 'SLA Protected',
    metricValue: '99.4% Fulfillment',
  },
  {
    id: 4,
    title: 'Step 4: Operations Director AI Generates Rationale',
    subtitle: 'AI Co-Pilot produces natural-language strategic briefing for shift managers.',
    badge: 'AI Director Briefing',
    category: 'AI Assistant',
    description: '"Allocate 8 units to Apex Logistics, assign 2 morning pickers to Packing Station 3, and authorize courier dispatch window."',
    aiRationale: 'Converts multi-variable mathematical allocation into clear executive directives for warehouse floor operators.',
    actionTaken: 'Shift floor memo broadcast to morning pick supervisors.',
    targetLink: '/ai-assistant',
    metricLabel: 'AI Confidence',
    metricValue: '96.8% Confidence',
  },
  {
    id: 5,
    title: 'Step 5: Severe Weather Disruption & Advance Dispatch',
    subtitle: 'Live meteorological telemetry detects heavy storm front along Interstate 87 delivery corridor.',
    badge: 'Weather Transit Risk',
    category: 'Logistics',
    description: 'Regional precipitation creates a 45-minute freight delay. Decision intelligence automatically reschedules courier pickups 45 minutes early.',
    aiRationale: 'Advancing carrier handoff bypasses road closures and preserves SameDay delivery guarantee.',
    actionTaken: 'Outbound trailers staged and dispatched ahead of schedule.',
    targetLink: '/decision-center',
    metricLabel: 'Delay Reduction',
    metricValue: '-34% Transit Latency',
  },
  {
    id: 6,
    title: 'Step 6: Boardroom Executive Operations Report Compiled',
    subtitle: 'Autonomous Director compiles final shift operations audit and confirms zero SLA defaults.',
    badge: 'Executive Audit',
    category: 'Reporting',
    description: 'Daily operations report finalized: $52,400 in fulfilled revenue, 100% VIP customer retention, and $48,000 contract value secured.',
    aiRationale: 'Provides full transparent visibility for Operations Directors, Plant Managers, and C-Suite executives.',
    actionTaken: 'Executive report ready for PDF export and boardroom review.',
    targetLink: '/ai-assistant',
    metricLabel: 'Protected Value',
    metricValue: '$48,000 Contract Value',
  },
];

export function DemoModeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const step = demoSteps[currentStepIndex];

  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= demoSteps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 10000); // 10s per step = 60s total

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentStepIndex((prev) => Math.min(demoSteps.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="rounded-3xl border border-purple-500/40 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-2xl text-white space-y-4 ring-1 ring-purple-500/20"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-md shadow-purple-600/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-extrabold tracking-tight">
                  Autonomous Demo Tour (60s Sequence)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Step {currentStepIndex + 1} of {demoSteps.length}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-6 gap-1.5 h-1.5">
          {demoSteps.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setCurrentStepIndex(idx)}
              className={`rounded-full cursor-pointer transition-all ${
                idx === currentStepIndex
                  ? 'bg-purple-400 shadow-sm shadow-purple-400 h-2 -mt-0.5'
                  : idx < currentStepIndex
                  ? 'bg-emerald-400'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Step Content Box */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
              {step.badge}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
              {step.metricLabel}: {step.metricValue}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-extrabold text-white">
              {step.title}
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {step.subtitle}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1.5">
            <p className="text-slate-300 leading-relaxed">
              <b>Operations Flow:</b> {step.description}
            </p>
            <p className="text-purple-300 text-[11px] leading-relaxed">
              <b>AI Director Rationale:</b> {step.aiRationale}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-semibold text-emerald-400">
              ✓ {step.actionTaken}
            </span>

            <Link
              href={step.targetLink}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 underline"
            >
              View in {step.category} →
            </Link>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors"
              title="Restart Demo"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-30"
            >
              <SkipBack className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentStepIndex === demoSteps.length - 1}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-30"
            >
              <SkipForward className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
