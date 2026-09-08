import React, { useState, useRef } from 'react';
import { features } from '../data/data';
import {
  ArrowRight,
  ShieldCheck,
  FolderKanban,
  Zap,
  Users,
  Sparkles,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { NovaIcon } from './Navbar';
import confetti from 'canvas-confetti';

const featureIconMap = {
  FolderKanban,
  Zap,
  Users,
  Sparkles,
  Clock,
  ShieldCheck
};

export function FeatureCard({ feature, onSelect, isSelected }) {
  const IconComponent = featureIconMap[feature.icon] || Sparkles;
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransformStyle(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`);
    setGlareStyle({
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.12) 0%, transparent 60%)`
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    setGlareStyle({});
  };

  return (
    <div
      ref={cardRef}
      className={`feature-card-clean ${isSelected ? 'active-feature-card' : ''}`}
      onClick={() => onSelect(feature)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: 'transform 0.15s ease-out, border-color 0.2s ease, box-shadow 0.2s ease' }}
    >
      <div className="card-glare-overlay" style={glareStyle} />

      <div className="feature-card-top-row">
        <div
          className="feature-clean-icon-box"
          style={{ background: feature.bgColor, color: feature.color }}
        >
          <IconComponent size={22} />
        </div>
        <div className="feature-interactive-pill">
          <span>Live Demo</span>
          <ArrowUpRight size={12} />
        </div>
      </div>

      <div className="feature-card-text-block">
        <h3 className="feature-clean-title">{feature.title}</h3>
        <p className="feature-clean-desc">{feature.description}</p>
      </div>

      <div className="feature-card-bottom-strip">
        <span className="feature-try-link">Explore in Playground →</span>
      </div>
    </div>
  );
}

export function Features({ onSelectFeature, onExploreAll }) {
  const [selectedFeatureId, setSelectedFeatureId] = useState(features[0]?.id || 'f1');
  const [kanbanTasks, setKanbanTasks] = useState([
    { id: 'k1', title: 'Implement AI Smart Triage', col: 'in-progress' },
    { id: 'k2', title: 'Configure OAuth 2.0 & SAML', col: 'done' },
    { id: 'k3', title: 'Automate Weekly Standup Summaries', col: 'todo' }
  ]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1480);

  const selectedFeature = features.find(f => f.id === selectedFeatureId) || features[0];

  const handleCardClick = (feature) => {
    setSelectedFeatureId(feature.id);
    if (onSelectFeature) onSelectFeature(feature);
  };

  const moveKanbanTask = (taskId, targetCol) => {
    setKanbanTasks(tasks =>
      tasks.map(t => (t.id === taskId ? { ...t, col: targetCol } : t))
    );
    if (targetCol === 'done') {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }
  };

  return (
    <section className="section section-features" id="features">
      <div className="container">
        {/* Section Header */}
        <div className="features-section-header">
          <div className="section-tag-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <NovaIcon size={14} glow={false} />
            <span>INTERACTIVE FEATURE SUITE</span>
          </div>
          <h2 className="section-title">Everything You Need to Boost Productivity</h2>
          <p className="section-description">
            Explore our modular engine. Hover or click any card to test the interactive feature simulator below.
          </p>
        </div>

        {/* 6 Feature Cards Grid with 3D Hover Tilt */}
        <div className="features-cards-grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isSelected={selectedFeatureId === feature.id}
              onSelect={handleCardClick}
            />
          ))}
        </div>

        {/* Interactive Feature Playground Sandbox */}
        <div className="feature-playground-panel">
          <div className="playground-header-bar">
            <div className="playground-title-area">
              <span className="playground-live-badge">FEATURE PLAYGROUND</span>
              <h3 className="playground-active-title">
                Active Simulation: <span>{selectedFeature.title}</span>
              </h3>
            </div>
            <div className="playground-tabs-selector">
              {features.map((f) => (
                <button
                  key={f.id}
                  className={`playground-pill-tab ${selectedFeatureId === f.id ? 'active' : ''}`}
                  onClick={() => handleCardClick(f)}
                >
                  {f.title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Feature Simulator Area */}
          <div className="playground-interactive-body">
            {/* 1. Project Management Interactive Kanban */}
            {selectedFeature.id === 'project-management' && (
              <div className="playground-kanban-board">
                <div className="playground-kanban-cols">
                  {['todo', 'in-progress', 'done'].map((col) => (
                    <div key={col} className="kanban-col-lane">
                      <div className="kanban-lane-header">
                        <span className={`lane-status-dot ${col}`} />
                        <span className="lane-title">
                          {col === 'todo' ? 'To Do' : col === 'in-progress' ? 'In Progress' : 'Completed (Done)'}
                        </span>
                        <span className="lane-counter">
                          {kanbanTasks.filter(t => t.col === col).length}
                        </span>
                      </div>
                      <div className="kanban-cards-stack">
                        {kanbanTasks.filter(t => t.col === col).map((task) => (
                          <div key={task.id} className="kanban-interactive-card">
                            <span className="kanban-task-title">{task.title}</span>
                            <div className="kanban-actions-row">
                              {col !== 'todo' && (
                                <button
                                  className="kanban-move-btn"
                                  onClick={() => moveKanbanTask(task.id, col === 'done' ? 'in-progress' : 'todo')}
                                  title="Move backwards"
                                >
                                  ←
                                </button>
                              )}
                              {col !== 'done' && (
                                <button
                                  className="kanban-move-btn next"
                                  onClick={() => moveKanbanTask(task.id, col === 'todo' ? 'in-progress' : 'done')}
                                  title="Move forwards"
                                >
                                  Advance →
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Task Automation Simulator */}
            {selectedFeature.id === 'task-automation' && (
              <div className="playground-automation-view">
                <div className="automation-recipe-card">
                  <div className="recipe-badge">ACTIVE RECIPE #1</div>
                  <div className="recipe-flow-row">
                    <span className="recipe-tag tag-blue">IF: GitHub PR Merged</span>
                    <span className="recipe-arrow">➔</span>
                    <span className="recipe-tag tag-purple">NOVA AI Agent</span>
                    <span className="recipe-arrow">➔</span>
                    <span className="recipe-tag tag-green">THEN: Close Jira Sprint Ticket & Notify Slack</span>
                  </div>
                  <div className="recipe-status-pill">
                    <span className="pulse-dot-green" />
                    <span>Triggered 142 times today • 0.3s avg execution</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Team Collaboration Simulator */}
            {selectedFeature.id === 'team-collab' && (
              <div className="playground-collab-view">
                <div className="collab-active-avatars">
                  <div className="avatar-chip user-1">
                    <div className="avatar-ring">AR</div>
                    <span>Alex Rivera (Editing Sprint #14)</span>
                    <span className="cursor-tag tag-blue">Typing...</span>
                  </div>
                  <div className="avatar-chip user-2">
                    <div className="avatar-ring">SL</div>
                    <span>Sarah L. (Reviewing PR specs)</span>
                    <span className="cursor-tag tag-purple">Live Cursor</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. AI Assistant Synthesizer */}
            {selectedFeature.id === 'ai-assistant' && (
              <div className="playground-ai-view">
                <div className="playground-ai-demo-card">
                  <div className="ai-demo-prompt">
                    <span className="ai-user-chip">User:</span>
                    <span>"Summarize key takeaways from yesterday's product council meeting"</span>
                  </div>
                  <div className="ai-demo-response">
                    <NovaIcon size={16} glow={false} />
                    <div>
                      <strong>NOVA AI Synthesizer:</strong>
                      <ul>
                        <li>Target Q3 launch set for October 14th with SOC-2 compliance.</li>
                        <li>Allocated 3 engineers to mobile performance optimizations.</li>
                        <li>Automated sprint velocity tracking connected to Linear.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Time Tracking Playground */}
            {selectedFeature.id === 'time-tracking' && (
              <div className="playground-time-view">
                <div className="time-tracker-widget">
                  <div className="tracker-timer-display">
                    <span className="timer-digits">
                      {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                    </span>
                    <span className="timer-task-name">Sprint #14 - AI Engine Pipeline</span>
                  </div>
                  <button
                    className={`btn ${timerRunning ? 'btn-hero-secondary' : 'btn-hero-primary'}`}
                    onClick={() => setTimerRunning(!timerRunning)}
                  >
                    {timerRunning ? 'Pause Timer' : 'Start Focus Session'}
                  </button>
                </div>
              </div>
            )}

            {/* 6. Security Playground */}
            {selectedFeature.id === 'secure-reliable' && (
              <div className="playground-security-view">
                <div className="security-badges-grid">
                  <div className="security-audit-card">
                    <ShieldCheck size={28} className="text-green-500" />
                    <h4>SOC-2 Type II Certified</h4>
                    <p>Continuous automated compliance monitoring across all cloud regions.</p>
                  </div>
                  <div className="security-audit-card">
                    <ShieldCheck size={28} className="text-blue-500" />
                    <h4>End-to-End Encryption</h4>
                    <p>AES-256 at rest, TLS 1.3 in transit with private KMS keys.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Explore All Features CTA Bar */}
        <div className="features-bottom-action">
          <button className="btn btn-hero-accent btn-md" onClick={onExploreAll}>
            <span>Explore All 24+ AI Modules</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Features;
