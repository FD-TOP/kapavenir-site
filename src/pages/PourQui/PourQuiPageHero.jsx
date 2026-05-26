import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoSticker from '../../components/Common/LogoSticker';

export default function PourQuiPageHero({ slide, children }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(t);
  }, [slide.id]);

  return (
    <section className={`PQ-PageHero ${entered ? 'is-entered' : ''}`} style={{ '--ph-ac': slide.color }}>
      <div className="PQ-PageHero-Bg" style={{ backgroundImage: `url(${slide.image})` }} aria-hidden="true" />
      <div className="PQ-PageHero-Grid" aria-hidden="true" />
      <div className="PQ-PageHero-Mesh" aria-hidden="true">
        <span className="PQ-PageHero-Orb PQ-PageHero-Orb--1" />
        <span className="PQ-PageHero-Orb PQ-PageHero-Orb--2" />
        <span className="PQ-PageHero-Orb PQ-PageHero-Orb--3" />
      </div>
      <div className="PQ-PageHero-Overlay" aria-hidden="true" />
      <div className="PQ-PageHero-Shine" aria-hidden="true" />

      <LogoSticker size={100} top="12%" right="4%" rotation={14} opacity={0.18} animation="wobble" hideMobile />
      <LogoSticker size={68} bottom="18%" left="2%" rotation={-16} opacity={0.14} animation="float" hideMobile />

      <div className="PQ-PageHero-Inner">
        <Link to="/pour-qui" className="PQ-PageHero-Crumb">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Pour qui ?
        </Link>

        <span className="PQ-PageHero-Badge" style={{ borderColor: `${slide.color}55`, color: slide.color }}>
          <span className="PQ-PageHero-Badge-Pulse" style={{ background: slide.color }} />
          {slide.label}
        </span>

        <h1 className="PQ-PageHero-Title">{slide.heroTitle}</h1>
        <p className="PQ-PageHero-Desc">{slide.heroDesc}</p>

        {children ? <div className="PQ-PageHero-Actions">{children}</div> : null}
      </div>

      <div className="PQ-PageHero-Wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="PQ-PageHero-Wave-Svg">
          <path className="PQ-PageHero-Wave-Path" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="rgba(255,255,255,0.94)" />
        </svg>
      </div>
    </section>
  );
}
