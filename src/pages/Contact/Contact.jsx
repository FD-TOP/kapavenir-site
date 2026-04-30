import React, { useState } from 'react';
import { Mail, Phone, CalendarCheck2, ArrowRight, CheckCircle2 } from 'lucide-react';
import LogoSticker from '../../components/Common/LogoSticker';
import './Contact.css';

const contactModes = [
  {
    id: 'rdv',
    icon: CalendarCheck2,
    title: 'Prendre un rendez-vous',
    text: 'Selectionnez une date et un creneau pour un entretien diagnostic personnalise.',
  },
  {
    id: 'form',
    icon: Mail,
    title: 'Etre rappele',
    text: 'Completez le formulaire de contact et nous vous rappelons rapidement.',
  },
  {
    id: 'call',
    icon: Phone,
    title: 'Appeler un conseiller',
    text: 'Parlez directement a notre equipe pendant les horaires d ouverture.',
  },
];

export default function Contact() {
  const [activeMode, setActiveMode] = useState('rdv');

  return (
    <main className="ct-page">
      <LogoSticker size={92} top="126px" right="2.6%" rotation={12} opacity={0.14} animation="wobble" hideMobile />
      <LogoSticker size={72} bottom="9%" left="2%" rotation={-18} opacity={0.1} animation="float" hideMobile />

      <section className="ct-hero">
        <p className="ct-kicker">Contact KapAvenir</p>
        <h1>Choisissez votre mode de contact</h1>
        <p>Retrouvez les 3 possibilites de contact dans un parcours simple, clair et rapide.</p>
      </section>

      <section className="ct-options">
        {contactModes.map((option) => {
          const Icon = option.icon;
          const isActive = activeMode === option.id;
          return (
            <button
              type="button"
              key={option.title}
              className={`ct-option-card ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveMode(option.id)}
            >
              <div className="ct-option-icon">
                <Icon size={20} />
              </div>
              <p className="ct-option-step">Option</p>
              <h2>{option.title}</h2>
              <p>{option.text}</p>
            </button>
          );
        })}
      </section>

      <section className="ct-panel">
        {activeMode === 'rdv' && (
          <div className="ct-rdv">
            <div className="ct-rdv-left">
              <p className="ct-mini">RDV Decouverte - Diagnostic</p>
              <h2>Entretien diagnostic pour devis personnalise</h2>
              <ul>
                <li><CheckCircle2 size={16} /> Duree : 15 minutes</li>
                <li><CheckCircle2 size={16} /> Appel telephonique ou visio</li>
                <li><CheckCircle2 size={16} /> Conseils personnalises</li>
              </ul>
            </div>
            <form className="ct-rdv-form">
              <h3>Selectionnez la date et l heure</h3>
              <label>
                Date souhaitee
                <input type="date" />
              </label>
              <label>
                Creneau
                <select defaultValue="">
                  <option value="" disabled>Choisir un creneau</option>
                  <option>09:00 - 09:30</option>
                  <option>10:30 - 11:00</option>
                  <option>14:00 - 14:30</option>
                  <option>16:30 - 17:00</option>
                </select>
              </label>
              <button type="button" className="ct-option-btn">
                Confirmer le rendez-vous <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}

        {activeMode === 'form' && (
          <form className="ct-contact-form">
            <h2>Completez ce formulaire de contact pour etre rappele</h2>
            <div className="ct-form-grid">
              <input type="text" placeholder="Nom*" />
              <input type="text" placeholder="Prenom*" />
              <input type="email" placeholder="E-mail*" />
              <input type="tel" placeholder="Telephone*" />
            </div>
            <select defaultValue="">
              <option value="" disabled>Vous nous avez connu via*</option>
              <option>Recommandation</option>
              <option>LinkedIn</option>
              <option>Recherche Google</option>
              <option>Autre</option>
            </select>
            <textarea rows={5} placeholder="Votre message (facultatif)" />
            <button type="button" className="ct-option-btn">
              Envoyer ma demande <ArrowRight size={16} />
            </button>
          </form>
        )}

        {activeMode === 'call' && (
          <div className="ct-call-box">
            <div className="ct-call-icon"><Phone size={28} /></div>
            <h2>Contactez nos conseillers</h2>
            <p>Horaires : 9h - 17h30</p>
            <a href="tel:+33139300000" className="ct-phone-btn">
              <Phone size={16} />
              01 39 30 00 00
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
