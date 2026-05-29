import { useEffect } from 'react';

/** URL de la page Calendly (ex. https://calendly.com/kapavenir/entretien-diagnostic) */
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || '';

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';

export default function ContactCalendly() {
  useEffect(() => {
    if (!CALENDLY_URL) return undefined;

    const existing = document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`);
    if (existing) return undefined;

    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  if (!CALENDLY_URL) {
    return (
      <div className="ct-calendly-placeholder">
        <p className="ct-calendly-placeholder-title">Agenda en ligne (Calendly)</p>
        <p>
          Réservez votre entretien diagnostic de 15 minutes (appel ou visio) via notre agenda Calendly. Ajoutez
          l’URL dans le fichier <strong>.env</strong> :
        </p>
        <code className="ct-calendly-code">VITE_CALENDLY_URL=https://calendly.com/votre-compte/entretien</code>
      </div>
    );
  }

  return (
    <div
      className="calendly-inline-widget ct-calendly-embed"
      data-url={CALENDLY_URL}
      style={{ minWidth: '100%', height: '680px' }}
      title="Réserver un entretien diagnostic via Calendly"
    />
  );
}
