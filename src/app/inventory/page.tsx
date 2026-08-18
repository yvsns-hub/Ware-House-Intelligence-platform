'use client';

import React, { useState } from 'react';
import {
  Boxes,
  Search,
  Filter,
  AlertTriangle,
  PackageX,
  ShieldAlert,
  ArrowUpDown,
  Download,
  MapPin,
  ExternalLink,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { useProducts, useDashboardSummary } from '@/hooks';
import { Product } from '@/types';
import { StockStatusBadge } from '@/components/ui/StatusBadge';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductDrawer } from '@/components/ui/ProductDrawer';
import { formatCurrency } from '@/lib/utils';

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | 'in_stock' | 'low_stock' | 'out_of_stock' | 'damaged'
  >('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'stock' | 'unitPrice' | 'demandScore'>('stock');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const pageSize = 15;

  const { data: dashboard } = useDashboardSummary();
  const { data: productsData, isLoading } = useProducts({
    search: search || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    status: selectedStatus !== 'all' ? selectedStatus : undefined,
    page: currentPage,
    limit: pageSize,
    sortBy,
    sortOrder,
  });

  const categories = [
    'All',
    'Electronics',
    'Groceries',
    'Medicine',
    'Fashion',
    'Furniture',
    'Automotive',
  ];

  const stockFilters = [
    { id: 'all', label: 'All Items', count: dashboard?.inventory.totalProducts ?? 100 },
    { id: 'low_stock', label: 'Low Stock', count: dashboard?.inventory.lowStockCount ?? 6, color: 'text-amber-400' },
    { id: 'out_of_stock', label: 'Out of Stock', count: dashboard?.inventory.outOfStockCount ?? 5, color: 'text-rose-400' },
    { id: 'damaged', label: 'Damaged', count: dashboard?.inventory.damagedStockCount ?? 4, color: 'text-orange-400' },
  ];

  const handleSort = (field: 'name' | 'stock' | 'unitPrice' | 'demandScore') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Boxes className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Warehouse Inventory Intelligence
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400">
            Real-time multi-zone catalog containing 100 SKUs with bin-level stock allocation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right pr-3 border-r border-slate-800 hidden md:block">
            <span className="text-xs text-slate-400 block">Total Catalog Units</span>
            <span className="text-lg font-extrabold text-white font-mono">
              {dashboard?.inventory.totalStockUnits?.toLocaleString() ?? '7,322'}
            </span>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-xs text-slate-400 block">Asset Valuation</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">
              {formatCurrency(dashboard?.inventory.totalStockValue ?? 573847)}
            </span>
          </div>
        </div>
      </div>

      {/* Stock Status Fast Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {stockFilters.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setSelectedStatus(tab.id as any);
              setCurrentPage(1);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 ${
              selectedStatus === tab.id
                ? 'bg-blue-600/15 border-blue-500/40 text-blue-300 shadow-sm'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-950 border border-slate-800 ${
                tab.color || 'text-slate-300'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filter & Search Bar Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={search}
            onChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            placeholder="Search by SKU, product name, supplier..."
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg outline-none focus:border-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c.toLowerCase() === 'all' ? 'all' : c}>
                  {c} Category
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedStatus('all');
              setCurrentPage(1);
            }}
            className="p-2.5 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Inventory Data Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-xl overflow-hidden">
        {isLoading ? (
          <TableSkeleton rows={pageSize} cols={8} />
        ) : productsData && productsData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">SKU</th>
                  <th
                    className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      <span>Product</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">Category</th>
                  <th
                    className="py-3.5 px-4 text-center cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('stock')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Available / Stock</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-center">Reserved</th>
                  <th className="py-3.5 px-4 text-center">Damaged</th>
                  <th className="py-3.5 px-4 text-center">Reorder Lvl</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th
                    className="py-3.5 px-4 text-right cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('unitPrice')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Unit Price</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {productsData.map((prod) => {
                  const available = Math.max(0, prod.stock - prod.reservedStock);
                  return (
                    <tr
                      key={prod.id}
                      onClick={() => setSelectedProduct(prod)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-blue-400 group-hover:text-blue-300">
                        {prod.sku}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white truncate max-w-[200px]">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {prod.supplier}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-medium">
                          {prod.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="font-bold text-white font-mono">
                          {available}{' '}
                          <span className="text-slate-500 font-normal">/ {prod.stock}</span>
                        </div>
                        <div className="w-16 mx-auto bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full ${
                              prod.stock === 0
                                ? 'bg-rose-500'
                                : prod.stock <= prod.reorderLevel
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{
                              width: `${Math.min(100, (prod.stock / (prod.reorderLevel * 3)) * 100)}%`,
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-amber-400 font-medium">
                        {prod.reservedStock}
                      </td>
                      <td className="py-3 px-4 text-center font-mono">
                        {prod.damagedStock > 0 ? (
                          <span className="text-rose-400 font-bold">
                            {prod.damagedStock}
                          </span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-slate-400">
                        {prod.reorderLevel}
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-mono text-[11px]">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-blue-400 shrink-0" />
                          <span className="truncate max-w-[140px]">
                            {prod.warehouseLocation}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                        {formatCurrency(prod.unitPrice)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <StockStatusBadge
                          stock={prod.stock}
                          reorderLevel={prod.reorderLevel}
                          damagedStock={prod.damagedStock}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No inventory products found"
            description="Try changing your search keywords or stock filter settings."
            actionLabel="Reset Search & Filters"
            onAction={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
          />
        )}

        {/* Pagination Bar */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((dashboard?.inventory.totalProducts ?? 100) / pageSize)}
          totalItems={dashboard?.inventory.totalProducts ?? 100}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Product Details Drawer */}
      <ProductDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
