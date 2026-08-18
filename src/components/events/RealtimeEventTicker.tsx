'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  CloudSun,
  Truck,
  Users,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Bell,
} from 'lucide-react';
import Link from 'next/link';
import { WarehouseEvent } from '@/types';

export function RealtimeEventTicker() {
  const [events, setEvents] = useState<WarehouseEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setEvents(json.data);
      }
    } catch (e) {
      console.error('Failed to load live events', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 15000); // Polling every 15s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (events.length > 1) {
      const rotate = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, 6000);
      return () => clearInterval(rotate);
    }
  }, [events.length]);

  if (isLoading || events.length === 0) return null;

  const currentEvent = events[currentIndex] || events[0];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'WARNING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    }
  };

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl p-2.5 px-4 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-black/20">
      <div className="flex items-center gap-3 flex-1 min-w-[280px]">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Live Event Engine
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-sm text-slate-200 overflow-hidden"
          >
            <span
              className={`text-xs px-2 py-0.5 rounded border font-semibold ${getSeverityBadge(
                currentEvent.severity
              )}`}
            >
              {currentEvent.severity}
            </span>
            <span className="truncate font-medium text-slate-300">
              {currentEvent.description}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/decision-center"
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-800/60"
        >
          Take Action
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/decision-center/simulator"
          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-800/60 border border-emerald-500/20"
        >
          What-If Simulator
        </Link>
      </div>
    </div>
  );
}
