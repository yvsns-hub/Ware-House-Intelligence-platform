import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'WarehouseIQ - AI-Powered Decision Intelligence Platform',
  description: 'Enterprise Autonomous Operations & Logistics Intelligence System.',
};

import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased font-sans">
        <Providers>
          <ErrorBoundary>
            <AppShell>{children}</AppShell>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
