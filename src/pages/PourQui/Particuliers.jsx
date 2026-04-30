import React, { useState, useEffect, useRef } from 'react';
import './Particuliers.css';
import couple1 from '../../assets/couple1.jpeg';
import women2  from '../../assets/women2.jpg';

/* ── Hook: compteur animé ── */
function useCounter(target, duration = 1800, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

/* ── Hook: scroll reveal ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ── Données ── */
const PROBLEMS = [
  'Relevés difficiles à comprendre',
  'Erreurs non détectées',
  'Décisions prises sans visibilité',
  'Règles qui évoluent constamment',
];

const PROMISES = [
  { icon: '🔍', label: 'Comprendre votre situation' },
  { icon: '📊', label: 'Visualiser vos options' },
  { icon: '✅', label: 'Décider en toute confiance' },
];

const SERVICES = [
  { title: 'Bilan retraite',         desc: 'Analyse complète, vérification de carrière, projections personnalisées', color: '#4381C1' },
  { title: 'Optimisation retraite',  desc: 'Scénarios pour partir plus tôt ou améliorer votre pension',               color: '#00bf63' },
  { title: 'Aide au départ',         desc: 'Accompagnement dans vos démarches jusqu'au premier paiement',             color: '#00b6de' },
  { title: 'Conseil personnalisé',   desc: 'Échange avec un expert pour répondre à vos questions',                    color: '#4381C1' },
];

const STEPS = [
  'Vous partagez votre situation',
  'Nous analysons vos droits',
  'Vous recevez des scénarios clairs',
  'Vous passez à l'action',
];

const BENEFITS = [
  { icon: '👁️', label: 'Une vision claire de votre retraite' },
  { icon: '🎯', label: 'Un départ au bon moment' },
  { icon: '💰', label: 'Une pension optimisée' },
  { icon: '😌', label: 'Moins de stress, plus de sérénité' },
];

const DIFFS = [
  'Une pédagogie simple et accessible',
  'Des recommandations concrètes',
  'Un accompagnement humain',
  'Une approche orientée décision',
];

/* ══════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════ */
export default function Particuliers() {

  /* Hero stats */
  const [heroRef, heroVis] = useReveal(0.2);
  const age    = useCounter(63,   1600, heroVis);
  const montant = useCounter(1840, 2000, heroVis);

  /* Autres sections */
  const [pbRef,   pbVis]   = useReveal();
  const [prRef,   prVis]   = useReveal();
  const [svRef,   svVis]   = useReveal();
  const [stRef,   stVis]   = useReveal();
  const [bnRef,   bnVis]   = useReveal();
  const [dfRef,   dfVis]   = useReveal();
  const [ctaRef,  ctaVis]  = useReveal(0.3);

  return (
    <div className="PT-Page">

      {/* ══ 1. HERO ══════════════════════════════ */}
      <section className="PT-Hero">
        <div className="PT-Hero-BG" />
        <div className="PT-Hero-Inner" ref={heroRef}>
          <div className="PT-Hero-Left">
            <span className="PT-Tag">Particuliers</span>
            <h1 className="PT-Hero-Title">
              Prenez le contrôle de<br />
              <span className="PT-Grad">votre retraite</span>
            </h1>
            <p className="PT-Hero-Sub">
              Comprenez vos droits, optimisez vos choix et partez au meilleur moment.
            </p>
            <div className="PT-Hero-CTAs">
              <button className="PT-Btn PT-Btn--blue">Faire mon bilan retraite</button>
              <button className="PT-Btn PT-Btn--outline">Estimer ma retraite</button>
            </div>
          </div>
          <div className="PT-Hero-Right">
            <div className="PT-Stat-Card PT-Stat-Card--blue">
              <span className="PT-Stat-Val">{age}<span className="PT-Stat-Unit"> ans</span></span>
              <span className="PT-Stat-Lbl">Âge moyen de départ</span>
            </div>
            <div className="PT-Stat-Card PT-Stat-Card--green">
              <span className="PT-Stat-Val">{montant}<span className="PT-Stat-Unit"> €</span></span>
              <span className="PT-Stat-Lbl">Retraite mensuelle estimée</span>
            </div>
          </div>
        </div>
        <div className="PT-Hero-Wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fff"/></svg>
        </div>
      </section>

      {/* ══ 2. LE PROBLÈME ═══════════════════════ */}
      <div className={"PT-Sec PT-Sec--alt " + (pbVis ? "is-vis" : "")} ref={pbRef}>
        <div className="PT-Sec-Inner PT-Pb-Grid">
          <div className="PT-Pb-Content">
            <span className="PT-Label PT-Label--red">Le problème</span>
            <h2 className="PT-Sec-Title">La retraite est complexe…<br /><em>mais ça ne devrait pas</em></h2>
            <ul className="PT-Pb-List">
              {PROBLEMS.map((p, i) => (
                <li key={i} className="PT-Pb-Item" style={{ transitionDelay: (i * 120) + 'ms' }}>
                  <span className="PT-Pb-Icon">✕</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="PT-Pb-Visual">
            <img src={women2} alt="personne devant ordinateur" className="PT-Pb-Img" />
            <div className="PT-Pb-Badge">
              <span>😕</span>
              <span>Perdu face aux démarches&nbsp;?</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 3. NOTRE PROMESSE ════════════════════ */}
      <div className={"PT-Sec " + (prVis ? "is-vis" : "")} ref={prRef}>
        <div className="PT-Sec-Inner">
          <div className="PT-Center">
            <span className="PT-Label PT-Label--blue">Notre promesse</span>
            <h2 className="PT-Sec-Title">Une approche simple,<br />claire et actionnable</h2>
          </div>
          <div className="PT-Promise-Grid">
            {PROMISES.map((p, i) => (
              <div key={i} className="PT-Promise-Card" style={{ transitionDelay: (i * 150) + 'ms' }}>
                <div className="PT-Promise-Icon">{p.icon}</div>
                <p className="PT-Promise-Label">{p.label}</p>
                <div className="PT-Promise-Bar" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 4. NOS SERVICES ══════════════════════ */}
      <div className={"PT-Sec PT-Sec--alt " + (svVis ? "is-vis" : "")} ref={svRef}>
        <div className="PT-Sec-Inner">
          <div className="PT-Center">
            <span className="PT-Label PT-Label--green">Nos services</span>
            <h2 className="PT-Sec-Title">Tout ce dont vous avez besoin</h2>
          </div>
          <div className="PT-Sv-Grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="PT-Sv-Card" style={{ '--sc': s.color, transitionDelay: (i * 100) + 'ms' }}>
                <div className="PT-Sv-Dot" />
                <div>
                  <div className="PT-Sv-Title">{s.title}</div>
                  <div className="PT-Sv-Desc">{s.desc}</div>
                </div>
                <svg className="PT-Sv-Arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 5. PROCESS ═══════════════════════════ */}
      <div className={"PT-Sec " + (stVis ? "is-vis" : "")} ref={stRef}>
        <div className="PT-Sec-Inner">
          <div className="PT-Center">
            <span className="PT-Label PT-Label--blue">Comment ça marche</span>
            <h2 className="PT-Sec-Title">Un parcours simple en 4 étapes</h2>
          </div>
          <div className="PT-Steps">
            {STEPS.map((s, i) => (
              <React.Fragment key={i}>
                <div className="PT-Step" style={{ transitionDelay: (i * 180) + 'ms' }}>
                  <div className="PT-Step-Num">{i + 1}</div>
                  <p className="PT-Step-Label">{s}</p>
                </div>
                {i < STEPS.length - 1 && <div className="PT-Step-Line" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 6. BÉNÉFICES ═════════════════════════ */}
      <div className={"PT-Sec PT-Sec--alt " + (bnVis ? "is-vis" : "")} ref={bnRef}>
        <div className="PT-Sec-Inner">
          <div className="PT-Center">
            <span className="PT-Label PT-Label--green">Les bénéfices</span>
            <h2 className="PT-Sec-Title">Ce que vous y gagnez</h2>
          </div>
          <div className="PT-Bn-Grid">
            {BENEFITS.map((b, i) => (
              <div key={i} className="PT-Bn-Card" style={{ transitionDelay: (i * 120) + 'ms' }}>
                <span className="PT-Bn-Icon">{b.icon}</span>
                <p className="PT-Bn-Label">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 7. DIFFÉRENCIATION ═══════════════════ */}
      <div className={"PT-Sec " + (dfVis ? "is-vis" : "")} ref={dfRef}>
        <div className="PT-Sec-Inner PT-Df-Grid">
          <div>
            <span className="PT-Label PT-Label--blue">Pourquoi nous ?</span>
            <h2 className="PT-Sec-Title">Pourquoi KapAvenir ?</h2>
            <p className="PT-Sec-Sub">Une méthode pensée pour vous, pas pour les administrations.</p>
          </div>
          <div className="PT-Df-List">
            {DIFFS.map((d, i) => (
              <div key={i} className="PT-Df-Item" style={{ transitionDelay: (i * 120) + 'ms' }}>
                <span className="PT-Df-Check">✓</span>
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 8. CTA FINAL ═════════════════════════ */}
      <div className={"PT-CTA-Section " + (ctaVis ? "is-vis" : "")} ref={ctaRef}>
        <div className="PT-CTA-Inner">
          <h2 className="PT-CTA-Title">Prenez quelques minutes aujourd'hui pour sécuriser des années de retraite</h2>
          <button className="PT-Btn PT-Btn--blue PT-Btn--lg">Faire mon bilan retraite</button>
        </div>
      </div>

    </div>
  );
}
