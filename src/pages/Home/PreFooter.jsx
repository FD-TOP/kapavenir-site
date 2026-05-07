import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, FileBarChart, ArrowRight } from 'lucide-react';
import './PreFooter.css';
import coupleImg from '../../assets/couple3.jpg'; 
import LogoSticker from '../../components/Common/LogoSticker';


export default function PreFooter() {
  const navigate = useNavigate();

  return (
    <section id="FinalCTA" className="F-ethereal-layout">
      <LogoSticker size={92} top="8%" left="2%" rotation={-14} opacity={0.18} animation="wobble" hideMobile />
      <LogoSticker size={78} bottom="10%" right="2%" rotation={12} opacity={0.14} animation="float" hideMobile />
      {/* L'image est en arrière-plan fixe pour créer de la profondeur */}
      <div className="F-bg-image-container">
        <img src={coupleImg} alt="Sérénité" className="F-bg-parallax" />
        <div className="F-bg-overlay"></div>
      </div>

      <div className="F-container">
        <div className="F-glass-card">
          <div className="F-card-content">
            <header className="F-header">
              <span className="F-pre-title">Sécurisez votre avenir</span>
              <h2 className="F-main-title">
                Ne laissez pas votre retraite <br />
                <span className="F-gradient-text">au hasard</span>
              </h2>
              <div className="F-separator"></div>
            </header>

            <p className="F-description">
              Un simple échange peut faire toute la différence sur vos revenus futurs. 
              Nos experts sont là pour transformer vos questions en certitudes.
            </p>

            <div className="F-action-footer">
              <button className="F-btn-primary" onClick={() => navigate('/services/bilan')}>
                <FileBarChart size={20} />
                <span>Faire mon bilan retraite</span>
                <ArrowRight size={16} className="F-arrow" />
              </button>
              
              <button className="F-btn-secondary" onClick={() => navigate('/contact')}>
                <MessageCircle size={20} />
                <span>Contactez-nous</span>
              </button>
            </div>
          </div>
          
          {/* Accent lumineux sur le bord de la carte */}
          <div className="F-card-border-glow"></div>
        </div>
      </div>
    </section>
  );
}