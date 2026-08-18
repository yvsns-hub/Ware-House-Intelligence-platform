'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Package,
  MapPin,
  Truck,
  TrendingUp,
  AlertTriangle,
  History,
  ShieldCheck,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';
import { Product } from '@/types';
import { StockStatusBadge } from './StatusBadge';
import { useUpdateProduct } from '@/hooks';
import { formatCurrency, formatDate } from '@/lib/utils';

export function ProductDrawer({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const updateProductMutation = useUpdateProduct();
  const [stockDelta, setStockDelta] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!product) return null;

  const handleStockAdjustment = async (type: 'add' | 'deduct') => {
    if (stockDelta <= 0) return;
    setIsUpdating(true);
    setFeedback(null);

    const newStock =
      type === 'add'
        ? product.stock + stockDelta
        : Math.max(0, product.stock - stockDelta);

    try {
      await updateProductMutation.mutateAsync({
        id: product.id,
        data: { stock: newStock },
      });
      setFeedback(`Stock successfully adjusted to ${newStock} units.`);
      setStockDelta(0);
    } catch (err: any) {
      setFeedback(err.message || 'Failed to update stock');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md md:max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    {product.sku}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {product.category}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {product.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Status & Demand Header */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-400">Inventory Status</p>
                  <StockStatusBadge
                    stock={product.stock}
                    reorderLevel={product.reorderLevel}
                    damagedStock={product.damagedStock}
                  />
                </div>
                <div className="text-right space-y-0.5">
                  <p className="text-xs text-slate-400">Demand Score</p>
                  <div className="flex items-center gap-1 justify-end font-bold text-amber-400 text-sm">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{product.demandScore.toFixed(1)} / 10</span>
                  </div>
                </div>
              </div>

              {/* Stock Breakdown Grid */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Stock Breakdown
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/80">
                    <div className="text-xs text-slate-400">Total Stock</div>
                    <div className="text-lg font-bold text-white mt-1">
                      {product.stock}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/80">
                    <div className="text-xs text-slate-400">Reserved</div>
                    <div className="text-lg font-bold text-amber-400 mt-1">
                      {product.reservedStock}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/80">
                    <div className="text-xs text-slate-400">Available</div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">
                      {Math.max(0, product.stock - product.reservedStock)}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/80">
                    <div className="text-xs text-slate-400">Damaged</div>
                    <div className="text-lg font-bold text-rose-400 mt-1">
                      {product.damagedStock}
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Commercial Info */}
              <div className="space-y-3 p-4 bg-slate-950/40 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-blue-400" />
                    Warehouse Location
                  </span>
                  <span className="font-semibold text-slate-200 font-mono">
                    {product.warehouseLocation}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-indigo-400" />
                    Primary Supplier
                  </span>
                  <span className="font-semibold text-slate-200">
                    {product.supplier}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    Unit Price
                  </span>
                  <span className="font-bold text-emerald-400 text-sm font-mono">
                    {formatCurrency(product.unitPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    Reorder Threshold
                  </span>
                  <span className="font-semibold text-slate-200">
                    {product.reorderLevel} units
                  </span>
                </div>
              </div>

              {/* Quick Stock Adjustment Form */}
              <div className="space-y-3 p-4 bg-blue-950/20 rounded-xl border border-blue-900/30">
                <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  Quick Stock Adjustment
                </h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={stockDelta || ''}
                    onChange={(e) => setStockDelta(Number(e.target.value))}
                    placeholder="Enter units (e.g. 10)"
                    className="flex-1 h-9 px-3 bg-slate-900 border border-slate-700 text-xs text-white rounded-lg outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleStockAdjustment('add')}
                    disabled={isUpdating || stockDelta <= 0}
                    className="flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStockAdjustment('deduct')}
                    disabled={isUpdating || stockDelta <= 0}
                    className="flex items-center gap-1 px-3 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                    Deduct
                  </button>
                </div>
                {feedback && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {feedback}
                  </p>
                )}
              </div>

              {/* Movement & Transaction Log */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <History className="h-3.5 w-3.5 text-slate-400" />
                    Movement History
                  </h3>
                  <span className="text-[10px] text-slate-500">
                    Latest Transactions
                  </span>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {product.inventoryTransactions && product.inventoryTransactions.length > 0 ? (
                    product.inventoryTransactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                              tx.type === 'Inbound'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : tx.type === 'Outbound'
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : tx.type === 'Damaged'
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {tx.type}
                          </span>
                          <span className="font-semibold text-slate-200">
                            {tx.quantity} units
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {formatDate(tx.timestamp)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-500 bg-slate-950/30 rounded-lg border border-slate-800/50">
                      No recent movement transactions recorded for this SKU.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Created: {formatDate(product.createdAt)}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
