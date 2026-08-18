'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, LogOut, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AccessDeniedPage() {
  const { role, user, logout } = useAuth();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <ShieldAlert className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <Lock className="h-3 w-3" />
            <span>HTTP 403 • Restricted Area</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Access Denied
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your authenticated role (<b className="text-rose-400">{role}</b>) does not possess executive permissions to access this administrative resource.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-left space-y-2 text-xs">
          <div className="text-slate-400 font-medium">Logged in as:</div>
          <div className="font-bold text-white flex items-center justify-between">
            <span>{user.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              {role}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">{user.email}</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href={role === 'PICKER' ? '/dashboard/picker' : '/'}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{role === 'PICKER' ? 'Return to Picking Queue' : 'Return to Dashboard'}</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Switch Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
