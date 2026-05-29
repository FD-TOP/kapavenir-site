/**
 * Lien Calendly de l'événement « entretien diagnostic » (15 min).
 * Priorité : variable d'environnement VITE_CALENDLY_URL (Vercel / .env local).
 *
 * Exemple : https://calendly.com/kapavenir/entretien-diagnostic
 */
export const CALENDLY_EVENT_URL = (import.meta.env.VITE_CALENDLY_URL || '').trim();

export const CALENDLY_PAGE_SETTINGS = {
  backgroundColor: 'ffffff',
  hideEventTypeDetails: false,
  hideLandingPageDetails: true,
  primaryColor: '00b6de',
  textColor: '0f172a',
};

export const CALENDLY_UTM = {
  utmSource: 'kapavenir-site',
  utmMedium: 'contact',
  utmCampaign: 'entretien-diagnostic',
};
