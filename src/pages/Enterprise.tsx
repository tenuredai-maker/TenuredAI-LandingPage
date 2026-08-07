import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, TrendingUp, AlertTriangle, FileText, CheckCircle2, Building2, BarChart3, Lock, Zap, ArrowRight, DollarSign, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Data Sourced from Specs ──────────────────────────────────────────────────────────

const EXPOSURE_CARDS = [
  {
    badge: 'EXPOSURE 01',
    title: 'Hallucination Liability',
    desc: 'An over-confident AI-mediated decision by a hire — misrouted financial workflow, misdiagnosed clinical case, or misconfigured production deployment — causes multi-million-dollar incidents. D&O insurers now demand proof of human operator competency.',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    badge: 'EXPOSURE 02',
    title: 'Regulatory Exposure',
    desc: 'EU AI Act, NIST AI RMF, and SEC AI disclosure rules require demonstrable operator competency. "We hired them off LinkedIn" is legally indefensible. Counsel needs a forensically defensible record of human-AI collaboration.',
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  },
  {
    badge: 'EXPOSURE 03',
    title: 'Talent Failure Cost ($315K)',
    desc: 'A senior AI hire that misfires within 180 days costs 1.4x comp. At $200K base + $25K bonus, the average unbonded AI-era hiring failure is a $315K direct loss, excluding lost strategic momentum.',
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  },
];

const CHUBB_TIERS = [
  { tier: 'SILVER', osd: 'OSD ≥ 0.40', credit: '15%', savings: '$2.25M / yr', desc: 'Baseline verified cohort. Multi-agent Hard-Gate coverage across core engineering.' },
  { tier: 'GOLD', osd: 'OSD ≥ 0.60', credit: '25%', savings: '$3.75M / yr', desc: 'High Sovereign Density. Active Refresh Labs and continuous bond monitoring.' },
  { tier: 'PLATINUM', osd: 'OSD ≥ 0.80', credit: '35%', savings: '$5.25M / yr', desc: 'Maximum workforce resilience. Full EWARD instrumentation and zero single points of failure.' },
];

const OSD_GRID_NODES = [
  { code: '94%', level: 'sovereign', label: 'LLM Fine-tuning' },
  { code: '88%', level: 'sovereign', label: 'Prompt Engineering' },
  { code: '42%', level: 'mid', label: 'Vector DB Latency' },
  { code: '12%', level: 'gap', label: 'EU AI Act Rules' },
  { code: '91%', level: 'sovereign', label: 'RAG Pipeline' },
  { code: '76%', level: 'high', label: 'Agent Tooling' },
  { code: '31%', level: 'gap', label: 'Multi-Agent Consensus' },
  { code: '85%', level: 'high', label: 'Context Budgeting' },
  { code: '68%', level: 'mid', label: 'Guardrail Enforcement' },
  { code: '95%', level: 'sovereign', label: 'Python Async' },
  { code: '18%', level: 'gap', label: 'Model Evaluation' },
  { code: '82%', level: 'high', label: 'API Security' },
  { code: '54%', level: 'mid', label: 'Fine-tuning Data' },
  { code: '89%', level: 'sovereign', label: 'Token Optimization' },
  { code: '71%', level: 'high', label: 'LangChain / LlamaIndex' },
  { code: '24%', level: 'gap', label: 'Cost Allocation' },
];

export default function Enterprise() {
  const [activeTab, setActiveTab] = useState<'overview' | 'eward' | 'bonds' | 'chubb'>('overview');

  return (
    <div className="pt-20 min-h-screen bg-background text-on-surface">

      {/* ── HERO EXECUTIVE BRIEFING ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-16 relative overflow-hidden">
        <div className="absolute -top-24 -right-16 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.15),transparent_70%)] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              ENTERPRISE · EWARD BRIEFING
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02] mb-6 max-w-[22ch]">
            Hire a verified human.{' '}
            <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
              Bonded against failure.
            </span>
          </h1>

          <p className="text-on-surface-variant text-lg leading-relaxed max-w-3xl mb-10">
            A briefing for Chief Financial Officers, Chief Risk Officers, Heads of AI Operations, and General Counsel on Tenured AI — the only platform that issues Performance Bonds on AI-era hires, monitors organizational AI competency as a financial metric, and qualifies your workforce for Chubb premium credits up to 35%.
          </p>

          {/* Target Audience Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-10 text-xs font-mono text-on-surface-variant">
            <span className="font-bold text-primary uppercase tracking-widest">PREPARED FOR:</span>
            {['Chief Financial Officer', 'Chief Risk Officer', 'Head of AI Operations', 'General Counsel'].map((role) => (
              <span key={role} className="bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/10 text-on-surface">
                {role}
              </span>
            ))}
          </div>

          {/* Key Executive Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { label: 'PERFORMANCE BOND', val: '$150,000', sub: 'Guaranteed 180-day coverage' },
              { label: 'CHUBB D&O CREDIT', val: 'UP TO 35%', sub: 'Save up to $5.25M / yr on $15M' },
              { label: 'ANNUAL PREMIUM', val: '$11,250', sub: '5% of total package fee' },
              { label: 'OSD METRIC', val: 'EWARD', sub: 'Live Workforce Density Console' },
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

      {/* ── THE UNPRICED LIABILITY PROBLEM ────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.22em] uppercase text-rose-500 font-bold mb-3">§01 · The Risk Exposure</p>
          <h2 className="font-display font-light text-3xl md:text-5xl leading-tight mb-4">
            Your AI-era hires are uninsured.{' '}
            <em className="text-on-surface-variant italic font-light">Your competitors will price this first.</em>
          </h2>
          <p className="text-on-surface-variant text-sm max-w-2xl mb-10 leading-relaxed">
            The hiring decisions your enterprise made last quarter assumed AI proficiency from résumés and LinkedIn profiles. Your enterprise is now carrying that uninstrumented risk into production.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPOSURE_CARDS.map((card) => (
              <div key={card.badge} className="bg-surface-container-lowest rounded-2xl p-7 shadow-lg border border-outline-variant/10 flex flex-col justify-between">
                <div>
                  <span className={`font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border mb-4 inline-block ${card.color}`}>
                    {card.badge}
                  </span>
                  <h3 className="font-headline font-bold text-xl mb-3">{card.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE SOVEREIGN UNDERWRITING SOLUTION ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold mb-3">§02 · Sovereign Underwriting Solution</p>
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Every hire bonded. Every workflow instrumented.</h2>
        <p className="text-on-surface-variant text-sm max-w-3xl mb-10 leading-relaxed">
          Tenured AI converts AI-era hiring from an unbounded liability into a hedged, instrumented financial position.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-lg border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-bold text-xl">For New Hires (I-100 Recruiter)</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              Recruiters source from a pool of <strong className="text-on-surface font-semibold">forensically verified candidates</strong> — candidates who cleared Hard-Gates with 4-agent consensus and cryptographic Proof of Friction. Every hire carries a 180-day Performance Bond ($V_u$ guarantee) underwritten by Chubb pilot infrastructure.
            </p>
            <ul className="space-y-2 text-xs text-on-surface-variant font-mono">
              <li className="flex items-center gap-2">✓ 180-day $150K Performance Guarantee</li>
              <li className="flex items-center gap-2">✓ 4-agent consensus verification</li>
              <li className="flex items-center gap-2">✓ Zero-knowledge 3-phase privacy protocol</li>
            </ul>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-lg border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-tertiary-container text-on-tertiary-container">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-bold text-xl">For Existing Workforce (EWARD)</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              Your Risk Officer receives the <strong className="text-on-surface font-semibold">Enterprise Workforce AI Readiness Dashboard</strong> — live measurement of Organizational Sovereign Density (OSD), Time-To-Recovery (TTR_org), coverage gaps, and active bond exposure across your entire cohort.
            </p>
            <ul className="space-y-2 text-xs text-on-surface-variant font-mono">
              <li className="flex items-center gap-2">✓ Live OSD score &amp; single point of failure atlas</li>
              <li className="flex items-center gap-2">✓ Audit-ready for SEC AI disclosure &amp; EU AI Act</li>
              <li className="flex items-center gap-2">✓ Chaos Scenario Simulator for regulatory shifts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── PERFORMANCE BOND ECONOMICS ────────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold mb-3">§03 · Underwriting Math</p>
          <h2 className="font-display font-light text-3xl md:text-5xl leading-tight mb-4">
            $11,250 annual premium.{' '}
            <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
              $150,000 guarantee.
            </span>
          </h2>
          <p className="text-on-surface-variant text-sm max-w-2xl mb-10 leading-relaxed">
            For a $200K base + $25K bonus AI-era hire, Tenured AI issues a Performance Bond. If Command Authority drifts below strike threshold and fails corrective Hard-Gates, the bond pays out atomically from the Underwriting Reserve.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Vault Display */}
            <div className="bg-[#16140F] text-inverse-on-surface rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden font-mono">
              <div className="text-amber-400 text-[10px] tracking-[.2em] uppercase font-bold mb-4">
                PERFORMANCE BOND · STANDARD SPEC (PAT-013 / PAT-014)
              </div>
              <div className="space-y-3 text-xs leading-relaxed text-amber-200/90">
                <p className="text-white font-bold text-sm border-b border-white/10 pb-2">UNDERWRITING FORMULA</p>
                <p>π = $5,000 × (λ=0.08 / CLI=0.92) × 1.2x volatility</p>
                <p className="text-lg font-bold text-amber-400">ANNUAL PREMIUM (π) = $11,250 / yr</p>
                <div className="pt-2 border-t border-white/10">
                  <p>V_u = ($200,000 base + $25,000 bonus) × 0.94 × 1.2</p>
                  <p className="text-2xl font-bold text-amber-300">GUARANTEE (V_u) = $150,000</p>
                </div>
                <p className="text-[11px] text-emerald-400 pt-2">Strike Threshold = AICI 80 (Command Authority Index)</p>
              </div>
            </div>

            {/* Payout Benefits */}
            <div className="space-y-6">
              <h3 className="font-headline font-bold text-2xl">What your enterprise receives for $11,250 / year:</h3>
              <ul className="space-y-4">
                {[
                  { title: '$150,000 Atomic Guarantee', desc: 'Paid directly from the Underwriting Reserve upon a triggered strike event, accompanied by full forensic evidence playback.' },
                  { title: 'Continuous Command Authority Monitoring', desc: 'Candidate competency is re-evaluated on every cleared Refresh Lab and Hard-Gate.' },
                  { title: 'D&O Defensibility Record', desc: 'Insurers see a forensically documented record of verified human competence at hire and continuously thereafter.' },
                  { title: 'Zero-Cost Replacement Search', desc: 'A triggered payout funds immediate candidate replacement through the I-100 reveal protocol.' },
                ].map((b) => (
                  <li key={b.title} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-on-surface">{b.title}</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHUBB D&O PILOT PREMIUM CREDITS ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold mb-3">§04 · Insurance Pilot Partnership</p>
        <h2 className="font-display font-light text-3xl md:text-5xl leading-tight mb-4">
          Up to 35% off your{' '}
          <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
            D&amp;O and E&amp;O premium.
          </span>
        </h2>
        <p className="text-on-surface-variant text-sm max-w-3xl mb-10 leading-relaxed">
          Tenured AI's pilot partnership with Chubb tiers premium credits against your Organizational Sovereign Density ($OSD$). For an enterprise spending $15M/yr on D&amp;O and E&amp;O, Platinum tier represents a <strong className="text-primary font-semibold">$5.25M annual savings</strong>.
        </p>

        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-xl border border-outline-variant/10 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20 text-on-surface-variant text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Chubb Tier</th>
                  <th className="py-3 px-4">OSD Threshold</th>
                  <th className="py-3 px-4">Premium Credit</th>
                  <th className="py-3 px-4">Annual Savings ($15M D&amp;O/E&amp;O)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {CHUBB_TIERS.map((t) => (
                  <tr key={t.tier} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-on-surface">{t.tier}</td>
                    <td className="py-4 px-4 text-on-surface-variant">{t.osd}</td>
                    <td className="py-4 px-4 font-bold text-primary">{t.credit}</td>
                    <td className="py-4 px-4 font-bold text-emerald-600 dark:text-emerald-400">{t.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-on-surface-variant italic leading-relaxed max-w-3xl">
          Chubb's underwriting model treats verified workforce competence as a measurable risk reduction equivalent to formal safety controls in commercial property insurance. Your OSD score is the workforce equivalent of a sprinkler system.
        </p>
      </section>

      {/* ── EWARD DASHBOARD & OSD HEATMAP ─────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold mb-3">
            §05 · EWARD Risk Console &amp; OSD Heatmap
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Your CFO &amp; CRO risk surface.</h2>
          <p className="text-on-surface-variant text-sm max-w-2xl mb-10 leading-relaxed">
            The OSD Heatmap renders workforce AI competency density across the 4,000-node skill ontology, exposing single points of failure and bus-factor risk before incidents occur.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* OSD Heatmap Sample */}
            <div className="bg-surface-container-lowest rounded-3xl p-7 shadow-lg border border-outline-variant/10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
                  OSD HEATMAP · COHORT VERIFICATION %
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant">k-Anonymity Preserved</span>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {OSD_GRID_NODES.map((node, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border text-center transition-all ${node.level === 'sovereign'
                        ? 'bg-primary/15 border-primary/30 text-primary font-bold'
                        : node.level === 'high'
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold'
                          : node.level === 'mid'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
                            : 'bg-rose-500/15 border-rose-500/30 text-rose-500 font-bold'
                      }`}
                  >
                    <p className="font-mono text-xs mb-0.5">{node.code}</p>
                    <p className="font-mono text-[9px] truncate opacity-80">{node.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between font-mono text-[10px] text-on-surface-variant pt-3 border-t border-outline-variant/15">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-rose-500" /> Single Point Failure</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> Moderate Gap</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-primary" /> Verified Sovereign</span>
              </div>
            </div>

            {/* Heatmap Insights */}
            <div className="space-y-6">
              <h3 className="font-headline font-bold text-2xl">What EWARD forces for your executive team:</h3>
              <ul className="space-y-4">
                {[
                  { title: 'Visible Bus-Factor Risk', desc: 'Red cells expose exact single points of failure ("we have one engineer who knows Vector DB Latency and they are on vacation").' },
                  { title: 'Staged Remediation Budgeting', desc: 'Each gap row compares cost-to-close: hire externally via I-100 ($84K bonded hire) vs upskill internally via Forge ($4K cohort of 3).' },
                  { title: 'Default Privacy & K-Anonymity', desc: 'Cohorts under 3 verified contributors auto-mask, maintaining internal political buy-in while presenting true executive risk.' },
                  { title: 'Chaos Scenario Simulator', desc: 'Run "what if EU AI Act enforcement accelerates this quarter" to project financial exposure before regulatory audits.' },
                ].map((item) => (
                  <li key={item.title} className="bg-surface-container-lowest rounded-2xl p-5 shadow border border-outline-variant/10">
                    <h4 className="font-bold text-sm text-on-surface mb-1">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING EXECUTIVE CTA ─────────────────────────────────────────────────── */}
      <section className="bg-inverse-surface text-inverse-on-surface py-20 relative overflow-hidden">
        <div className="absolute -top-32 -right-16 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.18),transparent_65%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <p className="font-mono text-[11px] tracking-[.22em] uppercase text-primary-container font-bold mb-5">
            § Executive Action · Sovereign Underwriting
          </p>
          <h2 className="font-display font-light text-3xl md:text-5xl leading-tight mb-6 max-w-[22ch]">
            Schedule an EWARD audit.{' '}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
              Underwrite your workforce.
            </span>
          </h2>
          <p className="text-inverse-on-surface/85 max-w-2xl text-base leading-relaxed mb-8">
            Connect your Risk Office with Tenured AI to evaluate your Organizational Sovereign Density, compute your Chubb D&amp;O premium credit tier, and bond your critical AI hires.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/request-access"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-headline font-semibold shadow-xl hover:opacity-95 transition-all text-sm text-white"
              style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)', boxShadow: '0 8px 32px rgba(197,160,89,.32)' }}
            >
              Request EWARD Audit →
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-headline font-medium text-sm text-inverse-on-surface border border-white/20 hover:bg-white/8 transition-all"
            >
              View Bond Pricing &amp; Plans
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
