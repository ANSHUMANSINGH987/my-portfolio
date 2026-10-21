import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command } from 'cmdk';
import { Check, Copy, FileText, Moon, Search, Sun } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useTheme } from 'next-themes';

const RESUME_URL = 'https://drive.google.com/file/d/16rdAEjke3ueGtOwGnjLIBktlESSN2fzl/view?usp=sharing';
const EMAIL = 'singhanshuman584@gmail.com';
const GITHUB_URL = 'https://github.com/ANSHUMANSINGH987';

interface CommandPaletteProps {
  onOpenChange?: (open: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ onOpenChange }) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== 'light';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    onOpenChange?.(open);
  }, [onOpenChange, open]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const close = () => setOpen(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    close();
  };

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${label} copied`);
      close();
    } catch (error) {
      console.warn(`Could not copy ${label}:`, error);
      setToast(`Could not copy ${label.toLowerCase()}`);
    }
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
    close();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="command-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}
          >
            <motion.div
              className="command-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.18 }}
            >
              <Command label="Portfolio commands">
                <div className="command-search-row">
                  <Search size={17} aria-hidden="true" />
                  <Command.Input autoFocus placeholder="Type a command or search..." />
                  <kbd>ESC to exit</kbd>
                </div>
                <Command.List>
                  <Command.Empty>No results found.</Command.Empty>
                  <Command.Group heading="Navigation">
                    <Command.Item onSelect={() => scrollTo('selected-projects')}>Go to Projects <span>01 //</span></Command.Item>
                    <Command.Item onSelect={() => scrollTo('tech-stack')}>Go to Tech Stack <span>02 //</span></Command.Item>
                    <Command.Item onSelect={() => scrollTo('proof-of-work')}>Go to Proof of Work <span>04 //</span></Command.Item>
                    <Command.Item onSelect={() => scrollTo('visitor-analytics')}>Go to Analytics <span>05 //</span></Command.Item>
                  </Command.Group>
                  <Command.Group heading="Quick actions">
                    <Command.Item onSelect={() => { window.open(RESUME_URL, '_blank', 'noopener,noreferrer'); close(); }}>
                      <FileText size={15} /> Download Resume (PDF)
                    </Command.Item>
                    <Command.Item onSelect={() => copy(EMAIL, 'Email address')}><Copy size={15} /> Copy Email Address</Command.Item>
                    <Command.Item onSelect={() => copy(GITHUB_URL, 'GitHub profile')}><FaGithub size={15} /> Copy GitHub Profile</Command.Item>
                    <Command.Item onSelect={toggleTheme}>{isDark ? <Sun size={15} /> : <Moon size={15} />} Toggle Theme <span>{isDark ? 'LIGHT' : 'DARK'}</span></Command.Item>
                  </Command.Group>
                  <Command.Group heading="Projects">
                    <Command.Item onSelect={() => scrollTo('agentic-gateway')}>Agentic Commerce Gateway</Command.Item>
                    <Command.Item onSelect={() => scrollTo('mcp-chronoshell')}>MCP Chronoshell</Command.Item>
                    <Command.Item onSelect={() => scrollTo('edumetrics')}>EduMetrics</Command.Item>
                    <Command.Item onSelect={() => scrollTo('neurograph')}>NeuroGraph</Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {toast && <div className="command-toast"><Check size={14} /> {toast}</div>}
    </>
  );
};

export default CommandPalette;
