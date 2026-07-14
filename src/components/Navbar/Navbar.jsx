import React, { useState, useEffect, useRef, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, X, Menu, ArrowRight } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { scrollToHash } from '../../utils/scrollNavigation';
import './Navbar.css';
import logoImg from '../../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const mobileNavId = useId();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const mobileOverlayRef = useFocusTrap(isMobileOpen, () => setIsMobileOpen(false));
  const mobileTriggerRef = useRef(null);

  const handleHashNav = (path) => {
    const [url, hash] = path.split('#');
    setIsMobileOpen(false);
    setActiveDropdown(null);
    if (hash) {
      navigate(url || '/pour-qui');
      scrollToHash(`#${hash}`);
    } else {
      navigate(path);
    }
  };

  const handleTitleNav = (path) => {
    if (!path) return;
    setIsMobileOpen(false);
    setActiveDropdown(null);
    navigate(path);
  };

  const openMobileMenu = () => {
    mobileTriggerRef.current = document.activeElement;
    setIsMobileOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setMobileExpanded(null);
    setTimeout(() => mobileTriggerRef.current?.focus?.(), 0);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuConfig = [
    {
      title: 'Nos services',
      titlePath: '/services',
      links: [{ label: 'Bilan retraite', path: '/services#bilan-retraite' }],
    },
    {
      title: 'Pour qui ?',
      titlePath: '/pour-qui',
      links: [
        { label: 'Particuliers', path: '/pour-qui/particuliers' },
        { label: 'Organismes et assurances', path: '/pour-qui/organismes' },
        { label: 'Entreprises & RH', path: '/pour-qui/entreprises-rh' },
      ],
    },
    {
      title: 'Comment ça marche ?',
      titlePath: '/etapes',
      links: [{ label: "Les étapes de l'accompagnement", path: '/etapes' }],
    },
    {
      title: 'Kafé retraite',
      titlePath: '/kafe-retraite',
      links: [{ label: 'Découvrir le Kafé retraite', path: '/kafe-retraite' }],
    },
    {
      title: 'Ressources',
      titlePath: '/ressources',
      links: [
        { label: 'Blog / Articles', path: '/ressources' },
        { label: 'Guides pratiques', path: '/ressources' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Glossaire retraite', path: '/glossaire' },
      ],
    },
    {
      title: 'À propos',
      titlePath: '/a-propos',
      links: [
        { label: 'Notre histoire', path: '/histoire' },
        { label: 'Notre mission', path: '/mission' },
        { label: 'Nos engagements', path: '/engagements' },
        { label: 'Notre expertise', path: '/expertise' },
      ],
    },
  ];

  return (
    <header className={`nav-container ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav-pill" aria-label="Navigation principale">
        <Link to="/" className="nav-logo" onClick={() => setIsMobileOpen(false)}>
          <img src={logoImg} alt="KapAvenir — Accueil" className="nav-logo-img" />
        </Link>

        <ul className="nav-menu-desktop">
          {menuConfig.map((item, idx) => (
            <li
              key={item.title}
              className="nav-item-desktop"
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`nav-link-desktop ${activeDropdown === idx ? 'active' : ''}`}
                aria-expanded={activeDropdown === idx}
                aria-haspopup="true"
                onClick={() => handleTitleNav(item.titlePath)}
              >
                {item.title}{' '}
                <ChevronDown size={14} className={activeDropdown === idx ? 'rotate' : ''} aria-hidden />
              </button>

              <div
                className={`nav-dropdown-desktop ${activeDropdown === idx ? 'is-open' : ''}`}
                aria-hidden={activeDropdown !== idx}
              >
                {item.links.map((link) =>
                  link.path.includes('#') ? (
                    <button
                      key={link.label}
                      type="button"
                      className="nav-dropdown-item"
                      onClick={() => handleHashNav(link.path)}
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={14} className="item-arrow" aria-hidden />
                    </button>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.path}
                      className="nav-dropdown-item"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={14} className="item-arrow" aria-hidden />
                    </Link>
                  ),
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="nav-right-group">
          <Link to="/contact" className="nav-cta-btn">
            Contact
          </Link>
          <button
            type="button"
            className="nav-mobile-trigger"
            aria-expanded={isMobileOpen}
            aria-controls={mobileNavId}
            aria-label={isMobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => (isMobileOpen ? closeMobileMenu() : openMobileMenu())}
          >
            <Menu size={26} aria-hidden />
          </button>
        </div>
      </nav>

      <div
        id={mobileNavId}
        ref={mobileOverlayRef}
        className={`nav-mobile-overlay ${isMobileOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        aria-hidden={!isMobileOpen}
      >
        <div className="mobile-header">
          <img src={logoImg} alt="" className="nav-logo-img" aria-hidden />
          <button
            type="button"
            className="mobile-close"
            aria-label="Fermer le menu"
            onClick={closeMobileMenu}
          >
            <X size={30} aria-hidden />
          </button>
        </div>

        <div className="mobile-content">
          {menuConfig.map((item, idx) => (
            <div key={item.title} className="mobile-accordion-item">
              <button
                type="button"
                className={`mobile-accordion-header ${mobileExpanded === idx ? 'expanded' : ''}`}
                aria-expanded={mobileExpanded === idx}
                onClick={() => setMobileExpanded(mobileExpanded === idx ? null : idx)}
              >
                {item.title}
                <ChevronDown size={20} aria-hidden />
              </button>

              <div
                className={`mobile-accordion-body ${mobileExpanded === idx ? 'is-visible' : ''}`}
                hidden={mobileExpanded !== idx}
              >
                {item.links.map((link) =>
                  link.path.includes('#') ? (
                    <button
                      key={link.label}
                      type="button"
                      className="mobile-sublink"
                      onClick={() => handleHashNav(link.path)}
                    >
                      {link.label}
                      <ArrowRight size={16} aria-hidden />
                    </button>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.path}
                      className="mobile-sublink"
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}

          <Link to="/contact" className="mobile-final-cta" onClick={closeMobileMenu}>
            Démarrer mon projet
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
