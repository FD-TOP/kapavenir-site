import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Rocket, ShieldCheck, Handshake } from 'lucide-react';
import './ServiceHero.css';
import LogoSticker from '../../components/Common/LogoSticker';

import img1 from '../../assets/couple1.jpeg';
import img2 from '../../assets/women3.jpeg';
import img3 from '../../assets/couple4.jpeg';
import img4 from '../../assets/man.png';

export default function ServiceHero() {
  const navigate = useNavigate();

  return (
    <section className="SH-Hero-Section">
      {/* Stickers décoratifs */}
      <LogoSticker size={115} top="8%" right="4%" rotation={15} opacity={0.18} animation="wobble" hideMobile />
      <LogoSticker size={70}  bottom="12%" left="2%" rotation={-18} opacity={0.13} animation="float" hideMobile />

      <div className="SH-Container">

        {/* TEXTE À GAUCHE */}
        <div className="SH-Text-Side">
          <span className="SH-Badge">Service Hero</span>
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
            <button className="SH-Btn-Glass" onClick={() => navigate('/services/bilan')}>
              <div className="SH-Icon-Circle SH-Blue-Bg">
                <PieChart size={20} />
              </div>
              <span>Je découvre les bilan retraite</span>
            </button>
            <button className="SH-Btn-Glass" onClick={() => navigate('/services/aide-depart')}>
              <div className="SH-Icon-Circle SH-Green-Bg">
                <Rocket size={20} />
              </div>
              <span>Je découvre les aides au départ en retraite</span>
            </button>
          </div>
        </div>

        {/* VISUEL À DROITE */}
        <div className="SH-Visual-Side">
          <div className="SH-Visual-Wrapper">

            {/* Blob principal contenant la grille de photos */}
            <div className="SH-Blob-Container">
              <div className="SH-Photo-Grid">
                <div className="SH-Photo-Frame"><img src={img1} alt="Couple en randonnée" /></div>
                <div className="SH-Photo-Frame"><img src={img2} alt="Femme conseillère" /></div>
                <div className="SH-Photo-Frame"><img src={img3} alt="Couple en consultation" /></div>
                <div className="SH-Photo-Frame"><img src={img4} alt="Homme qui lit" /></div>
              </div>
            </div>

            {/* Icônes flottantes */}
            <div className="SH-Badge-Icon sh-shield">
              <ShieldCheck size={20} />
            </div>
            <div className="SH-Badge-Icon sh-handshake">
              <Handshake size={20} />
            </div>

            {/* Connecteurs / points décoratifs */}
            <div className="SH-Dot sh-d1"></div>
            <div className="SH-Dot sh-d2"></div>
            <div className="SH-Dot sh-d3"></div>
            <div className="SH-Dot sh-d4"></div>

            {/* Lignes de connexion */}
            <div className="SH-Line sh-l1"></div>
            <div className="SH-Line sh-l2"></div>

            {/* Diamant décoratif */}
            <div className="SH-Diamond"></div>

          </div>
        </div>

      </div>
    </section>
  );
}
