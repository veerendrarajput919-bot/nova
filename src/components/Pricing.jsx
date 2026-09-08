import React, { useState } from 'react';
import { pricingPlans } from '../data/data';
import {
  ChevronDown,
  ChevronUp,
  Check,
  Calculator,
  TrendingUp,
  Clock,
  ArrowRight,
  Zap
} from 'lucide-react';
import { NovaIcon } from './Navbar';
import confetti from 'canvas-confetti';

export function PricingCard({ plan, isAnnual, onSelectPlan }) {
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <div className={`pricing-card-clean ${plan.popular ? 'pricing-card-clean-popular' : ''}`}>
      {plan.popular && (
        <div className="popular-badge-pill">
          {plan.badge}
        </div>
      )}

      <div>
        <h3 className="plan-clean-name">{plan.name}</h3>
        <p className="plan-clean-subtitle">{plan.subtitle}</p>

        <div className="plan-clean-price-box">
          <span className="price-dollar">$</span>
          <span className="price-val">{price}</span>
          <span className="price-sub">/month</span>
        </div>

        <button
          className={`btn ${plan.popular ? 'btn-plan-primary' : 'btn-plan-dark'}`}
          onClick={() => onSelectPlan && onSelectPlan(plan)}
        >
          {plan.ctaText}
        </button>
      </div>

      <div className="plan-clean-features">
        {plan.features.map((feat, idx) => (
          <div key={idx} className="plan-feature-row">
            <Check size={15} className="plan-check-icon" strokeWidth={2.5} />
            <span>{feat.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RoiCalculator({ onGetStarted }) {
  const [teamSize, setTeamSize] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(65);
  const [weeklyHours, setWeeklyHours] = useState(8);

  // Calculations
  const hoursSavedPerYear = Math.round(teamSize * weeklyHours * 48 * 0.70);
  const totalDollarSavings = Math.round(hoursSavedPerYear * hourlyRate);
  const monthlyCostEstimate = teamSize * 15;
  const netAnnualBenefit = totalDollarSavings - (monthlyCostEstimate * 12);
  const roiMultiplier = ((totalDollarSavings / (monthlyCostEstimate * 12 || 1))).toFixed(1);

  const applyPreset = (size, rate, hours) => {
    setTeamSize(size);
    setHourlyRate(rate);
    setWeeklyHours(hours);
  };

  const handleClaimRoi = () => {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onGetStarted) {
      onGetStarted(teamSize);
    }
  };

  return (
    <section className="section section-roi" id="roi-calculator">
      <div className="container">
        <div className="roi-section-header">
          <div className="section-tag-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <NovaIcon size={14} glow={false} />
            <span>PRODUCTIVITY ROI CALCULATOR</span>
          </div>
          <h2 className="section-title">Calculate Your Team's Return on Investment</h2>
          <p className="section-description">
            See how much time and budget NOVA AI saves your team by automating routine tasks, sprint planning, and cross-tool synchronizations.
          </p>
        </div>

        {/* Preset Team Templates */}
        <div className="roi-preset-ribbon">
          <span className="roi-preset-title">Quick Presets:</span>
          <button
            className={`roi-preset-pill ${teamSize === 6 ? 'active' : ''}`}
            onClick={() => applyPreset(6, 55, 6)}
          >
            🚀 Startup (6 members)
          </button>
          <button
            className={`roi-preset-pill ${teamSize === 25 ? 'active' : ''}`}
            onClick={() => applyPreset(25, 75, 8)}
          >
            ⚡ Growth Team (25 members)
          </button>
          <button
            className={`roi-preset-pill ${teamSize === 100 ? 'active' : ''}`}
            onClick={() => applyPreset(100, 95, 10)}
          >
            🏢 Enterprise (100 members)
          </button>
        </div>

        <div className="roi-calculator-grid">
          {/* Left Column: Interactive Sliders */}
          <div className="roi-controls-card">
            <h3 className="roi-card-heading">
              <Calculator size={18} />
              <span>Team Parameters</span>
            </h3>

            {/* Slider 1: Team Size */}
            <div className="roi-slider-group">
              <div className="roi-slider-label-row">
                <span className="roi-slider-title">Team Size</span>
                <span className="roi-slider-value-badge">{teamSize} members</span>
              </div>
              <input
                type="range"
                min="2"
                max="200"
                step="1"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="roi-range-input"
              />
              <div className="roi-slider-scale">
                <span>2</span>
                <span>50</span>
                <span>100</span>
                <span>200+</span>
              </div>
            </div>

            {/* Slider 2: Hourly Rate */}
            <div className="roi-slider-group">
              <div className="roi-slider-label-row">
                <span className="roi-slider-title">Avg. Hourly Cost per Member</span>
                <span className="roi-slider-value-badge">${hourlyRate} / hr</span>
              </div>
              <input
                type="range"
                min="25"
                max="200"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="roi-range-input"
              />
              <div className="roi-slider-scale">
                <span>$25</span>
                <span>$75</span>
                <span>$125</span>
                <span>$200</span>
              </div>
            </div>

            {/* Slider 3: Hours Lost */}
            <div className="roi-slider-group">
              <div className="roi-slider-label-row">
                <span className="roi-slider-title">Weekly Hours on Repetitive Tasks</span>
                <span className="roi-slider-value-badge">{weeklyHours} hrs / dev / wk</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="roi-range-input"
              />
              <div className="roi-slider-scale">
                <span>2h</span>
                <span>8h</span>
                <span>14h</span>
                <span>20h</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results & Impact Dashboard */}
          <div className="roi-results-card">
            <div className="roi-results-glow-accent" />

            <div className="roi-results-top">
              <div className="roi-hero-metric-label">Estimated Annual Savings</div>
              <div className="roi-hero-metric-number">
                ${totalDollarSavings.toLocaleString()}
                <span className="roi-hero-metric-sub">/ year</span>
              </div>
              <p className="roi-hero-metric-caption">
                Net gain after NOVA AI subscription: <strong>+${netAnnualBenefit.toLocaleString()}/yr</strong>
              </p>
            </div>

            <div className="roi-metrics-trio">
              <div className="roi-trio-card">
                <div className="roi-trio-icon">
                  <Clock size={16} />
                </div>
                <div className="roi-trio-val">{hoursSavedPerYear.toLocaleString()} hrs</div>
                <div className="roi-trio-lbl">Team Time Recovered / Yr</div>
              </div>

              <div className="roi-trio-card">
                <div className="roi-trio-icon" style={{ color: '#10B981' }}>
                  <TrendingUp size={16} />
                </div>
                <div className="roi-trio-val" style={{ color: '#10B981' }}>{roiMultiplier}x</div>
                <div className="roi-trio-lbl">Estimated ROI Multiple</div>
              </div>

              <div className="roi-trio-card">
                <div className="roi-trio-icon" style={{ color: '#6366F1' }}>
                  <Zap size={16} />
                </div>
                <div className="roi-trio-val" style={{ color: '#6366F1' }}>+35%</div>
                <div className="roi-trio-lbl">Faster Feature Delivery</div>
              </div>
            </div>

            <div className="roi-cta-box">
              <button
                className="btn btn-hero-primary btn-lg"
                onClick={handleClaimRoi}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Unlock These Savings for {teamSize} Members</span>
                <ArrowRight size={17} />
              </button>
              <div className="roi-guarantee-text">
                ✓ 14-day full access trial • No credit card required • Instant setup
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pricing({ onSelectPlan }) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [showComparison, setShowComparison] = useState(false);

  const handleToggleAnnual = (val) => {
    setIsAnnual(val);
    if (val) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const comparisonFeatures = [
    { category: 'AI Copilot & Automation', features: [
      { name: 'AI Sprint Backlog Generation', starter: true, pro: true, enterprise: true },
      { name: 'AI Token Limit per Month', starter: '50,000', pro: '500,000', enterprise: 'Unlimited' },
      { name: 'Automated PR Code Review & QA', starter: false, pro: true, enterprise: true },
      { name: 'Custom AI Automation Rules', starter: '3 rules', pro: '50 rules', enterprise: 'Unlimited' },
    ]},
    { category: 'Collaboration & Governance', features: [
      { name: 'Team Member Seats', starter: 'Up to 5', pro: 'Up to 50', enterprise: 'Unlimited' },
      { name: 'Real-time Multi-cursor Editing', starter: true, pro: true, enterprise: true },
      { name: 'SAML 2.0 Single Sign-On (SSO)', starter: false, pro: false, enterprise: true },
      { name: 'Custom Roles & RBAC Permissions', starter: false, pro: true, enterprise: true },
    ]},
    { category: 'Security & Support', features: [
      { name: 'SOC-2 Type II Report Access', starter: false, pro: true, enterprise: true },
      { name: 'Data Residency in US/EU', starter: false, pro: true, enterprise: true },
      { name: 'Support SLA Response Time', starter: '24-48 hrs', pro: '< 4 hrs', enterprise: '< 15 mins (24/7)' },
      { name: 'Dedicated Customer Success Manager', starter: false, pro: false, enterprise: true },
    ]}
  ];

  return (
    <section className="section section-pricing" id="pricing">
      <div className="container">
        <div className="pricing-section-top-bar">
          <div>
            <div className="section-tag-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <NovaIcon size={14} glow={false} />
              <span>TRANSPARENT PRICING</span>
            </div>
            <h2 className="section-title">Simple, Predictable Plans</h2>
            <p className="section-description">
              Choose the perfect plan for your team. Switch or cancel anytime with zero friction.
            </p>
          </div>

          {/* Monthly / Annual Pill Toggle */}
          <div className="pricing-segment-switch">
            <button
              className={`segment-btn ${!isAnnual ? 'active' : ''}`}
              onClick={() => handleToggleAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`segment-btn ${isAnnual ? 'active' : ''}`}
              onClick={() => handleToggleAnnual(true)}
            >
              Annual <span className="save-badge-inline">Save 20% 🎉</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-clean-grid">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isAnnual={isAnnual}
              onSelectPlan={onSelectPlan}
            />
          ))}
        </div>

        {/* Comparison Toggle Button */}
        <div className="pricing-compare-toggle-bar">
          <button
            className="btn-compare-expand"
            onClick={() => setShowComparison(!showComparison)}
          >
            <span>{showComparison ? 'Hide Detailed Feature Comparison' : 'Compare All Plan Features & Limits'}</span>
            {showComparison ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Collapsible Comparison Table */}
        {showComparison && (
          <div className="pricing-comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="col-feat-name">Plan Feature</th>
                  <th className="col-plan-header">Starter ($0)</th>
                  <th className="col-plan-header popular-col">Pro ($29)</th>
                  <th className="col-plan-header">Enterprise ($99)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((sec, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <tr className="table-category-row">
                      <td colSpan={4}>{sec.category}</td>
                    </tr>
                    {sec.features.map((feat, fIdx) => (
                      <tr key={fIdx} className="table-data-row">
                        <td className="feat-title-cell">{feat.name}</td>
                        <td className="feat-val-cell">
                          {typeof feat.starter === 'boolean' ? (
                            feat.starter ? <Check size={16} className="text-green-500" /> : <span className="dash-null">—</span>
                          ) : (
                            <span>{feat.starter}</span>
                          )}
                        </td>
                        <td className="feat-val-cell popular-cell">
                          {typeof feat.pro === 'boolean' ? (
                            feat.pro ? <Check size={16} className="text-blue-500 font-bold" /> : <span className="dash-null">—</span>
                          ) : (
                            <strong>{feat.pro}</strong>
                          )}
                        </td>
                        <td className="feat-val-cell">
                          {typeof feat.enterprise === 'boolean' ? (
                            feat.enterprise ? <Check size={16} className="text-purple-500 font-bold" /> : <span className="dash-null">—</span>
                          ) : (
                            <strong>{feat.enterprise}</strong>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Pricing;
