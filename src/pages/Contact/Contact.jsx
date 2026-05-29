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
    text: 'Réservez en ligne votre entretien diagnostic (15 min) via notre agenda Calendly.',
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
    <main className="ct-page">
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
              <ContactCalendly />
            </div>
          </div>
        )}

        {activeMode === 'form' && (
          <form className="ct-contact-form">
            <h2>Formulaire de contact</h2>
            <p className="ct-form-lead">
              Complétez le formulaire de contact et nous vous recontacterons rapidement.
            </p>
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
    </main>
  );
}
