import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './PourQui.css';
import LogoSticker from '../../components/Common/LogoSticker';
import { SLIDES, HERO_DELAY } from './pourQuiShared';

export default function PourQuiHub() {
  const navigate = useNavigate();
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);
  const timer = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCur((n) => {
        const next = (n + 1) % SLIDES.length;
        setPrev(n);
        setTimeout(() => setPrev(null), 700);
        return next;
      });
    }, HERO_DELAY);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer.current);
  }, [startTimer]);

  const goTo = useCallback(
    (i) => {
      if (i === cur) return;
      setPrev(cur);
      setTimeout(() => setPrev(null), 700);
      setCur(i);
      startTimer();
    },
    [cur, startTimer]
  );

  const slide = SLIDES[cur];

  return (
    <div className="PQ-Root PQ-Root--hub">
      <section className="PQ-Hero">
        <LogoSticker size={120} top="10%" right="5%" rotation={15} opacity={0.2} animation="wobble" hideMobile />
        <LogoSticker size={75} bottom="15%" left="3%" rotation={-18} opacity={0.15} animation="float" hideMobile />

        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`PQ-Bg ${i === cur ? 'is-cur' : i === prev ? 'is-prev' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
            aria-hidden="true"
          />
        ))}

        <div className="PQ-Overlay" aria-hidden="true" />

        <div className="PQ-Stage">
          <h1 className="PQ-Title">
            Un accompagnement <span className="PQ-Accent" style={{ '--ac': slide.color }}>adapté</span>
            <br />à chaque situation
          </h1>
          <p className="PQ-Desc">
            Que vous soyez un particulier, une entreprise ou un organisme, KapAvenir vous aide à sécuriser et optimiser la retraite avec une approche <strong>claire et personnalisée</strong>.
          </p>
          <div className="PQ-Current" style={{ '--ac': slide.color }}>
            <span className="PQ-Current-Dot" />
            <div>
              <div className="PQ-Current-Label">{slide.label}</div>
              <div className="PQ-Current-Sub">{slide.sub}</div>
            </div>
            <button
              type="button"
              className="PQ-CTA"
              style={{ '--ac': slide.color }}
              onClick={() => navigate(slide.path)}
            >
              Découvrir
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="PQ-Thumbs" aria-label="Accès aux pages Pour qui">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`PQ-Thumb ${i === cur ? 'is-active' : ''}`}
              style={{ '--tc': s.color }}
              onClick={() => navigate(s.path)}
              onMouseEnter={() => goTo(i)}
              aria-label={`${s.label} — ${s.sub}`}
            >
              <div className="PQ-Thumb-Img" style={{ backgroundImage: `url(${s.image})` }} />
              <div className="PQ-Thumb-Info">
                <span className="PQ-Thumb-Label">{s.label}</span>
                <span className="PQ-Thumb-Sub">{s.sub}</span>
              </div>
              <div className="PQ-Thumb-Bar">{i === cur && <span className="PQ-Thumb-Progress" key={cur} />}</div>
            </button>
          ))}
        </nav>

        <div className="PQ-Dots" role="tablist" aria-label="Aperçu des profils">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === cur}
              className={`PQ-Dot ${i === cur ? 'is-active' : ''}`}
              style={{ '--dc': s.color }}
              onClick={() => goTo(i)}
              aria-label={s.label}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
