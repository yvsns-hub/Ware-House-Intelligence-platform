'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-amber-600/90 text-white px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 shadow-lg backdrop-blur-md">
      <WifiOff className="h-4 w-4 shrink-0 animate-pulse" />
      <span>Network Connection Lost • Operating in Offline Local Cache Mode</span>
    </div>
  );
}
