'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useAuth } from '@/context/AuthContext';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    // If not authenticated and not on /login, redirect to /login
    if (!isAuthenticated && pathname !== '/login') {
      router.push('/login');
    }

    // If logged in as PICKER and attempting to access restricted management routes, redirect to /
    if (
      isAuthenticated &&
      role === 'PICKER' &&
      [
        '/inventory',
        '/warehouse',
        '/employees',
        '/decision-center',
        '/analytics',
        '/orders',
        '/settings',
      ].some((r) => pathname.startsWith(r))
    ) {
      router.push('/');
    }
  }, [isAuthenticated, pathname, role, router]);

  // If on login page, render full-screen without sidebar/navbar
  if (pathname === '/login' || !isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
