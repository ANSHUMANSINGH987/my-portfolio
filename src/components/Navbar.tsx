import React from 'react';
import { Search } from 'lucide-react';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar container">
      <div className="nav-left">
        <span className="logo-initials">AS</span>
        <span className="mono text-muted separator">&gt;</span>
        <span className="logo-name">Anshuman Singh</span>
      </div>
      
      <div className="nav-right">
        <ThemeToggle />
        <button className="command-trigger" type="button" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))} aria-label="Open command palette">
          <Search size={14} className="search-icon" />
          <div className="kbd-group">
            <kbd>Ctrl</kbd>
            <kbd>K</kbd>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
