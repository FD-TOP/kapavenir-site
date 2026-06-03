import React, { useState, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import './BilanRetraite.css';
import LogoSticker from '../../components/Common/LogoSticker';
import KapGrad from '../../components/Common/KapGrad';

/* ── Offres bilan retraite (contenu maquette) ─────────────── */
const packs = [
  {
    id: 'clarte',
    title: 'Kap clarté',
    badge: 'Le bon départ',
    badgeIcon: 'star',
    tagline: 'Faites le point sur votre retraite et identifiez les erreurs avant qu’il ne soit trop tard.',
    pricePill: '300 € TTC',
    intro:
      'Un diagnostic retraite clair et personnalisé pour comprendre vos droits, détecter les anomalies et savoir exactement où vous en êtes.',
    modalDetail: {
      comprendTitle: 'Ce que comprend le pack :',
      comprend: [
        'Entretien personnalisé (1h) en présentiel ou à distance',
        'Analyse complète du relevé de carrière',
        'Estimation des droits à la retraite (âge, montant, trimestres)',
        'Détection des anomalies et incohérences',
        'Recommandations concrètes pour correction en autonomie',
        'Conseils stratégiques de premier niveau',
      ],
      recoitTitle: 'Ce que vous recevez',
      recoit: [
        {
          text: 'Rapport de diagnostic retraite personnalisé (PDF) incluant :',
          sub: [
            'Synthèse de la carrière',
            'Estimation des droits',
            'Liste des anomalies détectées',
            'Recommandations actionnables',
          ],
        },
        { text: 'Compte rendu de l’entretien' },
        { text: 'Checklist des démarches à effectuer' },
        { text: 'Support email (limité) pour questions post-diagnostic' },
      ],
    },
    features: [
      'Entretien personnalisé (1h) en présentiel ou à distance',
      'Analyse complète du relevé de carrière',
      'Estimation des droits à la retraite (âge, montant, trimestres)',
      'Détection des anomalies et incohérences',
      'Recommandations concrètes pour correction en autonomie',
      'Conseils stratégiques de premier niveau',
    ],
  },
  {
    id: 'mesure',
    title: 'Kap Mesure',
    badge: 'Le meilleur équilibre',
    badgeIcon: 'star',
    tagline: 'Préparez une retraite optimisée, avec méthode et sérénité.',
    pricePill: '870 € TTC',
    intro:
      'Une solution intermédiaire idéale pour sécuriser et optimiser votre retraite avant les démarches complètes.',
    modalDetail: {
      comprendTitle: 'Ce que comprend le pack :',
      comprend: [
        'Entretien personnalisé approfondi (1h30) en présentiel ou à distance',
        'Analyse complète de votre relevé de carrière',
        'Diagnostic retraite détaillé et personnalisé',
        'Détection des anomalies et incohérences',
        'Estimation optimisée des droits retraite (âge, montant, trimestres)',
        'Simulations selon plusieurs âges de départ',
        'Recommandations stratégiques personnalisées',
        'Aide aux démarches prioritaires auprès des caisses',
        'Plan d’actions retraite clair et structuré',
        'Conseils d’optimisation de premier niveau',
      ],
      recoitTitle: 'Ce que vous recevez',
      recoit: [
        {
          text: 'Rapport retraite personnalisé premium (PDF)',
          sub: [
            'Synthèse complète de carrière',
            'Estimation détaillée des droits',
            'Analyse des anomalies détectées',
            'Recommandations d’optimisation',
            'Plan d’actions priorisé',
          ],
        },
        { text: 'Simulations comparatives de départ' },
        { text: 'Compte rendu détaillé de l’entretien' },
        { text: 'Checklist des démarches à effectuer' },
        { text: 'Tableau de suivi des actions recommandées' },
        { text: 'Support e-mail dédié pendant l’étude du dossier' },
      ],
    },
    features: [
      'Entretien personnalisé approfondi (1h30) en présentiel ou à distance',
      'Analyse complète de votre relevé de carrière',
      'Diagnostic retraite détaillé et personnalisé',
      'Détection des anomalies et incohérences',
      'Estimation optimisée des droits retraite (âge, montant, trimestres)',
      'Simulations selon plusieurs âges de départ',
      'Recommandations stratégiques personnalisées',
      'Aide aux démarches prioritaires auprès des caisses',
      'Plan d’actions retraite clair et structuré',
      'Conseils d’optimisation de premier niveau',
    ],
  },
  {
    id: 'maitrise',
    title: 'Kap Maîtrise',
    badge: 'Le plus choisi',
    badgeIcon: 'star',
    tagline: 'Sécurisez et optimisez votre départ à la retraite avec un accompagnement complet.',
    pricePill: '1500 € TTC',
    intro:
      'Nous analysons, corrigeons et préparons votre dossier retraite afin de vous permettre de partir dans les meilleures conditions, sans stress administratif.',
    modalDetail: {
      comprendTitle: 'Ce que comprend le pack :',
      comprend: [
        'Entretien personnalisé (1h30) en présentiel ou à distance',
        'Diagnostic retraite approfondi',
        'Reconstitution complète de carrière',
        'Régularisation des anomalies auprès des caisses',
        'Constitution du dossier de demande retraite',
        'Suivi administratif personnalisé',
        'Assistance dans les échanges avec les organismes',
      ],
      recoitTitle: 'Ce que vous recevez',
      recoit: [
        { text: 'Dossier retraite complet et structuré' },
        {
          text: 'Rapport d’optimisation personnalisé :',
          sub: ['Scénario recommandé', 'Gains estimés'],
        },
        { text: 'Dossier administratif prêt à déposer' },
        { text: 'Copies de tous les échanges et démarches effectuées' },
        { text: 'Tableau de suivi des actions et avancement' },
        { text: 'Support dédié pendant toute la durée du dossier' },
      ],
    },
    features: [
      'Entretien personnalisé (1h30) en présentiel ou à distance',
      'Diagnostic retraite approfondi',
      'Reconstitution complète de carrière',
      'Régularisation des anomalies auprès des caisses',
      'Constitution du dossier de demande retraite',
      'Suivi administratif personnalisé',
      'Assistance dans les échanges avec les organismes',
    ],
  },
  {
    id: 'prestige',
    title: 'Kap Prestige',
    badge: 'Accompagnement premium',
    badgeIcon: 'crown',
    tagline: 'Une prise en charge intégrale et haut de gamme pour une retraite sans charge mentale.',
    pricePill: '3500 € TTC',
    intro:
      'Une solution premium pour déléguer entièrement la préparation, l’optimisation et la gestion de votre retraite jusqu’à la liquidation de vos droits.',
    modalDetail: {
      comprendTitle: 'Ce que comprend le pack :',
      comprend: [
        'Tout le contenu du Kap Maîtrise',
        'Simulations avancées (multi-scénarios de départ)',
        'Optimisation fine (cumul emploi-retraite, retraite progressive)',
        'Accompagnement au rachat de trimestres (analyse + gestion complète)',
        'Support illimité (questions, courriers, décisions)',
        'Accompagnement physique (selon zone définie)',
        'Gestion intégrale jusqu’à la liquidation des droits',
        'Assistance après départ à la retraite',
      ],
      recoitTitle: 'Ce que vous recevez',
      recoit: [
        { text: 'Étude stratégique complète avec scénarios comparatifs' },
        { text: 'Plan retraite sur-mesure (document premium)' },
        { text: 'Simulations financières détaillées' },
        { text: 'Dossier clé en main entièrement géré' },
        { text: 'Historique complet des démarches et décisions' },
        { text: 'Accès prioritaire au support (illimité)' },
        {
          text: 'Guide post-retraite personnalisé',
          sub: ['Compréhension des pensions', 'Ajustements possibles'],
        },
        { text: 'Accompagnement humain dédié (interlocuteur unique)' },
      ],
    },
    features: [
      'Tout le contenu du Kap Maîtrise',
      'Simulations avancées (multi-scénarios de départ)',
      'Optimisation fine (cumul emploi-retraite, retraite progressive)',
      'Accompagnement au rachat de trimestres (analyse + gestion complète)',
      'Support illimité (questions, courriers, décisions)',
      'Accompagnement physique (selon zone définie)',
      'Gestion intégrale jusqu’à la liquidation des droits',
      'Assistance après départ à la retraite',
    ],
  },
];

const accompagnements = [
  {
    title: 'Kap clarté',
    text: 'Idéal pour faire le point sur votre retraite et identifier les erreurs avant qu’il ne soit trop tard.',
  },
  {
    title: 'Kap Mesure',
    text: 'Idéal pour optimiser votre retraite avec méthode et sérénité avant les démarches complètes.',
  },
  {
    title: 'Kap Maîtrise',
    text: 'Idéal pour sécuriser votre départ avec un accompagnement complet jusqu’au dépôt du dossier.',
  },
  {
    title: 'Kap Prestige',
    text: 'Idéal pour déléguer intégralement votre retraite avec un accompagnement premium.',
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
  if (id === 'mesure') {
    return (
      <svg {...props}>
        <path d="M3 17l5-6 4 3 5-8 4 6" />
        <path d="M3 20h18" />
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

function SmallGreenCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden>
      <circle cx="10" cy="10" r="10" fill="#00bf63" fillOpacity="0.13" />
      <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#00bf63" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BlueCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden>
      <circle cx="10" cy="10" r="10" fill="#4381C1" fillOpacity="0.13" />
      <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#4381C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BilanRetraite() {
  const navigate = useNavigate();
  const modalTitleId = useId();
  const [activeModal, setActiveModal] = useState(null);
  const [activeAcc, setActiveAcc] = useState(0);
  const closeModal = () => setActiveModal(null);
  const modalRef = useFocusTrap(Boolean(activeModal), closeModal);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAcc((prev) => (prev + 1) % accompagnements.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const activePack = packs.find((p) => p.id === activeModal);

  return (
    <section id="bilan-retraite" className="BR-Section">
      <LogoSticker size={100} top="5%" right="3%" rotation={14} opacity={0.16} animation="wobble" hideMobile />
      <LogoSticker size={65} bottom="8%" left="2%" rotation={-19} opacity={0.12} animation="float" hideMobile />

      <div className="BR-BgDeco" aria-hidden="true" />

      <div className="BR-Container">
        <div className="BR-Header">
          <h2 className="BR-Title">
            Quatre niveaux <KapGrad className="BR-Accent">d&apos;accompagnement</KapGrad> pour votre{' '}
            <KapGrad className="BR-Accent">bilan retraite</KapGrad>
          </h2>
          <p className="BR-Intro">
            Du diagnostic à l’accompagnement premium, choisissez la formule qui correspond à votre besoin et
            avancez avec clarté.
          </p>
        </div>

        <div className="BR-Accompagnement">
          <h3 className="BR-Accompagnement-Title">
            Quel <KapGrad className="BR-Accompagnement-Grad">accompagnement</KapGrad> est fait pour{' '}
            <KapGrad className="BR-Accompagnement-Grad">vous</KapGrad> ?
          </h3>
          <div className="BR-Accompagnement-Grid">
            {accompagnements.map((item, index) => (
              <article
                key={item.title}
                className={`BR-Accompagnement-Card ${activeAcc === index ? 'is-active' : ''}`}
              >
                <span className="BR-Accompagnement-Index">{`0${index + 1}`}</span>
                <h4>
                  <KapGrad className="BR-Accompagnement-Grad">{item.title}</KapGrad>
                </h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="BR-Accompagnement-Dots" aria-hidden="true">
            {accompagnements.map((item, index) => (
              <span key={item.title} className={`BR-Accompagnement-Dot ${activeAcc === index ? 'is-active' : ''}`} />
            ))}
          </div>
        </div>

        <div className="BR-Grid">
          {packs.map((pack) => (
            <div key={pack.id} className="BR-CardShell">
              {pack.badge && (
                <span className="BR-Card-Badge">
                  <span className="BR-Card-Badge-Icon" aria-hidden>
                    {pack.badgeIcon === 'crown' ? '👑' : '⭐'}
                  </span>
                  {pack.badge}
                </span>
              )}
              <div className="BR-Card">
                <div className="BR-Card-Accent" aria-hidden />

              <div className="BR-Card-Meta">
                <span className="BR-Card-Icon">
                  <PackIcon id={pack.id} color="#0071bc" size={22} />
                </span>
              </div>

              <h3 className="BR-Card-Title">
                <span className="BR-Card-TitleGrad">{pack.title}</span>
              </h3>
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
            </div>
          ))}
        </div>
      </div>

      {activeModal && activePack && createPortal(
        <div className="BR-Overlay" onClick={closeModal} role="presentation">
          <div
            ref={modalRef}
            className="BR-Modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="BR-Modal-Head BR-Modal-Head--brand">
              <button type="button" className="BR-Modal-Close" onClick={closeModal} aria-label="Fermer la fenêtre">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <div className="BR-Modal-HeadTop">
                <span className="BR-Modal-Icon">
                  <PackIcon id={activePack.id} color="#ffffff" size={26} />
                </span>
                <span className="BR-Modal-PricePill">{activePack.pricePill}</span>
              </div>
              <h3 id={modalTitleId} className="BR-Modal-Title">
                {activePack.title}
              </h3>
              <p className="BR-Modal-Tagline">{activePack.tagline}</p>
            </div>

            <div
              className={
                activePack.modalDetail
                  ? 'BR-Modal-Body BR-Modal-Body--detail'
                  : 'BR-Modal-Body BR-Modal-Body--stacked'
              }
            >
              <p className="BR-Modal-Lead">{activePack.intro}</p>

              {activePack.modalDetail ? (
                <div className="BR-Modal-Split">
                  <div className="BR-Modal-Col BR-Modal-Col--left">
                    <div className="BR-Modal-ColHead BR-Modal-ColHead--green">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00bf63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M12 2L4 6v6c0 5.2 3.6 9.1 8 10 4.4-.9 8-4.8 8-10V6L12 2z" />
                        <path d="M8.5 12l2.5 2.5 4.5-5" />
                      </svg>
                      {activePack.modalDetail.comprendTitle}
                    </div>
                    <ul className="BR-Modal-List">
                      {activePack.modalDetail.comprend.map((item, i) => (
                        <li key={i}>
                          <SmallGreenCheck />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="BR-Modal-Col BR-Modal-Col--right">
                    <div className="BR-Modal-ColHead BR-Modal-ColHead--blue">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4381C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2z" />
                        <path d="M14 2v6h6" />
                        <path d="M12 13l1.5 2.5L16 14l-1.5 2.5L16 19l-2.5-1L12 20l-1.5-2L8 19l1.5-2.5L8 14l2.5 1.5L12 13z" />
                      </svg>
                      {activePack.modalDetail.recoitTitle}
                    </div>
                    <ul className="BR-Modal-List">
                      {activePack.modalDetail.recoit.map((item, i) => (
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
              ) : (
                <>
                  <p className="BR-Modal-ListTitle">Inclus dans cette formule</p>
                  <ul className="BR-Modal-List BR-Modal-List--single">
                    {activePack.features.map((item, i) => (
                      <li key={i}>
                        <ListCheck />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
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
              <button type="button" className="BR-Modal-Dismiss" onClick={closeModal}>
                Fermer
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
