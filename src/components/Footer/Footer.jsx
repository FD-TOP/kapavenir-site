import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Footer.css';

import logo     from '../../assets/logo.png';
import femmeImg from '../../assets/8450589.png';

export default function Footer() {
  return (
    <footer className="KF-Root">
      <div className="KF-Body">
        <div className="KF-Inner">
          <div className="KF-Grid">
            <div className="KF-ColBio">
              <div className="KF-BioLogo">
                <img src={logo} alt="KapAvenir" />
              </div>
              <p className="KF-Bio">
                Préparer son départ à la retraite est loin d'être une simple
                formalité, c'est se préparer à vivre un nouveau chapitre de sa vie.
              </p>
              <p className="KF-Bio KF-Bio--small">
                Chez Kap Avenir, nous savons à quel point chaque trimestre compte.
                C'est pourquoi nous vous aidons à sécuriser votre dossier retraite pour
                éviter toute mauvaise surprise et garantir les revenus pour lesquels
                vous avez durement travaillé.
              </p>
              <div className="KF-Socials">
                <a href="#" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>

            <div className="KF-MidCluster">
              <div className="KF-Col">
                <h4>Liens rapides</h4>
                <ul>
                  <li><Link to="/services">Nos services</Link></li>
                  <li><Link to="/pour-qui">Pour qui ?</Link></li>
                  <li><Link to="/etapes">Comment ça marche ?</Link></li>
                  <li><Link to="/kafe-retraite">Kafé retraite</Link></li>
                  <li><Link to="/ressources">Ressources</Link></li>
                  <li><Link to="/a-propos">À propos</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>

              <div className="KF-Col">
                <h4>Contact</h4>
                <div className="KF-ContactList">
                  <div className="KF-ContactItem">
                    <span>contact@kapavenir.fr</span>
                  </div>
                  <div className="KF-ContactItem">
                    <span>01 39 30 00 00</span>
                  </div>
                  <div className="KF-ContactItem">
                    <span>12 Av. des Prés, 78180<br />Montigny-le-Bretonneux</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="KF-VisualCol">
              <img
                src={femmeImg}
                alt="Conseillère KapAvenir"
                className="KF-FemmeImg"
                draggable="false"
              />
              <div className="KF-Bulle">
                <div className="KF-BulleLogo">
                  <img src={logo} alt="" />
                </div>
                <p className="KF-BulleText">La retraite en toute sérénité !</p>
              </div>
            </div>
          </div>

          <div className="KF-Copyright">
            <p className="KF-CopyrightText">
              KapAvenir © 2026. Tous droits réservés.{' '}
              <span className="KF-Conception">
                Conception :{' '}
                <a
                  href="https://www.anglophile.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.anglophile.fr
                </a>
              </span>
            </p>
            <nav className="KF-Legal" aria-label="Liens légaux">
              <Link to="/mentions" className="KF-LegalLink">
                <span className="KF-LegalIcon" aria-hidden><ChevronRight size={12} strokeWidth={2.5} /></span>
                Mentions légales
              </Link>
              <Link to="/rgpd" className="KF-LegalLink">
                <span className="KF-LegalIcon" aria-hidden><ChevronRight size={12} strokeWidth={2.5} /></span>
                RGPD
              </Link>
              <Link to="/cgv" className="KF-LegalLink">
                <span className="KF-LegalIcon" aria-hidden><ChevronRight size={12} strokeWidth={2.5} /></span>
                CGV/CGU
              </Link>
            </nav>
          </div>
        </div>

      </div>
    </footer>
  );
}
