'use client';

import React, { useState } from 'react';
import {
  CloudSun,
  CloudRain,
  Sun,
  Cloud,
  Wind,
  Droplets,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { WeatherData } from '@/types';

export function WeatherImpactSection({
  weather,
  recommendation,
}: {
  weather?: WeatherData;
  recommendation?: string;
}) {
  const [planApplied, setPlanApplied] = useState(false);

  const getWeatherIcon = (cond?: string) => {
    const c = cond?.toLowerCase() || '';
    if (c.includes('rain') || c.includes('drizzle')) return <CloudRain className="h-5 w-5 text-cyan-400" />;
    if (c.includes('cloud')) return <Cloud className="h-5 w-5 text-slate-300" />;
    if (c.includes('sun') || c.includes('clear')) return <Sun className="h-5 w-5 text-amber-400" />;
    return <CloudSun className="h-5 w-5 text-amber-300" />;
  };

  return (
    <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-md space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            {getWeatherIcon(weather?.condition)}
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white tracking-tight">
              Weather &amp; Transit Corridor Intelligence
            </h2>
            <p className="text-[11px] text-slate-400">
              Live meteorological sensors &amp; route telemetry for Hub Central-01
            </p>
          </div>
        </div>

        <span
          className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider border font-mono ${
            weather?.isAdverse
              ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
          }`}
        >
          ● Transit Risk: {weather?.isAdverse ? 'High Disruption' : 'Nominal (Clear)'}
        </span>
      </div>

      {/* Main Grid: Telemetry Gauges + Actionable Advisory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {/* Telemetry Gauges */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">
              {weather?.temperature ?? 19.4}°C
            </span>
            <span className="text-xs font-semibold text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700">
              {weather?.condition ?? 'Partly Cloudy'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Wind className="h-3.5 w-3.5 text-blue-400 shrink-0" />
              <span>Wind: <b className="text-white font-mono">{weather?.windSpeed ?? 11.2} km/h</b></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Droplets className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>Humidity: <b className="text-white font-mono">{weather?.humidity ?? 48}%</b></span>
            </div>
          </div>
        </div>

        {/* Actionable Dispatch Recommendation */}
        <div className="md:col-span-2 p-4 rounded-xl bg-slate-950 border border-blue-900/40 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1">
                <Truck className="h-3.5 w-3.5" />
                Autonomous Logistics Advisory
              </span>
              <span className="text-[11px] font-bold text-emerald-400 font-mono">
                -34% Delay Risk Mitigation
              </span>
            </div>

            <h3 className="text-xs font-bold text-white mt-1">
              {weather?.isAdverse
                ? 'Advance Outbound Express Couriers Prior to Impending Storm Front'
                : 'Maintain Standard Courier Dispatch Window (All Corridors Nominal)'}
            </h3>

            <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
              {recommendation ||
                'Accelerate carrier pickup by 45 minutes for outbound express loads and route northern freight via Highway 87 bypass.'}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Corridor Status: <b className="text-emerald-400">Route 87 Bypass Clear</b>
            </span>

            {planApplied ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Dispatch Plan Dispatched
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setPlanApplied(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow transition-all"
              >
                <span>Apply Dispatch Plan</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
