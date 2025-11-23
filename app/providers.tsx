'use client';

import { ThemeProvider } from 'next-themes';
import { ScrollManager } from '@/components/scroll-manager';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ScrollManager />
      {children}
    </ThemeProvider>
  );
}