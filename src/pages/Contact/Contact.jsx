import React, { useState } from 'react';
import { Mail, Phone, CalendarCheck2, ArrowRight, CheckCircle2 } from 'lucide-react';
import LogoSticker from '../../components/Common/LogoSticker';
import ContactCalendly from './ContactCalendly';
import './Contact.css';

const contactModes = [
  {
    id: 'rdv',
    icon: CalendarCheck2,
    title: 'Prendre un rendez-vous',
    text: 'Sélectionnez une date et un créneau pour un entretien diagnostic personnalisé.',
  },
  {
    id: 'form',
    icon: Mail,
    title: 'Formulaire de contact',
    text: 'Complétez le formulaire de contact et nous vous recontacterons rapidement.',
  },
  {
    id: 'call',
    icon: Phone,
    title: 'Contactez nos conseillers directement',
    text: 'Échangez directement avec notre équipe pendant les horaires d’ouverture.',
  },
];

export default function Contact() {
  const [activeMode, setActiveMode] = useState('rdv');

  return (
    <div className="ct-page">
      <LogoSticker size={92} top="126px" right="2.6%" rotation={12} opacity={0.14} animation="wobble" hideMobile />
      <LogoSticker size={72} bottom="9%" left="2%" rotation={-18} opacity={0.1} animation="float" hideMobile />

      <section className="ct-hero">
        <div className="ct-hero-card">
          <p className="ct-kicker">Contact KapAvenir</p>
          <h1>
            Choisissez votre <span className="ct-grad">mode de contact</span>
          </h1>
          <p>Retrouvez les 3 possibilités de contact dans un parcours simple, clair et rapide.</p>
          <div className="ct-hero-badges">
            <span>Reponse rapide</span>
            <span>Accompagnement humain</span>
            <span>Parcours simplifie</span>
          </div>
        </div>
      </section>

      <section className="ct-options" aria-label="Modes de contact">
        {contactModes.map((option) => {
          const Icon = option.icon;
          const isActive = activeMode === option.id;
          return (
            <button
              type="button"
              key={option.title}
              className={`ct-option-card ${isActive ? 'is-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => setActiveMode(option.id)}
            >
              <div className="ct-option-icon">
                <Icon size={20} />
              </div>
              <span className="ct-option-number">{option.id === 'rdv' ? '01' : option.id === 'form' ? '02' : '03'}</span>
              <h2>{option.title}</h2>
              <p>{option.text}</p>
            </button>
          );
        })}
      </section>

      <section className="ct-panel">
        <div className="ct-panel-topline" />
        {activeMode === 'rdv' && (
          <div className="ct-rdv">
            <div className="ct-rdv-left">
              <p className="ct-mini">RDV découverte — diagnostic</p>
              <h2>Entretien diagnostic pour devis personnalisé</h2>
              <ul>
                <li>
                  <CheckCircle2 size={16} /> Durée : 15 minutes
                </li>
                <li>
                  <CheckCircle2 size={16} /> Appel téléphonique ou visioconférence
                </li>
                <li>
                  <CheckCircle2 size={16} /> Conseils personnalisés
                </li>
              </ul>
            </div>
            <div className="ct-rdv-calendly">
              <h3 className="ct-calendly-heading">Choisissez votre créneau</h3>
              <ContactCalendly active={activeMode === 'rdv'} />
            </div>
          </div>
        )}

        {activeMode === 'form' && (
          <form
            className="ct-contact-form"
            noValidate
            aria-labelledby="ct-form-title"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 id="ct-form-title">Complétez ce formulaire de contact pour être rappelé</h2>
            <div className="ct-form-grid">
              <div className="ct-field">
                <label htmlFor="ct-nom">Nom</label>
                <input id="ct-nom" name="nom" type="text" autoComplete="family-name" required />
              </div>
              <div className="ct-field">
                <label htmlFor="ct-prenom">Prénom</label>
                <input id="ct-prenom" name="prenom" type="text" autoComplete="given-name" required />
              </div>
              <div className="ct-field">
                <label htmlFor="ct-email">E-mail</label>
                <input id="ct-email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="ct-field">
                <label htmlFor="ct-tel">Téléphone</label>
                <input id="ct-tel" name="telephone" type="tel" autoComplete="tel" required />
              </div>
            </div>
            <div className="ct-field">
              <label htmlFor="ct-source">Vous nous avez connu via</label>
              <select id="ct-source" name="source" defaultValue="" required>
                <option value="" disabled>
                  Choisir une option
                </option>
                <option value="recommandation">Recommandation</option>
                <option value="linkedin">LinkedIn</option>
                <option value="google">Recherche Google</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div className="ct-field">
              <label htmlFor="ct-message">Votre message</label>
              <textarea id="ct-message" name="message" rows={5} required />
            </div>
            <button type="submit" className="ct-option-btn">
              Envoyer ma demande <ArrowRight size={16} aria-hidden />
            </button>
          </form>
        )}

        {activeMode === 'call' && (
          <div className="ct-call-box">
            <div className="ct-call-icon"><Phone size={28} /></div>
            <h2>Contactez nos conseillers directement</h2>
            <p>Échangez directement avec notre équipe pendant les horaires d’ouverture.</p>
            <p className="ct-call-hours">Horaires : 9h – 17h30</p>
            <a href="tel:+33139300000" className="ct-phone-btn">
              <Phone size={16} />
              01 39 30 00 00
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
