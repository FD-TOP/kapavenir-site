import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Target, Sparkles } from 'lucide-react';
import './Problematic.css';
import womanImg from '../../assets/women.png';
import LogoSticker from '../../components/Common/LogoSticker'; // Vérifie que ton image est bien là

const Problematic = () => {
  const navigate = useNavigate();
  const challenges = [
    "Vous ne savez pas à quel âge vous pouvez partir",
    "Vous avez peur de perdre de l’argent",
    "Votre carrière est complexe (plusieurs statuts, étranger…)",
    "Vous ne comprenez pas vos relevés retraite",
    "Vous repoussez le sujet parce que c’est trop compliqué"
  ];

  return (
    <section className="prob-section-premium">
      {/* Stickers décoratifs */}
      <LogoSticker size={100} top="8%" right="3%" rotation={18} opacity={0.16} animation="wobble" hideMobile />
      <LogoSticker size={65}  bottom="10%" left="2%" rotation={-15} opacity={0.13} animation="float" hideMobile />

      {/* Glows d'arrière-plan pour l'ambiance */}
      <div className="glow-blur-blue"></div>
      <div className="glow-blur-green"></div>

      <div className="prob-grid-wrapper">
        {/* VISUEL : Image XXL + Déco discrète + Ombre colorée */}
        <div className="prob-visual-side">
          <div className="prob-img-frame">
            <img src={womanImg} alt="Accompagnement" className="prob-photo-xxl" />
            
            {/* Éléments décoratifs abstraits autour de l'image */}
            <div className="deco-abstract-1"></div>
            <div className="deco-abstract-2"></div>
            <Sparkles className="deco-sparkle-1" size={24} />
          </div>
        </div>

        {/* TEXTE : Typographie avec effet brillance */}
        <div className="prob-text-side">
          <h2 className="prob-h2-title">
            Vous êtes dans l’un de <br />
            <span className="prob-shiny-text">ces cas ?</span>
          </h2>

          <div className="prob-interactive-stack">
            {challenges.map((text, idx) => (
              <div key={idx} className="prob-list-card" style={{ "--delay": idx }}>
                <div className="prob-card-sweep"></div>
                <div className="prob-card-content">
                  <CheckCircle2 className="prob-v-icon" size={22} />
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="prob-final-block">
            <div className="prob-quote-line">
              <Target size={24} className="target-icon" />
              <p>Vous n’êtes pas seul(e). Et surtout, <strong>des solutions existent.</strong></p>
            </div>
            <button className="prob-btn-main" onClick={() => navigate('/services')}>
              <span>Découvrir nos solutions</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problematic;