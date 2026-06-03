import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import '../Navbar/Navbar.css';

import logoImg from '../../assets/logo.png';
import logoTag from '../../assets/logo-tag.png';
import advisorImg from '../../assets/8450589.png';

const NAV = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Pour qui', to: '/pour-qui' },
  { label: 'Comment ça marche ?', to: '/etapes' },
  { label: 'Kafé retraite', to: '/kafe-retraite' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="FT" aria-label="Pied de page KapAvenir">
      <div className="FT-Mesh" aria-hidden="true">
        <span className="FT-Orb FT-Orb--1" />
        <span className="FT-Orb FT-Orb--2" />
        <span className="FT-Orb FT-Orb--3" />
        <span className="FT-GridLines" />
      </div>

      <div className="FT-Inner">
        <div className="FT-Grid">
          <div className="FT-BrandPanel">
            <Link to="/" className="nav-logo FT-BrandLogo" aria-label="KapAvenir — Accueil">
              <img src={logoImg} alt="KapAvenir" className="nav-logo-img" draggable={false} />
            </Link>

            <p className="FT-Pitch">
              Préparer son départ à la retraite est loin d&apos;être une simple formalité, c&apos;est se
              préparer à vivre un nouveau chapitre de sa vie.
            </p>

            <p className="FT-Pitch">
              Chez <strong>KapAvenir</strong>, nous savons à quel point chaque trimestre compte. C&apos;est
              pourquoi nous vous aidons à sécuriser votre dossier retraite pour éviter toute mauvaise
              surprise et garantir les revenus pour lesquels vous avez durement travaillé.
            </p>
          </div>

          <nav className="FT-Nav" aria-label="Liens rapides du pied de page">
            <h3 className="FT-SectionTitle">Liens rapides</h3>
            <ul className="FT-NavList">
              {NAV.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="FT-NavLink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="FT-ContactCol" aria-label="Coordonnées KapAvenir">
            <h3 className="FT-SectionTitle">Contact</h3>
            <ul className="FT-ContactList">
              <li>
                <a href="mailto:contact@kapavenir.fr" className="FT-ContactLink">
                  contact@kapavenir.fr
                </a>
              </li>
              <li>
                <a href="tel:+33139300000" className="FT-ContactLink">
                  01 39 30 00 00
                </a>
              </li>
              <li>
                <span className="FT-ContactLink FT-ContactLink--addr">
                  12 Av. des Prés, 78180 Montigny-le-Bretonneux
                </span>
              </li>
            </ul>
          </div>

          <div className="FT-Visual">
            <div className="FT-VisualBody">
              <img
                src={advisorImg}
                alt="Votre conseillère KapAvenir"
                className="FT-Advisor"
                draggable={false}
              />
              <div className="FT-AdvisorCard">
                <img src={logoTag} alt="" className="FT-AdvisorLogo" aria-hidden />
                <p className="FT-AdvisorQuote">
                  « Chaque trimestre compte — nous veillons sur les vôtres. »
                </p>
                <span className="FT-AdvisorRole">Équipe KapAvenir</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="FT-Bar">
        <div className="FT-BarInner">
          <p className="FT-Copy">
            © {year} KapAvenir. Tous droits réservés.
          </p>
          <nav className="FT-Legal" aria-label="Informations légales">
            <Link to="/accessibilite">Accessibilité</Link>
            <Link to="/mentions">Mentions légales</Link>
            <Link to="/rgpd">RGPD</Link>
            <Link to="/cgv">CGV / CGU</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
