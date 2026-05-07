import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BilanRetraite.css';
import LogoSticker from '../../components/Common/LogoSticker';

/* ── Données des packs ─────────────────────────────────────── */
const packs = [
  {
    id: 'clarte',
    num: '01',
    title: 'Kap Clarté',
    tagline: 'Comprendre aujourd\'hui pour mieux préparer demain',
    price: '300',
    accentFrom: '#5aa8e0',
    accentTo: '#4381C1',
    features: [
      'Entretien personnalisé (1h) sur place ou à distance',
      'Analyse de votre relevé de carrière',
      'Estimation des droits et anomalies',
      'Conseils pour corriger en autonomie',
    ],
    modal: {
      objective: 'Offrir une vision claire et fiable de la situation retraite pour permettre des décisions éclairées dès maintenant.',
      comprend: [
        'Entretien personnalisé (1h) en présentiel ou à distance',
        'Analyse complète du relevé de carrière',
        'Estimation des droits à la retraite (âge, montant, trimestres)',
        'Détection des anomalies et incohérences',
        'Recommandations concrètes pour correction en autonomie',
        'Conseils stratégiques de premier niveau',
      ],
      recoit: [
        { text: 'Rapport de diagnostic retraite personnalisé (PDF)', sub: ['Synthèse de la carrière', 'Estimation des droits', 'Liste des anomalies détectées', 'Recommandations actionnables'] },
        { text: 'Compte rendu de l\'entretien' },
        { text: 'Checklist des démarches à effectuer' },
        { text: 'Support email (limité) pour questions post-diagnostic' },
      ],
    },
  },
  {
    id: 'maitrise',
    num: '02',
    title: 'Kap Maîtrise',
    tagline: 'Construisez une retraite sûre, pas à pas, en toute confiance',
    price: '1 500',
    accentFrom: '#4381C1',
    accentTo: '#2558a0',
    featured: true,
    features: [
      'Diagnostic retraite approfondi',
      'Reconstitution complète de carrière',
      'Régularisation des anomalies auprès des caisses',
      'Constitution du dossier de demande de retraite',
    ],
    modal: {
      objective: 'Sécuriser et optimiser l\'ensemble du parcours retraite avec un accompagnement complet.',
      comprend: [
        'Entretien personnalisé (1h) en présentiel ou à distance',
        'Diagnostic retraite approfondi',
        'Reconstitution complète de carrière (tous statuts confondus)',
        'Identification et traitement des anomalies',
        'Prise en charge des démarches auprès des caisses',
        'Optimisation de la stratégie de départ (âge, trimestres, rachats)',
        'Constitution complète du dossier de retraite',
        'Suivi administratif (échanges, relances, courriers)',
      ],
      recoit: [
        { text: 'Dossier retraite complet et structuré' },
        { text: 'Rapport d\'optimisation personnalisé', sub: ['Scénario recommandé', 'Gains estimés'] },
        { text: 'Dossier administratif prêt à déposer' },
        { text: 'Copies de tous les échanges et démarches effectuées' },
        { text: 'Tableau de suivi des actions et avancement' },
        { text: 'Support dédié pendant toute la durée du dossier' },
      ],
    },
  },
  {
    id: 'prestige',
    num: '03',
    title: 'Kap Prestige',
    tagline: 'La sérénité d\'une retraite sur-mesure, sans compromis',
    price: '3 500',
    accentFrom: '#1d5499',
    accentTo: '#0d3570',
    features: [
      'Tout le contenu du forfait Maîtrise inclus',
      'Simulations avancées multi-scénarios',
      'Accompagnement physique (selon zone définie)',
      'Support illimité jusqu\'à liquidation des droits',
    ],
    modal: {
      objective: 'Un service clé en main pour ceux qui veulent une retraite préparée, optimisée et gérée sans effort.',
      comprend: [
        'Tout le contenu du forfait Maîtrise',
        'Simulations avancées (multi-scénarios de départ)',
        'Optimisation fine (cumul emploi-retraite, retraite progressive)',
        'Accompagnement au rachat de trimestres (analyse + gestion complète)',
        'Support illimité (questions, courriers, décisions)',
        'Accompagnement physique (selon zone définie)',
        'Gestion intégrale jusqu\'à la liquidation des droits',
        'Assistance après départ à la retraite',
      ],
      recoit: [
        { text: 'Étude stratégique complète avec scénarios comparatifs' },
        { text: 'Plan retraite sur-mesure (document premium)' },
        { text: 'Simulations financières détaillées' },
        { text: 'Dossier clé en main entièrement géré' },
        { text: 'Historique complet des démarches et décisions' },
        { text: 'Accès prioritaire au support (illimité)' },
        { text: 'Guide post-retraite personnalisé', sub: ['Compréhension des pensions', 'Ajustements possibles'] },
        { text: 'Accompagnement humain dédié (interlocuteur unique)' },
      ],
    },
  },
];

/* ── Icône par pack (SVG dans les couleurs marque) ────────── */
function PackIcon({ id, color = '#4381C1', size = 24 }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (id === 'clarte') return (
    /* Loupe + coche — diagnostic / clarté */
    <svg {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M19 19l-3.5-3.5" />
      <path d="M7.8 10.5l2 2 3-3.2" />
    </svg>
  );
  if (id === 'maitrise') return (
    /* Bouclier + coche — maîtrise / sécurité */
    <svg {...props}>
      <path d="M12 2L4 6v6c0 5.2 3.6 9.1 8 10 4.4-.9 8-4.8 8-10V6L12 2z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  );
  if (id === 'prestige') return (
    /* Couronne géométrique — prestige / premium */
    <svg {...props}>
      <path d="M3 17L6 8l4.5 5L12 3l1.5 10L18 8l3 9H3z" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
  return null;
}

/* ── Icônes ───────────────────────────────────────────────── */
function GreenCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="10" cy="10" r="10" fill="#00bf63" fillOpacity="0.13" />
      <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#00bf63" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BlueCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="10" cy="10" r="10" fill="#4381C1" fillOpacity="0.13" />
      <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#4381C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SmallCheck() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="10" fill="#00bf63" fillOpacity="0.12" />
      <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#00bf63" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Composant principal ──────────────────────────────────── */
export default function BilanRetraite() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActiveModal(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const activePack = packs.find(p => p.id === activeModal);

  return (
    <section id="bilan-retraite" className="BR-Section">
      {/* Stickers décoratifs */}
      <LogoSticker size={100} top="5%" right="3%" rotation={14} opacity={0.16} animation="wobble" hideMobile />
      <LogoSticker size={65}  bottom="8%" left="2%" rotation={-19} opacity={0.12} animation="float" hideMobile />

      {/* Déco fond */}
      <div className="BR-BgDeco" aria-hidden="true" />

      <div className="BR-Container">

        {/* ── En-tête ── */}
        <div className="BR-Header">
          <span className="BR-Tag">✦ Nos packs</span>
          <h2 className="BR-Title">
            Un accompagnement <span className="BR-Accent">adapté à vos besoins</span>
          </h2>
          <p className="BR-Intro">
            Trois formules pour chaque étape de votre projet retraite, pour avancer avec clarté.
          </p>
        </div>

        {/* ── Grille ── */}
        <div className="BR-Grid">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={`BR-Card${pack.featured ? ' BR-Card--featured' : ''}`}
              style={{ '--accent-from': pack.accentFrom, '--accent-to': pack.accentTo }}
            >
              {/* Bande accent top */}
              <div className="BR-Card-Accent" />

              {pack.featured && <div className="BR-Popular">⭐ Le plus choisi</div>}

              {/* Numéro + icône SVG */}
              <div className="BR-Card-Meta">
                <span className="BR-Card-Num">{pack.num}</span>
                <span className="BR-Card-Icon">
                  <PackIcon
                    id={pack.id}
                    color={pack.featured ? '#ffffff' : '#4381C1'}
                    size={22}
                  />
                </span>
              </div>

              {/* Titre + tagline */}
              <h3 className="BR-Card-Title">{pack.title}</h3>
              <p className="BR-Card-Tagline">{pack.tagline}</p>

              {/* Prix */}
              <div className="BR-Price-Box">
                <span className="BR-Price-Num">{pack.price}</span>
                <div className="BR-Price-Right">
                  <span className="BR-Price-Eur">€</span>
                  <span className="BR-Price-Ttc">TTC</span>
                </div>
              </div>

              <div className="BR-Divider" />

              {/* Features */}
              <ul className="BR-Features">
                {pack.features.map((f, i) => (
                  <li key={i}>
                    <GreenCheck />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Bouton */}
              <button className="BR-Btn" onClick={() => setActiveModal(pack.id)}>
                Plus d'informations
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ══ MODAL ══════════════════════════════════════════════ */}
      {activeModal && activePack && (
        <div className="BR-Overlay" onClick={() => setActiveModal(null)} role="dialog" aria-modal="true">
          <div className="BR-Modal" onClick={e => e.stopPropagation()}>

            {/* Bouton fermer */}
            <button className="BR-Modal-Close" onClick={() => setActiveModal(null)} aria-label="Fermer">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* En-tête gradient */}
            <div className="BR-Modal-Head" style={{ '--from': activePack.accentFrom, '--to': activePack.accentTo }}>
            <div className="BR-Modal-HeadTop">
              <span className="BR-Modal-Icon">
                <PackIcon id={activePack.id} color="#ffffff" size={26} />
              </span>
              <span className="BR-Modal-PricePill">{activePack.price} € TTC</span>
            </div>
              <h3 className="BR-Modal-Title">{activePack.title}</h3>
              <p className="BR-Modal-Tagline">{activePack.tagline}</p>

              {/* Objectif — dans l'en-tête */}
              <div className="BR-Modal-Obj">
                <span>🎯</span>
                <span>{activePack.modal.objective}</span>
              </div>
            </div>

            {/* Corps — 2 colonnes */}
            <div className="BR-Modal-Body">

              {/* Colonne gauche — Comprend */}
              <div className="BR-Modal-Col BR-Modal-Col--left">
                <div className="BR-Modal-ColHead BR-Modal-ColHead--green">
                  {/* Bouclier coche — prestations */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00bf63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L4 6v6c0 5.2 3.6 9.1 8 10 4.4-.9 8-4.8 8-10V6L12 2z" />
                    <path d="M8.5 12l2.5 2.5 4.5-5" />
                  </svg>
                  Prestations incluses
                </div>
                <ul className="BR-Modal-List">
                  {activePack.modal.comprend.map((item, i) => (
                    <li key={i}>
                      <SmallCheck />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colonne droite — Reçoit */}
              <div className="BR-Modal-Col BR-Modal-Col--right">
                <div className="BR-Modal-ColHead BR-Modal-ColHead--blue">
                  {/* Document étoile — livrables */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4381C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2z" />
                    <path d="M14 2v6h6" />
                    <path d="M12 13l1.5 2.5L16 14l-1.5 2.5L16 19l-2.5-1L12 20l-1.5-2L8 19l1.5-2.5L8 14l2.5 1.5L12 13z" />
                  </svg>
                  Ce que vous recevez
                </div>
                <ul className="BR-Modal-List">
                  {activePack.modal.recoit.map((item, i) => (
                    <li key={i}>
                      <BlueCheck />
                      <span>
                        {item.text}
                        {item.sub && (
                          <ul className="BR-Modal-SubList">
                            {item.sub.map((s, j) => (
                              <li key={j}>
                                <span className="BR-SubDot">›</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pied */}
            <div className="BR-Modal-Footer">
              <button className="BR-Modal-Cta BR-Modal-Cta--green" onClick={() => navigate('/contact')}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Faire mon bilan en ligne
              </button>
              <button className="BR-Modal-Cta BR-Modal-Cta--outline" onClick={() => navigate('/contact')}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 9h14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Contacter un conseiller
              </button>
              <button className="BR-Modal-Dismiss" onClick={() => setActiveModal(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
