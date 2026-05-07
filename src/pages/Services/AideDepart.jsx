import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AideDepart.css';
import manImg from '../../assets/man.png';
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

/* ── Packs ────────────────────────────────────────────────── */
const packs = [
  {
    id: 'decouverte',
    num: '01',
    title: 'Pack Découverte',
    tagline: 'Identifiez rapidement ce à quoi vous avez droit',
    price: 'Sur devis',
    accentFrom: '#5aa8e0',
    accentTo: '#4381C1',
    features: [
      'Analyse de votre situation actuelle',
      'Identification des aides potentielles',
      'Vérification de votre éligibilité',
      'Liste claire des dispositifs accessibles',
    ],
    ideal: "Ceux qui veulent savoir s'ils passent à côté d'opportunités",
    modal: {
      objective: 'Identifier rapidement les aides auxquelles vous avez droit pour ne laisser aucune opportunité de côté.',
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
    num: '02',
    title: 'Pack Optimisation Départ',
    tagline: 'Maximisez les avantages financiers liés à votre départ',
    price: 'Sur devis',
    accentFrom: '#4381C1',
    accentTo: '#2558a0',
    featured: true,
    features: [
      'Tout le diagnostic +',
      'Analyse des indemnités de départ',
      'Simulation de scénarios de départ',
      'Optimisation fiscale liée au départ',
    ],
    ideal: 'Ceux qui veulent optimiser leur situation financière au moment du départ',
    modal: {
      objective: 'Maximiser les avantages financiers et optimiser chaque levier disponible au moment du départ à la retraite.',
      comprend: [
        'Tout le diagnostic +',
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
          text: 'Analyse des dispositifs de départ anticipé :',
          sub: [
            'carrières longues',
            'situations spécifiques',
          ],
        },
        'Simulation de plusieurs scénarios de départ (dates / impacts financiers)',
        'Étude des optimisations fiscales liées au départ',
        "Identification des leviers d'amélioration",
        'Évaluation des gains potentiels selon chaque option',
      ],
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
    num: '03',
    title: 'Pack Accompagnement Complet',
    tagline: 'Sécurisez chaque étape et maximisez vos droits sans stress',
    price: 'Sur devis',
    accentFrom: '#1d5499',
    accentTo: '#0d3570',
    features: [
      'Tout le Pack Optimisation inclus',
      'Définition d\'un plan d\'action priorisé',
      'Aide aux démarches administratives',
      'Suivi jusqu\'au départ effectif',
    ],
    ideal: 'Ceux qui veulent être accompagnés sans stress et sans erreur',
    modal: {
      objective: 'Sécuriser chaque étape du départ en retraite avec un accompagnement complet, de l\'analyse à la concrétisation.',
      comprend: [
        'Tout le pack optimisation +',
        'Entretien personnalisé pour valider votre stratégie',
        "Définition d'un plan d'action clair et priorisé",
        'Aide à la mise en place des optimisations recommandées',
        {
          text: 'Assistance dans les démarches administratives :',
          sub: [
            'constitution des dossiers',
            'suivi avec les organismes',
          ],
        },
        'Vérification des montants et droits avant validation',
        "Suivi jusqu'au départ effectif",
        'Assistance en cas de blocage ou de question',
      ],
      recoit: [
        { text: "Un rapport complet + plan d'action" },
        { text: 'Un accompagnement humain dédié' },
        { text: 'Un suivi personnalisé' },
        { text: 'Une sécurisation complète de votre départ' },
      ],
    },
  },
];

/* ── Icônes ───────────────────────────────────────────────── */
function PackIcon({ id, color = '#4381C1', size = 22 }) {
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

function GreenCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="10" cy="10" r="10" fill="#00bf63" fillOpacity="0.13"/>
      <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#00bf63" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BlueCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="10" cy="10" r="10" fill="#4381C1" fillOpacity="0.13"/>
      <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#4381C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
            <span className="AD-Accent">aides et opportunités</span>{' '}
            au moment de votre départ
          </h2>

          <p className="AD-Text">
            Au moment de partir à la retraite, plusieurs dispositifs peuvent
            s'appliquer à votre situation. Pourtant, ils sont souvent méconnus
            ou mal exploités.{' '}
            <strong>KapAvenir vous aide à identifier et activer tous les leviers disponibles.</strong>
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
          <div className="AD-Frame" aria-hidden="true" />
          <img src={manImg} alt="Conseiller KapAvenir" className="AD-ManImg" draggable="false" />
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

      {/* ══ PARTIE PACKS ════════════════════════════════════ */}
      <div className="AD-Packs-Section">
        <div className="AD-Packs-Header">
          <span className="AD-Packs-Tag">✦ Nos formules</span>
          <h3 className="AD-Packs-Title">
            Choisissez votre <span className="AD-Accent">niveau d'accompagnement</span>
          </h3>
        </div>

        <div className="AD-Packs-Grid">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={`AD-Pack-Card${pack.featured ? ' AD-Pack-Card--featured' : ''}`}
              style={{ '--af': pack.accentFrom, '--at': pack.accentTo }}
            >
              <div className="AD-Pack-Accent" />
              {pack.featured && <div className="AD-Pack-Popular">⭐ Le plus choisi</div>}

              <div className="AD-Pack-Meta">
                <span className="AD-Pack-Num">{pack.num}</span>
                <span className="AD-Pack-Icon">
                  <PackIcon id={pack.id} color={pack.featured ? '#fff' : '#4381C1'} size={20} />
                </span>
              </div>

              <h4 className="AD-Pack-Title">{pack.title}</h4>
              <p className="AD-Pack-Tagline">{pack.tagline}</p>

              <div className="AD-Pack-Price">
                <span className="AD-Pack-Price-Text">{pack.price}</span>
              </div>

              <div className="AD-Pack-Divider" />

              <ul className="AD-Pack-Features">
                {pack.features.map((f, i) => (
                  <li key={i}>
                    <GreenCheck />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="AD-Pack-Ideal">
                <span className="AD-Pack-Ideal-Label">Idéal pour :</span>
                <span className="AD-Pack-Ideal-Text">{pack.ideal}</span>
              </div>

              <button
                className="AD-Pack-Btn"
                onClick={() => setActiveModal(pack.id)}
              >
                Plus d'informations
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ══ MODAL ══════════════════════════════════════════ */}
      {activeModal && activePack && (
        <div className="AD-Overlay" onClick={() => setActiveModal(null)} role="dialog" aria-modal="true">
          <div className="AD-Modal" onClick={e => e.stopPropagation()}>

            <button className="AD-Modal-Close" onClick={() => setActiveModal(null)} aria-label="Fermer">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* En-tête */}
            <div className="AD-Modal-Head" style={{ '--mf': activePack.accentFrom, '--mt': activePack.accentTo }}>
              <div className="AD-Modal-HeadTop">
                <span className="AD-Modal-Icon">
                  <PackIcon id={activePack.id} color="#fff" size={24} />
                </span>
                <span className="AD-Modal-PricePill">{activePack.price}</span>
              </div>
              <h3 className="AD-Modal-Title">{activePack.title}</h3>
              <p className="AD-Modal-Tagline">{activePack.tagline}</p>
              <div className="AD-Modal-Obj">
                <span>🎯</span>
                <span>{activePack.modal.objective}</span>
              </div>
            </div>

            {/* Corps 2 colonnes */}
            <div className="AD-Modal-Body">
              <div className="AD-Modal-Col AD-Modal-Col--left">
                <div className="AD-Modal-ColHead AD-Modal-ColHead--green">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00bf63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L4 6v6c0 5.2 3.6 9.1 8 10 4.4-.9 8-4.8 8-10V6L12 2z"/>
                    <path d="M8.5 12l2.5 2.5 4.5-5"/>
                  </svg>
                  Prestations incluses
                </div>
                <ul className="AD-Modal-List">
                  {activePack.modal.comprend.map((item, i) => (
                    <li key={i}>
                      <GreenCheck />
                      <span>
                        {typeof item === 'string' ? item : item.text}
                        {typeof item === 'object' && item.sub && (
                          <ul className="AD-Modal-SubList">
                            {item.sub.map((s, j) => (
                              <li key={j}><span className="AD-SubDot">›</span>{s}</li>
                            ))}
                          </ul>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="AD-Modal-Col AD-Modal-Col--right">
                <div className="AD-Modal-ColHead AD-Modal-ColHead--blue">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4381C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2z"/>
                    <path d="M14 2v6h6"/>
                    <path d="M9 13h6M9 17h4"/>
                  </svg>
                  Ce que vous recevez
                </div>
                <ul className="AD-Modal-List">
                  {activePack.modal.recoit.map((item, i) => (
                    <li key={i}>
                      <BlueCheck />
                      <span>
                        {item.text}
                        {item.sub && (
                          <ul className="AD-Modal-SubList">
                            {item.sub.map((s, j) => (
                              <li key={j}><span className="AD-SubDot">›</span>{s}</li>
                            ))}
                          </ul>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Idéal pour */}
            <div className="AD-Modal-Ideal">
              <span className="AD-Modal-Ideal-Label">Idéal pour :</span>
              <span>{activePack.ideal}</span>
            </div>

            {/* Pied */}
            <div className="AD-Modal-Footer">
              <button className="AD-Modal-Cta AD-Modal-Cta--green" onClick={() => navigate('/contact')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                Prendre rendez-vous
              </button>
              <button className="AD-Modal-Cta AD-Modal-Cta--outline" onClick={() => navigate('/contact')}>
                Contacter un conseiller
              </button>
              <button className="AD-Modal-Dismiss" onClick={() => setActiveModal(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
