import React from 'react';
import { Eye, Rocket, HeartHandshake } from 'lucide-react';
import './Pillars.css';
import LogoSticker from '../../components/Common/LogoSticker';

const Pillars = () => {
  const pillarData = [
    { title: "Clarté", desc: "vous comprenez enfin votre situation", icon: <Eye size={32} />, id: 1 },
    { title: "Optimisation", desc: "vous maximisez votre retraite", icon: <Rocket size={32} />, id: 2 },
    { title: "Accompagnement humain", desc: "vous n’êtes jamais seul", icon: <HeartHandshake size={32} />, id: 3 }
  ];

  return (
    <section className="pil-section">
      {/* Stickers décoratifs */}
      <LogoSticker size={85} top="5%" left="3%" rotation={-18} opacity={0.15} animation="float" hideMobile />
      <LogoSticker size={60} bottom="8%" right="2%" rotation={22} opacity={0.12} animation="wobble" hideMobile />

      <div className="pil-container">
        <header className="pil-header">
          <h2 className="pil-title">
            Avec KapAvenir, vous reprenez le <span className="pil-gradient">contrôle</span>
          </h2>
          <p className="pil-subtitle">
            Nous rendons simple et clair un sujet complexe et stressant, 
            pour vous aider à préparer sereinement votre avenir.
          </p>
        </header>

        <div className="pil-grid">
          {pillarData.map((item, idx) => (
            <div key={idx} className={`pil-card card-cycle-${idx + 1}`}>
              <div className="pil-icon-box">
                {item.icon}
              </div>
              <div className="pil-text">
                <h3>{item.title} :</h3>
                <p>{item.desc}</p>
              </div>
              {/* Lueur colorée en fond */}
              <div className="pil-card-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;