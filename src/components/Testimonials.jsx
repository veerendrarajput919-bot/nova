import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/data';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { NovaIcon } from './Navbar';

export function Testimonials() {
  const [filterCategory, setFilterCategory] = useState('All');
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const categories = ['All', 'Engineering', 'Product & Design', 'Leadership'];

  // Add category tags and impact badges to testimonials
  const enrichedTestimonials = testimonials.map((t, idx) => ({
    ...t,
    category: idx % 3 === 0 ? 'Engineering' : idx % 3 === 1 ? 'Product & Design' : 'Leadership',
    impactBadge: idx === 0 ? '🚀 4.2x Faster Sprints' : idx === 1 ? '⚡ 38 hrs Saved / Dev' : '🏢 $140k Annual ROI'
  }));

  const filtered = filterCategory === 'All'
    ? enrichedTestimonials
    : enrichedTestimonials.filter(t => t.category === filterCategory);

  const next = () => {
    setActiveIdx((prev) => (prev + 1) % (filtered.length || 1));
  };

  const prev = () => {
    setActiveIdx((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
  };

  useEffect(() => {
    if (!isAutoPlaying || filtered.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % filtered.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filtered.length]);

  return (
    <section className="section section-testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials-header-bar">
          <div>
            <div className="section-tag-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <NovaIcon size={14} glow={false} />
              <span>TESTIMONIALS & IMPACT</span>
            </div>
            <h2 className="section-title">Loved by High-Velocity Teams</h2>
            <p className="section-description">
              Real metrics from engineering leaders and product teams using NOVA.
            </p>
          </div>

          <div className="testimonials-carousel-arrows">
            <button
              className="carousel-arrow-btn"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="carousel-arrow-btn"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="testimonial-filter-ribbon">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`testimonial-cat-btn ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setFilterCategory(cat);
                setActiveIdx(0);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid with Interactive Focus */}
        <div
          className="testimonials-cards-grid"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {filtered.map((item, idx) => {
            const isHighlight = idx === activeIdx;
            return (
              <div
                key={item.id}
                className={`testimonial-card-clean ${isHighlight ? 'active-highlight' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <div className="testimonial-top-row">
                  <div className="testimonial-impact-pill">
                    {item.impactBadge}
                  </div>
                  <Quote size={20} className="testimonial-quote-icon" />
                </div>

                <p className="testimonial-clean-quote">"{item.quote}"</p>

                <div className="testimonial-clean-author">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="author-avatar-img"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div>
                    <div className="author-clean-name-row">
                      <span className="author-clean-name">{item.name}</span>
                      <CheckCircle2 size={13} className="verified-badge-icon" title="Verified Customer" />
                    </div>
                    <div className="author-clean-role">{item.role}</div>
                    <div className="testimonial-clean-stars">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#FBBF24" color="#FBBF24" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Customer Trust Stats */}
        <div className="testimonials-bottom-proof">
          <div className="proof-stat-item">
            <span className="proof-val">4.9 / 5.0</span>
            <div className="proof-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="#FBBF24" color="#FBBF24" />
              ))}
            </div>
            <span className="proof-desc">Average Rating across 1,200+ Reviews</span>
          </div>
          <div className="proof-stat-divider" />
          <div className="proof-stat-item">
            <span className="proof-val">99.4%</span>
            <span className="proof-desc">Net Customer Retention Rate</span>
          </div>
          <div className="proof-stat-divider" />
          <div className="proof-stat-item">
            <span className="proof-val">&lt; 3.2 mins</span>
            <span className="proof-desc">Average Onboarding Time</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
