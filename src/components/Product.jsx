import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { NovaIcon } from './Navbar';

export function Product({ onExplore, onOpenDemo }) {
  const checklist = [
    'Intuitive drag-and-drop workspace layout',
    'Real-time multi-user team collaboration',
    'Automated task triage and sprint scheduling',
    'Custom dashboard widgets and analytics'
  ];

  return (
    <section className="section section-about" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Image 2 - Laptop Mockup on Desk */}
          <div className="about-visual-col" onClick={onOpenDemo} title="Click to view interactive workspace">
            <div className="about-image-wrapper">
              <img
                src="/images/about-laptop.webp"
                alt="NOVA AI Workspace on modern laptop"
                className="about-laptop-img"
              />
            </div>
          </div>

          {/* Right Column: About Details */}
          <div className="about-content-col">
            <div className="section-tag-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <NovaIcon size={14} glow={false} />
              <span>ABOUT NOVA</span>
            </div>

            <h2 className="about-title">Built for Modern Teams</h2>

            <p className="about-desc">
              NOVA combines the power of AI with intuitive design to help teams stay
              organized, automate the busy work, and focus on what really matters.
              Whether you're a startup or an enterprise, NOVA scales with your needs.
            </p>

            <div className="about-checklist">
              {checklist.map((item, index) => (
                <div key={index} className="about-check-row">
                  <div className="about-check-icon-circle">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button className="btn btn-dark-pill" onClick={onExplore}>
              Learn More
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
