import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Briefcase, LineChart, Scale, UserCheck } from 'lucide-react';
import LogoSticker from '../../components/Common/LogoSticker';
import AnimatedBG from '../../components/Common/AnimatedBG';
import Testimonials from '../Home/Testimonials';
import salut from '../../assets/salut.jpg';
import couple5 from '../../assets/couple5.jpg';
import couple10 from '../../assets/couple10.jpg';
import couple9 from '../../assets/couple9.png';
import couple11 from '../../assets/couple11.jpg';
import '../Home/PreFooter.css';
import './APropos.css';

const sectionByPath = {
  '/histoire': 'histoire',
  '/mission': 'mission',
  '/expertise': 'expertise',
  '/engagements': 'engagements',
};

const engagements = [
  {
    title: 'Pédagogie',
    text: 'Vous comprenez réellement votre situation, sans jargon ni complexité inutile.',
  },
  {
    title: 'Accompagnement humain',
    text: 'Un interlocuteur dédié, à votre écoute.',
  },
  {
    title: 'Performance',
    text: 'Chaque recommandation vise à améliorer concrètement votre retraite.',
  },
  {
    title: 'Transparence',
    text: 'Des conseils clairs, honnêtes et sans surprise.',
  },
];

const expertisePoints = [
  {
    icon: Scale,
    text: 'Connaissance des régimes de retraite (base + complémentaires)',
  },
  {
    icon: Briefcase,
    text: 'Analyse de carrières complexes (salariés, indépendants, expatriés)',
  },
  {
    icon: LineChart,
    text: 'Maîtrise des dispositifs d’optimisation',
  },
  {
    icon: UserCheck,
    text: 'Accompagnement de nombreux clients dans leur départ',
  },
];

export default function APropos() {
  const { pathname } = useLocation();
  const engRef = useRef(null);
  const [engRevealed, setEngRevealed] = useState(false);

  useEffect(() => {
    const node = engRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEngRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
    <div className="ap-page">
      <section className="ap-hero">
        <div className="ap-hero-bg" aria-hidden>
          <div className="ap-hero-orb ap-hero-orb--blue" />
          <div className="ap-hero-orb ap-hero-orb--green" />
          <div className="ap-hero-grid" />
        </div>

        <LogoSticker size={98} top="16%" right="5%" rotation={14} opacity={0.14} animation="wobble" hideMobile />
        <LogoSticker size={64} bottom="14%" left="4%" rotation={-20} opacity={0.1} animation="float" hideMobile />

        <div className="ap-hero-inner">
          <div className="ap-hero-text">
            <span className="ap-kicker">À propos de KapAvenir</span>
            <h1>
              Une <span className="ap-hero-grad">expertise</span> au service de votre{' '}
              <span className="ap-hero-grad">sérénité</span>
            </h1>
            <p className="ap-hero-lead">
              KapAvenir est né d’une conviction simple : chacun mérite de comprendre et d’optimiser sa retraite, sans
              complexité ni stress.
            </p>

            <ul className="ap-hero-pills" aria-label="Points forts">
              <li>Accompagnement humain</li>
              <li>Expertise retraite</li>
              <li>Conseils clairs</li>
            </ul>

            <nav className="ap-hero-nav" aria-label="Sections de la page">
              <a href="#histoire">Notre histoire</a>
              <a href="#mission">Mission</a>
              <a href="#engagements">Engagements</a>
              <a href="#expertise">Expertise</a>
            </nav>
          </div>

          <div className="ap-hero-media">
            <div className="ap-hero-frame">
              <img src={salut} alt="Équipe KapAvenir" />
              <div className="ap-hero-frame-deco ap-hero-frame-deco--cyan" aria-hidden />
              <div className="ap-hero-frame-deco ap-hero-frame-deco--green" aria-hidden />
              <span className="ap-hero-float-badge">
                <strong>KapAvenir</strong>
                <span>Votre retraite, notre priorité</span>
              </span>
            </div>
          </div>
        </div>

        <a href="#histoire" className="ap-hero-scroll" aria-label="Découvrir la suite">
          <span className="ap-hero-scroll-dot" />
        </a>
      </section>

      <div className="content-with-bg ap-content-wrap">
        <AnimatedBG />

        <section id="histoire" className="ap-panel ap-panel--story">
          <div className="ap-story-layout">
            <div className="ap-story-content">
              <span className="ap-kicker ap-kicker--dark">Notre parcours</span>
              <h2>Notre histoire</h2>
              <div className="ap-story-body">
                <p>
                  De nombreuses personnes abordent la retraite avec incertitude, faute d’informations claires et
                  accessibles.
                </p>
                <p>
                  Relevés difficiles à lire, erreurs non détectées, décisions prises sans visibilité… autant de facteurs
                  qui peuvent impacter les revenus futurs.
                </p>
                <p>
                  Avec des parcours professionnels de plus en plus variés, incluant carrières mixtes, périodes à
                  l’étranger et statuts multiples, être accompagné devient essentiel pour y voir clair.
                </p>
              </div>
              <p className="ap-story-final">
                KapAvenir est né de cette réalité pour simplifier la retraite, la rendre compréhensible et aider chacun à
                faire les bons choix au bon moment.
              </p>
            </div>
            <figure className="ap-story-media">
              <img src={couple10} alt="Couple préparant sereinement sa retraite avec KapAvenir" />
            </figure>
          </div>
        </section>

        <section id="mission" className="ap-panel ap-panel--mission">
          <div className="ap-mission-grid">
            <div className="ap-mission-copy">
              <span className="ap-kicker ap-kicker--dark">Notre raison d’être</span>
              <h2>Notre mission</h2>
              <p>
                Vous aider à prendre les bonnes décisions au bon moment, en vous donnant une vision claire de votre
                retraite et en vous accompagnant à chaque étape.
              </p>
            </div>
            <div className="ap-mission-media">
              <div className="ap-hero-frame">
                <img src={couple5} alt="Mission KapAvenir" />
                <div className="ap-hero-frame-deco" aria-hidden />
              </div>
            </div>
          </div>
        </section>

        <section
          id="engagements"
          ref={engRef}
          className={`ap-panel ap-panel--engagements ${engRevealed ? 'is-revealed' : ''}`}
        >
          <div className="ap-eng-layout">
            <figure className="ap-eng-media">
              <img src={couple9} alt="Accompagnement humain KapAvenir" />
              <span className="ap-eng-media-label">À vos côtés</span>
            </figure>

            <div className="ap-eng-content">
              <span className="ap-kicker ap-kicker--dark">Nos valeurs</span>
              <h2>Nos engagements</h2>
              <p className="ap-eng-lead">
                Quatre principes qui guident chaque accompagnement et chaque conseil que nous vous apportons.
              </p>

              <ul className="ap-eng-list">
                {engagements.map((item, index) => (
                  <li key={item.title} className="ap-eng-item" style={{ '--i': index }}>
                    <span className="ap-eng-num" aria-hidden>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="ap-eng-item-text">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="credibilite" className="ap-panel ap-panel--cred">
          <Testimonials />
        </section>
      </div>

      <section id="expertise" className="ap-exp-cta F-ethereal-layout" aria-labelledby="ap-exp-title">
        <LogoSticker size={92} top="8%" left="2%" rotation={-14} opacity={0.18} animation="wobble" hideMobile />
        <LogoSticker size={78} bottom="10%" right="2%" rotation={12} opacity={0.14} animation="float" hideMobile />

        <div className="F-bg-image-container">
          <img src={couple11} alt="" className="F-bg-parallax" role="presentation" />
          <div className="F-bg-overlay" />
        </div>

        <div className="F-container ap-exp-container">
          <div className="F-glass-card ap-exp-glass-card">
            <div className="F-card-content">
              <header className="F-header">
                <span className="F-pre-title">Notre savoir-faire</span>
                <h2 id="ap-exp-title" className="F-main-title">
                  Une expertise <span className="F-gradient-text">solide</span>
                </h2>
                <div className="F-separator" />
              </header>

              <p className="F-description ap-exp-description">
                Une équipe spécialisée pour décrypter votre situation, sécuriser vos droits et optimiser chaque étape de
                votre parcours retraite.
              </p>

              <ul className="ap-exp-premium-list">
                {expertisePoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <li key={point.text} className="ap-exp-premium-item">
                      <span className="ap-exp-premium-icon" aria-hidden>
                        <Icon size={18} strokeWidth={2.2} />
                      </span>
                      <span>{point.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="F-card-border-glow" />
          </div>
        </div>
      </section>
    </div>
  );
}
