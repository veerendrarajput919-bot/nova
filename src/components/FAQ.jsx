import React, { useState } from 'react';
import { faqs } from '../data/data';
import { Plus, Minus, Mail, ArrowRight, Search, HelpCircle } from 'lucide-react';
import { NovaIcon } from './Navbar';

export function FAQ({ onContactSupport }) {
  const [openFAQ, setOpenFAQ] = useState('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'General', 'Security & AI', 'Pricing & Billing'];

  const enrichedFaqs = faqs.map((faq, idx) => ({
    ...faq,
    category: idx % 3 === 0 ? 'General' : idx % 3 === 1 ? 'Security & AI' : 'Pricing & Billing'
  }));

  const filteredFaqs = enrichedFaqs.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggle = (id) => {
    setOpenFAQ((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section section-faq" id="faq">
      <div className="container">
        <div className="faq-layout-split">
          {/* Left Column: Heading, Search & Accordion */}
          <div className="faq-main-col">
            <div className="section-tag-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <NovaIcon size={14} glow={false} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="section-title">Answers to Common Questions</h2>
            <p className="section-description" style={{ marginBottom: '24px' }}>
              Find quick answers about NOVA's AI engine, security standards, and subscription plans.
            </p>

            {/* Live Search & Filter Bar */}
            <div className="faq-filter-container">
              <div className="faq-search-input-box">
                <Search size={16} className="faq-search-icon" />
                <input
                  type="text"
                  placeholder="Search questions (e.g., security, tokens, trial)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="faq-search-field"
                />
                {searchQuery && (
                  <button
                    className="faq-clear-search-btn"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="faq-category-pills">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`faq-cat-pill ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion List */}
            <div className="faq-clean-list">
              {filteredFaqs.length === 0 ? (
                <div className="faq-empty-state">
                  <HelpCircle size={28} opacity={0.4} />
                  <p>No questions matched "{searchQuery}"</p>
                  <button
                    className="btn btn-hero-secondary btn-sm"
                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isOpen = openFAQ === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`faq-clean-item ${isOpen ? 'active-faq' : ''}`}
                    >
                      <button
                        className="faq-clean-trigger"
                        onClick={() => toggle(faq.id)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-question-text">{faq.question}</span>
                        <span className="faq-toggle-icon">
                          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="faq-clean-body">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Still Have Questions Card */}
          <div className="faq-sidebar-col">
            <div className="still-questions-card">
              <div className="still-questions-icon-box">
                <Mail size={24} />
              </div>
              <h3 className="still-questions-title">Still have questions?</h3>
              <p className="still-questions-desc">
                Our product specialists and 24/7 technical architects are ready to assist you.
              </p>
              <button
                className="btn btn-hero-accent btn-sm"
                onClick={onContactSupport}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Chat with Specialist</span>
                <ArrowRight size={15} />
              </button>
              <div className="support-response-tag">
                ⚡ Avg. response time: &lt; 5 minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
