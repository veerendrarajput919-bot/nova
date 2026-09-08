import React, { useState, useEffect, useRef } from 'react';
import Navbar, { NovaIcon } from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import Product from './components/Product';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import Pricing, { RoiCalculator } from './components/Pricing';
import Solutions from './components/Solutions';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer, { GithubIcon } from './components/Footer';
import {
  X,
  Play,
  Pause,
  Volume2,
  Maximize2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowUp,
  Mail,
  Lock,
  User,
  Search,
  Sun,
  Moon,
  Zap,
  Calculator,
  Workflow,
  HelpCircle,
  Copy,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

// 1. Theme Management Hook
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('nova_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('nova_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
}

// 2. Global Toast Notification Component
function Toast({ message, visible, onHide }) {
  if (!visible) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast-box">
        <NovaIcon size={20} />
        <span>{message}</span>
        {onHide && (
          <button
            onClick={onHide}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '2px', display: 'flex' }}
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

// 3. Floating Back to Top Button
function BackToTop() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 320);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`back-to-top-btn ${isScrolled ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top of page"
      title="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}

// 4. Real-time Live Activity Toast Ticker
function LiveActivityToast({ onOpenDemo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  const activities = [
    {
      id: 1,
      name: 'Sarah L.',
      company: 'Stripe',
      action: 'automated 24 PR reviews with NOVA',
      time: 'Just now',
      avatar: 'SL',
      color: '#3B82F6'
    },
    {
      id: 2,
      name: 'Marcus K.',
      company: 'Linear Team',
      action: 'boosted sprint velocity by 38%',
      time: '2m ago',
      avatar: 'MK',
      color: '#10B981'
    },
    {
      id: 3,
      name: 'Elena R.',
      company: 'Vercel',
      action: 'synced 12 Jira epics with NOVA AI',
      time: '4m ago',
      avatar: 'ER',
      color: '#8B5CF6'
    },
    {
      id: 4,
      name: 'David W.',
      company: 'Shopify',
      action: 'upgraded to Enterprise Plan (50 seats)',
      time: '6m ago',
      avatar: 'DW',
      color: '#F97316'
    }
  ];

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 400);
    }, 7500);

    return () => clearInterval(interval);
  }, [activities.length, isDismissed]);

  if (isDismissed) return null;

  const current = activities[currentIndex];

  return (
    <div className={`live-activity-floating-toast ${isVisible ? 'show' : 'hide'}`}>
      <div className="activity-toast-inner" onClick={onOpenDemo} title="Click to view live interactive demo">
        <div className="activity-avatar" style={{ background: current.color }}>
          {current.avatar}
        </div>

        <div className="activity-text-col">
          <div className="activity-headline">
            <span className="activity-user-name">{current.name}</span>
            <span className="activity-company">({current.company})</span>
            <span className="activity-time">• {current.time}</span>
          </div>
          <div className="activity-action-desc" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <NovaIcon size={13} glow={false} />
            <span>{current.action}</span>
          </div>
        </div>

        <button
          className="activity-close-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          aria-label="Dismiss notification"
          title="Dismiss"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}

// 5. Authentication Modal
function AuthModal({ isOpen, mode = 'signup', onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState(mode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentTab = activeTab || mode;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully
      }
      onSuccess(
        currentTab === 'signup'
          ? `Welcome to NOVA! Your free workspace is ready.`
          : `Welcome back! Signed in as ${email || 'Alex'}.`
      );
      onClose();
    }, 700);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="modal-dialog" style={{ maxWidth: '460px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NovaIcon size={32} />
            <h3 id="auth-modal-title" className="modal-title">
              {currentTab === 'signup' ? 'Create your NOVA account' : 'Welcome back to NOVA'}
            </h3>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close authentication modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Tabs */}
          <div className="auth-tab-bar">
            <button
              type="button"
              className={`auth-tab-btn ${currentTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Get Started Free
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${currentTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
          </div>

          {/* Social Auth */}
          <div style={{ marginBottom: '16px' }}>
            <button
              type="button"
              className="auth-github-btn"
              onClick={handleSubmit}
            >
              <GithubIcon size={18} />
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="auth-divider-row">
            <div className="auth-divider-line" />
            <span>OR CONTINUE WITH EMAIL</span>
            <div className="auth-divider-line" />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {currentTab === 'signup' && (
              <div className="auth-field-group">
                <label className="auth-field-label">
                  Full Name
                </label>
                <div className="auth-input-wrapper">
                  <User size={16} className="auth-input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="auth-text-input"
                  />
                </div>
              </div>
            )}

            <div className="auth-field-group">
              <label className="auth-field-label">
                Work Email
              </label>
              <div className="auth-input-wrapper">
                <Mail size={16} className="auth-input-icon" />
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-text-input"
                />
              </div>
            </div>

            <div className="auth-field-group">
              <label className="auth-field-label">
                Password
              </label>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-text-input"
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              <span>{loading ? 'Setting up workspace...' : currentTab === 'signup' ? 'Create Free Workspace' : 'Sign In'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '16px' }}>
            By continuing, you agree to NOVA's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

// 6. Interactive Demo & Product Tour Modal
function DemoModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 200);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-dialog" style={{ maxWidth: '720px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NovaIcon size={34} />
            <div>
              <h3 id="modal-title" className="modal-title" style={{ fontSize: '1.15rem' }}>
                NOVA 2.0 Product Tour & Live Demo
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Discover how autonomous AI workflows 10x your team velocity.
              </p>
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close interactive demo modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '20px 24px 24px 24px' }}>
          <div
            style={{
              background: '#090B19',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}
          >
            <div
              style={{
                height: '320px',
                background: 'radial-gradient(circle at 50% 30%, #1A2142 0%, #090B19 80%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px',
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3B82F6, #EC4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(99,102,241,0.6)',
                  transition: 'transform 0.2s ease',
                  marginBottom: '16px'
                }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} fill="#fff" style={{ marginLeft: '4px' }} />}
              </div>

              <div style={{ textAlign: 'center', maxWidth: '420px' }}>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                  Live Interactive Workspace Demo
                </h4>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                  Simulating multi-user sprint planning and autonomous AI code review pipeline.
                </p>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(15,23,42,0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #3B82F6, #EC4899)', borderRadius: '2px' }} />
                </div>

                <span style={{ color: '#94A3B8', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                  0:{progress.toString().padStart(2, '0')} / 1:45
                </span>

                <Volume2 size={16} color="#94A3B8" />
                <Maximize2 size={16} color="#94A3B8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. Spotlight Command Palette (Ctrl+K)
function CommandPalette({
  isOpen,
  onClose,
  isDark,
  toggleTheme,
  onOpenDemo,
  onOpenAuth,
  onShowToast
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
    {
      id: 'demo',
      category: 'Product & Demo',
      title: 'Open Live Interactive Demo',
      subtitle: 'Watch video walkthrough and sprint simulations',
      icon: Play,
      action: () => {
        onClose();
        onOpenDemo();
      }
    },
    {
      id: 'signup',
      category: 'Account & Workspace',
      title: 'Create Free Workspace (Sign Up)',
      subtitle: 'Instant onboarding with 5 free team seats',
      icon: User,
      action: () => {
        onClose();
        onOpenAuth('signup');
      }
    },
    {
      id: 'theme',
      category: 'Appearance',
      title: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: 'Toggle theme preference across the platform',
      icon: isDark ? Sun : Moon,
      action: () => {
        toggleTheme();
        onShowToast(`Switched to ${isDark ? 'Light' : 'Dark'} theme`);
        onClose();
      }
    },
    {
      id: 'pricing',
      category: 'Navigation',
      title: 'View Pricing & ROI Calculator',
      subtitle: 'Jump to transparent tier comparison & savings calculator',
      icon: CreditCard,
      action: () => {
        onClose();
        const el = document.getElementById('pricing');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'share',
      category: 'Quick Actions',
      title: 'Copy NOVA App Share Link',
      subtitle: 'Copy live URL to clipboard to invite colleagues',
      icon: Copy,
      action: () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          onShowToast('✓ Link copied to clipboard!');
        }
        onClose();
      }
    }
  ];

  const filtered = actions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cmd-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-search-header">
          <Search size={18} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-search-input"
            placeholder="Search commands, navigate or trigger actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="cmd-clear-btn" onClick={() => setQuery('')}>
              <X size={14} />
            </button>
          )}
          <span className="cmd-esc-badge">ESC</span>
        </div>

        <div className="cmd-results-list">
          {filtered.length === 0 ? (
            <div className="cmd-empty-state">
              <Sparkles size={24} style={{ opacity: 0.4, marginBottom: '8px' }} />
              <p>No actions found for "{query}"</p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`cmd-result-item ${isSelected ? 'selected' : ''}`}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-icon-box">
                    <Icon size={16} />
                  </div>
                  <div className="cmd-item-text">
                    <div className="cmd-item-title-row">
                      <span className="cmd-item-title">{item.title}</span>
                      <span className="cmd-item-cat">{item.category}</span>
                    </div>
                    <span className="cmd-item-subtitle">{item.subtitle}</span>
                  </div>
                  <ArrowRight size={14} className="cmd-item-arrow" />
                </div>
              );
            })
          )}
        </div>

        <div className="cmd-footer-bar">
          <div className="cmd-footer-shortcuts">
            <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
            <span><kbd>esc</kbd> to close</span>
          </div>
          <div className="cmd-footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <NovaIcon size={16} />
            <span>NOVA Command Palette</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Main Application Root Component
export function App() {
  const { isDark, toggleTheme } = useTheme();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState({ isOpen: false, mode: 'signup' });
  const [toastState, setToastState] = useState({ visible: false, message: '' });

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message) => {
    setToastState({ visible: true, message });
    setTimeout(() => {
      setToastState({ visible: false, message: '' });
    }, 3500);
  };

  const handleOpenAuth = (mode = 'signup') => {
    setAuthModalState({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModalState({ isOpen: false, mode: 'signup' });
  };

  const handleSelectFeature = (feature) => {
    showToast(`Feature: ${feature.title} — Active in playground!`);
  };

  const handleSelectSolution = (solution) => {
    showToast(`Solution: ${solution.title}`);
  };

  const handleSelectPlan = (plan) => {
    if (plan.id === 'starter') {
      handleOpenAuth('signup');
    } else if (plan.id === 'enterprise') {
      showToast(`Enterprise Sales request initiated. An architect will contact you.`);
    } else {
      showToast(`Selected Pro Plan. Setting up 14-day free trial...`);
      setTimeout(() => handleOpenAuth('signup'), 600);
    }
  };

  const handleNewsletter = (email) => {
    showToast(`✓ Subscribed ${email} to NOVA newsletter updates.`);
  };

  const handleContactSupport = () => {
    showToast(`Connecting to 24/7 NOVA Support Team...`);
  };

  return (
    <div className="app-root">
      {/* 1. Sticky Navigation Bar with Command Palette trigger */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenAuth={handleOpenAuth}
        onOpenCommandPalette={() => setIsCmdOpen(true)}
      />

      <main id="main-content">
        {/* 2. Interactive Hero Section */}
        <Hero
          onOpenDemo={() => setIsDemoOpen(true)}
          onOpenAuth={handleOpenAuth}
        />

        {/* 3. Trusted By Section */}
        <TrustedBy />

        {/* 4. Interactive Features Section with 3D Tilt & Live Sandbox */}
        <Features
          onSelectFeature={handleSelectFeature}
          onExploreAll={() => handleOpenAuth('signup')}
        />

        {/* 5. About NOVA Section */}
        <Product
          onExplore={() => handleOpenAuth('signup')}
          onOpenDemo={() => setIsDemoOpen(true)}
        />

        {/* 6. How It Works + Live Interactive Workflow Simulator */}
        <HowItWorks onStart={() => handleOpenAuth('signup')} />

        {/* 7. Numbers That Speak for Themselves */}
        <Stats />

        {/* 8. Interactive ROI & Productivity Calculator */}
        <RoiCalculator onGetStarted={() => handleOpenAuth('signup')} />

        {/* 9. Solutions for Every Team & Industry */}
        <Solutions
          onSelectSolution={handleSelectSolution}
          onExploreAll={() => handleOpenAuth('signup')}
        />

        {/* 10. Testimonials with Filter & Impact Metrics */}
        <Testimonials />

        {/* 11. Transparent Pricing with Confetti & Feature Matrix */}
        <Pricing onSelectPlan={handleSelectPlan} />

        {/* 12. FAQ with Live Search Filter */}
        <FAQ onContactSupport={handleContactSupport} />

        {/* 13. Ready to Boost Your Productivity CTA Banner */}
        <CTA
          onStart={() => handleOpenAuth('signup')}
        />
      </main>

      {/* 14. Dark Footer */}
      <Footer onNewsletterSubscribe={handleNewsletter} />

      {/* Floating Back to Top */}
      <BackToTop />

      {/* Real-time Dynamic Social Proof Toast */}
      <LiveActivityToast onOpenDemo={() => setIsDemoOpen(true)} />

      {/* Spotlight Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenAuth={handleOpenAuth}
        onShowToast={showToast}
      />

      {/* Product Video & Interactive Demo Modal */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        mode={authModalState.mode}
        onClose={handleCloseAuth}
        onSuccess={showToast}
      />

      {/* Interactive Micro-feedback Toast */}
      <Toast
        message={toastState.message}
        visible={toastState.visible}
        onHide={() => setToastState({ visible: false, message: '' })}
      />
    </div>
  );
}

export default App;
