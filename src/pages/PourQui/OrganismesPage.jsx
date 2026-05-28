import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PourQui.css';
import LogoSticker from '../../components/Common/LogoSticker';
import PourQuiPageHero from './PourQuiPageHero';
import {
  SLIDES,
  Icon,
  OR_PILLARS,
  OR_SERVICES,
  OR_STEPS,
  OR_DIFFS,
  useReveal,
  useAutoCycle,
  useSequentialReveal,
  Grad,
} from './pourQuiShared';

const slide = SLIDES[1];

export default function OrganismesPage() {
  const navigate = useNavigate();

  const [pilRef, pilVis] = useReveal(0.1);
  const [svRef, svVis] = useReveal(0.1);
  const [stRef, stVis] = useReveal(0.1);
  const [dfRef, dfVis] = useReveal(0.1);
  const [ctRef, ctVis] = useReveal(0.2);

  const [activeOrPil, setActiveOrPil] = useAutoCycle(pilVis, OR_PILLARS.length, 2600);
  const revealedOR = useSequentialReveal(dfVis, OR_DIFFS.length, 450);

  return (
    <div className="PQ-Root PQ-Root--subpage PQ-Root--org">
      <PourQuiPageHero slide={slide}>
        <button type="button" className="OR-Btn OR-Btn--solid" onClick={() => navigate('/contact')}>
          Demander une démo gratuite
        </button>
        <button type="button" className="OR-Btn OR-Btn--ghost PQ-Btn--hero-ghost" onClick={() => navigate('/contact')}>
          Nous contacter
        </button>
      </PourQuiPageHero>

      <div className={`OR-Block OR-Block--white ${pilVis ? 'is-vis' : ''}`} ref={pilRef}>
        <LogoSticker size={78} top="5%" left="3%" rotation={-18} opacity={0.13} animation="float" hideMobile />
        <div className="OR-Inner">
          <div className="OR-Head">
            <span className="OR-Label">Notre approche</span>
            <h2 className="OR-Title">
              Une <Grad className="OR-Grad">offre retraite</Grad> pensée <Grad className="OR-Green">pour vos enjeux</Grad>
            </h2>
          </div>
          <div className="OR-Pillars">
            {OR_PILLARS.map((p, i) => (
              <div
                key={p.key}
                className={`OR-Pillar ${activeOrPil === i ? 'is-active' : ''}`}
                style={{ '--pc': p.color, '--i': i }}
                onClick={() => setActiveOrPil(i)}
                onMouseEnter={() => setActiveOrPil(i)}
              >
                <div className="OR-Pillar-Face">
                  <div className="OR-Pillar-Top">
                    <div className="OR-Pillar-Dot" />
                    <h3 className="OR-Pillar-Title">{p.title}</h3>
                  </div>
                  <p className="OR-Pillar-Desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="OR-Pillars-Dots">
            {OR_PILLARS.map((p, i) => (
              <button
                key={p.key}
                type="button"
                className={`OR-Pillars-Dot ${activeOrPil === i ? 'is-active' : ''}`}
                style={{ '--pc': p.color }}
                onClick={() => setActiveOrPil(i)}
                aria-label={`Voir le pilier ${p.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={`OR-Block OR-Block--tint ${svVis ? 'is-vis' : ''}`} ref={svRef}>
        <LogoSticker size={85} bottom="8%" right="3%" rotation={20} opacity={0.14} animation="wobble" hideMobile />
        <div className="OR-Inner OR-Sv-Layout">
          <div className="OR-Sv-Left">
            <span className="OR-Label">Nos solutions</span>
            <h2 className="OR-Title">
              Des services <Grad className="OR-Grad">modulables</Grad>
              <br />
              selon vos besoins
            </h2>
            <p className="OR-Sub">Chaque organisme est unique. Nous adaptons notre accompagnement à votre structure, votre volume et vos objectifs.</p>
          </div>
          <div className="OR-Sv-Bubbles">
            {OR_SERVICES.map((s, i) => (
              <div key={s.title} className="OR-Sv-Bubble" style={{ '--i': i }}>
                <strong className="OR-Sv-Title">{s.title}</strong>
                <p className="OR-Sv-Desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`OR-Block OR-Block--dark ${stVis ? 'is-vis' : ''}`} ref={stRef}>
        <div className="OR-Inner">
          <div className="OR-Head OR-Head--light">
            <h2 className="OR-Title OR-VExp-Title" style={{ marginTop: 0 }}>
              Une expérience <Grad className="OR-Grad">simple</Grad> et <Grad className="OR-Grad">engageante</Grad>
            </h2>
          </div>
          <div className="OR-VTimeline OR-VTimeline--stack">
            {OR_STEPS.map((s, i) => (
              <div key={s.title} className="OR-VStep OR-VStep--stack" style={{ '--i': i }}>
                <div className="OR-VStep-Card">
                  <h3 className="OR-VStep-Title">{s.title}</h3>
                  <p className="OR-VStep-Desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`OR-Block OR-Block--white ${dfVis ? 'is-vis' : ''}`} ref={dfRef}>
        <div className="OR-Inner OR-Diff-Layout">
          <div className="OR-Diff-Left">
            <h2 className="OR-Title">
              Pourquoi <Grad className="OR-Green">KapAvenir ?</Grad>
            </h2>
          </div>
          <div className="OR-Diff-List">
            {OR_DIFFS.map((d, i) => (
              <div key={i} className={`OR-Diff-Row ${i < revealedOR ? 'is-vis' : ''}`} style={{ '--i': i }}>
                <div className={`OR-Diff-Chk ${i < revealedOR ? 'is-drawn' : ''}`}>{Icon.check}</div>
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`OR-CTA ${ctVis ? 'is-vis' : ''}`} ref={ctRef}>
        <div className="OR-Orb OR-Orb--1" />
        <div className="OR-Orb OR-Orb--2" />
        <div className="OR-CTA-Inner">
          <span className="OR-CTA-Eye">Passez à l&apos;étape suivante</span>
          <h2 className="OR-CTA-Title">
            <span className="OR-CTA-Title--grad">Construisons</span> votre offre retraite
          </h2>
          <p className="OR-CTA-Sub">Mutuelles, assureurs, caisses complémentaires — parlons de vos besoins.</p>
          <div className="OR-CTA-Btns">
            <button type="button" className="OR-Btn OR-Btn--white" onClick={() => navigate('/contact')}>
              Demander une démo gratuite
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button type="button" className="OR-Btn OR-Btn--outline" onClick={() => navigate('/contact')}>
              Contacter un conseiller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
