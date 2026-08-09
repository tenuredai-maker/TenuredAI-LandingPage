import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight, ShieldCheck, Terminal, Network, Brain, Database, Lock,
  RefreshCw, Landmark, Loader2, Check, BarChart3, Badge, Link as LinkIcon,
  Mail, MessageSquare, Phone, Globe, Cpu, Zap, Award, Shield, Quote, Star,
  ChevronDown, ChevronUp, ShieldAlert, Clock, Activity, ArrowRight, BookOpen,
  Play, Volume2, Code2, HelpCircle, Sparkles, School, Bolt, Search, Settings, GitBranch
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Radar as RadarArea, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';
import TenuredLeaderboard from '../components/TenuredLeaderboard';

const Tooltip: React.FC<{ children: React.ReactNode; content: React.ReactNode; externalVisible?: boolean }> = ({ children, content, externalVisible }) => {
  const [isVisible, setIsVisible] = useState(false);
  const show = externalVisible || isVisible;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-64 p-4 bg-surface-container-highest/95 backdrop-blur-xl rounded-xl ambient-shadow pointer-events-none border border-outline-variant/10 shadow-2xl"
          >
            <div className="relative z-10">
              {content}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-surface-container-highest/95" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [isRequestAccessLoading, setIsRequestAccessLoading] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [isProtocolLoading, setIsProtocolLoading] = useState(false);
  const [isHeatmapLoading, setIsHeatmapLoading] = useState(true);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);

  // Pricing state
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Persona tab state for Section 5
  const [activePersonaTab, setActivePersonaTab] = useState<'university' | 'enterprise' | 'recruiter' | 'state' | 'learner'>('university');

  // Proving Ground states
  const [pgActiveLevel, setPgActiveLevel] = useState<'idle' | 'L1' | 'L2' | 'L3'>('idle');
  const [pgLogs, setPgLogs] = useState<Array<{ text: string, type: 'info' | 'ok' | 'err' | 'chaos' | 'proctor' | 'input' }>>([
    { text: "Initializing V-100 Proving Ground Protocol...", type: 'info' },
    { text: "Node Identity · SOVEREIGN_ALPHA_7 · DID verified", type: 'ok' },
    { text: "[PROCTOR] ALTFL armed · 6 channels · monitoring", type: 'proctor' },
    { text: "learner@sovereign:~$ pnpm test RAG-pipeline", type: 'input' },
    { text: "⏳ running 24 assertions...", type: 'info' },
    { text: "✓ 22 passed · ✗ 2 failed (retrieval grounding)", type: 'err' },
  ]);
  const [pgCaScore, setPgCaScore] = useState(81);
  const [pgCaDelta, setPgCaDelta] = useState('');
  const [pgTelemetry, setPgTelemetry] = useState({
    KV: 'nominal',
    IL: 'nominal',
    CP: '0.82',
    ET: 'nominal',
    VO: '22/24',
    CCT: '0.04'
  });
  const [pgCouncil, setPgCouncil] = useState({
    proctor: 'active',
    chaos: 'idle',
    auditor: 'idle',
    mentor: 'suspended'
  });
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideStep, setOverrideStep] = useState(0);
  const [isOverrideExecuting, setIsOverrideExecuting] = useState(false);

  const [taMode, setTaMode] = useState<'mentor' | 'proctor'>('mentor');
  const [taTtr, setTaTtr] = useState(45); // Observed TTR in seconds (baseline 45s)
  const [taActiveCouncilAgent, setTaActiveCouncilAgent] = useState<'mentor' | 'proctor' | 'auditor' | 'chaos' | null>(null);

  // Learning Loop states
  const [decayMv, setDecayMv] = useState(60);
  const [decayIar, setDecayIar] = useState(50);
  const [decaySd, setDecaySd] = useState(40);
  const [decayG, setDecayG] = useState(70);
  const [decaySigma, setDecaySigma] = useState(82);

  const [activeModule, setActiveModule] = useState<'article' | 'video' | 'podcast' | 'code' | 'quiz'>('article');
  const [presenceState, setPresenceState] = useState<'active' | 'idle' | 'lost'>('active');
  const [playProgress, setPlayProgress] = useState(35);
  const [accruedTp, setAccruedTp] = useState(140);

  const calculatedLambda = useMemo(() => {
    return Math.max(0.01, (decayMv * 0.003 + decayIar * 0.004 + decaySd * 0.002) - (decayG * 0.001 * (decaySigma / 100)));
  }, [decayMv, decayIar, decaySd, decayG, decaySigma]);

  const daysToBreach = useMemo(() => {
    return Number((0.3051 / calculatedLambda).toFixed(1));
  }, [calculatedLambda]);

  const triggerL1 = () => {
    setPgActiveLevel('L1');
    setPgCaScore(76);
    setPgCaDelta('-5');
    setPgTelemetry({
      KV: 'nominal',
      IL: '1.2s delay',
      CP: '0.64',
      ET: '1 backtrack',
      VO: '18/24',
      CCT: '0.12'
    });
    setPgCouncil({
      proctor: 'active',
      chaos: 'active',
      auditor: 'idle',
      mentor: 'suspended'
    });
    setPgLogs([
      { text: "learner@sovereign:~$ pnpm test RAG-pipeline", type: 'input' },
      { text: "✗ POST /v1/embeddings → 503 Service Unavailable", type: 'err' },
      { text: "[CHAOS] L1 · Your retry interval is too aggressive — back off and let the gateway settle.", type: 'chaos' },
      { text: "[PROCTOR] Core exception detected. Telemetry flagged. Response interval anomalous.", type: 'proctor' }
    ]);
  };

  const triggerL2 = () => {
    setPgActiveLevel('L2');
    setPgCaScore(68);
    setPgCaDelta('-8');
    setPgTelemetry({
      KV: 'high burst',
      IL: '4.8s delay',
      CP: '0.52',
      ET: '3 backtracks',
      VO: '14/24',
      CCT: '0.24'
    });
    setPgCouncil({
      proctor: 'warning',
      chaos: 'active',
      auditor: 'idle',
      mentor: 'suspended'
    });
    setPgLogs([
      { text: "learner@sovereign:~$ pnpm run apply-retry-patch", type: 'input' },
      { text: "✓ partial: 503 resolved", type: 'ok' },
      { text: "[PROCTOR] Pattern-match detected · Bully Loop arming...", type: 'proctor' },
      { text: "✗ POST /v1/embeddings → 401 Unauthorized", type: 'err' },
      { text: "[CHAOS] L2 · Different symptom · same domain. The Bully Logic loop has rotated. Auth credentials expired.", type: 'chaos' },
      { text: "[PROCTOR] 45s to identify the actual cause before AIBS penalizes.", type: 'proctor' }
    ]);
  };

  const triggerL3 = () => {
    setPgActiveLevel('L3');
    setPgCaScore(55);
    setPgCaDelta('-13');
    setPgTelemetry({
      KV: 'anomalous burst',
      IL: '8.4s delay',
      CP: '0.41',
      ET: '5 backtracks',
      VO: '11/24',
      CCT: '0.38'
    });
    setPgCouncil({
      proctor: 'warning',
      chaos: 'warning',
      auditor: 'idle',
      mentor: 'suspended'
    });
    setPgLogs([
      { text: "learner@sovereign:~$ pnpm run check-credentials", type: 'input' },
      { text: "[CHAOS] L3 · The environment is stable. Your local system clock is skewed by 31 seconds. Adjust clock or terminate session.", type: 'chaos' },
      { text: "[PROCTOR] System time verified correct. Gaslighting active. Sovereign Override Code 31 unlocked.", type: 'proctor' }
    ]);
  };

  const executeOverride = () => {
    setIsOverrideExecuting(true);
    setOverrideStep(1);

    setTimeout(() => {
      setOverrideStep(2);
    }, 800);

    setTimeout(() => {
      setOverrideStep(3);
    }, 1600);

    setTimeout(() => {
      setPgActiveLevel('idle');
      setPgCaScore(98);
      setPgCaDelta('+17');
      setPgTelemetry({
        KV: 'nominal',
        IL: 'nominal',
        CP: '0.98',
        ET: 'nominal',
        VO: '24/24',
        CCT: '0.01'
      });
      setPgCouncil({
        proctor: 'active',
        chaos: 'idle',
        auditor: 'active',
        mentor: 'active'
      });
      setPgLogs([
        { text: "learner@sovereign:~$ execute-override --code 31", type: 'input' },
        { text: "[PROCTOR] Sovereign Override executed. truth_baseline = TRUE. Chaos Agent bypassed.", type: 'proctor' },
        { text: "[AUDITOR] Weighted consensus: 0.98. MINTING Consensus Certificate.", type: 'ok' },
        { text: "[MENTOR] Gate cleared. Merit credential anchored to Ledger at block 81,402.", type: 'ok' }
      ]);
      setIsOverrideExecuting(false);
      setShowOverrideModal(false);
      setOverrideStep(0);
    }, 2400);
  };

  useEffect(() => {
    // Simulate data fetching for perceived performance
    const timer = setTimeout(() => {
      setIsHeatmapLoading(false);
      setIsTestimonialsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    {
      question: "What is Tenured AI, in one sentence?",
      answer: "Tenured AI is the verification infrastructure for AI-era talent — a platform where engineers prove what they can do in air-gapped, adversarial environments, earn cryptographically-anchored credentials (Sovereign Passports), and get hired through a market that prices their actual competence rather than their résumé claims."
    },
    {
      question: "What problem is Tenured AI actually solving?",
      answer: "Large language models — ChatGPT, Claude, Gemini — have made traditional credentials forensically empty. A degree, a coding test, a take-home assignment, a LinkedIn endorsement no longer prove what they used to. The platform exists to restore the signal: a credential that can't be faked by AI, because the test was specifically engineered against AI assistance, and the record is cryptographically sealed."
    },
    {
      question: "What is a \"Hard-Gate\"?",
      answer: "A Hard-Gate is an adversarial engineering challenge run inside an air-gapped Proving Ground environment. The candidate works on a real engineering task (production RAG, prompt injection defense, multi-agent consensus, vector DB tuning) while a four-agent AI council monitors their behavior, injects live chaos (broken dependencies, malformed inputs, adversarial requests), and grades them against a six-channel forensic telemetry stream."
    },
    {
      question: "What does the Sovereign Passport actually contain?",
      answer: "The Sovereign Passport is the user's portable credential — a Merkle-anchored artifact carrying every Hard-Gate they've cleared, their current Command Authority score, their Triple-Threat sub-scores (AICI, AIOI, AIBS), their Tier label, their bonded credentials and bond status, their Career Memory of every sealed artifact they've produced, and any Asymmetric Liability flags from past Gates."
    },
    {
      question: "What is the Tenured Agent? Is it ChatGPT?",
      answer: "The Tenured Agent is the platform's AI orchestrator — a four-agent council architecture, not a single chatbot. It operates internally as four specialized agents with strict separation of concerns: the Mentor (supportive, growth-focused), the Proctor (monitors integrity and detects AI-mediated cheating), the Auditor (silently evaluates artifacts for the Consensus Certificate), and the Chaos Agent (dispatches adversarial injections during Hard-Gates). No single agent can mint a credential."
    },
    {
      question: "What is the Learning Loop? How does daily practice actually work?",
      answer: "The Learning Loop is the platform's daily practice surface — three integrated modules: Forge (Two-Phase Flashcard drills, the recall + compression pattern that builds long-term retention), Refresh Labs (scoped exercises that restore decayed knowledge before λ drift drops a node below the active threshold), and Successor Gates (Tenured-Agent-synthesized challenges derived from the user's own artifact history)."
    },
    {
      question: "How does Sovereign Underwriting work at a high level?",
      answer: "Sovereign Underwriting is the financial layer wrapping the platform. It converts each verified hire into a bonded position: π premium ($11,250/yr for a $200K + $25K-premium hire), V_u guarantee ($150K paid atomically if the hire's Command Authority drifts below strike), EWARD dashboard (enterprise-side workforce risk surface), Chubb-tier integration (15–35% premium credit on D&O / E&O policies depending on Organizational Sovereign Density)."
    },
    {
      question: "How is this different from LinkedIn / HackerRank / Coursera / a degree?",
      answer: "None of the alternatives produce a credential that resists LLM-mediated cheating, carries a forensic record of how the candidate actually worked, or anchors to a public chain the recruiter can verify without trusting the issuer. LinkedIn is self-reported. HackerRank tests are LLM-defeated. Coursera certifies completion not competence. A degree certifies what you finished, not what you can currently do."
    },
    {
      question: "Can a candidate actually cheat the Hard-Gate?",
      answer: "The platform is engineered against the obvious cheating vectors. The Hard-Gate runs in an air-gapped sandbox where the candidate's screen contents are not the same as the platform's live state — so pasting their terminal output into ChatGPT and asking for help produces guidance that is plausible-looking but wrong, because ChatGPT can't see the live chaos injections. The Proctor agent monitors keystroke patterns for AI-typical signatures and can trigger a Hard-Gate Preemption mid-session when AI-mediation confidence crosses the threshold."
    },
    {
      question: "Do credentials expire? What is \"decay\"?",
      answer: "Yes — credentials decay over time. The AI field moves fast (vector DB ecosystems shift, model APIs change, regulatory frameworks evolve), and a credential earned in 2024 cannot honestly represent current competence in 2026 without re-verification. The platform's PAT-003 Skill-Decay model assigns each ontology node its own λ coefficient computed nightly from market velocity, regulatory drift, and the user's Grit Moat."
    }
  ];

  // Methodology states
  const [aiciScores, setAiciScores] = useState<Record<string, number>>({
    'Prompt Fidelity': 92,
    'Latent Recall': 85,
    'Orchestration': 96,
    'Ethical Alignment': 89,
    'Debug Speed': 94,
  });

  const [aioiScores, setAioiScores] = useState<Record<string, number>>({
    'Multi-agent Sync': 94,
    'Loop Efficiency': 91,
    'Context Management': 88,
    'Strategic Routing': 95,
    'System Resilience': 92,
  });

  const [aibsScores, setAibsScores] = useState<Record<string, number>>({
    'Vector RAG': 98,
    'Model Optimization': 92,
    'Schema Soundness': 95,
    'Deployment Velocity': 90,
    'Infrastructure Integrity': 94,
  });

  const [aibsLog, setAibsLog] = useState<string[]>(['System initialized...', 'Baseline architecture verified.']);
  const [hoveredAiciKey, setHoveredAiciKey] = useState<string | null>(null);

  const getRadarData = (scores: Record<string, number>) =>
    Object.entries(scores).map(([subject, value]) => ({
      subject,
      A: value,
      fullMark: 100,
    }));

  const getAverage = (scores: Record<string, number>) => {
    const vals = Object.values(scores) as number[];
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  };

  const aiciRadarData = useMemo(() => getRadarData(aiciScores), [aiciScores]);
  const aioiRadarData = useMemo(() => getRadarData(aioiScores), [aioiScores]);
  const aibsRadarData = useMemo(() => getRadarData(aibsScores), [aibsScores]);

  const updateAibsScore = (key: string, value: number) => {
    const oldValue = aibsScores[key] || 0;
    setAibsScores(prev => ({ ...prev, [key]: value }));
    if (Math.abs(oldValue - value) > 5) {
      setAibsLog(prevLog => [`[LOG] ${key} recalibrated to ${value}%`, ...prevLog].slice(0, 5));
    }
  };

  const [aioiedScores, setAioiedScores] = useState<Record<string, number>>({
    'Efficiency': 96,
    'Security': 98,
    'Debug Speed': 94,
  });

  const aiciWhyMatters: Record<string, string> = {
    'Prompt Fidelity': 'Ensures that AI outputs align perfectly with complex business logic, reducing the need for manual prompt engineering iterations.',
    'Latent Recall': 'Critical for long-running workflows where maintaining context over thousands of tokens is necessary for consistent decision-making.',
    'Orchestration': 'High orchestration scores enable the management of multi-agent swarms with minimal supervisor intervention.',
    'Ethical Alignment': 'Essential for institutional deployment to ensure compliance with global safety standards and minimize reputational risk.',
    'Debug Speed': 'Directly impacts the agility of the development cycle, allowing for rapid recovery from logical AI failures in production.',
  };

  const aiciDescriptions: Record<string, string> = {
    'Prompt Fidelity': 'Accuracy in translating complex human intent into executable instructions.',
    'Latent Recall': 'Ability to retrieve and apply deep-context information.',
    'Orchestration': 'Efficiency in managing multi-step reasoning chains, as well as the capacity to effectively lead cross-functional teams, allocate project resources dynamically, and drive strategic initiatives to completion.',
    'Ethical Alignment': 'Adherence to safety protocols and bias mitigation.',
    'Debug Speed': 'Rapid identification and correction of logical fallacies.',
  };

  const aioiDescriptions: Record<string, string> = {
    'Multi-agent Sync': 'Coordination efficacy between specialized synthetic agents in a shared environment.',
    'Loop Efficiency': 'Optimization of iterative reasoning cycles to minimize latency and token overhead.',
    'Context Management': 'Precision in maintaining state and relevance across long-form strategic sessions.',
    'Strategic Routing': 'Intelligent delegation of tasks to the most capable model or agent node.',
    'System Resilience': 'Ability to maintain operational integrity under high-concurrency or adversarial conditions.',
  };

  const aibsDescriptions: Record<string, string> = {
    'Vector RAG': 'Sophistication of retrieval-augmented generation architectures and embedding precision.',
    'Model Optimization': 'Efficacy in fine-tuning, quantization, and performance-tuning for specific use cases.',
    'Schema Soundness': 'Structural integrity and scalability of data models and API interfaces.',
    'Deployment Velocity': 'Speed and reliability of transitioning synthetic solutions from dev to production.',
    'Infrastructure Integrity': 'Robustness of the underlying compute, storage, and networking stack.',
  };

  const aioiedDescriptions: Record<string, string> = {
    'Efficiency': 'Measures the optimization of AI resource allocation and the speed of automated educational workflows.',
    'Security': 'Evaluates the robustness of student data protection, privacy protocols, and institutional node integrity.',
    'Debug Speed': 'Quantifies the agility in identifying and resolving technical glitches or pedagogical misalignments.',
  };

  const companies = [
    { name: "NEURAL_NET", icon: Cpu },
    { name: "CORE_LOGIC", icon: Zap },
    { name: "SENTIENT_OS", icon: Brain },
    { name: "VECTOR_DB", icon: Database },
    { name: "SECURE_GATE", icon: Lock },
    { name: "PROTOCOL_X", icon: Shield },
    { name: "NODE_ALPHA", icon: Network },
    { name: "SYSTEM_G", icon: Landmark }
  ];

  const testimonials = [
    {
      text: "Tenured.ai has redefined how we underwrite technical risk. The sovereign ledger is the missing link in AI infrastructure.",
      author: "Sarah Chen",
      role: "CTO, Neural Systems",
      score: "0.98 ALPHA"
    },
    {
      text: "The AICI metrics provided us with the first objective measure of our team's AI literacy. Truly revolutionary.",
      author: "David Miller",
      role: "Head of AI, CoreLogic",
      score: "0.94 BETA"
    },
    {
      text: "A seamless integration of human intuition and agentic automation. The future of professional verification.",
      author: "James K.",
      role: "Senior Architect, ProtocolX",
      score: "L5 MASTER"
    }
  ];

  const individualPlans = [
    {
      name: "Explorer",
      price: "0",
      description: "Baseline skill assessment and career discovery.",
      features: [
        "Baseline skill assessment",
        "AI-powered skill discovery",
        "One exploratory pathway (0–30)",
        "View-only skill graph",
        "Limited AI guidance"
      ],
      cta: "Start Free",
      highlight: false
    },
    {
      name: "Builder",
      price: billingCycle === 'monthly' ? "39" : "33",
      description: "Guided learning with adaptive AI agents.",
      features: [
        "Full access to one learning pathway (0–70)",
        "Personal AI learning agent",
        "Adaptive learning paths",
        "Assessments & simulations",
        "Progress analytics",
        "1 verified skill badge included"
      ],
      cta: "Upgrade to Builder",
      highlight: true,
      popular: true
    },
    {
      name: "Pro",
      price: billingCycle === 'monthly' ? "99" : "83",
      description: "Mastery-level verification for elite architects.",
      features: [
        "Unlimited learning pathways",
        "Advanced role-based simulations",
        "Mastery confidence scoring",
        "Portfolio-ready evidence",
        "Multiple micro-credentials",
        "Public credential links"
      ],
      cta: "Go Pro",
      highlight: false
    }
  ];

  const handleSummaryClick = () => {
    setIsSummaryLoading(true);
    setTimeout(() => setIsSummaryLoading(false), 2000);
  };

  const handleReportClick = () => {
    setIsReportLoading(true);
    setTimeout(() => setIsReportLoading(false), 2000);
  };

  const handleProtocolClick = () => {
    setIsProtocolLoading(true);
    setTimeout(() => setIsProtocolLoading(false), 2000);
  };

  const handleRequestAccessClick = () => {
    setIsRequestAccessLoading(true);
    setTimeout(() => {
      setIsRequestAccessLoading(false);
      navigate('/request-access');
    }, 800);
  };

  return (
    <div className="pt-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-6 md:px-8 py-16 md:py-40 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <div className="space-y-4">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-primary font-bold">Platform Intelligence</span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight text-on-surface">
              Sovereign Intelligence. <br /> <span className="italic text-primary">Verified Worth.</span>
            </h1>
          </div>
          <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Tenured AI is the operating system for liquid professional identities. We bridge the trust gap through high-stakes adversarial testing and immutable telemetry. Your true capabilities are proven in real-world scenarios. Own your verified reputation, carrying it seamlessly across every project, platform, and career milestone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRequestAccessClick}
              disabled={isRequestAccessLoading}
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold editorial-shadow hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-wait min-w-[220px]"
            >
              {isRequestAccessLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Request Access'
              )}
            </button>
            <button
              onClick={handleReportClick}
              disabled={isReportLoading}
              className="text-on-surface-variant px-8 py-4 font-headline italic hover:text-tertiary transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isReportLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  View Intelligence Report <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[600px] bg-surface-container-high rounded-xl overflow-hidden editorial-shadow"
        >
          <img
            alt="abstract digital geometry"
            className="w-full h-full object-cover opacity-100"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdR35ylxhUa__i0NMh_tBelTtqSpLK53kj6KOmiTZGiOUAV2gV-L7MPiV059GOKLRDJBj5dqRx5-fubgKkXzwwnxl3IT2-x_BtMlTUUTlpS7mtGmwS8ZF10JIfkXU4y-mAeZxhvrJjobvWdKGxAw05-Eym9PGtWwKbInWbYnZjKwPJiuHhfAu8Go7Yl8BnVw9_DdYixI064lmroW8bA6PAli8hvqsY6JYU6h6KMHt9CVEJAU4KFenm6zcykkyr2u7OU23KRt0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
          <div className="absolute bottom-8 left-8 p-6 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg border border-outline-variant/15 max-w-xs">
            <div className="text-primary font-headline text-2xl mb-1">4,000+</div>
            <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Competency Ontology Nodes</div>
          </div>
        </motion.div>
      </section>


      {/* Platform Architecture */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20 space-y-4">
            <span className="font-label uppercase tracking-widest text-[10px] text-primary font-bold">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Four systems. <span className="italic text-primary">One clear path forward.</span></h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">You don't need to understand the tech to benefit from it. Behind the scenes, four interconnected systems work together so you can focus on what matters — building real skills and earning credentials that hold up.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Your Personal Coach", desc: "Think of this as your guide. It connects the right lessons, practice sessions, and feedback — automatically adjusting to where you are so you're always learning at the right pace." },
              { icon: Database, title: "Your Permanent Record", desc: "Everything you learn and prove is saved to a secure record that belongs to you — not to any company or platform. It follows you for life, on your terms." },
              { icon: Lock, title: "You Stay in Control", desc: "Real humans review how AI is used on this platform. You decide what gets shared and with whom. Your data is never sold or used against you." },
              { icon: RefreshCw, title: "Plugs Into Your World", desc: "Whether you're at a university, a company, or learning on your own — Tenured AI fits into the tools you already use. No starting over, no extra work." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/15 hover:border-primary/30 hover:bg-surface-container-high hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-headline font-bold text-xl mb-3">{item.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Section: The Pipeline */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full inline-block">
              § The Pipeline
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">
              Five stages. <span className="italic text-primary">One bonded hire.</span>
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-base">
              A learner enters the Forge. A platform-mutated adversarial Hard-Gate determines whether they earned the credential. The Sovereign Passport is minted to Polygon. The Performance Bond is issued. The Tenured Agent carries the record forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'The Forge', desc: 'Daily two-phase practice against decay across a curated 4,000-node ontology. Builds the candidate, doesn\'t certify them.', pat: 'WHERE YOU TRAIN' },
              { num: '02', title: 'The Hard-Gate', desc: 'Adversarial air-gapped verification. Four-agent council. LLM-defeat-proof by architectural property, not empirical defense.', pat: 'WHERE YOU PROVE IT' },
              { num: '03', title: 'The Passport', desc: 'Merkle-anchored Consensus Certificate. Four-chain redundancy. Candidate-controlled DID. Open-source verification client.', pat: 'WHERE YOU OWN IT' },
              { num: '04', title: 'The Bond', desc: '$150K face value. $11,250 annual premium. 180-day term. Chubb-reinsured Reserve. Audit-ready quarterly attestation.', pat: "WHERE IT'S GUARANTEED" },
              { num: '05', title: 'The Agent', desc: 'Stateful career assistant with persistent memory. Career Memory annotations on every ontology node. Permanent record.', pat: 'WHERE IT FOLLOWS YOU' },
            ].map((stage, idx) => (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface-container-lowest rounded-2xl p-6 shadow-md border border-outline-variant/15 flex flex-col justify-between hover:shadow-xl hover:border-primary/30 transition-all group"
              >
                <div>
                  <span className="font-display font-light text-4xl bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent block mb-3 leading-none">{stage.num}</span>
                  <h4 className="font-headline font-bold text-lg mb-2 group-hover:text-primary transition-colors">{stage.title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{stage.desc}</p>
                </div>
                <div className="font-mono text-[9.5px] font-bold text-primary tracking-wider pt-3 border-t border-outline-variant/10">
                  {stage.pat}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: For You (Persona Switcher) */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-surface-container-lowest border-t border-outline-variant/10" id="personas">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full inline-block">
              § For You
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">
              Five ways the platform <span className="italic text-primary">changes your job.</span>
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-base">
              The Sovereign Talent Ledger serves five distinct stakeholders. Each engages with a different surface, a different economic mechanic, and a different commitment cycle. Find yours.
            </p>

            {/* Persona Tabs */}
            <div className="flex justify-center flex-wrap gap-2 pt-4">
              {[
                { id: 'university', label: 'For Universities' },
                { id: 'enterprise', label: 'For Enterprises' },
                { id: 'recruiter', label: 'For Recruiters' },
                { id: 'state', label: 'For State Leadership' },
                { id: 'learner', label: 'For Learners' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePersonaTab(tab.id as any)}
                  className={cn(
                    'px-6 py-2.5 rounded-full font-headline font-semibold text-xs tracking-wide transition-all cursor-pointer border',
                    activePersonaTab === tab.id
                      ? 'bg-gradient-to-br from-primary to-primary-container text-white border-transparent shadow-lg'
                      : 'bg-surface-container-low text-on-surface-variant border-outline-variant/15 hover:bg-surface-container hover:text-on-surface'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="bg-surface-container-low rounded-3xl p-8 md:p-12 shadow-xl border border-outline-variant/15">
            {activePersonaTab === 'university' && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">Universities · Genesis Institution</span>
                  <h3 className="font-display text-3xl font-light leading-snug">
                    Earn a <span className="italic text-primary font-medium">perpetual 40% dividend</span> on every transaction your graduates originate.
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Genesis Institutions receive a smart-contract-enforced 40% dividend on every transaction value originating from an alumna of the institution — for the length of the graduate's career. Deployed without admin keys.
                  </p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    The League Table quarterly publication ranks institutions by GDA dollars and corridor dominance. Zero upfront procurement cost.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Link to="/universities" className="px-6 py-3 rounded-full font-headline font-bold text-xs text-white shadow-md hover:opacity-95" style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)' }}>
                      Become a Genesis Institution →
                    </Link>
                    <Link to="/universities" className="px-6 py-3 rounded-full font-headline font-semibold text-xs text-on-surface bg-surface-container-lowest border border-outline-variant/20 hover:bg-surface-container">
                      See The League Table →
                    </Link>
                  </div>
                </div>
                <div className="space-y-3 font-mono">
                  {[
                    { label: 'Perpetual dividend', detail: 'Smart-contract enforced', val: '40%' },
                    { label: 'Phase 1 anchor', detail: 'University of Houston', val: 'Live' },
                    { label: 'Pipeline', detail: 'Phase 1 qualified', val: '3 + 5' },
                    { label: 'Phase 3 target', detail: 'Global institutions', val: '4,200' },
                  ].map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
                      <div>
                        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">{s.label}</span>
                        <p className="text-xs text-on-surface font-bold font-sans mt-0.5">{s.detail}</p>
                      </div>
                      <span className="font-display font-medium text-2xl text-primary">{s.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activePersonaTab === 'enterprise' && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">Enterprises · EWARD + Bond</span>
                  <h3 className="font-display text-3xl font-light leading-snug">
                    Underwrite every AI-deploying hire with a <span className="italic text-primary font-medium">$150K reinsured bond.</span>
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    The Enterprise Workforce AI Readiness Dashboard (EWARD) produces an Organizational Sovereign Density score across your AI-deploying workforce. OSD ≥ 0.40 unlocks Silver (15% D&O credit); Gold (25%); Platinum (35%).
                  </p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Every Triple-85 candidate placed comes with an optional Performance Bond — $11,250 annual premium, $150,000 face value, 180-day term.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Link to="/request-access" className="px-6 py-3 rounded-full font-headline font-bold text-xs text-white shadow-md hover:opacity-95" style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)' }}>
                      Request Enterprise Pilot →
                    </Link>
                    <Link to="/underwriting" className="px-6 py-3 rounded-full font-headline font-semibold text-xs text-on-surface bg-surface-container-lowest border border-outline-variant/20 hover:bg-surface-container">
                      View Underwriting Math →
                    </Link>
                  </div>
                </div>
                <div className="space-y-3 font-mono">
                  {[
                    { label: 'Bond face value', detail: 'Per verified hire', val: '$150K' },
                    { label: 'Premium credit', detail: 'Platinum tier', val: '35%' },
                    { label: 'Pilot deployment', detail: 'HRIS to live', val: '14 wk' },
                    { label: 'SEC-ready output', detail: 'Quarterly audit', val: 'Auto' },
                  ].map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
                      <div>
                        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">{s.label}</span>
                        <p className="text-xs text-on-surface font-bold font-sans mt-0.5">{s.detail}</p>
                      </div>
                      <span className="font-display font-medium text-2xl text-primary">{s.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activePersonaTab === 'recruiter' && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">Recruiters · Tenured Candidate Protocol</span>
                  <h3 className="font-display text-3xl font-light leading-snug">
                    Source from <span className="italic text-primary font-medium">Gate-verified candidates only.</span> Win the Tenured Candidate Auction.
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Verified recruiter seats ($18K/year + $120/reveal credit) gain access to the cross-surface attribution filter distinguishing Gate-verified candidates. First 100 seats get $24K credit pack free for 90 days.
                  </p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    The Tenured Candidate Auction is the snipe-protected escrowed talent auction for senior-tier engagements with public livestream broadcasting.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Link to="/recruiters" className="px-6 py-3 rounded-full font-headline font-bold text-xs text-white shadow-md hover:opacity-95" style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)' }}>
                      Claim a Seat →
                    </Link>
                    <Link to="/recruiters" className="px-6 py-3 rounded-full font-headline font-semibold text-xs text-on-surface bg-surface-container-lowest border border-outline-variant/20 hover:bg-surface-container">
                      Watch the Tenured Candidate Auction →
                    </Link>
                  </div>
                </div>
                <div className="space-y-3 font-mono">
                  {[
                    { label: 'Annual seat', detail: 'Verified recruiter access', val: '$18K' },
                    { label: 'Preferred Recruiter Starter', detail: 'Free credit pack · 90d', val: '$24K' },
                    { label: 'Reveal credit', detail: 'Per candidate identity', val: '$120' },
                    { label: 'Volume tier', detail: '50+ seats', val: '25% off' },
                  ].map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
                      <div>
                        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">{s.label}</span>
                        <p className="text-xs text-on-surface font-bold font-sans mt-0.5">{s.detail}</p>
                      </div>
                      <span className="font-display font-medium text-2xl text-primary">{s.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activePersonaTab === 'state' && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">State Leadership · Treasury</span>
                  <h3 className="font-display text-3xl font-light leading-snug">
                    Earn <span className="italic text-primary font-medium">20% of every transaction</span> originated by your state's verified workforce.
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    State Treasury partnerships receive a smart-contract-enforced 20% dividend on every transaction value originating from a candidate in the state's jurisdiction. Non-procurement — zero cost to the state.
                  </p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Kill-Switch Dashboard provides state workforce commissions with real-time CA drift monitoring across partner institutions and corridor enterprises. State of Texas anchor live.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Link to="/request-access" className="px-6 py-3 rounded-full font-headline font-bold text-xs text-white shadow-md hover:opacity-95" style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)' }}>
                      Brief Your Workforce Commission →
                    </Link>
                  </div>
                </div>
                <div className="space-y-3 font-mono">
                  {[
                    { label: 'Perpetual dividend', detail: 'Smart-contract enforced', val: '20%' },
                    { label: 'Phase 1 anchor', detail: 'State of Texas', val: 'Live' },
                    { label: 'Phase 2 pipeline', detail: 'NY · MA · NC', val: '3 states' },
                    { label: 'Cost to state', detail: 'Procurement', val: 'Zero' },
                  ].map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
                      <div>
                        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">{s.label}</span>
                        <p className="text-xs text-on-surface font-bold font-sans mt-0.5">{s.detail}</p>
                      </div>
                      <span className="font-display font-medium text-2xl text-primary">{s.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activePersonaTab === 'learner' && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">Learners · Sovereign Passport</span>
                  <h3 className="font-display text-3xl font-light leading-snug">
                    Earn a credential that <span className="italic text-primary font-medium">outlives the platform that issued it.</span>
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    $0 at Genesis Institutions. $19/month at self-learner tier. Every cleared Hard-Gate mints a Consensus Certificate anchored to four blockchains. The verification client is open-source.
                  </p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Triple-85 status unlocks $150K Performance Bond eligibility at placement. Career Memory carries your annotations across every ontology node for life.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Link to="/learners" className="px-6 py-3 rounded-full font-headline font-bold text-xs text-white shadow-md hover:opacity-95" style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)' }}>
                      Enter the Forge →
                    </Link>
                    <Link to="/manifesto" className="px-6 py-3 rounded-full font-headline font-semibold text-xs text-on-surface bg-surface-container-lowest border border-outline-variant/20 hover:bg-surface-container">
                      Read the Manifesto →
                    </Link>
                  </div>
                </div>
                <div className="space-y-3 font-mono">
                  {[
                    { label: 'Genesis Institution', detail: 'Curriculum-integrated', val: '$0' },
                    { label: 'Self-learner tier', detail: 'Monthly', val: '$19' },
                    { label: 'Performance Bond', detail: 'Triple-85 status', val: '$150K' },
                    { label: 'Verification DID', detail: 'Polygon mainnet', val: 'Active' },
                  ].map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
                      <div>
                        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">{s.label}</span>
                        <p className="text-xs text-on-surface font-bold font-sans mt-0.5">{s.detail}</p>
                      </div>
                      <span className="font-display font-medium text-2xl text-primary">{s.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>


      {/* Section 2: Triple-Threat / Core 4 Scoring Section */}
      <section className="py-24 bg-surface px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 tracking-tight text-on-surface">The Core 3— Plus One Special Designation - 4 Scores, One Platform</h2>
            <p className="text-on-surface-variant max-w-3xl text-base md:text-lg leading-relaxed">
              The Big 3 core indices plus 1 specialized designation — delivering a complete 360° benchmark of AI competence and operator capability on one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* AICI™ Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-surface-container-low p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-outline-variant/10"
            >
              <div className="space-y-6 flex-grow">
                <div className="flex justify-between items-start">
                  <div className="text-xs font-bold text-primary tracking-widest uppercase">Index I</div>
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded"></span>
                </div>
                <h3 className="text-3xl font-headline font-bold text-on-surface">AICI™: Competency</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Focus on foundational literacy, prompting logic, and ethical framework alignment. Verifying the bridge between human intent and synthetic reasoning.</p>

                <div className="pt-4">
                  <div className="text-[10px] uppercase font-bold text-secondary mb-3 tracking-widest">Foundational Knowledge Heatmap</div>
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={cn(
                        "h-8 rounded-sm transition-colors duration-500",
                        i % 3 === 0 ? "bg-primary/90" : i % 2 === 0 ? "bg-primary/60" : "bg-primary/30"
                      )}></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8 space-y-4">
                {[
                  { label: "Prompting Logic", val: 92 },
                  { label: "Ethical Framework", val: 89 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[10px] font-bold uppercase text-secondary tracking-widest">{item.label}</span>
                      <span className="text-sm font-bold text-primary">{item.val}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.val}%` }}
                        viewport={{ once: true }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AIOI™ Card & AIOI-ED™ Educator Box */}
            <div className="space-y-6 flex flex-col justify-between">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-primary text-on-primary p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col flex-1 group"
              >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
                <div className="relative z-10 space-y-4 flex-grow">
                  <div className="text-xs font-bold text-primary-fixed tracking-widest uppercase">Index II • Strategic Level</div>
                  <h3 className="text-2xl md:text-3xl font-headline font-bold text-white">AIOI™: Orchestration</h3>
                  <p className="text-xs md:text-sm text-primary-fixed leading-relaxed">Focusing on Strategic Orchestration: managing systems, multi-agent workflows, and AI solution architecture. Command of the machine through complex loops and agentic reasoning.</p>
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="border-l-2 border-primary-fixed/30 pl-3">
                      <div className="text-[10px] uppercase font-bold text-primary-fixed/70 tracking-widest">Workflows</div>
                      <div className="text-lg font-bold">9.7</div>
                    </div>
                    <div className="border-l-2 border-primary-fixed/30 pl-3">
                      <div className="text-[10px] uppercase font-bold text-primary-fixed/70 tracking-widest">Strategy</div>
                      <div className="text-lg font-bold">9.4</div>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-4 flex items-center gap-4">
                  <GitBranch className="text-primary-fixed w-6 h-6 shrink-0" />
                  <div className="h-1 flex-grow bg-primary-fixed/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '96%' }}
                      viewport={{ once: true }}
                      className="h-full bg-primary-fixed"
                    />
                  </div>
                </div>
              </motion.div>

              <div className="bg-surface-container-highest p-5 md:p-6 rounded-3xl border-2 border-primary/20 relative overflow-hidden flex flex-col gap-3 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                    <School className="text-on-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-bold tracking-tight text-on-surface">AIOI-ED™ Educator Designation</h4>
                    <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest">Specialized Management Sub-score</p>
                  </div>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-normal">Specialized sub-score for Management & Education focusing on Efficiency, Security, and Debug Speed via the WMF Index.</p>
                <div className="bg-on-surface/5 rounded-xl p-2.5 font-mono text-[9px] border border-outline-variant/10">
                  <div className="text-primary font-bold mb-1">// WMF Index: Efficiency (40%) + Security (30%) + Debug (30%)</div>
                  <div className="flex justify-between items-center text-on-surface font-semibold">
                    <span>Certification Status:</span>
                    <span className="text-green-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> VALIDATED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AIBS™ Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-surface-container-low p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-outline-variant/10"
            >
              <div className="space-y-6 flex-grow">
                <div className="flex justify-between items-start">
                  <div className="text-xs font-bold text-primary tracking-widest uppercase">Index III • Architect</div>
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded"></span>
                </div>
                <h3 className="text-3xl font-headline font-bold text-on-surface">AIBS™: Builder Score</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Quantifying technical architect skills: RAG, vector databases, model optimization, and complex agentic workflows.</p>

                <div className="pt-4">
                  <div className="text-[10px] uppercase font-bold text-secondary mb-3 tracking-widest">System Integrity Stress-Test</div>
                  <div className="w-full h-24 bg-surface-container flex items-center justify-center rounded-xl border border-outline-variant/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-[shimmer_2s_infinite]"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center animate-pulse">
                      <Bolt className="text-primary w-8 h-8" />
                    </div>
                    <div className="absolute bottom-2 right-3 text-[10px] font-mono text-primary animate-pulse uppercase tracking-widest">Optimizing...</div>
                  </div>
                </div>
              </div>
              <div className="pt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Vector RAG", val: (aibsScores['Vector RAG'] / 10).toFixed(1) },
                  { label: "Model Opt.", val: (aibsScores['Model Optimization'] / 10).toFixed(1) }
                ].map((item, i) => (
                  <div key={i} className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
                    <div className="text-[10px] uppercase font-bold text-secondary mb-2 tracking-widest">{item.label}</div>
                    <div className="text-xl font-bold text-on-surface">{item.val}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: AICI™ Deep Dive Interactive Radar */}
      <section id="aici-section" className="py-16 bg-surface-container-low border-y border-outline-variant/10 px-18">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Interactive Assessment</span>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">AICI™ Deep Dive</h2>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  Simulate your institutional competency score by adjusting the core metrics below. Our proprietary algorithm weights these factors to determine your global node ranking.
                </p>
              </div>

              <div className="space-y-4">
                {Object.entries(aiciScores).map(([key, value]) => (
                  <Tooltip
                    key={key}
                    externalVisible={hoveredAiciKey === key}
                    content={
                      <div className="space-y-2 text-left">
                        <div className="flex justify-between items-center border-b border-outline-variant/15 pb-1.5 mb-1.5">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.1em]">{key}</span>
                          <span className="font-mono text-xs font-bold text-on-surface">{value}</span>
                        </div>
                        <p className="text-[10px] text-on-surface leading-relaxed font-medium">
                          {aiciDescriptions[key]}
                        </p>
                        <div className="pt-1.5 border-t border-outline-variant/15">
                          <h4 className="text-[8px] font-bold text-primary uppercase tracking-[0.1em] mb-1">Why this matters</h4>
                          <p className="text-[9px] text-on-surface-variant leading-relaxed italic">
                            {aiciWhyMatters[key]}
                          </p>
                        </div>
                      </div>
                    }
                  >
                    <motion.div
                      layout
                      animate={hoveredAiciKey === key ? {
                        scale: 1.02,
                        x: 5,
                        backgroundColor: "rgba(119, 90, 25, 0.08)"
                      } : {
                        scale: 1,
                        x: 0,
                        backgroundColor: "rgba(255, 255, 255, 0)"
                      }}
                      className={cn(
                        "space-y-2 p-3 transition-all duration-300 rounded-xl cursor-help border border-transparent",
                        hoveredAiciKey === key ? "border-primary/20 shadow-xl ring-1 ring-primary/10" : "hover:bg-white/40"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <label className={cn(
                          "text-xs font-bold uppercase tracking-widest transition-colors",
                          hoveredAiciKey === key ? "text-primary" : "text-secondary group-hover:text-primary"
                        )}>{key}</label>
                        <div className="flex items-center gap-2">
                          {hoveredAiciKey === key && (
                            <motion.span
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-[8px] font-black text-primary uppercase tracking-tighter"
                            >
                              Selected Node
                            </motion.span>
                          )}
                          <span className="text-sm font-mono font-bold text-primary">{value}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-on-surface-variant/80 leading-tight mb-1">
                        {aiciDescriptions[key]}
                      </p>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={value}
                          onChange={(e) => setAiciScores(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                          className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary relative z-10"
                        />
                        {hoveredAiciKey === key && (
                          <motion.div
                            layoutId="active-glow"
                            className="absolute -inset-1 bg-primary/10 blur-sm rounded-full z-0"
                          />
                        )}
                      </div>
                    </motion.div>
                  </Tooltip>
                ))}
              </div>

              <div className="pt-6 border-t border-outline-variant/20">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1 text-on-surface-variant">Simulated Score</div>
                    <div className="text-5xl font-headline font-bold text-primary">{getAverage(aiciScores)}</div>
                  </div>
                  <div className="h-12 w-px bg-outline-variant/30"></div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 text-on-surface-variant">Institutional Tier</div>
                    <div className="text-lg font-bold text-on-surface">
                      {getAverage(aiciScores) >= 90 ? 'Sovereign Elite' : getAverage(aiciScores) >= 75 ? 'Institutional Grade' : 'Foundational'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-surface p-8 rounded-3xl border border-outline-variant/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#775a19_1px,transparent_1px)] [background-size:30px_30px]"></div>
              <div className="aspect-square w-full max-w-sm md:max-w-md mx-auto relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="65%"
                    data={aiciRadarData}
                    onMouseMove={(data) => {
                      if (data && data.activeLabel) {
                        setHoveredAiciKey(data.activeLabel);
                      }
                    }}
                    onMouseLeave={() => setHoveredAiciKey(null)}
                  >
                    <PolarGrid stroke="#d1c5b4" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#775a19', fontSize: 12, fontWeight: 'bold' }}
                    />
                    <RadarArea
                      name="Score"
                      dataKey="A"
                      stroke="#775a19"
                      fill="#775a19"
                      fillOpacity={0.5}
                      animationDuration={300}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <AnimatePresence>
                {hoveredAiciKey && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute bottom-6 left-6 right-6 bg-primary/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 z-20 pointer-events-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{hoveredAiciKey}</span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-white">{aiciScores[hoveredAiciKey]}%</span>
                        </div>
                        <p className="text-[11px] text-white/90 leading-tight font-medium">
                          {aiciWhyMatters[hoveredAiciKey]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute top-6 right-6">
                <div className="flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Real-time Sync</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: AIOI™ Deep Dive Interactive Radar */}
      <section id="aioi-section" className="py-16 bg-surface px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-primary p-8 rounded-3xl shadow-2xl relative overflow-hidden order-2 lg:order-1"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]"></div>
              <div className="aspect-square w-full max-w-sm md:max-w-md mx-auto relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={aioiRadarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#ffffff', fontSize: 12, fontWeight: 'bold' }}
                    />
                    <RadarArea
                      name="Score"
                      dataKey="A"
                      stroke="#ffffff"
                      fill="#ffffff"
                      fillOpacity={0.3}
                      animationDuration={300}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Strategic Orchestration</span>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">AIOI™ Deep Dive</h2>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  Measure your capacity for multi-agent synchronization and system resilience. High AIOI scores indicate a mastery of complex synthetic workflows.
                </p>
              </div>

              <div className="space-y-4">
                {Object.entries(aioiScores).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary">{key}</label>
                      <span className="text-sm font-mono font-bold text-primary">{value}</span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant/80 leading-tight mb-1">
                      {aioiDescriptions[key]}
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => setAioiScores(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                      className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-outline-variant/20">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1 text-on-surface-variant">Orchestration Rank</div>
                    <div className="text-5xl font-headline font-bold text-primary">{getAverage(aioiScores)}</div>
                  </div>
                  <div className="h-12 w-px bg-outline-variant/30"></div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 text-on-surface-variant">Command Level</div>
                    <div className="text-lg font-bold text-on-surface">
                      {getAverage(aioiScores) >= 90 ? 'Grand Architect' : getAverage(aioiScores) >= 75 ? 'System Lead' : 'Operator'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: AIBS™ Deep Dive Interactive Radar */}
      <section id="aibs-section" className="py-16 bg-surface-container-low border-y border-outline-variant/10 px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-end flex-wrap gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Technical Soundness</span>
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">AIBS™ Deep Dive</h2>
                  </div>
                  <button
                    onClick={() => {
                      setAibsScores({
                        'Vector RAG': 98,
                        'Model Optimization': 92,
                        'Schema Soundness': 95,
                        'Deployment Velocity': 90,
                        'Infrastructure Integrity': 94,
                      });
                      setAibsLog(['System reset to baseline.', ...aibsLog].slice(0, 5));
                    }}
                    className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Baseline
                  </button>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  Evaluate your technical builder proficiency across RAG architectures, model optimization, and deployment integrity. Adjust the parameters to see real-time status updates.
                </p>
              </div>

              <div className="space-y-4">
                {Object.entries(aibsScores).map(([key, value]) => (
                  <div key={key} className="space-y-2 group">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">{key}</label>
                      <span className="text-sm font-mono font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">{value}</span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant/80 leading-tight mb-1">
                      {aibsDescriptions[key]}
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => updateAibsScore(key, parseInt(e.target.value))}
                      className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-outline-variant/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1 text-on-surface-variant">Builder Score</div>
                      <div className="text-5xl font-headline font-bold text-primary">{getAverage(aibsScores)}</div>
                    </div>
                    <div className="h-12 w-px bg-outline-variant/30"></div>
                    <div className="flex-grow">
                      <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 text-on-surface-variant">Architect Status</div>
                      <div className={cn(
                        "text-lg font-bold px-3 py-1 rounded-lg inline-block",
                        getAverage(aibsScores) >= 90 ? "bg-green-500/10 text-green-700" :
                          getAverage(aibsScores) >= 75 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                      )}>
                        {getAverage(aibsScores) >= 90 ? 'Master Builder' : getAverage(aibsScores) >= 75 ? 'Senior Engineer' : 'Apprentice'}
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface p-4 rounded-xl border border-outline-variant/10 font-mono text-[10px] space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-widest">
                      <Activity className="w-3 h-3" /> System Log
                    </div>
                    {aibsLog.map((log, i) => (
                      <div key={i} className={cn("truncate", i === 0 ? "text-on-surface" : "text-on-surface-variant/50")}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-surface p-8 rounded-3xl border border-outline-variant/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#775a19_1px,transparent_1px)] [background-size:30px_30px]"></div>
              <div className="aspect-square w-full max-w-sm md:max-w-md mx-auto relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={aibsRadarData}>
                    <PolarGrid stroke="#d1c5b4" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#775a19', fontSize: 12, fontWeight: 'bold' }}
                    />
                    <RadarArea
                      name="Score"
                      dataKey="A"
                      stroke="#775a19"
                      fill="#775a19"
                      fillOpacity={0.5}
                      animationDuration={300}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-4 bg-surface/80 backdrop-blur-sm px-6 py-3 rounded-full border border-outline-variant/20 shadow-lg">
                  <div className="flex flex-col items-center">
                    <div className="text-[8px] font-bold text-secondary uppercase tracking-widest">Integrity</div>
                    <div className="text-xs font-bold text-primary">{(getAverage(aibsScores) * 0.998).toFixed(2)}%</div>
                  </div>
                  <div className="w-px h-6 bg-outline-variant/30"></div>
                  <div className="flex flex-col items-center">
                    <div className="text-[8px] font-bold text-secondary uppercase tracking-widest">Latency</div>
                    <div className="text-xs font-bold text-primary">{Math.max(12, 100 - getAverage(aibsScores))}ms</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* AIBS CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 pt-12 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-headline font-bold text-on-surface">Deepen Your Technical Integration</h3>
              <p className="text-on-surface-variant max-w-xl">
                Access the full AIBS™ Protocol documentation, including vector optimization benchmarks, infrastructure requirements, and the complete deployment roadmap.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button href="./method" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-2 hover:bg-surface-tint transition-all shadow-lg active:scale-95">
                Explore Further Details <ArrowRight className="w-4 h-4" />
              </button>
              <button href="./ai-protocol-spec" className="px-8 py-4 bg-surface-container-highest text-on-surface rounded-xl font-bold flex items-center gap-2 hover:bg-outline-variant transition-all active:scale-95 border border-outline-variant/20">
                Download Full Protocol <Bolt className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section: AIOI-ED™ Mini-Assessment */}
      <section className="py-24 bg-surface px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-surface-container-highest rounded-[3rem] p-12 border border-outline-variant/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <School className="w-32 h-32 text-primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Educator Sub-module</span>
                  <h2 className="text-3xl font-headline font-bold text-on-surface">AIOI-ED™ Mini-Assessment</h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    A streamlined evaluation for management and education nodes. Focuses on the WMF (Weighted Multi-Factor) Index.
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(aioiedScores).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">{key}</label>
                        <span className="text-xs font-mono font-bold text-primary">{value}</span>
                      </div>
                      <p className="text-[9px] text-on-surface-variant/80 leading-tight mb-1">
                        {aioiedDescriptions[key]}
                      </p>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => setAioiedScores(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                        className="w-full h-1 bg-surface-container-low rounded-full appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-8 bg-surface rounded-3xl border border-outline-variant/10 shadow-xl">
                <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 text-on-surface-variant font-headline">WMF Index Score</div>
                <div className="text-6xl font-headline font-bold text-primary mb-4">{getAverage(aioiedScores)}</div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  Designation Valid
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Proving Ground Section (PAT-001, PAT-002, PAT-004) */}
      <section className="py-24 md:py-32 px-6 md:px-8 border-t border-outline-variant/10 bg-surface-container-high/20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] block">REAL ADVERSARIAL INGENUITY · SIMULATION</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
              Enter The <span className="italic text-primary">Proving Ground</span>
            </h2>
            <p className="text-on-surface-variant font-light text-base max-w-2xl mx-auto font-body">
              Interact with the active environment. Trigger failure injections to witness how the Adversary Logic Engine evaluates engineers in real-time.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Terminal (Xterm.js Mock) */}
            <div className="lg:col-span-8 bg-[#16140F] border border-[#2d281e] rounded-[2rem] p-6 shadow-2xl relative overflow-hidden flex flex-col h-[520px]">
              {/* Scanlines and Glow Effects */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(rgba(18,16,12,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]" />

              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#2d281e] mb-4 text-[#8a8270] font-mono text-xs select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-semibold text-[#8a8270]">PROVING GROUND · ALE LIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="tracking-widest">⏱ 22:41 · PHASE 2</span>
                </div>
              </div>

              {/* Terminal Console Output */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-[#2d281e]">
                {pgLogs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "text-xs md:text-sm font-mono leading-relaxed break-all",
                      log.type === 'info' && "text-[#8a8270]",
                      log.type === 'ok' && "text-[#7FBF9B]",
                      log.type === 'err' && "text-[#ff8a8a]",
                      log.type === 'chaos' && "text-[#FFBF00] font-semibold",
                      log.type === 'proctor' && "text-[#8FA5D6]",
                      log.type === 'input' && "text-[#FCF9F5]"
                    )}
                  >
                    {log.text}
                  </motion.div>
                ))}

                {/* Simulated Blinking Cursor */}
                <span className="inline-block w-2 h-4 bg-[#E8DFC9] animate-[ping_1.2s_infinite] align-middle ml-1" />
              </div>
            </div>

            {/* Live Telemetry and Council Side Panel */}
            <div className="lg:col-span-4 space-y-6">
              {/* CA Score Card */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-bold text-outline uppercase tracking-wider block">Composite Output Metric</span>
                    <h4 className="text-sm font-bold text-on-surface uppercase tracking-wide">Command Authority (CA)</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-mono text-primary">
                      {pgCaScore}
                    </span>
                    {pgCaDelta && (
                      <span className={cn(
                        "text-xs font-mono font-bold block",
                        pgCaDelta.startsWith('-') ? "text-red-500" : "text-[#7FBF9B]"
                      )}>
                        {pgCaDelta}
                      </span>
                    )}
                  </div>
                </div>
                {/* Health/Resilience progress bar */}
                <div className="h-2 w-full bg-outline/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '81%' }}
                    animate={{ width: `${pgCaScore}%` }}
                    transition={{ type: 'spring', stiffness: 80 }}
                    className="h-full bg-primary"
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-mono">
                  <span className="patent-tag">PAT-001 §A</span>
                  <span>Composite score of active resilience.</span>
                </div>
              </div>

              {/* ALTFL Telemetry (6 Channels) */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-lg space-y-4">
                <div className="border-b border-outline-variant/10 pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-bold text-outline uppercase tracking-wider block">ALTFL Live Feed</span>
                    <h4 className="text-sm font-bold text-on-surface uppercase tracking-wide">6-Channel Forensic Telemetry</h4>
                  </div>
                  <span className="patent-tag">PAT-002</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'KV', label: 'Keystroke Velocity', val: pgTelemetry.KV, desc: 'MS inter-key typing speed' },
                    { key: 'IL', label: 'Inference Latency', val: pgTelemetry.IL, desc: 'Trigger to debug interval' },
                    { key: 'CP', label: 'Command Precision', val: pgTelemetry.CP, desc: 'Action precision accuracy' },
                    { key: 'ET', label: 'Error Trajectory', val: pgTelemetry.ET, desc: 'Backtrack corrections count' },
                    { key: 'VO', label: 'Verify Outcome', val: pgTelemetry.VO, desc: 'Successful test assertions' },
                    { key: 'CCT', label: 'Confidence Gap', val: pgTelemetry.CCT, desc: 'Declared vs actual difference' }
                  ].map((ch) => (
                    <div key={ch.key} className="bg-surface p-3 rounded-xl border border-outline-variant/10 flex flex-col justify-between h-full hover:border-primary/20 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-primary font-mono">{ch.key}</span>
                        <span className="text-[10px] font-mono font-bold text-on-surface text-right">{ch.val}</span>
                      </div>
                      <span className="text-[8px] text-on-surface-variant leading-tight">{ch.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Agent Council Status */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-lg space-y-4">
                <div className="border-b border-outline-variant/10 pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-bold text-outline uppercase tracking-wider block">Agent Dispatch Queue</span>
                    <h4 className="text-sm font-bold text-on-surface uppercase tracking-wide">The Council inside the Gate</h4>
                  </div>
                  <span className="patent-tag">PAT-004</span>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'proctor', name: 'Proctor Agent', state: pgCouncil.proctor, color: 'bg-[#8FA5D6]', text: 'Narration & Anomaly Check' },
                    { id: 'chaos', name: 'Chaos Agent', state: pgCouncil.chaos, color: 'bg-[#FFBF00]', text: 'Adversary Injection Control' },
                    { id: 'auditor', name: 'Auditor Agent', state: pgCouncil.auditor, color: 'bg-[#2C4771]', text: 'Blackboard Merit Evaluation' },
                    { id: 'mentor', name: 'Mentor Agent', state: pgCouncil.mentor, color: 'bg-[#4F8A6B]', text: 'Pedagogical Synthesis (Phase 4)' }
                  ].map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between bg-surface p-3 rounded-xl border border-outline-variant/10">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <span className={cn("w-3 h-3 rounded-full block", agent.color)} />
                          {agent.state !== 'suspended' && agent.state !== 'idle' && (
                            <span className={cn("absolute inset-0 rounded-full block animate-ping opacity-60", agent.color)} />
                          )}
                        </div>
                        <div>
                          <span className="text-xs font-bold block text-on-surface leading-none">{agent.name}</span>
                          <span className="text-[9px] text-on-surface-variant">{agent.text}</span>
                        </div>
                      </div>
                      <span className={cn(
                        "text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border",
                        agent.state === 'active' && "text-[#7FBF9B] bg-[#7FBF9B]/5 border-[#7FBF9B]/20",
                        agent.state === 'warning' && "text-amber-500 bg-amber-500/5 border-amber-500/20",
                        agent.state === 'idle' && "text-on-surface-variant bg-outline/5 border-outline-variant/10",
                        agent.state === 'suspended' && "text-outline/50 bg-outline/5 border-transparent opacity-60"
                      )}>
                        {agent.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Adversary Control Panel */}
          <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 shadow-lg mt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] block">Interactive Walkthrough</span>
                <h3 className="text-lg font-bold text-on-surface">Simulate the Graded Gate Scenario</h3>
                <p className="text-xs text-on-surface-variant font-body">Step through the scenario stages to see the Adversary Logic Engine respond.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setPgActiveLevel('idle');
                    setPgCaScore(81);
                    setPgCaDelta('');
                    setPgTelemetry({
                      KV: 'nominal',
                      IL: 'nominal',
                      CP: '0.82',
                      ET: 'nominal',
                      VO: '22/24',
                      CCT: '0.04'
                    });
                    setPgCouncil({
                      proctor: 'active',
                      chaos: 'idle',
                      auditor: 'idle',
                      mentor: 'suspended'
                    });
                    setPgLogs([
                      { text: "Initializing V-100 Proving Ground Protocol...", type: 'info' },
                      { text: "Node Identity · SOVEREIGN_ALPHA_7 · DID verified", type: 'ok' },
                      { text: "[PROCTOR] ALTFL armed · 6 channels · monitoring", type: 'proctor' },
                      { text: "learner@sovereign:~$ pnpm test RAG-pipeline", type: 'input' },
                      { text: "⏳ running 24 assertions...", type: 'info' },
                      { text: "✓ 22 passed · ✗ 2 failed (retrieval grounding)", type: 'err' },
                    ]);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/20 bg-surface text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Step 1 */}
              <button
                onClick={triggerL1}
                className={cn(
                  "p-5 rounded-2xl border text-left transition-all h-full flex flex-col justify-between hover:shadow-md cursor-pointer",
                  pgActiveLevel === 'L1'
                    ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                    : "border-outline-variant/10 bg-surface hover:border-outline-variant/30"
                )}
              >
                <div className="space-y-2">
                  <span className="text-[9px] font-bold font-mono text-primary uppercase tracking-wider block">Step 1 · PAT-001</span>
                  <h4 className="text-xs font-bold text-on-surface">L1 Stochastic Injection</h4>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">
                    Trigger a backend failure timeout. Notice the Chaos Agent direct you to adjust timeouts.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-[10px] font-bold text-primary">
                  <span>Trigger Injection</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>

              {/* Step 2 */}
              <button
                onClick={triggerL2}
                disabled={pgActiveLevel === 'idle'}
                className={cn(
                  "p-5 rounded-2xl border text-left transition-all h-full flex flex-col justify-between hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
                  pgActiveLevel === 'L2'
                    ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                    : "border-outline-variant/10 bg-surface hover:border-outline-variant/30"
                )}
              >
                <div className="space-y-2">
                  <span className="text-[9px] font-bold font-mono text-primary uppercase tracking-wider block">Step 2 · PAT-001 FIG 3</span>
                  <h4 className="text-xs font-bold text-on-surface">L2 Bully Loop Arming</h4>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">
                    Attempt a basic timeout retry patch. The engine detects pattern-matching and rotates the symptom to Auth credentials.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-[10px] font-bold text-primary">
                  <span>Simulate Response</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>

              {/* Step 3 */}
              <button
                onClick={triggerL3}
                disabled={pgActiveLevel !== 'L2' && pgActiveLevel !== 'L3'}
                className={cn(
                  "p-5 rounded-2xl border text-left transition-all h-full flex flex-col justify-between hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
                  pgActiveLevel === 'L3'
                    ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                    : "border-outline-variant/10 bg-surface hover:border-outline-variant/30"
                )}
              >
                <div className="space-y-2">
                  <span className="text-[9px] font-bold font-mono text-primary uppercase tracking-wider block">Step 3 · PAT-004</span>
                  <h4 className="text-xs font-bold text-on-surface">L3 Chaos Deception</h4>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">
                    The Chaos Agent gaslights with clock-skew deceptions. The Proctor confirms the deception, unlocking the Override.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-[10px] font-bold text-primary">
                  <span>Encounter Gaslighting</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>

              {/* Step 4 */}
              <button
                onClick={() => setShowOverrideModal(true)}
                disabled={pgActiveLevel !== 'L3'}
                className={cn(
                  "p-5 rounded-2xl border text-left transition-all h-full flex flex-col justify-between hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden cursor-pointer",
                  pgActiveLevel === 'L3'
                    ? "border-[#ff8a8a] bg-[#ff8a8a]/5 animate-[pulse_2s_infinite]"
                    : "border-outline-variant/10 bg-surface"
                )}
              >
                <div className="space-y-2">
                  <span className="text-[9px] font-bold font-mono text-red-500 uppercase tracking-wider block">Step 4 · PAT-001 OVERRIDE</span>
                  <h4 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    Sovereign Override (Code 31)
                  </h4>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">
                    Bypass the deception. Reset system baseline coherence, claim authority, and anchor your Consensus Certificate to the ledger.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-[10px] font-bold text-red-500">
                  <span>Activate Code 31</span>
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Sovereign Override Modal Sheet (Code 31) */}
        <AnimatePresence>
          {showOverrideModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#16140F] border border-red-950/40 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative"
              >
                {/* CRT Scanline Effect inside modal */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,12,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]" />

                {/* Modal Header */}
                <div className="p-6 border-b border-[#2d281e] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                    <ShieldAlert className="w-4.5 h-4.5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-red-500 tracking-wider">SOVEREIGN OVERRIDE PROTOCOL</h3>
                    <span className="text-[9px] font-mono text-[#8a8270]">LEDGER SUB-SYSTEM COMMAND: CODE_31</span>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4 font-mono text-xs text-[#E8DFC9]">
                  <div className="bg-[#100e0a] border border-[#2d281e] rounded-xl p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#8a8270]">TARGET_INTERCEPT:</span>
                      <span className="text-[#FFBF00]">CHAOS_AGENT_DECEPTION</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8a8270]">TRUTH_COHERENCE:</span>
                      <span className="text-red-500">DEGRADED_BY_GASLIGHTING</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8a8270]">AUTHORITY_MODE:</span>
                      <span className="text-[#8FA5D6]">SOVEREIGN_BYPASS (OVERRIDE)</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 leading-relaxed text-[#8a8270]">
                    <p className={cn(overrideStep >= 1 ? "text-[#7FBF9B]" : "opacity-40")}>
                      {overrideStep >= 1 ? "✓" : "•"} Bypass Chaos Agent active gaslighting loop...
                    </p>
                    <p className={cn(overrideStep >= 2 ? "text-[#7FBF9B]" : "opacity-40")}>
                      {overrideStep >= 2 ? "✓" : "•"} Restore environment core truth baseline...
                    </p>
                    <p className={cn(overrideStep >= 3 ? "text-[#7FBF9B]" : "opacity-40")}>
                      {overrideStep >= 3 ? "✓" : "•"} Anchoring Consensus Certificate to Merkle Ledger (PAT-010)...
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-[#2d281e] flex gap-3 justify-end select-none">
                  <button
                    disabled={isOverrideExecuting}
                    onClick={() => setShowOverrideModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono border border-transparent text-[#8a8270] hover:text-[#E8DFC9] disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isOverrideExecuting}
                    onClick={executeOverride}
                    className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-red-600 text-white hover:bg-red-700 disabled:bg-red-800 disabled:opacity-75 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {isOverrideExecuting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Restoring...
                      </>
                    ) : (
                      <>
                        Execute Code 31
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* Tenured Agent Section (PAT-004, PAT-005, PAT-009) */}
      <section className="py-24 md:py-32 px-6 md:px-8 border-t border-outline-variant/10 bg-background relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] block">AGENTIC MENTOR/PROCTOR · CHAOS INJECTION</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
              The dual-nature <span className="italic text-primary">Tenured Agent</span>
            </h2>
            <p className="text-on-surface-variant font-light text-base max-w-2xl mx-auto font-body">
              Observe the user-facing intelligence pivot between Mentor and Proctor modes (PAT-005), governed by a four-agent council (PAT-004) and a dynamic Growth Loop (PAT-005).
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Dual-Nature Simulation */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 shadow-xl transition-all duration-500">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/10 pb-6">
                  <div>
                    <span className="text-[9px] font-bold text-outline uppercase tracking-wider block">PAT-005 State Machine</span>
                    <h3 className="text-base font-bold text-on-surface">Dual-Nature Agent Simulator</h3>
                  </div>

                  {/* Mode Selector Switch */}
                  <div className="flex bg-surface p-1 rounded-xl border border-outline-variant/10">
                    <button
                      onClick={() => setTaMode('mentor')}
                      className={cn(
                        "px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer",
                        taMode === 'mentor'
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : "text-on-surface-variant hover:text-on-surface border border-transparent"
                      )}
                    >
                      Mentor Mode
                    </button>
                    <button
                      onClick={() => setTaMode('proctor')}
                      className={cn(
                        "px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer",
                        taMode === 'proctor'
                          ? "bg-red-500/10 text-red-600 border border-red-500/20"
                          : "text-on-surface-variant hover:text-on-surface border border-transparent"
                      )}
                    >
                      Proctor Mode
                    </button>
                  </div>
                </div>

                {/* Animated Showcase Panel */}
                <div className={cn(
                  "p-6 rounded-2xl border transition-all duration-500 relative min-h-[280px] flex flex-col justify-between",
                  taMode === 'mentor'
                    ? "border-emerald-500/20 bg-emerald-500/[0.02]"
                    : "border-red-950 bg-red-950/[0.02]"
                )}>
                  <div className="space-y-4">
                    {/* Header with Mode Name & Voice Waveform */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "w-2.5 h-2.5 rounded-full animate-pulse",
                          taMode === 'mentor' ? "bg-emerald-500" : "bg-red-600"
                        )} />
                        <span className="text-xs font-bold font-mono uppercase tracking-wider text-on-surface">
                          {taMode === 'mentor' ? "MENTOR · ACTIVE" : "PROCTOR · LIVE"}
                        </span>
                      </div>

                      {/* Voice Reasoning Waveform (PAT-009) */}
                      <div className="flex items-end gap-[3px] h-5 px-2">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <motion.span
                            key={i}
                            animate={{
                              height: taMode === 'mentor'
                                ? [10, Math.random() * 20 + 8, 10]
                                : [12, Math.random() * 6 + 10, 12]
                            }}
                            transition={{
                              duration: taMode === 'mentor' ? 0.8 + Math.random() * 0.4 : 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className={cn(
                              "w-[2px] rounded-sm block",
                              taMode === 'mentor' ? "bg-emerald-500" : "bg-red-500 opacity-60"
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Chat Dialogue Streams */}
                    <div className="space-y-3 font-mono text-xs">
                      {taMode === 'mentor' ? (
                        <>
                          <div className="text-emerald-700/80 bg-emerald-500/5 p-3.5 rounded-xl border border-emerald-500/10 leading-relaxed font-body">
                            <span className="text-[10px] font-bold block text-emerald-800 uppercase tracking-widest mb-1 font-mono">Mentor Guidance (Socratic)</span>
                            "Dr. Lena, look closely at the concurrency lock on line 87. You bypassed it using a static sleep interval—but is that thread-safe under parallel workload? What happens to the database connection pool if the gateway remains unresponsive for more than 500ms?"
                          </div>

                          {/* Career Memory Recall vector-graph visual */}
                          <div className="text-primary/80 bg-primary/5 p-3.5 rounded-xl border border-primary/10 leading-relaxed font-body relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#775a19_1px,transparent_1px)] [background-size:20px_20px]"></div>
                            <span className="text-[10px] font-bold block text-primary uppercase tracking-widest mb-1 font-mono flex items-center gap-1.5">
                              <Brain className="w-3 h-3" />
                              Career Memory Recall (PAT-005)
                            </span>
                            "Recall: 14 days ago in node_alpha_5, you resolved a similar thread starvation issue by implementing a semaphore-based pool. Can we draw a parallel here?"
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-[#E8DFC9] bg-[#16140F] p-3.5 rounded-xl border border-red-950/40 leading-relaxed font-mono">
                            <span className="text-[10px] font-bold block text-red-500 uppercase tracking-widest mb-1">Proctor Feed</span>
                            [MONITOR] Telemetry stream online.<br />
                            ▸ KV burst signature detected at 16:42:01. Copy-paste probability: 91%<br />
                            ▸ Diagnostic latency: 180s timeout active.<br />
                            ▸ Direct hint request: DISABLED (Friction checklist active).
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/10 text-[10px] text-on-surface-variant leading-relaxed">
                    {taMode === 'mentor' ? (
                      <span>**Mentor Demeanor**: Context-aware Socratic helper. Automatically decays guidance λ as your mastery improves.</span>
                    ) : (
                      <span>**Proctor Demeanor**: Telemetry-focused observer. Enforces air-gap boundaries and fires anomalies on AI keystroke signatures.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Growth Loop + Council Diagram */}
            <div className="lg:col-span-5 space-y-6">
              {/* Growth Loop γ Card */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-lg space-y-4">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
                  <div>
                    <span className="text-[9px] font-bold text-outline uppercase tracking-wider block">PAT-005 Loop</span>
                    <h4 className="text-sm font-bold text-on-surface uppercase tracking-wide">Growth Coefficient (γ)</h4>
                  </div>
                  <span className="patent-tag">PAT-005</span>
                </div>

                <div className="space-y-4">
                  {/* Slider Control */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-on-surface-variant">Observed TTR:</span>
                      <span className="font-bold text-primary">{taTtr} seconds</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      value={taTtr}
                      onChange={(e) => setTaTtr(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-outline/20 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[8px] text-outline font-mono">
                      <span>10s (Fast Remediation)</span>
                      <span>120s (Slow Diagnostic)</span>
                    </div>
                  </div>

                  {/* Calculated Outputs */}
                  <div className="bg-surface p-4 rounded-xl border border-outline-variant/10 grid grid-cols-2 gap-4 items-center">
                    <div>
                      <span className="text-[9px] text-outline font-mono uppercase block">Growth Dial</span>
                      <span className="text-2xl font-bold font-mono text-primary">
                        γ = {(45 / taTtr).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border inline-block",
                        (45 / taTtr) > 1.2 && "text-[#7FBF9B] bg-[#7FBF9B]/5 border-[#7FBF9B]/20",
                        (45 / taTtr) < 0.8 && "text-red-500 bg-red-500/5 border-red-500/20",
                        (45 / taTtr) >= 0.8 && (45 / taTtr) <= 1.2 && "text-amber-500 bg-amber-500/5 border-amber-500/20"
                      )}>
                        {(45 / taTtr) > 1.2 ? "Recursive Scaled Up" : (45 / taTtr) < 0.8 ? "Refresh Queued" : "Homeostasis"}
                      </span>
                    </div>
                  </div>

                  {/* dynamic scaling description */}
                  <p className="text-[10px] text-on-surface-variant leading-relaxed min-h-[40px] font-body">
                    {(45 / taTtr) > 1.2 && (
                      <span>
                        <strong>Growth Scaled Up:</strong> Excellent TTR. The Tenured Agent's complexity scaler will mutate the successor environment to introduce recursive thread pool starvation anomalies.
                      </span>
                    )}
                    {(45 / taTtr) < 0.8 && (
                      <span>
                        <strong>Growth Scaled Down:</strong> TTR exceedances detected. The scaler reduces baseline noise and dispatches Mentor-led socratic walkthrough paths to re-establish node foundation.
                      </span>
                    )}
                    {(45 / taTtr) >= 0.8 && (45 / taTtr) <= 1.2 && (
                      <span>
                        <strong>Homeostasis Maintained:</strong> TTR remains within the comfort zone. Successor session maintained at optimal difficulty levels to build memory continuity.
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Council Blackboard Map */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-lg space-y-4">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
                  <div>
                    <span className="text-[9px] font-bold text-outline uppercase tracking-wider block">PAT-004 Conflict-of-Interest</span>
                    <h4 className="text-sm font-bold text-on-surface uppercase tracking-wide">Multi-Agent Blackboard Map</h4>
                  </div>
                  <span className="patent-tag">PAT-004</span>
                </div>

                {/* Grid of the 4 Agents and Blackboard */}
                <div className="space-y-4 font-mono text-[10px]">
                  <div className="bg-surface-container-high text-center py-2.5 rounded-lg border border-outline-variant/20 font-bold text-primary tracking-widest shadow-inner">
                    ◇ THE BLACKBOARD
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'mentor', name: 'Mentor (TA)', color: 'border-emerald-500/30 text-emerald-600 bg-emerald-500/[0.02]', desc: 'Socratic helper. Cannot see pending Chaos Injections.' },
                      { id: 'proctor', name: 'Proctor (TA)', color: 'border-rose-950 text-rose-500 bg-rose-500/[0.02]', desc: 'Silent telemetry check. Freezes Mentor when anomaly triggers.' },
                      { id: 'auditor', name: 'Auditor Agent', color: 'border-blue-900/30 text-blue-600 bg-blue-500/[0.02]', desc: 'Silent artifact analyzer. Evaluates asynchronously on Blackboard.' },
                      { id: 'chaos', name: 'Chaos Agent', state: 'Active', color: 'border-amber-500/30 text-amber-500 bg-amber-500/[0.02]', desc: 'Friction dispatcher. Cannot view Mentor guidance states.' }
                    ].map((agent) => (
                      <button
                        key={agent.id}
                        onMouseEnter={() => setTaActiveCouncilAgent(agent.id as any)}
                        onMouseLeave={() => setTaActiveCouncilAgent(null)}
                        onClick={() => setTaActiveCouncilAgent(taActiveCouncilAgent === agent.id ? null : (agent.id as any))}
                        className={cn(
                          "p-3 rounded-xl border text-left transition-all cursor-pointer relative",
                          agent.color,
                          taActiveCouncilAgent === agent.id ? "scale-[1.02] shadow-md border-primary" : "hover:scale-[1.01]"
                        )}
                      >
                        <span className="font-bold block mb-1">{agent.name}</span>
                        <span className="text-[8px] text-on-surface-variant leading-tight block">
                          Tap to view insulation rule
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Interactive details box */}
                  <div className="min-h-[50px] bg-surface p-3 rounded-xl border border-outline-variant/10 text-on-surface-variant font-body">
                    {taActiveCouncilAgent ? (
                      <p className="text-[10px] leading-relaxed">
                        <strong>Insulation:</strong> {
                          [
                            { id: 'mentor', text: 'Mentor cannot read Chaos injection plans to prevent guidance softening or target hints. This separates training from grading.' },
                            { id: 'proctor', text: 'Proctor acts as a watchman. If copy-paste or macro keystrokes trigger anomaly thresholds, it halts Mentor dispatches.' },
                            { id: 'auditor', text: 'Auditor remains socially blind. It does not communicate with the user, grading purely by Blackboard file outputs.' },
                            { id: 'chaos', text: 'Chaos Agent mutates containers via the ALE. It has no access to Auditor evaluations to maintain stochastic objectivity.' }
                          ].find(a => a.id === taActiveCouncilAgent)?.text
                        }
                      </p>
                    ) : (
                      <p className="text-[9px] text-[#8a8270] italic leading-relaxed text-center font-mono py-2">
                        Hover/Tap an agent to reveal Conflict-of-Interest insulation rules (PAT-004 §3.3)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Loop Section (PAT-002, PAT-003, PAT-015, Figma spec) */}
      <section className="py-24 md:py-32 px-6 md:px-8 border-t border-outline-variant/10 bg-background relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] block">
              FOUNDATIONS · THE LEARNING LOOP
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
              Static credentials decay. <span className="italic text-primary">So we built a loop.</span>
            </h2>
            <p className="text-on-surface-variant font-light text-base max-w-3xl mx-auto font-body">
              Every one of the 4,000 ontology nodes carries its own decay coefficient λ, computed from real-time market signals. The Learning Loop's entire job is to keep your verified standing above the Sovereign Threshold.
            </p>
            <div className="pt-4">
              <Link
                to="/learning-loop"
                className="gold-gradient text-on-primary px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
              >
                More on Learning Loop <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Decay Calculator & Formula */}
            <div className="lg:col-span-6 bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                  <div>
                    <span className="text-[9px] font-bold text-outline uppercase tracking-wider block">THE MATH OF OBSOLESCENCE (λ)</span>
                    <h3 className="text-base font-bold text-on-surface">Obsolescence Math & Half-Life</h3>
                  </div>
                  <span className="patent-tag"></span>
                </div>

                {/* Mathematical Formula Screen */}
                <div className="bg-[#16140F] text-[#E8DFC9] p-5 rounded-2xl border border-red-950/40 space-y-3 font-mono text-xs shadow-inner">
                  <div className="flex justify-between items-center border-b border-red-950/30 pb-2">
                    <span className="text-[9px] text-[#8a8270] uppercase font-bold">Formula Terminal</span>
                    <span className="text-[9px] text-[#7FBF9B] font-bold">λ-CALCULATOR ONLINE</span>
                  </div>
                  <div className="space-y-1.5 leading-relaxed">
                    <div className="flex justify-between">
                      <span className="text-outline">Decay Equation:</span>
                      <span className="text-primary font-bold">St = S₀ · e^(−λ·t)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-outline">Decay Rate (λ):</span>
                      <span className="text-amber-500">α·MV + β·IAR + γ·SD − G·σ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-outline">Efficiency Multiplier (σ):</span>
                      <span className="text-[#8FA5D6]">AIOI / 100</span>
                    </div>
                  </div>
                </div>

                {/* Decay Parameters (Sliders) */}
                <div className="space-y-4 font-mono text-xs">
                  {/* Slider 1: Market Velocity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Market Velocity (MV):</span>
                      <span className="font-bold text-primary">{decayMv}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={decayMv}
                      onChange={(e) => setDecayMv(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-outline/25 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Slider 2: Inference Automation Rate */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Inference Automation Rate (IAR):</span>
                      <span className="font-bold text-primary">{decayIar}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={decayIar}
                      onChange={(e) => setDecayIar(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-outline/25 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Slider 3: Skill Drift */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Skill Drift (SD):</span>
                      <span className="font-bold text-primary">{decaySd}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={decaySd}
                      onChange={(e) => setDecaySd(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-outline/25 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Slider 4: Grit Moat */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Grit Moat (G):</span>
                      <span className="font-bold text-emerald-600">{decayG}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={decayG}
                      onChange={(e) => setDecayG(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-outline/25 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Slider 5: Efficiency Multiplier */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Efficiency (σ):</span>
                      <span className="font-bold text-[#2C4771]">{decaySigma}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={decaySigma}
                      onChange={(e) => setDecaySigma(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-outline/25 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Calculated Outputs */}
              <div className="space-y-4 border-t border-outline-variant/10 pt-6">
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="bg-surface p-4 rounded-xl border border-outline-variant/10">
                    <span className="text-[9px] text-outline font-mono uppercase block">Decay Rate (λ)</span>
                    <span className="text-xl font-bold font-mono text-primary">
                      {calculatedLambda.toFixed(4)}
                    </span>
                  </div>
                  <div className="bg-surface p-4 rounded-xl border border-outline-variant/10">
                    <span className="text-[9px] text-outline font-mono uppercase block">Time-To-Breach</span>
                    <span className="text-xl font-bold font-mono text-primary">
                      {daysToBreach} days
                    </span>
                  </div>
                </div>

                {/* Score Projection Visual */}
                <div className="bg-surface-container-high/30 p-4 rounded-xl border border-outline-variant/10 space-y-3 font-mono text-[10px]">
                  <div className="flex justify-between items-center text-outline">
                    <span>DAY</span>
                    <span>SCORE PROJECTION (S₀ = 95)</span>
                    <span>GATE STATUS</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Day 0</span>
                      <span className="font-bold text-on-surface">95.0</span>
                      <span className="text-[#4F8A6B] font-bold">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Day 3</span>
                      <span className="font-bold text-on-surface">
                        {(95 * Math.exp(-calculatedLambda * 3)).toFixed(1)}
                      </span>
                      <span className={cn(
                        "font-bold",
                        (95 * Math.exp(-calculatedLambda * 3)) >= 70 ? "text-[#4F8A6B]" : "text-amber-500"
                      )}>
                        {(95 * Math.exp(-calculatedLambda * 3)) >= 70 ? "Active" : "Warning"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Day 10</span>
                      <span className="font-bold text-on-surface">
                        {(95 * Math.exp(-calculatedLambda * 10)).toFixed(1)}
                      </span>
                      <span className={cn(
                        "font-bold",
                        (95 * Math.exp(-calculatedLambda * 10)) >= 70 && "text-[#4F8A6B]",
                        (95 * Math.exp(-calculatedLambda * 10)) < 70 && (95 * Math.exp(-calculatedLambda * 10)) >= 50 && "text-amber-500",
                        (95 * Math.exp(-calculatedLambda * 10)) < 50 && "text-red-500"
                      )}>
                        {(95 * Math.exp(-calculatedLambda * 10)) >= 70 && "Active"}
                        {(95 * Math.exp(-calculatedLambda * 10)) < 70 && (95 * Math.exp(-calculatedLambda * 10)) >= 50 && "Warning"}
                        {(95 * Math.exp(-calculatedLambda * 10)) < 50 && "Re-Verify"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Telemetry Module Player Simulator */}
            <div className="lg:col-span-6 bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/10 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-on-surface">Telemetry Module Player</h3>
                  </div>

                  {/* Presence Telemetry Pill (PAT-002) */}
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-outline uppercase">Presence:</span>
                    <div className={cn(
                      "badge font-mono text-[9px] tracking-wider font-bold shadow-sm py-1.5 px-3 uppercase border",
                      presenceState === 'active' && "bg-[#4F8A6B]/10 text-[#4F8A6B] border-[#4F8A6B]/20",
                      presenceState === 'idle' && "bg-amber-500/10 text-amber-600 border-amber-500/20",
                      presenceState === 'lost' && "bg-red-500/10 text-red-600 border-red-500/20"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full mr-1.5 inline-block",
                        presenceState === 'active' && "bg-[#4F8A6B] animate-pulse",
                        presenceState === 'idle' && "bg-amber-500",
                        presenceState === 'lost' && "bg-red-500"
                      )} />
                      {presenceState}
                    </div>
                  </div>
                </div>

                {/* Module Selection Tabs (5 Types) */}
                <div className="grid grid-cols-5 gap-1 bg-surface p-1 rounded-xl border border-outline-variant/10 font-mono text-[10px]">
                  {[
                    { id: 'article', label: '▤ Text', desc: 'Long-form telemetry reading' },
                    { id: 'video', label: '▶ Video', desc: 'Lecture playback & scrub watch' },
                    { id: 'podcast', label: '◐ Audio', desc: 'wave transcript synchronizer' },
                    { id: 'code', label: '{ } Code', desc: 'syntax highlighted annotations' },
                    { id: 'quiz', label: '◇ Quiz', desc: 'gauntlet verification gate' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveModule(tab.id as any);
                        setPlayProgress(25);
                      }}
                      className={cn(
                        "py-2 rounded-lg font-bold text-center transition-all cursor-pointer",
                        activeModule === tab.id
                          ? "bg-surface-container-high text-primary border border-outline-variant/10 shadow-sm"
                          : "text-on-surface-variant hover:text-on-surface"
                      )}
                    >
                      {tab.label.split(' ')[0]}
                      <span className="hidden sm:inline"> {tab.label.split(' ').slice(1).join(' ')}</span>
                    </button>
                  ))}
                </div>

                {/* Simulated Player Panel with Specialized Styling */}
                <div className={cn(
                  "p-5 rounded-2xl border transition-all duration-300 min-h-[220px] flex flex-col justify-between relative overflow-hidden",
                  activeModule === 'article' && "border-[#2C4771]/20 bg-[#2C4771]/[0.01]",
                  activeModule === 'video' && "border-[#C5A059]/20 bg-[#C5A059]/[0.01]",
                  activeModule === 'podcast' && "border-[#4F8A6B]/20 bg-[#4F8A6B]/[0.01]",
                  activeModule === 'code' && "border-outline/20 bg-outline/[0.01]",
                  activeModule === 'quiz' && "border-amber-500/20 bg-amber-500/[0.01]"
                )}>
                  {/* Background overlay network mesh */}
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#1c1c1a_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  {/* Player Content Header */}
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-widest block font-mono",
                        activeModule === 'article' && "text-[#2C4771]",
                        activeModule === 'video' && "text-[#C5A059]",
                        activeModule === 'podcast' && "text-[#4F8A6B]",
                        activeModule === 'code' && "text-on-surface-variant",
                        activeModule === 'quiz' && "text-amber-600"
                      )}>
                        {activeModule === 'article' && "N-014 RAG Foundations"}
                        {activeModule === 'video' && "N-038 Vector DB Latency"}
                        {activeModule === 'podcast' && "N-001 Prompt Patterns"}
                        {activeModule === 'code' && "N-064 Multi-Agent Consensus"}
                        {activeModule === 'quiz' && "N-097 Sovereign Underwriting"}
                      </span>
                      <h4 className="text-xs font-bold text-on-surface">
                        {activeModule === 'article' && "Retrieval Augmented Generation & Graph Chunking"}
                        {activeModule === 'video' && "Adversarial Stress Playback · Chapter 3: Indexing"}
                        {activeModule === 'podcast' && "Ep. 49: Context Windows & Attention Telemetry"}
                        {activeModule === 'code' && "Consensus Scaffolding: Semaphore Pool Implementation"}
                        {activeModule === 'quiz' && "L-110 Gauntlet Gate: Final Assessment"}
                      </h4>
                    </div>
                  </div>

                  {/* Interactive dialogue / playback view */}
                  <div className="my-4 font-mono text-[10px] text-on-surface-variant leading-relaxed relative z-10">
                    {activeModule === 'article' && (
                      <p className="bg-surface/80 p-3 rounded-lg border border-outline-variant/10 leading-relaxed font-body">
                        <strong>Text Telemetry:</strong> Reading velocity is monitored. Highlighted text segments generate inline annotations. Reading at 220 WPM. Accrual active.
                      </p>
                    )}
                    {activeModule === 'video' && (
                      <div className="bg-surface/80 p-3 rounded-lg border border-outline-variant/10 flex items-center gap-3">
                        <Play className="w-5 h-5 text-[#C5A059] shrink-0" />
                        <div>
                          <strong>Lecture Playback:</strong> Chapter 3 active.
                          <div className="text-[8px] text-outline font-mono mt-0.5">Scrubbing disabled. Anti-gaming check passed.</div>
                        </div>
                      </div>
                    )}
                    {activeModule === 'podcast' && (
                      <div className="bg-surface/80 p-3 rounded-lg border border-outline-variant/10 flex items-center gap-3">
                        <Volume2 className="w-5 h-5 text-[#4F8A6B] shrink-0" />
                        <div>
                          <strong>Synchronized Audio:</strong> Background listening allowed but flagged in final report. Transcript matching sync rate.
                        </div>
                      </div>
                    )}
                    {activeModule === 'code' && (
                      <p className="bg-surface/80 p-3 rounded-lg border border-outline-variant/10 leading-relaxed font-mono text-[9px] overflow-x-auto whitespace-pre">
                        const semaphore = new Semaphore(poolSize);<br />
                        // tele_check: lock released after annotation<br />
                        await semaphore.acquire();
                      </p>
                    )}
                    {activeModule === 'quiz' && (
                      <p className="bg-surface/80 p-3 rounded-lg border border-outline-variant/10 leading-relaxed font-body text-amber-700">
                        <strong>Gauntlet:</strong> Answer 5 adversarial logic prompts to seal nodes. Skip penalty: -0.05 CA score.
                      </p>
                    )}
                  </div>

                  {/* Progress tracker */}
                  <div className="space-y-1 relative z-10">
                    <div className="flex justify-between font-mono text-[9px] text-outline">
                      <span>Module Progress:</span>
                      <span>{playProgress}%</span>
                    </div>
                    <div className="w-full bg-outline/10 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${playProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Simulated Focus Telemetry Toggles */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-outline block uppercase tracking-wider">Simulate Presence State (PAT-002)</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPresenceState('active')}
                      className={cn(
                        "py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all border cursor-pointer",
                        presenceState === 'active'
                          ? "bg-[#4F8A6B]/15 text-[#4F8A6B] border-[#4F8A6B]/30"
                          : "bg-surface hover:bg-surface-container-high text-on-surface-variant border-outline-variant/10"
                      )}
                    >
                      Active Focus
                    </button>
                    <button
                      onClick={() => setPresenceState('idle')}
                      className={cn(
                        "py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all border cursor-pointer",
                        presenceState === 'idle'
                          ? "bg-amber-500/15 text-amber-600 border-amber-500/30"
                          : "bg-surface hover:bg-surface-container-high text-on-surface-variant border-outline-variant/10"
                      )}
                    >
                      Idle Pause
                    </button>
                    <button
                      onClick={() => setPresenceState('lost')}
                      className={cn(
                        "py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all border cursor-pointer",
                        presenceState === 'lost'
                          ? "bg-red-500/15 text-red-600 border-red-500/30"
                          : "bg-surface hover:bg-surface-container-high text-on-surface-variant border-outline-variant/10"
                      )}
                    >
                      Lost Focus
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Button & Telemetry Points Breakdown */}
              <div className="space-y-4 border-t border-outline-variant/10 pt-4">
                <div className="flex gap-4 items-center justify-between">
                  <button
                    onClick={() => {
                      if (playProgress >= 100) {
                        setPlayProgress(0);
                      } else {
                        setPlayProgress(Math.min(100, playProgress + 10));
                        if (presenceState === 'active') {
                          setAccruedTp(accruedTp + Math.floor(Math.random() * 15 + 15));
                        }
                      }
                    }}
                    className="bg-primary text-on-primary font-mono text-xs px-5 py-3 rounded-xl border border-primary/20 shadow-md hover:opacity-95 transition-all cursor-pointer shrink-0"
                  >
                    {playProgress >= 100 ? "Reset Simulator" : "Simulate Learning Activity"}
                  </button>

                  {/* Accrued Telemetry Points display */}
                  <div className="text-right">
                    <span className="text-[9px] text-outline font-mono block uppercase">Accrued Telemetry (TP)</span>
                    <span className="text-lg font-bold font-mono text-primary flex items-center gap-1.5 justify-end">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                      {accruedTp} TP
                    </span>
                  </div>
                </div>

                {/* TP Source Attribution breakdown bar */}
                <div className="space-y-1.5 font-mono text-[9px] text-on-surface-variant">
                  <div className="flex justify-between items-center text-outline">
                    <span>Accrual Source Attribution:</span>
                    <span>100% Attributed</span>
                  </div>

                  {/* Segmented bar */}
                  <div className="w-full bg-outline/10 h-2.5 rounded-full overflow-hidden flex">
                    <div className="bg-[#4F8A6B] h-full" style={{ width: '40%' }} title="Time Attested portion" />
                    <div className="bg-[#C5A059] h-full" style={{ width: '40%' }} title="Comprehension streak portion" />
                    <div className="bg-[#2C4771] h-full" style={{ width: '20%' }} title="Annotation credit portion" />
                  </div>

                  <div className="flex justify-between items-center flex-wrap gap-2 text-[8px] text-outline">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4F8A6B]" /> Time Attested ({Math.floor(accruedTp * 0.4)} TP)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" /> Comprehension ({Math.floor(accruedTp * 0.4)} TP)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C4771]" /> Annotation ({Math.floor(accruedTp * 0.2)} TP)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grit Heatmap & Sovereign Passport from /learners */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 block">Personal Agency</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">The Sovereign <span className="italic text-primary">Identity</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {isHeatmapLoading ? (
              <>
                <div className="md:col-span-7 bg-surface-container-low p-8 md:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-xl animate-pulse flex flex-col justify-between h-full">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-12 rounded-xl bg-on-surface/5" />
                      <div className="text-right space-y-2">
                        <div className="h-2 bg-primary/10 rounded w-20 ml-auto" />
                        <div className="h-3 bg-on-surface/5 rounded w-24 ml-auto" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-8 bg-on-surface/5 rounded w-48" />
                      <div className="h-4 bg-on-surface/5 rounded w-full" />
                      <div className="h-4 bg-on-surface/5 rounded w-5/6" />
                    </div>
                    <div className="grid grid-cols-12 gap-2 pt-6">
                      {Array.from({ length: 72 }).map((_, i) => (
                        <div key={i} className="aspect-square rounded-sm bg-primary/5" />
                      ))}
                    </div>
                  </div>
                  <div className="pt-10 flex justify-between items-end">
                    <div className="space-y-2">
                      <div className="h-2 bg-primary/10 rounded w-24" />
                      <div className="h-8 bg-on-surface/5 rounded w-16" />
                    </div>
                    <div className="h-4 bg-on-surface/5 rounded w-32" />
                  </div>
                </div>
                <div className="md:col-span-5 bg-[#485e8b]/20 p-8 md:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-xl animate-pulse flex flex-col justify-between h-full">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-on-surface/5" />
                      <div className="h-8 bg-on-surface/5 rounded w-48" />
                    </div>
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center bg-on-surface/5 p-4 rounded-xl">
                          <div className="space-y-2">
                            <div className="h-2 bg-on-surface/10 rounded w-16" />
                            <div className="h-4 bg-on-surface/10 rounded w-24" />
                          </div>
                          <div className="h-3 bg-on-surface/10 rounded w-12" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-12 bg-on-surface/5 rounded-xl w-full" />
                </div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  viewport={{ once: true }}
                  className="md:col-span-7 bg-surface-container-low p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between border border-outline-variant/10 shadow-xl transition-all duration-500"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
                        <BarChart3 className="text-primary w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">Grit Heatmap</div>
                        <div className="text-xs font-mono font-bold text-on-surface">NODE_ALPHA_7</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-headline text-3xl font-bold text-on-surface mb-2 tracking-tight">Cognitive Consistency</h3>
                      <p className="text-on-surface-variant font-light text-base">Mathematical mapping of performance resilience over 72-hour adversarial cycles.</p>
                    </div>

                    <div className="grid grid-cols-12 gap-2 pt-6">
                      {Array.from({ length: 72 }).map((_, i) => {
                        const intensity = (0.2 + (Math.sin(i * 0.5) + 1) * 0.4).toFixed(2);
                        return (
                          <div
                            key={i}
                            className={cn(
                              "aspect-square rounded-sm transition-all duration-300",
                              parseFloat(intensity) > 0.8 ? "bg-primary" :
                                parseFloat(intensity) > 0.5 ? "bg-[#485e8b] opacity-90" :
                                  parseFloat(intensity) > 0.3 ? "bg-primary/40" : "bg-primary/10"
                            )}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-10 flex flex-wrap justify-between items-end gap-6 text-[10px] font-mono uppercase font-bold tracking-widest text-secondary">
                    <div className="space-y-1">
                      <div className="text-primary mb-1">Retention Integrity</div>
                      <div className="text-2xl font-headline text-on-surface tracking-tighter">84.2%</div>
                    </div>
                    <div className="text-right max-w-[200px] leading-relaxed opacity-60">
                      *Skill decay calculated in real-time. Metabolic cooling active.
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-5 bg-[#485e8b] p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between border border-white/10 relative overflow-hidden group text-white shadow-2xl transition-all duration-500"
                >
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] mix-blend-overlay"></div>

                  <div className="space-y-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <Badge className="text-primary-container w-6 h-6" />
                      </div>
                      <h3 className="font-headline text-3xl font-bold tracking-tight">Sovereign Passport</h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "Trust Score", value: "0.98 ALPHA", status: "VERIFIED" },
                        { label: "Global Rank", value: "TOP 2% PEER", status: "LIFTED" },
                        { label: "Auth Key", value: "RSA_4096_S_7", status: "SECURE" }
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-inner">
                          <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">{row.label}</span>
                          <span className="font-mono text-xs font-bold text-white tracking-tight">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10 space-y-6 relative z-10">
                    <p className="text-sm italic text-white font-medium leading-relaxed opacity-80">
                      Forensic proof of performance, cryptographically bound and redacted by default for radical privacy.
                    </p>
                    <Link to="/learners" className="w-full py-4 bg-white text-[#485e8b] font-bold rounded-2xl flex justify-center items-center gap-2 hover:scale-[1.02] transition-all shadow-xl">
                      Explore Passport <LinkIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>



      {/* Trusted By Carousel */}
      <section className="bg-surface-container-lowest border-y border-outline-variant/10 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8 text-center">
          <span className="text-[10px] font-bold text-outline uppercase tracking-[0.3em]">Institutional Partners & Nodes</span>
        </div>
        <div className="relative flex">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 md:gap-24 items-center whitespace-nowrap"
          >
            {[...companies, ...companies].map((company, i) => (
              <div key={i} className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <company.icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-headline font-black tracking-widest text-on-surface">{company.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background overflow-hidden border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isTestimonialsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10 animate-pulse">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="w-3 h-3 bg-primary/20 rounded-full" />
                    ))}
                  </div>
                  <div className="h-4 bg-on-surface-variant/10 rounded w-full mb-3" />
                  <div className="h-4 bg-on-surface-variant/10 rounded w-5/6 mb-3" />
                  <div className="h-4 bg-on-surface-variant/10 rounded w-4/6 mb-8" />
                  <div className="flex justify-between items-end border-t border-outline-variant/10 pt-6">
                    <div className="space-y-2">
                      <div className="h-3 bg-on-surface/10 rounded w-24" />
                      <div className="h-2 bg-outline/10 rounded w-16" />
                    </div>
                    <div className="h-4 bg-primary/10 rounded w-12" />
                  </div>
                </div>
              ))
            ) : (
              testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10 relative group"
                >
                  <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-on-surface-variant italic leading-relaxed mb-8">
                    "{t.text}"
                  </p>
                  <div className="flex justify-between items-end border-t border-outline-variant/10 pt-6">
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">{t.author}</h4>
                      <p className="text-[10px] font-mono text-outline uppercase tracking-widest">{t.role}</p>
                    </div>
                    <div className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10">
                      {t.score}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section from Pricing.tsx */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 block">Sovereign Pricing</span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
              Pay for <span className="italic text-primary">Proven Capability.</span>
            </h2>

            <div className="flex justify-center items-center gap-4 pt-8">
              <span className={cn("text-[10px] font-bold uppercase tracking-widest transition-colors", billingCycle === 'monthly' ? "text-on-surface" : "text-outline")}>Monthly</span>
              <button
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                className="w-10 h-5 bg-surface-container-highest rounded-full relative p-1 transition-colors"
              >
                <div className={cn("w-3 h-3 bg-primary rounded-full transition-transform", billingCycle === 'annual' ? "translate-x-5" : "translate-x-0")} />
              </button>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest transition-colors", billingCycle === 'annual' ? "text-on-surface" : "text-outline")}>
                Annual <span className="text-[10px] text-primary ml-1">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {individualPlans.map((plan, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={cn(
                  "p-8 md:p-10 rounded-3xl flex flex-col border transition-all duration-500 relative",
                  plan.highlight
                    ? "bg-primary text-on-primary border-primary shadow-2xl scale-105 z-10 hover:shadow-primary/40"
                    : "bg-surface-container-low border-outline-variant/15 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    ⭐ Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-headline font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-headline font-bold">${plan.price}</span>
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest", plan.highlight ? "text-primary-fixed" : "text-outline")}>
                      / {billingCycle === 'monthly' ? 'mo' : 'mo billed annually'}
                    </span>
                  </div>
                  <p className={cn("text-xs leading-relaxed", plan.highlight ? "text-on-primary/80" : "text-on-surface-variant")}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-xs">
                      <Check className={cn("w-3.5 h-3.5 mt-0.5 shrink-0", plan.highlight ? "text-on-primary" : "text-primary")} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/request-access"
                  className={cn(
                    "w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all active:scale-95 text-center shadow-lg",
                    plan.highlight
                      ? "bg-surface-container-lowest text-primary hover:bg-white"
                      : "bg-primary text-on-primary hover:opacity-90"
                  )}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="font-label text-xs tracking-[0.3em] text-primary uppercase font-bold block">Clarification Protocols</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Frequently Asked <span className="italic text-primary">Inquiries.</span></h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-2xl border transition-all duration-300 overflow-hidden",
                  openFaqIndex === i
                    ? "bg-surface border-primary/30 shadow-lg"
                    : "bg-surface-container-highest border-outline-variant/10 hover:border-primary/20"
                )}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className={cn(
                    "font-headline font-bold transition-colors",
                    openFaqIndex === i ? "text-primary" : "text-on-surface"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    openFaqIndex === i ? "bg-primary text-on-primary rotate-180" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary"
                  )}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-on-surface-variant text-sm leading-relaxed max-w-3xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-40 px-6 md:px-8 bg-background relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <span className="font-label text-xs tracking-[0.3em] text-primary uppercase font-bold block">Get in Touch</span>
            <h2 className="text-4xl md:text-7xl font-headline font-bold tracking-tighter">Initialize a <span className="italic text-primary">Connection.</span></h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg md:text-xl font-light">
              Ready to underwrite your institutional competence or secure your personal agency? Our tactical team is standing by.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { icon: Mail, label: "Direct Intelligence", value: "hello@tenured.ai", sub: "Operational support" },
              { icon: MessageSquare, label: "Strategic Inquiry", value: "Request Access", sub: "Priority onboarding", link: "/request-access" },
              { icon: Globe, label: "Global Presence", value: "Houston, TX", sub: "Protocol headquarters" }
            ].map((contact, i) => (
              <div key={i} className="p-8 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <contact.icon className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">{contact.label}</h4>
                {contact.link ? (
                  <Link to={contact.link} className="text-xl font-headline font-bold text-on-surface hover:text-primary transition-colors block mb-1">
                    {contact.value}
                  </Link>
                ) : (
                  <div className="text-xl font-headline font-bold text-on-surface block mb-1">{contact.value}</div>
                )}
                <p className="text-xs text-on-surface-variant italic opacity-60">{contact.sub}</p>
              </div>
            ))}
          </div>

          <div className="pt-12">
            <Link
              to="/request-access"
              className="inline-flex items-center gap-3 px-12 py-5 bg-inverse-surface text-inverse-on-surface rounded-2xl font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl"
            >
              Start Onboarding Protocol <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Background Accents */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-tertiary/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 -z-10"></div>
      </section>
    </div>
  );
}
