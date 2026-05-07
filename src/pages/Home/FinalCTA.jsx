import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import './FinalCTA.css';
// Importe ton image de couple ici
import coupleImg from '../../assets/couple3.jpg'; 
import LogoSticker from '../../components/Common/LogoSticker';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="final-cta-section">
      <LogoSticker size={86} top="7%" left="3%" rotation={-12} opacity={0.15} animation="wobble" hideMobile />
      <LogoSticker size={70} bottom="9%" right="3%" rotation={14} opacity={0.13} animation="float" hideMobile />
      <div className="final-cta-container">
        
        {/* IMAGE À GAUCHE DANS UN CADRE STYLÉ */}
        <div className="cta-image-wrapper">
          <div className="cta-image-frame">
            <img src={coupleImg} alt="Retraite sereine" />
            <div className="frame-decorator"></div>
          </div>
        </div>

        {/* TEXTE ET BOUTONS À DROITE */}
        <div className="cta-content-right">
          <h2 className="cta-main-title">
            Ne laissez pas votre retraite <br />
            <span>au hasard</span>
          </h2>
          <p className="cta-subtitle">
            Un simple échange peut faire toute la différence 
            sur vos revenus futurs.
          </p>
          
          <div className="cta-buttons-group">
            <button className="btn-primary-cta" onClick={() => navigate('/services/bilan')}>
              Faire mon bilan retraite <ArrowRight size={20} />
            </button>
            <button className="btn-secondary-cta" onClick={() => navigate('/contact')}>
              Contactez-nous <MessageSquare size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;