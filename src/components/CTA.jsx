import React from 'react';
import { ArrowRight } from 'lucide-react';

export function CTA({ onStart }) {
  return (
    <section className="section" id="cta" style={{ paddingTop: '40px', paddingBottom: '70px' }}>
      <div className="container">
        <div className="cta-gradient-banner">
          <div className="cta-content-left">
            <span className="cta-banner-tag">READY TO GET STARTED?</span>
            <h2 className="cta-banner-title">Ready to Boost Your Productivity?</h2>
            <p className="cta-banner-desc">
              Join thousands of teams already using NOVA to work smarter, not harder.
            </p>
          </div>

          <div className="cta-actions-right">
            <button className="btn btn-white-pill" onClick={onStart}>
              Get Started Free
              <ArrowRight size={16} />
            </button>
            <span className="cta-sub-note">No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
