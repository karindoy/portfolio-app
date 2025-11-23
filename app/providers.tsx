'use client';

import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';
import { ScrollManager } from '@/components/scroll-manager';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Suspense fallback={null}>
        <ScrollManager />
      </Suspense>
      {children}
    </ThemeProvider>
  );
}