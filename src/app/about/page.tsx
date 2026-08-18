'use client';

import React from 'react';
import {
  Layers,
  BrainCircuit,
  Boxes,
  ShoppingCart,
  Truck,
  Users,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  Sparkles,
  Award,
  Globe,
  ArrowRight,
  Code2,
  Database,
  CloudSun,
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const techStack = [
    { name: 'Next.js 15 (App Router)', role: 'Core Full-Stack Framework & Server Actions', category: 'Frontend & Backend' },
    { name: 'TypeScript', role: 'Strict End-to-End Type Safety & Data Models', category: 'Language' },
    { name: 'Tailwind CSS & shadcn/ui', role: 'Modern Dark Enterprise SaaS Design Tokens', category: 'Styling' },
    { name: 'Prisma ORM & PostgreSQL', role: 'Relational Database Layer & Schema Migrations', category: 'Database' },
    { name: 'TanStack React Query', role: 'Asynchronous State Management & Smart Caching', category: 'Data Fetching' },
    { name: 'Recharts & Framer Motion', role: 'Interactive Data Visualizations & Micro-Animations', category: 'UI & Charts' },
    { name: 'OpenRouter AI API', role: 'Operations Director LLM Intelligence & Risk Modeling', category: 'Artificial Intelligence' },
    { name: 'OpenWeather API', role: 'Meteorological Logistics Telemetry & Delay Modeling', category: 'External Telemetry' },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Real-time Telemetry Ingestion',
      desc: 'Streams 100 SKUs, 50 orders, 20 shift workers, and external weather telemetry into memory.',
      icon: Database,
    },
    {
      step: '02',
      title: 'Deterministic Decision Engine',
      desc: 'Calculates dynamic order priority scores, health scores (0-100), and short-term stockout horizons.',
      icon: Zap,
    },
    {
      step: '03',
      title: 'AI Context Builder & LLM Synthesis',
      desc: 'Compiles curated high-signal context for OpenRouter Claude-3.5-Sonnet to formulate strategic executive briefs.',
      icon: BrainCircuit,
    },
    {
      step: '04',
      title: 'Autonomous Execution & Dispatch',
      desc: 'Enables one-click smart split allocations, workforce rebalancing, automated POs, and early courier dispatches.',
      icon: Truck,
    },
  ];

  const futureRoadmap = [
    {
      title: 'Autonomous Mobile Robot (AMR) Fleet Control',
      desc: 'Direct integration with Kiva and Geek+ robot dispatch systems for dynamic bay pathfinding.',
      badge: 'v2.5 Roadmap',
    },
    {
      title: 'Computer Vision Dock Cameras',
      desc: 'Real-time pallet damage scanning and OCR barcode verification at receiving bay doors.',
      badge: 'v3.0 Roadmap',
    },
    {
      title: 'RFID Sensor Auto-Triangulation',
      desc: 'Continuous real-time 3D spatial item tracking across cold-chain and bulk pallet racks.',
      badge: 'v3.5 Roadmap',
    },
  ];

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      {/* 1. Hero Banner */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Commercial Enterprise Decision Intelligence</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          About Warehouse<span className="text-blue-500">IQ</span>
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Traditional Warehouse Management Systems only show you what happened in the past. <b>WarehouseIQ actively helps warehouse managers make operational decisions in real-time.</b>
        </p>
      </div>

      {/* 2. Problem vs Solution Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-rose-500/30 bg-rose-950/20 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 block">
            The Supply Chain Problem
          </span>
          <h3 className="text-lg font-bold text-white">
            Traditional Passive WMS Systems Fail in Crisis
          </h3>
          <ul className="space-y-2.5 text-xs text-rose-200/90 leading-relaxed">
            <li>• <b>Rigid FIFO Logic:</b> Processes low-value standard orders while high-margin VIP accounts wait in queue.</li>
            <li>• <b>Stalled On Shortages:</b> A single missing SKU halts entire pick batches instead of recommending smart split allocations.</li>
            <li>• <b>Blind to Weather:</b> Outbound courier trailers depart right into storm corridors resulting in missed delivery SLAs.</li>
            <li>• <b>Unbalanced Workforce:</b> Pickers face fatigue while packing stations stall from conveyor buffer bottlenecks.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
            The WarehouseIQ Solution
          </span>
          <h3 className="text-lg font-bold text-white">
            Autonomous Proactive Decision Intelligence
          </h3>
          <ul className="space-y-2.5 text-xs text-emerald-200/90 leading-relaxed">
            <li>• <b>Dynamic Priority Engine:</b> Multi-variable algorithm weighing Customer Tier, SLA, Cart Value, and Weather.</li>
            <li>• <b>Smart Shortage Solver:</b> Allocates scarce stock to preserve 95%+ client retention and drafts emergency supplier POs.</li>
            <li>• <b>Meteorological Corridor Routing:</b> Advances dispatch windows ahead of storms with -34% delay reduction.</li>
            <li>• <b>Director AI Co-Pilot:</b> Seasoned 25-year operations director persona providing strategic briefings and simulations.</li>
          </ul>
        </div>
      </div>

      {/* 3. System Workflow Architecture */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight">
            End-to-End Decision Architecture
          </h2>
          <p className="text-xs text-slate-400">
            How WarehouseIQ transforms raw telemetry into autonomous operational actions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowSteps.map((ws, i) => {
            const Icon = ws.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-3 relative overflow-hidden"
              >
                <span className="text-2xl font-extrabold text-slate-700 font-mono absolute top-3 right-4">
                  {ws.step}
                </span>

                <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 w-fit">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white tracking-tight">
                    {ws.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {ws.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Technology Stack Matrix */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="space-y-0.5">
            <h3 className="text-base font-extrabold text-white">
              Enterprise Technology Stack
            </h3>
            <p className="text-xs text-slate-400">
              Modern, modular, production-grade cloud architecture
            </p>
          </div>
          <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
            Next.js 15 App Router
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{tech.name}</span>
                <span className="text-[9px] uppercase font-bold text-slate-500 font-mono">
                  {tech.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {tech.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Future Roadmap & Hackathon Credentials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roadmap */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Globe className="h-4 w-4 text-purple-400" />
            Future Innovation Roadmap
          </h3>

          <div className="space-y-3">
            {futureRoadmap.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    {item.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathon Credentials & Quick Start */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-400" />
              Built for AI Hackathon 2026
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Designed as a fully operational Supply Chain Decision Intelligence platform proving that AI can transition from passive chatbots into autonomous operational systems saving millions in logistics overhead.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/decision-center"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"
            >
              <span>Explore Decision Center</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/ai-assistant"
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
            >
              <span>Launch AI Co-Pilot</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
