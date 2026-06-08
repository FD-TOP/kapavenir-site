import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  BookOpen,
  Briefcase,
  HeartHandshake,
  LineChart,
  Scale,
  ShieldCheck,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import LogoSticker from '../../components/Common/LogoSticker';
import AnimatedBG from '../../components/Common/AnimatedBG';
import Testimonials from '../Home/Testimonials';
import salut from '../../assets/salut.jpg';
import couple5 from '../../assets/couple5.jpg';
import couple10 from '../../assets/couple10.jpg';
import couple77 from '../../assets/couple77.jpg';
import couple88 from '../../assets/couple88.jpg';
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
    icon: BookOpen,
  },
  {
    title: 'Accompagnement humain',
    text: 'Un interlocuteur dédié, à votre écoute.',
    icon: HeartHandshake,
  },
  {
    title: 'Performance',
    text: 'Chaque recommandation vise à améliorer concrètement votre retraite.',
    icon: TrendingUp,
  },
  {
    title: 'Transparence',
    text: 'Des conseils clairs, honnêtes et sans surprise.',
    icon: ShieldCheck,
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
  const expRef = useRef(null);
  const [engRevealed, setEngRevealed] = useState(false);
  const [expRevealed, setExpRevealed] = useState(false);
  const [activeEng, setActiveEng] = useState(0);
  const [activeExp, setActiveExp] = useState(0);

  const currentEng = engagements[activeEng];
  const CurrentEngIcon = currentEng.icon;

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
    const node = expRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExpRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEng((prev) => (prev + 1) % engagements.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveExp((prev) => (prev + 1) % expertisePoints.length);
    }, 3200);
    return () => clearInterval(timer);
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
            <h1>
              Une <span className="ap-hero-grad">expertise</span> au service de votre{' '}
              <span className="ap-hero-grad">sérénité</span>
            </h1>
            <p className="ap-hero-lead">
              KapAvenir est né d’une conviction simple : chacun mérite de comprendre et d’optimiser sa retraite, sans
              complexité ni stress.
            </p>

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
              <h2>Notre mission</h2>
              <p>
                Vous aider à prendre les bonnes décisions au bon moment, en vous donnant une vision claire de votre
                retraite et en vous accompagnant à chaque étape.
              </p>
            </div>
            <div className="ap-mission-media">
              <div className="ap-hero-frame">
                <img src={couple5} alt="Mission KapAvenir" />
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
              <img src={couple77} alt="Accompagnement humain KapAvenir" />
            </figure>

            <div className="ap-eng-content">
              <h2>Nos engagements</h2>
              <p className="ap-eng-lead">
                Quatre principes qui guident chaque accompagnement et chaque conseil que nous vous apportons.
              </p>

              <div className="ap-eng-switcher" role="tablist" aria-label="Nos engagements">
                {engagements.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      role="tab"
                      aria-selected={activeEng === index}
                      className={`ap-eng-tab ${activeEng === index ? 'is-active' : ''}`}
                      onClick={() => setActiveEng(index)}
                    >
                      <span className="ap-eng-tab-num">{String(index + 1).padStart(2, '0')}</span>
                      <Icon size={16} strokeWidth={2.2} aria-hidden />
                      <span className="ap-eng-tab-label">{item.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="ap-eng-rail" aria-hidden>
                <span
                  className="ap-eng-rail-fill"
                  style={{ width: `${((activeEng + 1) / engagements.length) * 100}%` }}
                />
              </div>

              <article className="ap-eng-detail" key={activeEng} role="tabpanel">
                <span className="ap-eng-detail-icon" aria-hidden>
                  <CurrentEngIcon size={22} strokeWidth={2.2} />
                </span>
                <div className="ap-eng-detail-copy">
                  <h3>{currentEng.title}</h3>
                  <p>{currentEng.text}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="expertise"
          ref={expRef}
          className={`ap-panel ap-panel--expertise ${expRevealed ? 'is-revealed' : ''}`}
          aria-labelledby="ap-exp-title"
        >
          <div className="ap-exp-layout">
            <div className="ap-exp-copy">
              <h2 id="ap-exp-title">
                Une expertise <span className="kap-grad">solide</span>
              </h2>
              <p className="ap-exp-lead">
                Une équipe spécialisée pour décrypter votre situation, sécuriser vos droits et optimiser chaque étape de
                votre parcours retraite.
              </p>

              <div className="ap-exp-rail" aria-hidden>
                <span
                  className="ap-exp-rail-fill"
                  style={{ width: `${((activeExp + 1) / expertisePoints.length) * 100}%` }}
                />
              </div>

              <ul className="ap-exp-grid">
                {expertisePoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <li key={point.text}>
                      <button
                        type="button"
                        className={`ap-exp-card ${activeExp === index ? 'is-active' : ''}`}
                        aria-pressed={activeExp === index}
                        onClick={() => setActiveExp(index)}
                        style={{ '--i': index }}
                      >
                        <span className="ap-exp-card-icon" aria-hidden>
                          <Icon size={20} strokeWidth={2.2} />
                        </span>
                        <span className="ap-exp-card-text">{point.text}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <figure className="ap-exp-media">
              <img src={couple88} alt="Expertise KapAvenir en accompagnement retraite" />
            </figure>
          </div>
        </section>
      </div>

      <section id="credibilite" className="ap-panel ap-panel--cred">
        <Testimonials />
      </section>
    </div>
  );
}
