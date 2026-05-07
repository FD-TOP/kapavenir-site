import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import LogoSticker from '../../components/Common/LogoSticker';
import './KafeRetraiteHome.css';

const highlights = [
  'Comprendre leur situation retraite',
  'Poser leurs questions librement',
  'Être accompagnés de manière personnalisée',
  'Passer à l\'action (bilan, optimisation, stratégie)',
];

export default function KafeRetraiteHome() {
  const navigate = useNavigate();

  return (
    <section className="KH-wrap">
      <LogoSticker size={86} top="14%" right="2%" rotation={14} opacity={0.13} animation="wobble" hideMobile />
      <LogoSticker size={62} bottom="12%" left="2%" rotation={-20} opacity={0.1} animation="float" hideMobile />

      <div className="KH-inner">
        <div className="KH-layout">
          <div className="KH-intro">
            <p className="KH-kicker">Kafe retraite</p>
            <h2 className="KH-title">
              Le Kafé Retraite est un format d'accompagnement humain et accessible qui permet de démystifier la retraite
              dans un cadre convivial.
            </h2>
            <div className="KH-main-pill">
              KapAvenir propose des rencontres (physiques ou digitales) où les participants peuvent :
            </div>
            <button className="KH-btn" onClick={() => navigate('/kafe-retraite')}>
              En savoir plus <ArrowRight size={16} />
            </button>
          </div>

          <div className="KH-track" aria-label="Parcours Kafe Retraite">
            {highlights.map((item, idx) => (
              <article key={item} className="KH-step-card">
                <span className="KH-step-index">★</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
