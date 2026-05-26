import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone, Shield } from 'lucide-react';
import './Footer.css';
import '../Navbar/Navbar.css';

import logoImg from '../../assets/logo.png';
import logoTag from '../../assets/logo-tag.png';
import advisorImg from '../../assets/8450589.png';

const NAV = [
  {
    title: 'Nos services',
    links: [
      { label: 'Bilan retraite', to: '/services/bilan' },
      { label: 'Aide au départ', to: '/services/aide-depart' },
      { label: 'Toutes nos solutions', to: '/services' },
    ],
  },
  {
    title: 'Pour qui ?',
    links: [
      { label: 'Particuliers', to: '/pour-qui/particuliers' },
      { label: 'Organismes & assurances', to: '/pour-qui/organismes' },
      { label: 'Entreprises & RH', to: '/pour-qui/entreprises-rh' },
    ],
  },
  {
    title: 'KapAvenir',
    links: [
      { label: 'Comment ça marche', to: '/etapes' },
      { label: 'Kafé retraite', to: '/kafe-retraite' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

const TRUST = [
  { icon: Shield, text: 'Expertise retraite certifiée' },
  { icon: Mail, text: 'Réponse sous 48 h' },
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

            <p className="FT-Tagline">
              La retraite, <span className="FT-Grad">enfin lisible</span> et sereine.
            </p>

            <p className="FT-Pitch">
              KapAvenir accompagne particuliers, entreprises et organismes pour sécuriser les droits,
              optimiser les pensions et préparer chaque départ en toute confiance.
            </p>

            <div className="FT-Trust">
              {TRUST.map(({ icon: Icon, text }) => (
                <span key={text} className="FT-TrustItem">
                  <Icon size={15} strokeWidth={2.2} aria-hidden />
                  {text}
                </span>
              ))}
            </div>

            <Link to="/contact" className="FT-CTA">
              Prendre rendez-vous
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
            </Link>
          </div>

          <nav className="FT-Nav" aria-label="Navigation du pied de page">
            {NAV.map((col) => (
              <div key={col.title} className="FT-NavCol">
                <h3 className="FT-NavTitle">{col.title}</h3>
                <ul className="FT-NavList">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="FT-NavLink">
                        <span className="FT-NavLinkText">{link.label}</span>
                        <ArrowRight size={14} className="FT-NavLinkArrow" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

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

        <div className="FT-ContactStrip">
          <a href="mailto:contact@kapavenir.fr" className="FT-ContactItem">
            <Mail size={16} strokeWidth={2} aria-hidden />
            contact@kapavenir.fr
          </a>
          <a href="tel:+33139300000" className="FT-ContactItem">
            <Phone size={16} strokeWidth={2} aria-hidden />
            01 39 30 00 00
          </a>
          <span className="FT-ContactItem FT-ContactItem--addr">
            <MapPin size={16} strokeWidth={2} aria-hidden />
            12 Av. des Prés, 78180 Montigny-le-Bretonneux
          </span>
        </div>
      </div>

      <div className="FT-Bar">
        <div className="FT-BarInner">
          <p className="FT-Copy">
            © {year} KapAvenir. Tous droits réservés.
            <span className="FT-CopySep">·</span>
            Conception{' '}
            <a href="https://www.anglophile.fr" target="_blank" rel="noopener noreferrer">
              anglophile.fr
            </a>
          </p>
          <nav className="FT-Legal" aria-label="Informations légales">
            <Link to="/mentions">Mentions légales</Link>
            <Link to="/rgpd">RGPD</Link>
            <Link to="/cgv">CGV / CGU</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
