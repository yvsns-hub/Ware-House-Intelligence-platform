'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FileText,
  DollarSign,
  User,
  History,
  Layers,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { ExplainableDecision, AuditLogEntry, DecisionStatus } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'executed' | 'audit'>('pending');
  const [decisions, setDecisions] = useState<ExplainableDecision[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchDecisions = async () => {
    try {
      const res = await fetch('/api/approvals');
      const data = await res.json();
      if (data.success) {
        setDecisions(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/audit');
      const data = await res.json();
      if (data.success) {
        setAuditLogs(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setIsLoading(true);
      await Promise.all([fetchDecisions(), fetchAuditLogs()]);
      setIsLoading(false);
    };
    loadAll();
  }, []);

  const handleAction = async (decisionId: string, action: 'APPROVE' | 'REJECT') => {
    setProcessingId(decisionId);
    try {
      const res = await fetch('/api/approvals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decisionId,
          action,
          user: 'Operations Director (Y V S N SWAMY)',
          role: 'MANAGER',
          notes: `Authorized via Executive Approval Console at ${new Date().toLocaleTimeString()}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage(data.message);
        setTimeout(() => setSuccessMessage(null), 5000);
        await Promise.all([fetchDecisions(), fetchAuditLogs()]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProcessingId(null);
    }
  };

  const pendingList = decisions.filter((d) => d.status === 'PENDING');
  const executedList = decisions.filter((d) => d.status === 'EXECUTED' || d.status === 'APPROVED');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              Manager Governance & Compliance
            </span>
            <span className="text-xs text-slate-400">Strict Human-in-the-Loop Control</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            Executive Approval & Audit Center
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review autonomous AI decision recommendations, inspect mathematical explainability evidence, and record immutable audit logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/decision-center/simulator"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sm font-medium text-slate-300 transition-colors"
          >
            What-If Simulator
          </Link>
          <Link
            href="/decision-center"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-600/30"
          >
            Decision Center
          </Link>
        </div>
      </div>

      {/* Success Notification Alert */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-500/10 border border-emerald-500/40 rounded-xl p-4 flex items-center gap-3 text-emerald-300 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-medium">{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'pending'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          Pending Approvals ({pendingList.length})
        </button>

        <button
          onClick={() => setActiveTab('executed')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'executed'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Executed Decisions ({executedList.length})
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          Immutable Audit Log ({auditLogs.length})
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'pending' && (
        <div className="space-y-6">
          {pendingList.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">All Decisions Authorized</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                No pending decisions awaiting manager review. The warehouse is operating within nominal thresholds.
              </p>
            </div>
          ) : (
            pendingList.map((dec) => (
              <motion.div
                key={dec.decisionId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl"
              >
                {/* Decision Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase">
                        {dec.decisionType.replace(/_/g, ' ')}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">ID: {dec.decisionId}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        Confidence: {dec.confidence}%
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{dec.recommendation}</h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleAction(dec.decisionId, 'REJECT')}
                      disabled={processingId === dec.decisionId}
                      className="px-4 py-2 rounded-xl bg-slate-950 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleAction(dec.decisionId, 'APPROVE')}
                      disabled={processingId === dec.decisionId}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
                    >
                      {processingId === dec.decisionId ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      Approve & Execute
                    </button>
                  </div>
                </div>

                {/* Explainability 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Column 1: Why / Reasoning */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      Why Was This Recommended?
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {dec.reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-indigo-400 font-bold">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: Financial Impact & ROI */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      Expected Impact & Savings
                    </h4>
                    <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Estimated Cost:</span>
                        <span className="font-bold text-slate-200">{formatCurrency(dec.estimatedCost)}</span>
                      </div>
                      {dec.estimatedSavings && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Potential Loss Avoided:</span>
                          <span className="font-bold text-emerald-400">+{formatCurrency(dec.estimatedSavings)}</span>
                        </div>
                      )}
                      <div className="text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                        {dec.expectedImpact}
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Evaluated Alternatives */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      Evaluated Alternatives
                    </h4>
                    {dec.alternatives && dec.alternatives.length > 0 ? (
                      <div className="space-y-2 text-xs">
                        {dec.alternatives.map((alt, idx) => (
                          <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 space-y-1">
                            <div className="flex justify-between font-semibold text-slate-300">
                              <span>{alt.title}</span>
                              <span className="text-amber-400">{formatCurrency(alt.cost)}</span>
                            </div>
                            <p className="text-slate-400 text-[11px]">{alt.tradeoff}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">No higher-efficiency alternatives viable.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Executed Decisions */}
      {activeTab === 'executed' && (
        <div className="space-y-4">
          {executedList.map((dec) => (
            <div
              key={dec.decisionId}
              className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    EXECUTED
                  </span>
                  <span className="text-xs text-slate-400">{dec.decisionId}</span>
                  <span className="text-xs text-slate-500">
                    Approved by {dec.approvedBy || 'Operations Director'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-200">{dec.recommendation}</h4>
                <p className="text-xs text-emerald-400">{dec.expectedImpact}</p>
              </div>

              <div className="text-right text-xs text-slate-400 shrink-0">
                <span>Cost: {formatCurrency(dec.estimatedCost)}</span>
                <span className="block text-[11px] text-slate-500">
                  {dec.executedAt ? new Date(dec.executedAt).toLocaleString() : 'Executed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Immutable Audit Log */}
      {activeTab === 'audit' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-400" />
              Cryptographically Sequenced Operation Logs
            </h3>
            <span className="text-xs text-slate-500">Total Entries: {auditLogs.length}</span>
          </div>

          <div className="divide-y divide-slate-800">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-800/30 transition-colors space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                      {log.action}
                    </span>
                    <span className="font-semibold text-slate-300">{log.user}</span>
                    <span className="text-slate-500">({log.role})</span>
                  </div>
                  <span className="text-slate-500 font-mono">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>

                <p className="text-sm text-slate-300">{log.reason}</p>

                {log.newState && (
                  <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-2 font-mono text-[11px] text-slate-400 overflow-x-auto">
                    {log.newState}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
