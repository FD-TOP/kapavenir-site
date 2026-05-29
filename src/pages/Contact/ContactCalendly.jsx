import { InlineWidget } from 'react-calendly';
import {
  CALENDLY_EVENT_URL,
  CALENDLY_PAGE_SETTINGS,
  CALENDLY_UTM,
} from '../../config/calendly';

export default function ContactCalendly({ active = true }) {
  if (!CALENDLY_EVENT_URL) {
    return (
      <div className="ct-calendly-missing" role="status">
        <p className="ct-calendly-missing-title">Choisissez votre créneau</p>
        <p>
          La prise de rendez-vous en ligne sera disponible très prochainement. Sélectionnez une date
          et un créneau pour votre entretien diagnostic personnalisé (15 minutes).
        </p>
        <p className="ct-calendly-missing-hint">
          En attendant, utilisez le formulaire de contact ou appelez nos conseillers.
        </p>
      </div>
    );
  }

  if (!active) {
    return <div className="ct-calendly-embed ct-calendly-embed--idle" aria-hidden />;
  }

  return (
    <div className="ct-calendly-embed">
      <InlineWidget
        url={CALENDLY_EVENT_URL}
        styles={{ height: '680px', minWidth: '100%', width: '100%' }}
        pageSettings={CALENDLY_PAGE_SETTINGS}
        utm={CALENDLY_UTM}
      />
    </div>
  );
}
