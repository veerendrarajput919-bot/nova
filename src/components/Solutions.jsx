import React from 'react';
import { solutions } from '../data/data';
import { ArrowRight, Rocket, Megaphone, Globe2, Briefcase, UserCheck, Code2 } from 'lucide-react';
import { NovaIcon } from './Navbar';

const solutionIconMap = {
  Rocket,
  Megaphone,
  Globe2,
  Briefcase,
  UserCheck,
  Code2
};

export function SolutionCard({ solution, onSelect }) {
  const Icon = solutionIconMap[solution.icon] || Rocket;

  return (
    <div className="solution-clean-card" onClick={() => onSelect && onSelect(solution)}>
      <div
        className="solution-clean-icon-box"
        style={{ color: solution.color, background: `${solution.color}18` }}
      >
        <Icon size={20} />
      </div>

      <h3 className="solution-clean-title">{solution.title}</h3>
      <p className="solution-clean-desc">{solution.description}</p>
    </div>
  );
}

export function Solutions({ onSelectSolution, onExploreAll }) {
  return (
    <section className="section" id="solutions">
      <div className="container">
        <div className="solutions-layout-grid">
          {/* Left Column: Heading & CTA */}
          <div className="solutions-intro-col">
            <div className="section-tag-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <NovaIcon size={14} glow={false} />
              <span>SOLUTIONS</span>
            </div>

            <h2 className="solutions-main-title">
              Solutions for Every<br />
              Team & Industry
            </h2>

            <p className="solutions-main-desc">
              From startups to enterprises, NOVA adapts to your unique needs.
            </p>

            <button
              className="btn btn-hero-accent btn-sm"
              onClick={onExploreAll}
              style={{ marginTop: '24px' }}
            >
              Explore All Solutions
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right Column: 3-column Grid of Solution Cards */}
          <div className="solutions-cards-grid">
            {solutions.map((sol) => (
              <SolutionCard
                key={sol.id}
                solution={sol}
                onSelect={onSelectSolution}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Solutions;
