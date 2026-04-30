import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import LogoSticker from '../../components/Common/LogoSticker';
import './Ressources.css';

const FAQ_SECTIONS = [
  {
    title: 'Sur le bilan retraite',
    items: [
      {
        q: 'Pourquoi faire un bilan retraite ?',
        a: 'Le bilan retraite permet de faire le point sur vos droits, d’estimer votre future pension et d’identifier les actions à mettre en place pour optimiser votre situation.',
      },
      {
        q: 'À partir de quel âge faut-il faire un bilan retraite ?',
        a: 'Idéalement dès 40-45 ans, mais il n’est jamais trop tôt ni trop tard pour faire le point et prendre de meilleures décisions.',
      },
      {
        q: 'Que contient concrètement un bilan retraite ?',
        a: 'Une analyse complète de votre carrière, une estimation de votre pension, la détection d’éventuelles erreurs et des recommandations personnalisées.',
      },
    ],
  },
  {
    title: 'Sur l’optimisation',
    items: [
      {
        q: 'Est-il vraiment possible d’augmenter sa retraite ?',
        a: 'Oui, selon votre situation, plusieurs leviers existent (rachat de trimestres, arbitrages de carrière, choix de date de départ…).',
      },
      {
        q: 'Est-ce que c’est rentable ?',
        a: 'Dans la majorité des cas, les optimisations mises en place permettent de générer des gains supérieurs au coût de l’accompagnement.',
      },
    ],
  },
  {
    title: 'Sur l’aide au départ en retraite',
    items: [
      {
        q: 'Pourquoi se faire accompagner pour son départ à la retraite ?',
        a: 'Les démarches peuvent être longues et complexes. Un accompagnement permet d’éviter les erreurs, les oublis et les retards de paiement.',
      },
      {
        q: 'Que prenez-vous en charge ?',
        a: 'Nous vous accompagnons dans la constitution de votre dossier, les démarches administratives et le suivi jusqu’à la validation de votre retraite.',
      },
      {
        q: 'Combien de temps prennent les démarches ?',
        a: 'En moyenne entre 4 et 6 mois, selon votre situation. Il est recommandé d’anticiper.',
      },
    ],
  },
  {
    title: 'Tarifs & fonctionnement',
    items: [
      {
        q: 'Combien coûtent vos services ?',
        a: 'Nos tarifs dépendent du niveau d’accompagnement choisi. Nous proposons plusieurs offres adaptées à vos besoins.',
      },
      {
        q: 'Comment se déroule l’accompagnement ?',
        a: 'Après une première prise de contact, nous analysons votre situation, puis nous vous restituons nos recommandations et vous accompagnons si besoin dans la mise en place.',
      },
      {
        q: 'Est-ce un engagement long ?',
        a: 'Non, vous êtes libre de choisir le niveau d’accompagnement qui vous convient.',
      },
    ],
  },
  {
    title: 'Confiance et crédibilité',
    items: [
      {
        q: 'En quoi KapAvenir est différent ?',
        a: 'Nous mettons l’accent sur la clarté, l’accompagnement humain et des conseils personnalisés, pour que vous compreniez réellement votre situation.',
      },
      {
        q: 'Mes données sont-elles sécurisées ?',
        a: 'Oui, vos informations sont strictement confidentielles et utilisées uniquement dans le cadre de votre accompagnement.',
      },
    ],
  },
  {
    title: 'Contact',
    items: [
      {
        q: 'Comment démarrer ?',
        a: 'Il vous suffit de prendre rendez-vous ou de demander à être rappelé via notre site.',
      },
      {
        q: 'Puis-je poser des questions avant de m’engager ?',
        a: 'Bien sûr, un premier échange permet de répondre à vos questions et de vous orienter.',
      },
    ],
  },
];

const GLOSSARY = {
  A: [
    ['Âge légal de départ', 'Âge minimum pour demander sa retraite, variable selon votre année de naissance.'],
    ['Âge du taux plein automatique', 'Âge auquel vous obtenez le taux plein même sans tous vos trimestres (67 ans en général).'],
    ['Assurance retraite', 'Organisme qui gère la retraite de base des salariés du privé.'],
  ],
  B: [['Bilan retraite', 'Analyse complète de votre carrière pour estimer votre pension et identifier des optimisations.']],
  C: [
    ['Carrière longue', 'Dispositif permettant de partir plus tôt si vous avez commencé à travailler jeune.'],
    ['Caisse de retraite', 'Organisme qui verse votre pension (régime de base ou complémentaire).'],
    ['Cumul emploi-retraite', 'Possibilité de travailler tout en percevant sa retraite.'],
    ['Cotisations retraite', 'Sommes prélevées sur vos revenus pour financer votre retraite.'],
  ],
  D: [
    ['Décote', 'Réduction de la pension si vous n’avez pas tous vos trimestres.'],
    ['Durée d’assurance', 'Nombre total de trimestres validés dans votre carrière.'],
  ],
  E: [
    ['Épargne retraite', 'Produits d’épargne permettant de compléter vos revenus à la retraite.'],
    ['Estimation indicative globale (EIG)', 'Document officiel donnant une estimation de votre future retraite.'],
  ],
  L: [['Liquidation de la retraite', 'Action de demander sa retraite pour déclencher le paiement.']],
  M: [['Majoration de pension', 'Augmentation de votre retraite (ex : pour enfants).']],
  P: [
    ['Pension de retraite', 'Revenu versé chaque mois après votre départ.'],
    ['Plafond de la Sécurité sociale (PASS)', 'Montant de référence utilisé pour calculer certaines cotisations et droits.'],
    ['Points retraite', 'Unités utilisées pour calculer la retraite complémentaire.'],
  ],
  R: [
    ['Rachat de trimestres', 'Paiement volontaire pour compléter des trimestres manquants.'],
    ['Régime de base', 'Retraite obligatoire principale.'],
    ['Régime complémentaire', 'Retraite qui s’ajoute au régime de base.'],
    ['Relevé de carrière', 'Document récapitulant votre carrière et vos trimestres.'],
    ['Retraite progressive', 'Dispositif permettant de réduire son activité tout en touchant une partie de sa retraite.'],
  ],
  S: [
    ['Salaire annuel moyen (SAM)', 'Moyenne des meilleures années de salaire servant au calcul de la retraite.'],
    ['Surcote', 'Augmentation de la pension si vous continuez à travailler après le taux plein.'],
  ],
  T: [
    ['Taux plein', 'Taux maximum appliqué au calcul de la retraite.'],
    ['Trimestre', 'Unité de mesure de la durée de cotisation.'],
  ],
  V: [['Validation des trimestres', 'Acquisition de trimestres grâce au travail ou à certaines périodes (chômage, maladie…).']],
};

export default function Ressources() {
  const { pathname } = useLocation();
  const [tab, setTab] = useState('faq');
  const [openId, setOpenId] = useState('0-0');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (pathname.includes('glossaire')) setTab('glossaire');
    else setTab('faq');
  }, [pathname]);

  const filteredGlossary = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GLOSSARY;

    const result = {};
    Object.entries(GLOSSARY).forEach(([letter, entries]) => {
      const kept = entries.filter(([term, def]) => term.toLowerCase().includes(q) || def.toLowerCase().includes(q));
      if (kept.length) result[letter] = kept;
    });
    return result;
  }, [query]);

  return (
    <main className="res-page">
      <LogoSticker size={94} top="124px" right="2%" rotation={12} opacity={0.14} animation="wobble" hideMobile />
      <LogoSticker size={70} bottom="8%" left="2%" rotation={-18} opacity={0.1} animation="float" hideMobile />

      <section className="res-hero">
        <p className="res-kicker">Ressources KapAvenir</p>
        <h1>FAQ & Glossaire retraite</h1>
        <p>Retrouvez des réponses claires et des définitions utiles pour mieux comprendre votre retraite.</p>
      </section>

      <section className="res-tabs">
        <button className={tab === 'faq' ? 'is-active' : ''} onClick={() => setTab('faq')}>
          FAQ
        </button>
        <button className={tab === 'glossaire' ? 'is-active' : ''} onClick={() => setTab('glossaire')}>
          Glossaire
        </button>
      </section>

      {tab === 'faq' ? (
        <section className="res-faq">
          {FAQ_SECTIONS.map((group, gi) => (
            <article key={group.title} className="res-faq-group">
              <h2>{group.title}</h2>
              <div className="res-faq-list">
                {group.items.map((item, ii) => {
                  const id = `${gi}-${ii}`;
                  const isOpen = openId === id;
                  return (
                    <button key={item.q} className={`res-faq-item ${isOpen ? 'is-open' : ''}`} onClick={() => setOpenId(isOpen ? '' : id)}>
                      <div className="res-faq-q">
                        <span>{item.q}</span>
                        <ChevronDown size={18} />
                      </div>
                      {isOpen && <p className="res-faq-a">{item.a}</p>}
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="res-glossary">
          <div className="res-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un terme (ex: taux plein, trimestre...)"
            />
          </div>

          {Object.keys(filteredGlossary).length === 0 ? (
            <p className="res-empty">Aucun terme trouvé pour cette recherche.</p>
          ) : (
            Object.entries(filteredGlossary).map(([letter, entries]) => (
              <article key={letter} className="res-letter-group">
                <h2>{letter}</h2>
                <div className="res-term-grid">
                  {entries.map(([term, def]) => (
                    <div key={term} className="res-term-card">
                      <h3>{term}</h3>
                      <p>{def}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))
          )}
        </section>
      )}
    </main>
  );
}
