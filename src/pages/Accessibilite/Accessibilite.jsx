import { Link } from 'react-router-dom';
import LogoSticker from '../../components/Common/LogoSticker';
import './Accessibilite.css';

export default function Accessibilite() {
  return (
    <div className="a11y-page">
      <LogoSticker size={88} top="120px" right="2%" rotation={12} opacity={0.12} animation="wobble" hideMobile />

      <header className="a11y-hero">
        <p className="a11y-kicker">Accessibilité numérique</p>
        <h1>Déclaration d&apos;accessibilité</h1>
        <p className="a11y-lead">
          KapAvenir s&apos;engage à rendre son site internet accessible au plus grand nombre, y compris
          aux personnes en situation de handicap visuel, auditif, moteur ou cognitif.
        </p>
      </header>

      <section className="a11y-block" aria-labelledby="a11y-etat">
        <h2 id="a11y-etat">État de conformité</h2>
        <p>
          Le site <strong>kapavenir.fr</strong> est en cours d&apos;amélioration pour atteindre le niveau
          de conformité visé au référentiel général d&apos;amélioration de l&apos;accessibilité (RGAA),
          version 4, niveau AA, sur la base des critères du WCAG 2.1.
        </p>
        <p>
          <strong>État actuel :</strong> partiellement conforme. Des efforts ont été menés (navigation au
          clavier, contrastes, formulaires étiquetés, lecteurs d&apos;écran). Un audit complet reste à
          finaliser.
        </p>
      </section>

      <section className="a11y-block" aria-labelledby="a11y-fonctionnalites">
        <h2 id="a11y-fonctionnalites">Fonctionnalités d&apos;accessibilité</h2>
        <ul>
          <li>Lien d&apos;évitement « Aller au contenu principal »</li>
          <li>Structure de titres et zones de navigation identifiées</li>
          <li>Focus visible au clavier sur les liens et boutons</li>
          <li>Textes alternatifs sur les images informatives</li>
          <li>Formulaires avec libellés explicites</li>
          <li>Respect de la préférence « réduire les animations » du système</li>
        </ul>
      </section>

      <section className="a11y-block" aria-labelledby="a11y-limites">
        <h2 id="a11y-limites">Contenus et limites connues</h2>
        <ul>
          <li>
            L&apos;agenda de prise de rendez-vous (Calendly) est un service tiers : son accessibilité
            dépend de l&apos;éditeur Calendly.
          </li>
          <li>Certaines vidéos peuvent ne pas disposer encore de sous-titres.</li>
          <li>Le contraste de certains éléments décoratifs peut être perfectible.</li>
        </ul>
      </section>

      <section className="a11y-block" aria-labelledby="a11y-signalement">
        <h2 id="a11y-signalement">Signaler un problème</h2>
        <p>
          Si vous rencontrez un obstacle à l&apos;accès à une information ou à une fonctionnalité,
          contactez-nous :
        </p>
        <ul>
          <li>
            E-mail :{' '}
            <a href="mailto:contact@kapavenir.fr">contact@kapavenir.fr</a>
          </li>
          <li>
            Téléphone : <a href="tel:+33139300000">01 39 30 00 00</a>
          </li>
          <li>
            <Link to="/contact">Formulaire de contact</Link>
          </li>
        </ul>
        <p>
          Nous nous efforçons de vous répondre dans les meilleurs délais et de proposer une alternative
          accessible si nécessaire.
        </p>
      </section>

      <section className="a11y-block" aria-labelledby="a11y-recours">
        <h2 id="a11y-recours">Voies de recours</h2>
        <p>
          Si vous n&apos;obtenez pas de réponse satisfaisante, vous pouvez saisir le{' '}
          <a href="https://formulaire.defenseurdesdroits.fr/" target="_blank" rel="noopener noreferrer">
            Défenseur des droits
          </a>
          .
        </p>
      </section>

      <p className="a11y-updated">Déclaration mise à jour : mai 2026</p>
    </div>
  );
}
