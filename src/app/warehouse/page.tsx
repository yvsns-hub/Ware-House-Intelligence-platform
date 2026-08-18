'use client';

import React, { useState } from 'react';
import {
  Map,
  MapPin,
  Layers,
  Thermometer,
  Shield,
  Zap,
  Box,
  CheckCircle2,
  Info,
  ExternalLink,
} from 'lucide-react';
import { useLocations, useProducts, useDashboardSummary } from '@/hooks';
import { WarehouseLocation, WarehouseZone } from '@/types';
import { StatCard } from '@/components/ui/StatCard';
import { CardSkeleton } from '@/components/ui/LoadingSkeleton';
import { WarehouseTwinMap } from '@/components/warehouse/WarehouseTwinMap';


export default function WarehouseMapPage() {
  const { data: locations, isLoading } = useLocations();
  const { data: products } = useProducts({ limit: 100 });
  const { data: dashboard } = useDashboardSummary();

  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [activeLocation, setActiveLocation] = useState<WarehouseLocation | null>(null);

  const zones: Array<{
    id: WarehouseZone | 'all';
    label: string;
    aisle: string;
    color: string;
    border: string;
    bg: string;
    desc: string;
  }> = [
    {
      id: 'Fast Moving',
      label: 'Fast Moving Zone',
      aisle: 'Aisle A',
      color: 'text-blue-400',
      border: 'border-blue-500/40',
      bg: 'bg-blue-950/30',
      desc: 'High velocity consumable SKUs with rapid picker conveyor access',
    },
    {
      id: 'High Value',
      label: 'High Value Cage',
      aisle: 'Aisle B',
      color: 'text-purple-400',
      border: 'border-purple-500/40',
      bg: 'bg-purple-950/30',
      desc: 'Biometric access cage for electronics & high ticket items',
    },
    {
      id: 'Cold Storage',
      label: 'Cold Chain Storage',
      aisle: 'Aisle C',
      color: 'text-cyan-400',
      border: 'border-cyan-500/40',
      bg: 'bg-cyan-950/30',
      desc: 'Temperature controlled 2°C - 8°C zone for medicine & fresh food',
    },
    {
      id: 'Bulk Cargo',
      label: 'Bulk Cargo & Pallets',
      aisle: 'Aisle D',
      color: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/30',
      desc: 'High bay pallet racking for heavy machinery & furniture',
    },
    {
      id: 'Standard',
      label: 'Standard Storage',
      aisle: 'Aisle E',
      color: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/30',
      desc: 'General shelving for apparel, tools, and dry goods',
    },
  ];

  const filteredLocations = (locations || []).filter((loc) => {
    if (selectedZone === 'all') return true;
    return loc.zone === selectedZone;
  });

  // Calculate matching products stored at active location
  const productsAtActiveLocation = (products || []).filter((p) => {
    if (!activeLocation) return false;
    return p.warehouseLocation?.includes(`${activeLocation.aisle}-${activeLocation.rack}-${activeLocation.shelf}`);
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Map className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Warehouse Spatial Map &amp; Digital Twin
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400">
            2D floor plan visualization across 5 specialized operational zones, heatmaps, and bay density.
          </p>
        </div>
      </div>

      {/* 2D Digital Twin Heatmap Map */}
      <WarehouseTwinMap />


      {/* Zone Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {zones.map((zone) => {
          const locCount = (locations || []).filter((l) => l.zone === zone.id).length;
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => setSelectedZone(selectedZone === zone.id ? 'all' : zone.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedZone === zone.id
                  ? `${zone.bg} ${zone.border} ring-2 ring-blue-500/20 scale-[1.02]`
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {zone.aisle}
                </span>
                <span className={`text-xs font-bold ${zone.color}`}>{locCount} Bins</span>
              </div>
              <h4 className="text-sm font-bold text-white mt-1">{zone.label}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{zone.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Main Floor Plan Grid & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Map Layout (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-sm shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-400" />
                Floor Plan Bay Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Click any rack/shelf bin to inspect storage occupancy &amp; stored items
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/40 border border-emerald-500" />
                Occupied
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2.5 h-2.5 rounded bg-blue-500/40 border border-blue-500" />
                Selected
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="h-16 bg-slate-800 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {filteredLocations.map((loc) => {
                const isSelected = activeLocation?.id === loc.id;
                const zoneObj = zones.find((z) => z.id === loc.zone);
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setActiveLocation(loc)}
                    className={`flex flex-col items-center justify-between p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30 scale-105 ring-2 ring-white/20'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-600 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-70">
                      {loc.aisle}-{loc.rack}
                    </span>
                    <span className="text-sm font-extrabold my-0.5">S{loc.shelf}</span>
                    <span
                      className={`text-[8px] font-bold px-1 rounded truncate w-full ${
                        isSelected
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {loc.zone.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Showing {filteredLocations.length} active location bays</span>
            <span>Warehouse Grid 40x Bin Density Nominal</span>
          </div>
        </div>

        {/* Location Inspector Card (1 col) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-sm shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-blue-400" />
              Location Bay Inspector
            </h3>
            {activeLocation && (
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {activeLocation.id}
              </span>
            )}
          </div>

          {activeLocation ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Zone Assignment:</span>
                  <span className="text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {activeLocation.zone}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Spatial Coordinates:</span>
                  <span className="text-xs font-mono font-bold text-blue-400">
                    Aisle {activeLocation.aisle} • Rack {activeLocation.rack} • Shelf {activeLocation.shelf}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Environmental Protocol:</span>
                  <span className="text-xs font-medium text-emerald-400">
                    {activeLocation.zone === 'Cold Storage' ? 'Cold Chain (2-8°C)' : 'Standard Climate Controlled'}
                  </span>
                </div>
              </div>

              {/* Products Stored at Location */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Stored SKU Inventory ({productsAtActiveLocation.length})
                </h4>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {productsAtActiveLocation.length > 0 ? (
                    productsAtActiveLocation.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-blue-400">
                            {prod.sku}
                          </span>
                          <span className="font-bold text-emerald-400 font-mono">
                            {prod.stock} units
                          </span>
                        </div>
                        <p className="font-medium text-white truncate">{prod.name}</p>
                        <p className="text-[11px] text-slate-400">{prod.category}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-500 bg-slate-950/30 rounded-lg border border-slate-800/50">
                      Standard capacity buffer available in this bay.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <MapPin className="h-8 w-8 mx-auto opacity-40 text-slate-400" />
              <p>Select any bay on the floor plan matrix to inspect stored inventory and telemetry.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
