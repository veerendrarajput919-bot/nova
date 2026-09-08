import React, { useState } from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { NovaLogo } from './Navbar';

export function GithubIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function TwitterIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733-16z" />
      <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer({ onNewsletterSubscribe }) {
  const [newsEmail, setNewsEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    onNewsletterSubscribe(newsEmail);
    setNewsEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-dark">
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <a href="#" className="footer-brand-logo" aria-label="NOVA Homepage">
              <NovaLogo size={34} showBadge={true} />
            </a>

            <p className="footer-brand-tagline">
              Build Better. Work Smarter.
            </p>

            <div className="footer-social-row">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="footer-social-btn">
                <TwitterIcon size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-social-btn">
                <LinkedinIcon size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="footer-social-btn">
                <GithubIcon size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-social-btn">
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Product</h4>
            <ul className="footer-links-list">
              <li><a href="#features" className="footer-link">Features</a></li>
              <li><a href="#pricing" className="footer-link">Pricing</a></li>
              <li><a href="#solutions" className="footer-link">Integrations</a></li>
              <li><a href="#how-it-works" className="footer-link">Changelog</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links-list">
              <li><a href="#about" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#faq" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-links-list">
              <li><a href="#faq" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms & Conditions</a></li>
              <li><a href="#faq" className="footer-link">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-newsletter-col">
            <h4 className="footer-col-title">Subscribe to our newsletter</h4>
            <p className="footer-news-desc">Get the latest updates and tips.</p>
            <form onSubmit={handleSubscribe} className="footer-news-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                required
                className="footer-news-input"
              />
              <button type="submit" className="footer-news-btn" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar-clean">
          <span>&copy; 2026 NOVA. All rights reserved.</span>
          <button onClick={scrollToTop} className="footer-back-to-top-link">
            <ArrowUp size={14} />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
