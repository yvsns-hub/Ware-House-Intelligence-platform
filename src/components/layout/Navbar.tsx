'use client';

import React, { useState, useEffect } from 'react';
import {
  Menu,
  CloudSun,
  CloudRain,
  Sun,
  Cloud,
  Clock,
  User,
  Shield,
  Sparkles,
  Tv,
  Bell,
  LogOut,
} from 'lucide-react';
import { SearchBar } from '../ui/SearchBar';
import { useWeather } from '@/hooks';
import { useAuth } from '@/context/AuthContext';
import { NotificationDrawer } from '../notifications/NotificationDrawer';
import { DemoModeModal } from '../demo/DemoModeModal';
import { OfflineBanner } from '../ui/OfflineBanner';

export function Navbar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { role, user, logout, isAuthenticated } = useAuth();
  const [globalSearch, setGlobalSearch] = useState('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const { data: weatherData } = useWeather();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const togglePresentation = () => {
    setIsPresentationMode(!isPresentationMode);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const getWeatherIcon = (cond?: string) => {
    const c = cond?.toLowerCase() || '';
    if (c.includes('rain') || c.includes('drizzle')) return <CloudRain className="h-4 w-4 text-cyan-400" />;
    if (c.includes('cloud')) return <Cloud className="h-4 w-4 text-slate-300" />;
    if (c.includes('sun') || c.includes('clear')) return <Sun className="h-4 w-4 text-amber-400" />;
    return <CloudSun className="h-4 w-4 text-amber-300" />;
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <OfflineBanner />
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 md:px-8 backdrop-blur-xl">
        {/* Left: Mobile Toggle & Global Search */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <button
            type="button"
            onClick={onMenuToggle}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 md:hidden transition-colors"
            title="Toggle Navigation Menu"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 max-w-sm">
            <SearchBar
              value={globalSearch}
              onChange={setGlobalSearch}
              placeholder="Search orders, SKUs, inventory, aisles..."
              className="w-full"
            />
          </div>
        </div>

        {/* Right: Demo Mode, Presentation Toggle, Weather, Notifications, Profile, Logout */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Demo Mode Button */}
          <button
            type="button"
            onClick={() => setIsDemoOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-purple-600/25 transition-all hover:scale-[1.02]"
            title="Launch 60-Second Automated Hackathon Demo Tour"
            aria-label="Launch 60-Second Automated Hackathon Demo Tour"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Demo Tour (60s)</span>
          </button>

          {/* Presentation Mode Toggle */}
          <button
            type="button"
            onClick={togglePresentation}
            className={`p-2 rounded-xl border transition-all ${
              isPresentationMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
            }`}
            title="Toggle Presentation / Fullscreen Mode"
            aria-label="Toggle Presentation Fullscreen Mode"
          >
            <Tv className="h-4 w-4" />
          </button>

          {/* Weather Telemetry Chip */}
          {weatherData?.weather && role !== 'PICKER' && (
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs shadow-inner" role="status" aria-label={`Weather: ${weatherData.weather.temperature} degrees Celsius, ${weatherData.weather.condition}`}>
              {getWeatherIcon(weatherData.weather.condition)}
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-200">
                  {weatherData.weather.temperature}°C
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 truncate max-w-[90px]">
                  {weatherData.weather.condition}
                </span>
              </div>
            </div>
          )}

          {/* Live Notification Drawer Bell Button */}
          <button
            type="button"
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors"
            title="Open Live Notification Center"
            aria-label="Open Live Notification Center"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500" />
          </button>


          {/* User Profile Card */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs ring-2 ring-blue-500/30">
                {user.initials}
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
            </div>

            <div className="hidden lg:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-white leading-none">
                  {user.name}
                </span>
                <span
                  className={`text-[9px] font-bold font-mono px-1.5 py-0.2 rounded border uppercase ${
                    role === 'HEAD'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : role === 'MANAGER'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {role}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 leading-tight">
                {user.email}
              </span>
            </div>

            {/* Explicit Logout Button */}
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 hover:border-rose-500/50 rounded-xl text-xs font-bold transition-colors ml-2"
              title="Log out of current role"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Drawer Modal */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
      />

      {/* 60s Demo Mode Narrative Tour */}
      <DemoModeModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </>
  );
}
