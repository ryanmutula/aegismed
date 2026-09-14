'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light" // Falls back to the default variables in :root
      themes={['light', 'light-pink', 'dark-navy', 'dark-grey']}
    >
      {children}
    </ThemeProvider>
  );
}