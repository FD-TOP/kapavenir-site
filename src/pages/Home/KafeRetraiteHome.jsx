import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, MessageCircle, UserCheck, Rocket } from 'lucide-react';
import LogoSticker from '../../components/Common/LogoSticker';
import './KafeRetraiteHome.css';

const highlights = [
  {
    icon: <BookOpen size={28} />,
    title: 'Comprendre leur situation retraite',
    desc: 'Obtenez une vision claire et complète de vos droits acquis et de votre future pension.',
  },
  {
    icon: <MessageCircle size={28} />,
    title: 'Poser leurs questions librement',
    desc: 'Un cadre bienveillant pour échanger sans tabou sur tous les aspects de votre retraite.',
  },
  {
    icon: <UserCheck size={28} />,
    title: 'Être accompagnés de manière personnalisée',
    desc: 'Un suivi adapté à votre profil, votre carrière et vos objectifs de vie.',
  },
  {
    icon: <Rocket size={28} />,
    title: 'Passer à l\'action',
    desc: 'Bilan, optimisation, stratégie — transformez la compréhension en décisions concrètes.',
  },
];

export default function KafeRetraiteHome() {
  const navigate = useNavigate();

  return (
    <section className="KH-wrap">
      <LogoSticker size={86} top="8%" right="2%" rotation={14} opacity={0.13} animation="wobble" hideMobile />
      <LogoSticker size={62} bottom="10%" left="2%" rotation={-20} opacity={0.1} animation="float" hideMobile />

      <div className="KH-inner">
        {/* ── En-tête centré ── */}
        <header className="KH-header">
          <p className="KH-kicker">Kafé Retraite</p>
          <h2 className="KH-title">
            Le Kafé Retraite est un format d'accompagnement{' '}
            <span className="KH-gradient">humain et accessible</span>{' '}
            qui permet de mieux comprendre la retraite dans un cadre convivial.
          </h2>
          <p className="KH-subtitle">
            KapAvenir propose des rencontres (physiques ou digitales) où les participants peuvent :
          </p>
        </header>

        {/* ── Grille 4 cartes ── */}
        <div className="KH-grid">
          {highlights.map((item, idx) => (
            <article key={idx} className="KH-card">
              <div className="KH-icon-box">{item.icon}</div>
              <h3 className="KH-card-title">{item.title}</h3>
              <p className="KH-card-desc">{item.desc}</p>
            </article>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="KH-cta-wrap">
          <button className="KH-btn" onClick={() => navigate('/kafe-retraite')}>
            En savoir plus <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
