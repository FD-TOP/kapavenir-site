import React from 'react';
import ServiceHero from './ServiceHero';
import BilanRetraite from './BilanRetraite';
import AideDepart from './AideDepart';
import AnimatedBG from '../../components/Common/AnimatedBG';
import LogoSticker from '../../components/Common/LogoSticker';
import './Services.css';

const Services = () => {
  return (
    <div className="services-wrapper">
      <div className="content-with-bg">
        <AnimatedBG />
        <LogoSticker size={98} top="9%" right="2%" rotation={16} opacity={0.14} animation="wobble" hideMobile />
        <LogoSticker size={68} top="52%" left="1.5%" rotation={-18} opacity={0.1} animation="float" hideMobile />
        <LogoSticker size={86} bottom="8%" right="3%" rotation={-10} opacity={0.12} animation="spin" hideMobile />
        <ServiceHero />
        <BilanRetraite />
        <AideDepart />
      </div>
    </div>
  );
};

export default Services;