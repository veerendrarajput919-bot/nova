import React from 'react';
import { ArrowRight, Play, Check } from 'lucide-react';
import { NovaIcon } from './Navbar';

export function Hero({ onOpenDemo, onOpenAuth }) {
  return (
    <section className="section section-hero" id="hero">
      {/* Background radial glow */}
      <div className="ambient-glow ambient-glow-primary" />
      <div className="ambient-glow ambient-glow-secondary" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">
          {/* Left Column: Headline & Action */}
          <div className="hero-content">
            <div className="hero-badge-container">
              <div className="hero-badge">
                <NovaIcon size={16} glow={false} />
                <span>AI-Powered Productivity Platform</span>
              </div>
            </div>

            <h1 className="hero-title">
              Build Better.<br />
              Work <span className="hero-title-highlight">Smarter.</span>
            </h1>

            <p className="hero-subtitle">
              NOVA is an AI-powered productivity platform that helps teams manage
              projects, automate repetitive tasks and collaborate efficiently.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-hero-primary"
                onClick={() => onOpenAuth('signup')}
              >
                Get Started Free
                <ArrowRight size={17} />
              </button>

              <button
                className="btn btn-hero-secondary"
                onClick={onOpenDemo}
              >
                <div className="play-icon-circle">
                  <Play size={14} fill="currentColor" />
                </div>
                Watch Demo
              </button>
            </div>

            <div className="hero-micro-trust">
              <div className="trust-check-item">
                <Check size={16} className="trust-check-icon" strokeWidth={2.5} />
                <span>No credit card required</span>
              </div>
              <div className="trust-check-item">
                <Check size={16} className="trust-check-icon" strokeWidth={2.5} />
                <span>Free plan available</span>
              </div>
              <div className="trust-check-item">
                <Check size={16} className="trust-check-icon" strokeWidth={2.5} />
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Dashboard Mockup Image with Floating Badges */}
          <div className="hero-visual">
            <div
              className="hero-image-card-wrapper"
              onClick={onOpenDemo}
              title="Click to watch interactive demo"
            >
              <div className="hero-visual-glow-ring" />
              <img
                src="/images/hero-dashboard.webp"
                alt="NOVA AI Productivity Dashboard and Mobile App Mockup"
                className="hero-mockup-img"
              />

              {/* Floating Live Indicator Badge Top Right */}
              <div className="hero-floating-badge badge-top-right">
                <span className="live-pulse-dot" />
                <div className="badge-text-group">
                  <span className="badge-title">AI Engine 2.0</span>
                  <span className="badge-sub">Auto-Triage Active (2.1s)</span>
                </div>
              </div>

              {/* Floating Velocity Badge Bottom Left */}
              <div className="hero-floating-badge badge-bottom-left">
                <div className="badge-icon-fire">🚀</div>
                <div className="badge-text-group">
                  <span className="badge-title">+42% Sprint Velocity</span>
                  <span className="badge-sub">Verified by 10k+ teams</span>
                </div>
              </div>

              {/* Play demo glass pill overlay */}
              <div className="hero-play-glass-pill">
                <div className="play-glass-circle">
                  <Play size={13} fill="#fff" />
                </div>
                <span>Click to Tour Interactive Demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
