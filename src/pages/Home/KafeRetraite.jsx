import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, ArrowRight, CheckCircle2 } from 'lucide-react';
import './KafeRetraite.css';
import LogoSticker from '../../components/Common/LogoSticker';
import meeting1 from '../../assets/meeting1.jpg';
import meeting4 from '../../assets/meeting4.jpg';

const pillarData = [
  { text: "D’explications claires et pédagogiques" },
  { text: "De réponses à vos questions" },
  { text: "D’un premier niveau d’analyse de votre situation" },
  { text: "D’une vision concrète de vos options" }
];

const flipCards = [
  {
    frontTitle: 'Pour les particuliers',
    frontImage: meeting1,
    backPoints: [
      'Vous avez entre 45 et 60 ans',
      'Vous commencez a penser a votre retraite',
      'Vous avez des doutes ou des questions',
      'Vous voulez eviter les erreurs couteuses',
    ],
  },
  {
    frontTitle: 'Pour les entreprises',
    frontImage: meeting4,
    backPoints: [
      'Vous souhaitez accompagner vos collaborateurs',
      'Vous cherchez une action concrete en qualite de vie au travail (QVT)',
      'Vous voulez proposer un service utile et differenciant',
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

  return (
    <section id="KafeRetraiteSection" className="K-corporate" ref={sectionRef}>
      {/* Stickers décoratifs */}
      <LogoSticker size={105} top="6%" right="3%" rotation={14} opacity={0.18} animation="wobble" hideMobile />
      <LogoSticker size={70}  bottom="10%" left="2%" rotation={-20} opacity={0.14} animation="float" hideMobile />
      <LogoSticker size={82} top="40%" left="1.5%" rotation={10} opacity={0.12} animation="spin" hideMobile />
      <LogoSticker size={68} bottom="38%" right="2%" rotation={-14} opacity={0.1} animation="wobble" hideMobile />

      <div className="K-container">
        <div className="K-hero-stage">
          <div className="K-editorial-grid">
          
          {/* COLONNE GAUCHE : LE MANIFESTE (FIXE) */}
            <div className="K-manifesto K-animate">
            <div className="K-meta-tag">
              <Coffee size={14} strokeWidth={3} />
              <span>Concept Exclusif</span>
            </div>
            <h2 className="K-editorial-title">
              Le Kafé Retraite : <br />
              L'accompagnement <span className="K-serif">humain</span>.
            </h2>
            <p className="K-editorial-lead">
              Le Kafé Retraite est un moment d’échange, en petit comité, dans un cadre convivial
              (physique ou en ligne). Pendant cette session, vous bénéficiez :
            </p>
            <div className="K-action-footer">
              <button className="K-btn-premium" onClick={() => navigate('/contact')}>
                En savoir plus <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* COLONNE DROITE : LES PILIERS D'EXPERTISE */}
            <div className="K-pillars K-animate">
            <div className="K-pillars-label">Notre promesse lors des rencontres :</div>
            
            <div className="K-list-stack">
              {pillarData.map((item, idx) => (
                <div key={idx} className="K-pillar-item" style={{ '--k-delay': `${idx * 0.2}s` }}>
                  <div className="K-pillar-body">
                    <p className="K-pillar-desc">{item.text}</p>
                  </div>
                  <div className="K-pillar-icon">
                    <CheckCircle2 size={24} className="K-check" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          </div>
        </div>

        <div className="K-post-hero">
          <div className="K-flip-section">
            <h3 className="K-flip-title">A qui s’adresse le Kafe Retraite ?</h3>
            <div className="K-flip-grid">
              {flipCards.map((card) => (
                <article key={card.frontTitle} className="K-flip-card K-animate">
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
          </div>

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
            <img src={meeting1} alt="Session Kafe Retraite" className="K-info-image" />
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
            <img src={meeting4} alt="Resultats Kafe Retraite" className="K-info-image" />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}