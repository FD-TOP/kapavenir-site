import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Etapes.css';
import couple2 from '../../assets/couple2.jpg';
import videoCom from '../../assets/vidéocom.mp4';
import LogoSticker from '../../components/Common/LogoSticker';

const STEPS = [
  {
    id: '1',
    nav: 'PRISE DE CONTACT',
    heading: 'Un premier échange pour comprendre votre situation',
    intro:
      'Tout commence par un échange simple et rapide. Vous nous présentez votre situation, vos questions et vos objectifs.',
    points: [
      'Prise de rendez-vous en ligne ou par téléphone',
      'Premier échange sans engagement',
      'Identification de vos besoins',
    ],
    objectif: 'Comprendre votre situation et vous orienter vers la meilleure solution',
  },
  {
    id: '2',
    nav: 'ANALYSE DE VOTRE CARRIÈRE',
    heading: 'Une analyse complète et précise de vos droits',
    intro:
      'Nous analysons en détail votre parcours professionnel pour reconstituer votre situation retraite et vérifier l’exactitude de vos droits.',
    points: [
      'Étude de vos relevés de carrière',
      'Vérification des trimestres et points',
      'Détection d’éventuelles anomalies',
      'Reconstitution des périodes manquantes',
    ],
    objectif: 'Établir une base fiable et complète',
  },
  {
    id: '3',
    nav: 'RESTITUTION & RECOMMANDATIONS',
    heading: 'Des résultats clairs et des décisions éclairées',
    intro:
      'Vous recevez une synthèse claire de votre situation ainsi que des recommandations concrètes pour optimiser votre retraite.',
    points: [
      'Estimation de votre pension',
      'Détermination de votre âge de départ optimal',
      'Présentation de plusieurs scénarios',
      'Recommandations personnalisées',
    ],
    objectif: 'Vous donner une vision claire et des leviers d’action',
  },
  {
    id: '4',
    nav: 'ACCOMPAGNEMENT JUSQU’AU DÉPART À LA RETRAITE',
    heading: 'Un accompagnement jusqu’à votre départ',
    intro:
      'Nous restons à vos côtés pour vous aider à mettre en place les actions recommandées et sécuriser votre départ à la retraite.',
    points: [
      'Mise en place des optimisations',
      'Aide aux démarches administratives',
      'Suivi personnalisé',
      'Assistance jusqu’à la liquidation',
    ],
    objectif: 'Vous accompagner en toute sérénité jusqu’à votre retraite',
  },
];

const DIFF_CARDS = [
  'Un interlocuteur unique',
  'Des explications simples et accessibles',
  'Un suivi personnalisé',
  'Une approche orientée résultats',
];

export default function Etapes() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [activeDiff, setActiveDiff] = useState(0);
  const current = STEPS[activeStep];

  useEffect(() => {
    const t = setInterval(() => {
      setActiveDiff((prev) => (prev + 1) % DIFF_CARDS.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="etp-page">
      <LogoSticker size={110} top="132px" right="2%" rotation={14} opacity={0.14} animation="wobble" hideMobile />
      <LogoSticker size={72} bottom="10%" left="2%" rotation={-18} opacity={0.11} animation="float" hideMobile />
      <LogoSticker size={84} top="46%" right="1.5%" rotation={-8} opacity={0.1} animation="spin" hideMobile />
      <LogoSticker size={64} bottom="32%" left="3%" rotation={15} opacity={0.1} animation="wobble" hideMobile />

      <section className="etp-hero">
        <div className="etp-left">
          <p className="etp-label">Comment ça marche ?</p>
          <h1 className="etp-title">
            Un accompagnement{' '}
            <span className="etp-title-accent">
              <span>simple,</span> <span>clair et efficace</span>
            </span>
          </h1>
          <p className="etp-text">
            Préparer sa retraite peut sembler complexe. Chez KapAvenir, tout est conçu pour
            vous simplifier la vie, avec un accompagnement structuré à chaque étape.
          </p>
        </div>

        <div className="etp-right">
          <div className="etp-photo-stage">
            <div className="etp-photo-blob etp-photo-blob--a" aria-hidden />
            <div className="etp-photo-blob etp-photo-blob--b" aria-hidden />
            <div className="etp-photo-ring" aria-hidden />
            <div className="etp-photo-mask">
              <img src={couple2} alt="Accompagnement KapAvenir" className="etp-image" />
            </div>
            <div className="etp-photo-chip">
              <span className="etp-photo-chip-dot" aria-hidden />
              Accompagnement humain
            </div>
          </div>
        </div>
      </section>

      <section className="etp-steps" aria-labelledby="etp-steps-heading">
        <div className="etp-steps-top">
          <p className="etp-steps-eyebrow" id="etp-steps-heading">Parcours en 4 étapes</p>
          <div
            className="etp-step-switcher"
            role="tablist"
            aria-label="Étapes du parcours"
          >
            {STEPS.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                role="tab"
                id={`etp-tab-${step.id}`}
                aria-selected={idx === activeStep}
                aria-controls={`etp-panel-${step.id}`}
                tabIndex={idx === activeStep ? 0 : -1}
                className={`etp-step-chip ${idx === activeStep ? 'is-active' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <span className="etp-step-chip-num">0{step.id}</span>
                <span className="etp-step-chip-label">{step.nav}</span>
              </button>
            ))}
          </div>
          <div className="etp-progress-rail" aria-hidden="true">
            <div
              className="etp-progress-fill"
              style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="etp-stage" role="tabpanel" id={`etp-panel-${current.id}`} aria-labelledby={`etp-tab-${current.id}`}>
          <div key={current.id} className="etp-step-panel">
            <div className="etp-step-header">
              <div className="etp-step-header-text">
                <p className="etp-step-kicker">{current.nav}</p>
                <h3 className="etp-step-title">{current.heading}</h3>
              </div>
              <span className="etp-step-badge">
                Étape {current.id} / {STEPS.length}
              </span>
            </div>

            <div className="etp-step-grid">
              <div className="etp-card etp-card-intro">
                <p className="etp-step-intro">{current.intro}</p>
              </div>

              <div className="etp-card etp-card-points">
                <ul>
                  {current.points.map((point, i) => (
                    <li key={i}>
                      <span className="etp-point-dot" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="etp-card etp-card-goal">
              <p className="etp-step-objectif">
                <strong>Objectif :</strong> {current.objectif}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="etp-bottom">
        <section className="etp-panel etp-panel--diff" aria-labelledby="etp-diff-title">
          <div className="etp-panel-head">
            <p className="etp-panel-eyebrow">Nos atouts</p>
            <h3 className="etp-panel-title" id="etp-diff-title">
              Un accompagnement pensé pour vous simplifier la vie
            </h3>
          </div>
          <div className="etp-diff-cards">
            {DIFF_CARDS.map((item, idx) => (
              <div key={item} className={`etp-diff-card ${idx === activeDiff ? 'is-active' : ''}`}>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="etp-panel etp-panel--time" aria-labelledby="etp-time-title">
          <div className="etp-panel-split">
            <div className="etp-panel-copy">
              <p className="etp-panel-eyebrow">Délai</p>
              <h3 className="etp-panel-title" id="etp-time-title">
                Combien de temps ça prend ?
              </h3>
            </div>
            <p className="etp-panel-text">
              Le processus est simple et rapide.
              <br />
              Quelques échanges suffisent pour obtenir une vision claire et fiable de votre retraite.
            </p>
          </div>
        </section>

        <section className="etp-panel etp-panel--cta" aria-labelledby="etp-cta-title">
          <div className="etp-cta-layout">
            <div className="etp-panel-copy">
              <p className="etp-panel-eyebrow">Passez à l&apos;action</p>
              <h3 className="etp-panel-title" id="etp-cta-title">
                Prêt(e) à faire le point sur votre retraite ?
              </h3>
              <p className="etp-panel-text">
                En quelques étapes, vous pouvez obtenir une vision claire et optimiser votre avenir.
              </p>
              <div className="etp-cta-buttons">
                <button type="button" className="etp-cta-btn primary" onClick={() => navigate('/services/bilan')}>
                  Faire mon bilan retraite
                </button>
                <button type="button" className="etp-cta-btn secondary" onClick={() => navigate('/contact')}>
                  Échanger avec un expert
                </button>
              </div>
            </div>
            <div className="etp-cta-media">
              <video
                className="etp-cta-video"
                src={videoCom}
                autoPlay
                muted
                loop
                playsInline
                title="Présentation vidéo KapAvenir"
                aria-label="Vidéo de présentation KapAvenir (sans son)"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
