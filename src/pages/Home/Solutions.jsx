import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Target, Zap } from 'lucide-react';
import './Solutions.css';
import imageBilan from '../../assets/couple7.jpg';
import imageDepart from '../../assets/meeting2.jpg';
import LogoSticker from '../../components/Common/LogoSticker';

const Solutions = () => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState({ card1: false, card2: false });

  const toggleFlip = (cardKey) => {
    setFlipped(prev => ({ ...prev, [cardKey]: !prev[cardKey] }));
  };

  const solutions = [
    {
      id: "card1",
      title: "Bilan retraite",
      image: imageBilan,
      highlights: ["Calcul précis", "Analyse de droits", "Anticipation"],
      description: "Comprenez clairement vos droits, estimez votre future pension et anticipez vos choix pour préparer votre retraite en toute sérénité.",
      cta: "Découvrez nos formules de bilan retraite"
    },
    {
      id: "card2",
      title: "Aide au départ en retraite",
      image: imageDepart,
      highlights: ["Sécurité totale", "Zéro paperasse", "Suivi pas à pas"],
      description: "Sécurisez votre départ et vos démarches administratives grâce à un accompagnement clair, étape par étape, jusqu’au jour de votre retraite.",
      cta: "Découvrez nos formules d'aides au départ en retraite"
    }
  ];

  return (
    <section className="sol-premium-section">
      {/* Stickers décoratifs */}
      <LogoSticker size={110} top="6%" right="2%" rotation={12} opacity={0.17} animation="wobble" hideMobile />
      <LogoSticker size={70}  bottom="12%" left="1.5%" rotation={-22} opacity={0.13} animation="float" hideMobile />

      <div className="sol-mesh-bg">
        <div className="mesh-orb orb-blue"></div>
        <div className="mesh-orb orb-green"></div>
      </div>

      <div className="sol-flex-container">
        <div className="sol-text-side">
          <h2 className="sol-h2">
            Nos solutions <br />
            <span className="sol-gradient-text">pour préparer votre retraite</span>
          </h2>
          <p className="sol-p">
            Chez KapAvenir, nous simplifions la retraite pour que vous puissiez prendre vos décisions en toute sérénité. Du Bilan retraite à l’Aide au départ, nous vous accompagnons pas à pas.
          </p>
        </div>

        <div className="sol-visual-side">
          <div className="sol-cards-stack">
            {solutions.map((sol) => (
              <div 
                key={sol.id} 
                className={`sol-card-box ${flipped[sol.id] ? 'is-flipped' : ''}`}
                onClick={() => toggleFlip(sol.id)}
              >
                <div className="sol-card-inner">
                  
                  {/* RECTO */}
                  <div className="sol-card-front">
                    <img src={sol.image} alt={sol.title} />
                    <div className="sol-front-overlay">
                      <div className="sol-front-header">
                        <span className="sol-badge">Expertise</span>
                        <h3>{sol.title}</h3>
                      </div>
                      <span className="sol-hint">Détails de la solution <ArrowRight size={16} /></span>
                    </div>
                  </div>

                  {/* VERSO AMÉLIORÉ */}
                  <div className="sol-card-back">
                    <div className="sol-back-grid">
                      <div className="sol-back-header">
                        <Target size={24} className="icon-accent" />
                        <h3>{sol.title}</h3>
                      </div>
                      
                      <div className="sol-highlights">
                        {sol.highlights.map((h, i) => (
                          <span key={i} className="h-tag"><CheckCircle2 size={12} /> {h}</span>
                        ))}
                      </div>

                      <p className="sol-back-text">{sol.description}</p>
                      
                      <button
                        className="sol-cta-premium"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(sol.id === 'card1' ? '/services/bilan' : '/services/aide-depart');
                        }}
                      >
                        <span className="btn-content">{sol.cta}</span>
                        <div className="btn-icon-box"><ArrowRight size={20} /></div>
                      </button>
                    </div>
                    <div className="sol-card-progress"></div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;