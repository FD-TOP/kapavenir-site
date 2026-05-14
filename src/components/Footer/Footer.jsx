import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import femmeImg from '../../assets/8450589.png';

/** Icône « visage » du modèle HTML de référence */
function LogoFaceIcon({ variant = 'brand' }) {
  const bubble = variant === 'bubble';
  const circleStroke = bubble ? '#ffffff' : '#3a7bbf';
  const smileStroke = bubble ? '#7dd4a8' : '#7dd4a8';
  const eyeFill = bubble ? '#ffffff' : '#3a7bbf';

  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke={circleStroke} strokeWidth="2" />
      <path
        d="M8 13.5c1 1.5 2.5 2 4 2s3-0.5 4-2"
        stroke={smileStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="9" cy="10" r="1.2" fill={eyeFill} />
      <circle cx="15" cy="10" r="1.2" fill={eyeFill} />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="KF-Wrapper">
      <footer className="KF-Foot">
        <div className="KF-TopWrap">
          <div className="KF-Top">
            <div className="KF-Brand">
              <div className="KF-LogoRow">
                <div className="KF-LogoIcon KF-LogoIcon--brand">
                  <LogoFaceIcon variant="brand" />
                </div>
                <div className="KF-LogoText">
                  kap<span>avenir</span>
                </div>
              </div>
              <p className="KF-Desc">
                Préparer son départ à la retraite est loin d&apos;être une simple formalité,
                c&apos;est se préparer à vivre un nouveau chapitre de sa vie.
                <br />
                <br />
                Chez <strong>Kap Avenir</strong>, nous savons à quel point chaque trimestre compte.
                C&apos;est pourquoi nous vous aidons à sécuriser votre dossier retraite pour éviter
                toute mauvaise surprise et garantir les revenus pour lesquels vous avez durement
                travaillé.
              </p>
            </div>

            <div className="KF-Links">
              <div className="KF-ColTitle">Liens rapides</div>
              <ul>
                <li>
                  <Link to="/services">Nos solutions</Link>
                </li>
                <li>
                  <Link to="/pour-qui/particuliers">Salariés</Link>
                </li>
                <li>
                  <Link to="/pour-qui/entreprises-rh">Dirigeants</Link>
                </li>
                <li>
                  <Link to="/pour-qui/organismes">Expats</Link>
                </li>
              </ul>
            </div>

            <div className="KF-Contact">
              <div className="KF-ColTitle">Contact</div>
              <p>
                <a href="mailto:contact@kapavenir.fr">contact@kapavenir.fr</a>
              </p>
              <p>
                <a href="tel:+33139300000">01 39 30 00 00</a>
              </p>
              <p>
                12 Av. des Prés, 78180
                <br />
                Montigny-le-Bretonneux
              </p>
            </div>

            <div className="KF-PhotoCard">
              <img
                src={femmeImg}
                alt="Conseillère KapAvenir"
                className="KF-Photo"
                draggable={false}
              />
              <div className="KF-Bubble">
                <div className="KF-BubbleLogoRow">
                  <div className="KF-LogoIcon KF-LogoIcon--bubble">
                    <LogoFaceIcon variant="bubble" />
                  </div>
                  <div className="KF-BubbleLogoText">
                    kap<span>avenir</span>
                  </div>
                </div>
                <p className="KF-BubbleTagline">
                  La retraite
                  <br />
                  en toute sérénité !
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="KF-Bottom">
          <div className="KF-BottomInner">
            <span className="KF-Copyright">
              KapAvenir © {year}. Tous droits réservés. Conception :{' '}
              <a
                href="https://www.anglophile.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="KF-ConceptionLink"
              >
                www.anglophile.fr
              </a>
            </span>
            <nav className="KF-Legal" aria-label="Liens légaux">
              <Link to="/mentions" className="KF-LegalLink">
                Mentions légales
              </Link>
              <Link to="/rgpd" className="KF-LegalLink">
                RGPD
              </Link>
              <Link to="/cgv" className="KF-LegalLink">
                CGV/CGU
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
