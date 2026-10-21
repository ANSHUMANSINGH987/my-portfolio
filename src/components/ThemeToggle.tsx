import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== 'light';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <motion.span
        className="theme-toggle-icon"
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 1.08 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {isDark ? <Moon size={15} /> : <Sun size={15} />}
      </motion.span>
    </button>
  );
};

export default ThemeToggle;
