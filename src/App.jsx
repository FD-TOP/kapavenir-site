import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar       from './components/Navbar/Navbar';
import Footer       from './components/Footer/Footer';
import ScrollToTop  from './components/ScrollToTop/ScrollToTop';
import Home         from './pages/Home/Home';
import Services     from './pages/Services/Services';
import PourQui      from './pages/PourQui/PourQui';
import Etapes       from './pages/Etapes/Etapes';
import KafeRetraitePage from './pages/KafeRetraite/KafeRetraitePage';
import Ressources   from './pages/Ressources/Ressources';
import APropos      from './pages/APropos/APropos';
import Contact      from './pages/Contact/Contact';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <Routes>
        <Route path="/"                        element={<Home />} />
        <Route path="/services"                element={<Services />} />
        <Route path="/services/bilan"          element={<Services />} />
        <Route path="/services/aide-depart"    element={<Services />} />
        <Route path="/pour-qui"                element={<PourQui />} />
        <Route path="/pour-qui/particuliers"   element={<PourQui />} />
        <Route path="/pour-qui/organismes"     element={<PourQui />} />
        <Route path="/pour-qui/entreprises-rh" element={<PourQui />} />
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
