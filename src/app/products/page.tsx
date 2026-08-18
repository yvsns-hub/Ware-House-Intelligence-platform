'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter,
  ArrowUpDown,
  Building2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Boxes,
  DollarSign,
  Layers,
  Image as ImageIcon,
  Sun,
  Moon,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Eye,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Lock,
} from 'lucide-react';
import { useAuth, warehouseFacilities, UserRole } from '@/context/AuthContext';
import { Product, ProductCategory } from '@/types';
import Link from 'next/link';

interface PresetItem {
  label: string;
  url: string;
}

// Curated high quality presets for new products with guaranteed CDN image links
const CATEGORY_IMAGE_PRESETS: Record<string, PresetItem[]> = {
  Electronics: [
    { label: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' },
    { label: 'Smart Watch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80' },
    { label: 'Laptop PC', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80' },
    { label: 'DSLR Camera', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80' },
  ],
  Groceries: [
    { label: 'Red Apples', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80' },
    { label: 'Coffee Beans', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80' },
    { label: 'Honey Jar', url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80' },
    { label: 'Bakery Bread', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
  ],
  Medicine: [
    { label: 'First Aid Kit', url: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80' },
    { label: 'Capsules', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80' },
    { label: 'Stethoscope', url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=600&q=80' },
    { label: 'Vitamins', url: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80' },
  ],
  Fashion: [
    { label: 'Sneakers', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
    { label: 'Denim Jacket', url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80' },
    { label: 'Sunglasses', url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80' },
    { label: 'Travel Bag', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80' },
  ],
  Furniture: [
    { label: 'Modern Chair', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80' },
    { label: 'Sofa Couch', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
    { label: 'Desk Lamp', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80' },
    { label: 'Wooden Table', url: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=600&q=80' },
  ],
  Automotive: [
    { label: 'Motor Oil', url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80' },
    { label: 'Car Battery', url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80' },
    { label: 'Alloy Tire', url: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80' },
    { label: 'Steering Wheel', url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80' },
  ],
};

const CATEGORIES: ProductCategory[] = [
  'Electronics',
  'Groceries',
  'Medicine',
  'Fashion',
  'Furniture',
  'Automotive',
];

export default function ProductsDashboardPage() {
  const { role, user, activeFacility, login } = useAuth();

  // Theme state: default to Light Theme as requested
  const [isLightMode, setIsLightMode] = useState(true);

  // Products Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<string>('all');
  const [stockStatusFilter, setStockStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Electronics' as ProductCategory,
    description: '',
    stock: 50,
    reorderLevel: 20,
    unitPrice: 49.99,
    supplier: '',
    warehouseLocation: 'Standard [A-01-1]',
    warehouseId: 'hub-01',
    imageUrl: CATEGORY_IMAGE_PRESETS.Electronics[0].url,
  });

  // Fetch Products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/products?limit=100');
      const json = await res.json();
      if (json.success && json.data) {
        setProducts(json.data);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Show Toast
  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open Add Modal
  const openAddModal = () => {
    setFormData({
      name: '',
      sku: `SKU-${Date.now().toString().slice(-4)}`,
      category: 'Electronics',
      description: '',
      stock: 50,
      reorderLevel: 15,
      unitPrice: 39.99,
      supplier: 'Global Apex Logistics',
      warehouseLocation: 'Fast Moving [A-01-1]',
      warehouseId: activeFacility?.id || 'hub-01',
      imageUrl: CATEGORY_IMAGE_PRESETS.Electronics[0].url,
    });
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (p: Product) => {
    setProductToEdit(p);
    const catPresets = CATEGORY_IMAGE_PRESETS[p.category];
    const defaultUrl = catPresets ? catPresets[0].url : CATEGORY_IMAGE_PRESETS.Electronics[0].url;
    setFormData({
      name: p.name,
      sku: p.sku,
      category: p.category as ProductCategory,
      description: p.description || '',
      stock: p.stock,
      reorderLevel: p.reorderLevel,
      unitPrice: p.unitPrice,
      supplier: p.supplier,
      warehouseLocation: p.warehouseLocation,
      warehouseId: p.warehouseId || 'hub-01',
      imageUrl: p.imageUrl || defaultUrl,
    });
    setIsEditModalOpen(true);
  };

  // Handle Add Product Submit
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setProducts([json.data, ...products]);
        setIsAddModalOpen(false);
        showToast(`Product "${json.data.name}" added successfully!`);
      } else {
        showToast(json.error || 'Failed to add product', 'error');
      }
    } catch {
      showToast('Network error while adding product', 'error');
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productToEdit) return;
    try {
      const res = await fetch(`/api/products/${productToEdit.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setProducts(products.map((p) => (p.id === productToEdit.id ? json.data : p)));
        setIsEditModalOpen(false);
        setProductToEdit(null);
        showToast(`Product "${json.data.name}" updated successfully!`);
      } else {
        showToast(json.error || 'Failed to update product', 'error');
      }
    } catch {
      showToast('Network error while updating product', 'error');
    }
  };

  // Handle Quick Stock Change
  const handleQuickStockChange = async (p: Product, delta: number) => {
    const newStock = Math.max(0, p.stock + delta);
    try {
      // Optimistic update
      setProducts(products.map((item) => (item.id === p.id ? { ...item, stock: newStock } : item)));

      await fetch(`/api/products/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock }),
      });
      showToast(`Updated stock for ${p.sku}: ${newStock} units`);
    } catch {
      fetchProducts();
      showToast('Failed to update stock', 'error');
    }
  };

  // Handle Delete
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      const res = await fetch(`/api/products/${productToDelete.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        setProducts(products.filter((p) => p.id !== productToDelete.id));
        showToast(`Product ${productToDelete.sku} deleted from catalog.`);
        setProductToDelete(null);
      } else {
        showToast(json.error || 'Could not delete product', 'error');
      }
    } catch {
      showToast('Error deleting product', 'error');
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.supplier.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

      // Hub filter
      const matchesHub = selectedHub === 'all' || p.warehouseId === selectedHub;

      // Stock status filter
      let matchesStock = true;
      if (stockStatusFilter === 'low_stock') matchesStock = p.stock > 0 && p.stock <= p.reorderLevel;
      else if (stockStatusFilter === 'out_of_stock') matchesStock = p.stock === 0;
      else if (stockStatusFilter === 'in_stock') matchesStock = p.stock > p.reorderLevel;
      else if (stockStatusFilter === 'damaged') matchesStock = p.damagedStock > 0;

      return matchesSearch && matchesCategory && matchesHub && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, selectedHub, stockStatusFilter]);

  // Paginated View
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    const totalUnits = products.reduce((acc, p) => acc + p.stock, 0);
    const totalValue = products.reduce((acc, p) => acc + p.stock * p.unitPrice, 0);
    const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.reorderLevel).length;
    const outOfStockCount = products.filter((p) => p.stock === 0).length;

    return {
      totalProducts: products.length,
      totalUnits,
      totalValue,
      lowStockCount,
      outOfStockCount,
    };
  }, [products]);

  // ─────────────────────────────────────────────────────────────────────────────
  // ROLE ACCESS GUARD: ONLY FOR MANAGERS (ALL HUBS)
  // ─────────────────────────────────────────────────────────────────────────────
  if (role !== 'MANAGER') {
    return (
      <div className={`min-h-screen p-6 sm:p-10 flex items-center justify-center ${isLightMode ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-white'}`}>
        <div className={`max-w-md w-full p-8 rounded-3xl border text-center space-y-5 shadow-2xl ${isLightMode ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-slate-900 border-slate-800'}`}>
          <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center ring-1 ring-amber-500/30">
            <Lock className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black tracking-tight">Manager Login Required</h2>
            <p className="text-xs leading-relaxed text-slate-500">
              The <strong>Products Dashboard &amp; Stock Catalog</strong> is restricted exclusively to <strong>Hub Operations Managers</strong> across all 4 regional facilities.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => login('MANAGER', 'hub-01')}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              <span>Switch to Hub Manager Console</span>
            </button>

            <Link
              href="/"
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all ${isLightMode ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'}`}
            >
              Return to My Console
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // MAIN MANAGER PRODUCTS DASHBOARD (LIGHT THEME FIRST CLASS)
  // ─────────────────────────────────────────────────────────────────────────────
  const themeClasses = {
    bg: isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100',
    card: isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-xl',
    cardHover: isLightMode ? 'hover:border-blue-400 hover:shadow-md' : 'hover:border-blue-500/50 hover:shadow-blue-500/10',
    inputBg: isLightMode ? 'bg-slate-100/90 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100',
    subtext: isLightMode ? 'text-slate-500' : 'text-slate-400',
    badge: isLightMode ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-slate-800 text-slate-300 border-slate-700',
    border: isLightMode ? 'border-slate-200' : 'border-slate-800',
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themeClasses.bg} p-4 sm:p-8 space-y-6`}>
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl border shadow-xl flex items-center gap-2.5 text-xs font-bold ${
              toastMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-rose-50 text-rose-800 border-rose-300'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            )}
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* HEADER & TOP CONTROLS */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight">Products &amp; Stock Manager</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 uppercase font-mono">
                  Manager Suite
                </span>
              </div>
              <p className={`text-xs ${themeClasses.subtext}`}>
                Manage product catalog, stock replenishment levels, SKUs, and images across all 4 hubs.
              </p>
            </div>
          </div>
        </div>

        {/* Theme Toggle & Add Product Trigger */}
        <div className="flex items-center gap-2.5">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsLightMode(!isLightMode)}
            className={`p-2.5 rounded-2xl border transition-all flex items-center gap-2 text-xs font-bold ${
              isLightMode
                ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
                : 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800'
            }`}
            title="Toggle Light / Dark Theme"
          >
            {isLightMode ? <Moon className="h-4 w-4 text-slate-700" /> : <Sun className="h-4 w-4 text-amber-400" />}
            <span>{isLightMode ? 'Dark Theme' : 'Light Theme'}</span>
          </button>

          {/* Refresh Data */}
          <button
            type="button"
            onClick={fetchProducts}
            className={`p-2.5 rounded-2xl border transition-all ${
              isLightMode
                ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
            title="Refresh Product Catalog"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          {/* Add Product Button */}
          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 flex items-center gap-2 hover:scale-[1.02] active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* KPI METRIC CARDS (LIGHT THEME CRISP DESIGN) */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Catalog Items */}
        <div className={`p-4 sm:p-5 rounded-3xl border ${themeClasses.card} flex items-center justify-between`}>
          <div className="space-y-1">
            <div className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.subtext}`}>
              Catalog SKUs
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono">
              {metrics.totalProducts}
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>Active in 4 Regional Hubs</span>
            </div>
          </div>
          <div className="h-11 w-11 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <Boxes className="h-5 w-5" />
          </div>
        </div>

        {/* Total Units in Stock */}
        <div className={`p-4 sm:p-5 rounded-3xl border ${themeClasses.card} flex items-center justify-between`}>
          <div className="space-y-1">
            <div className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.subtext}`}>
              Total Stock Units
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono">
              {metrics.totalUnits.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 font-semibold">
              Across Standard &amp; Cold Storage
            </div>
          </div>
          <div className="h-11 w-11 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <Layers className="h-5 w-5" />
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className={`p-4 sm:p-5 rounded-3xl border ${themeClasses.card} flex items-center justify-between`}>
          <div className="space-y-1">
            <div className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.subtext}`}>
              Low / Critical Stock
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600">
              {metrics.lowStockCount}
            </div>
            <div className="text-[10px] text-amber-600 font-semibold">
              {metrics.outOfStockCount} items currently 0 stock
            </div>
          </div>
          <div className="h-11 w-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>

        {/* Total Stock Asset Value */}
        <div className={`p-4 sm:p-5 rounded-3xl border ${themeClasses.card} flex items-center justify-between`}>
          <div className="space-y-1">
            <div className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.subtext}`}>
              Catalog Asset Value
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600">
              ${(metrics.totalValue / 1000).toFixed(1)}k
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold">
              Real-time Wholesale Valuation
            </div>
          </div>
          <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* FILTER & SEARCH CONTROL BAR */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <div className={`p-4 sm:p-5 rounded-3xl border ${themeClasses.card} space-y-3`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search product name, SKU (e.g. SKU-ELE-004), or supplier..."
              className={`w-full h-10 pl-10 pr-4 text-xs rounded-xl outline-none transition-all border focus:border-blue-500 ${themeClasses.inputBg}`}
            />
          </div>

          {/* Filters: Category, Hub, Stock Status, View Mode */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className={`h-10 px-3 text-xs font-semibold rounded-xl outline-none border transition-all ${themeClasses.inputBg}`}
            >
              <option value="all">All Categories ({CATEGORIES.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Warehouse Hub Dropdown */}
            <select
              value={selectedHub}
              onChange={(e) => {
                setSelectedHub(e.target.value);
                setCurrentPage(1);
              }}
              className={`h-10 px-3 text-xs font-semibold rounded-xl outline-none border transition-all ${themeClasses.inputBg}`}
            >
              <option value="all">All Regional Hubs (4)</option>
              {warehouseFacilities.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.name}
                </option>
              ))}
            </select>

            {/* Stock Status Filter */}
            <select
              value={stockStatusFilter}
              onChange={(e) => {
                setStockStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className={`h-10 px-3 text-xs font-semibold rounded-xl outline-none border transition-all ${themeClasses.inputBg}`}
            >
              <option value="all">All Stock Statuses</option>
              <option value="in_stock">In Stock (Healthy)</option>
              <option value="low_stock">Low Stock (At Risk)</option>
              <option value="out_of_stock">Out of Stock (0)</option>
              <option value="damaged">Damaged Stock</option>
            </select>

            {/* View Mode Toggle: Grid vs Table */}
            <div className={`flex items-center p-1 rounded-xl border ${themeClasses.border} ${isLightMode ? 'bg-slate-100' : 'bg-slate-950'}`}>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid Image Cards View"
              >
                <Boxes className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Detailed Data Table View"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
          <div className={`flex items-center gap-2 ${themeClasses.subtext}`}>
            <span>Showing <strong>{filteredProducts.length}</strong> matching products</span>
            {selectedCategory !== 'all' && (
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                {selectedCategory}
              </span>
            )}
            {selectedHub !== 'all' && (
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
                {warehouseFacilities.find((f) => f.id === selectedHub)?.name}
              </span>
            )}
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedHub !== 'all' || stockStatusFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedHub('all');
                setStockStatusFilter('all');
                setCurrentPage(1);
              }}
              className="text-[11px] text-blue-600 hover:underline font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* PRODUCT DISPLAY: GRID VIEW WITH RICH IMAGES */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {paginatedProducts.map((p) => {
            const isLowStock = p.stock > 0 && p.stock <= p.reorderLevel;
            const isOutStock = p.stock === 0;
            const stockPct = Math.min(100, Math.round((p.stock / (p.reorderLevel * 2 || 40)) * 100));

            return (
              <div
                key={p.id}
                className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all group ${themeClasses.card} ${themeClasses.cardHover}`}
              >
                {/* Product Image & Badges */}
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={p.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80'}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Category Chip */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xl text-[10px] font-bold bg-slate-900/85 text-white backdrop-blur-md shadow-md">
                    {p.category}
                  </span>

                  {/* Stock Status Badge */}
                  <span
                    className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-md flex items-center gap-1 ${
                      isOutStock
                        ? 'bg-rose-500 text-white'
                        : isLowStock
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-500 text-white'
                    }`}
                  >
                    {isOutStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : `${p.stock} Units`}
                  </span>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-white/95 text-slate-900 font-extrabold text-xs shadow-md">
                    ${Number(p.unitPrice).toFixed(2)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-slate-400 font-bold">
                      <span>{p.sku}</span>
                      <span className="truncate max-w-[110px] text-[10px] text-blue-600">{p.warehouseLocation}</span>
                    </div>
                    <h3 className="text-sm font-extrabold leading-snug line-clamp-2" title={p.name}>
                      {p.name}
                    </h3>
                    <p className={`text-[11px] line-clamp-2 ${themeClasses.subtext}`}>
                      {p.description || `High demand inventory unit supplied by ${p.supplier}.`}
                    </p>
                  </div>

                  {/* Stock Level Bar */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className={themeClasses.subtext}>Stock vs Reorder ({p.reorderLevel})</span>
                      <span className={isOutStock ? 'text-rose-600' : isLowStock ? 'text-amber-600' : 'text-emerald-600'}>
                        {p.stock} units
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isOutStock ? 'w-0' : isLowStock ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${stockPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Quick Stock Adjuster (+ / -) & Action Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-1">
                    {/* Quick Stock Adjuster */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleQuickStockChange(p, -5)}
                        disabled={p.stock <= 0}
                        className={`px-2 py-1 rounded-lg text-xs font-bold border transition-colors disabled:opacity-30 ${
                          isLightMode ? 'bg-slate-100 hover:bg-slate-200 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 border-slate-700'
                        }`}
                        title="Reduce stock by 5"
                      >
                        -5
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickStockChange(p, 10)}
                        className={`px-2 py-1 rounded-lg text-xs font-bold border transition-colors ${
                          isLightMode ? 'bg-slate-100 hover:bg-slate-200 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 border-slate-700'
                        }`}
                        title="Add 10 units to stock"
                      >
                        +10
                      </button>
                    </div>

                    {/* Edit & Delete Action Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 border border-blue-200 transition-colors"
                        title="Edit Product Details"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setProductToDelete(p)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────────────── */
        /* DETAILED DATA TABLE VIEW */
        /* ─────────────────────────────────────────────────────────────────────── */
        <div className={`rounded-3xl border overflow-hidden ${themeClasses.card}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b ${isLightMode ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>
                <tr>
                  <th className="py-3 px-4 font-bold">Product</th>
                  <th className="py-3 px-4 font-bold">SKU</th>
                  <th className="py-3 px-4 font-bold">Category</th>
                  <th className="py-3 px-4 font-bold">Location</th>
                  <th className="py-3 px-4 font-bold">Price</th>
                  <th className="py-3 px-4 font-bold">Stock</th>
                  <th className="py-3 px-4 font-bold">Reorder</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${themeClasses.border}`}>
                {paginatedProducts.map((p) => (
                  <tr key={p.id} className={`transition-colors ${isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-800/50'}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=80'}
                          alt={p.name}
                          className="h-10 w-10 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold">{p.name}</div>
                          <div className={`text-[10px] ${themeClasses.subtext}`}>{p.supplier}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold">{p.sku}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-500">{p.warehouseLocation}</td>
                    <td className="py-3 px-4 font-bold font-mono">${Number(p.unitPrice).toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                          p.stock === 0
                            ? 'bg-rose-100 text-rose-800'
                            : p.stock <= p.reorderLevel
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">{p.reorderLevel}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleQuickStockChange(p, 10)}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold border"
                        >
                          +10
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(p)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setProductToDelete(p)}
                          className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* PAGINATION CONTROLS */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className={`p-4 rounded-3xl border flex items-center justify-between text-xs ${themeClasses.card}`}>
          <span className={themeClasses.subtext}>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({filteredProducts.length} items)
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-xl border disabled:opacity-30 ${isLightMode ? 'bg-white hover:bg-slate-100 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 border-slate-700'}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-xl border disabled:opacity-30 ${isLightMode ? 'bg-white hover:bg-slate-100 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 border-slate-700'}`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* ADD / EDIT PRODUCT MODAL */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {(isAddModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`max-w-4xl w-full p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 my-8 ${
                isLightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                    {isAddModalOpen ? <Plus className="h-5 w-5" /> : <Edit3 className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-extrabold tracking-tight">
                        {isAddModalOpen ? 'Add New Product Item' : `Edit Product: ${productToEdit?.sku}`}
                      </h2>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 uppercase font-mono">
                        {formData.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Configure stock replenishment, pricing, bin location, and visual assets.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                  }}
                  className={`p-2 rounded-xl text-slate-400 hover:text-slate-700 transition-colors ${
                    isLightMode ? 'hover:bg-slate-100' : 'hover:bg-slate-800'
                  }`}
                >
                  ✕
                </button>
              </div>

              {/* Form Body - 2 Columns */}
              <form onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column (7 cols): Product Specifications */}
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-500" />
                      Product Specifications
                    </h3>

                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                        className={`w-full h-10 px-3.5 text-xs rounded-xl border outline-none font-semibold transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${themeClasses.inputBg}`}
                      />
                    </div>

                    {/* SKU & Category */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          SKU Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.sku}
                          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                          placeholder="e.g. SKU-ELE-004"
                          className={`w-full h-10 px-3.5 text-xs rounded-xl border outline-none font-mono font-bold transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${themeClasses.inputBg}`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => {
                            const cat = e.target.value as ProductCategory;
                            const presets = CATEGORY_IMAGE_PRESETS[cat];
                            const defaultImg = presets && presets.length ? presets[0].url : formData.imageUrl;
                            setFormData({ ...formData, category: cat, imageUrl: defaultImg });
                          }}
                          className={`w-full h-10 px-3.5 text-xs rounded-xl border outline-none font-semibold transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${themeClasses.inputBg}`}
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Stock & Reorder */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Initial Stock (Units) *
                        </label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                          className={`w-full h-10 px-3.5 text-xs rounded-xl border outline-none font-mono font-bold transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${themeClasses.inputBg}`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Reorder Threshold *
                        </label>
                        <input
                          type="number"
                          required
                          min={1}
                          value={formData.reorderLevel}
                          onChange={(e) => setFormData({ ...formData, reorderLevel: Number(e.target.value) })}
                          className={`w-full h-10 px-3.5 text-xs rounded-xl border outline-none font-mono font-bold transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${themeClasses.inputBg}`}
                        />
                      </div>
                    </div>

                    {/* Unit Price & Supplier */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Unit Price ($ USD) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          min={0.01}
                          value={formData.unitPrice}
                          onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                          className={`w-full h-10 px-3.5 text-xs rounded-xl border outline-none font-mono font-bold transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${themeClasses.inputBg}`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Supplier Network *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.supplier}
                          onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                          placeholder="e.g. Apex Display Corp"
                          className={`w-full h-10 px-3.5 text-xs rounded-xl border outline-none font-semibold transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${themeClasses.inputBg}`}
                        />
                      </div>
                    </div>

                    {/* Location & Hub */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Bin Staging Location *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.warehouseLocation}
                          onChange={(e) => setFormData({ ...formData, warehouseLocation: e.target.value })}
                          placeholder="e.g. Fast Moving [A-01-1]"
                          className={`w-full h-10 px-3.5 text-xs rounded-xl border outline-none font-semibold transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${themeClasses.inputBg}`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Warehouse Facility Hub *
                        </label>
                        <select
                          value={formData.warehouseId}
                          onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}
                          className={`w-full h-10 px-3.5 text-xs rounded-xl border outline-none font-semibold transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${themeClasses.inputBg}`}
                        >
                          {warehouseFacilities.map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (5 cols): Visual Asset & Live Image Preview */}
                  <div className="lg:col-span-5 space-y-4 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 dark:bg-slate-950/60">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                        Visual Product Assets
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Live Preview
                      </span>
                    </h3>

                    {/* Live Image Preview Card */}
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-300 bg-white shadow-sm group">
                      <img
                        src={formData.imageUrl}
                        alt={formData.name || 'Product Image Preview'}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback placeholder image if URL fails
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';
                        }}
                      />

                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-md">
                        {formData.category || 'Product'}
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-white/90 text-slate-900 backdrop-blur-md shadow-md flex items-center justify-between">
                        <span className="text-xs font-extrabold truncate max-w-[150px]">
                          {formData.name || 'Product Name Preview'}
                        </span>
                        <span className="text-xs font-black font-mono text-blue-600">
                          ${Number(formData.unitPrice || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Google Image URL Search Tip */}
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] leading-relaxed space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                        <span>Google Image Search Helper</span>
                      </div>
                      <p className="text-slate-600">
                        Copy any image address from Google Search (Right-click image &rarr; <b>&quot;Copy image address&quot;</b>) and paste below!
                      </p>
                    </div>

                    {/* Image URL Input */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Image Direct Web URL
                      </label>
                      <input
                        type="url"
                        required
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="Paste image link e.g. https://..."
                        className={`w-full h-10 px-3.5 text-xs rounded-xl border outline-none font-mono transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${themeClasses.inputBg}`}
                      />
                    </div>

                    {/* Category Presets Gallery with Visual Cards */}
                    {CATEGORY_IMAGE_PRESETS[formData.category] && (
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-bold text-slate-500 block">
                          Or Click a Verified Preset for {formData.category}:
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {CATEGORY_IMAGE_PRESETS[formData.category].map((preset, i) => {
                            const isSelected = formData.imageUrl === preset.url;
                            return (
                              <div
                                key={i}
                                onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                                className={`p-1.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2 ${
                                  isSelected
                                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-400/30'
                                    : 'border-slate-200 bg-white hover:border-slate-300 hover:scale-[1.02]'
                                }`}
                              >
                                <img
                                  src={preset.url}
                                  alt={preset.label}
                                  className="h-10 w-10 rounded-lg object-cover border border-slate-200 shrink-0"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';
                                  }}
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="text-[11px] font-bold truncate text-slate-800">
                                    {preset.label}
                                  </div>
                                  <div className="text-[9px] text-blue-600 font-semibold">
                                    {isSelected ? '✓ Selected' : 'Click to use'}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setIsEditModalOpen(false);
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                      isLightMode
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isAddModalOpen ? 'Save Product to Catalog' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {productToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`max-w-md w-full p-6 rounded-3xl border shadow-2xl space-y-4 ${isLightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'}`}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Trash2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Delete Product Item?</h3>
                  <p className="text-xs text-slate-500 font-mono">{productToDelete.sku}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
                <img
                  src={productToDelete.imageUrl}
                  alt={productToDelete.name}
                  className="h-12 w-12 rounded-xl object-cover border border-rose-300 shrink-0"
                />
                <div>
                  <div className="font-bold">{productToDelete.name}</div>
                  <div className="text-[11px]">{productToDelete.stock} units in inventory will be delisted.</div>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to permanently remove this product from the warehouse intelligence catalog? This action cannot be undone.
              </p>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProductToDelete(null)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border ${isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteProduct}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Confirm Delete</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
