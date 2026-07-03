import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Coffee, X } from 'lucide-react';
import KapGrad from '../../components/Common/KapGrad';
import './HomeKafeBanner.css';

const STORAGE_KEY = 'kap-home-kafe-banner-dismissed';

export default function HomeKafeBanner() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    setClosing(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, '1');
      setVisible(false);
    }, 320);
  };

  if (!visible) return null;

  return (
    <aside
      className={`HKB-popup${closing ? ' is-closing' : ''}`}
      role="dialog"
      aria-label="Accompagnement digital Kafé retraite"
    >
      <div className="HKB-accent" aria-hidden="true" />

      <div className="HKB-icon" aria-hidden="true">
        <Coffee size={22} strokeWidth={2.2} />
      </div>

      <div className="HKB-body">
        <span className="HKB-badge">Kafé retraite</span>
        <p className="HKB-text">
          Un accompagnement <KapGrad className="HKB-grad">digital gratuit</KapGrad> pour vos démarches
          retraite et services en ligne.
        </p>
      </div>

      <button type="button" className="HKB-cta" onClick={() => navigate('/kafe-retraite')}>
        En savoir plus
        <ArrowRight size={16} aria-hidden="true" />
      </button>

      <button type="button" className="HKB-close" onClick={dismiss} aria-label="Fermer">
        <X size={17} />
      </button>
    </aside>
  );
}
