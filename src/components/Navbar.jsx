import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Search } from 'lucide-react';

/**
 * NovaIcon - Futuristic Holographic AI Orb Logo
 */
export function NovaIcon({ size = 36, className = '', glow = true }) {
  return (
    <div
      className={`nova-brand-icon ${glow ? 'nova-brand-icon-glow' : ''} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <radialGradient id="novaHoloSphere" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="25%" stopColor="#818CF8" />
            <stop offset="55%" stopColor="#A855F7" />
            <stop offset="85%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#312E81" />
          </radialGradient>

          <linearGradient id="novaGlassSheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="novaOrbitalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="35%" stopColor="#8B5CF6" />
            <stop offset="70%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>

          <filter id="novaOrbGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="24" cy="24" r="17" fill="url(#novaOrbitalGrad)" opacity="0.28" filter="url(#novaOrbGlow)" />
        <ellipse
          cx="24"
          cy="24"
          rx="19"
          ry="6.5"
          transform="rotate(-28 24 24)"
          stroke="url(#novaOrbitalGrad)"
          strokeWidth="1.8"
          strokeDasharray="26 12"
          opacity="0.55"
        />
        <circle cx="24" cy="24" r="13.5" fill="url(#novaHoloSphere)" />
        <circle cx="21" cy="20" r="4.5" fill="#FFFFFF" opacity="0.35" filter="url(#novaOrbGlow)" />
        <circle cx="21" cy="20" r="2" fill="#FFFFFF" />
        <ellipse
          cx="22"
          cy="16.5"
          rx="8.5"
          ry="4.5"
          fill="url(#novaGlassSheen)"
          transform="rotate(-15 22 16.5)"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="19"
          ry="6.5"
          transform="rotate(-28 24 24)"
          stroke="url(#novaOrbitalGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="14 26"
        />
        <circle cx="8.5" cy="15.5" r="2" fill="#38BDF8" filter="url(#novaOrbGlow)" />
        <circle cx="8.5" cy="15.5" r="1" fill="#FFFFFF" />
        <circle cx="39.5" cy="32.5" r="2.2" fill="#F43F5E" filter="url(#novaOrbGlow)" />
        <circle cx="39.5" cy="32.5" r="1.1" fill="#FEF08A" />
        <path
          d="M 37.5 8.5 L 38.5 11.5 L 41.5 12.5 L 38.5 13.5 L 37.5 16.5 L 36.5 13.5 L 33.5 12.5 L 36.5 11.5 Z"
          fill="#67E8F9"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

export function NovaLogo({
  size = 38,
  showText = true,
  showBadge = true,
  badgeText = 'AI 2.0',
  iconOnly = false,
  className = '',
  textSize = '1.35rem',
}) {
  if (iconOnly || !showText) {
    return <NovaIcon size={size} className={className} />;
  }

  return (
    <div className={`nova-brand-lockup ${className}`}>
      <NovaIcon size={size} />
      <span className="brand-name" style={{ fontSize: textSize }}>
        NOVA
      </span>
      {showBadge && (
        <span className="brand-badge-ai">
          {badgeText}
        </span>
      )}
    </div>
  );
}

export function Navbar({ isDark, toggleTheme, onOpenDemo, onOpenAuth, onOpenCommandPalette }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#how-it-works' },
    { name: 'ROI Calculator', href: '#roi-calculator' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header className={`navbar-wrapper-clean ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner-flex">
            {/* Brand Logo */}
            <a href="#" className="navbar-brand-clean" aria-label="NOVA Homepage">
              <NovaLogo size={36} showBadge={true} />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="navbar-nav-clean" aria-label="Primary Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link-clean"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="navbar-actions-clean">
              {/* Quick Search / Command Palette Trigger */}
              <button
                className="cmd-trigger-btn"
                onClick={onOpenCommandPalette}
                title="Search or jump to command (Ctrl+K)"
                aria-label="Open Command Palette"
              >
                <Search size={14} />
                <span className="cmd-trigger-text">Search...</span>
                <kbd className="cmd-trigger-kbd">Ctrl+K</kbd>
              </button>

              {/* Theme Toggle Button */}
              <button
                className="theme-switch-pill"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Login */}
              <button
                className="btn-nav-login"
                onClick={() => onOpenAuth('login')}
              >
                Log in
              </button>

              {/* Primary CTA */}
              <button
                className="btn btn-hero-primary btn-sm"
                onClick={() => onOpenAuth('signup')}
              >
                Get Started Free
              </button>

              {/* Mobile Hamburger Button */}
              <button
                className="hamburger-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-nav-backdrop open"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="false"
        />
      )}

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div
          className="mobile-nav-drawer open"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="mobile-nav-header">
            <div className="navbar-brand-clean">
              <NovaLogo size={32} showBadge={true} />
            </div>
            <button
              className="btn-icon"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-cmd-search-row">
            <button
              className="btn btn-hero-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setIsMenuOpen(false);
                onOpenCommandPalette();
              }}
            >
              <Search size={14} />
              <span>Search & Commands (Ctrl+K)</span>
            </button>
          </div>

          <nav className="mobile-nav-links" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-item"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mobile-nav-actions">
            <button
              className="btn btn-hero-secondary btn-lg"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenDemo();
              }}
            >
              Watch Demo
            </button>
            <button
              className="btn btn-hero-primary btn-lg"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenAuth('signup');
              }}
            >
              Get Started Free
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
