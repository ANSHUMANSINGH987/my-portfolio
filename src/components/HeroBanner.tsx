import React, { useEffect, useState } from 'react';
import { MapPin, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import './HeroBanner.css';

const dayParticles = [
  { left: '9%', top: '67%', delay: '0s', size: '4px' },
  { left: '23%', top: '78%', delay: '1.2s', size: '3px' },
  { left: '39%', top: '70%', delay: '2.4s', size: '5px' },
  { left: '58%', top: '82%', delay: '.6s', size: '3px' },
  { left: '76%', top: '68%', delay: '1.8s', size: '4px' },
  { left: '90%', top: '77%', delay: '3s', size: '3px' },
];

const nightParticles = [
  { left: '12%', top: '35%', delay: '.3s' },
  { left: '31%', top: '24%', delay: '1.8s' },
  { left: '51%', top: '42%', delay: '2.9s' },
  { left: '69%', top: '28%', delay: '1.1s' },
  { left: '87%', top: '48%', delay: '2.2s' },
];

const HeroBanner: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      setCurrentTime(new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date()));
    };
    updateClock();
    const interval = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';

  return (
    <div className="hero-banner" aria-label="Portfolio atmosphere and local time">
      <img
        className={`hero-banner-image hero-banner-day transition-opacity duration-700 ease-in-out ${isLight ? 'is-visible' : ''}`}
        src="/banners/day.gif"
        alt=""
      />
      <img
        className={`hero-banner-image hero-banner-night transition-opacity duration-700 ease-in-out ${mounted && !isLight ? 'is-visible' : ''}`}
        src="/banners/night.gif"
        alt=""
      />

      <div className="hero-banner-day-particles" aria-hidden="true">
        {dayParticles.map((particle, index) => (
          <span
            className="hero-banner-pollen"
            key={`pollen-${index}`}
            style={{ left: particle.left, top: particle.top, animationDelay: particle.delay, width: particle.size, height: particle.size }}
          />
        ))}
      </div>
      <div className="hero-banner-night-particles" aria-hidden="true">
        {nightParticles.map((particle, index) => (
          <span
            className="hero-banner-firefly"
            key={`firefly-${index}`}
            style={{ left: particle.left, top: particle.top, animationDelay: particle.delay }}
          />
        ))}
      </div>

      <svg className="hero-banner-wind" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-40 82 C 130 38, 270 118, 430 72 S 730 35, 910 78 S 1110 112, 1240 58" />
        <path d="M-40 104 C 120 70, 290 130, 470 94 S 760 62, 940 100 S 1120 130, 1240 88" />
      </svg>

      <div className="hero-banner-telemetry mono">
        <span className="hero-banner-location"><MapPin size={13} aria-hidden="true" /> IN</span>
        <span className="hero-banner-divider" aria-hidden="true">|</span>
        <time>        {currentTime || '--:--:-- --'}</time>
        <span className="hero-banner-divider" aria-hidden="true">|</span>
        <button
          type="button"
          className="hero-banner-theme-toggle"
          onClick={() => setTheme(isLight ? 'dark' : 'light')}
          aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
        >
          {isLight ? <Moon size={14} /> : <Sun size={14} />}
        </button>
      </div>

      <div className="hero-banner-vignette" />
    </div>
  );
};

export default HeroBanner;
