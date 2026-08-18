'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Users,
  Boxes,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Info,
  Sparkles,
  ShieldAlert,
  Thermometer,
  Zap,
} from 'lucide-react';

interface ZoneData {
  id: string;
  name: string;
  code: string;
  type: string;
  status: 'NORMAL' | 'WARNING' | 'HIGH' | 'CRITICAL';
  workloadPercent: number;
  temperature?: string;
  activeOrders: number;
  assignedWorkers: string[];
  stockoutSkus: string[];
  recommendation: string;
}

const warehouseZones: ZoneData[] = [
  {
    id: 'zone-a',
    name: 'Cold Storage Vault',
    code: 'ZONE-A (Aisles 01-04)',
    type: 'Cold Chain Perishables & Vaccines',
    status: 'NORMAL',
    workloadPercent: 62,
    temperature: '-18.5°C',
    activeOrders: 12,
    assignedWorkers: ['Priya Sharma (Picker)'],
    stockoutSkus: ['GROC-ICE-002'],
    recommendation: 'Nominal operational status. Temperature stable at -18.5°C.',
  },
  {
    id: 'zone-b',
    name: 'High Value Secure Cage',
    code: 'ZONE-B (Aisles 05-08)',
    type: 'High-End Electronics & Jewelry',
    status: 'CRITICAL',
    workloadPercent: 94,
    activeOrders: 28,
    assignedWorkers: ['Alex Morgan (Picker)'],
    stockoutSkus: ['ELEC-WHD-001 (Stock: 0)', 'ELEC-SSD-004 (Stock: 4)'],
    recommendation: 'CRITICAL CONGESTION: 28 pending VIP orders. Reassign 2 pickers from Zone E immediately.',
  },
  {
    id: 'zone-c',
    name: 'Bulk Pallet Cargo',
    code: 'ZONE-C (Aisles 09-14)',
    type: 'Heavy Industrial & Automotive',
    status: 'NORMAL',
    workloadPercent: 48,
    activeOrders: 8,
    assignedWorkers: ['Carlos Rodriguez (Forklift)'],
    stockoutSkus: [],
    recommendation: 'Forklift transit corridor clear. Ready for afternoon inbound trailer receipt.',
  },
  {
    id: 'zone-d',
    name: 'Fast-Moving Consumer Goods',
    code: 'ZONE-D (Aisles 15-20)',
    type: 'High Velocity Daily Essentials',
    status: 'HIGH',
    workloadPercent: 88,
    activeOrders: 36,
    assignedWorkers: ['Elena Vance (Lead)', 'Marcus Brody (Picker)'],
    stockoutSkus: ['GROC-EVO-001 (Stock: 8)'],
    recommendation: 'Picker velocity high (+42%). Deploy batch wave routing to reduce travel distance.',
  },
  {
    id: 'zone-e',
    name: 'Standard Ambient Storage',
    code: 'ZONE-E (Aisles 21-30)',
    type: 'General Merchandise & Apparel',
    status: 'NORMAL',
    workloadPercent: 35,
    activeOrders: 6,
    assignedWorkers: ['David Kim (Picker)', 'Sarah Jenkins (Picker)'],
    stockoutSkus: [],
    recommendation: 'Low queue depth. 2 workers available for cross-zone reassignment.',
  },
  {
    id: 'zone-pack',
    name: 'Outbound Packing Line Beta',
    code: 'PACK-STATION-B',
    type: 'Sortation & Automated Boxing',
    status: 'WARNING',
    workloadPercent: 82,
    activeOrders: 34,
    assignedWorkers: ['Liam O’Connor (Packer)'],
    stockoutSkus: [],
    recommendation: 'Packing queue bottleneck (34 totes queued). Assign +1 packer to balance conveyor flow.',
  },
];

export function WarehouseTwinMap() {
  const [selectedZone, setSelectedZone] = useState<ZoneData>(warehouseZones[1]);

  const getStatusColor = (status: ZoneData['status']) => {
    switch (status) {
      case 'CRITICAL':
        return 'border-rose-500 bg-rose-500/15 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]';
      case 'HIGH':
        return 'border-amber-500 bg-amber-500/15 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
      case 'WARNING':
        return 'border-yellow-500 bg-yellow-500/15 text-yellow-300';
      default:
        return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
    }
  };

  const getBadgeColor = (status: ZoneData['status']) => {
    switch (status) {
      case 'CRITICAL':
        return 'bg-rose-500 text-white';
      case 'HIGH':
        return 'bg-amber-500 text-slate-950 font-bold';
      case 'WARNING':
        return 'bg-yellow-500 text-slate-950 font-bold';
      default:
        return 'bg-emerald-500 text-white font-bold';
    }
  };

  return (
    <div className="space-y-6">
      {/* 2D Interactive Layout Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              2D Digital Warehouse Twin Layout (Hub East-01)
            </h3>
            {/* Heatmap Legend */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Normal
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> Warning
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> High Congestion
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" /> Critical
              </span>
            </div>
          </div>

          {/* Grid Layout representing physical floor zones */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            {warehouseZones.map((zone) => (
              <motion.button
                key={zone.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedZone(zone)}
                className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[140px] ${getStatusColor(
                  zone.status
                )} ${selectedZone.id === zone.id ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950' : ''}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-mono font-bold">{zone.code}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase ${getBadgeColor(zone.status)}`}>
                      {zone.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100">{zone.name}</h4>
                  <p className="text-[11px] text-slate-300/80 truncate">{zone.type}</p>
                </div>

                <div className="pt-2 border-t border-slate-700/40 flex justify-between items-end text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Workload</span>
                    <span className="font-bold">{zone.workloadPercent}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Active Orders</span>
                    <span className="font-bold">{zone.activeOrders}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-400">
            <span>Floor Area: 48,000 sq ft</span>
            <span>Aisles: 30 | Active Forklifts: 4 | Conveyor Speed: 1.4 m/s</span>
            <span className="text-emerald-400 font-semibold">Sensor Network: 100% Online</span>
          </div>
        </div>

        {/* Right Column: Zone Inspector Panel */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-400" />
              Zone Inspector
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded font-bold ${getBadgeColor(selectedZone.status)}`}>
              {selectedZone.status}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono text-slate-500">{selectedZone.code}</span>
              <h4 className="text-lg font-bold text-white">{selectedZone.name}</h4>
              <p className="text-xs text-slate-400">{selectedZone.type}</p>
            </div>

            {selectedZone.temperature && (
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between text-xs text-cyan-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Thermometer className="w-4 h-4" /> Temperature Sensor
                </span>
                <span className="font-bold font-mono text-sm">{selectedZone.temperature}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                <span className="text-slate-400 block mb-1">Queue Depth</span>
                <span className="text-lg font-bold text-white">{selectedZone.activeOrders} orders</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                <span className="text-slate-400 block mb-1">Utilization</span>
                <span className="text-lg font-bold text-indigo-400">{selectedZone.workloadPercent}%</span>
              </div>
            </div>

            {/* Assigned Staff */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                Assigned Workforce ({selectedZone.assignedWorkers.length})
              </span>
              <div className="space-y-1 text-xs text-slate-300">
                {selectedZone.assignedWorkers.map((worker, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-2 flex justify-between">
                    <span>{worker}</span>
                    <span className="text-emerald-400 text-[11px] font-semibold">Active</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stockout Hotspots in Zone */}
            {selectedZone.stockoutSkus.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase text-rose-400 tracking-wider block flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  Stockout Hotspots ({selectedZone.stockoutSkus.length})
                </span>
                <div className="space-y-1 text-xs">
                  {selectedZone.stockoutSkus.map((sku, idx) => (
                    <div key={idx} className="bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-lg p-2">
                      {sku}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Realtime Operational Recommendation */}
            <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl space-y-1.5">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Spatial Directive
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">{selectedZone.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
