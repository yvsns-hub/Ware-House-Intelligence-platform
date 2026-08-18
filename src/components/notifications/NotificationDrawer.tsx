'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  X,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Sparkles,
  ExternalLink,
  Trash2,
  ShieldAlert,
  ShoppingCart,
  Boxes,
  CloudSun,
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  severity: 'Critical' | 'Warning' | 'Info' | 'Success';
  category: string;
  title: string;
  message: string;
  time: string;
  actionHref: string;
  actionLabel: string;
  isRead: boolean;
}

export function NotificationDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      severity: 'Critical',
      category: 'Fulfillment',
      title: 'VIP Platinum Order Received with Stock Shortage',
      message: 'Apex Logistics Hub placed Order #ORD-2026001 for 10 SSD units. Only 8 available.',
      time: '2m ago',
      actionHref: '/decision-center',
      actionLabel: 'Solve Allocation',
      isRead: false,
    },
    {
      id: 'notif-2',
      severity: 'Critical',
      category: 'Inventory',
      title: 'Epinephrine Auto-Injector Below Safety Level',
      message: 'SKU-MED-039 is down to 6 units in Secure Cage B. Automatic PO prepared.',
      time: '8m ago',
      actionHref: '/decision-center',
      actionLabel: 'Review Reorder',
      isRead: false,
    },
    {
      id: 'notif-3',
      severity: 'Warning',
      category: 'Logistics',
      title: 'Highway 87 Storm Front Alert',
      message: 'Approaching thunderstorm front. Recommended advancing express courier pickup by 45 mins.',
      time: '15m ago',
      actionHref: '/decision-center',
      actionLabel: 'Dispatch Early',
      isRead: false,
    },
    {
      id: 'notif-4',
      severity: 'Info',
      category: 'Workforce',
      title: 'Shift Load Rebalance Executed',
      message: 'Carlos Mendez & Devon Brooks reassigned to Pack Station 3 to clear tote backlog.',
      time: '32m ago',
      actionHref: '/employees',
      actionLabel: 'View Shift Roster',
      isRead: true,
    },
    {
      id: 'notif-5',
      severity: 'Success',
      category: 'AI Core',
      title: 'AI Operations Director Analysis Completed',
      message: 'Shift operational health scored at 91% with 3 strategic risk mitigations logged.',
      time: '45m ago',
      actionHref: '/ai-assistant',
      actionLabel: 'Open Briefing',
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'Warning':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Success':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    Live Operations Feed
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                        {unreadCount} new
                      </span>
                    )}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Real-time operational alerts &amp; event triggers
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={markAllRead}
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Mark all as read
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="text-slate-400 hover:text-rose-400 font-semibold flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                <span>Clear feed</span>
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {notifications.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-2 text-slate-500 text-xs">
                  <CheckCircle2 className="h-8 w-8 text-slate-600" />
                  <p>All operational alerts have been reviewed.</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`relative p-4 rounded-xl border transition-all space-y-2.5 ${
                      notif.isRead
                        ? 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                        : 'bg-slate-950 border-blue-500/40 shadow-lg text-white'
                    }`}
                  >
                    {!notif.isRead && (
                      <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded border ${getSeverityBadge(
                          notif.severity
                        )}`}
                      >
                        ● {notif.severity}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {notif.time}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold leading-tight">
                        {notif.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {notif.message}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {notif.category}
                      </span>

                      <Link
                        href={notif.actionHref}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 font-bold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <span>{notif.actionLabel}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 text-center text-xs text-slate-500">
              WarehouseIQ Event Gateway • Connected to Hub East-01
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
