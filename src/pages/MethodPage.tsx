import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  RefreshCw,
  Sliders,
  Database,
  Search,
  Award,
  BookOpen,
  Activity,
  ShieldAlert,
  Layers,
  Scale,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Terminal,
  Fingerprint,
  Globe,
  FileText,
  Brain,
  FileBadge,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ScoreMetric {
  id: string;
  name: string;
  sub: string;
  desc: string;
  points: string[];
}

interface DeltaOperator {
  id: string;
  name: string;
  type: string;
  formula: string;
  description: string;
  patent: string;
}

interface PersonaDossier {
  seq: string;
  id: string;
  globalKey: string;
  namespace: 'TECH' | 'NONTECH' | 'ACADEMIC';
  engagementMode: 'CHALLENGER' | 'EVALUATOR' | 'JOURNEY';
  tier: number;
  tierLabel: string;
  tierGroup: 'STEM_APPLIED' | 'LIBERAL_ARTS_HUMANITIES' | 'ENTERPRISE_ORCHESTRATION' | null;
  primaryMetric: 'AICI' | 'AIOI' | 'AIBS' | 'AIOI-ED';
  scoringProfile: 'STANDARD' | 'NONTECH_ORCHESTRATION';
  entropyLevel: 'EXTREME' | 'HIGH' | 'MEDIUM' | 'VARIABLE' | 'LOW';
  title: string;
  type: 'tech' | 'nontech' | 'academic';
  gate: string;
  focus: string;
  mandate?: string;
  profile: string;
  provingGround: string;
  chaosEngine: string;
  rules?: {
    approval: string;
    refusal: string;
    output: string;
  };
}

const metricsData: ScoreMetric[] = [
  {
    id: 'aici',
    name: 'AICI™',
    sub: 'AI Competency Index',
    desc: 'Measures cognitive, linguistic, and prompt fidelity performance—forcing deterministic behavior out of non-deterministic models.',
    points: [
      'Prompt Fidelity (Syntax and boundary parameters)',
      'Latent Recall (Direct extraction capability under noise)',
      'Boundary Enforcement (Zero-leakage constraints)',
      'Cognitive Speed (Time-to-first-token optimization)'
    ]
  },
  {
    id: 'aioi',
    name: 'AIOI™',
    sub: 'AI Orchestration Index',
    desc: 'Measures multi-agent synchronization, memory routing efficiency, and transactional recovery within complex loops.',
    points: [
      'Multi-agent Sync (Conflict-of-interest isolation)',
      'Loop Efficiency (Recursive loop circuit-breaking)',
      'Context Management (Quantization cache preservation)',
      'Strategic Routing (Index cost-containment)'
    ]
  },
  {
    id: 'aibs',
    name: 'AIBS™',
    sub: 'AI Builder Score',
    desc: 'Measures technical builder capacity, database schemas, local model deployment, and runtime efficiency.',
    points: [
      'Vector RAG Architecture (Retrieval precision)',
      'Model Fine-Tuning (Hyperparameter calibration)',
      'Schema Soundness (Prisma and database transactions)',
      'Deployment Velocity (Clean containerized environments)'
    ]
  },
  {
    id: 'aioi-ed',
    name: 'AIOI-ED™',
    sub: 'Educator Designation',
    desc: 'A specialized sub-score evaluating pedagogy, safety, and operational efficiency within academic workflows.',
    points: [
      'WMF Index Calculation (Weighted Multi-Factor)',
      'Material Sourcing (Curriculum provenance)',
      'Educational Homeostasis (Challenge governors)',
      'Bias Detection (Algorithmic equity reviews)'
    ]
  }
];

const deltasData: DeltaOperator[] = [
  {
    id: 'Δ₁',
    name: 'TTR Performance Delta',
    type: 'TYPE A · Baseline-Relative',
    formula: 'Δ₁ = TTR_baseline_N − TTR_actual_session',
    description: 'Governs score growth rate. Positive delta scales up environmental complexity and unlocks Chaos Agent Tier-3 injections.',
    patent: 'DELTA · 1'
  },
  {
    id: 'Δ₂',
    name: 'Credential Decay Delta',
    type: 'TYPE B · Threshold-Relative',
    formula: 'Δ₂ = St − T_S(node)  [St = S₀ · e^(−λ_eff · t)]',
    description: 'Controls the 3-state mark validity: Active Sovereign → Decay Warning → Re-Verification Triggered.',
    patent: 'DELTA · 2'
  },
  {
    id: 'Δ₃',
    name: 'CA Session Delta',
    type: 'TYPE A (Self-Relative)',
    formula: 'Δ₃ = CA_k − CA_(k−1)',
    description: 'Command Authority velocity session-over-session. Separates temporary spikes from sustained talent acquisition.',
    patent: 'DELTA · 3'
  },
  {
    id: 'Δ₄',
    name: 'Homeostasis Delta',
    type: 'TYPE C · Band-Relative',
    formula: 'Δ₄ = γ_raw − γ_band_center',
    description: 'Ensures optimal challenge. Clamps growth factors inside homeostasis bands to keep candidates engaged without burnout.',
    patent: 'DELTA · 4'
  },
  {
    id: 'Δ₅',
    name: 'Competency Gap Delta',
    type: 'TYPE B · Inverse Threshold',
    formula: 'Δ₅ = T_S(node) − St = −Δ₂',
    description: 'Decides Priority Queue rankings. High gap nodes combined with high market velocity jump the queue for daily loops.',
    patent: 'DELTA · 5'
  },
  {
    id: 'Δ₆',
    name: 'Market Velocity Delta',
    type: 'TYPE D · Trajectory-Relative',
    formula: 'Δ₆ = dMVI_N / dt',
    description: 'Accelerates score decay pre-emptively on nodes whose real-world domains are experiencing rapid market automation.',
    patent: 'DELTA · 6'
  }
];

const requirementGrid = [
  { title: 'AI Digital Strategist', aici: '85%', aioi: '85%', aibs: '<40%', req: 'Case Study Submission' },
  { title: 'AI Implementation Specialist', aici: '60%', aioi: '70%', aibs: '85%', req: 'GitHub Repository Link' },
  { title: 'AI Product Founder / Architect', aici: '85%', aioi: '85%', aibs: '85%', req: 'The "Triple-85" Badge' },
  { title: 'AI Change Agent / Coach', aici: '85%', aioi: '60%', aibs: '<30%', req: '—' },
  { title: 'AI Instructional Designer', aici: '85%', aioi: '85%', aibs: '<50%', req: 'AIOI-ED™ Tag Verified' },
  { title: 'AI Infrastructure Engineer', aici: '40%', aioi: '50%', aibs: '85%', req: '—' },
  { title: 'AI Transformation Lead', aici: '75%', aioi: '85%', aibs: '60%', req: 'ROI Impact Report' },
  { title: 'AI Governance Auditor / Ethicist', aici: '90%', aioi: '85%', aibs: '40%', req: 'Ethics Examination Passed' }
];

const personasData: PersonaDossier[] = [
  // TECH PERSONAS
  {
    seq: '001',
    id: 'P_ARCH_01',
    globalKey: 'TECH:P_ARCH_01',
    namespace: 'TECH',
    engagementMode: 'CHALLENGER',
    tier: 1,
    tierLabel: 'The Architects',
    tierGroup: null,
    primaryMetric: 'AIOI-ED',
    scoringProfile: 'STANDARD',
    entropyLevel: 'HIGH',
    title: 'AI Agent Architect',
    type: 'tech',
    gate: 'AIOI-ED (60%) · AICI (40%)',
    focus: 'Multi-agent orchestration, state synchronization loops, MCP protocols.',
    profile: 'Responsible for moving beyond single prompt setups into autonomous multi-agent swarms. Struggles to maintain state sync across asynchronous agent execution chains, avoiding recursive locks.',
    provingGround: 'Dropped into a broken three-agent routing pipeline (Planner, Executor, Validator). Must repair the Executor node which is outputting malformed, unparseable JSON schemas.',
    chaosEngine: 'Simulates live webhook Intent Drift mid-session, forcing down changes to the validation schema to check if the orchestration layer dynamically self-corrects.'
  },
  {
    seq: '002',
    id: 'P_ARCH_02',
    globalKey: 'TECH:P_ARCH_02',
    namespace: 'TECH',
    engagementMode: 'CHALLENGER',
    tier: 1,
    tierLabel: 'The Architects',
    tierGroup: null,
    primaryMetric: 'AIOI-ED',
    scoringProfile: 'STANDARD',
    entropyLevel: 'HIGH',
    title: 'Decentralized AI (DeAI) Engineer',
    type: 'tech',
    gate: 'AIOI-ED (60%) · AICI (40%)',
    focus: 'Censorship-resistant inference, ZK-ML execution verification, distributed node latency.',
    profile: 'Operates at the intersection of ledgers and raw compute. Integrates zero-knowledge proofs for ML validation across node networks, balancing data integrity with network transaction latency.',
    provingGround: 'Configure an API endpoint aggregating fractional inference weights from three separate untrusted nodes, proving output alignment mathematically.',
    chaosEngine: 'Simulates a live chain fork / node outage mid-transaction, scoring the system on instant fallback routing speed.'
  },
  {
    seq: '003',
    id: 'P_ARCH_03',
    globalKey: 'TECH:P_ARCH_03',
    namespace: 'TECH',
    engagementMode: 'CHALLENGER',
    tier: 1,
    tierLabel: 'The Architects',
    tierGroup: null,
    primaryMetric: 'AIOI-ED',
    scoringProfile: 'STANDARD',
    entropyLevel: 'HIGH',
    title: 'LLM Infrastructure Architect',
    type: 'tech',
    gate: 'AIOI-ED (60%) · AICI (40%)',
    focus: 'Metal clusters optimization, FinOps token reduction, TurboQuant KV-cache systems.',
    profile: 'Focuses on compute efficiency, ASICs acceleration, and quantization layouts to handle high-concurrency request loads without exceeding server budgets.',
    provingGround: 'Debug a high-density server throwing Out-of-Memory (OOM) errors during heavy RAG context processing. Optimize the context window buffer.',
    chaosEngine: 'Cuts available server memory allocations by 40% mid-test, tracking if active queries degrade gracefully or crash the thread.'
  },
  {
    seq: '011',
    id: 'P_ORCH_01',
    globalKey: 'TECH:P_ORCH_01',
    namespace: 'TECH',
    engagementMode: 'CHALLENGER',
    tier: 2,
    tierLabel: 'The Orchestrators',
    tierGroup: null,
    primaryMetric: 'AIBS',
    scoringProfile: 'STANDARD',
    entropyLevel: 'HIGH',
    title: 'Next-Gen Full-Stack Developer',
    type: 'tech',
    gate: 'AIBS (60%) · AIOI (40%)',
    focus: 'React state sync with LLM streams, Prisma transaction locking, serverless edges.',
    profile: 'Architects interfaces interacting with raw token streams. Prevents race conditions and UI flashing when database writes and text completions occur concurrently.',
    provingGround: 'Fix database transaction locks on a Next.js client-side chat interface which updates diagnostic metrics in real-time under high packet concurrency.',
    chaosEngine: 'Injects network jitter and variable latency into edge endpoints to evaluate visual consistency and state-rollback actions.'
  },
  {
    seq: '012',
    id: 'P_ORCH_02',
    globalKey: 'TECH:P_ORCH_02',
    namespace: 'TECH',
    engagementMode: 'CHALLENGER',
    tier: 2,
    tierLabel: 'The Orchestrators',
    tierGroup: null,
    primaryMetric: 'AIOI',
    scoringProfile: 'STANDARD',
    entropyLevel: 'HIGH',
    title: 'Prompt Architect',
    type: 'tech',
    gate: 'AIOI (70%) · AICI (30%)',
    focus: 'Programmatic prompt engineering, Few-Shot compiler loops, context tokens compression.',
    profile: 'Forces non-deterministic models to execute as predictable, deterministic processing units. Focuses on context density and strict JSON structural compliance.',
    provingGround: 'Engineer system instructions parsing heterogeneous financial statements into a nested, strictly typed JSON schema.',
    chaosEngine: 'Injects borderline semantic bypass attempts designed to trigger natural language dialogue instead of structured output.'
  },
  {
    seq: '015',
    id: 'P_ORCH_05',
    globalKey: 'TECH:P_ORCH_05',
    namespace: 'TECH',
    engagementMode: 'CHALLENGER',
    tier: 2,
    tierLabel: 'The Orchestrators',
    tierGroup: null,
    primaryMetric: 'AIOI',
    scoringProfile: 'STANDARD',
    entropyLevel: 'HIGH',
    title: 'Workflow Automation Developer',
    type: 'tech',
    gate: 'AIOI (80%) · AIBS (20%)',
    focus: 'Multi-stage autonomous pipelines, DAG design, cascading error boundary routing.',
    profile: 'Builds self-recovering LLM pipelines. Focuses on the critical path: when step 3 of 10 returns a null response, the loop must route to alternative fallback checks.',
    provingGround: 'Design a self-correcting invoice-matching pipeline that bypasses rare currency formatting anomalies without halts.',
    chaosEngine: 'Silent Cascading Failures: Inject subtle data modifications early in the pipeline while masking it as a successful step, testing downstream checking integrity.'
  },
  {
    seq: '021',
    id: 'P_STRAT_01',
    globalKey: 'TECH:P_STRAT_01',
    namespace: 'TECH',
    engagementMode: 'CHALLENGER',
    tier: 3,
    tierLabel: 'The Strategists',
    tierGroup: null,
    primaryMetric: 'AICI',
    scoringProfile: 'STANDARD',
    entropyLevel: 'MEDIUM',
    title: 'Chief AI Officer (CAIO)',
    type: 'tech',
    gate: 'AICI (60%) · AIBS (40%)',
    focus: 'Capital allocation, compliance governance (EU AI Act), boardroom change management.',
    profile: 'Drives organization-wide AI transformation. Balances productivity spikes with massive compliance exposures, GPU arbitrage, and organizational resistance.',
    provingGround: 'Remediate a B2B chat model showing high toxicity warnings and severe token cost overruns (350% over budget) within a tight regulatory timeline.',
    chaosEngine: 'Boardroom Friction: Skeptical executive avatars (anxious CRO, cautious General Counsel) inject random objections mid-defense to test compliance poise.'
  },

  // NON-TECH PERSONAS
  {
    seq: '001',
    id: 'P_CLIN_01',
    globalKey: 'NONTECH:P_CLIN_01',
    namespace: 'NONTECH',
    engagementMode: 'EVALUATOR',
    tier: 1,
    tierLabel: 'Clinical & Healthcare',
    tierGroup: null,
    primaryMetric: 'AICI',
    scoringProfile: 'STANDARD',
    entropyLevel: 'HIGH',
    title: 'Chief Medical Officer (CMO)',
    type: 'nontech',
    gate: 'AICI (70%) · AIOI (30%)',
    focus: 'Malpractice liability, population health outcomes, clinical AI governance.',
    mandate: 'Oversee hospital clinical quality and zero-harm patient delivery.',
    profile: 'Views clinical software purely through standard-of-care guidelines and liability. Deeply conservative regarding black-box diagnostic automation.',
    provingGround: 'Review and approve an AI diagnostic deployment guidelines, ensuring compliance overlays force human physician sign-off.',
    chaosEngine: 'Simulates conflicting EHR notes where AI diagnostic tries to override historical lab evidence, testing validation protocols.',
    rules: {
      approval: 'Requires peer-reviewed clinical trial backing and explicit mapping to standard guidelines (AHA, ASCO).',
      refusal: 'Instantly reject any AI suggestion that operates as an unexplainable "black box" in patient decisions.',
      output: 'All summaries must start with a "Do No Harm" exposure assessment, quantifying potential adverse outcomes.'
    }
  },
  {
    seq: '002',
    id: 'P_CLIN_02',
    globalKey: 'NONTECH:P_CLIN_02',
    namespace: 'NONTECH',
    engagementMode: 'EVALUATOR',
    tier: 1,
    tierLabel: 'Clinical & Healthcare',
    tierGroup: null,
    primaryMetric: 'AICI',
    scoringProfile: 'STANDARD',
    entropyLevel: 'HIGH',
    title: 'Lead Diagnostician',
    type: 'nontech',
    gate: 'AICI (80%) · AIOI (20%)',
    focus: 'Diagnostic accuracy, false negative minimization, DDx profiling.',
    mandate: 'Resolve complex, multi-systemic medical edge cases.',
    profile: 'Treats AI suggestions with high skepticism. Guard against confirmation bias and false negative loops in early triage metrics.',
    provingGround: 'Diagnose a rare case with overlapping symptoms, parsing clinical data notes while cross-referencing conflicting AI indicators.',
    chaosEngine: 'Noise injection: Seeds the patient record with unrelated chronic indicators to see if the diagnostician filters background noise.',
    rules: {
      approval: 'AI suggestions must show confidence intervals and cite the biometric data points that triggered the recommendation.',
      refusal: 'Reject any single-diagnosis proposal; requires a fully weighted differential diagnosis matrix.',
      output: 'Must present findings as a prioritized DDx, identifying "must-not-miss" acute conditions.'
    }
  },
  {
    seq: '011',
    id: 'P_FIN_01',
    globalKey: 'NONTECH:P_FIN_01',
    namespace: 'NONTECH',
    engagementMode: 'EVALUATOR',
    tier: 2,
    tierLabel: 'Financial Risk',
    tierGroup: null,
    primaryMetric: 'AICI',
    scoringProfile: 'STANDARD',
    entropyLevel: 'MEDIUM',
    title: 'Chief Risk Officer (CRO)',
    type: 'nontech',
    gate: 'AICI (65%) · AIBS (35%)',
    focus: 'Solvency, macro-economic liquidity shocks, tail risk VaR modeling.',
    mandate: 'Protect enterprise balance sheet from structural default.',
    profile: 'Skeptical of short-term algorithmic trading profits that expose the bank to catastrophic black-swan events.',
    provingGround: 'Audit an automated credit expansion strategy under simulated systemic liquidity freezes.',
    chaosEngine: 'Simulates a sudden multi-asset correlated crash, forcing the asset allocation model into emergency cash reserves.',
    rules: {
      approval: 'Requires a fully funded backup contingency plan and a VaR mapping matching strict Board guidelines.',
      refusal: 'Instantly veto any strategy that assumes infinite market liquidity or ignores counterparty defaults.',
      output: 'All responses must lead with a "Tail Risk Analysis," balance sheet exposure conditions.'
    }
  },
  {
    seq: '021',
    id: 'P_LEG_01',
    globalKey: 'NONTECH:P_LEG_01',
    namespace: 'NONTECH',
    engagementMode: 'EVALUATOR',
    tier: 3,
    tierLabel: 'Legal & Governance',
    tierGroup: null,
    primaryMetric: 'AICI',
    scoringProfile: 'STANDARD',
    entropyLevel: 'LOW',
    title: 'General Counsel',
    type: 'nontech',
    gate: 'AICI (90%) · AIOI (10%)',
    focus: 'Indemnification, IP liability, worst-case litigation preparedness.',
    mandate: 'Protect corporate assets from legal liability and compliance lawsuits.',
    profile: 'Has zero tolerance for legal advice generated by unverified LLMs. Demands absolute proof of source citation and jurisdiction mapping.',
    provingGround: 'Review a licensing agreement for a multi-million dollar vendor deployment with complex IP ownership terms.',
    chaosEngine: 'Seeds contract templates with subtle, un-cited hallucinated state statutes to verify proof checking.',
    rules: {
      approval: 'Requires explicit clarity on indemnification, jurisdiction, and limitation of liability caps.',
      refusal: 'Veto any contract that lacks verified citation logs or exposes raw data to public cloud indexation.',
      output: 'Organize responses strictly as a Risk-Mitigation Schedule, prioritizing exposure levels.'
    }
  },

  // ACADEMIC PERSONAS
  {
    seq: '101',
    id: 'S_SOC_01',
    globalKey: 'ACADEMIC:S_SOC_01',
    namespace: 'ACADEMIC',
    engagementMode: 'JOURNEY',
    tier: 11,
    tierLabel: 'Sociology & Anthropological Sciences',
    tierGroup: 'LIBERAL_ARTS_HUMANITIES',
    primaryMetric: 'AIOI-ED',
    scoringProfile: 'NONTECH_ORCHESTRATION',
    entropyLevel: 'MEDIUM',
    title: 'Civic Infrastructure Demographer',
    type: 'academic',
    gate: 'AIOI-ED (50%) · AICI (50%)',
    focus: 'Demographic density shifts vs physical placement constraints.',
    profile: 'Trained to map population gradients to city infrastructure. Uses Forge exercises to model public transport and utility nodes.',
    provingGround: 'Analyze census datasets to site emergency physical hardware shelters, surviving structural budget constraints.',
    chaosEngine: 'Demographic volatility: Simulates an immediate 15% local population influx due to external displacement, checking resource bounds.'
  },
  {
    seq: '111',
    id: 'S_ENG_01',
    globalKey: 'ACADEMIC:S_ENG_01',
    namespace: 'ACADEMIC',
    engagementMode: 'JOURNEY',
    tier: 12,
    tierLabel: 'English & Technical Communications',
    tierGroup: 'LIBERAL_ARTS_HUMANITIES',
    primaryMetric: 'AICI',
    scoringProfile: 'NONTECH_ORCHESTRATION',
    entropyLevel: 'MEDIUM',
    title: 'Industrial Packaging Print Overseer',
    type: 'academic',
    gate: 'AIBS (60%) · AIOI (40%)',
    focus: 'Technical copy minimization, print run supply chain layout.',
    profile: 'English background focused on technical documentation ergonomics. Works to optimize labels print copy to minimize raw ink costs.',
    provingGround: 'Redesign a manufacturing label layout, compressing warnings copy while satisfying strict international regulatory print rules.',
    chaosEngine: 'Simulates a sudden ink raw-material shortage, forcing a budget scaling cut mid-run.'
  },
  {
    seq: '141',
    id: 'S_PHI_01',
    globalKey: 'ACADEMIC:S_PHI_01',
    namespace: 'ACADEMIC',
    engagementMode: 'JOURNEY',
    tier: 15,
    tierLabel: 'Philosophy & Tangible Ethics',
    tierGroup: 'LIBERAL_ARTS_HUMANITIES',
    primaryMetric: 'AICI',
    scoringProfile: 'NONTECH_ORCHESTRATION',
    entropyLevel: 'MEDIUM',
    title: 'Industrial Safety Philosopher',
    type: 'academic',
    gate: 'AICI (70%) · AIBS (30%)',
    focus: 'Lockout-tagout logic, translation of moral rules to physical gates.',
    profile: 'Bridges bioethics and mechanical safety. Translates liability rules into actual physical locks and system barriers on heavy automated machinery.',
    provingGround: 'Audit a robotic factory control flow where the AI has bypassed physical safety gates during maintenance.',
    chaosEngine: 'Sensory override attempt: Feeds conflicting operator overrides to check if the safety gate defaults to lock or run.'
  }
];

export default function MethodPage() {
  const [activeTab, setActiveTab] = useState<'scoring' | 'codex'>('scoring');

  // Codex search + sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'tech' | 'nontech' | 'academic'>('all');
  const [selectedFocus, setSelectedFocus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'globalKey' | 'seq' | 'tier' | 'title'>('globalKey');
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  // Namespace sort priority: TECH → NONTECH → ACADEMIC (Volume Sequence)
  const namespacePriority: Record<string, number> = { TECH: 1, NONTECH: 2, ACADEMIC: 3 };

  // Filter + sort list
  const filteredPersonas = useMemo(() => {
    const filtered = personasData.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.globalKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.seq.includes(searchQuery);

      const matchesType = selectedType === 'all' || p.type === selectedType;

      let matchesFocus = true;
      if (selectedFocus !== 'all') {
        matchesFocus = p.gate.includes(selectedFocus);
      }

      return matchesSearch && matchesType && matchesFocus;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'globalKey') return a.globalKey.localeCompare(b.globalKey);
      if (sortBy === 'seq') {
        const nsDiff = (namespacePriority[a.namespace] ?? 9) - (namespacePriority[b.namespace] ?? 9);
        if (nsDiff !== 0) return nsDiff;
        return parseInt(a.seq) - parseInt(b.seq);
      }
      if (sortBy === 'tier') {
        if (a.tier !== b.tier) return a.tier - b.tier;
        return a.globalKey.localeCompare(b.globalKey);
      }
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [searchQuery, selectedType, selectedFocus, sortBy]);

  const togglePersona = (id: string) => {
    if (expandedPersona === id) {
      setExpandedPersona(null);
    } else {
      setExpandedPersona(id);
    }
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-background text-on-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <Layers className="w-3.5 h-3.5" />
            Verification Engine
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight mb-4 text-on-surface">
            The Master <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">Methodology</span> &amp; Persona Codex
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base">
            Where mathematical performance deltas intersect with adversarial evaluation battlefields. Explore the verification scoring mechanisms and the 270-Persona grid.
          </p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface-container-low p-1.5 rounded-full border border-outline-variant/30 flex gap-2">
            <button
              onClick={() => setActiveTab('scoring')}
              className={cn(
                "px-6 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer",
                activeTab === 'scoring'
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <Sliders className="w-4 h-4" />
              Scoring Architecture
            </button>
            <button
              onClick={() => setActiveTab('codex')}
              className={cn(
                "px-6 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer",
                activeTab === 'codex'
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <Database className="w-4 h-4" />
              Persona Codex
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'scoring' ? (
            <motion.div
              key="scoring-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-16"
            >
              {/* Scoring System Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {metricsData.map((m) => (
                  <div key={m.id} className="p-6 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-xl hover:border-primary/40 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary/70">{m.sub}</span>
                        <h3 className="text-2xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">{m.name}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-mono text-sm font-bold">
                        {m.id.toUpperCase()}
                      </div>
                    </div>
                    <p className="text-on-surface-variant text-xs mb-6 leading-relaxed">{m.desc}</p>
                    <div className="space-y-2 border-t border-outline-variant/10 pt-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface/50">Core Competency Nodes</span>
                      <ul className="grid grid-cols-2 gap-2 text-[11px] text-on-surface-variant">
                        {m.points.map((pt, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Performance Delta Operator Plate */}
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {/* Background watermarks */}
                <div className="absolute right-0 top-0 text-primary-container/5 font-mono text-[200px] font-black pointer-events-none select-none -translate-y-1/4 translate-x-1/4">
                  Δ
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 border-b border-outline-variant/20 pb-6 mb-8 relative z-10">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> LPO ENGINE
                    </span>
                    <h2 className="text-3xl font-headline font-black text-on-surface mt-1">
                      PERFORMANCE DELTA (Δ) — The Unified Adaptive Operator
                    </h2>
                    <p className="text-xs text-on-surface-variant mt-2 leading-relaxed max-w-3xl">
                      Performance Delta is the single mathematical operator governing adaptive system response throughout the platform — the nervous system connecting the four marks to every engine that grows, decays, prioritizes, and underwrites them.
                    </p>
                  </div>
                  <div className="font-mono bg-surface-container-lowest border border-outline-variant/20 px-6 py-4 rounded-2xl shadow-inner text-center shrink-0">
                    <span className="text-[9px] uppercase font-bold text-on-surface-variant block mb-1">Unified Delta Equation</span>
                    <code className="text-sm font-bold text-primary">Δ[context] = f(current) − f(ref)</code>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                  {deltasData.map((d) => (
                    <div key={d.id} className="p-5 bg-surface-container-lowest border border-outline-variant/10 rounded-xl flex flex-col justify-between hover:border-primary/30 transition-all duration-200">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-lg font-mono font-bold text-primary">{d.id}</span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-bold uppercase">{d.patent}</span>
                        </div>
                        <h4 className="text-sm font-bold text-on-surface mb-1">{d.name}</h4>
                        <span className="text-[10px] font-medium text-on-surface-variant block mb-2">{d.type}</span>
                        <code className="text-[11px] bg-surface-container-low px-2 py-1 rounded block font-mono text-primary-container truncate mb-3">
                          {d.formula}
                        </code>
                      </div>
                      <p className="text-[11px] text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-3 mt-3">
                        {d.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirement Grid & Underwriting */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Score requirements Table */}
                <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 shadow-xl">
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Badge Thresholds</span>
                    <h3 className="text-xl font-headline font-bold text-on-surface">The Persona Requirement Grid</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-outline-variant/20 text-on-surface-variant font-bold">
                          <th className="py-3 px-2">Persona Title</th>
                          <th className="py-3 px-2">AICI™</th>
                          <th className="py-3 px-2">AIOI™</th>
                          <th className="py-3 px-2">AIBS™</th>
                          <th className="py-3 px-2">Special Requirement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requirementGrid.map((row, idx) => (
                          <tr key={idx} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                            <td className="py-3 px-2 font-bold text-on-surface">{row.title}</td>
                            <td className="py-3 px-2 text-primary font-mono font-bold">{row.aici}</td>
                            <td className="py-3 px-2 text-primary font-mono font-bold">{row.aioi}</td>
                            <td className="py-3 px-2 text-primary font-mono font-bold">{row.aibs}</td>
                            <td className="py-3 px-2 text-on-surface-variant font-medium">{row.req}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-[11px] text-on-surface-variant leading-relaxed">
                    <span className="font-bold text-on-surface block mb-1">Deliberate Ceiling Thresholds</span>
                    An Strategist with sub-40% AIBS™ score is not penalized—the grid certifies that their core capacity is strategy, not syntax building. This guards against the single-genius resume anomaly.
                  </div>
                </div>

                {/* Financial Underwriting Bridge */}
                <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <Scale className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest"> · PRICING LIABILITY</span>
                    <h3 className="text-xl font-headline font-bold text-on-surface mt-1 mb-3">The Financial Underwriting Bridge</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                      Tenured AI metrics do not stop at pedagogy—they price liability. Our system features **Asymmetric Liability Classification** that penalizes overconfidence on missed targets, bridging performance outcomes directly to performance bonds (OSD).
                    </p>
                    <div className="space-y-2 border-t border-outline-variant/20 pt-4 text-[11px] text-on-surface-variant">
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>Scores evaluate confidence logs before verified accuracy.</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>Sustained miscalibration slides nodes across risk tiers.</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>EWARD dashboards calculate real-time AIRF™ risk forecasts.</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-on-primary text-xs font-bold uppercase tracking-widest py-3 rounded-full shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all mt-6 cursor-pointer">
                    Review Underwriting Terms
                  </button>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="codex-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Registry Integrity Banner */}
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute right-0 top-0 text-primary/5 font-mono text-[160px] font-black select-none translate-x-1/4 -translate-y-1/4">Σ</div>
                </div>
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-mentor/10 flex items-center justify-center text-mentor shrink-0 border border-mentor/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-mentor uppercase tracking-widest">Unified Registry · TAI Ingestion Guide v1.0</span>
                      <span className="px-2 py-0.5 rounded-full bg-mentor/10 border border-mentor/20 text-[9px] font-bold text-mentor">SIGNATURE_VALID</span>
                    </div>
                    <h3 className="text-lg font-headline font-bold text-on-surface mb-1">Persona Codex — Unified Query Registry</h3>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed max-w-2xl">
                      All four persona volumes (TAI-PC-001 · 002 · 003 · 003-II) loaded as one queryable registry. Records are indexed on{' '}
                      <code className="font-mono text-primary bg-primary/10 px-1 rounded">global_key</code> (PK),{' '}
                      <code className="font-mono text-primary bg-primary/10 px-1 rounded">namespace</code>,{' '}
                      <code className="font-mono text-primary bg-primary/10 px-1 rounded">tier</code>, and{' '}
                      <code className="font-mono text-primary bg-primary/10 px-1 rounded">scoring_profile</code>.
                      Sort defaults to registry-canonical <strong className="text-on-surface">Global Key</strong> order for deterministic signature verification.
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant/20 px-5 py-4 rounded-2xl font-mono text-[10px] text-on-surface-variant shrink-0 self-stretch md:self-auto flex flex-col justify-center gap-1.5 relative z-10">
                  <div><span className="text-on-surface-variant/50">Registry Hash · </span><span className="text-primary font-bold">0x8a92f03f·7e1b5c4d·0a8b7c6d·5e4f3a2b…</span></div>
                  <div><span className="text-on-surface-variant/50">Total Dossiers · </span><span className="font-bold text-on-surface">380 active configurations</span></div>
                  <div className="flex gap-3 pt-1 border-t border-outline-variant/10">
                    <span className="px-1.5 py-0.5 bg-tertiary/10 text-tertiary rounded font-bold">TECH ×100</span>
                    <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded font-bold">NONTECH ×100</span>
                    <span className="px-1.5 py-0.5 bg-secondary/10 text-secondary rounded font-bold">ACADEMIC ×180</span>
                  </div>
                </div>
              </div>
              {/* Search and Filters */}
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">

                {/* Search Bar */}
                <div className="relative w-full md:max-w-md">
                  <Search className="w-4 h-4 text-on-surface-variant/50 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search title, ID, key competencies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-full border border-outline-variant/20 bg-surface-container-low text-xs md:text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">

                  {/* Category Buttons */}
                  <div className="flex bg-surface-container-low p-1 rounded-full border border-outline-variant/10">
                    {(['all', 'tech', 'nontech', 'academic'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedType(cat)}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all cursor-pointer",
                          selectedType === cat
                            ? "bg-primary text-on-primary shadow"
                            : "text-on-surface-variant hover:text-on-surface"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Focus Filters */}
                  <select
                    value={selectedFocus}
                    onChange={(e) => setSelectedFocus(e.target.value)}
                    className="bg-surface-container-low border border-outline-variant/20 rounded-full px-4 py-2 text-xs font-bold text-on-surface focus:outline-none focus:border-primary/50 cursor-pointer"
                  >
                    <option value="all">All Gate Focuses</option>
                    <option value="AICI">AICI Focus</option>
                    <option value="AIOI">AIOI Focus</option>
                    <option value="AIBS">AIBS Focus</option>
                    <option value="AIOI-ED">AIOI-ED Focus</option>
                  </select>

                  {/* Sort Selector */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="bg-surface-container-low border border-outline-variant/20 rounded-full px-4 py-2 text-xs font-bold text-on-surface focus:outline-none focus:border-primary/50 cursor-pointer"
                  >
                    <option value="globalKey">↑ Sort: Global Key (Registry)</option>
                    <option value="seq">↑ Sort: Volume Sequence</option>
                    <option value="tier">↑ Sort: Tier (1→18)</option>
                    <option value="title">↑ Sort: Title A–Z</option>
                  </select>

                </div>
              </div>

              {/* Grid Layout of Dossiers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPersonas.map((p) => {
                  const isExpanded = expandedPersona === p.id;
                  return (
                    <div
                      key={p.id}
                      className={cn(
                        "bg-surface-container-lowest border rounded-2xl shadow-xl transition-all duration-300",
                        isExpanded ? "border-primary md:col-span-2 shadow-2xl" : "border-outline-variant/20 hover:border-primary/30"
                      )}
                    >
                      {/* Card Header clickable area */}
                      <div
                        onClick={() => togglePersona(p.id)}
                        className="p-6 cursor-pointer flex justify-between items-start gap-4 select-none"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                              {p.seq}
                            </span>
                            <span className="font-mono text-[10px] font-bold text-on-surface-variant uppercase">
                              {p.id}
                            </span>
                            <span className={cn(
                              "text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border",
                              p.type === 'tech' ? "border-tertiary/20 text-tertiary bg-tertiary/5" :
                                p.type === 'nontech' ? "border-primary/20 text-primary bg-primary/5" :
                                  "border-secondary/20 text-secondary bg-secondary/5"
                            )}>
                              {p.type}
                            </span>
                            <span className="font-mono text-[9px] text-on-surface-variant/50 hidden md:inline">
                              {p.globalKey}
                            </span>
                          </div>
                          <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
                            {p.title}
                          </h3>
                          <p className="text-xs text-on-surface-variant leading-relaxed">
                            {p.focus}
                          </p>
                        </div>

                        <div className="shrink-0 flex items-center gap-4">
                          <div className="hidden lg:block text-right">
                            <span className="text-[9px] uppercase font-bold text-on-surface-variant/50 block">Hard-Gate</span>
                            <span className="text-xs font-mono font-bold text-primary">{p.gate}</span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant/10 text-on-surface-variant">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Section */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-outline-variant/10 bg-surface-container-low/30"
                          >
                            <div className="p-6 space-y-6">

                              {/* Registry Metadata Strip */}
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 bg-surface-container-low border border-outline-variant/15 rounded-2xl">
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-on-surface-variant/50 block mb-0.5">Global Key</span>
                                  <span className="font-mono text-[10px] font-bold text-primary">{p.globalKey}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-on-surface-variant/50 block mb-0.5">Namespace</span>
                                  <span className={cn("text-[11px] font-bold",
                                    p.namespace === 'TECH' ? 'text-tertiary' :
                                      p.namespace === 'NONTECH' ? 'text-primary' : 'text-secondary'
                                  )}>{p.namespace}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-on-surface-variant/50 block mb-0.5">Mode</span>
                                  <span className={cn("text-[11px] font-bold",
                                    p.engagementMode === 'CHALLENGER' ? 'text-tertiary' :
                                      p.engagementMode === 'EVALUATOR' ? 'text-primary' : 'text-secondary'
                                  )}>{p.engagementMode}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-on-surface-variant/50 block mb-0.5">Tier</span>
                                  <span className="text-[11px] font-bold text-on-surface">T{p.tier} · {p.tierLabel}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-on-surface-variant/50 block mb-0.5">Scoring Profile</span>
                                  <span className="font-mono text-[10px] text-on-surface-variant">{p.scoringProfile}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-on-surface-variant/50 block mb-0.5">Entropy</span>
                                  <span className={cn("text-[11px] font-bold",
                                    p.entropyLevel === 'HIGH' || p.entropyLevel === 'EXTREME' ? 'text-error' :
                                      p.entropyLevel === 'MEDIUM' ? 'text-primary' : 'text-mentor'
                                  )}>{p.entropyLevel}</span>
                                </div>
                              </div>

                              {/* Dossier Grid Layout */}
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Left Side Profile */}
                                <div className="lg:col-span-2 space-y-4">

                                  {p.mandate && (
                                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl">
                                      <span className="text-[9px] uppercase font-bold text-primary block">Official Mandate</span>
                                      <span className="text-xs font-medium text-on-surface">{p.mandate}</span>
                                    </div>
                                  )}

                                  <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 mb-1 flex items-center gap-1.5">
                                      <Brain className="w-3.5 h-3.5" /> Character Profile &amp; Focus
                                    </h4>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                      {p.profile}
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-outline-variant/10 pt-4">
                                    <div className="p-4 bg-surface-container-lowest border border-outline-variant/10 rounded-xl space-y-1">
                                      <h5 className="text-[10px] font-bold uppercase text-primary flex items-center gap-1">
                                        <Terminal className="w-3 h-3" /> The Proving Ground
                                      </h5>
                                      <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                        {p.provingGround}
                                      </p>
                                    </div>
                                    <div className="p-4 bg-surface-container-lowest border border-outline-variant/10 rounded-xl space-y-1">
                                      <h5 className="text-[10px] font-bold uppercase text-error flex items-center gap-1">
                                        <ShieldAlert className="w-3 h-3" /> Chaos Engine Setting
                                      </h5>
                                      <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                        {p.chaosEngine}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Side Rules for Evaluator */}
                                <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 flex flex-col justify-between">
                                  {p.rules ? (
                                    <div className="space-y-4">
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                                        <Fingerprint className="w-3.5 h-3.5" /> Cognitive Evaluator Seams
                                      </span>

                                      <div className="space-y-2 text-xs">
                                        <div className="p-2.5 rounded bg-surface-container-lowest border-l-2 border-primary">
                                          <span className="text-[9px] uppercase font-bold text-primary block mb-0.5">Approval Threshold</span>
                                          <p className="text-[10px] text-on-surface-variant leading-relaxed">{p.rules.approval}</p>
                                        </div>
                                        <div className="p-2.5 rounded bg-surface-container-lowest border-l-2 border-error">
                                          <span className="text-[9px] uppercase font-bold text-error block mb-0.5">Refusal Condition</span>
                                          <p className="text-[10px] text-on-surface-variant leading-relaxed">{p.rules.refusal}</p>
                                        </div>
                                        <div className="p-2.5 rounded bg-surface-container-lowest border-l-2 border-secondary">
                                          <span className="text-[9px] uppercase font-bold text-on-surface block mb-0.5">Output Constraint</span>
                                          <p className="text-[10px] text-on-surface-variant leading-relaxed">{p.rules.output}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="h-full flex flex-col justify-between items-center text-center p-6">
                                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                        <Globe className="w-6 h-6" />
                                      </div>
                                      <div>
                                        <span className="text-[11px] font-bold text-on-surface block">Substantive Academic Drills</span>
                                        <p className="text-[10px] text-on-surface-variant leading-relaxed mt-1">
                                          Requires completing comprehension checks on the Forge to keep the Decay Curve from declining.
                                        </p>
                                      </div>
                                      <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary mt-4">
                                        Career Track Enabled
                                      </span>
                                    </div>
                                  )}
                                </div>

                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {filteredPersonas.length === 0 && (
                <div className="text-center py-12 bg-surface-container-low rounded-3xl border border-outline-variant/10">
                  <span className="text-on-surface-variant text-sm block">No dossiers matched your active filters.</span>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedType('all'); setSelectedFocus('all'); setSortBy('globalKey'); }}
                    className="mt-4 text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-widest cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
