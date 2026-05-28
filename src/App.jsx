import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar       from './components/Navbar/Navbar';
import Footer       from './components/Footer/Footer';
import ScrollToTop  from './components/ScrollToTop/ScrollToTop';
import Home         from './pages/Home/Home';
import Services     from './pages/Services/Services';
import PourQui           from './pages/PourQui/PourQui';
import ParticuliersPage  from './pages/PourQui/ParticuliersPage';
import OrganismesPage    from './pages/PourQui/OrganismesPage';
import EntreprisesRhPage from './pages/PourQui/EntreprisesRhPage';
import Etapes       from './pages/Etapes/Etapes';
import KafeRetraitePage from './pages/KafeRetraite/KafeRetraitePage';
import Ressources   from './pages/Ressources/Ressources';
import APropos      from './pages/APropos/APropos';
import Contact      from './pages/Contact/Contact';
import couple1 from './assets/couple1.jpeg';
import couple2 from './assets/couple2.jpg';
import couple3 from './assets/couple3.jpg';
import couple4 from './assets/couple4.jpeg';
import couple5 from './assets/couple5.jpg';
import couple7 from './assets/couple7.jpg';
import meeting3 from './assets/meeting3.png';
import meeting4 from './assets/meeting4.jpg';
import women from './assets/women.png';
import salut from './assets/salut.jpg';
import grp1 from './assets/grp1.png';
import grp2 from './assets/grp2.png';
import grp3 from './assets/grp3.png';
import grp4 from './assets/grp4.png';
import couple9 from './assets/couple9.png';

const IMAGE_PRELOADS = {
  '/': [women, couple7, couple3],
  '/pour-qui': [couple1, meeting4, meeting3],
  '/pour-qui/particuliers': [couple1, meeting3],
  '/pour-qui/organismes': [meeting4, couple4],
  '/pour-qui/entreprises-rh': [meeting3, couple4],
  '/a-propos': [salut, couple5],
  '/histoire': [salut, couple5],
  '/mission': [salut, couple5],
  '/engagements': [salut, couple5],
  '/expertise': [salut, couple5],
  '/etapes': [couple2],
  '/kafe-retraite': [grp1, grp2, grp3, grp4, couple7, couple9],
};

const GLOBAL_PRELOADS = [couple1, meeting3, meeting4];

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const critical = [
      ...(IMAGE_PRELOADS[pathname] || []),
      ...GLOBAL_PRELOADS,
    ].filter(Boolean);

    const unique = [...new Set(critical)];
    unique.forEach((src, index) => {
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = src;

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
      {/* Dégradé partagé : texte + icônes SVG */}
      <svg className="kap-gradient-sprite" aria-hidden="true" focusable="false" width="0" height="0">
        <defs>
          <linearGradient id="kap-brand-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0071bc" />
            <stop offset="55%" stopColor="#00b6de" />
            <stop offset="100%" stopColor="#00bf63" />
          </linearGradient>
        </defs>
      </svg>

      <Navbar />

      <Routes>
        <Route path="/"                        element={<Home />} />
        <Route path="/services"                element={<Services />} />
        <Route path="/services/bilan"          element={<Services />} />
        <Route path="/services/aide-depart"    element={<Services />} />
        <Route path="/pour-qui"                 element={<PourQui />} />
        <Route path="/pour-qui/particuliers"    element={<ParticuliersPage />} />
        <Route path="/pour-qui/organismes"      element={<OrganismesPage />} />
        <Route path="/pour-qui/entreprises-rh"  element={<EntreprisesRhPage />} />
        <Route path="/etapes"                  element={<Etapes />} />
        <Route path="/kafe-retraite"           element={<KafeRetraitePage />} />
        <Route path="/ressources"              element={<Ressources />} />
        <Route path="/faq"                     element={<Ressources />} />
        <Route path="/glossaire"               element={<Ressources />} />
        <Route path="/blog"                    element={<Ressources />} />
        <Route path="/guides"                  element={<Ressources />} />
        <Route path="/contact"                 element={<Contact />} />
        <Route path="/a-propos"                element={<APropos />} />
        <Route path="/histoire"                element={<APropos />} />
        <Route path="/mission"                 element={<APropos />} />
        <Route path="/engagements"             element={<APropos />} />
        <Route path="/expertise"               element={<APropos />} />
        <Route path="/mentions"                element={<Ressources />} />
        <Route path="/rgpd"                    element={<Ressources />} />
        <Route path="/cgv"                     element={<Ressources />} />
      </Routes>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
