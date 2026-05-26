import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import LogoSticker from '../../components/Common/LogoSticker';
import KapGrad from '../../components/Common/KapGrad';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      {/* Stickers décoratifs */}
      <LogoSticker size={130} top="12%" right="6%" rotation={15} opacity={0.22} animation="wobble" hideMobile />
      <LogoSticker size={75} bottom="18%" left="4%" rotation={-20} opacity={0.15} animation="float" hideMobile />

      {/* L'overlay permet de rendre le texte lisible sur n'importe quelle image */}
      <div className="hero-overlay">
        <div className="hero-container">
          
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-plain">Préparez votre retraite</span>
              <br />
              <KapGrad className="hero-grad-word">sereinement</KapGrad>
              <span className="hero-title-plain">, sans stress</span>
              <br />
              <span className="hero-title-plain">ni </span>
              <KapGrad className="hero-grad-word">perte d’argent</KapGrad>
            </h1>
            
            <p className="hero-description">
              KapAvenir vous accompagne pour comprendre, optimiser et sécuriser 
              votre retraite, avec des conseils clairs et personnalisés.
            </p>
            
            <div className="hero-cta-group">
              <button className="btn-bilan" onClick={() => navigate('/services/bilan')}>Je fais mon bilan retraite</button>
              <button className="btn-depart" onClick={() => navigate('/services/aide-depart')}>Je pars en retraite</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;