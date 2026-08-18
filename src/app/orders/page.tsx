'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Search,
  Filter,
  Clock,
  Zap,
  TrendingUp,
  RotateCcw,
  ExternalLink,
  Plus,
  AlertCircle,
  Truck,
} from 'lucide-react';
import { useOrders, useDashboardSummary } from '@/hooks';
import {
  OrderStatusBadge,
  PriorityBadge,
  CustomerTierBadge,
} from '@/components/ui/StatusBadge';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function OrdersPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const { data: dashboard } = useDashboardSummary();
  const { data: ordersData, isLoading } = useOrders({
    search: search || undefined,
    status: selectedStatus !== 'all' ? selectedStatus : undefined,
    priority: selectedPriority !== 'all' ? selectedPriority : undefined,
    customerTier: selectedTier !== 'all' ? selectedTier : undefined,
    page: currentPage,
    limit: pageSize,
  });

  const priorityTabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'URGENT', label: 'Urgent Priority', color: 'text-rose-400' },
    { id: 'HIGH', label: 'High Priority', color: 'text-amber-400' },
    { id: 'MEDIUM', label: 'Medium', color: 'text-blue-400' },
    { id: 'LOW', label: 'Low', color: 'text-slate-400' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Summary Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShoppingCart className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Order Fulfillment Queue
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400">
            Realtime SLA monitoring, multi-tier batch picking, and dynamic priority dispatch.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right pr-4 border-r border-slate-800 hidden md:block">
            <span className="text-xs text-slate-400 block">Pending Fulfillment</span>
            <span className="text-lg font-extrabold text-amber-400 font-mono">
              {dashboard?.orders.pendingOrders ?? 8} Orders
            </span>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-xs text-slate-400 block">SLA Fulfillment Rate</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">
              {dashboard?.orders.fulfillmentRate ?? 94.8}%
            </span>
          </div>
        </div>
      </div>

      {/* Priority Fast Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {priorityTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setSelectedPriority(tab.id);
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 ${
              selectedPriority === tab.id
                ? 'bg-blue-600/15 border-blue-500/40 text-blue-300 shadow-sm'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span className={tab.color}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search & Multi-Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={search}
            onChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            placeholder="Search by order # (ORD-...) or customer name..."
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg outline-none focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="PICKED">Picked</option>
            <option value="PACKED">Packed</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
          </select>

          {/* Customer Tier Filter */}
          <select
            value={selectedTier}
            onChange={(e) => {
              setSelectedTier(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg outline-none focus:border-blue-500"
          >
            <option value="all">All Customer Tiers</option>
            <option value="Platinum">Platinum (VIP)</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Standard">Standard</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedStatus('all');
              setSelectedPriority('all');
              setSelectedTier('all');
              setCurrentPage(1);
            }}
            className="p-2.5 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl overflow-hidden">
        {isLoading ? (
          <TableSkeleton rows={pageSize} cols={8} />
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
                  <th className="py-3.5 px-4">Deadline SLA</th>
                  <th className="py-3.5 px-4">Shipping</th>
                  <th className="py-3.5 px-4 text-center">Items</th>
                  <th className="py-3.5 px-4 text-right">Order Value</th>
                  <th className="py-3.5 px-4 text-center">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {ordersData.map((order) => {
                  const deadlineDate = new Date(order.deliveryDeadline);
                  const isUrgent = order.priority === 'URGENT';
                  return (
                    <tr
                      key={order.id}
                      onClick={() => router.push(`/orders/${order.id}`)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-400 group-hover:text-blue-300">
                        {order.orderNumber}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-white truncate max-w-[180px]">
                        {order.customerName}
                      </td>
                      <td className="py-3.5 px-4">
                        <CustomerTierBadge tier={order.customerTier} />
                      </td>
                      <td className="py-3.5 px-4">
                        <PriorityBadge priority={order.priority} />
                      </td>
                      <td className="py-3.5 px-4">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                        <span className={isUrgent ? 'text-rose-400 font-semibold' : ''}>
                          {formatDate(order.deliveryDeadline)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[11px] font-medium">
                          {order.shippingType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-200">
                        {order.totalItems}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-400 font-mono text-sm">
                        {formatCurrency(order.orderValue)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center text-slate-500 group-hover:text-blue-400 transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No orders found"
            description="Try relaxing your priority, status, or search filters."
            actionLabel="Reset Search & Filters"
            onAction={() => {
              setSearch('');
              setSelectedStatus('all');
              setSelectedPriority('all');
              setSelectedTier('all');
            }}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((dashboard?.orders.totalOrders ?? 50) / pageSize)}
          totalItems={dashboard?.orders.totalOrders ?? 50}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
