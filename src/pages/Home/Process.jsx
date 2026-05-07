import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Phone, Search, FileText, UserCheck } from 'lucide-react';
import './Process.css';
import LogoSticker from '../../components/Common/LogoSticker';

const steps = [
  { id: 1, title: "Prise de contact", icon: <Phone size={24} />, color: "#00b6de" },
  { id: 2, title: "Analyse de votre carrière", icon: <Search size={24} />, color: "#00bf63" },
  { id: 3, title: "Restitution claire et recommandations", icon: <FileText size={24} />, color: "#00b6de" },
  { id: 4, title: "Accompagnement jusqu'à la retraite", icon: <UserCheck size={24} />, color: "#00bf63" }
];

export default function Process() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="ProcessSection" className="P-ultra-modern P-with-bg">
      {/* Stickers décoratifs */}
      <LogoSticker size={90}  top="5%" left="2%" rotation={-14} opacity={0.15} animation="float" hideMobile />
      <LogoSticker size={65}  bottom="10%" right="3%" rotation={20} opacity={0.12} animation="wobble" hideMobile />

      {/* --- LES ÉLÉMENTS D'ARRIÈRE-PLAN ANIMÉS --- */}
      <div className="P-bg-blobs">
        <div className="P-blob P-blob-cyan"></div>
        <div className="P-blob P-blob-green"></div>
        <div className="P-blob P-blob-white"></div>
      </div>

      <div className="P-container">
        <header className="P-header">
          <h2 className="P-h2">Un accompagnement <span className="P-gradient">simple en 4 étapes</span></h2>
          <p className="P-subtitle">Notre méthode rigoureuse pour garantir la sérénité de votre futur.</p>
        </header>

        <div className="P-timeline-wrapper">
          <div className="P-rail-bg">
            <div className="P-rail-active" style={{ width: `${(active / (steps.length - 1)) * 100}%` }}></div>
          </div>

          <div className="P-steps-grid">
            {steps.map((step, idx) => (
              <div 
                key={step.id} 
                className={`P-step-card ${idx === active ? 'is-active' : ''} ${idx < active ? 'is-done' : ''}`}
                style={{ "--accent": step.color }}
              >
                <div className="P-card-inner">
                  <div className="P-icon-container">
                    <div className="P-glow"></div>
                    <div className="P-icon-main">
                      {idx < active ? <Check size={28} strokeWidth={3} /> : step.icon}
                    </div>
                  </div>
                  
                  <div className="P-content">
                    <span className="P-step-num">Étape 0{step.id}</span>
                    <h3 className="P-step-title">{step.title}</h3>
                  </div>
                </div>
                <div className="P-node-point"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="P-footer">
          <button className="P-cta-button" onClick={() => navigate('/services/bilan')}>Je démarre mon bilan maintenant</button>
        </div>
      </div>
    </section>
  );
}