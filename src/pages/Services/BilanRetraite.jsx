import React, { useState, useEffect, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import './BilanRetraite.css';
import LogoSticker from '../../components/Common/LogoSticker';

/* ── Offres bilan retraite (contenu maquette) ─────────────── */
const packs = [
  {
    id: 'clarte',
    title: 'Kap clarté',
    tagline: 'Comprendre aujourd’hui pour mieux préparer demain',
    pricePill: '300 € TTC',
    intro:
      'Un diagnostic clair et fiable de vos droits à la retraite, pour prendre les bonnes décisions dès aujourd’hui',
    features: [
      'Entretien personnalisé (1h) : sur place ou à distance.',
      'Analyse de votre relevé de carrière et estimation de vos droits.',
      'Identification des anomalies et erreurs potentielles.',
      'Conseils pour corriger les erreurs vous-même.',
    ],
  },
  {
    id: 'maitrise',
    title: 'KAP MAITRISE',
    tagline: 'Construisez une retraite sûre, pas à pas, en toute confiance.',
    pricePill: '1500 € TTC',
    intro:
      'Une gestion complète, pensée pour sécuriser chaque étape de votre retraite et garantir un départ maîtrisé.',
    features: [
      'Diagnostic retraite détaillé.',
      'Reconstitution de carrière (salarié, indépendant, chômage, maladie, etc.).',
      'Identification et régularisation des anomalies auprès des caisses.',
      'Optimisation de votre départ (date, rachat de trimestres).',
      'Constitution complète du dossier de demande de retraite.',
      'Suivi des correspondances et des démarches administratives.',
    ],
  },
  {
    id: 'prestige',
    title: 'KAP PRESTIGE',
    tagline: 'La sérénité d’une retraite sur-mesure, sans compromis',
    pricePill: '3500 € TTC',
    intro:
      'Un service personnalisé clé en main, pour ceux qui veulent une retraite préparée, optimisée et sans effort.',
    features: [
      'Tout ce qui est inclus dans le forfait Maîtrise.',
      'Simulation détaillée des différentes options de départ.',
      'Conseils sur le cumul emploi-retraite ou retraite progressive.',
      'Assistance pour rachat de trimestres (analyse, simulation, et dépôt du dossier).',
      'Support illimité jusqu’à la liquidation des droits (réponse à tous les courriers et questions).',
      'Accompagnement sur place (déplacement dans la limite d’une zone définie).',
      'Assistance post-retraite (questions sur les pensions, ajustements nécessaires).',
    ],
  },
];

function PackIcon({ id, color = '#0071bc', size = 24 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  if (id === 'clarte') {
    return (
      <svg {...props}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M19 19l-3.5-3.5" />
        <path d="M7.8 10.5l2 2 3-3.2" />
      </svg>
    );
  }
  if (id === 'maitrise') {
    return (
      <svg {...props}>
        <path d="M12 2L4 6v6c0 5.2 3.6 9.1 8 10 4.4-.9 8-4.8 8-10V6L12 2z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    );
  }
  if (id === 'prestige') {
    return (
      <svg {...props}>
        <path d="M3 17L6 8l4.5 5L12 3l1.5 10L18 8l3 9H3z" />
        <line x1="3" y1="17" x2="21" y2="17" />
      </svg>
    );
  }
  return null;
}

function ListCheck() {
  const uid = useId().replace(/:/g, '');
  const gradId = `br-check-grad-${uid}`;
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0071bc" />
          <stop offset="55%" stopColor="#00b6de" />
          <stop offset="100%" stopColor="#00bf63" />
        </linearGradient>
      </defs>
      <circle cx="10" cy="10" r="10" fill={`url(#${gradId})`} fillOpacity="0.18" />
      <path
        d="M6.5 10.5l2.5 2.5 4.5-5"
        stroke={`url(#${gradId})`}
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BilanRetraite() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const activePack = packs.find((p) => p.id === activeModal);

  return (
    <section id="bilan-retraite" className="BR-Section">
      <LogoSticker size={100} top="5%" right="3%" rotation={14} opacity={0.16} animation="wobble" hideMobile />
      <LogoSticker size={65} bottom="8%" left="2%" rotation={-19} opacity={0.12} animation="float" hideMobile />

      <div className="BR-BgDeco" aria-hidden="true" />

      <div className="BR-Container">
        <div className="BR-Header">
          <span className="BR-Tag">Bilan retraite</span>
          <h2 className="BR-Title">
            Trois niveaux d’accompagnement pour votre{' '}
            <span className="BR-Accent">bilan retraite</span>
          </h2>
          <p className="BR-Intro">
            Du diagnostic à la clé en main, choisissez la formule qui correspond à votre besoin et avancez avec
            clarté.
          </p>
        </div>

        <div className="BR-Grid">
          {packs.map((pack) => (
            <div key={pack.id} className="BR-Card">
              <div className="BR-Card-Accent" aria-hidden />

              <div className="BR-Card-Meta">
                <span className="BR-Card-Icon">
                  <PackIcon id={pack.id} color="#0071bc" size={22} />
                </span>
              </div>

              <h3 className="BR-Card-Title">{pack.title}</h3>
              <p className="BR-Card-Tagline">{pack.tagline}</p>

              <div className="BR-Price-Pill">{pack.pricePill}</div>

              <p className="BR-Card-Lead">{pack.intro}</p>

              <ul className="BR-Features">
                {pack.features.map((f, i) => (
                  <li key={i}>
                    <ListCheck />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className="BR-Btn" onClick={() => setActiveModal(pack.id)}>
                Plus d’informations
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path
                    d="M4 10h12M10 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeModal && activePack && (
        <div className="BR-Overlay" onClick={() => setActiveModal(null)} role="dialog" aria-modal="true">
          <div className="BR-Modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="BR-Modal-Close" onClick={() => setActiveModal(null)} aria-label="Fermer">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="BR-Modal-Head BR-Modal-Head--brand">
              <div className="BR-Modal-HeadTop">
                <span className="BR-Modal-Icon">
                  <PackIcon id={activePack.id} color="#ffffff" size={26} />
                </span>
                <span className="BR-Modal-PricePill">{activePack.pricePill}</span>
              </div>
              <h3 className="BR-Modal-Title">{activePack.title}</h3>
              <p className="BR-Modal-Tagline">{activePack.tagline}</p>
            </div>

            <div className="BR-Modal-Body BR-Modal-Body--stacked">
              <p className="BR-Modal-Lead">{activePack.intro}</p>
              <p className="BR-Modal-ListTitle">Inclus dans cette formule</p>
              <ul className="BR-Modal-List BR-Modal-List--single">
                {activePack.features.map((item, i) => (
                  <li key={i}>
                    <ListCheck />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="BR-Modal-Footer">
              <button type="button" className="BR-Modal-Cta BR-Modal-Cta--gradient" onClick={() => navigate('/contact')}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path
                    d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4l3 2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                Faire mon bilan en ligne
              </button>
              <button type="button" className="BR-Modal-Cta BR-Modal-Cta--outline" onClick={() => navigate('/contact')}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 9h14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Contacter un conseiller
              </button>
              <button type="button" className="BR-Modal-Dismiss" onClick={() => setActiveModal(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
