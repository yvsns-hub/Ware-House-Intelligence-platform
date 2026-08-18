'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit,
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Users,
  Layers,
  AlertCircle,
  Loader2,
  Package,
} from 'lucide-react';
import { useAuth, UserRole, warehouseFacilities } from '@/context/AuthContext';

function LoginContent() {
  const { role, login, signInWithEmail, signInWithGoogle, isLoading: authLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('PICKER');
  const [selectedFacility, setSelectedFacility] = useState<string>('hub-01');
  const [email, setEmail] = useState('a.morgan@warehouseiq.internal');
  const [password, setPassword] = useState('4455');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Sync default credentials when role or facility changes
  useEffect(() => {
    if (selectedRole === 'MANAGER') {
      const fac = warehouseFacilities.find((f) => f.id === selectedFacility) || warehouseFacilities[0];
      setEmail(fac.managerEmail);
      setPassword(fac.managerPin);
    } else if (selectedRole === 'HEAD') {
      setEmail('e.rostova@warehouseiq.global');
      setPassword('8899');
    } else {
      setEmail('m.vance@warehouseiq.internal');
      setPassword('1122');
    }
    setErrorMessage('');
  }, [selectedRole, selectedFacility]);

  // Handle Email + Password Sign In (Manager / Head)
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter both your work email and password / PIN.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await signInWithEmail(email, password, selectedRole, selectedFacility);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setSuccessMessage('Authentication verified. Redirecting to facility dashboard...');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Firebase Google Sign In (Picker)
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const res = await signInWithGoogle();
      if (res.error) {
        setErrorMessage(res.error);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Firebase Google Sign-In failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          <span>Initializing secure login portal...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-slate-800/80 bg-slate-900/60 shadow-2xl backdrop-blur-2xl overflow-hidden min-h-[620px]">
        {/* ──────────────────────────────────────────────────────────── */}
        {/* LEFT SIDE: BRANDING & SAAS VALUE ILLUSTRATION */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 p-8 sm:p-12 bg-gradient-to-br from-blue-950/40 via-slate-900/90 to-purple-950/30 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between relative">
          <div className="space-y-6">
            {/* Logo & Tagline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-600/30 ring-1 ring-white/20">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xl font-extrabold text-white tracking-tight">
                    Warehouse<span className="text-blue-400">IQ</span>
                  </span>
                  <div className="text-[10px] font-mono text-blue-300 font-semibold">
                    ENTERPRISE DECISION PLATFORM
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
                <span>AI-Powered Warehouse Decision Intelligence</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Empower your facility with autonomous supply chain decisions.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg">
                WarehouseIQ helps warehouse managers optimize inventory velocity, prevent order SLA breaches, balance shifts, and dispatch freight with 96.4% prescriptive AI confidence.
              </p>
            </div>

            {/* Metrics highlight pills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Confidence Metric</div>
                <div className="text-lg font-extrabold text-emerald-400 font-mono">96.4% Avg</div>
                <div className="text-[10px] text-slate-500">Prescriptive Accuracy</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Network Reach</div>
                <div className="text-lg font-extrabold text-purple-400 font-mono">4 Regional Hubs</div>
                <div className="text-[10px] text-slate-500">Real-time Telemetry</div>
              </div>
            </div>
          </div>

          {/* Security & Firebase Auth badge footer */}
          <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Firebase Authentication &amp; RBAC Active</span>
            </div>
            <span className="font-mono text-[11px]">v2.4 Enterprise</span>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* RIGHT SIDE: AUTHENTICATION CARD */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Sign In to Your Workspace
            </h2>
            <p className="text-xs text-slate-400">
              {selectedRole === 'PICKER'
                ? 'Sign in with your Google account to access your assigned pick waves.'
                : 'Select your operational role and authenticate with your work credentials.'}
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-950/90 border border-slate-800" suppressHydrationWarning>
            <button
              type="button"
              onClick={() => setSelectedRole('PICKER')}
              suppressHydrationWarning
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                selectedRole === 'PICKER'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Picker</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('MANAGER')}
              suppressHydrationWarning
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                selectedRole === 'MANAGER'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Manager</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('HEAD')}
              suppressHydrationWarning
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                selectedRole === 'HEAD'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>VP Head</span>
            </button>
          </div>

          {/* If Manager role is chosen, show facility dropdown/selector */}
          {selectedRole === 'MANAGER' && (
            <div className="space-y-1.5" suppressHydrationWarning>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Assigned Warehouse Facility
              </label>
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                suppressHydrationWarning
                className="w-full h-10 px-3 bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs text-slate-200 rounded-xl outline-none transition-all"
              >
                {warehouseFacilities.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name} — Manager: {fac.managerName} ({fac.region})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Toast / Error / Success Messages */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PICKER ROLE: ONLY GOOGLE AUTHENTICATION */}
          {selectedRole === 'PICKER' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Package className="h-4 w-4 text-blue-400" />
                  <span>Order Fulfillment Operator Portal</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Pickers authenticate exclusively through Google Single Sign-On to verify operator identity and retrieve designated picking batches.
                </p>
              </div>

              {/* Firebase Google Auth Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSubmitting || authLoading}
                suppressHydrationWarning
                className="w-full h-12 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-[1.01] active:scale-95"
              >
                {isSubmitting || authLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                ) : (
                  <>
                    {/* Google SVG Icon */}
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              {/* Demo Quick Button */}
              <button
                type="button"
                onClick={() => login('PICKER')}
                suppressHydrationWarning
                className="w-full py-2 px-3 rounded-xl bg-blue-950/30 hover:bg-blue-900/50 border border-blue-500/20 text-blue-300 text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="h-3 w-3 text-blue-400" />
                <span>One-Click Demo Picker (Marcus Vance)</span>
              </button>
            </div>
          ) : (
            /* MANAGER & HEAD: EMAIL + PASSWORD AUTHENTICATION */
            <form onSubmit={handleEmailLogin} className="space-y-4" suppressHydrationWarning>
              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Work Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@warehouseiq.internal"
                    required
                    suppressHydrationWarning
                    className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-slate-100 placeholder-slate-500 rounded-xl outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Password / PIN
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Demo PIN reminder:\n• Hub Manager PINs: 4455, 5566, 6677, 7788\n• VP Head PIN: 8899');
                    }}
                    className="text-[11px] text-blue-400 hover:underline"
                  >
                    Forgot PIN?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security password or PIN"
                    required
                    suppressHydrationWarning
                    className="w-full h-11 pl-10 pr-10 bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-slate-100 placeholder-slate-500 rounded-xl outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    suppressHydrationWarning
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    suppressHydrationWarning
                    className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                  />
                  <span>Remember my session</span>
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isSubmitting || authLoading}
                suppressHydrationWarning
                className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01] active:scale-95"
              >
                {isSubmitting || authLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In as {selectedRole === 'MANAGER' ? 'Hub Manager' : 'VP Head'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            <span>Loading authentication portal...</span>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
