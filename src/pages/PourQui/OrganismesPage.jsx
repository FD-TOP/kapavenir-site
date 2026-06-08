import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, LineChart, CircleCheck, ChevronRight } from 'lucide-react';
import './PourQui.css';
import LogoSticker from '../../components/Common/LogoSticker';
import PourQuiPageHero from './PourQuiPageHero';
import {
  SLIDES,
  Icon,
  OR_PILLARS,
  couple4,
  OR_SERVICES,
  OR_STEPS,
  OR_DIFFS,
  useReveal,
  useAutoCycle,
  useSequentialReveal,
  Grad,
} from './pourQuiShared';

const slide = SLIDES[1];

const OR_PILLAR_ICONS = {
  A: BookOpen,
  B: LineChart,
  C: CircleCheck,
};

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
          Parler à un expert
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
          <div className="OR-Approach">
            <div className="OR-Approach-Visual" aria-hidden>
              <div className="OR-Approach-Orb OR-Approach-Orb--a" />
              <div className="OR-Approach-Orb OR-Approach-Orb--b" />
              <div className="OR-Approach-Frame">
                <img
                  src={couple4}
                  alt="Couple accompagné dans ses décisions retraite"
                  className="OR-Approach-Img"
                />
                <div className="OR-Approach-ImgScrim" />
                <div className="OR-Approach-ImgBadge">
                  <span className="OR-Approach-ImgBadgeDot" />
                  Accompagnement humain &amp; personnalisé
                </div>
              </div>
            </div>

            <div className="OR-Approach-Panel">
              <div className="OR-Approach-PanelHead">
                <span className="OR-Approach-Kicker">3 étapes clés</span>
                <p className="OR-Approach-PanelSub">Un parcours structuré pour accompagner chaque assuré</p>
              </div>

              <div className="OR-Approach-PanelBody">
                <div className="OR-Approach-Track" aria-hidden>
                  <div className="OR-Approach-Rail">
                    <div
                      className="OR-Approach-RailFill"
                      style={{ height: `${((activeOrPil + 1) / OR_PILLARS.length) * 100}%` }}
                    />
                  </div>
                  {OR_PILLARS.map((p, i) => (
                    <span
                      key={p.key}
                      className={`OR-Approach-RailNode${activeOrPil === i ? ' is-active' : ''}${activeOrPil > i ? ' is-done' : ''}`}
                      style={{ '--pc': p.color }}
                    />
                  ))}
                </div>

                <div className="OR-Approach-Steps">
                  {OR_PILLARS.map((p, i) => {
                    const Ico = OR_PILLAR_ICONS[p.key];
                    return (
                      <button
                        key={p.key}
                        type="button"
                        className={`OR-Approach-Step${activeOrPil === i ? ' is-active' : ''}`}
                        style={{ '--pc': p.color, '--i': i }}
                        onClick={() => setActiveOrPil(i)}
                        onMouseEnter={() => setActiveOrPil(i)}
                        aria-expanded={activeOrPil === i}
                      >
                        <span className="OR-Approach-IcoWrap">
                          <Ico size={22} strokeWidth={2.2} />
                        </span>
                        <span className="OR-Approach-StepBody">
                          <span className="OR-Approach-Num">0{i + 1}</span>
                          <strong className="OR-Approach-Title">{p.title}</strong>
                          <span className="OR-Approach-Desc">{p.desc}</span>
                        </span>
                        <ChevronRight size={18} className="OR-Approach-Chevron" strokeWidth={2.5} />
                        {activeOrPil === i && <span className="OR-Approach-StepBar" key={`orbar-${i}`} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
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
            <p className="OR-Sub">
              Ce qui nous distingue : une méthode pensée pour l&apos;humain, portée par la technologie.
            </p>
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
