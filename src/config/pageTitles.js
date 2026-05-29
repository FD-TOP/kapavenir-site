const PAGE_TITLES = {
  '/': 'Accueil',
  '/services': 'Nos services',
  '/services/bilan': 'Bilan retraite',
  '/services/aide-depart': 'Aide au départ en retraite',
  '/pour-qui': 'Pour qui ?',
  '/pour-qui/particuliers': 'Particuliers',
  '/pour-qui/organismes': 'Organismes et assurances',
  '/pour-qui/entreprises-rh': 'Entreprises et RH',
  '/etapes': 'Comment ça marche',
  '/kafe-retraite': 'Kafé retraite',
  '/ressources': 'Ressources',
  '/faq': 'FAQ retraite',
  '/glossaire': 'Glossaire retraite',
  '/blog': 'Blog',
  '/guides': 'Guides pratiques',
  '/contact': 'Contact',
  '/a-propos': 'À propos',
  '/histoire': 'Notre histoire',
  '/mission': 'Notre mission',
  '/engagements': 'Nos engagements',
  '/expertise': 'Notre expertise',
  '/accessibilite': 'Accessibilité',
  '/mentions': 'Mentions légales',
  '/rgpd': 'Politique de confidentialité',
  '/cgv': 'CGV / CGU',
};

const SITE_NAME = 'KapAvenir';

export function getDocumentTitle(pathname) {
  const exact = PAGE_TITLES[pathname];
  if (exact) return `${exact} | ${SITE_NAME}`;

  if (pathname.startsWith('/pour-qui')) return `Pour qui ? | ${SITE_NAME}`;
  if (pathname.startsWith('/services')) return `Nos services | ${SITE_NAME}`;

  return `${SITE_NAME} — Votre retraite sereinement`;
}
