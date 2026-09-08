// Unified NOVA Dataset: companies, features, solutions, pricing, stats, testimonials, faqs

export const companies = [
  {
    name: "Orbit",
    tagline: "Autonomous Infrastructure",
    symbol: "◎"
  },
  {
    name: "Vertex",
    tagline: "Quantum Computing",
    symbol: "▲"
  },
  {
    name: "Lumio",
    tagline: "AI Design Systems",
    symbol: "✦"
  },
  {
    name: "Nexora",
    tagline: "Cloud Architectures",
    symbol: "⬡"
  },
  {
    name: "Flowbase",
    tagline: "Global Logistics",
    symbol: "◈"
  },
  {
    name: "PulseAI",
    tagline: "Fintech Intelligence",
    symbol: "◒"
  }
];

export const features = [
  {
    id: "project-management",
    title: "Project Management",
    description: "Plan, track and deliver projects with ease and confidence.",
    icon: "FolderKanban",
    color: "#3B82F6",
    bgColor: "rgba(59, 130, 246, 0.12)",
  },
  {
    id: "task-automation",
    title: "Task Automation",
    description: "Automate repetitive tasks and save valuable hours every week.",
    icon: "Zap",
    color: "#8B5CF6",
    bgColor: "rgba(139, 92, 246, 0.12)",
  },
  {
    id: "team-collab",
    title: "Team Collaboration",
    description: "Work together in real-time, anywhere in the world effortlessly.",
    icon: "Users",
    color: "#10B981",
    bgColor: "rgba(16, 185, 129, 0.12)",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "Get smart suggestions and boost your productivity with instant answers.",
    icon: "Sparkles",
    color: "#F97316",
    bgColor: "rgba(249, 115, 22, 0.12)",
  },
  {
    id: "time-tracking",
    title: "Time Tracking",
    description: "Monitor time, spot bottlenecks, and stay on schedule effortlessly.",
    icon: "Clock",
    color: "#06B6D4",
    bgColor: "rgba(6, 182, 212, 0.12)",
  },
  {
    id: "secure-reliable",
    title: "Secure & Reliable",
    description: "Your data is always safe with enterprise-grade SOC2 security.",
    icon: "ShieldCheck",
    color: "#EF4444",
    bgColor: "rgba(239, 68, 68, 0.12)",
  }
];

export const solutions = [
  {
    id: "startups",
    title: "Startups",
    description: "Build and scale faster with less effort.",
    icon: "Rocket",
    color: "#F97316"
  },
  {
    id: "marketing",
    title: "Marketing Teams",
    description: "Plan campaigns and create performance.",
    icon: "Megaphone",
    color: "#8B5CF6"
  },
  {
    id: "remote",
    title: "Remote Teams",
    description: "Stay connected and collaborate.",
    icon: "Globe2",
    color: "#3B82F6"
  },
  {
    id: "sales",
    title: "Sales Teams",
    description: "Manage leads and close deals.",
    icon: "Briefcase",
    color: "#F59E0B"
  },
  {
    id: "hr",
    title: "HR Teams",
    description: "Streamline hiring and team management.",
    icon: "UserCheck",
    color: "#EC4899"
  },
  {
    id: "it-dev",
    title: "IT & Development",
    description: "Plan sprints and track progress.",
    icon: "Code2",
    color: "#6366F1"
  }
];

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "Perfect for small teams.",
    monthlyPrice: 0,
    annualPrice: 0,
    popular: false,
    ctaText: "Get Started",
    ctaVariant: "outline",
    features: [
      { text: "Up to 5 team members", included: true },
      { text: "Basic features", included: true },
      { text: "5 GB storage", included: true },
      { text: "Email support", included: true }
    ]
  },
  {
    id: "pro",
    name: "Pro",
    subtitle: "For growing teams.",
    badge: "Most Popular",
    monthlyPrice: 12,
    annualPrice: 10,
    popular: true,
    ctaText: "Get Started",
    ctaVariant: "primary",
    features: [
      { text: "Up to 20 team members", included: true },
      { text: "Advanced features", included: true },
      { text: "50 GB storage", included: true },
      { text: "Priority support", included: true }
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: "For large organizations.",
    monthlyPrice: 29,
    annualPrice: 24,
    popular: false,
    ctaText: "Contact Sales",
    ctaVariant: "outline",
    features: [
      { text: "Unlimited team members", included: true },
      { text: "All features", included: true },
      { text: "1 TB storage", included: true },
      { text: "Dedicated support", included: true }
    ]
  }
];

export const stats = [
  {
    id: "active-users",
    value: 50,
    prefix: "",
    suffix: "K+",
    label: "Active Users",
    icon: "Users"
  },
  {
    id: "teams",
    value: 12,
    prefix: "",
    suffix: "K+",
    label: "Teams",
    icon: "Building2"
  },
  {
    id: "uptime",
    value: 99.9,
    isFloat: true,
    prefix: "",
    suffix: "%",
    label: "Uptime",
    icon: "Shield"
  },
  {
    id: "csat",
    value: 4.8,
    isFloat: true,
    prefix: "",
    suffix: "/5",
    label: "Customer Satisfaction",
    icon: "Star"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager, Acme Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80",
    rating: 5,
    quote: "NOVA has completely transformed how our team works. We're more organized and productive than ever!"
  },
  {
    id: 2,
    name: "David Kim",
    role: "CTO, BrightLabs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80",
    rating: 5,
    quote: "The AI automation feature saves us hours every week. Highly recommend for any growing team."
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Marketing Lead, GrowthCo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80",
    rating: 5,
    quote: "Simple, powerful and exactly what we needed. NOVA is a must-have tool!"
  }
];

export const faqs = [
  {
    id: "faq-1",
    question: "What is NOVA and how does it work?",
    answer: "NOVA is an AI-powered productivity workspace that unifies project management, task automation, and team collaboration into one seamless platform to help teams move faster and eliminate manual work."
  },
  {
    id: "faq-2",
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade, downgrade, or switch between monthly and annual plans at any time directly from your account billing settings."
  },
  {
    id: "faq-3",
    question: "Is my data secure with NOVA?",
    answer: "Yes, your data is protected with enterprise-grade AES-256 encryption, TLS 1.3 in transit, and SOC2 compliance. We never train public AI models on your private workspace data."
  },
  {
    id: "faq-4",
    question: "Do you offer customer support?",
    answer: "Yes, all plans include support. Starter plans have email support, while Pro and Enterprise plans enjoy priority 24/7 support with dedicated response times."
  },
  {
    id: "faq-5",
    question: "Is there a free plan available?",
    answer: "Yes! NOVA offers a 100% free Starter plan with up to 5 team members, basic AI features, and 5 GB storage with no credit card required."
  }
];
