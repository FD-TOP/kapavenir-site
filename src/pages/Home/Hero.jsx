import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import LogoSticker from '../../components/Common/LogoSticker';

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
              Préparez votre retraite <br />
              <span className="text-blue">sereinement</span>, sans stress <br />
              ni <span className="text-green">perte d’argent</span>
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