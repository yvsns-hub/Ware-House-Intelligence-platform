'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  User,
  Shield,
  CheckCircle2,
  Save,
  Bell,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { user, updateUserProfile, role } = useAuth();
  const [name, setName] = useState(user.name);
  const [roleTitle, setRoleTitle] = useState(user.roleTitle);
  const [email, setEmail] = useState(user.email);
  const [safetyBuffer, setSafetyBuffer] = useState(15);
  const [urgentSlaHours, setUrgentSlaHours] = useState(4);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(user.name);
    setRoleTitle(user.roleTitle);
    setEmail(user.email);
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(name, roleTitle);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/30 shadow-xl backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Settings className="h-5 w-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Platform &amp; Account Settings
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Manage your personal profile, role preferences, and operational decision thresholds.
          </p>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-4 w-4" />
            Profile Updated Successfully
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. User Profile Settings Section */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-400" />
              <span>User Profile &amp; Account Details</span>
            </div>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase">
              {role} Role
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full h-10 px-3 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg text-white font-medium outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Job Title / Designation</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Warehouse Hub Operations Manager"
                className="w-full h-10 px-3 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg text-white font-medium outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Work Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@warehouseiq.internal"
                className="w-full h-10 px-3 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg text-slate-300 outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Assigned Facility</label>
              <input
                type="text"
                value={user.assignedFacility}
                readOnly
                className="w-full h-10 px-3 bg-slate-950/60 border border-slate-800/80 rounded-lg text-slate-500 outline-none cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* 2. Operational Decision Safety Thresholds */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>Decision Engine Safety Thresholds</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">
                Default Safety Stock Reorder Buffer (Units)
              </label>
              <input
                type="number"
                value={safetyBuffer}
                onChange={(e) => setSafetyBuffer(Number(e.target.value))}
                min={5}
                max={100}
                className="w-full h-10 px-3 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg text-white font-mono outline-none transition-colors"
              />
              <span className="text-[10px] text-slate-500 block">
                Triggers predictive restocking recommendations when inventory dips below buffer.
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">
                VIP / Urgent Order SLA Max Lead Time (Hours)
              </label>
              <input
                type="number"
                value={urgentSlaHours}
                onChange={(e) => setUrgentSlaHours(Number(e.target.value))}
                min={1}
                max={24}
                className="w-full h-10 px-3 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg text-white font-mono outline-none transition-colors"
              />
              <span className="text-[10px] text-slate-500 block">
                Escalates order to High Priority in fulfillment timeline.
              </span>
            </div>
          </div>
        </div>

        {/* 3. Notification Preferences */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Bell className="h-4 w-4 text-purple-400" />
            <span>Notification &amp; Alert Preferences</span>
          </div>

          <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="space-y-0.5">
              <span className="font-bold text-white block">
                Live High-Severity Telemetry Notifications
              </span>
              <span className="text-[11px] text-slate-400 block">
                Receive instant slide-over drawer alerts for critical stockouts and weather warnings.
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile &amp; Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
