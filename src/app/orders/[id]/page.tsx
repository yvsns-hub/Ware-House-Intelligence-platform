'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ShoppingCart,
  MapPin,
  Users,
  Truck,
  ShieldCheck,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCw,
  FileText,
  Boxes,
} from 'lucide-react';
import { useOrder, useUpdateOrder, useEmployees } from '@/hooks';
import {
  OrderStatusBadge,
  PriorityBadge,
  CustomerTierBadge,
} from '@/components/ui/StatusBadge';
import { OrderTimeline } from '@/components/ui/Timeline';
import { CardSkeleton, TableSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types';

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const orderId = params?.id || '';

  const { data: order, isLoading, error } = useOrder(orderId);
  const { data: employees } = useEmployees();
  const updateOrderMutation = useUpdateOrder();

  const [isAdvancing, setIsAdvancing] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const statusProgression: OrderStatus[] = [
    'PENDING',
    'PROCESSING',
    'PICKED',
    'PACKED',
    'SHIPPED',
    'DELIVERED',
  ];

  const handleAdvanceStatus = async () => {
    if (!order) return;
    const currentIdx = statusProgression.indexOf(order.status as OrderStatus);
    if (currentIdx === -1 || currentIdx >= statusProgression.length - 1) return;

    const nextStatus = statusProgression[currentIdx + 1];
    setIsAdvancing(true);
    setSuccessToast(null);

    try {
      await updateOrderMutation.mutateAsync({
        id: order.id,
        data: { status: nextStatus },
      });
      setSuccessToast(`Order #${order.orderNumber} successfully advanced to ${nextStatus}!`);
      setTimeout(() => setSuccessToast(null), 5000);
    } catch (err: any) {
      alert(err.message || 'Failed to update order status');
    } finally {
      setIsAdvancing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-3">
          <div className="h-9 w-24 bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-9 w-48 bg-slate-800 rounded-lg animate-pulse" />
        </div>
        <CardSkeleton />
        <TableSkeleton rows={4} cols={5} />
      </div>
    );
  }

  if (error || !order) {
    return (
      <EmptyState
        title="Order not found"
        description={`We could not locate an order matching identifier '${orderId}'.`}
        actionLabel="Return to Orders Queue"
        onAction={() => router.push('/orders')}
      />
    );
  }

  // Assigned picker & packer simulation based on order ID
  const assignedPicker = employees?.find((e) => e.role === 'Picker') || {
    name: 'Sarah Jenkins',
    role: 'Picker',
    shift: 'Morning',
    efficiencyScore: 92.4,
  };

  const assignedPacker = employees?.find((e) => e.role === 'Packer') || {
    name: 'James Wilson',
    role: 'Packer',
    shift: 'Morning',
    efficiencyScore: 94.0,
  };

  const isCompleted = order.status === 'DELIVERED';
  const currentStatusIdx = statusProgression.indexOf(order.status as OrderStatus);
  const nextStatusLabel =
    currentStatusIdx !== -1 && currentStatusIdx < statusProgression.length - 1
      ? statusProgression[currentStatusIdx + 1]
      : null;

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumbs & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/orders"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Orders</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="font-mono font-bold text-white text-base">
            {order.orderNumber}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {nextStatusLabel && (
            <button
              type="button"
              onClick={handleAdvanceStatus}
              disabled={isAdvancing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>
                {isAdvancing ? 'Advancing...' : `Advance to ${nextStatusLabel}`}
              </span>
            </button>
          )}

          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {successToast && (
        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Main Order Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CustomerTierBadge tier={order.customerTier} />
              <PriorityBadge priority={order.priority} />
              <span className="text-xs text-slate-400">
                Created: {formatDate(order.createdAt)}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {order.customerName}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Order Value</span>
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                {formatCurrency(order.orderValue)}
              </span>
            </div>
            <div className="text-right pl-6 border-l border-slate-800">
              <span className="text-xs text-slate-400 block">SLA Deadline</span>
              <span className="text-sm font-bold text-slate-200 font-mono">
                {formatDate(order.deliveryDeadline)}
              </span>
            </div>
          </div>
        </div>

        {/* 8-Stage Interactive Order Fulfillment Timeline */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-blue-400" />
              Autonomous Fulfillment Progress Pipeline
            </h3>
            <span className="text-xs text-slate-500 font-mono">Stage {currentStatusIdx + 1} of 8</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <OrderTimeline
              currentStatus={order.status}
              createdAt={order.createdAt}
              deadline={order.deliveryDeadline}
            />
          </div>
        </div>
      </div>

      {/* Grid: Order Items & Picking Allocation Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Allocated Items List (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Boxes className="h-4 w-4 text-blue-400" />
              Allocated Order Items ({order.items?.length ?? 0})
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Total Units: {order.totalItems}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Item SKU / Product</th>
                    <th className="py-3.5 px-4">Picking Location</th>
                    <th className="py-3.5 px-4 text-center">Ordered</th>
                    <th className="py-3.5 px-4 text-center">Allocated</th>
                    <th className="py-3.5 px-4 text-right">Unit Price</th>
                    <th className="py-3.5 px-4 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item) => {
                      const prod = item.product;
                      const unitPrice = prod?.unitPrice ?? 50;
                      const lineTotal = unitPrice * item.quantity;
                      return (
                        <tr key={item.id} className="hover:bg-slate-800/30">
                          <td className="py-3.5 px-4">
                            <div className="font-mono font-bold text-blue-400">
                              {prod?.sku || 'SKU-UNKNOWN'}
                            </div>
                            <div className="font-semibold text-white truncate max-w-[200px]">
                              {prod?.name || 'Warehouse Stock Item'}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 font-mono">
                            <span className="flex items-center gap-1 text-[11px] bg-slate-950 px-2 py-1 rounded border border-slate-800">
                              <MapPin className="h-3 w-3 text-blue-400" />
                              {prod?.warehouseLocation || 'Zone A [A-01-1]'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                            {item.quantity}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              {item.allocatedQuantity}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                            {formatCurrency(unitPrice)}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                            {formatCurrency(lineTotal)}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        No line items found for this order.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Assigned Workforce & Dispatch Metadata (1 col) */}
        <div className="space-y-6">
          {/* Assigned Workforce */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Users className="h-4 w-4 text-indigo-400" />
              Assigned Fulfillment Team
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-emerald-400">
                    Active Picker
                  </span>
                  <p className="text-xs font-bold text-white">
                    {assignedPicker.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Shift: {assignedPicker.shift} ({assignedPicker.efficiencyScore}% Eff)
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs">
                  PK
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-cyan-400">
                    Assigned Packer
                  </span>
                  <p className="text-xs font-bold text-white">
                    {assignedPacker.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Station: Pack Line Beta-02
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold text-xs">
                  PC
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Delivery Details */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-blue-400" />
              Carrier &amp; Dispatch Protocol
            </h3>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Shipping Method:</span>
                <span className="font-semibold text-slate-200">
                  {order.shippingType} Carrier
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Outbound Dock:</span>
                <span className="font-mono font-bold text-blue-400">Dock Bay 04</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tracking Reference:</span>
                <span className="font-mono text-slate-300">TRK-2026-X98102</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
