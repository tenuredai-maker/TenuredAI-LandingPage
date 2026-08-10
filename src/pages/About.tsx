import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Activity, Award, FileText, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Data Sourced from TenuredAI_Landing_Live.html ──────────────────────────────────────────

const PATENTS = [
  { id: 'PAT-001', name: 'Adversary Logic Engine (ALE)', category: 'gold', desc: 'Real-time logic hazard & Bully AI injection engine for live Xterm.js verification.' },
  { id: 'PAT-002', name: 'ALTFL Telemetry Stack', category: 'gold', desc: 'Six-channel concurrent telemetry monitoring keystroke velocity, latency, and calibration.' },
  { id: 'PAT-003', name: 'Skill-Decay Lambda (λ)', category: 'gray', desc: 'Mathematical modeling of skill decay half-life over time across ontology nodes.' },
  { id: 'PAT-004', name: 'Four-Agent Council', category: 'gold', desc: 'Multi-agent weighted consensus protocol (Mentor, Proctor, Auditor, Chaos).' },
  { id: 'PAT-005', name: 'Career Memory Engine', category: 'gray', desc: 'Stateful memory persistence for lifelong candidate annotations.' },
  { id: 'PAT-006', name: 'Blackboard State Bus', category: 'gray', desc: 'Decoupled agent communication architecture for zero-latency audit logs.' },
  { id: 'PAT-007', name: 'Confidence Calibration', category: 'gray', desc: 'Overconfidence delta detection against verified correctness.' },
  { id: 'PAT-008', name: 'Simulation Credentialing', category: 'gray', desc: 'Proof of Friction Merkle hashing for simulation-based credentials.' },
  { id: 'PAT-009', name: 'Voice-Mode Multi-Agent', category: 'gray', desc: 'Real-time WebSocket audio orchestration for oral Hard-Gate defenses.' },
  { id: 'PAT-010', name: 'Sovereign Ledger', category: 'gold', desc: 'Multi-chain immutable verification ledger anchored on Polygon mainnet.' },
  { id: 'PAT-011', name: 'Tenure Points Ledger', category: 'gray', desc: 'Non-transferable proof-of-work credit accounting system.' },
  { id: 'PAT-012', name: 'Annotation Persistence', category: 'gray', desc: 'Cryptographic sealing of candidate code annotations and commit trees.' },
  { id: 'PAT-013', name: 'EWARD Enterprise Audit', category: 'blue', desc: 'Enterprise Workforce AIRF Risk & Decay audit dashboard engine.' },
  { id: 'PAT-014', name: 'B-300 Recruiter Battle', category: 'blue', desc: 'Live auction protocol with anti-snipe windows for verified talent.' },
  { id: 'PAT-015', name: 'Asymmetric Liability Reserve', category: 'blue', desc: 'Actuarial reserve float allocation and Chubb reinsurance mechanics.' },
  { id: 'PAT-016', name: 'TTR_org Projection', category: 'blue', desc: 'Time-to-replacement risk scoring for enterprise engineering teams.' },
  { id: 'PAT-017', name: 'Premium Credit Tiering', category: 'blue', desc: 'Enterprise premium discount tiering based on aggregate AIRF scores.' },
  { id: 'PAT-018', name: 'Two-Phase Flashcard', category: 'gray', desc: 'Active recall drill mechanics with decaying confidence interval triggers.' },
  { id: 'PAT-019', name: 'Asymmetric Liability OL', category: 'gold', desc: 'Overconfidence liability modeling and auto-quarantine triggers.' },
  { id: 'PAT-020', name: 'Node-Persistent Annotations', category: 'gray', desc: 'Ontology-node attached historical work samples and verifiable proof.' },
  { id: 'PAT-021', name: 'Enterprise Risk Apportionment', category: 'blue', desc: 'Multi-entity placement risk allocation and performance bond settlement.' },
];

const TICKER_ITEMS = [
  { id: 'PSP-04412', ev: 'Hard-Gate cleared · Houston-Energy ML/Ops', v: '+$2,000 GDA → UH', ts: '14s ago' },
  { id: 'BND-00187', ev: 'Performance Bond issued · NYC-Finance Risk Quant', v: '$150K · π $10,875', ts: '37s ago' },
  { id: 'B300-0094', ev: 'Recruiter Battle settled · Sr Forecast Eng', v: '$324K placement', ts: '2m ago' },
  { id: 'PSP-04408', ev: 'Triple-85 attained · DC-Defense AIOI 91', v: 'Passport minted', ts: '4m ago' },
  { id: 'EWD-0023', ev: 'EWARD audit · Houston enterprise · OSD 0.71', v: 'Gold tier · 25% credit', ts: '6m ago' },
  { id: 'PSP-04405', ev: 'Hard-Gate cleared · NYC-Finance Compliance', v: '+$2,000 GDA → Columbia', ts: '9m ago' },
  { id: 'BND-00186', ev: 'Bond settled clean · Houston-Energy · 180d', v: 'Float released', ts: '11m ago' },
  { id: 'L200-Q2', ev: 'League League update · UH +2 positions', v: 'Rank #14', ts: '14m ago' },
];

const THESIS_PILLARS = [
  {
    num: '01',
    title: 'The verification gap is unfilled.',
    body: 'LLMs invalidated every credential-class signal in 2022. No incumbent — LinkedIn, Workday, Coursera, HackerRank — can pivot to verification without cannibalizing core revenue.',
    patents: 'Verification · Consensus · Credentialing',
  },
  {
    num: '02',
    title: 'The category is infrastructure, not SaaS.',
    body: 'Three uncorrelated revenue streams: ledger settlement (Visa-class), reserve float (Berkshire-class), index licensing (S&P-class). Composite supports 25–40× multiples.',
    patents: 'Sovereign Ledger · Liability Reserve · Credit Tiering',
  },
  {
    num: '03',
    title: 'The moat is four-layer structural.',
    body: '21-patent fortress + Polygon-anchored ledger network + 40/40/20 perpetual institutional contracts + two-sided network effects. Each layer compounds independently.',
    patents: '21-IP Fortress across all systems',
  },
  {
    num: '04',
    title: 'The window is briefly open.',
    body: '~36 months until a strategic incumbent mounts defensive entry. After this window, the IP and institutional lock-ins compound into a non-replicable moat.',
    patents: 'Enterprise Audit · Recruiter Battle · Risk Projection',
  },
];

export default function About() {
  const [selectedPatent, setSelectedPatent] = useState<typeof PATENTS[0] | null>(null);

  return (
    <div className="pt-20 min-h-screen bg-background text-on-surface">

      {/* ── SECTION 1: HERO ──────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-end">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold bg-primary/10 px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Series A · 2026 · Houston · NYC
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02] mb-6">
              The infrastructure that issues{' '}
              <em className="text-on-surface-variant italic font-light">verified hires.</em>{' '}
              Backed by a{' '}
              <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
                $150K bond.
              </span>
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl mb-8">
              Tenured AI is the verification layer the labor market lost in 2022. We adversarially verify AI-era competency, anchor the credential to four blockchains, and underwrite the placement with a Chubb-reinsured Performance Bond. 21 patents. 97 trade secrets. Multi-chain ledger live.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                to="/request-access"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-headline font-semibold text-white shadow-xl hover:opacity-95 transition-all text-sm"
                style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)' }}
              >
                Request a demo →
              </Link>
              <Link
                to="/manifesto"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-headline font-medium text-on-surface bg-surface-container-lowest shadow-md hover:bg-surface-container transition-all text-sm border border-outline-variant/10"
              >
                Read the manifesto →
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-widest text-on-surface-variant/70 border-t border-outline-variant/15 pt-6">
              <span><strong className="text-on-surface font-bold">21</strong> patents filed</span>
              <span><strong className="text-on-surface font-bold">$150K</strong> bond per hire</span>
              <span><strong className="text-on-surface font-bold">Chubb</strong> reinsured</span>
              <span><strong className="text-on-surface font-bold">Polygon</strong> anchored</span>
            </div>
          </motion.div>

          {/* Hero Right: Sovereign Ledger Live Card */}
          <motion.div
            initial={{ opacity: 0, scale: .96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .5, delay: .1 }}
            className="bg-surface-container-lowest rounded-3xl p-8 shadow-2xl border border-outline-variant/15 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-16 w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.15),transparent_70%)] pointer-events-none" />
            <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-primary font-bold mb-5">
              <span>Sovereign Ledger</span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
              </span>
            </div>
            <h3 className="font-display text-2xl font-light leading-snug mb-6">
              The first credential whose{' '}
              <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
                economic survival
              </span>{' '}
              is structurally aligned with the institutions that issued it.
            </h3>

            {/* Stat Row */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-surface-container-low rounded-xl p-4">
                <p className="font-display font-medium text-2xl text-primary leading-none mb-1">40/40/20</p>
                <p className="font-mono text-[9.5px] uppercase tracking-widest text-on-surface-variant">Platform · University · Treasury</p>
              </div>
              <div className="bg-surface-container-low rounded-xl p-4">
                <p className="font-display font-medium text-2xl text-primary leading-none mb-1">≥ 85</p>
                <p className="font-mono text-[9.5px] uppercase tracking-widest text-on-surface-variant">Triple-85 bondable threshold</p>
              </div>
              <div className="bg-surface-container-low rounded-xl p-4">
                <p className="font-display font-medium text-2xl text-primary leading-none mb-1">$11,250</p>
                <p className="font-mono text-[9.5px] uppercase tracking-widest text-on-surface-variant">Avg annual premium</p>
              </div>
              <div className="bg-surface-container-low rounded-xl p-4">
                <p className="font-display font-medium text-2xl text-primary leading-none mb-1">180d</p>
                <p className="font-mono text-[9.5px] uppercase tracking-widest text-on-surface-variant">Bond term</p>
              </div>
            </div>

            <p className="font-mono text-[11px] text-on-surface-variant/70 border-t border-outline-variant/15 pt-4 leading-relaxed">
              Smart-contract-enforced split. No admin keys retained. Open-source verification client.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TICKER BAND ───────────────────────────────────────────────────────────────── */}
      <div className="bg-inverse-surface text-inverse-on-surface py-4 overflow-hidden border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-6">
          <div className="font-mono text-[10px] uppercase tracking-[.2em] text-amber-400 font-bold shrink-0 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Sovereign Ledger · live
          </div>
          <div className="flex gap-8 overflow-x-auto custom-scrollbar py-1 font-mono text-[11.5px] whitespace-nowrap">
            {TICKER_ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 shrink-0">
                <span className="text-primary-container font-bold">{item.id}</span>
                <span className="text-inverse-on-surface/80">{item.ev}</span>
                <span className="text-amber-400 font-bold">{item.v}</span>
                <span className="text-inverse-on-surface/40 text-[10px]">{item.ts}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 2: THE THESIS ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20" id="thesis">
        <p className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold mb-3">§ The Thesis</p>
        <h2 className="font-display font-light text-4xl md:text-5xl leading-[1.05] tracking-tight mb-4 max-w-[24ch]">
          Why this company.{' '}
          <em className="text-on-surface-variant font-light italic">Why now.</em>
        </h2>
        <p className="text-on-surface-variant text-base leading-relaxed max-w-[60ch] mb-12">
          Four structural pillars defend the investment case. Each is independent of the others. The platform's defensibility compounds because no follower can clear all four simultaneously.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {THESIS_PILLARS.map((p) => (
            <motion.div
              key={p.num}
              whileHover={{ y: -4 }}
              className="bg-surface-container-lowest rounded-2xl p-7 shadow-lg border border-outline-variant/10 flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-4">{p.num} · PILLAR</p>
                <h4 className="font-display font-medium text-xl leading-tight mb-3">{p.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{p.body}</p>
              </div>
              <div className="font-mono text-[10px] text-primary/80 tracking-wider border-t border-outline-variant/15 pt-4">
                {p.patents}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: THE FORTRESS ───────────────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-20" id="fortress">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-center">

            {/* Left Column: Fortress Brief */}
            <div>
              <p className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold mb-3">§ The Fortress</p>
              <h2 className="font-display font-light text-4xl md:text-5xl leading-[1.05] tracking-tight mb-4">
                21 patents.{' '}
                <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
                  Vertically filed.
                </span>
              </h2>
              <p className="text-on-surface-variant text-base leading-relaxed mb-8">
                The IP portfolio covers the full pipeline from learning surface to underwriting product. No architectural layer left uncovered. Compound coverage means an invalidation challenge against any single patent does not collapse protection.
              </p>

              {/* 4 Stat Tiles */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/10">
                  <p className="font-display font-medium text-3xl leading-none bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent mb-2">21</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Patents filed</p>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/10">
                  <p className="font-display font-medium text-3xl leading-none bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent mb-2">97</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Trade secrets · DTSA</p>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/10">
                  <p className="font-display font-medium text-3xl leading-none bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent mb-2">41</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Critical-Tier</p>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/10">
                  <p className="font-display font-medium text-3xl leading-none bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent mb-2">3</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Federal trademarks</p>
                </div>
              </div>
            </div>

            {/* Right Column: 21 Patent Grid Schematic */}
            <div>
              <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-xl border border-outline-variant/15">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/15">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">21-Patent Grid Schematic</span>
                  <span className="font-mono text-[10px] text-on-surface-variant/60">Hover or click cell for details</span>
                </div>

                <div className="grid grid-cols-7 gap-2.5">
                  {PATENTS.map((pat) => {
                    const isGold = pat.category === 'gold';
                    const isBlue = pat.category === 'blue';
                    const isSelected = selectedPatent?.id === pat.id;

                    return (
                      <motion.button
                        key={pat.id}
                        whileHover={{ scale: 1.08 }}
                        onClick={() => setSelectedPatent(isSelected ? null : pat)}
                        className={[
                          'aspect-square rounded-xl flex flex-col items-center justify-center font-mono text-[10px] font-bold p-1 cursor-pointer transition-all border',
                          isGold
                            ? 'text-white border-transparent shadow-md'
                            : isBlue
                              ? 'bg-[#2C4771] text-white border-transparent shadow-sm'
                              : 'bg-surface-container text-on-surface-variant border-outline-variant/20 hover:border-primary/40',
                          isSelected ? 'ring-2 ring-primary ring-offset-2' : '',
                        ].join(' ')}
                        style={isGold ? { background: 'linear-gradient(135deg,#775A19,#C5A059)' } : undefined}
                      >
                        <span className="text-[8px] opacity-70">IP</span>
                        <span className="text-[11px] leading-none mt-0.5">{pat.id.replace('PAT-', '')}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-5 font-mono text-[10px] uppercase tracking-wider text-on-surface-variant mt-5 pt-4 border-t border-outline-variant/15">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded" style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)' }} />
                    Architectural (6)
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-[#2C4771]" />
                    Underwriting (6)
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-surface-container border border-outline-variant/30" />
                    Supporting (9)
                  </span>
                </div>

                {/* Active Patent detail box */}
                {selectedPatent && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-surface-container-low border border-primary/20 text-xs"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono font-bold text-primary">{selectedPatent.name}</span>
                      <span className="font-mono text-[10px] uppercase text-on-surface-variant">{selectedPatent.category} tier</span>
                    </div>
                    <p className="font-bold text-on-surface text-sm mb-1">{selectedPatent.name}</p>
                    <p className="text-on-surface-variant">{selectedPatent.desc}</p>
                  </motion.div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ───────────────────────────────────────────────────────────────── */}
      <section className="bg-inverse-surface text-inverse-on-surface py-24 relative overflow-hidden">
        <div className="absolute -top-32 -right-16 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.18),transparent_65%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <p className="font-mono text-[11px] tracking-[.22em] uppercase text-primary-container font-bold mb-6">
            Series A · Houston · NYC · 2026
          </p>
          <h2 className="font-display font-light text-3xl md:text-5xl leading-[1.04] tracking-tight mb-6 max-w-[24ch]">
            The verification layer for the{' '}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
              autonomous era.
            </span>
          </h2>
          <p className="text-inverse-on-surface/85 max-w-[54ch] text-base leading-relaxed mb-8">
            Whether you are an enterprise managing workforce risk, a university seeking perpetual alumnus yield, or an engineer securing your Sovereign Passport — Tenured AI provides the mathematical underwriting layer.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/request-access"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-headline font-semibold shadow-xl hover:opacity-95 transition-all text-sm text-white"
              style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)', boxShadow: '0 8px 32px rgba(197,160,89,.32)' }}
            >
              Request Access →
            </Link>
            <Link
              to="/manifesto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-headline font-medium text-sm text-inverse-on-surface border border-white/20 hover:bg-white/8 transition-all"
            >
              Read the Manifesto
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
