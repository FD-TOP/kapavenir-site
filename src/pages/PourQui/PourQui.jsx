import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PourQui.css';
import LogoSticker from '../../components/Common/LogoSticker';

import couple1  from '../../assets/couple1.jpeg';
import couple4  from '../../assets/couple4.jpeg';
import meeting4 from '../../assets/meeting4.jpg';
import meeting1 from '../../assets/meeting1.jpg';
import women3   from '../../assets/women3.jpeg';

const SLIDES = [
  { id: 'particuliers', sectionId: 'particuliers',   image: couple1,  label: 'Particuliers',            sub: 'Retraite individuelle',        color: '#4381C1' },
  { id: 'organismes',   sectionId: 'organismes',      image: meeting4, label: 'Organismes & Assurances',  sub: 'Partenariats institutionnels', color: '#00bf63' },
  { id: 'entreprises',  sectionId: 'entreprises-rh',  image: meeting1, label: 'Entreprises & RH',         sub: 'Solutions collectives',        color: '#00b6de' },
];
const DELAY = 4500;

function smoothScroll(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function useCounter(target, duration, started) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

/* ── SVG icons charte graphique ── */
const Icon = {
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
};

const PROBLEMS = [
  { icon: Icon.doc,     text: 'Relevés difficiles à comprendre' },
  { icon: Icon.alert,   text: 'Erreurs non détectées' },
  { icon: Icon.eye,     text: 'Décisions prises sans visibilité' },
  { icon: Icon.refresh, text: 'Règles qui évoluent constamment' },
];
const PROMISES = [
  { icon: Icon.search, num: '01', label: 'Comprendre votre situation', desc: 'Un diagnostic complet de votre carrière et de vos droits acquis.' },
  { icon: Icon.chart,  num: '02', label: 'Visualiser vos options',     desc: 'Des scénarios chiffrés pour choisir le moment idéal de départ.' },
  { icon: Icon.shield, num: '03', label: 'Décider en toute confiance', desc: 'Un accompagnement humain jusqu’à votre premier versement.' },
];
const SERVICES = [
  { icon: Icon.chart,  title: 'Bilan retraite',        desc: 'Analyse complète, vérification de carrière et projections personnalisées.', color: '#4381C1' },
  { icon: Icon.target, title: 'Optimisation retraite', desc: 'Scénarios pour partir plus tôt ou maximiser votre pension.',                 color: '#00bf63' },
  { icon: Icon.arrow,  title: 'Aide au départ',        desc: 'Accompagnement dans vos démarches jusqu’au premier paiement.',          color: '#00b6de' },
  { icon: Icon.user,   title: 'Conseil personnalisé',  desc: 'Échange direct avec un expert dédié à vos questions.',                       color: '#4381C1' },
];
const STEPS = [
  { title: 'Vous partagez',  desc: 'Votre situation, vos objectifs et vos questions.' },
  { title: 'Nous analysons', desc: 'Vos droits, vos trimestres et vos scénarios.' },
  { title: 'Vous recevez',   desc: 'Un rapport clair et des recommandations précises.' },
  { title: 'Vous agissez',   desc: 'En toute confiance, au moment optimal.' },
];
const BENEFITS = [
  { icon: Icon.eye,    label: 'Une vision claire',   sub: 'de votre retraite',   color: '#4381C1' },
  { icon: Icon.clock,  label: 'Le bon moment',        sub: 'pour partir',          color: '#00bf63' },
  { icon: Icon.wallet, label: 'Une pension',          sub: 'optimisée',             color: '#00b6de' },
  { icon: Icon.heart,  label: 'Plus de sérénité',    sub: 'et moins de stress',   color: '#4381C1' },
];
const DIFFS = [
  'Une pédagogie simple et accessible',
  'Des recommandations concrètes',
  'Un accompagnement humain',
  'Une approche orientée décision',
];


const OR_PILLARS = [
  { key: 'A', color: '#00bf63', title: 'Comprendre', desc: 'Rendre la retraite lisible et accessible à tous vos clients.' },
  { key: 'B', color: '#00b6de', title: 'Projeter',   desc: 'Donner de la visibilité et des scénarios concrets à chaque assuré.' },
  { key: 'C', color: '#4381C1', title: 'Agir',       desc: "Transformer l'information en décisions concrètes et mesurables." },
];
const OR_SERVICES = [
  { n: '01', title: 'Diagnostic retraite',       desc: 'Vision claire, projections personnalisées, restitution simple.' },
  { n: '02', title: 'Parcours client intégré',   desc: "Expérience fluide du diagnostic à l'action, en marque blanche." },
  { n: '03', title: 'Aide à la décision',        desc: 'Outils et supports pour accompagner vos conseillers au quotidien.' },
  { n: '04', title: 'Accompagnement expert',     desc: 'Entretiens personnalisés pour les situations complexes.' },
  { n: '05', title: 'Programme pédagogique',     desc: 'Contenus, ateliers et formation de vos équipes en interne.' },
];
const OR_STEPS = [
  { n: '01', title: 'Diagnostic rapide',        desc: 'Analyse de la situation retraite du client en quelques minutes.' },
  { n: '02', title: 'Analyse personnalisée',    desc: 'Projections adaptées à chaque profil et chaque objectif.' },
  { n: '03', title: 'Recommandations claires',  desc: 'Un rapport simple, lisible, actionnable par le conseiller.' },
  { n: '04', title: "Passage à l'action",      desc: "Accompagnement jusqu'aux démarches et décisions finales." },
];
const OR_DIFFS = [
  'Approche pédagogique avant tout',
  "Expérience pensée pour le client final",
  'Équilibre digital et humain',
  'Vision orientée résultats',
];


const ER_ENJEUX = [
  { key:'A', color:'#00b6de', title:'Anticiper les départs et la transmission des compétences',    stat: null },
  { key:'B', color:'#4381C1', title:'Répondre aux attentes des collaborateurs',                    stat: '86% attendent un accompagnement' },
  { key:'C', color:'#00bf63', title:'Structurer votre politique senior',                           stat: null },
  { key:'D', color:'#4381C1', title:'Valoriser votre marque employeur',                           stat: null },
];
const ER_ENJEUX_ORDERED = [...ER_ENJEUX].sort((a, b) => a.key.localeCompare(b.key));
const ER_SERVICES = [
  { n:'01', title:'Pilotage des départs',                  desc:'Anticipez les âges de départ et structurez vos effectifs.' },
  { n:'02', title:'Diagnostic retraite collaborateurs',    desc:'Vision claire + projections personnalisées pour chaque salarié.' },
  { n:'03', title:'Parcours salarié',                      desc:'Accompagnement progressif tout au long de la carrière.' },
  { n:'04', title:'Accompagnement fin de carrière',        desc:'Aide à la transition : temps partiel, retraite progressive, départ.' },
  { n:'05', title:'Formation & support RH',                desc:'Montée en compétence de vos équipes RH sur les enjeux retraite.' },
];
const ER_STEPS = [
  { n:'01', title:'Sensibilisation',           desc:'Webinaires et contenus pédagogiques pour vos collaborateurs.' },
  { n:'02', title:'Diagnostic personnalisé',   desc:'Analyse individuelle des droits et projections retraite.' },
  { n:'03', title:'Recommandations concrètes', desc:"Un plan d'action clair, adapté à chaque profil." },
  { n:'04', title:"Passage à l'action",        desc:"Accompagnement jusqu'aux démarches et décisions finales." },
];
const ER_OUTILS = [
  'Tableaux de projection des départs',
  'Simulateurs et aides à la décision',
  'Ressources pédagogiques prêtes à emploi',
  'Veille réglementaire simplifiée',
];
const ER_BENEFITS = [
  { color:'#00b6de', icon: Icon.chart,  title:'Meilleure anticipation RH' },
  { color:'#4381C1', icon: Icon.heart,  title:'Collaborateurs plus sereins' },
  { color:'#00bf63', icon: Icon.shield, title:'Marque employeur renforcée' },
  { color:'#4381C1', icon: Icon.target, title:'Décisions plus éclairées' },
];
const ER_DIFFS = [
  'Une approche centrée RH (pas uniquement technique)',
  'Une vraie expérience collaborateur',
  'Un équilibre digital & humain',
  "Une logique d'impact (engagement, fidélisation)",
];

export default function PourQui() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cur, setCur]   = useState(0);
  const [prev, setPrev] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => smoothScroll(id), 200);
    }
  }, [location.hash]);

  const startTimer = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCur(n => { const next = (n + 1) % SLIDES.length; setPrev(n); setTimeout(() => setPrev(null), 700); return next; });
    }, DELAY);
  }, []);

  useEffect(() => { startTimer(); return () => clearInterval(timer.current); }, [startTimer]);

  const goTo = useCallback((i) => {
    if (i === cur) return;
    setPrev(cur); setTimeout(() => setPrev(null), 700); setCur(i); startTimer();
  }, [cur, startTimer]);

  const slide = SLIDES[cur];

  const [introRef, introVis] = useReveal(0.2);
  const age     = useCounter(63,   1600, introVis);
  const montant = useCounter(1840, 2000, introVis);
  const [pbRef, pbVis] = useReveal();
  const [prRef, prVis] = useReveal();
  const [svRef, svVis] = useReveal();
  const [stRef, stVis] = useReveal();
  const [bnRef, bnVis] = useReveal();
  const [dfRef, dfVis] = useReveal();
  const [ctRef, ctVis] = useReveal(0.3);

  /* ── Entreprises refs ── */
  const [erIntroRef, erIntroVis] = useReveal(0.15);
  const [erEnjRef,   erEnjVis]   = useReveal(0.1);
  const [erSvRef,    erSvVis]    = useReveal(0.1);
  const [erStRef,    erStVis]    = useReveal(0.1);
  const [erOuRef,    erOuVis]    = useReveal(0.1);
  const [erBnRef,    erBnVis]    = useReveal(0.1);
  const [erDfRef,    erDfVis]    = useReveal(0.1);
  const [erCtRef,    erCtVis]    = useReveal(0.2);
  /* Carousel Enjeux auto */
  const [activeEnj, setActiveEnj] = useState(0);
  useEffect(() => {
    if (!erEnjVis) return;
    const t = setInterval(() => setActiveEnj((n) => (n + 1) % ER_ENJEUX_ORDERED.length), 2600);
    return () => clearInterval(t);
  }, [erEnjVis]);
  /* Bénéfices auto */
  const [activeErBn, setActiveErBn] = useState(0);
  useEffect(() => {
    if (!erBnVis) return;
    const t = setInterval(() => setActiveErBn(n => (n + 1) % ER_BENEFITS.length), 2000);
    return () => clearInterval(t);
  }, [erBnVis]);
  /* Counters intro */
  const erAge = useCounter(62, 1400, erIntroVis);
  const erPct = useCounter(86, 1200, erIntroVis);
  /* Checklist reveal */
  const [revealedER, setRevealedER] = useState(0);
  useEffect(() => {
    if (!erDfVis) return;
    if (revealedER >= ER_DIFFS.length) return;
    const t = setTimeout(() => setRevealedER(n => n + 1), 460);
    return () => clearTimeout(t);
  }, [erDfVis, revealedER]);

  /* ── Organismes refs ── */
  const [orIntroRef, orIntroVis] = useReveal(0.15);
  const [orPilRef,   orPilVis]   = useReveal(0.1);
  const [orSvRef,    orSvVis]    = useReveal(0.1);
  const [orStRef,    orStVis]    = useReveal(0.1);
  const [orDfRef,    orDfVis]    = useReveal(0.1);
  const [orCtRef,    orCtVis]    = useReveal(0.2);
  const [revealedOR, setRevealedOR] = useState(0);
  const [activeOrPil, setActiveOrPil] = useState(0);
  useEffect(() => {
    if (!orPilVis) return;
    const t = setInterval(() => setActiveOrPil((n) => (n + 1) % OR_PILLARS.length), 2600);
    return () => clearInterval(t);
  }, [orPilVis]);
  useEffect(() => {
    if (!orDfVis) return;
    if (revealedOR >= OR_DIFFS.length) return;
    const t = setTimeout(() => setRevealedOR(n => n + 1), 450);
    return () => clearTimeout(t);
  }, [orDfVis, revealedOR]);

  /* ── Timeline auto-cycle ── */
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if (!stVis) return;
    const t = setInterval(() => setActiveStep(n => (n + 1) % STEPS.length), 2400);
    return () => clearInterval(t);
  }, [stVis]);

  /* ── Bénéfices auto-cycle ── */
  const [activeBn, setActiveBn] = useState(0);
  useEffect(() => {
    if (!bnVis) return;
    const t = setInterval(() => setActiveBn(n => (n + 1) % BENEFITS.length), 2000);
    return () => clearInterval(t);
  }, [bnVis]);

  /* ── Checklist reveal séquentiel ── */
  const [revealedDiffs, setRevealedDiffs] = useState(0);
  useEffect(() => {
    if (!dfVis) return;
    if (revealedDiffs >= DIFFS.length) return;
    const t = setTimeout(() => setRevealedDiffs(n => n + 1), 480);
    return () => clearTimeout(t);
  }, [dfVis, revealedDiffs]);

  /* ── Compteurs panel droite ── */
  const stat98 = useCounter(98,   1400, dfVis);
  const stat12 = useCounter(12,   1100, dfVis);
  const stat3k = useCounter(3,    1800, dfVis);

  return (
    <div className="PQ-Root">

      {/* ══ HERO ═══════════════════════════════ */}
      <section className="PQ-Hero">
        {/* Stickers décoratifs */}
        <LogoSticker size={120} top="10%" right="5%" rotation={15} opacity={0.2} animation="wobble" hideMobile />
        <LogoSticker size={75}  bottom="15%" left="3%" rotation={-18} opacity={0.15} animation="float" hideMobile />
        {SLIDES.map((s, i) => (
          <div key={s.id}
            className={"PQ-Bg " + (i === cur ? "is-cur" : i === prev ? "is-prev" : "")}
            style={{ backgroundImage: "url(" + s.image + ")" }} aria-hidden="true" />
        ))}
        <div className="PQ-Overlay" aria-hidden="true" />
        <div className="PQ-Stage">
          <span className="PQ-Tag">Pour qui ?</span>
          <h1 className="PQ-Title">
            Un accompagnement <span className="PQ-Accent" style={{ "--ac": slide.color }}>adapté</span><br />à chaque situation
          </h1>
          <p className="PQ-Desc">
            Que vous soyez un particulier, une entreprise ou un organisme, KapAvenir vous aide à sécuriser et optimiser la retraite avec une approche <strong>claire et personnalisée</strong>.
          </p>
          <div className="PQ-Current" style={{ "--ac": slide.color }}>
            <span className="PQ-Current-Dot" />
            <div>
              <div className="PQ-Current-Label">{slide.label}</div>
              <div className="PQ-Current-Sub">{slide.sub}</div>
            </div>
            <button className="PQ-CTA" style={{ "--ac": slide.color }} onClick={() => smoothScroll(slide.sectionId)}>
              Découvrir
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        <div className="PQ-Thumbs">
          {SLIDES.map((s, i) => (
            <button key={s.id} className={"PQ-Thumb " + (i === cur ? "is-active" : "")} style={{ "--tc": s.color }} onClick={() => goTo(i)}>
              <div className="PQ-Thumb-Img" style={{ backgroundImage: "url(" + s.image + ")" }} />
              <div className="PQ-Thumb-Info">
                <span className="PQ-Thumb-Label">{s.label}</span>
                <span className="PQ-Thumb-Sub">{s.sub}</span>
              </div>
              <div className="PQ-Thumb-Bar">{i === cur && <span className="PQ-Thumb-Progress" key={cur} />}</div>
            </button>
          ))}
        </div>
        <div className="PQ-Dots">
          {SLIDES.map((s, i) => (
            <button key={s.id} className={"PQ-Dot " + (i === cur ? "is-active" : "")} style={{ "--dc": s.color }} onClick={() => goTo(i)} />
          ))}
        </div>
      </section>

      {/* ══ PARTICULIERS ═══════════════════════ */}
      <div id="particuliers">

        {/* 1 — Intro */}
        <div className={"PQ-Block PQ-Block--gradient " + (introVis ? "is-vis" : "")} ref={introRef}>
          <LogoSticker size={95} top="6%" right="3%" rotation={15} opacity={0.16} animation="wobble" hideMobile />
          <div className="PQ-Block-Inner PQ-Split">
            <div className="PQ-Intro-Left">
              <span className="PQ-Label PQ-Label--blue">Particuliers</span>
              <h2 className="PQ-Block-Title">Prenez le contrôle de<br /><span className="PQ-Grad">votre retraite</span></h2>
              <p className="PQ-Block-Sub">Comprenez vos droits, optimisez vos choix et partez au meilleur moment.</p>
              <div className="PQ-BtnRow">
                <button className="PQ-Btn PQ-Btn--solid" onClick={() => navigate('/services/bilan')}>Faire mon bilan retraite</button>
                <button className="PQ-Btn PQ-Btn--border" onClick={() => navigate('/services/bilan')}>Estimer ma retraite</button>
              </div>
            </div>
            <div className="PQ-Counters">

              {/* Counter A — Âge */}
              <div className="PQ-Counter PQ-Counter--a">
                <div className="PQ-Counter-Header">
                  <div className="PQ-Counter-IcoWrap PQ-Counter-IcoWrap--a">{Icon.clock}</div>
                  <span className="PQ-Counter-Tag">Âge moyen de départ</span>
                </div>
                <div className="PQ-Counter-ValRow">
                  <span className="PQ-Counter-Big">{age}</span>
                  <span className="PQ-Counter-Unit">ans</span>
                </div>
                <p className="PQ-Counter-Hint">Âge moyen de départ à la retraite en France</p>
                <div className="PQ-Counter-Track">
                  <div className="PQ-Counter-Fill PQ-Counter-Fill--a"
                    style={{ width: introVis ? `${Math.round((age / 70) * 100)}%` : '0%' }} />
                  <span className="PQ-Counter-Pct">{introVis ? Math.round((age / 70) * 100) : 0}%</span>
                </div>
              </div>

              {/* Counter B — Montant */}
              <div className="PQ-Counter PQ-Counter--b">
                <div className="PQ-Counter-Header">
                  <div className="PQ-Counter-IcoWrap PQ-Counter-IcoWrap--b">{Icon.wallet}</div>
                  <span className="PQ-Counter-Tag">Pension mensuelle estimée</span>
                </div>
                <div className="PQ-Counter-ValRow">
                  <span className="PQ-Counter-Big">{montant.toLocaleString('fr-FR')}</span>
                  <span className="PQ-Counter-Unit">€/mois</span>
                </div>
                <p className="PQ-Counter-Hint">Montant moyen de retraite tous régimes confondus</p>
                <div className="PQ-Counter-Track">
                  <div className="PQ-Counter-Fill PQ-Counter-Fill--b"
                    style={{ width: introVis ? `${Math.round((montant / 2000) * 100)}%` : '0%' }} />
                  <span className="PQ-Counter-Pct">{introVis ? Math.round((montant / 2000) * 100) : 0}%</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 2 — Problème */}
        <div className={"PQ-Block PQ-Block--light " + (pbVis ? "is-vis" : "")} ref={pbRef}>
          <LogoSticker size={70} bottom="10%" left="2%" rotation={-18} opacity={0.13} animation="float" hideMobile />
          <div className="PQ-Block-Inner PQ-Split PQ-Split--photo-right">
            <div className="PQ-Pb-Content">
              <span className="PQ-Label PQ-Label--slate">Le problème</span>
              <h2 className="PQ-Block-Title">La retraite est complexe…<br /><em>mais ça ne devrait pas l’être</em></h2>
              <div className="PQ-Pb-List">
                {PROBLEMS.map((p, i) => (
                  <div key={i} className="PQ-Pb-Row" style={{ transitionDelay: (i * 100) + "ms" }}>
                    <div className="PQ-Pb-Ico">{p.icon}</div>
                    <span className="PQ-Pb-Text">{p.text}</span>
                    <div className="PQ-Pb-Cross">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="PQ-Photo-Wrap">
              <img src={women3} alt="Complexité retraite" className="PQ-Photo" />
              <div className="PQ-Photo-Float PQ-Photo-Float--tr">
                <div className="PQ-Float-Icon">{Icon.doc}</div>
                <span>+4 régimes différents</span>
              </div>
              <div className="PQ-Photo-Float PQ-Photo-Float--bl">
                <div className="PQ-Float-Icon">{Icon.alert}</div>
                <span>Droits souvent mal calculés</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 — Promesse */}
        <div className={"PQ-Block " + (prVis ? "is-vis" : "")} ref={prRef}>
          <LogoSticker size={88} top="5%" right="4%" rotation={-14} opacity={0.15} animation="wobble" hideMobile />
          <div className="PQ-Block-Inner">
            <div className="PQ-Head">
              <span className="PQ-Label PQ-Label--blue">Notre promesse</span>
              <h2 className="PQ-Block-Title">Une approche <span className="PQ-Grad">simple, claire</span> et actionnable</h2>
            </div>
            <div className="PQ-Promise-Grid">
              {PROMISES.map((p, i) => (
                <div key={i} className="PQ-Promise-Card" style={{ transitionDelay: (i * 150) + "ms" }}>
                  <div className="PQ-Promise-Top">
                    <span className="PQ-Promise-Num">{p.num}</span>
                    <div className="PQ-Promise-IcoBox">{p.icon}</div>
                  </div>
                  <h3 className="PQ-Promise-Title">{p.label}</h3>
                  <p className="PQ-Promise-Desc">{p.desc}</p>
                  <div className="PQ-Promise-Rule" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 — Services */}
        <div className={"PQ-Block PQ-Block--light " + (svVis ? "is-vis" : "")} ref={svRef}>
          <LogoSticker size={75} bottom="8%" right="2%" rotation={20} opacity={0.13} animation="float" hideMobile />
          <div className="PQ-Block-Inner">
            <div className="PQ-Head">
              <span className="PQ-Label PQ-Label--green">Nos services</span>
              <h2 className="PQ-Block-Title">Tout ce dont vous avez besoin</h2>
            </div>
            <div className="PQ-Sv-Grid">
              {SERVICES.map((s, i) => (
                <div key={i} className="PQ-Sv-Card" style={{ "--sc": s.color, transitionDelay: (i * 100) + "ms" }}>
                  <div className="PQ-Sv-IcoWrap">{s.icon}</div>
                  <div>
                    <h3 className="PQ-Sv-Title">{s.title}</h3>
                    <p className="PQ-Sv-Desc">{s.desc}</p>
                  </div>
                  <div className="PQ-Sv-Chevron">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5 — Process */}
        <div className={"PQ-Block PQ-Block--process " + (stVis ? "is-vis" : "")} ref={stRef}>
          <LogoSticker size={90} top="6%" left="3%" rotation={-16} opacity={0.15} animation="wobble" hideMobile />
          <div className="PQ-Block-Inner">
            <div className="PQ-Head">
              <span className="PQ-Label PQ-Label--blue">Le processus</span>
              <h2 className="PQ-Block-Title">Un parcours simple <span className="PQ-Grad">en 4 étapes</span></h2>
              <p className="PQ-Head-Sub">De la première prise de contact à votre pension : un chemin clair et accompagné.</p>
            </div>
            <div className="PQ-Timeline">
              <div className="PQ-TL-Rail">
                <div className="PQ-TL-Track" style={{ width: stVis ? `${(activeStep / (STEPS.length - 1)) * 100}%` : '0%' }} />
              </div>
              {STEPS.map((s, i) => (
                <div key={i}
                  className={"PQ-TStep" + (i % 2 === 1 ? " PQ-TStep--down" : "") + (activeStep === i ? " is-active" : "")}
                  style={{ "--i": i }}>
                  <div className="PQ-TStep-Badge">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <div className="PQ-TStep-Ring" />
                  </div>
                  <div className="PQ-TStep-Card">
                    <span className="PQ-TStep-BgNum">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="PQ-TStep-Title">{s.title}</h3>
                    <p className="PQ-TStep-Desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6 — Bénéfices */}
        <div className={"PQ-Block PQ-Block--light " + (bnVis ? "is-vis" : "")} ref={bnRef}>
          <LogoSticker size={80} bottom="10%" left="2%" rotation={18} opacity={0.14} animation="float" hideMobile />
          <div className="PQ-Block-Inner">
            <div className="PQ-Head">
              <span className="PQ-Label PQ-Label--green">Les bénéfices</span>
              <h2 className="PQ-Block-Title">Ce que vous y gagnez</h2>
            </div>
            <div className="PQ-Bn-Grid">
              {BENEFITS.map((b, i) => (
                <div key={i}
                  className={"PQ-Bn-Card" + (activeBn === i ? " is-active" : "")}
                  style={{ "--bc": b.color, transitionDelay: bnVis ? (i * 110) + "ms" : "0ms" }}>
                  {activeBn === i && <div className="PQ-Bn-Bar" key={`bnbar-${i}-${activeBn}`} />}
                  <div className="PQ-Bn-IcoWrap">{b.icon}</div>
                  <strong className="PQ-Bn-Title">{b.label}</strong>
                  <span className="PQ-Bn-Sub">{b.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7 — Différenciation */}
        <div className={"PQ-Block PQ-Block--why " + (dfVis ? "is-vis" : "")} ref={dfRef}>
          <LogoSticker size={85} top="5%" right="3%" rotation={-20} opacity={0.14} animation="wobble" hideMobile />
          <div className="PQ-Block-Inner PQ-Why-Grid">

            {/* LEFT — checklist */}
            <div className="PQ-Why-Left">
              <span className="PQ-Label PQ-Label--blue">Pourquoi nous</span>
              <h2 className="PQ-Block-Title" style={{ marginTop: "14px" }}>
                Pourquoi <span className="PQ-Grad">KapAvenir ?</span>
              </h2>
              <p className="PQ-Block-Sub" style={{ marginTop: "10px", marginBottom: "0" }}>
                Une méthode pensée pour vous, pas pour les administrations.
              </p>
              <div className="PQ-Diff-List">
                {DIFFS.map((d, i) => (
                  <div key={i} className={"PQ-Diff-Row" + (i < revealedDiffs ? " is-revealed" : "")}>
                    <div className="PQ-Diff-Num">{String(i + 1).padStart(2, '0')}</div>
                    <div className={"PQ-Diff-Chk" + (i < revealedDiffs ? " is-drawn" : "")}>
                      {Icon.check}
                    </div>
                    <span className="PQ-Diff-Text">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — panel stats premium */}
            <div className="PQ-Why-Panel">
              <div className="PQ-Why-Orb PQ-Why-Orb--1" />
              <div className="PQ-Why-Orb PQ-Why-Orb--2" />
              <div className="PQ-Why-Orb PQ-Why-Orb--3" />
              <p className="PQ-Why-Tag">Nos résultats</p>
              <div className="PQ-Why-Stats">
                <div className="PQ-Why-Stat">
                  <div className="PQ-Why-IcoBox">{Icon.heart}</div>
                  <div className="PQ-Why-Val">
                    <strong className="PQ-Why-Big">{stat98}<span className="PQ-Why-Sup">%</span></strong>
                    <span className="PQ-Why-Lbl">clients satisfaits</span>
                  </div>
                </div>
                <div className="PQ-Why-Rule" />
                <div className="PQ-Why-Stat">
                  <div className="PQ-Why-IcoBox">{Icon.clock}</div>
                  <div className="PQ-Why-Val">
                    <strong className="PQ-Why-Big">+{stat12}<span className="PQ-Why-Sup"> ans</span></strong>
                    <span className="PQ-Why-Lbl">d'expertise retraite</span>
                  </div>
                </div>
                <div className="PQ-Why-Rule" />
                <div className="PQ-Why-Stat">
                  <div className="PQ-Why-IcoBox">{Icon.user}</div>
                  <div className="PQ-Why-Val">
                    <strong className="PQ-Why-Big">{stat3k}k<span className="PQ-Why-Sup">+</span></strong>
                    <span className="PQ-Why-Lbl">accompagnements réalisés</span>
                  </div>
                </div>
              </div>
              <div className="PQ-Why-Foot">
                <div className="PQ-Why-Stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#fbbf24" stroke="none" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <span className="PQ-Why-Rating">Note moyenne 4.9 / 5</span>
              </div>
            </div>

          </div>
        </div>

        {/* 8 — CTA */}
        <div className={"PQ-CTA-Section " + (ctVis ? "is-vis" : "")} ref={ctRef}>
          <div className="PQ-CTA-Inner">
            <p className="PQ-CTA-Eye">Passez à l’action</p>
            <h2 className="PQ-CTA-Title">Prenez quelques minutes aujourd’hui pour sécuriser des années de retraite</h2>
            <button className="PQ-Btn PQ-Btn--white" onClick={() => navigate('/services/bilan')}>Faire mon bilan retraite
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

      </div>

      <div className="PQ-Section-Sep" aria-hidden="true" />

      {/* ══ ORGANISMES ═════════════════════════════════════════════════ */}
      <div id="organismes">

        {/* OR-1 — Intro hero */}
        <div className={"OR-Hero " + (orIntroVis ? "is-vis" : "")} ref={orIntroRef}>
          <LogoSticker size={110} top="8%" right="4%" rotation={16} opacity={0.18} animation="wobble" hideMobile />
          <LogoSticker size={70}  bottom="12%" left="2%" rotation={-14} opacity={0.13} animation="float" hideMobile />
          <div className="OR-Hero-Overlay" />
          <div className="OR-Hero-Inner">
            <div className="OR-Hero-Content">
              <span className="OR-Badge">Organismes & Assurances</span>
              <h2 className="OR-Hero-Title">
                Accompagnez vos assurés dans<br />
                <span className="OR-Hero-Accent">leurs décisions retraite</span>
              </h2>
              <p className="OR-Hero-Sub">
                Une approche claire, pédagogique et activable pour créer de la valeur à chaque étape du parcours client.
              </p>
              <div className="OR-Hero-Btns">
                <button className="OR-Btn OR-Btn--solid" onClick={() => navigate('/contact')}>Demander une démo gratuite</button>
                <button className="OR-Btn OR-Btn--ghost" onClick={() => navigate('/contact')}>Nous contacter</button>
              </div>
            </div>
            <div className="OR-Hero-ImgWrap">
              <img src={couple4} alt="Organismes" className="OR-Hero-Img" />
              <div className="OR-Hero-FloatBadge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>+3 000 assurés accompagnés</span>
              </div>
            </div>
          </div>
        </div>

        {/* OR-2 — Pillars (ce que nous faisons) */}
        <div className={"OR-Block OR-Block--white " + (orPilVis ? "is-vis" : "")} ref={orPilRef}>
          <LogoSticker size={78} top="5%" left="3%" rotation={-18} opacity={0.13} animation="float" hideMobile />
          <div className="OR-Inner">
            <div className="OR-Head">
              <span className="OR-Label">Notre approche</span>
              <h2 className="OR-Title">Une offre retraite pensée <span className="OR-Green">pour vos enjeux</span></h2>
            </div>
            <div className="OR-Pillars">
              {OR_PILLARS.map((p, i) => (
                <div
                  key={i}
                  className={"OR-Pillar " + (activeOrPil === i ? "is-active" : "")}
                  style={{ "--pc": p.color, "--i": i }}
                  onClick={() => setActiveOrPil(i)}
                >
                  <div className="OR-Pillar-Face">
                    <span className="OR-Pillar-Letter">{p.key}</span>
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
                  className={"OR-Pillars-Dot " + (activeOrPil === i ? "is-active" : "")}
                  style={{ "--pc": p.color }}
                  onClick={() => setActiveOrPil(i)}
                  aria-label={`Voir le pilier ${p.key}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* OR-3 — Services */}
        <div className={"OR-Block OR-Block--tint " + (orSvVis ? "is-vis" : "")} ref={orSvRef}>
          <LogoSticker size={85} bottom="8%" right="3%" rotation={20} opacity={0.14} animation="wobble" hideMobile />
          <div className="OR-Inner OR-Sv-Layout">
            <div className="OR-Sv-Left">
              <span className="OR-Label">Nos solutions</span>
              <h2 className="OR-Title">Des services <span className="OR-Green">modulables</span><br />selon vos besoins</h2>
              <p className="OR-Sub">Chaque organisme est unique. Nous adaptons notre accompagnement à votre structure, votre volume et vos objectifs.</p>
            </div>
            <div className="OR-Sv-List">
              {OR_SERVICES.map((s, i) => (
                <div key={i} className="OR-Sv-Item" style={{ "--i": i }}>
                  <span className="OR-Sv-Num">{s.n}</span>
                  <div className="OR-Sv-Body">
                    <strong className="OR-Sv-Title">{s.title}</strong>
                    <p className="OR-Sv-Desc">{s.desc}</p>
                  </div>
                  <div className="OR-Sv-Arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OR-4 — Process vertical */}
        <div className={"OR-Block OR-Block--dark " + (orStVis ? "is-vis" : "")} ref={orStRef}>
          <LogoSticker size={72} top="6%" right="3%" rotation={-16} opacity={0.2} animation="float" hideMobile />
          <div className="OR-Inner">
            <div className="OR-Head OR-Head--light">
              <span className="OR-Label OR-Label--light">Parcours utilisateur</span>
              <h2 className="OR-Title OR-Title--white">Une expérience <span className="OR-Cyan">simple et engageante</span></h2>
            </div>
            <div className="OR-VTimeline">
              <div className="OR-VLine" />
              {OR_STEPS.map((s, i) => (
                <div key={i} className={"OR-VStep " + (i % 2 === 0 ? "OR-VStep--left" : "OR-VStep--right")} style={{ "--i": i }}>
                  <div className="OR-VStep-Badge">{s.n}</div>
                  <div className="OR-VStep-Card">
                    <h3 className="OR-VStep-Title">{s.title}</h3>
                    <p className="OR-VStep-Desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OR-5 — Différenciation */}
        <div className={"OR-Block OR-Block--white " + (orDfVis ? "is-vis" : "")} ref={orDfRef}>
          <LogoSticker size={90} bottom="10%" left="3%" rotation={18} opacity={0.14} animation="wobble" hideMobile />
          <div className="OR-Inner OR-Diff-Layout">
            <div className="OR-Diff-Left">
              <span className="OR-Label">Pourquoi nous</span>
              <h2 className="OR-Title">Pourquoi <span className="OR-Green">KapAvenir ?</span></h2>
              <p className="OR-Sub">Ce qui nous distingue : une méthode pensée pour l'humain, portée par la technologie.</p>
            </div>
            <div className="OR-Diff-List">
              {OR_DIFFS.map((d, i) => (
                <div key={i} className={"OR-Diff-Row " + (i < revealedOR ? "is-vis" : "")} style={{ "--i": i }}>
                  <div className={"OR-Diff-Chk " + (i < revealedOR ? "is-drawn" : "")}>
                    {Icon.check}
                  </div>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OR-6 — CTA */}
        <div className={"OR-CTA " + (orCtVis ? "is-vis" : "")} ref={orCtRef}>
          <div className="OR-Orb OR-Orb--1" />
          <div className="OR-Orb OR-Orb--2" />
          <div className="OR-CTA-Inner">
            <span className="OR-CTA-Eye">Passez à l'étape suivante</span>
            <h2 className="OR-CTA-Title">Construisons votre offre retraite</h2>
            <p className="OR-CTA-Sub">Mutuelles, assureurs, caisses complémentaires — parlons de vos besoins.</p>
            <div className="OR-CTA-Btns">
              <button className="OR-Btn OR-Btn--white" onClick={() => navigate('/contact')}>
                Demander une démo gratuite
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button className="OR-Btn OR-Btn--outline" onClick={() => navigate('/contact')}>Contacter un conseiller</button>
            </div>
          </div>
        </div>

      </div>

      <div className="PQ-Section-Sep" aria-hidden="true" />

      {/* ══ ENTREPRISES & RH ═══════════════════════════════════════════ */}

      <div className="PQ-Section-Sep" aria-hidden="true" />

      <div id="entreprises-rh">

        {/* ER-1 — Intro */}
        <div className={"ER-Hero " + (erIntroVis ? "is-vis" : "")} ref={erIntroRef}>
          <LogoSticker size={115} top="8%" right="4%" rotation={15} opacity={0.2} animation="wobble" hideMobile />
          <LogoSticker size={70}  bottom="12%" left="2%" rotation={-19} opacity={0.15} animation="float" hideMobile />
          <div className="ER-Hero-Bg" />
          <div className="ER-Hero-Inner">
            <div className="ER-Hero-ImgWrap">
              <img src={meeting1} alt="Entreprises & RH" className="ER-Hero-Img" />
              <div className="ER-Hero-FloatA">
                <span className="ER-Stat-Val">{erAge}<small>ans</small></span>
                <span className="ER-Stat-Lbl">âge moyen de départ</span>
                <div className="ER-Stat-Bar" style={{ width: erIntroVis ? '88%' : '0%' }} />
              </div>
              <div className="ER-Hero-FloatB">
                <span className="ER-Stat-Val">{erPct}<small>%</small></span>
                <span className="ER-Stat-Lbl">attendent un accompagnement</span>
                <div className="ER-Stat-Bar ER-Stat-Bar--b" style={{ width: erIntroVis ? erPct + '%' : '0%' }} />
              </div>
            </div>
            <div className="ER-Hero-Content">
              <span className="ER-Label">Entreprises & RH</span>
              <h2 className="ER-Title ER-Title--white">
                Faites de la retraite<br />
                <span className="ER-Hero-Accent">un levier RH stratégique</span>
              </h2>
              <p className="ER-Hero-Sub">
                Anticipez les départs, accompagnez vos collaborateurs et renforcez votre marque employeur.
              </p>
              <div className="ER-BtnRow">
                <button className="ER-Btn ER-Btn--solid" onClick={() => navigate('/contact')}>Demander une démo gratuite</button>
                <button className="ER-Btn ER-Btn--ghost" onClick={() => navigate('/contact')}>Échanger avec un expert</button>
              </div>
            </div>
          </div>
        </div>

        {/* ER-2 — Enjeux RH carousel auto */}
        <div className={"ER-Block ER-Block--white " + (erEnjVis ? "is-vis" : "")} ref={erEnjRef}>
          <LogoSticker size={80} top="5%" left="3%" rotation={-16} opacity={0.13} animation="float" hideMobile />
          <div className="ER-Inner">
            <div className="ER-Head">
              <span className="ER-Label">Enjeux RH</span>
              <h2 className="ER-Title">Un sujet clé <span className="ER-Cyan">pour vos équipes</span></h2>
              <p className="ER-Sub">La retraite impacte votre organisation à chaque étape. Voici pourquoi agir maintenant.</p>
            </div>
            <div className="ER-Enjeux-Grid">
              {ER_ENJEUX_ORDERED.map((e, i) => (
                <div key={i}
                  className={"ER-Enj-Card " + (activeEnj === i ? "is-active" : "")}
                  style={{ "--ec": e.color, "--i": i }}
                  onClick={() => setActiveEnj(i)}>
                  {activeEnj === i && <div className="ER-Enj-Bar" key={"enj-"+i+"-"+activeEnj} />}
                  <div className="ER-Enj-Letter">{e.key}</div>
                  <p className="ER-Enj-Title">{e.title}</p>
                  {e.stat && <span className="ER-Enj-Stat">{e.stat}</span>}
                </div>
              ))}
            </div>
            <div className="ER-Enjeux-Dots">
              {ER_ENJEUX_ORDERED.map((_, i) => (
                <button key={i} className={"ER-Enj-Dot " + (activeEnj === i ? "is-active" : "")}
                  style={{ "--ec": ER_ENJEUX_ORDERED[i].color }} onClick={() => setActiveEnj(i)} />
              ))}
            </div>
          </div>
        </div>

        {/* ER-3 — Solutions */}
        <div className={"ER-Block ER-Block--tint " + (erSvVis ? "is-vis" : "")} ref={erSvRef}>
          <LogoSticker size={88} bottom="8%" right="3%" rotation={20} opacity={0.14} animation="wobble" hideMobile />
          <div className="ER-Inner ER-Sv-Layout">
            <div className="ER-Sv-Left">
              <span className="ER-Label">Nos solutions</span>
              <h2 className="ER-Title">Des services <span className="ER-Cyan">modulables</span><br />selon vos besoins</h2>
              <p className="ER-Sub">Chaque entreprise est unique. Nous adaptons notre approche à votre structure et vos objectifs RH.</p>
            </div>
            <div className="ER-Sv-List">
              {ER_SERVICES.map((s, i) => (
                <div key={i} className="ER-Sv-Item" style={{ "--i": i }}>
                  <span className="ER-Sv-Num">{s.n}</span>
                  <div className="ER-Sv-Body">
                    <strong className="ER-Sv-Title">{s.title}</strong>
                    <p className="ER-Sv-Desc">{s.desc}</p>
                  </div>
                  <div className="ER-Sv-Arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ER-4 — Expérience collaborateur (timeline) */}
        <div className={"ER-Block ER-Block--dark " + (erStVis ? "is-vis" : "")} ref={erStRef}>
          <LogoSticker size={75} top="6%" right="3%" rotation={-14} opacity={0.22} animation="float" hideMobile />
          <div className="ER-Inner">
            <div className="ER-Head ER-Head--light">
              <span className="ER-Label ER-Label--light">Expérience collaborateur</span>
              <h2 className="ER-Title ER-Title--white">Un accompagnement <span className="ER-Cyan">simple et engageant</span></h2>
            </div>
            <div className="ER-Timeline">
              <div className="ER-TL-Rail"><div className="ER-TL-Track" style={{ width: erStVis ? '100%' : '0%' }} /></div>
              {ER_STEPS.map((s, i) => (
                <div key={i} className={"ER-TStep " + (i % 2 === 1 ? "ER-TStep--up" : "")} style={{ "--i": i }}>
                  <div className="ER-TStep-Badge"><span>{s.n}</span><div className="ER-TStep-Ring" /></div>
                  <div className="ER-TStep-Card">
                    <span className="ER-TStep-BgNum">{s.n}</span>
                    <h3 className="ER-TStep-Title">{s.title}</h3>
                    <p className="ER-TStep-Desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ER-5 — Outils & dispositifs */}
        <div className={"ER-Block ER-Block--white " + (erOuVis ? "is-vis" : "")} ref={erOuRef}>
          <LogoSticker size={82} bottom="10%" left="2%" rotation={18} opacity={0.13} animation="wobble" hideMobile />
          <div className="ER-Inner ER-Ou-Layout">
            <div className="ER-Ou-Content">
              <span className="ER-Label">Outils & dispositifs</span>
              <h2 className="ER-Title">Des outils concrets <span className="ER-Cyan">pour vos équipes RH</span></h2>
              <ul className="ER-Ou-List">
                {ER_OUTILS.map((o, i) => (
                  <li key={i} className="ER-Ou-Item" style={{ "--i": i }}>
                    <div className="ER-Ou-Chk">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ER-Ou-Visual">
              {/* Card 1 - Dashboard RH */}
              <div className="ER-Ou-Card ER-Ou-Card--1">
                <div className="ER-Ou-CardHead">
                  <div className="ER-Ou-CardDot" /><div className="ER-Ou-CardDot ER-Ou-CardDot--y" /><div className="ER-Ou-CardDot ER-Ou-CardDot--g" />
                  <span className="ER-Ou-CardTitle">Tableau de bord RH</span>
                </div>
                <div className="ER-Ou-Bars">
                  {[
                    { label: "Projections retraite", pct: 87, color: "var(--k-cyan)" },
                    { label: "Bilans individuels",   pct: 64, color: "var(--k-green)" },
                    { label: "Accompagnements",      pct: 92, color: "var(--k-blue)" },
                  ].map(function(b, i) { return (
                    <div key={i} className="ER-Ou-BarRow">
                      <div className="ER-Ou-BarMeta">
                        <span className="ER-Ou-BarLbl">{b.label}</span>
                        <span className="ER-Ou-BarPct" style={{ color: b.color }}>{erOuVis ? b.pct : 0}%</span>
                      </div>
                      <div className="ER-Ou-BarTrack">
                        <div className="ER-Ou-BarFill" style={{
                          width: erOuVis ? b.pct+"%" : "0%",
                          background: b.color,
                          transitionDelay: (0.3 + i * 0.18)+"s"
                        }} />
                      </div>
                    </div>
                  ); })}
                </div>
              </div>

              {/* Card 2 - Gauge */}
              <div className="ER-Ou-Card ER-Ou-Card--2">
                <div className="ER-Ou-GaugeCont">
                  <svg viewBox="0 0 120 70" className="ER-Ou-GaugeSvg">
                    <defs>
                      <linearGradient id="erGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00b6de"/>
                        <stop offset="100%" stopColor="#4381C1"/>
                      </linearGradient>
                    </defs>
                    <path d="M15 62 A 45 45 0 0 1 105 62" stroke="#e8edf5" strokeWidth="8" fill="none" strokeLinecap="round"/>
                    <path d="M15 62 A 45 45 0 0 1 105 62" stroke="url(#erGrad2)" strokeWidth="8" fill="none" strokeLinecap="round"
                      strokeDasharray="141" strokeDashoffset={erOuVis ? "32" : "141"}
                      style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1) .5s" }}/>
                    <circle cx="60" cy="62" r="4" fill="url(#erGrad2)" opacity={erOuVis ? "1" : "0"} style={{ transition: "opacity .4s 1.8s" }}/>
                  </svg>
                  <div className="ER-Ou-GaugeCenter">
                    <span className="ER-Ou-GaugeVal">{erPct}<span className="ER-Ou-GaugePct">%</span></span>
                    <span className="ER-Ou-GaugeSub">satisfaction</span>
                  </div>
                </div>
                <div className="ER-Ou-CardTitle ER-Ou-CardTitle--center">Taux d'accompagnement</div>
              </div>
            </div>
          </div>
        </div>

        {/* ER-6 — Bénéfices */}
        <div className={"ER-Block ER-Block--tint " + (erBnVis ? "is-vis" : "")} ref={erBnRef}>
          <LogoSticker size={95} top="5%" right="4%" rotation={15} opacity={0.17} animation="wobble" hideMobile />
          <div className="ER-Inner">
            <div className="ER-Head">
              <span className="ER-Label">Les bénéfices</span>
              <h2 className="ER-Title">Ce que vous <span className="ER-Cyan">y gagnez</span></h2>
            </div>
            <div className="ER-Bn-Grid">
              {ER_BENEFITS.map((b, i) => (
                <div key={i}
                  className={"ER-Bn-Card " + (activeErBn === i ? "is-active" : "")}
                  style={{ "--bc": b.color, transitionDelay: erBnVis ? i * 110 + "ms" : "0ms" }}>
                  {activeErBn === i && <div className="ER-Bn-Bar" key={"erbn-"+i+"-"+activeErBn} />}
                  <div className="ER-Bn-IcoWrap">{b.icon}</div>
                  <strong className="ER-Bn-Title">{b.title}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ER-7 — Différenciation */}
        <div className={"ER-Block ER-Block--white " + (erDfVis ? "is-vis" : "")} ref={erDfRef}>
          <LogoSticker size={78} bottom="10%" left="3%" rotation={-20} opacity={0.13} animation="float" hideMobile />
          <div className="ER-Inner ER-Df-Layout">
            <div className="ER-Df-Panel">
              <div className="ER-Df-Orb ER-Df-Orb--1" />
              <div className="ER-Df-Orb ER-Df-Orb--2" />
              <p className="ER-Df-Tag">Pourquoi KapAvenir</p>
              <p className="ER-Df-Quote">
                "La retraite de vos collaborateurs est un enjeu RH stratégique. Nous en faisons une opportunité."
              </p>
              <div className="ER-Df-Stats">
                <div className="ER-Df-Stat"><strong>94%</strong><span>satisfaction collaborateurs</span></div>
                <div className="ER-Df-Stat"><strong>3j</strong><span>pour un bilan complet</span></div>
              </div>
            </div>
            <div>
              <h3 className="ER-Df-Title">Ce qui nous distingue</h3>
              <div className="ER-Df-List">
                {ER_DIFFS.map((d, i) => (
                  <div key={i} className={"ER-Diff-Row " + (i < revealedER ? "is-vis" : "")} style={{ "--i": i }}>
                    <div className={"ER-Diff-Chk " + (i < revealedER ? "is-drawn" : "")}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ER-8 — CTA */}
        <div className={"ER-CTA " + (erCtVis ? "is-vis" : "")} ref={erCtRef}>
          <div className="ER-Orb ER-Orb--1" />
          <div className="ER-Orb ER-Orb--2" />
          <div className="ER-CTA-Inner">
            <span className="ER-CTA-Eye">Passez à l'action</span>
            <h2 className="ER-CTA-Title">Vous êtes intéressé(e)s par nos prestations ?</h2>
            <p className="ER-CTA-Sub">Un devis personnalisé en 48h — sans engagement.</p>
            <div className="ER-CTA-Btns">
              <button className="ER-Btn ER-Btn--white" onClick={() => navigate('/contact')}>
                Demander une démo gratuite
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button className="ER-Btn ER-Btn--outline" onClick={() => navigate('/contact')}>Contacter un conseiller</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
