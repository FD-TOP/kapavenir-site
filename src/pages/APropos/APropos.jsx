import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoSticker from '../../components/Common/LogoSticker';
import Testimonials from '../Home/Testimonials';
import salut from '../../assets/salut.jpg';
import couple5 from '../../assets/couple5.jpg';
import './APropos.css';

const sectionByPath = {
  '/histoire': 'histoire',
  '/mission': 'mission',
  '/expertise': 'expertise',
  '/engagements': 'credibilite',
};

const expertisePoints = [
  'Connaissance des régimes de retraite (base + complémentaires)',
  'Analyse de carrières complexes (salariés, indépendants, expatriés)',
  'Maîtrise des dispositifs d’optimisation',
  'Accompagnement de nombreux clients dans leur départ',
];

export default function APropos() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const id = sectionByPath[pathname];
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 70);
  }, [pathname]);

  return (
    <main className="ap-page">
      <LogoSticker size={98} top="120px" right="2.5%" rotation={14} opacity={0.14} animation="wobble" hideMobile />
      <LogoSticker size={70} bottom="7%" left="2%" rotation={-18} opacity={0.1} animation="float" hideMobile />

      <section className="ap-hero">
        <div className="ap-hero-text">
          <span className="ap-kicker">À propos</span>
          <h1>Une expertise au service de votre sérénité</h1>
          <p>
            KapAvenir est né d’une conviction simple : chacun mérite de comprendre et d’optimiser sa
            retraite, sans complexité ni stress.
          </p>
        </div>
        <div className="ap-hero-media">
          <img src={salut} alt="Équipe KapAvenir" />
        </div>
      </section>

      <section id="histoire" className="ap-section ap-story">
        <h2>Notre histoire</h2>
        <div className="ap-story-grid">
          <article className="ap-story-card">
            <p>
              De nombreuses personnes abordent la retraite avec incertitude, faute d’informations claires et accessibles.
            </p>
          </article>
          <article className="ap-story-card">
            <p>
              Relevés difficiles à lire, erreurs non détectées, décisions prises sans visibilité… autant de facteurs qui
              peuvent impacter les revenus futurs.
            </p>
          </article>
          <article className="ap-story-card">
            <p>
              Avec des parcours professionnels de plus en plus variés, incluant carrières mixtes, périodes à l’étranger et
              statuts multiples, être accompagné devient essentiel pour y voir clair.
            </p>
          </article>
        </div>
        <p className="ap-story-final">
          KapAvenir est né de cette réalité pour simplifier la retraite, la rendre compréhensible et aider chacun à
          faire les bons choix au bon moment.
        </p>
      </section>

      <section id="mission" className="ap-section ap-mission">
        <div className="ap-mission-grid">
          <div>
            <h2>Notre mission</h2>
            <p>
              Vous aider à prendre les bonnes décisions au bon moment, en vous donnant une vision claire de votre
              retraite et en vous accompagnant à chaque étape.
            </p>
          </div>
          <img src={couple5} alt="Mission KapAvenir" />
        </div>
      </section>

      <section id="expertise" className="ap-section ap-expertise">
        <h2>Une expertise solide</h2>
        <div className="ap-exp-grid">
          {expertisePoints.map((point, i) => (
            <article key={point} className="ap-exp-card" style={{ '--d': `${i * 120}ms` }}>
              {point}
            </article>
          ))}
        </div>
      </section>

      <section id="credibilite" className="ap-section ap-cred">
        <Testimonials />
      </section>

      <section className="ap-section ap-cta">
        <h2>Et si on faisait le point sur votre retraite ?</h2>
        <p>Un simple échange peut vous apporter clarté, sérénité et opportunités d’optimisation.</p>
        <div className="ap-cta-row">
          <button onClick={() => navigate('/services/bilan')}>Faire mon bilan retraite</button>
          <button className="is-outline" onClick={() => navigate('/contact')}>Contactez-nous</button>
        </div>
      </section>
    </main>
  );
}
