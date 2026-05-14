import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Rocket } from 'lucide-react';
import './ServiceHero.css';
import LogoSticker from '../../components/Common/LogoSticker';

import servicesHeroVideo from '../../assets/vidéoservices.mp4';

export default function ServiceHero() {
  const navigate = useNavigate();

  return (
    <section className="SH-Hero-Section">
      <div className="SH-Video-Bg" aria-hidden="true">
        <video
          className="SH-Video"
          src={servicesHeroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="SH-Video-Scrim" />
      </div>

      <LogoSticker size={115} top="8%" right="4%" rotation={15} opacity={0.22} animation="wobble" hideMobile />
      <LogoSticker size={70} bottom="12%" left="2%" rotation={-18} opacity={0.16} animation="float" hideMobile />

      <div className="SH-Container">
        <div className="SH-Text-Side">
          <h1 className="SH-Main-Title">
            Nos services pour préparer votre{' '}
            <span className="SH-Highlight">retraite sereinement</span>
          </h1>
          <p className="SH-Description">
            Chez KapAvenir, nous savons que chaque carrière est unique.
            Nos services sont conçus pour vous apporter clarté, optimisation
            et accompagnement, quel que soit votre parcours. Découvrez nos
            solutions et choisissez celle qui correspond le mieux à vos besoins.
          </p>

          <div className="SH-Cta-Group">
            <button type="button" className="SH-Btn-Gradient" onClick={() => navigate('/services/bilan')}>
              <div className="SH-Icon-Circle">
                <PieChart size={20} />
              </div>
              <span>Je découvre les bilan retraite</span>
            </button>
            <button type="button" className="SH-Btn-Gradient" onClick={() => navigate('/services/aide-depart')}>
              <div className="SH-Icon-Circle">
                <Rocket size={20} />
              </div>
              <span>Je découvre les aides au départ en retraite</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
