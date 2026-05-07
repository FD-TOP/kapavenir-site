import React from 'react';
import logoTag from '../../assets/logo-tag.png';
import './LogoSticker.css';

/**
 * Sticker décoratif du logo KapAvenir.
 *
 * Props :
 *  - size        : taille du sticker en px (défaut : 90)
 *  - top/bottom/left/right : positionnement absolu (ex: "10%", "40px")
 *  - rotation    : rotation en degrés (défaut : -12)
 *  - opacity     : opacité 0–1 (défaut : 0.18)
 *  - animation   : "float" | "wobble" | "spin" | "none" (défaut : "wobble")
 *  - hideMobile  : masque le sticker sur mobile (défaut : false)
 */
const LogoSticker = ({
  size = 90,
  top,
  bottom,
  left,
  right,
  rotation = -12,
  opacity = 0.18,
  animation = 'wobble',
  hideMobile = false,
}) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    top,
    bottom,
    left,
    right,
    opacity,
    '--sticker-rotate': `${rotation}deg`,
  };

  const classes = [
    'logo-sticker',
    animation !== 'none' ? `anim-${animation}` : '',
    hideMobile ? 'hide-mobile' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={style} aria-hidden="true">
      <img src={logoTag} alt="" />
    </div>
  );
};

export default LogoSticker;
