import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Video, Headphones, Code2, HelpCircle, Shield, Award, RefreshCw, Zap, Layers, Activity, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Data Sourced from Specs ──────────────────────────────────────────────────────────

const SURFACES = [
  {
    badge: 'FORGE · DRILLS',
    title: 'Declarative recall',
    desc: 'Two-Phase Flashcards measure not just what you know but how confidently you know it — Confidence-Calibration is the second axis.',
    patents: 'Core Mechanics',
    icon: Zap,
    color: 'text-amber-500 bg-amber-500/10',
  },
  {
    badge: 'REFRESH · LABS',
    title: 'Procedural restoration',
    desc: 'Scoped Hard-Gates targeting decaying nodes to restore Skill-Decay λ without taking the full Proving Ground gauntlet.',
    patents: 'Skill-Decay Engine',
    icon: RefreshCw,
    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
  },
  {
    badge: 'GATE · CATALOG',
    title: 'Adversarial verification',
    desc: 'Air-gapped proctored gauntlets with live Bully AI injections, 4-agent council consensus, and multi-chain Consensus Certificates.',
    patents: 'Adversarial Council',
    icon: Shield,
    color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10',
  },
  {
    badge: 'EDUCATION · MODULES',
    title: 'Content & TP Economy',
    desc: 'Five M-3xx surfaces (Text, Video, Audio, Code, Quiz) where reading and watching earn Tenure Points, preparing candidates for verification.',
    patents: 'TP Economy',
    icon: BookOpen,
    color: 'text-primary bg-primary/10',
  },
];

const MODULE_SURFACES = [
  {
    id: 'M-301',
    name: 'Module Hub',
    type: 'Entry Point',
    desc: 'Central catalog listing available modules mapped by ontology node, difficulty, and Skill-Decay λ urgency.',
    tp: 'Entry & Pathing',
    icon: Layers,
  },
  {
    id: 'M-310',
    name: 'Article Reader',
    type: 'Text + Telemetry',
    desc: 'Long-form technical documentation with reading-pace and active-presence telemetry.',
    tp: '+15 TP / 5 min read',
    icon: BookOpen,
  },
  {
    id: 'M-320',
    name: 'Video Player',
    type: 'Lecture + Transcript',
    desc: 'High-density lecture playback with chapter markers, interactive transcript, and attention telemetry.',
    tp: '+25 TP / 10 min watch',
    icon: Video,
  },
  {
    id: 'M-330',
    name: 'Podcast Player',
    type: 'Audio Synchronizer',
    desc: 'Synchronized wave transcript player allowing audio listening while annotating node concepts on the go.',
    tp: '+20 TP / 15 min listen',
    icon: Headphones,
  },
  {
    id: 'M-340',
    name: 'Annotated Source',
    type: 'Code & Spec Viewer',
    desc: 'Syntax-highlighted code samples, specs, and technical papers with inline candidate annotations.',
    tp: '+30 TP / annotation',
    icon: Code2,
  },
  {
    id: 'M-350',
    name: 'Comprehension Check',
    type: 'Gauntlet Multiplier',
    desc: 'End-of-module 3-question gauntlet using confidence weights to grant up to 2.0x TP multipliers.',
    tp: '×1.5 to ×2.0 Multiplier',
    icon: HelpCircle,
  },
];

const FOUNDATIONS = [
  { num: 'F1', title: 'The Loop, Not the Course', body: 'Static EdTech platforms sell courses that decay the moment you complete them. Tenured AI operates a perpetual loop keyed to a 4,000-node ontology. Every action updates your node λ.' },
  { num: 'F2', title: 'The Math of Obsolescence (λ)', body: 'Skills decay exponentially over time. Without active practice or procedural restoration, node λ drops below the bondable threshold, triggering targeted Refresh Labs.' },
  { num: 'F3', title: 'The 4,000-Node Atlas', body: 'A unified knowledge map across AI engineering, quant finance, risk, and operations. Candidates build lifelong Career Memory annotations across every node.' },
  { num: 'F4', title: '6-Channel ALTFL Telemetry', body: 'Real-time keystroke velocity, latency, precision, and confidence calibration ensure proof of work is human and authentic.' },
];

export default function LearningLoop() {
  const [activeTab, setActiveTab] = useState<'M-310' | 'M-320' | 'M-330' | 'M-340' | 'M-350'>('M-310');

  return (
    <div className="pt-20 min-h-screen bg-background text-on-surface">

      {/* ── HERO SECTION ──────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-16 relative overflow-hidden">
        <div className="absolute -top-24 -right-16 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.15),transparent_70%)] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              LOOP / 00 · UI/UX &amp; Campaign Specification
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02] mb-6 max-w-[20ch]">
            Learning isn't a course.{' '}
            <em className="text-on-surface-variant italic font-light">It's a </em>
            <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
              loop you maintain.
            </span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-3xl mb-10">
            The complete architecture for the platform's learning surfaces — Forge Drills, Refresh Labs, the Gate Catalog, Education Modules, and the 4,000-Node Ontology Atlas. Where the Sovereign Passport is built, maintained, and defended against the Math of Obsolescence.
          </p>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { label: 'SURFACES', val: '4', sub: 'Forge · Refresh · Gate · Atlas' },
              { label: 'MODULE TRACKS', val: '5', sub: 'Text · Video · Audio · Code · Quiz' },
              { label: 'ONTOLOGY ATLAS', val: '4,000', sub: 'Mapped knowledge nodes' },
              { label: 'PATENT BACKING', val: '7 IP', sub: 'Across Core Systems' },
            ].map((m) => (
              <div key={m.label} className="bg-surface-container-lowest rounded-2xl p-5 shadow-lg border border-outline-variant/10">
                <p className="font-mono text-[10px] tracking-[.14em] uppercase text-on-surface-variant font-semibold mb-1">{m.label}</p>
                <p className="font-display font-medium text-3xl text-primary leading-none mb-1">{m.val}</p>
                <p className="font-mono text-[10px] text-on-surface-variant/70">{m.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FOUR LEARNING SURFACES ────────────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold mb-3">§01 · Core Topology</p>
          <h2 className="font-display font-light text-3xl md:text-5xl leading-tight mb-4">
            Static credentials decay.{' '}
            <em className="text-on-surface-variant italic font-light">So we built a loop.</em>
          </h2>
          <p className="text-on-surface-variant text-sm max-w-2xl mb-10 leading-relaxed">
            Every other EdTech platform sells a course you complete once. Tenured AI operates a <i>loop</i> you maintain for life. Every action updates a node's Skill-Decay λ; every node feeds your performance bond.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SURFACES.map((s) => (
              <motion.div
                key={s.title}
                whileHover={{ y: -4 }}
                className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9.5px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-surface-container text-on-surface-variant">
                      {s.badge}
                    </span>
                    <div className={`p-2 rounded-xl ${s.color}`}>
                      <s.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-headline font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-6">{s.desc}</p>
                </div>
                <div className="font-mono text-[10px] font-bold text-primary tracking-wider pt-3 border-t border-outline-variant/15">
                  {s.patents}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDATIONS ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold mb-3">§02 · Foundations</p>
        <h2 className="font-headline text-3xl font-bold mb-10">The four pillars of the loop architecture.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FOUNDATIONS.map((f) => (
            <div key={f.num} className="bg-surface-container-lowest rounded-2xl p-7 shadow-lg border border-outline-variant/10 flex gap-5 items-start">
              <span className="font-display font-light text-4xl bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent leading-none shrink-0">{f.num}</span>
              <div>
                <h4 className="font-headline font-bold text-base mb-2">{f.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION MODULES & TP ECONOMY ────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold mb-3">
            §03 · Education Modules Track (M-301 Family)
          </p>
          <h2 className="font-display font-light text-3xl md:text-5xl leading-tight mb-4">
            The reading <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">earns TP too.</span>
          </h2>
          <p className="text-on-surface-variant text-sm max-w-3xl mb-10 leading-relaxed">
            Where the original campaign credited drills, the Education Modules spec (M-301 family) extends the Tenure Points (TP) economy to content consumption. Reading, watching, listening, and annotating prepare the candidate for verification and earn defensible TP backed by active-presence telemetry.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULE_SURFACES.map((mod) => (
              <div key={mod.id} className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {mod.id}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    {mod.tp}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-base mb-1">{mod.name}</h3>
                <p className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant mb-3">{mod.type}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOOP TOPOLOGY ASCII ARCHITECTURE ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold mb-3">
          §04 · Loop Topology Schematic
        </p>
        <h2 className="font-headline text-3xl font-bold mb-4">Where modules connect to the Forge.</h2>
        <p className="text-on-surface-variant text-sm max-w-2xl mb-8 leading-relaxed">
          The Tenured Agent orchestrates learning paths by recommending M-301 modules when a candidate's node λ decays, closing the pathway between reading and verification.
        </p>

        <div className="bg-[#16140F] text-inverse-on-surface p-8 rounded-3xl font-mono text-[11px] leading-relaxed overflow-x-auto shadow-2xl border border-white/10">
          <div className="text-amber-400 font-bold text-[10px] tracking-widest uppercase mb-4">
            ARCHITECTURE SCHEMATIC · LOOP TOPOLOGY
          </div>
          <pre className="text-amber-200/90 font-mono">
            {`                    ┌───────────────────────────────────────────────┐
                    │            L-100 THE FORGE HUB                │
                    │   Daily entry · streak · λ decay alerts        │
                    └───────────────────────┬───────────────────────┘
                                            │
               ┌────────────────────────────┼────────────────────────────┐
               ▼                            ▼                            ▼
      ┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
      │  M-301 MODULE   │          │  L-110 / L-120  │          │  League REFRESH  │
      │  HUB (NEW)      │          │  DRILL SURFACES │          │  LABS           │
      │  Text/Video/Aud │          │  Quiz/Flashcard │          │  Node Repair    │
      └────────┬────────┘          └────────┬────────┘          └────────┬────────┘
               │                            │                            │
               └────────────────────────────┼────────────────────────────┘
                                            │
                                            ▼
                    ┌───────────────────────────────────────────────┐
                    │      4,000-NODE ONTOLOGY KNOWLEDGE ATLAS      │
                    │   Node λ · ALTFL Telemetry · Career Memory      │
                    └───────────────────────┬───────────────────────┘
                                            │
                                            ▼
                    ┌───────────────────────────────────────────────┐
                    │        L-300 PROVING GROUND & PASSPORT        │
                    │   Hard-Gate Proctored Consensus Certificate   │
                    └───────────────────────────────────────────────┘`}
          </pre>
        </div>
      </section>

      {/* ── CLOSING CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-inverse-surface text-inverse-on-surface py-20 relative overflow-hidden">
        <div className="absolute -top-32 -right-16 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.18),transparent_65%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <p className="font-mono text-[11px] tracking-[.22em] uppercase text-primary-container font-bold mb-5">
            § Enter the Loop · Sovereign Passport
          </p>
          <h2 className="font-display font-light text-3xl md:text-5xl leading-tight mb-6 max-w-[22ch]">
            Maintain your loop.{' '}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
              Defend your passport.
            </span>
          </h2>
          <p className="text-inverse-on-surface/85 max-w-2xl text-base leading-relaxed mb-8">
            Whether you practice daily in the Forge, consume Education Modules to earn TP, or take on the Proving Ground gauntlet — every step anchors your competency to the Sovereign Ledger.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/learners"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-headline font-semibold shadow-xl hover:opacity-95 transition-all text-sm text-white"
              style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)', boxShadow: '0 8px 32px rgba(197,160,89,.32)' }}
            >
              Enter the Forge →
            </Link>
            <Link
              to="/chaos-lab"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-headline font-medium text-sm text-inverse-on-surface border border-white/20 hover:bg-white/8 transition-all"
            >
              Explore Proving Ground
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
