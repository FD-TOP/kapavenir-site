import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import SkipLink from './components/SkipLink/SkipLink';
import DocumentTitle from './components/DocumentTitle/DocumentTitle';
import { preloadImage } from './utils/preloadImage';
import couple1 from './assets/couple1.jpeg';
import couple2 from './assets/couple2.jpg';
import couple5 from './assets/couple5.jpg';
import couple10 from './assets/couple10.jpg';
import couple77 from './assets/couple77.jpg';
import couple88 from './assets/couple88.jpg';
import meeting3 from './assets/meeting3.png';
import meeting4 from './assets/meeting4.jpg';
import meeting6 from './assets/meeting6.jpg';
import salut from './assets/salut.jpg';
import grp3 from './assets/grp3.png';
import couple9 from './assets/couple9.png';

const Accessibilite = React.lazy(() => import('./pages/Accessibilite/Accessibilite'));
const Home = React.lazy(() => import('./pages/Home/Home'));
const Services = React.lazy(() => import('./pages/Services/Services'));
const PourQui = React.lazy(() => import('./pages/PourQui/PourQui'));
const ParticuliersPage = React.lazy(() => import('./pages/PourQui/ParticuliersPage'));
const OrganismesPage = React.lazy(() => import('./pages/PourQui/OrganismesPage'));
const EntreprisesRhPage = React.lazy(() => import('./pages/PourQui/EntreprisesRhPage'));
const Etapes = React.lazy(() => import('./pages/Etapes/Etapes'));
const KafeRetraitePage = React.lazy(() => import('./pages/KafeRetraite/KafeRetraitePage'));
const Ressources = React.lazy(() => import('./pages/Ressources/Ressources'));
const APropos = React.lazy(() => import('./pages/APropos/APropos'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));

const IMAGE_PRELOADS = {
  '/': [meeting6],
  '/pour-qui': [couple1],
  '/pour-qui/particuliers': [couple1],
  '/pour-qui/organismes': [meeting4],
  '/pour-qui/entreprises-rh': [meeting3],
  '/a-propos': [salut],
  '/histoire': [salut, couple10],
  '/mission': [salut, couple5],
  '/engagements': [salut, couple77],
  '/expertise': [salut, couple88],
  '/etapes': [couple2],
  '/kafe-retraite': [grp3, couple9],
};

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const critical = IMAGE_PRELOADS[pathname] || [];
    critical.forEach((src, index) => {
      preloadImage(src);
      if (index === 0) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
        setTimeout(() => link.remove(), 7000);
      }
    });
  }, [pathname]);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <svg className="kap-gradient-sprite" aria-hidden="true" focusable="false" width="0" height="0">
        <defs>
          <linearGradient id="kap-brand-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0071bc" />
            <stop offset="55%" stopColor="#00b6de" />
            <stop offset="100%" stopColor="#00bf63" />
          </linearGradient>
        </defs>
      </svg>

      <SkipLink />
      <DocumentTitle />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="app-main">
        <Suspense fallback={<div className="route-loading" role="status" aria-live="polite" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/bilan" element={<Services />} />
            <Route path="/services/aide-depart" element={<Services />} />
            <Route path="/pour-qui" element={<PourQui />} />
            <Route path="/pour-qui/particuliers" element={<ParticuliersPage />} />
            <Route path="/pour-qui/organismes" element={<OrganismesPage />} />
            <Route path="/pour-qui/entreprises-rh" element={<EntreprisesRhPage />} />
            <Route path="/etapes" element={<Etapes />} />
            <Route path="/kafe-retraite" element={<KafeRetraitePage />} />
            <Route path="/ressources" element={<Ressources />} />
            <Route path="/faq" element={<Ressources />} />
            <Route path="/glossaire" element={<Ressources />} />
            <Route path="/blog" element={<Ressources />} />
            <Route path="/guides" element={<Ressources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/accessibilite" element={<Accessibilite />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/histoire" element={<APropos />} />
            <Route path="/mission" element={<APropos />} />
            <Route path="/engagements" element={<APropos />} />
            <Route path="/expertise" element={<APropos />} />
            <Route path="/mentions" element={<Ressources />} />
            <Route path="/rgpd" element={<Ressources />} />
            <Route path="/cgv" element={<Ressources />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
