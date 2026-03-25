import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-primary/20 backdrop-blur-xl border border-white/20 text-primary hover:bg-primary/30 transition-all shadow-2xl group"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
        ) : (
          <Moon className="w-6 h-6 group-hover:-rotate-12 transition-transform duration-500" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
