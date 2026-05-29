import React from 'react';
import Hero from './Hero';
import Problematic from './Problematic';
import Pillars from './Pillars';
import Solutions from './Solutions';
import Process from './Process';
import KafeRetraiteHome from './KafeRetraiteHome';
import AnimatedBG from "../../components/Common/AnimatedBG";
import './Home.css';
import Testimonials from './Testimonials';
import PreFooter from './PreFooter';

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Hero est indépendant avec son image plein écran */}
      <Hero />

      {/* Toutes les autres sections partagent le même fond animé */}
      <div className="content-with-bg">
        <AnimatedBG />
        
        <Problematic />
        <Pillars />
        <Solutions />
        <Process />
        <Testimonials />
        <KafeRetraiteHome />
        <PreFooter/>
        {/* Tu peux ajouter les autres ici */}
      </div>
    </div>
  );
};

export default Home;