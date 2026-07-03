import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import './HomeKafeBanner.css';

const STORAGE_KEY = 'kap-home-kafe-banner-v2';

export default function HomeKafeBanner() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(STORAGE_KEY)) return undefined;
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const goAideDigitale = () => {
    navigate('/kafe-retraite#aide-digitale');
    setTimeout(() => {
      document.getElementById('aide-digitale')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  };

  const dismiss = () => {
    setClosing(true);
    setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setVisible(false);
    }, 320);
  };

  if (!mounted || !visible) return null;

  return createPortal(
    <aside
      className={`HKB-popup${closing ? ' is-closing' : ''}`}
      role="dialog"
      aria-label="Accompagnement digital Kafé retraite"
    >
      <p className="HKB-text">
        Un accompagnement digital gratuit pour vos démarches retraite et services en ligne.
      </p>
      <button type="button" className="HKB-cta" onClick={goAideDigitale}>
        En savoir plus
        <ArrowRight size={16} aria-hidden="true" />
      </button>
      <button type="button" className="HKB-close" onClick={dismiss} aria-label="Fermer">
        <X size={17} />
      </button>
    </aside>,
    document.body
  );
}
