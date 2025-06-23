
'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/contexts/theme-context';
import { Toaster } from '@/components/ui/sonner';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
        <Toaster richColors />
      </ThemeProvider>
    </SessionProvider>
  );
}
