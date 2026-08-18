'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scan,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Boxes,
  Camera,
  Upload,
  RefreshCw,
  ShieldCheck,
  FileText,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { DamageInspectionRecord } from '@/types';
import { damageInspectionService } from '@/services/damageInspectionService';

export default function DamageInspectionPage() {
  const [inspections, setInspections] = useState<DamageInspectionRecord[]>([]);
  const [selectedDamageType, setSelectedDamageType] = useState<
    'TORN_PACKAGING' | 'DENT' | 'LEAKAGE' | 'MISSING_LABEL' | 'CRUSHED'
  >('TORN_PACKAGING');
  const [selectedSku, setSelectedSku] = useState('ELEC-WHD-001');
  const [selectedName, setSelectedName] = useState('High-Performance Wireless Headphones');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const fetchInspections = async () => {
    try {
      const res = await fetch('/api/damage-inspection');
      const data = await res.json();
      if (data.success) {
        setInspections(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  const handleRunInspection = async () => {
    setIsScanning(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/damage-inspection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sku: selectedSku,
          productName: selectedName,
          overrideDamageType: selectedDamageType,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setScanResult(data.data);
        await fetchInspections();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  const sampleProducts = [
    { sku: 'ELEC-WHD-001', name: 'High-Performance Wireless Headphones', type: 'TORN_PACKAGING' as const },
    { sku: 'GROC-EVO-001', name: 'Organic Extra Virgin Olive Oil 1L', type: 'LEAKAGE' as const },
    { sku: 'AUTO-OIL-003', name: 'Synthetic Motor Oil 5W-30', type: 'DENT' as const },
    { sku: 'ELEC-SPK-002', name: 'Portable Bluetooth Speaker Max', type: 'CRUSHED' as const },
    { sku: 'MED-EPI-002', name: 'Emergency Health Auto-Injector Pack', type: 'MISSING_LABEL' as const },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8">
      {/* Simulation Banner Notice */}
      <div className="bg-cyan-500/10 border-2 border-dashed border-cyan-500/40 rounded-xl p-3 px-5 flex items-center justify-between gap-4 text-cyan-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold tracking-wide uppercase text-sm block">
              DEMO / COMPUTER VISION SIMULATION MODEL
            </span>
            <span className="text-xs text-cyan-200/80">
              Simulates automated optical sorting and package defect triage (torn packaging, denting, chemical leakage, and barcode corruption).
            </span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-300">
          Vision API Ready
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              Quality Assurance & Automated Vision
            </span>
            <span className="text-xs text-slate-400">Conveyor Inspection Ingestion</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Scan className="w-8 h-8 text-cyan-400" />
            Computer Vision Damage Inspection
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Automated inbound scanner simulation that detects physical packaging defects, determines disposition, and triggers auto-quarantine workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/approvals"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sm font-medium text-slate-300 transition-colors"
          >
            Manager Approvals
          </Link>
          <Link
            href="/decision-center"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-600/30"
          >
            Decision Center
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inspection Simulator & Bounding Box View */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-cyan-400" />
              Live Inbound Conveyor Vision Feed
            </h2>
            <span className="text-xs text-slate-400">Scanner #2 Active</span>
          </div>

          {/* Sample Defect Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
              Select Sample Defective Package:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sampleProducts.map((p) => (
                <button
                  key={p.sku}
                  onClick={() => {
                    setSelectedSku(p.sku);
                    setSelectedName(p.name);
                    setSelectedDamageType(p.type);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all text-xs space-y-1 ${
                    selectedSku === p.sku
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="font-bold text-slate-200 truncate">{p.name}</div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{p.sku}</span>
                    <span className="font-semibold text-cyan-300">{p.type.replace('_', ' ')}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scanner Optical Viewport */}
          <div className="relative aspect-video bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

            {/* Target Package Simulation Graphic */}
            <div className="relative w-48 h-36 bg-slate-800/90 border-2 border-slate-700 rounded-lg flex flex-col items-center justify-center p-3 shadow-2xl">
              <Boxes className="w-12 h-12 text-slate-500 mb-1" />
              <span className="text-[11px] font-mono font-bold text-slate-300">{selectedSku}</span>
              <span className="text-[9px] text-slate-400 text-center truncate w-full">{selectedName}</span>

              {/* Bounding Box when scanned */}
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-2 border-2 border-rose-500 bg-rose-500/10 rounded flex flex-col justify-between p-1.5"
                >
                  <div className="flex justify-between items-start">
                    <span className="bg-rose-600 text-white text-[9px] px-1 py-0.5 rounded font-bold uppercase">
                      {scanResult.record.damageType.replace('_', ' ')}
                    </span>
                    <span className="bg-slate-900/90 text-rose-400 text-[9px] px-1 py-0.5 rounded font-mono font-bold">
                      {scanResult.record.confidenceScore}% CONF
                    </span>
                  </div>
                  <span className="text-[9px] text-rose-300 font-mono text-center">
                    SEVERITY: {scanResult.record.severity}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Scan animation line */}
            {isScanning && (
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
              />
            )}
          </div>

          <button
            onClick={handleRunInspection}
            disabled={isScanning}
            className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold transition-all shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing Optical Features via Computer Vision...
              </>
            ) : (
              <>
                <Scan className="w-4 h-4" />
                Trigger Automated Vision Scan
              </>
            )}
          </button>
        </div>

        {/* Right Column: Scan Diagnostics & History */}
        <div className="lg:col-span-6 space-y-6">
          {/* Diagnostic Result Card */}
          {scanResult ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  Inspection Result & Automated Triage
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold">
                  {scanResult.record.status}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Defect Detected:</span>
                  <span className="font-bold text-rose-400 uppercase">
                    {scanResult.record.damageType.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vision Model Confidence:</span>
                  <span className="font-bold text-cyan-300">{scanResult.record.confidenceScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Automated Disposition:</span>
                  <span className="font-bold text-emerald-400 uppercase">
                    {scanResult.recommendedDisposition.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300">
                  {scanResult.record.notes}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 text-center space-y-2">
              <Scan className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-300">No Active Scan Triggered</h3>
              <p className="text-xs text-slate-500">
                Select a defective sample package from the left viewport and click &quot;Trigger Automated Vision Scan&quot;.
              </p>
            </div>
          )}

          {/* Recent Inspection Records */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileText className="w-4 h-4 text-indigo-400" />
              Recent Automated Quarantine Records
            </h3>

            <div className="space-y-3">
              {inspections.slice(0, 4).map((insp) => (
                <div
                  key={insp.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5 hover:border-slate-700 transition-colors text-xs"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-slate-200">{insp.productName}</span>
                      <span className="text-slate-500 ml-2 font-mono">{insp.sku}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        insp.severity === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {insp.damageType.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{insp.notes}</p>
                  <div className="flex justify-between text-slate-500 text-[10px] pt-1">
                    <span>{insp.inspectedBy}</span>
                    <span>{new Date(insp.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
