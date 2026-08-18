'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  Users,
  Map,
  BrainCircuit,
  BarChart3,
  Bot,
  Settings,
  Sparkles,
  Layers,
  CheckCircle2,
  Globe,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isComingSoon?: boolean;
  badge?: string;
}

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const { role, user, activeFacility, isAuthenticated } = useAuth();

  // If on login page or not authenticated, hide sidebar
  if (!isAuthenticated || pathname === '/login') {
    return null;
  }

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Role-Specific Navigation Definitions
  let mainNavItems: NavItem[] = [];
  let intelligenceNavItems: NavItem[] = [];
  let bottomNavItems: NavItem[] = [];

  if (role === 'PICKER') {
    mainNavItems = [
      {
        label: 'Assigned Pick Queue',
        href: '/',
        icon: Boxes,
      },
    ];
    intelligenceNavItems = [];
    bottomNavItems = [
      {
        label: 'About WarehouseIQ',
        href: '/about',
        icon: Layers,
      },
    ];
  } else if (role === 'HEAD') {
    mainNavItems = [
      {
        label: 'Global Network Command',
        href: '/',
        icon: Globe,
      },
    ];
    intelligenceNavItems = [
      {
        label: 'Decision Center',
        href: '/decision-center',
        icon: BrainCircuit,
        badge: 'Network AI',
      },
      {
        label: 'Analytics Suite',
        href: '/analytics',
        icon: BarChart3,
        badge: 'Live',
      },
      {
        label: 'AI Assistant',
        href: '/ai-assistant',
        icon: Bot,
        badge: 'Co-Pilot',
      },
    ];
    bottomNavItems = [
      {
        label: 'About Platform',
        href: '/about',
        icon: Layers,
      },
      {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
      },
    ];
  } else {
    // MANAGER role - Full Single-Hub Management Suite
    mainNavItems = [
      {
        label: 'Operations Dashboard',
        href: '/',
        icon: LayoutDashboard,
      },
      {
        label: 'Products Catalog',
        href: '/products',
        icon: Boxes,
        badge: 'Light Theme',
      },
      {
        label: 'Orders Queue',
        href: '/orders',
        icon: ShoppingCart,
      },
      {
        label: 'Inventory Stock',
        href: '/inventory',
        icon: Layers,
      },
      {
        label: 'Workforce Roster',
        href: '/employees',
        icon: Users,
      },
      {
        label: 'Spatial 2D Map',
        href: '/warehouse',
        icon: Map,
      },
    ];

    intelligenceNavItems = [
      {
        label: 'Decision Center',
        href: '/decision-center',
        icon: BrainCircuit,
        badge: 'AI Core',
      },
      {
        label: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        badge: 'Live',
      },
      {
        label: 'AI Assistant',
        href: '/ai-assistant',
        icon: Bot,
        badge: 'Co-Pilot',
      },
    ];

    bottomNavItems = [
      {
        label: 'About Platform',
        href: '/about',
        icon: Layers,
      },
      {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
      },
    ];
  }

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-slate-950/95 border-r border-slate-800/80 backdrop-blur-xl transition-transform duration-300 ease-in-out md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-800/80">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
          <Layers className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold tracking-tight text-white">
              Warehouse<span className="text-blue-500">IQ</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30 uppercase">
              {role}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium tracking-wide">
            {role === 'PICKER' ? 'Operator Console' : role === 'HEAD' ? 'VP Global Supply Chain' : 'Hub Central Operations'}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {/* Main Operations Section */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {role === 'PICKER' ? 'Fulfillment' : role === 'HEAD' ? 'Enterprise' : 'Operations'}
          </p>
          <div className="space-y-0.5 pt-1">
            {mainNavItems.map((item) => {
              const active = isLinkActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group relative flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150',
                    active
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        'h-4 w-4 transition-colors',
                        active ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Intelligence / AI Section (Manager & Head Only) */}
        {intelligenceNavItems.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Intelligence
              </p>
              <Sparkles className="h-3 w-3 text-amber-400/80" />
            </div>
            <div className="space-y-0.5 pt-1">
              {intelligenceNavItems.map((item) => {
                const active = isLinkActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150',
                      active
                        ? 'bg-purple-600/15 text-purple-300 border border-purple-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          'h-4 w-4 transition-colors',
                          active ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200'
                        )}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* System & Settings Section */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            System
          </p>
          <div className="space-y-0.5 pt-1">
            {bottomNavItems.map((item) => {
              const active = isLinkActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150',
                    active
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        'h-4 w-4 transition-colors',
                        active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Operational Status Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-200 uppercase truncate max-w-[120px]">
                {role === 'PICKER' ? 'Operator Station' : role === 'HEAD' ? 'Global Network (4 Hubs)' : activeFacility.name}
              </span>
              <span className="text-[9px] text-slate-400">
                {role === 'PICKER' ? 'Assigned: Zone A & B' : role === 'HEAD' ? 'VP Command Active' : `${user.name} • Active`}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">Online</span>
        </div>
      </div>
    </aside>
  );
}
