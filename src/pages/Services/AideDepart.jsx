import React, { useState, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './BilanRetraite.css';
import './AideDepart.css';
import servicePhoto from '../../assets/photoservices2.jpg';
import LogoSticker from '../../components/Common/LogoSticker';

/* ── Chips hero ───────────────────────────────────────────── */
const chips = [
  {
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2"/></svg>,
    label: 'Indemnités de départ',
  },
  {
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    label: 'Départ anticipé',
  },
  {
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    label: 'Optimisations fiscales',
  },
];

/* ── Packs aide au départ (contenu maquette, structure type Bilan retraite) ─ */
const packs = [
  {
    id: 'decouverte',
    title: 'PACK DÉCOUVERTE',
    tagline: 'Identifiez rapidement ce à quoi vous avez droit',
    pricePill: 'XXX € TTC',
    intro:
      'Identifier rapidement les aides auxquelles vous avez droit pour ne laisser aucune opportunité de côté.',
    modalIdeal:
      "Les personnes qui veulent savoir si elles passent à côté d'opportunités",
    features: [
      'Analyse de votre situation actuelle',
      'Identification des aides potentielles',
      'Vérification de votre éligibilité',
      'Liste claire des dispositifs accessibles',
    ],
    modalDetail: {
      comprendTitle: 'Ce que comprend le pack :',
      comprend: [
        'Analyse de votre situation personnelle et professionnelle',
        'Étude de votre date de départ envisagée',
        {
          text: 'Identification des dispositifs potentiellement applicables :',
          sub: [
            'indemnités de départ à la retraite',
            'dispositifs de départ anticipé',
            'droits spécifiques liés à votre statut',
          ],
        },
        'Vérification de votre éligibilité aux aides existantes',
        'Première analyse des opportunités financières liées à votre départ',
        'Signalement des points de vigilance à anticiper',
      ],
      recoitTitle: 'Ce que vous recevez',
      recoit: [
        { text: 'Une synthèse claire et structurée' },
        { text: 'Une liste des aides et dispositifs accessibles' },
        { text: 'Une première estimation des opportunités' },
        { text: 'Des recommandations simples pour la suite' },
      ],
    },
  },
  {
    id: 'optimisation',
    title: 'PACK OPTIMISATION DÉPART',
    tagline: 'Maximisez les avantages financiers liés à votre départ',
    pricePill: 'XXX € TTC',
    intro:
      'Maximiser les avantages financiers et optimiser chaque levier disponible au moment du départ à la retraite.',
    modalIdeal:
      'Les personnes qui veulent optimiser leur situation financière au moment du départ',
    features: [
      'Diagnostic complet des aides',
      'Analyse des indemnités de départ',
      'Étude des options de départ anticipé',
      'Optimisation fiscale liée au départ',
      'Recommandations personnalisées',
    ],
    modalDetail: {
      comprendTitle: 'Ce que comprend le pack :',
      comprend: [
        'Tout le diagnostic découverte',
        'Analyse détaillée de votre situation de fin de carrière',
        {
          text: 'Étude complète des indemnités de départ :',
          sub: [
            'calcul estimatif',
            "conditions d'attribution",
            'optimisation du montant',
          ],
        },
        {
          text: 'Analyse des options de départ anticipé :',
          sub: [
            'carrières longues',
            'situations spécifiques',
          ],
        },
        'Simulation de plusieurs scénarios de départ (dates / impacts financiers)',
        'Étude des optimisations fiscales liées au départ',
        "Identification des leviers d'amélioration",
        'Recommandations personnalisées et priorisées',
      ],
      recoitTitle: 'Ce que vous recevez',
      recoit: [
        { text: 'Un rapport détaillé et pédagogique' },
        { text: 'Des scénarios comparatifs clairs' },
        { text: 'Une estimation des gains potentiels' },
        { text: 'Des recommandations personnalisées et priorisées' },
      ],
    },
  },
  {
    id: 'complet',
    title: 'PACK ACCOMPAGNEMENT COMPLET',
    tagline: 'Sécurisez chaque étape et maximisez vos droits',
    pricePill: 'XXX € TTC',
    intro:
      'Sécuriser chaque étape du départ en retraite avec un accompagnement complet, de l’analyse à la concrétisation.',
    modalIdeal:
      'Les personnes qui veulent être accompagnées sans stress et sans erreur',
    features: [
      'Tout le pack optimisation',
      'Mise en place des actions recommandées',
      'Aide aux démarches administratives',
      'Coordination avec les organismes',
      'Suivi jusqu’au départ effectif',
    ],
    modalDetail: {
      comprendTitle: 'Ce que comprend le pack :',
      comprend: [
        'Tout le pack Optimisation départ',
        'Entretien personnalisé pour valider votre stratégie',
        "Définition d'un plan d'action clair et priorisé",
        'Mise en place des actions et optimisations recommandées',
        {
          text: 'Assistance dans les démarches administratives :',
          sub: [
            'constitution des dossiers',
            'coordination et suivi avec les organismes',
          ],
        },
        'Vérification des montants et droits avant validation',
        "Suivi jusqu'au départ effectif",
        'Assistance en cas de blocage ou de question',
      ],
      recoitTitle: 'Ce que vous recevez',
      recoit: [
        { text: "Un rapport complet + plan d'action" },
        { text: 'Un accompagnement humain dédié' },
        { text: 'Un suivi personnalisé jusqu’au départ' },
        { text: 'Une sécurisation complète de votre départ' },
      ],
    },
  },
];

/* ── Icônes ───────────────────────────────────────────────── */
function PackIcon({ id, color = '#0071bc', size = 22 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (id === 'decouverte') return (
    <svg {...p}><circle cx="11" cy="11" r="8"/><path d="M21 21l-3.5-3.5"/><path d="M8.5 11l2 2 3-3.2"/></svg>
  );
  if (id === 'optimisation') return (
    <svg {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  );
  if (id === 'complet') return (
    <svg {...p}><path d="M12 2L4 6v6c0 5.2 3.6 9.1 8 10 4.4-.9 8-4.8 8-10V6L12 2z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>
  );
  return null;
}

function ListCheck() {
  const uid = useId().replace(/:/g, '');
  const gradId = `ad-check-grad-${uid}`;
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

/* ── Composant principal ──────────────────────────────────── */
export default function AideDepart() {
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
    <section id="aide-depart-retraite" className="AD-Section">
      {/* Stickers décoratifs */}
      <LogoSticker size={95}  top="6%" right="4%" rotation={16} opacity={0.16} animation="wobble" hideMobile />
      <LogoSticker size={60}  bottom="10%" left="1.5%" rotation={-22} opacity={0.12} animation="float" hideMobile />

      <div className="AD-BgDeco" aria-hidden="true" />

      {/* ══ PARTIE HERO ══════════════════════════════════════ */}
      <div className="AD-Container">

        {/* Colonne texte */}
        <div className="AD-Content">
          <span className="AD-Tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Aide au départ en retraite
          </span>

          <h2 className="AD-Title">
            Ne passez pas à côté des{' '}
            <span className="AD-TitleGradient">aides et opportunités</span>{' '}
            au moment de votre départ
          </h2>

          <p className="AD-Text">
            Au moment de partir à la retraite, plusieurs dispositifs peuvent
            s'appliquer à votre situation. Pourtant, ils sont souvent méconnus
            ou mal exploités.{' '}
            <strong>
              KapAvenir vous aide à identifier et activer tous les leviers disponibles pour optimiser votre départ.
            </strong>
          </p>

          <div className="AD-Chips">
            {chips.map((c, i) => (
              <div key={i} className="AD-Chip">
                <span className="AD-Chip-Icon">{c.icon}</span>
                <span className="AD-Chip-Label">{c.label}</span>
              </div>
            ))}
          </div>

          <div className="AD-Actions">
            <button className="AD-Btn AD-Btn--primary" onClick={() => navigate('/services/aide-depart')}>
              Je découvre les aides
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="AD-Btn AD-Btn--outline" onClick={() => navigate('/contact')}>
              Contacter un conseiller
            </button>
          </div>
        </div>

        {/* Colonne image */}
        <div className="AD-Visual">
          <div className="AD-PhotoStack">
            <div className="AD-PhotoPlate" aria-hidden="true" />
            <div className="AD-PhotoAccent" aria-hidden="true" />
            <figure className="AD-PhotoFigure">
              <img src={servicePhoto} alt="Accompagnement retraite KapAvenir" className="AD-ManImg" draggable="false" />
            </figure>
          </div>
          <div className="AD-FloatBadge AD-FloatBadge--tl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00bf63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L4 6v6c0 5.2 3.6 9.1 8 10 4.4-.9 8-4.8 8-10V6L12 2z"/>
              <path d="M8.5 12l2.5 2.5 4.5-5"/>
            </svg>
            <div>
              <p className="AD-FloatBadge-Title">Accompagnement</p>
              <p className="AD-FloatBadge-Sub">100% personnalisé</p>
            </div>
          </div>
          <div className="AD-FloatBadge AD-FloatBadge--br">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4381C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            <div>
              <p className="AD-FloatBadge-Title">Diagnostic</p>
              <p className="AD-FloatBadge-Sub">offert au 1er RDV</p>
            </div>
          </div>
        </div>
      </div>

      <div className="AD-PacksWrap">
        <div className="BR-Container">
          <div className="BR-Header">
            <span className="BR-Tag">Nos formules</span>
            <h3 className="BR-Title">
              Choisissez votre{' '}
              <span className="BR-Accent">niveau d&apos;accompagnement</span>
            </h3>
            <p className="BR-Intro">
              Trois packs pour identifier les aides au départ, optimiser votre situation ou être accompagné jusqu’au
              départ effectif.
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

                <h4 className="BR-Card-Title">{pack.title}</h4>
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
                  Plus d&apos;informations
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
      </div>

      {activeModal && activePack && createPortal(
        <div className="BR-Overlay" onClick={() => setActiveModal(null)} role="dialog" aria-modal="true">
          <div className="BR-Modal" onClick={(e) => e.stopPropagation()}>
            <div className="BR-Modal-Head BR-Modal-Head--brand">
              <button type="button" className="BR-Modal-Close" onClick={() => setActiveModal(null)} aria-label="Fermer">
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
              <h3 className="BR-Modal-Title">{activePack.title}</h3>
              <p className="BR-Modal-Tagline">{activePack.tagline}</p>
            </div>

            <div className="BR-Modal-Body BR-Modal-Body--detail">
              <p className="BR-Modal-Lead">{activePack.intro}</p>

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
                        <span>
                          {typeof item === 'string' ? item : item.text}
                          {typeof item === 'object' && item.sub && (
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
            </div>

            {activePack.modalIdeal && (
              <div className="BR-Modal-Ideal">
                <span className="BR-Modal-Ideal-Label">Idéal pour :</span>
                <span className="BR-Modal-Ideal-Text">{activePack.modalIdeal}</span>
              </div>
            )}

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
                Prendre rendez-vous
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
        </div>,
        document.body
      )}
    </section>
  );
}
