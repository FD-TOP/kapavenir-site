import React, { useState, useEffect, useRef } from 'react';
import KapGrad from '../../components/Common/KapGrad';

import couple1 from '../../assets/couple1.jpeg';
import couple4 from '../../assets/couple4.jpeg';

export { couple4 };
import meeting3 from '../../assets/meeting3.png';
import meeting4 from '../../assets/meeting4.jpg';

export const SLIDES = [
  {
    id: 'particuliers',
    path: '/pour-qui/particuliers',
    image: couple1,
    bgPosition: 'center 15%',
    label: 'Particuliers',
    sub: 'Retraite individuelle',
    color: '#4381C1',
    heroTitle: <>Prenez le <KapGrad className="PQ-Grad">contrôle</KapGrad> de votre retraite</>,
    heroDesc: 'Comprenez vos droits, optimisez vos choix et partez au meilleur moment.',
  },
  {
    id: 'organismes',
    path: '/pour-qui/organismes',
    image: meeting4,
    bgPosition: 'center 22%',
    label: 'Organismes & Assurances',
    sub: 'Partenariats institutionnels',
    color: '#00bf63',
    heroTitle: (
      <>
        Accompagnez vos
        <br />
        assurés dans leurs
        <br />
        <KapGrad className="OR-Grad">décisions retraite</KapGrad>
      </>
    ),
    heroDesc: 'Une approche claire, pédagogique et activable pour créer de la valeur à chaque étape du parcours client.',
  },
  {
    id: 'entreprises',
    path: '/pour-qui/entreprises-rh',
    image: meeting3,
    bgPosition: 'center 18%',
    thumbPosition: 'center top',
    label: 'Entreprises & RH',
    sub: 'Solutions collectives',
    color: '#00b6de',
    heroTitle: <>Faites de la retraite un <KapGrad className="ER-Cyan">levier RH stratégique</KapGrad></>,
    heroDesc: 'Anticipez les départs, accompagnez vos collaborateurs et renforcez votre marque employeur.',
  },
];

export const HERO_DELAY = 4500;

/** Texte dégradé charte — à utiliser à la place de <span className="…-Grad"> */
export function Grad({ children, className = 'PQ-Grad' }) {
  return <KapGrad className={className}>{children}</KapGrad>;
}

export function useReveal(threshold = 0.08, rootMargin = '0px 0px -6% 0px') {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return [ref, vis];
}

/** Easing counter with ease-out cubic */
export function useCounter(target, duration, started) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const easeOut = (p) => 1 - (1 - p) ** 3;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round(easeOut(p) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

export function renderBnParts(parts) {
  return parts.map((ln, j) => (
    <React.Fragment key={j}>
      {ln.t}
      {ln.g ? <KapGrad className="PQ-Grad">{ln.g}</KapGrad> : null}
    </React.Fragment>
  ));
}

export function useSequentialReveal(active, length, interval = 480) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (revealed >= length) return;
    const t = setTimeout(() => setRevealed((n) => n + 1), interval);
    return () => clearTimeout(t);
  }, [active, revealed, length, interval]);
  useEffect(() => {
    if (!active) setRevealed(0);
  }, [active]);
  return revealed;
}

export function useAutoCycle(active, length, interval) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!active || length < 2) return;
    const t = setInterval(() => setIndex((n) => (n + 1) % length), interval);
    return () => clearInterval(t);
  }, [active, length, interval]);
  return [index, setIndex];
}

export const Icon = {
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="12" width="4" height="8" rx="1" />
      <rect x="10" y="6" width="4" height="14" rx="1" />
      <rect x="17" y="9" width="4" height="11" rx="1" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export const PROBLEMS = [
  { icon: Icon.doc, text: 'Relevés difficiles à comprendre' },
  { icon: Icon.error, text: 'Erreurs non détectées' },
  { icon: Icon.eye, text: 'Décisions prises sans visibilité' },
  { icon: Icon.refresh, text: 'Règles qui évoluent constamment' },
];

export const PROMISES = [
  { icon: Icon.search, label: 'Comprendre votre situation', desc: 'Un diagnostic complet de votre carrière et de vos droits acquis.' },
  { icon: Icon.chart, label: 'Visualiser vos options', desc: 'Des scénarios chiffrés pour choisir le moment idéal de départ.' },
  { icon: Icon.shield, label: 'Décider en toute confiance', desc: 'Un accompagnement humain jusqu’à votre premier versement.' },
];

export const PT_SERVICES = [
  { icon: Icon.chart, title: 'Bilan retraite', desc: 'Analyse complète, vérification de carrière et projections personnalisées.', color: '#4381C1' },
  { icon: Icon.target, title: 'Optimisation retraite', desc: 'Scénarios pour partir plus tôt ou maximiser votre pension.', color: '#00bf63' },
  { icon: Icon.arrow, title: 'Aide au départ', desc: 'Accompagnement dans vos démarches jusqu’au premier paiement.', color: '#00b6de' },
  { icon: Icon.user, title: 'Conseil personnalisé et accompagnement digital', desc: 'Échange avec un expert dédié et parcours d’accompagnement digital adapté.', color: '#4381C1' },
];

export const PT_STEPS = [
  { title: 'Vous partagez', desc: 'Votre situation, vos objectifs et vos questions.' },
  { title: 'Nous analysons', desc: 'Vos droits, vos trimestres et vos scénarios.' },
  { title: 'Vous recevez', desc: 'Un rapport clair et des recommandations précises.' },
  { title: 'Vous agissez', desc: 'Nous vous accompagnons.' },
];

export const PT_BENEFITS = [
  { icon: Icon.eye, color: '#4381C1', titleParts: [{ t: '', g: 'Une vision claire' }], subParts: [{ t: 'de votre retraite', g: null }] },
  { icon: Icon.clock, color: '#00bf63', titleParts: [{ t: 'Un départ', g: null }], subParts: [{ t: '', g: 'au bon moment' }] },
  { icon: Icon.chart, color: '#00b6de', titleParts: [{ t: 'Une pension', g: null }], subParts: [{ t: '', g: 'optimisée' }] },
  { icon: Icon.heart, color: '#4381C1', titleParts: [{ t: 'Plus de ', g: 'sérénité' }], subParts: [{ t: 'et moins de stress', g: null }] },
];

export const PT_DIFFS = [
  'Une expertise dédiée à la retraite',
  'Accompagnement dans la régularisation de votre carrière',
  'Un accompagnement pour votre demande de retraite',
  'Des conseils simples et personnalisés',
  'Un suivi humain et de proximité',
];

export const OR_PILLARS = [
  { key: 'A', color: '#00bf63', title: 'Comprendre', desc: 'Rendre la retraite lisible et accessible à tous vos clients.' },
  { key: 'B', color: '#00b6de', title: 'Projeter', desc: 'Donner de la visibilité et des scénarios concrets à chaque assuré.' },
  { key: 'C', color: '#4381C1', title: 'Agir', desc: "Transformer l'information en décisions utiles." },
];

export const OR_SERVICES = [
  { title: 'Diagnostic retraite', desc: 'Vision claire, projections personnalisées, restitution simple.', color: '#00bf63' },
  { title: 'Parcours client intégré', desc: "Expérience fluide du diagnostic à l'action, en marque blanche.", color: '#00b6de' },
  { title: 'Accompagnement expert', desc: 'Entretiens personnalisés pour les situations complexes.', color: '#4381C1' },
];

export const OR_STEPS = [
  { title: 'Diagnostic rapide', desc: 'Analyse de la situation retraite du client en quelques minutes.' },
  { title: 'Analyse personnalisée', desc: 'Projections adaptées à chaque profil et chaque objectif.' },
  { title: 'Recommandations claires', desc: 'Un rapport simple, lisible, actionnable par le conseiller.' },
  { title: "Passage à l'action", desc: "Accompagnement jusqu'aux démarches et décisions finales." },
];

export const OR_DIFFS = [
  'Une approche pédagogique avant tout',
  'Une expérience pensée pour le client final',
  "Un équilibre entre le digital et l'humain",
  'Une vision orientée résultats',
];

export const ER_ENJEUX = [
  { key: 'A', color: '#00b6de', title: 'Anticiper les départs et la transmission des compétences' },
  { key: 'B', color: '#4381C1', title: 'Répondre aux attentes des collaborateurs' },
  { key: 'C', color: '#00bf63', title: 'Structurer votre politique senior' },
  { key: 'D', color: '#4381C1', title: 'Valoriser votre marque employeur' },
];

export const ER_ENJEUX_ORDERED = [...ER_ENJEUX].sort((a, b) => a.key.localeCompare(b.key));

export const ER_SERVICES = [
  { title: 'Pilotage des départs', desc: 'Anticipez les âges de départ et structurez vos effectifs.', color: '#00b6de' },
  { title: 'Diagnostic retraite collaborateurs', desc: 'Vision claire + projections personnalisées pour chaque salarié.', color: '#4381C1' },
  { title: 'Parcours salarié', desc: 'Accompagnement progressif tout au long de la carrière.', color: '#00bf63' },
  { title: 'Accompagnement fin de carrière', desc: 'Aide à la transition : temps partiel, retraite progressive, départ.', color: '#0071bc' },
];

export const ER_STEPS = [
  { n: '01', title: 'Diagnostic personnalisé', desc: 'Analyse individuelle des droits et projections retraite.' },
  { n: '02', title: 'Recommandations concrètes', desc: "Un plan d'action clair, adapté à chaque profil." },
  { n: '03', title: "Passage à l'action", desc: "Accompagnement jusqu'aux démarches et décisions finales." },
];

export const ER_OUTILS = [
  'Tableaux de projection des départs',
  'Simulateurs et aides à la décision',
  'Ressources pédagogiques prêtes à emploi',
  'Veille réglementaire simplifiée',
];

export const ER_BENEFITS = [
  { color: '#00b6de', icon: Icon.chart, title: 'Meilleure anticipation RH' },
  { color: '#0071bc', icon: Icon.heart, title: 'Collaborateurs plus sereins' },
  { color: '#00bf63', icon: Icon.shield, title: 'Marque employeur renforcée' },
  { color: '#4381C1', icon: Icon.target, title: 'Décisions plus éclairées' },
];

export const ER_DIFFS = [
  'Une approche centrée RH (pas uniquement technique)',
  'Une vraie expérience collaborateur',
  "Un équilibre entre le digital et l'humain",
  "Une logique d'impact (engagement, fidélisation)",
];

export function getSlideByPath(pathname) {
  if (pathname.includes('/organismes')) return SLIDES[1];
  if (pathname.includes('/entreprises')) return SLIDES[2];
  if (pathname.includes('/particuliers')) return SLIDES[0];
  return null;
}
