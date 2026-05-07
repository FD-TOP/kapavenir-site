import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, X, Menu, ArrowRight, Smartphone, Globe, ShieldCheck } from 'lucide-react';
import './Navbar.css';
import logoImg from '../../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const handleHashNav = (path) => {
    const [url, hash] = path.split('#');
    setIsMobileOpen(false);
    setActiveDropdown(null);
    if (hash) {
      navigate(url || '/pour-qui');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      navigate(path);
    }
  };

  const handleTitleNav = (path) => {
    if (!path) return;
    setIsMobileOpen(false);
    setActiveDropdown(null);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuConfig = [
    {
      title: "Nos services",
      titlePath: "/services",
      links: [
        { label: "Bilan retraite", path: "/services#bilan-retraite" },
        { label: "Aide au départ en retraite", path: "/services#aide-depart-retraite" }
      ]
    },
    {
      title: "Pour qui ?",
      titlePath: "/pour-qui",
      links: [
        { label: "Particuliers",             path: "/pour-qui#particuliers"   },
        { label: "Organismes et assurances", path: "/pour-qui#organismes"     },
        { label: "Entreprises & RH",         path: "/pour-qui#entreprises-rh" }
      ]
    },
    {
      title: "Comment ça marche?",
      titlePath: "/etapes",
      links: [
        { label: "Les étapes de l'accompagnement", path: "/etapes" }
      ]
    },
    {
      title: "Kafé retraite",
      titlePath: "/kafe-retraite",
      links: [
        { label: "Découvrir le Kafé retraite", path: "/kafe-retraite" }
      ]
    },
    {
      title: "Ressources",
      titlePath: "/ressources",
      links: [
        { label: "Blog / Articles", path: "/ressources" },
        { label: "Guides pratiques", path: "/ressources" },
        { label: "FAQ", path: "/faq" },
        { label: "Glossaire retraite", path: "/glossaire" }
      ]
    },
    {
      title: "À propos",
      titlePath: "/a-propos",
      links: [
        { label: "Notre histoire", path: "/histoire" },
        { label: "Notre mission", path: "/mission" },
        { label: "Nos engagements", path: "/engagements" },
        { label: "Notre expertise", path: "/expertise" }
      ]
    }
  ];

  return (
    <nav className={`nav-container ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-pill">
        {/* LOGO */}
        <Link to="/" className="nav-logo" onClick={() => setIsMobileOpen(false)}>
          <img src={logoImg} alt="KapAvenir" className="nav-logo-img" />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="nav-menu-desktop">
          {menuConfig.map((item, idx) => (
            <li 
              key={idx} 
              className="nav-item-desktop"
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`nav-link-desktop ${activeDropdown === idx ? 'active' : ''}`}
                onClick={() => handleTitleNav(item.titlePath)}
              >
                {item.title} <ChevronDown size={14} className={activeDropdown === idx ? 'rotate' : ''} />
              </button>
              
              <div className={`nav-dropdown-desktop ${activeDropdown === idx ? 'is-open' : ''}`}>
                {item.links.map((link, i) => (
                  link.path.includes('#')
                    ? <button key={i} className="nav-dropdown-item" onClick={() => handleHashNav(link.path)}>
                        <span>{link.label}</span>
                        <ArrowRight size={14} className="item-arrow" />
                      </button>
                    : <Link key={i} to={link.path} className="nav-dropdown-item" onClick={() => setActiveDropdown(null)}>
                        <span>{link.label}</span>
                        <ArrowRight size={14} className="item-arrow" />
                      </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {/* ACTIONS */}
        <div className="nav-right-group">
          <Link to="/contact" className="nav-cta-btn">Contact</Link>
          <button className="nav-mobile-trigger" onClick={() => setIsMobileOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY (FULL SCREEN) */}
      <div className={`nav-mobile-overlay ${isMobileOpen ? 'is-open' : ''}`}>
        <div className="mobile-header">
          <img src={logoImg} alt="KapAvenir" className="nav-logo-img" />
          <button className="mobile-close" onClick={() => setIsMobileOpen(false)}><X size={30} /></button>
        </div>
        
        <div className="mobile-content">
          {menuConfig.map((item, idx) => (
            <div key={idx} className="mobile-accordion-item">
              <button 
                className={`mobile-accordion-header ${mobileExpanded === idx ? 'expanded' : ''}`}
                onClick={() => setMobileExpanded(mobileExpanded === idx ? null : idx)}
              >
                {item.title}
                <ChevronDown size={20} />
              </button>
              
              <div className={`mobile-accordion-body ${mobileExpanded === idx ? 'is-visible' : ''}`}>
                {item.links.map((link, i) => (
                  link.path.includes('#')
                    ? <button key={i} className="mobile-sublink" onClick={() => handleHashNav(link.path)}>
                        {link.label}
                        <ArrowRight size={16} />
                      </button>
                    : <Link key={i} to={link.path} className="mobile-sublink" onClick={() => setIsMobileOpen(false)}>
                        {link.label}
                        <ArrowRight size={16} />
                      </Link>
                ))}
              </div>
            </div>
          ))}
          
          <Link to="/contact" className="mobile-final-cta" onClick={() => setIsMobileOpen(false)}>
            Démarrer mon projet
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;