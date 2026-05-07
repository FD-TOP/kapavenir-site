import React, { useState, useEffect, useMemo } from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import './Testimonials.css';
import LogoSticker from '../../components/Common/LogoSticker';

const allReviews = [
  { id: 1, name: "Jean-Pierre Martin", role: "Ancien Cadre Dirigeant", company: "Renault Group", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop", text: "Grâce au bilan KapAvenir, j'ai pu découvrir des trimestres oubliés de mon début de carrière. Une expertise indispensable pour partir l'esprit tranquille.", stars: 5 },
  { id: 2, name: "Marie-Claire Durand", role: "Responsable RH", company: "L'Oréal", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop", text: "Une approche d'une grande clarté. KapAvenir a su traduire la complexité de ma carrière multi-statuts en une stratégie de départ sereine.", stars: 5 },
  { id: 3, name: "Marc Lefebvre", role: "Ingénieur Senior", company: "Airbus", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop", text: "L'accompagnement va bien au-delà du simple calcul. C'est un véritable coaching de fin de carrière qui sécurise nos droits.", stars: 5 },
  { id: 4, name: "Luc Sophie", role: "Directeur Commercial", company: "TotalEnergies", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&fit=crop", text: "Analyse fine et précise. J'ai pu optimiser mon départ de deux ans par rapport à mes prévisions initiales. Une aide précieuse.", stars: 5 },
  { id: 5, name: "Isabelle G.", role: "Chef de Projet", company: "Orange", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&fit=crop", text: "Le stress administratif a disparu. KapAvenir s'est occupé de tout le lien avec les caisses de retraite. Je recommande vivement.", stars: 5 },
  { id: 6, name: "Thomas B.", role: "Expert Comptable", company: "Cabinet Indépendant", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&h=200&fit=crop", text: "En tant qu'expert, j'ai apprécié la rigueur technique des dossiers présentés. Un partenaire de confiance pour sécuriser sa retraite.", stars: 5 }
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // On découpe les données en groupes de 3 de manière mémoïsée
  const slides = useMemo(() => {
    const res = [];
    for (let i = 0; i < allReviews.length; i += 3) {
      res.push(allReviews.slice(i, i + 3));
    }
    return res;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="TestimonialsSection" className="T-main-section">
      {/* Stickers décoratifs */}
      <LogoSticker size={95}  top="4%" right="4%" rotation={16} opacity={0.16} animation="wobble" hideMobile />
      <LogoSticker size={60}  bottom="8%" left="2%" rotation={-18} opacity={0.12} animation="float" hideMobile />

      {/* --- ARRIÈRE-PLAN DYNAMIQUE --- */}
      <div className="T-bg-wrapper">
        <div className="T-orb T-orb-1"></div>
        <div className="T-orb T-orb-2"></div>
      </div>

      <div className="T-container">
        <header className="T-header">
          <div className="T-mini-badge">
            <CheckCircle size={14} className="T-icon-green" />
            <span>Confiance & Expertise</span>
          </div>
          <h2 className="T-title">Ce que nos clients <br /><span className="T-gradient">disent de nous</span></h2>
        </header>

        <div className="T-slider-viewport">
          <div 
            className="T-slider-track" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((group, slideIdx) => (
              <div key={slideIdx} className="T-slide">
                {group.map((review) => (
                  <div key={review.id} className="T-card">
                    <div className="T-card-top">
                      <div className="T-stars">
                        {[...Array(review.stars)].map((_, i) => (
                          <Star key={i} size={14} fill="#00bf63" color="#00bf63" />
                        ))}
                      </div>
                      <Quote size={28} className="T-quote-svg" />
                    </div>
                    
                    <p className="T-review-text">"{review.text}"</p>
                    
                    <div className="T-user-block">
                      <div className="T-avatar-box">
                        <img src={review.image} alt={review.name} className="T-avatar-img" />
                        <div className="T-check-badge">
                           <CheckCircle size={10} fill="#00bf63" color="#fff" />
                        </div>
                      </div>
                      <div className="T-user-info">
                        <span className="T-user-name">{review.name}</span>
                        <span className="T-user-sub">
                          {review.role} • <strong className="T-brand">{review.company}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* --- PAGINATION --- */}
        <div className="T-dots-navigation">
          {slides.map((_, i) => (
            <button 
              key={i} 
              className={`T-dot-btn ${i === currentSlide ? 'is-active' : ''}`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}