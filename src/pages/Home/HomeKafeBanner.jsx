import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import './HomeKafeBanner.css';

const STORAGE_KEY = 'kap-home-kafe-banner-dismissed';

export default function HomeKafeBanner() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="HKB-popup" role="dialog" aria-label="Accompagnement digital Kafé retraite">
      <p className="HKB-text">
        Un accompagnement digital gratuit pour vos démarches retraite et services en ligne.
      </p>
      <button type="button" className="HKB-cta" onClick={() => navigate('/kafe-retraite')}>
        En savoir plus
        <ArrowRight size={16} aria-hidden="true" />
      </button>
      <button type="button" className="HKB-close" onClick={dismiss} aria-label="Fermer">
        <X size={18} />
      </button>
    </aside>
  );
}
