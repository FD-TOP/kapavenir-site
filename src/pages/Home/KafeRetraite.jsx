import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, ArrowRight, CheckCircle2, MessageSquare, FileText } from 'lucide-react';
import './KafeRetraite.css';
import LogoSticker from '../../components/Common/LogoSticker';
import grp1 from '../../assets/grp1.png';
import grp2 from '../../assets/grp2.png';
import meeting55 from '../../assets/meeting55.jpg';
import meeting66 from '../../assets/meeting66.jpg';
import couple9 from '../../assets/couple9.png';

const pillarData = [
  { text: "D’explications claires et pédagogiques" },
  { text: "De réponses à vos questions" },
  { text: "D’un premier niveau d’analyse de votre situation" },
  { text: "D’une vision concrète de vos options" }
];

const flipCards = [
  {
    frontTitle: 'Pour les particuliers',
    frontImage: meeting66,
    backPoints: [
      'Vous avez entre 45 et 60 ans',
      'Vous commencez à penser à votre retraite',
      'Vous avez des doutes ou des questions',
      'Vous voulez éviter les erreurs coûteuses',
    ],
  },
  {
    frontTitle: 'Pour les entreprises',
    frontImage: meeting55,
    backPoints: [
      'Vous souhaitez accompagner vos collaborateurs',
      'Vous cherchez une action concrète en qualité de vie au travail (QVT)',
      'Vous voulez proposer un service utile et différenciant',
    ],
  },
];

const whyParticipate = [
  'Des trimestres sont oubliés',
  'Des optimisations ne sont pas faites',
  'Des décisions importantes sont prises trop tard',
];

const resultPoints = [
  'Une retraite moins élevée',
  'Un départ retardé',
  'Des opportunités perdues',
];

const outcomes = [
  'Une meilleure compréhension de votre situation',
  'Une première vision de votre âge de départ réel',
  'Des pistes d’optimisation concrètes',
  'Une capacité à prendre des décisions éclairées',
];

export default function KafeRetraite() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;

    const items = root.querySelectorAll('.K-animate');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const toggleFlip = (key) => {
    setFlippedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="KafeRetraiteSection" className="K-corporate" ref={sectionRef}>
      {/* Stickers décoratifs */}
      <LogoSticker size={105} top="6%" right="3%" rotation={14} opacity={0.18} animation="wobble" hideMobile />
      <LogoSticker size={70}  bottom="10%" left="2%" rotation={-20} opacity={0.14} animation="float" hideMobile />
      <LogoSticker size={82} top="40%" left="1.5%" rotation={10} opacity={0.12} animation="spin" hideMobile />
      <LogoSticker size={68} bottom="38%" right="2%" rotation={-14} opacity={0.1} animation="wobble" hideMobile />

      <div className="K-container">
        <header className="K-headline K-animate">
          <div className="K-meta-tag">
            <Coffee size={14} strokeWidth={3} />
            <span>Concept Exclusif</span>
          </div>
          <h1 className="K-editorial-title">
            Le Kafé Retraite : L&apos;accompagnement <span className="K-serif">humain</span>.
          </h1>
          <p className="K-editorial-lead">
            Le Kafé Retraite est un moment d’échange, en petit comité, dans un cadre convivial
            (physique ou en ligne).
          </p>
        </header>

        <section className="K-promises K-animate">
          <h3 className="K-promises-title">Pendant cette session, vous bénéficiez :</h3>
          <div className="K-promises-grid">
            {pillarData.map((item, idx) => (
              <article key={idx} className="K-promise-card" style={{ '--k-delay': `${idx * 0.12}s` }}>
                <div className="K-promise-badge">{`0${idx + 1}`}</div>
                <p className="K-promise-text">{item.text}</p>
                <div className="K-pillar-icon">
                  <CheckCircle2 size={22} className="K-check" />
                </div>
              </article>
            ))}
          </div>
          <div className="K-promises-footer">
            <button type="button" className="K-btn-premium" onClick={() => navigate('/contact')}>
              En savoir plus <ArrowRight size={18} />
            </button>
          </div>
        </section>

        <div className="K-post-hero">
          <section className="K-flip-section K-animate">
            <h3 className="K-flip-title">À qui s’adresse le Kafé Retraite ?</h3>
            <div className="K-flip-grid">
              {flipCards.map((card) => (
                <article
                  key={card.frontTitle}
                  className={`K-flip-card ${flippedCards[card.frontTitle] ? 'is-flipped' : ''}`}
                  onClick={() => toggleFlip(card.frontTitle)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${card.frontTitle}. Cliquer pour afficher les détails.`}
                  aria-pressed={Boolean(flippedCards[card.frontTitle])}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip(card.frontTitle);
                    }
                  }}
                >
                  <div className="K-flip-inner">
                    <div className="K-flip-face K-flip-front">
                      <img src={card.frontImage} alt={card.frontTitle} className="K-flip-image" />
                      <div className="K-flip-overlay" />
                      <p className="K-flip-front-title">{card.frontTitle}</p>
                    </div>
                    <div className="K-flip-face K-flip-back">
                      <ul>
                        {card.backPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="K-info-section">
            <article className="K-info-card K-animate">
              <div className="K-info-content">
                <h3>Pourquoi participer ?</h3>
                <div className="K-info-compare">
                  <div className="K-info-labels">
                    <p className="K-info-intro">Parce que dans la majorité des cas :</p>
                    <span className="K-info-label-spacer" aria-hidden="true" />
                    <p className="K-info-intro">Résultat :</p>
                  </div>
                  <div className="K-info-columns">
                    <ul>
                      {whyParticipate.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="K-info-arrow">→</p>
                    <ul className="K-result-list">
                      {resultPoints.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="K-info-note">Le Kafé Retraite vous permet d’anticiper et d’éviter cela.</p>
              </div>
            <img src={grp1} alt="Session Kafe Retraite" className="K-info-image" />
            </article>

            <article className="K-info-card K-animate">
              <div className="K-info-content">
                <h3>Ce que vous allez obtenir à l’issue du Kafé Retraite :</h3>
                <ul className="K-outcome-list">
                  {outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            <img src={grp2} alt="Resultats Kafe Retraite" className="K-info-image" />
            </article>
          </div>

          <section className="K-final-cta K-animate" aria-label="CTA final Kafe Retraite">
            <img src={couple9} alt="" className="K-final-cta-bg" loading="eager" decoding="async" />
            <div className="K-final-cta-overlay" aria-hidden="true" />
            <div className="K-final-cta-content">
              <p className="K-final-cta-tag">Sécurisez votre avenir</p>
              <h3>
                Ne laissez pas votre retraite <span>au hasard</span>
              </h3>
              <div className="K-final-cta-divider" aria-hidden="true" />
              <p>
                Un simple échange peut faire toute la différence sur vos revenus futurs.
                Nos experts sont là pour transformer vos questions en certitudes.
              </p>
              <div className="K-final-cta-actions">
                <button className="K-final-cta-btn" onClick={() => navigate('/services/bilan')}>
                  <FileText size={18} />
                  Faire mon bilan retraite
                  <ArrowRight size={18} />
                </button>
                <button className="K-final-cta-btn is-secondary" onClick={() => navigate('/contact')}>
                  <MessageSquare size={18} />
                  Participer au prochain Kafé Retraite
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}