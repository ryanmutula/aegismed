'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  // Pull in resolvedTheme to accurately track system preferences
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = [
    { id: 'light', label: 'light 1.0' },
    { id: 'light-pink', label: 'light 2.0' },
    { id: 'dark-navy', label: 'dark 1.0' },
    { id: 'dark-grey', label: 'dark 2.0' },
  ];

  // Render an invisible placeholder during SSR to prevent layout shift & hydration loops
  if (!mounted) {
    return (
      <div className="flex flex-wrap gap-3 mb-10 justify-center opacity-0 pointer-events-none" aria-hidden="true">
        {themes.map((t) => (
          <div key={`skeleton-${t.id}`} className="px-4 py-2 rounded-lg text-sm font-bold border border-transparent">
            {t.label}
          </div>
        ))}
      </div>
    );
  }

  // Ensure we highlight the correct button even if the user hasn't explicitly set a theme yet
  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <div className="flex flex-wrap gap-3 mb-10 justify-center">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`px-4 py-2 rounded-lg text-sm font-bold border border-border transition-all
            ${
              currentTheme === t.id
                ? 'bg-primary text-background shadow-md scale-105'
                : 'bg-accent text-foreground hover:bg-secondary/20'
            }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}