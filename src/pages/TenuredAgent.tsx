import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain, Shield, Zap, Eye, Terminal, GitMerge,
  ChevronDown, ChevronUp, Mic, Command, MemoryStick,
  Activity, Lock, CheckCircle, AlertTriangle, Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AGENT_COLORS = {
  mentor: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-500', label: 'MENTOR' },
  proctor: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', dot: 'bg-red-500', label: 'PROCTOR' },
  auditor: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-500', label: 'AUDITOR' },
  chaos: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-500', label: 'CHAOS AGENT' },
};

function PulseDot({ type, size = 'md' }: { type: keyof typeof AGENT_COLORS; size?: 'sm' | 'md' }) {
  const c = AGENT_COLORS[type];
  const sz = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2.5 h-2.5';
  return <span className={cn('rounded-full inline-block animate-pulse', sz, c.dot)} />;
}

function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
      <span className="font-mono text-[9px] font-bold tracking-widest uppercase">{label}</span>
    </div>
  );
}

export default function TenuredAgent() {
  const [activeCouncilTab, setActiveCouncilTab] = useState<keyof typeof AGENT_COLORS>('mentor');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeSlashCmd, setActiveSlashCmd] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<'mentor' | 'proctor'>('mentor');

  const councilAgents = [
    {
      key: 'mentor' as const,
      name: 'Mentor',
      patent: 'PAT-005',
      role: 'Tenured Agent · Mentor mode',
      speaks: true,
      objective: 'Scaffolded guidance · expose logical gaps via Socratic questioning',
      cannotSee: 'Chaos injection plans',
      description: 'The warm, concise user-facing seat. Draws on Vector-Graph career memory for context. Never hands the answer — always a doc path or a pattern.',
    },
    {
      key: 'proctor' as const,
      name: 'Proctor',
      patent: 'PAT-004',
      role: 'Tenured Agent · Proctor mode + Council Proctor',
      speaks: true,
      objective: 'Monitor telemetry for AI-typical signatures · trigger Hard-Gate preemption',
      cannotSee: 'Mentor guidance content',
      description: 'Distant, factual, telemetry-monitoring. Can post anomaly flags to the Blackboard and freeze the Mentor mid-sentence.',
    },
    {
      key: 'auditor' as const,
      name: 'Auditor',
      patent: 'PAT-004',
      role: 'Specialist · artifact evaluator',
      speaks: false,
      objective: 'Evaluate technical validity + industry-standard compliance',
      cannotSee: 'Active Mentor turns',
      description: 'Never speaks to the user directly. Evaluates artifacts, posts structured records to the Blackboard. Carries the highest consensus weight (0.40).',
    },
    {
      key: 'chaos' as const,
      name: 'Chaos Agent',
      patent: 'PAT-001',
      role: 'Specialist · friction injector',
      speaks: false,
      objective: 'Execute environment mutation via the ALE (Adaptive Learning Environment)',
      cannotSee: 'Mentor guidance content · Auditor pending evaluations',
      description: 'Manifests as failures, not words. Injects environmental chaos — corrupted configs, missing deps, cascading errors — that test real performance under pressure.',
    },
  ];

  const slashCommands = [
    { cmd: '/status', desc: 'Live AICI · AIOI · AIBS standings' },
    { cmd: '/challenge', desc: 'Spin up a Chaos Scenario now' },
    { cmd: '/refresh', desc: 'Stabilize a decaying node' },
    { cmd: '/recall', desc: 'Search career memory (PAT-005)' },
    { cmd: '/passport', desc: 'Open Sovereign Passport' },
    { cmd: '/ledger', desc: 'Jump to your Sovereign Ledger' },
    { cmd: '/share', desc: 'Generate a verified badge' },
    { cmd: '/voice', desc: 'Activate voice interface (PAT-009)' },
  ];

  const trustPrinciples = [
    {
      icon: <Eye className="w-5 h-5" />,
      label: 'ALWAYS KNOWABLE',
      color: 'text-emerald-400',
      description: "Current mode (Mentor vs Proctor) is always shown via pulse + label. The council's active phase is announced at transition. No ambiguity about who's evaluating you.",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      label: 'NEVER FABRICATES',
      color: 'text-blue-400',
      description: "Scores come from the Auditor's signed evaluations via Weighted Consensus. The Mentor reports; it never invents. PAT-002's PoF record makes fabrication structurally impossible.",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      label: "WON'T RESCUE",
      color: 'text-red-400',
      description: "In a Gate, no debugging help from the Mentor. The 180s hint is cryptic and visibly penalizes — the cost is shown before you accept. CoI prevents the Mentor from inadvertently helping with Chaos injections.",
    },
  ];

  const faqs = [
    {
      q: 'Is the Tenured Agent one AI or four?',
      a: "The user feels one Agent — but the platform runs a four-agent council. The Tenured Agent itself is the dual-natured user-facing entity (Mentor/Proctor, per PAT-005). It operates as one member of PAT-004's four-agent council alongside the Auditor and Chaos Agent. The Orchestrator Node coordinates all four through a shared Blackboard.",
    },
    {
      q: 'Why do two agents speak and two do not?',
      a: "The Auditor and Chaos Agent never address the user directly — they operate through the Blackboard and through environmental effects. If the Auditor spoke, its evaluation could be influenced by the user's reaction. If the Chaos Agent spoke, its injections would lose their cognitive impact. The council's power comes from structural insulation from social pressure.",
    },
    {
      q: 'What is the Weighted Consensus Protocol?',
      a: "A credential is authorized only when the Auditor (weight: 0.40), Proctor (0.30), and at minimum one additional council member independently confirm verification criteria. The Weighted Consensus Score must exceed the Credential Authorization Threshold before the Sovereign Ledger receives a Consensus Certificate. No single agent can mint a credential — ever.",
    },
    {
      q: 'What does the Growth Coefficient y do?',
      a: "y calibrates complexity for each successor Proving Ground session. If y > 1.2, the recursive scaler boosts difficulty. Between 0.8 and 1.2, homeostasis is maintained. If y < 0.8, difficulty is reduced and a Refresh is queued. The next session is synthesized at runtime from the user's specific artifacts — there is no fixed curriculum.",
    },
    {
      q: 'How does Career Memory work?',
      a: "A hybrid architecture: every verified artifact is stored as a vector embedding (enabling semantic recall: remember when you solved this 2 months ago?) and simultaneously linked into a skill graph (enabling trajectory traversal: your growth across these 12 nodes over 9 months). The memory is honest — only matches above cosine 0.65 are surfaced. The Mentor stays silent rather than guess.",
    },
  ];

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-32">

      {/* Hero */}
      <header className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-primary/20">
              AGENT v2.0
            </span>
            <span className="bg-tertiary/10 text-tertiary px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-tertiary/20">
              PATENT-COMPLETE
            </span>
            <span className="text-on-surface-variant text-[10px] tracking-[0.2em] uppercase font-mono">
              PAT-002 · 004 · 005 · 006 · 009 · 011 · 019
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-bold text-on-surface tracking-tighter"
          >
            One Agent.{' '}
            <span className="italic text-white gold-gradient bg-clip-text text-transparent">
              Four-agent council.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed font-light"
          >
            The Tenured Agent is the platform's connective intelligence. The user feels one Agent. The platform runs a council of four — governed by an Orchestrator Node, a shared Blackboard, and a Weighted Consensus Protocol that mints every credential.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: 'Contexts', value: '8' },
              { label: 'Screens', value: '24' },
              { label: 'Council Agents', value: '4' },
              { label: 'Patents Covered', value: '7' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-4 text-center">
                <div className="font-headline text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Live Agent Status Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-5"
        >
          <div className="bg-[#16140F] text-[#F3F0EC] p-6 rounded-3xl border border-outline-variant/30 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#FFBF00] opacity-85 tracking-wider">
              AGENT v2 // COUNCIL
            </div>

            {/* Mode toggle */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setCurrentMode('mentor')}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all',
                  currentMode === 'mentor'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'text-[#9A8F80] hover:text-[#F3F0EC]'
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Mentor
              </button>
              <button
                onClick={() => setCurrentMode('proctor')}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all',
                  currentMode === 'proctor'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'text-[#9A8F80] hover:text-[#F3F0EC]'
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                Proctor
              </button>
            </div>

            <AnimatePresence mode="wait">
              {currentMode === 'mentor' ? (
                <motion.div key="mentor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                    <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">Tenured Agent · ready</span>
                    <span className="ml-auto text-[#9A8F80] text-[10px] font-mono">K</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-[#1E1E1D] rounded-xl p-3">
                      <div className="text-[9px] font-mono text-[#9A8F80] uppercase tracking-wider mb-1">Tenured Agent</div>
                      <div className="text-sm leading-relaxed">Your RAG Architecture node decayed 12% this week. I've staged a 5-min Refresh Lab to stabilize it. Want it now?</div>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer" style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)', color: '#FFF' }}>Stabilize now</span>
                      <span className="px-3 py-1.5 rounded-full text-[10px] bg-[#1E1E1D] text-[#9A8F80] cursor-pointer hover:text-[#F3F0EC]">Show the decay</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="proctor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse inline-block" />
                    <span className="text-red-400 text-xs font-mono font-bold uppercase tracking-wider">PROCTOR ENGAGED</span>
                    <span className="ml-auto text-[#9A8F80] text-[10px] font-mono">monitoring</span>
                  </div>
                  <div className="space-y-2 font-mono text-[11px] leading-relaxed">
                    <div className="text-[#9A8F80]">learner@sovereign:~$ pnpm dev</div>
                    <div className="text-blue-400">server ready on :3000</div>
                    <div className="text-[#9A8F80]">learner@sovereign:~$ <span className="animate-pulse">_</span></div>
                  </div>
                  <div className="mt-4 text-[10px] font-mono text-red-400/70 border border-red-500/20 rounded-lg p-2">
                    SV.anomaly_flag: false · Phase 2 · Blackboard active
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </header>

      {/* The Four-Agent Council */}
      <section className="space-y-12">
        <div className="space-y-4">
          <SectionBadge label="PAT-004 · Four-Agent Council" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Four agents with intentionally conflicting objectives.
          </h2>
          <p className="text-on-surface-variant font-light max-w-3xl text-lg leading-relaxed">
            No single agent can authorize a credential. Only the consensus of independently-derived evaluations — each agent operating with structurally incompatible success criteria — can mint your Passport entry.
          </p>
        </div>

        {/* Council Tab Selector */}
        <div className="flex flex-wrap gap-3">
          {councilAgents.map((agent) => {
            const c = AGENT_COLORS[agent.key];
            return (
              <button
                key={agent.key}
                onClick={() => setActiveCouncilTab(agent.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border',
                  activeCouncilTab === agent.key
                    ? cn(c.bg, c.border, c.text)
                    : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/50'
                )}
              >
                <span className={cn('w-1.5 h-1.5 rounded-full inline-block', activeCouncilTab === agent.key ? c.dot : 'bg-on-surface-variant/30')} />
                {agent.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {councilAgents.filter(a => a.key === activeCouncilTab).map((agent) => {
            const c = AGENT_COLORS[agent.key];
            return (
              <motion.div
                key={agent.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className={cn('rounded-3xl p-8 border', c.bg, c.border)}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={cn('w-2.5 h-2.5 rounded-full inline-block animate-pulse', c.dot)} />
                    <span className={cn('font-mono text-xs font-bold uppercase tracking-widest', c.text)}>{agent.name}</span>
                    <span className="ml-auto font-mono text-[9px] text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">{agent.patent}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant font-mono mb-3">{agent.role}</p>
                  <p className="text-base leading-relaxed">{agent.description}</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant mb-2">System Objective</div>
                    <p className="text-sm leading-relaxed">{agent.objective}</p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant mb-2">Cannot See</div>
                    <p className="text-sm font-mono text-on-surface-variant">{agent.cannotSee}</p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant mb-2">Speaks to User?</div>
                    <p className={cn('text-sm font-bold', agent.speaks ? 'text-emerald-400' : 'text-red-400')}>
                      {agent.speaks ? 'Yes — through the conversational surface' : 'No — manifests only through effects'}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Blackboard */}
        <div className="bg-[#16140F] rounded-3xl p-8 border border-outline-variant/20">
          <div className="text-center font-mono text-[11px] text-[#FFBF00] tracking-widest uppercase mb-6">
            BLACKBOARD · SHARED STATE REPOSITORY · structured · access-controlled · single source of truth
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {councilAgents.map((agent) => {
              const c = AGENT_COLORS[agent.key];
              return (
                <div key={agent.key} className={cn('rounded-2xl p-4 text-center border', c.bg, c.border)}>
                  <span className={cn('w-2 h-2 rounded-full inline-block animate-pulse', c.dot)} />
                  <div className={cn('font-headline font-bold text-sm mt-2 mb-1', c.text)}>{agent.name.toUpperCase()}</div>
                  <div className="font-mono text-[9px] text-on-surface-variant">
                    {agent.speaks ? 'User-facing' : 'Specialist · hidden'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weighted Consensus */}
      <section className="space-y-8">
        <div className="space-y-4">
          <SectionBadge label="PAT-004 · Weighted Consensus" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            No single agent mints a credential. Ever.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#16140F] rounded-3xl p-8 border border-outline-variant/20">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#FFBF00] mb-4">Weighted Consensus Protocol</div>
            <div className="font-mono text-sm leading-loose space-y-1">
              <div className="text-[#FFBF00]">WCS = (w_agent x eval_agent)</div>
              <div className="h-px bg-white/10 my-3" />
              <div><span className="text-blue-400">w_auditor</span><span className="text-[#F3F0EC]"> = 0.40</span> <span className="text-[#9A8F80] text-xs">highest weight</span></div>
              <div><span className="text-red-400">w_proctor</span><span className="text-[#F3F0EC]"> = 0.30</span></div>
              <div><span className="text-emerald-400">w_mentor</span><span className="text-[#F3F0EC]"> = 0.20</span></div>
              <div><span className="text-amber-400">w_chaos</span><span className="text-[#F3F0EC]"> = 0.10</span> <span className="text-[#9A8F80] text-xs">observation only</span></div>
              <div className="h-px bg-white/10 my-3" />
              <div className="text-[#C5A059]">authorize if WCS is greater than T_auth</div>
            </div>
          </div>
          <div className="bg-surface-container-low border border-red-500/20 rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <div className="font-mono text-[10px] uppercase tracking-widest text-red-400">Hard-Gate Priority Queue</div>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              When the Proctor posts an anomaly flag, the Orchestrator switches modes immediately.
            </p>
            <div className="bg-[#1E1E1D] rounded-xl p-4 font-mono text-xs leading-loose">
              <div className="text-amber-400">PREEMPTION MODE · anomaly = TRUE</div>
              <div className="text-blue-400">all pending dispatch SUSPENDED</div>
              <div className="text-blue-400">Chaos Agent dispatched immediately</div>
              <div className="text-red-400">Mentor turn (if active) FROZEN</div>
              <div className="text-[#C5A059]">Blackboard records preemption hash</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual-Nature State Machine */}
      <section className="space-y-8">
        <div className="space-y-4">
          <SectionBadge label="PAT-005 · Dual-Nature State Machine" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            One Agent. Two souls. Route-driven.
          </h2>
          <p className="text-on-surface-variant font-light max-w-3xl text-lg leading-relaxed">
            On the dashboard, docs, and learning surfaces it is the <strong className="text-emerald-400">Mentor</strong>. The instant the user crosses into the Proving Ground, the state machine flips to the <strong className="text-red-400">Proctor</strong>. Same Agent, same memory, opposite demeanor. The pivot is announced, never implied.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              mode: 'Mentor mode',
              color: 'text-emerald-400',
              borderColor: 'border-emerald-500/30',
              bg: 'bg-emerald-500/5',
              trigger: '/dashboard · /docs · /learning/*',
              tone: 'Insightful · concise · encouraging',
              pulse: 'Mentor green · 2.4s rhythm',
              memory: 'Full Vector + Graph retrieval',
              provides: 'Patterns · doc paths · staged Refresh',
            },
            {
              mode: 'Proctor mode',
              color: 'text-red-400',
              borderColor: 'border-red-500/30',
              bg: 'bg-red-500/5',
              trigger: '/proving-ground/*',
              tone: 'Distant · objective · neutral',
              pulse: 'Amber to red · 1.6s rhythm',
              memory: 'Read-only baseline TTR only',
              provides: 'Contextual friction · cryptic 180s hint (penalized)',
            },
          ].map((m) => (
            <div key={m.mode} className={cn('rounded-3xl p-8 border', m.bg, m.borderColor)}>
              <div className={cn('font-mono text-xs font-bold uppercase tracking-widest mb-6', m.color)}>{m.mode}</div>
              <div className="space-y-4 text-sm">
                {[
                  { label: 'Trigger Route', value: m.trigger },
                  { label: 'Tone', value: m.tone },
                  { label: 'Pulse', value: m.pulse },
                  { label: 'Memory Access', value: m.memory },
                  { label: 'Provides', value: m.provides },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col gap-1 border-b border-outline-variant/10 pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">{row.label}</span>
                    <span className="font-mono text-xs">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Growth Loop and Career Memory */}
      <section className="space-y-8">
        <div className="space-y-4">
          <SectionBadge label="PAT-005 · Growth Loop + Career Memory" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            Every successor session is built from your previous answer.
          </h2>
          <p className="text-on-surface-variant font-light max-w-3xl text-lg leading-relaxed">
            There is no fixed curriculum. The next session is synthesized at runtime from the user's specific artifacts. The Growth Coefficient calibrates the complexity increment. The Vector-Graph makes the Agent remember your career across years.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary">Growth Coefficient</div>
            </div>
            <div className="bg-[#16140F] rounded-xl p-4 font-mono text-xs leading-loose mb-4">
              <div className="text-amber-400">y = baseline_TTR / observed_TTR</div>
              <div className="h-px bg-white/10 my-2" />
              <div className="text-blue-400">y greater than 1.2 = boost difficulty</div>
              <div className="text-blue-400">0.8 to 1.2 = homeostasis</div>
              <div className="text-red-400">y less than 0.8 = reduce + queue Refresh</div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">Educational Homeostasis — keeping the user in the zone of proximal development. Challenged but not broken.</p>
          </div>
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-tertiary" />
              <div className="font-mono text-[10px] uppercase tracking-widest text-tertiary">Vector Store</div>
            </div>
            <p className="text-sm leading-relaxed text-on-surface-variant mb-4">
              Semantic similarity search across your entire verified history. Only matches above cosine 0.65 are surfaced.
            </p>
            <div className="bg-[#16140F] rounded-xl p-3 font-mono text-[10px] leading-loose">
              <div className="text-amber-400 mb-1">VECTOR RETRIEVAL</div>
              <div className="text-[#C5A059]">apr-14-multiagent.ts · 0.94</div>
              <div className="text-[#9A8F80]">&nbsp;&nbsp;N-064 · cleared Hard-Gate</div>
              <div className="text-[#C5A059]">mar-02-circuit-breaker.ts · 0.81</div>
            </div>
          </div>
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <GitMerge className="w-5 h-5 text-primary" />
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary">Graph Overlay</div>
            </div>
            <p className="text-sm leading-relaxed text-on-surface-variant mb-4">
              Trajectory traversal across skill ontology. How has your competency evolved since you earned that node?
            </p>
            <div className="space-y-2">
              {['N-064 · Multi-Agent Consensus', 'N-052 · Circuit Breaker', 'N-041 · Vector DB Latency'].map((node, i) => (
                <div key={node} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary/60" />
                  <span className="font-mono text-[10px] text-on-surface-variant">{node}</span>
                  {i === 0 && <span className="ml-auto font-mono text-[9px] text-emerald-400">cleared</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CMD+K */}
      <section className="space-y-8">
        <div className="space-y-4">
          <SectionBadge label="Context B · CMD+K Omni-Box" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            Command the council like a terminal.
          </h2>
          <p className="text-on-surface-variant font-light max-w-3xl text-lg leading-relaxed">
            Slash commands trigger real council actions. Natural language falls through to the Mentor.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-outline-variant/10 font-mono text-sm flex items-center gap-3 text-on-surface-variant">
              <Command className="w-4 h-4 text-primary" />
              <span>ask the agent or type </span>
              <span className="text-primary font-bold">/</span>
              <span> for commands</span>
            </div>
            <div className="divide-y divide-outline-variant/10">
              {slashCommands.map((cmd) => (
                <button
                  key={cmd.cmd}
                  onClick={() => setActiveSlashCmd(activeSlashCmd === cmd.cmd ? null : cmd.cmd)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-container-low transition-colors',
                    activeSlashCmd === cmd.cmd && 'bg-primary/10'
                  )}
                >
                  <span className="font-mono font-bold text-sm text-primary w-28 flex-shrink-0">{cmd.cmd}</span>
                  <span className="text-sm text-on-surface-variant">{cmd.desc}</span>
                  <span className="ml-auto font-mono text-[10px] text-on-surface-variant/40">enter</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-[#16140F] rounded-3xl p-8 font-mono text-xs">
            <div className="text-amber-400 mb-4">/status</div>
            <div className="space-y-3">
              {[['AICI', 92, '92%'], ['AIOI', 88, '88%'], ['AIBS', 85, '85%']].map(([k, v, w]) => (
                <div key={k as string}>
                  <div className="flex justify-between text-[#F3F0EC] mb-1">
                    <span>{k}</span>
                    <span className={k === 'AIBS' ? 'text-red-400' : 'text-[#C5A059]'}>{v}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#1E1E1D] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: w as string, background: 'linear-gradient(90deg,#775A19,#C5A059)' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[#9A8F80] mt-4 text-[10px]">enter = open passport · /refresh to stabilize AIBS</div>
          </div>
        </div>
      </section>

      {/* Pulse System */}
      <section className="space-y-8">
        <div className="space-y-4">
          <SectionBadge label="The Pulse System" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            The Agent breathes in the chrome — in four colors.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: 'mentor' as const, rhythm: '2.4s', desc: "The platform's resting state on learning surfaces." },
            { type: 'proctor' as const, rhythm: '1.6s', desc: 'In-Gate monitoring. Hostility increases tempo if anomaly flag fires.' },
            { type: 'auditor' as const, rhythm: '2.0s', desc: 'Appears during Synthetic Review and consensus deliberation.' },
            { type: 'chaos' as const, rhythm: '1.4s', desc: 'Brief — pulses only while a Friction Injection is firing.' },
          ].map((pulse) => {
            const c = AGENT_COLORS[pulse.type];
            return (
              <div key={pulse.type} className={cn('rounded-2xl p-6 border', c.bg, c.border)}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={cn('w-2.5 h-2.5 rounded-full inline-block animate-pulse', c.dot)} />
                  <span className={cn('font-mono text-[10px] font-bold uppercase tracking-widest', c.text)}>{c.label}</span>
                </div>
                <div className="font-mono text-[9px] text-on-surface-variant mb-3">{pulse.rhythm} rhythm</div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{pulse.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust */}
      <section className="space-y-8">
        <div className="space-y-4">
          <SectionBadge label="Trust and Boundaries" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            The Agent's integrity is the platform's integrity.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {trustPrinciples.map((principle) => (
            <div key={principle.label} className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-8">
              <div className={cn('flex items-center gap-2 mb-4', principle.color)}>
                {principle.icon}
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">{principle.label}</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-8">
        <div className="space-y-4">
          <SectionBadge label="Architecture Q&A" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            Common questions about the council.
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-headline font-bold text-base">{faq.q}</span>
                {expandedFaq === i ? <ChevronUp className="w-5 h-5 text-on-surface-variant flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-on-surface-variant flex-shrink-0" />}
              </button>
              <AnimatePresence>
                {expandedFaq === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <Cpu className="w-3.5 h-3.5 text-primary" />
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-primary">Council Ready</span>
        </div>
        <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
          Ready to meet your Agent?
        </h2>
        <p className="text-on-surface-variant font-light max-w-xl mx-auto">
          The Tenured Agent activates the moment you take your first Proving Ground Gate. The council assembles. The credential clock starts.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#/chaos-lab" className="gold-gradient text-on-primary px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-[1.02] transition-transform">
            Enter the Proving Ground
          </a>
          <a href="#/learners" className="text-on-surface font-bold flex items-center gap-2 group">
            <span className="border-b-2 border-primary/30 group-hover:border-primary transition-colors py-1">View Your Passport</span>
          </a>
        </div>
      </section>
    </div>
  );
}
