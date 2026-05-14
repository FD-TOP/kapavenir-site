import React from 'react';
import { Scale, Sparkles, Fingerprint } from 'lucide-react';
import '../Home/Pillars.css';
import LogoSticker from '../../components/Common/LogoSticker';

const items = [
  {
    id: 1,
    title: 'Expertise',
    desc: 'Une parfaite maîtrise des réglementations complexes des différents régimes de retraite.',
    icon: <Scale size={34} strokeWidth={2} />,
  },
  {
    id: 2,
    title: 'Sérénité',
    desc: 'Nous nous occupons de tout, vous restez concentré sur votre avenir.',
    icon: <Sparkles size={34} strokeWidth={2} />,
  },
  {
    id: 3,
    title: 'Personnalisation',
    desc: 'Chaque client bénéficie d’un service adapté à sa situation unique.',
    icon: <Fingerprint size={34} strokeWidth={2} />,
  },
];

export default function ServicesWhy() {
  return (
    <section className="pil-section">
      <LogoSticker size={78} top="6%" right="4%" rotation={14} opacity={0.14} animation="float" hideMobile />
      <LogoSticker size={56} bottom="10%" left="3%" rotation={-16} opacity={0.11} animation="wobble" hideMobile />

      <div className="pil-container">
        <header className="pil-header">
          <h2 className="pil-title">
            Pourquoi nous <span className="pil-gradient">choisir</span> ?
          </h2>
          <p className="pil-subtitle">
            Trois raisons de confier votre dossier retraite à KapAvenir : expertise pointue,
            tranquillité d’esprit et accompagnement sur mesure.
          </p>
        </header>

        <div className="pil-grid">
          {items.map((item, idx) => (
            <div key={item.id} className={`pil-item pil-item--${idx + 1}`}>
              <div className="pil-icon-wrap" aria-hidden>
                {item.icon}
              </div>
              <div className="pil-text">
                <h3>{item.title} :</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
