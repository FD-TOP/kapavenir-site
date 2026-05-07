import React from 'react';
import AnimatedBG from '../../components/Common/AnimatedBG';
import KafeRetraite from '../Home/KafeRetraite';

export default function KafeRetraitePage() {
  return (
    <div className="home-wrapper">
      <div className="content-with-bg">
        <AnimatedBG />
        <KafeRetraite />
      </div>
    </div>
  );
}
