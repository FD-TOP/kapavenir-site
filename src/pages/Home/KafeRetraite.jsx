import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, ArrowRight, CheckCircle2 } from 'lucide-react';
import './KafeRetraite.css';
import LogoSticker from '../../components/Common/LogoSticker';
import grp1 from '../../assets/grp1.png';
import grp2 from '../../assets/grp2.png';
import grp3 from '../../assets/grp3.png';
import grp4 from '../../assets/grp4.png';

const pillarData = [
  { text: "D’explications claires et pédagogiques" },
  { text: "De réponses à vos questions" },
  { text: "D’un premier niveau d’analyse de votre situation" },
  { text: "D’une vision concrète de vos options" }
];

const flipCards = [
  {
    frontTitle: 'Pour les particuliers',
    frontImage: grp3,
    backPoints: [
      'Vous avez entre 45 et 60 ans',
      'Vous commencez à penser à votre retraite',
      'Vous avez des doutes ou des questions',
      'Vous voulez éviter les erreurs coûteuses',
    ],
  },
  {
    frontTitle: 'Pour les entreprises',
    frontImage: grp4,
    backPoints: [
      'Vous souhaitez accompagner vos collaborateurs',
      'Vous cherchez une action concrète en qualité de vie au travail (QVT)',
      'Vous voulez proposer un service utile et différenciant',
    ],
  },
];

const whyParticipate = [
  'Des trimestres sont oublies',
  'Des optimisations ne sont pas faites',
  'Des decisions importantes sont prises trop tard',
];

const resultPoints = [
  'Une retraite moins elevee',
  'Un depart retarde',
  'Des opportunites perdues',
];

const outcomes = [
  'Une meilleure comprehension de votre situation',
  'Une premiere vision de votre age de depart reel',
  'Des pistes d optimisation concretes',
  'Une capacite a prendre des decisions eclairees',
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
          <h2 className="K-editorial-title">
            Le Kafé Retraite : L&apos;accompagnement <span className="K-serif">humain</span>.
          </h2>
          <p className="K-editorial-lead">
            Le Kafé Retraite est un moment d’échange, en petit comité, dans un cadre convivial
            (physique ou en ligne). Pendant cette session, vous bénéficiez :
          </p>
        </header>

        <section className="K-promises K-animate">
          <div className="K-promises-top">
            <h3 className="K-promises-title">Notre promesse lors des rencontres :</h3>
            <button className="K-btn-premium" onClick={() => navigate('/contact')}>
              En savoir plus <ArrowRight size={18} />
            </button>
          </div>
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
        </section>

        <div className="K-post-hero">
          <section className="K-flip-section K-animate">
            <h3 className="K-flip-title">A qui s’adresse le Kafe Retraite ?</h3>
            <div className="K-flip-grid">
              {flipCards.map((card) => (
                <article
                  key={card.frontTitle}
                  className={`K-flip-card ${flippedCards[card.frontTitle] ? 'is-flipped' : ''}`}
                  onClick={() => toggleFlip(card.frontTitle)}
                  role="button"
                  tabIndex={0}
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
                <p className="K-info-note">Le Kafe Retraite vous permet d anticiper et d eviter cela.</p>
              </div>
            <img src={grp1} alt="Session Kafe Retraite" className="K-info-image" />
            </article>

            <article className="K-info-card K-animate">
              <div className="K-info-content">
                <h3>Ce que vous allez obtenir a l issue du Kafe Retraite :</h3>
                <ul className="K-outcome-list">
                  {outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            <img src={grp2} alt="Resultats Kafe Retraite" className="K-info-image" />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}