import React, { useState } from 'react';
import {
  ArrowRight,
  UserPlus,
  Sliders,
  Rocket,
  GitPullRequest,
  Sparkles,
  CheckCircle2,
  Play,
  RotateCcw,
  MessageSquare,
  Zap,
  Workflow,
  Cpu
} from 'lucide-react';
import { NovaIcon } from './Navbar';
import confetti from 'canvas-confetti';

export function WorkflowSimulator() {
  const [activeWorkflowId, setActiveWorkflowId] = useState('pr-review');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [logs, setLogs] = useState([
    'System ready. Select a template and click "Test Run Pipeline" to simulate real-time AI automation.'
  ]);

  const workflows = [
    {
      id: 'pr-review',
      name: 'GitHub PR Auto-Review & Security',
      description: 'Triggered upon code commit. Analyzes diff, generates test mocks, and posts line-by-line review.',
      steps: [
        {
          id: 1,
          icon: GitPullRequest,
          title: 'Trigger: GitHub PR #142',
          desc: 'Feature/auth-jwt-refresh branch opened with 14 changed files',
          badge: 'Webhook Event',
          color: '#3B82F6'
        },
        {
          id: 2,
          icon: Cpu,
          title: 'NOVA AI Neural Engine',
          desc: 'Security scan, token complexity analysis & unit test generation',
          badge: 'GPT-4.5 Ultra',
          color: '#8B5CF6'
        },
        {
          id: 3,
          icon: CheckCircle2,
          title: 'Automated Actions Executed',
          desc: '100% test pass verified • Slack alert sent • Approval label applied',
          badge: 'Synced to CI/CD',
          color: '#10B981'
        }
      ]
    },
    {
      id: 'sprint-triage',
      name: 'Bug Report Auto-Triage & Assignment',
      description: 'Parses incoming customer issues, categorizes severity, and assigns to the right sprint backlog.',
      steps: [
        {
          id: 1,
          icon: MessageSquare,
          title: 'Trigger: Zendesk & Sentry Alert',
          desc: 'Unhandled exception on payment checkout modal received',
          badge: 'Crash Log',
          color: '#F59E0B'
        },
        {
          id: 2,
          icon: Sparkles,
          title: 'AI Root-Cause Inference',
          desc: 'Maps stack trace to Stripe Webhook SDK v4.1 mismatch',
          badge: 'AI Diagnostic',
          color: '#8B5CF6'
        },
        {
          id: 3,
          icon: Zap,
          title: 'Linear Issue Created & Assigned',
          desc: 'Priority set to P0 • Assigned to Core Backend Lead with fix patch',
          badge: 'Resolved in 2.1s',
          color: '#10B981'
        }
      ]
    },
    {
      id: 'meeting-notes',
      name: 'Meeting Voice to Actionable Epics',
      description: 'Listens to team standups, summarizes decisions, and creates Jira tasks automatically.',
      steps: [
        {
          id: 1,
          icon: MessageSquare,
          title: 'Trigger: Google Meet Recording',
          desc: '30-minute Sprint #14 Retrospective audio stream ingested',
          badge: 'Audio Stream',
          color: '#EC4899'
        },
        {
          id: 2,
          icon: Cpu,
          title: 'Semantic Entity Extraction',
          desc: 'Extracts 6 action items, assignees, deadlines, and blocker flags',
          badge: 'NLP Engine',
          color: '#8B5CF6'
        },
        {
          id: 3,
          icon: CheckCircle2,
          title: 'Tasks Synced & Team Notified',
          desc: 'Notion document updated • Summary email sent to 12 stakeholders',
          badge: 'Done in 1.4s',
          color: '#10B981'
        }
      ]
    }
  ];

  const currentWorkflow = workflows.find(w => w.id === activeWorkflowId) || workflows[0];

  const handleRunPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStepIndex(0);
    setLogs([`🚀 [0.0s] Trigger received: ${currentWorkflow.steps[0].title}`]);

    setTimeout(() => {
      setActiveStepIndex(1);
      setLogs(prev => [
        ...prev,
        `⚡ [0.4s] Neural Engine processing: Analyzing context and synthesizing actions...`
      ]);
    }, 1000);

    setTimeout(() => {
      setActiveStepIndex(2);
      setLogs(prev => [
        ...prev,
        `✓ [0.9s] Execution Complete: ${currentWorkflow.steps[2].desc}`
      ]);
      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.65 }
      });
      setIsRunning(false);
    }, 2200);
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStepIndex(-1);
    setLogs(['Pipeline reset. Ready for new execution test.']);
  };

  return (
    <div className="workflow-simulator-container">
      {/* Template Selector Tabs */}
      <div className="workflow-selector-pills">
        {workflows.map((wf) => (
          <button
            key={wf.id}
            className={`workflow-template-btn ${activeWorkflowId === wf.id ? 'active' : ''}`}
            onClick={() => {
              setActiveWorkflowId(wf.id);
              setActiveStepIndex(-1);
              setLogs([`Switched to "${wf.name}". Ready to test run.`]);
            }}
          >
            <Workflow size={15} />
            <span>{wf.name}</span>
          </button>
        ))}
      </div>

      <div className="workflow-simulator-card">
        {/* Header Controls */}
        <div className="workflow-card-header">
          <div>
            <h4 className="workflow-card-title">{currentWorkflow.name}</h4>
            <p className="workflow-card-desc">{currentWorkflow.description}</p>
          </div>

          <div className="workflow-action-buttons">
            <button
              className={`btn btn-hero-primary btn-sm ${isRunning ? 'running' : ''}`}
              onClick={handleRunPipeline}
              disabled={isRunning}
            >
              <Play size={14} fill="currentColor" />
              <span>{isRunning ? 'Processing AI Pipeline...' : 'Test Run Pipeline'}</span>
            </button>

            {activeStepIndex >= 0 && (
              <button
                className="btn btn-hero-secondary btn-sm"
                onClick={handleReset}
                title="Reset simulation"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Visual Pipeline Nodes */}
        <div className="pipeline-nodes-wrapper">
          {currentWorkflow.steps.map((step, idx) => {
            const Icon = step.icon;
            const isStepActive = activeStepIndex === idx;
            const isStepPassed = activeStepIndex > idx;

            return (
              <React.Fragment key={step.id}>
                {/* Node Box */}
                <div
                  className={`pipeline-node-box ${isStepActive ? 'active-pulse' : ''} ${isStepPassed ? 'passed' : ''}`}
                >
                  <div className="pipeline-node-top">
                    <div
                      className="pipeline-node-icon"
                      style={{ background: step.color }}
                    >
                      <Icon size={18} color="#fff" />
                    </div>
                    <span className="pipeline-node-badge">{step.badge}</span>
                  </div>

                  <h5 className="pipeline-node-title">{step.title}</h5>
                  <p className="pipeline-node-text">{step.desc}</p>

                  <div className="pipeline-node-status">
                    {isStepPassed && <span className="status-badge passed">✓ Completed (0.{idx + 2}s)</span>}
                    {isStepActive && <span className="status-badge running">⚡ Executing AI...</span>}
                    {!isStepPassed && !isStepActive && <span className="status-badge idle">Standby</span>}
                  </div>
                </div>

                {/* Connector Arrow */}
                {idx < currentWorkflow.steps.length - 1 && (
                  <div className={`pipeline-connector ${activeStepIndex >= idx ? 'connector-active' : ''}`}>
                    <div className="connector-line">
                      <div className="connector-pulse-dot" />
                    </div>
                    <ArrowRight size={18} className="connector-arrow-icon" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Live Execution Terminal Output */}
        <div className="workflow-terminal-box">
          <div className="terminal-header-bar">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">NOVA Pipeline Execution Terminal (Live)</span>
          </div>
          <div className="terminal-body-content">
            {logs.map((log, i) => (
              <div key={i} className="terminal-log-line">
                <span className="terminal-prompt-symbol">$</span> {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks({ onStart }) {
  const steps = [
    {
      num: 1,
      icon: UserPlus,
      title: '1. Connect Your Stack',
      desc: 'Connect GitHub, Linear, Slack, and Figma in 1 click with zero config.'
    },
    {
      num: 2,
      icon: Sliders,
      title: '2. AI Learns Your Workflow',
      desc: 'NOVA maps dependencies, sprint cycles, and automated code review guidelines.'
    },
    {
      num: 3,
      icon: Rocket,
      title: '3. Accelerate Delivery',
      desc: 'Save 40% time on routine tasks and ship high-impact features faster.'
    }
  ];

  return (
    <section className="section section-how-it-works" id="how-it-works">
      <div className="container">
        <div className="how-it-works-header">
          <div className="section-tag-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <NovaIcon size={14} glow={false} />
            <span>HOW NOVA POWERS YOUR TEAM</span>
          </div>
          <h2 className="section-title">Get Started in 3 Simple Steps</h2>
          <p className="section-description">
            Set up in minutes and watch AI take over routine administrative tasks.
          </p>
        </div>

        {/* 3 Step Flow Pills */}
        <div className="steps-flow-container">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.num}>
                <div
                  className="step-flow-item interactive-step-item"
                  onClick={onStart}
                  role="button"
                  tabIndex={0}
                  title="Click to get started"
                >
                  <div className="step-icon-badge">
                    <Icon size={18} />
                  </div>
                  <h3 className="step-flow-title">{step.title}</h3>
                  <p className="step-flow-desc">{step.desc}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="step-flow-arrow" aria-hidden="true">
                    <ArrowRight size={22} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Interactive Live Workflow Simulator Pipeline Showcase */}
        <div className="how-workflow-simulator-wrapper">
          <div className="simulator-intro-header">
            <h3 className="simulator-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <NovaIcon size={18} />
              <span>Interactive Pipeline Demonstration</span>
            </h3>
            <p className="simulator-subtitle">
              Test run an end-to-end automated workflow below to see how NOVA's neural engine executes in real-time.
            </p>
          </div>

          <WorkflowSimulator />
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
