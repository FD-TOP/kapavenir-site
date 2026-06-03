import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, MessageCircle, UserCheck, Laptop, Rocket } from 'lucide-react';
import LogoSticker from '../../components/Common/LogoSticker';
import KapGrad from '../../components/Common/KapGrad';
import './KafeRetraiteHome.css';

const highlights = [
  {
    icon: <BookOpen size={28} />,
    title: 'Comprendre sa situation retraite',
    desc: 'Obtenez une vision claire et complète de vos droits acquis et de votre future pension.',
  },
  {
    icon: <MessageCircle size={28} />,
    title: 'Poser librement ses questions',
    desc: 'Un cadre bienveillant pour échanger sans tabou sur tous les aspects de votre retraite.',
  },
  {
    icon: <UserCheck size={28} />,
    title: 'Bénéficier d\'un accompagnement personnalisé',
    desc: 'Un suivi adapté à votre profil, votre carrière et vos objectifs de vie.',
  },
  {
    icon: <Laptop size={28} />,
    title: 'Bénéficier d\'une aide digitale',
    desc: 'Un accompagnement simple pour réaliser vos démarches retraite en ligne, même sans maîtrise de l\'informatique.',
  },
  {
    icon: <Rocket size={28} />,
    title: 'Passer à l\'action',
    desc: 'Bilan, optimisation, stratégie, transformez la compréhension en décisions concrètes.',
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
          <h2 className="KH-title">
            Le Kafé Retraite est un format{' '}
            <KapGrad className="KH-gradient">d&apos;accompagnement</KapGrad>{' '}
            <KapGrad className="KH-gradient">humain et accessible</KapGrad>
            <br />
            qui permet de <KapGrad className="KH-gradient">mieux comprendre</KapGrad> la&nbsp;retraite
            <br />
            dans un cadre convivial.
          </h2>
          <p className="KH-subtitle">
            KapAvenir propose des rencontres (physiques ou digitales) où les participants peuvent&nbsp;:
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
