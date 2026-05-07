import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const [visible,  setVisible]  = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled  = window.scrollY;
      const total     = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 340);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const R    = 22;
  const circ = 2 * Math.PI * R;

  return (
    <button
      className={'STT-Btn' + (visible ? ' is-visible' : '')}
      onClick={goTop}
      aria-label="Retour en haut"
      title="Retour en haut"
    >
      {/* progress ring */}
      <svg className="STT-Ring" viewBox="0 0 52 52" aria-hidden="true">
        <defs>
          <linearGradient id="stt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#4381C1" />
            <stop offset="100%" stopColor="#00bf63" />
          </linearGradient>
        </defs>
        <circle cx="26" cy="26" r={R} className="STT-Ring-Bg" />
        <circle
          cx="26" cy="26" r={R}
          className="STT-Ring-Fill"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - progress)}
        />
      </svg>

      {/* arrow icon */}
      <svg className="STT-Arrow" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.8"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
