'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react'; 

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a tiny invisible placeholder circle during SSR to prevent layout shift
  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-transparent pointer-events-none" aria-hidden="true" />;
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="p-2.5 rounded-full bg-accent border border-border text-foreground shadow-sm hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      {currentTheme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}