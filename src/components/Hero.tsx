import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';
import HeroBanner from './HeroBanner';

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText('npx anshuman');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <section className="hero container section">
      <HeroBanner />
      <div className="hero-layout">
        <div className="hero-left">
          <div className="hero-hud-panel mono" aria-label="System status">
            <span className="hud-label">SYSTEM STATUS</span>
            <span><b className="hud-status-dot"></b> STATUS: ONLINE</span>
            <span>STACK: AI / SYSTEMS</span>
            <span>LATENCY: &lt;30ms</span>
          </div>
        </div>
        
        <div className="hero-center">
          <div className="profile-wrapper">
            <div className="profile-ring outer-ring"></div>
            <div className="profile-ring inner-ring"></div>
            <div className="profile-image">
              <img src="/profile.png" alt="Anshuman Singh" />
            </div>
            <div className="crosshair-h"></div>
            <div className="crosshair-v"></div>
          </div>
          
          <h1 className="hero-name">Anshuman Singh</h1>
          
          <button
            type="button"
            className="hero-username mono text-sm"
            onClick={handleCopyCommand}
            title="Explore my portfolio from your terminal"
          >
            <span style={{ color: '#888' }}>$</span> 
            <span>npx anshuman</span>
            {copied ? (
              <Check size={12} className="copy-icon" style={{ color: '#14b8a6' }} />
            ) : (
              <Copy size={12} className="copy-icon" />
            )}
            {copied && <span style={{ fontSize: '10px', color: '#14b8a6', marginLeft: '4px' }}>COPIED</span>}
          </button>
          
          <h2 className="hero-title">
            Software Engineer<span className="cursor-blink"></span>
          </h2>
          
          <div className="hero-roles text-sm mono">
            AI SYSTEMS <span className="dot">·</span> BACKEND <span className="dot">·</span> OPEN SOURCE
          </div>

          <div className="availability-pill mono" role="status">
            <span className="availability-indicator" aria-hidden="true">
              <span className="availability-ping"></span>
              <span className="availability-dot"></span>
            </span>
            Available for Internships &amp; Projects
          </div>
          
          <div className="hero-actions">
            <a href="https://github.com/ANSHUMANSINGH987" target="_blank" rel="noopener noreferrer" className="hero-action-button">
              <FaGithub size={15} /> GitHub <ExternalLink size={13} />
            </a>
            <a href="https://www.linkedin.com/in/anshuman-singh-258245371" target="_blank" rel="noopener noreferrer" className="hero-action-button">
              <FaLinkedin size={15} /> LinkedIn <ExternalLink size={13} />
            </a>
            <a href="https://drive.google.com/file/d/16rdAEjke3ueGtOwGnjLIBktlESSN2fzl/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hero-action-button hero-resume-button">
              Resume <ExternalLink size={13} />
            </a>
          </div>
        </div>
        
        <div className="hero-right">
          <div className="hero-hud-panel hero-hud-panel-right mono" aria-label="Identity details">
            <span className="hud-label">IDENTITY</span>
            <span>LOCATION: INDIA</span>
            <span>ROLE: CS &amp; AI UNDERGRAD</span>
            <span>FOCUS: BUILDING USEFUL THINGS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
