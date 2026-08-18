'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  FileText,
  Copy,
  Check,
} from 'lucide-react';
import { AIAnalysisOutput } from '@/services/aiCopilotService';

export function MeetingSummaryCard({
  analysis,
}: {
  analysis?: AIAnalysisOutput;
}) {
  const [activeAudience, setActiveAudience] = useState<'manager' | 'director' | 'ceo'>('manager');
  const [copied, setCopied] = useState(false);

  const getSummaryForAudience = () => {
    if (activeAudience === 'ceo') {
      return {
        title: 'Executive Board & CEO Operations Briefing',
        bullets: [
          'Hub Central-01 operational health remains strong at 91% composite score, generating $52,400 in daily fulfilled order revenue.',
          'SLA compliance on top-tier enterprise accounts (Apex Logistics, MedLife Global) is protected at 99.4%.',
          'Identified $18,500 inventory stockout exposure on high-demand storage components; emergency vendor replenishment deployed with zero budget overrun.',
          'Overall supply chain workforce efficiency is outperforming industry benchmark by +2.4%.',
        ],
      };
    }

    if (activeAudience === 'director') {
      return {
        title: 'Supply Chain Operations Director Sync',
        bullets: [
          'Morning shift pick wave clearing at 92.4% efficiency; packing station 3 conveyor buffer backlog is primary bottleneck.',
          'Rebalanced 2 morning pickers to packing lines to prevent 14:00 SameDay courier cutoffs.',
          'Cold chain storage Zone C is at 84% capacity; shelf consolidation ordered before 15:00 perishable inbound dairy delivery.',
          'Highway 87 thunderstorm front mitigated by advancing outbound courier departures by 45 minutes.',
        ],
      };
    }

    return {
      title: 'Floor Supervisor & Shift Manager Standup',
      bullets: [
        'Today\'s Priority 1: Pick wave allocation for 5 Platinum VIP accounts (split shipments authorized for SSD storage).',
        'Liam O\'Connor workload equalized; 2 batches reassigned to Aisha Patel in Aisle A.',
        'Quarantine Bay 9 transfer complete for 4 damaged seafood units; vendor credit claim filed.',
        'Ensure all outbound pallets for northern route are wrapped and staged at Dock 4 by 13:15.',
      ],
    };
  };

  const summaryData = getSummaryForAudience();

  const handleCopy = () => {
    const text = `${summaryData.title}\n\n` + summaryData.bullets.map((b) => `• ${b}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Briefcase className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Multi-Stakeholder Meeting Summaries
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Tailored operational briefings synthesized for shift standups, director syncs, and executive boardroom reviews.
          </p>
        </div>

        {/* Audience Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveAudience('manager')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              activeAudience === 'manager'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Floor Manager
          </button>
          <button
            type="button"
            onClick={() => setActiveAudience('director')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              activeAudience === 'director'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Operations Director
          </button>
          <button
            type="button"
            onClick={() => setActiveAudience('ceo')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              activeAudience === 'ceo'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            CEO &amp; Board
          </button>
        </div>
      </div>

      {/* Summary Content Box */}
      <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">
            {summaryData.title}
          </h3>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        <ul className="space-y-2.5 text-xs text-slate-200">
          {summaryData.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
              <span className="text-blue-400 font-bold mt-0.5">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
