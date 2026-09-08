import React, { useRef, useEffect, useState } from 'react';
import { Check, ArrowRight, Zap, Shield, Users, BarChart3, Sparkles, Play } from 'lucide-react';
import { NovaIcon } from './Navbar';

const STATS = [
  { value: '10x', label: 'Faster Delivery' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '40%', label: 'Cost Reduction' },
];

const FEATURES_PILLS = [
  { icon: <Zap size={13} />, label: 'AI-Powered' },
  { icon: <Users size={13} />, label: 'Real-time Collab' },
  { icon: <Shield size={13} />, label: 'Enterprise Secure' },
  { icon: <BarChart3 size={13} />, label: 'Smart Analytics' },
];

export function Product({ onExplore, onOpenDemo }) {
  const checklist = [
    'Intuitive drag-and-drop workspace layout',
    'Real-time multi-user team collaboration',
    'Automated task triage and sprint scheduling',
    'Custom dashboard widgets and analytics',
  ];

  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section-about" id="about" ref={sectionRef}>
      {/* Background blobs */}
      <div className="about-bg-blob about-bg-blob-left" />
      <div className="about-bg-blob about-bg-blob-right" />

      <div className="container">
        {/* Header */}
        <div className={`about-header ${inView ? 'about-anim-in' : 'about-anim-out'}`}>
          <div className="section-tag-pill">
            <NovaIcon size={14} glow={false} />
            <span>ABOUT NOVA</span>
          </div>
          <h2 className="about-heading">
            The AI workspace<br />
            <span className="about-heading-accent">built for modern teams</span>
          </h2>
          <p className="about-subtext">
            NOVA combines the power of AI with intuitive design so teams stay organised,
            automate repetitive work, and focus on what really matters.
          </p>
        </div>

        {/* Main grid */}
        <div className={`about-grid ${inView ? 'about-anim-in' : 'about-anim-out'}`} style={{ animationDelay: '0.1s' }}>

          {/* LEFT — Visual */}
          <div className="about-visual-col" onClick={onOpenDemo} title="Click to view interactive workspace">
            <div className="about-image-wrapper">
              <div className="about-visual-glow-ring" />
              <img
                src="/images/about-laptop.webp"
                alt="NOVA AI Workspace on modern laptop"
                className="about-laptop-img"
              />

              {/* Floating live chip */}
              <div className="about-floating-chip">
                <span className="live-pulse-dot" />
                <span>Multi-Cursor Collaboration Active</span>
              </div>

              {/* Play overlay hint */}
              <div className="about-play-overlay">
                <div className="about-play-btn">
                  <Play size={20} fill="currentColor" />
                </div>
                <span>Watch Demo</span>
              </div>
            </div>

            {/* Mini stat cards */}
            <div className="about-stat-cards">
              {STATS.map((s, i) => (
                <div className="about-stat-card" key={i}>
                  <span className="about-stat-value">{s.value}</span>
                  <span className="about-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="about-content-col">
            {/* Feature pills */}
            <div className="about-feature-pills">
              {FEATURES_PILLS.map((p, i) => (
                <span className="about-feature-pill" key={i}>
                  {p.icon}
                  {p.label}
                </span>
              ))}
            </div>

            {/* Checklist */}
            <div className="about-checklist">
              {checklist.map((item, index) => (
                <div key={index} className="about-check-row" style={{ animationDelay: `${0.15 + index * 0.07}s` }}>
                  <div className="about-check-icon-circle">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="about-desc">
              Whether you're a startup or an enterprise, NOVA scales with your needs —
              from solo sprints to thousand-person org-wide rollouts.
            </p>

            {/* CTA row */}
            <div className="about-cta-row">
              <button className="btn btn-hero-primary" onClick={onExplore}>
                <Sparkles size={16} />
                <span>Start Exploring NOVA</span>
                <ArrowRight size={16} />
              </button>
              <button className="about-demo-link" onClick={onOpenDemo}>
                Watch a 2-min demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
