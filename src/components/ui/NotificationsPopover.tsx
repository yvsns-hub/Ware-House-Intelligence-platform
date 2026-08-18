'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  type: 'critical' | 'warning' | 'info';
  time: string;
}

export function NotificationsPopover({ unreadCount = 4 }: { unreadCount?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Critical Low Stock Alert',
      desc: 'SKU-ELE-004 (HyperDrive SSD 2TB) is down to 8 units in Aisle B.',
      type: 'critical',
      time: '12m ago',
    },
    {
      id: 'notif-2',
      title: 'VIP Platinum Order Received',
      desc: 'Order #ORD-2026001 for Apex Logistics Hub has a 2-hr SameDay deadline.',
      type: 'warning',
      time: '24m ago',
    },
    {
      id: 'notif-3',
      title: 'Weather Transit Advisory',
      desc: 'High winds detected at Hub West. Inbound courier delays ~45m.',
      type: 'info',
      time: '1h ago',
    },
    {
      id: 'notif-4',
      title: 'Packing Station 3 Buffer Alert',
      desc: 'Picker throughput is exceeding packing velocity by 18%.',
      type: 'warning',
      time: '2h ago',
    },
  ]);

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/80 border border-slate-800 transition-colors"
        title="Notifications"
      >
        <Bell className="h-4 w-4" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-slate-950">
            {notifications.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Operational Alerts
                </span>
                {notifications.length > 0 && (
                  <span className="text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.2 rounded-full">
                    {notifications.length} New
                  </span>
                )}
              </div>

              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <CheckCheck className="h-3 w-3" />
                  Mark all read
                </button>
              )}
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 p-1">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 hover:bg-slate-800/40 rounded-lg transition-colors flex items-start gap-2.5 cursor-pointer"
                  >
                    <div className="mt-0.5 shrink-0">
                      {n.type === 'critical' ? (
                        <AlertCircle className="h-4 w-4 text-rose-400" />
                      ) : n.type === 'warning' ? (
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                      ) : (
                        <Info className="h-4 w-4 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-0.5 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-semibold text-slate-200 truncate">
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-500 shrink-0">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {n.desc}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-slate-500">
                  No unread alerts. All warehouse systems nominal.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-slate-800 bg-slate-950/40 text-center">
              <span className="text-[10px] text-slate-500">
                Connected to Warehouse Telemetry Realtime Stream
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
