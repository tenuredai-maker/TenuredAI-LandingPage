import { motion } from 'motion/react';

/* ── Onboarding stages from the State Leadership one-pager ── */
const ONBOARDING_STAGES = [
  {
    code: '01',
    days: 'Days 0–30',
    title: 'Executive briefing & corridor selection',
    body: 'A session with the Governor\'s policy office, the Workforce Commission, and Treasury. The revenue model is run against your state\'s actual enrollment and corridor employment data. Candidate corridors and flagship institutions are shortlisted in the room.',
    artifacts: ['Corridor shortlist', 'State revenue model', 'Institution candidates'],
  },
  {
    code: '02',
    days: 'Days 20–60',
    title: 'Attorney General & Treasury review',
    body: 'The AG receives the procurement-posture memorandum, the privacy dossier, the settlement terms, and the wind-down provisions. Treasury receives the settlement-integration spec and the GASB revenue-recognition note. This is the critical path — worth not rushing.',
    artifacts: ['AG posture opinion', 'Executed State MOU', 'Treasury approval'],
  },
  {
    code: '03',
    days: 'Days 45–90',
    title: 'Treasury settlement integration',
    body: 'The designated account or dedicated workforce fund is registered as settlement recipient. Reconciliation cadence, reporting format, and audit-access credentials are configured to your Comptroller\'s specification rather than ours.',
    artifacts: ['Settlement designation', 'Comptroller credential', 'Reconciliation schedule'],
  },
  {
    code: '04',
    days: 'Mo. 4–12',
    title: 'Institutional activation',
    body: 'The three flagship institutions execute their own Genesis MOUs and run their technical intake independently. Corridor recruiters activate against cleared graduates. The first 40/40/20 transactions route to the ledger.',
    artifacts: ['3 Genesis MOUs', 'Recruiter corridor live', 'First routed transactions'],
  },
  {
    code: '05',
    days: 'Mo. 12–18',
    title: 'First Treasury settlement & Heatmap go-live',
    body: 'Quarterly settlement begins to the designated account. The Kill-Switch Dashboard and statewide AICI Heatmap go live in your office. Statewide expansion becomes a legislative option supported by twelve months of live data rather than a projection.',
    artifacts: ['First settlement receipt', 'Kill-Switch credential', 'AICI Heatmap live'],
  },
];

/* ── Hero stats ── */
const HERO_STATS = [
  { label: 'Pilot timeline', value: '90 days', delta: 'Signature → first cleared cohort' },
  { label: 'Treasury share', value: '20%', delta: 'Both splits · atomically routed' },
  { label: 'Phase 1 seats', value: '1 state', delta: 'First-mover terms attach to first sig' },
  { label: 'Platform cost to state', value: '$0', delta: 'No license · no match · no in-kind' },
];

/* ── RACI offices ── */
const RACI = [
  { office: "Governor's policy office", commitment: '1 session', owns: 'Corridor selection · MOU execution' },
  { office: 'Attorney General', commitment: 'Critical path', owns: 'Procurement posture · privacy review' },
  { office: 'Treasury / Comptroller', commitment: '~8 hrs', owns: 'Recipient designation · audit config' },
  { office: 'Workforce Commission', commitment: 'Liaison', owns: 'Kill-Switch custody · corridor demand' },
  { office: 'Institutions', commitment: 'Independent', owns: 'Own MOU · own technical intake' },
];

/* ── Statutory pathways ── */
const STAT_PATHS = [
  {
    label: 'Path A',
    instrument: 'System board resolution',
    timeline: '60–120 days',
    tradeoff: 'Fastest · lowest friction. Binds one system only — multiple systems need multiple resolutions.',
  },
  {
    label: 'Path B',
    instrument: 'Appropriations rider',
    timeline: '6–14 months',
    tradeoff: 'Most durable · hardest to reverse. Requires floor time and exposes program to appropriations negotiation.',
  },
  {
    label: 'Path C',
    instrument: 'Executive workforce order',
    timeline: '30–60 days',
    tradeoff: 'Fast · unilateral. Reversible by a successor — best paired with Path A or B in the following cycle.',
  },
];

/* ── Readiness checklist ── */
const STATE_CHECKLIST = [
  'Candidate corridor — one industry vertical with real employer demand in-state',
  'Three flagship institutions — public, with the standing to move first',
  'Named settlement account — Treasury general or a dedicated workforce fund',
  'Governance liaison — the officer who will hold the Kill-Switch credential',
  'Public enrollment figures — so we model the Workforce Dividend against real numbers',
  'AG office availability — for the Stage 02 posture review, which is the critical path',
];

export default function StateRegents() {
  return (
    <div className="pt-0 min-h-screen bg-background text-on-surface">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-inverse-surface text-inverse-on-surface">
        <div className="absolute -top-6 -right-20 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(44,71,113,.18),transparent_65%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-20 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[11px] tracking-[.22em] uppercase text-amber-400 font-bold mb-5">
              One-Pager · State Leadership Brief · Genesis State MOU
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-light tracking-[-0.035em] leading-[1.03] mb-6 max-w-[22ch]">
              Ninety days from signature to{' '}
              <span
                className="italic font-medium"
                style={{ background: 'linear-gradient(135deg,#2C4771,#5A7FB5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                first Treasury settlement
              </span>
            </h1>
            <p className="text-inverse-on-surface/75 text-lg max-w-2xl leading-relaxed mb-10">
              One pilot corridor. Three flagship institutions. One executive MOU. No appropriation, no procurement, no mandate, no bill. The state's role is to name a corridor and show up to one meeting.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:state-partners@tenured.ai"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold tracking-widest uppercase transition-all"
                style={{ background: 'linear-gradient(135deg,#2C4771,#5A7FB5)', color: '#fff' }}
              >
                Schedule State Briefing →
              </a>
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold tracking-widest uppercase border border-white/15 text-inverse-on-surface/70">
                Phase 1 · 1 seat remaining
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT THE STATE DOES / WHAT WE DO ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* The state commits */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-lg border border-outline-variant/10">
            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-5">The state commits to four things</p>
            <ul className="space-y-4">
              {[
                { title: 'One pilot corridor', body: 'one industry vertical, three flagship public institutions.' },
                { title: 'A settlement recipient', body: 'Treasury account or dedicated workforce fund of record.' },
                { title: 'A governance liaison', body: 'one named officer to hold the Kill-Switch credential.' },
                { title: 'Permission to participate', body: 'board-level acknowledgment, not a mandate.' },
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-on-surface-variant leading-relaxed"><strong className="text-on-surface">{item.title}</strong> — {item.body}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tenured AI commits */}
          <div className="bg-inverse-surface text-inverse-on-surface rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-12 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(44,71,113,.2),transparent_70%)] pointer-events-none" />
            <p className="font-mono text-[10px] tracking-widest uppercase text-amber-400 font-bold mb-5 relative">
              Tenured AI commits to four things
            </p>
            <ul className="space-y-4 relative">
              {[
                { title: 'Both settlements.', body: '20% of the per-semester Access Fee and 20% of every in-state transaction — two separate settlements, both routed atomically, both unrestricted as to use. Detailed at §B5.' },
                { title: 'Zero cost to the state', body: '— no license, implementation fee, match, or in-kind commitment.' },
                { title: 'Kill-Switch Dashboard and AICI Heatmap', body: 'across every participating institution, provisioned to your designated office at go-live.' },
                { title: 'Merkle-proof audit access', body: '— verify every routed dollar without trusting the platform.' },
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-primary-container/20 text-primary-container font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-inverse-on-surface/85 leading-relaxed"><strong className="text-primary-container">{item.title}</strong> {item.body}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/10 font-mono text-[10px] text-amber-400/80 tracking-widest">
              TERM · PERPETUAL · TERMINATION · 180-DAY NOTICE · CREDENTIALS SURVIVE TERMINATION
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── THE ECONOMICS: TWO DIFFERENT 40/40/20S ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-4 pb-16">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ The Economics · B5</p>
        <h2 className="font-headline text-3xl font-bold mb-3">Two Different 40/40/20s. <em className="font-normal text-on-surface-variant italic">Do not conflate them.</em></h2>
        <p className="text-on-surface-variant text-base max-w-3xl mb-8 leading-relaxed">
          Both settle 40/40/20, and they are routinely treated as one thing in briefing. They are not the same money. <strong>The Access Split divides a per-student enrollment fee. The Dividend Split divides a per-hire transaction.</strong> Treasury receives 20% of each, on separate settlement schedules.
        </p>

        <div className="bg-surface-container rounded-2xl p-6 mb-8 border border-outline-variant/10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold mb-4">The distinction in one line</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">The Access Split</strong> divides the <strong>$100 Sovereign Access Fee charged per enrolled student, per semester</strong> at participating public institutions. Termly. Scales with public headcount. Settles whether or not a single graduate has yet been hired.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">The Dividend Split</strong> divides the <strong>transaction value a graduate generates in the labor market.</strong> Perpetual. Scales with corridor employment. Begins once cleared graduates enter the recruiter pipeline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Settlement One */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-lg border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2C4771] to-[#5A7FB5]" />
            <span className="font-mono text-[9px] tracking-[.18em] uppercase text-primary font-bold block mb-4">SETTLEMENT ONE · THE ACCESS SPLIT</span>
            <h3 className="font-headline font-bold text-2xl mb-2">$100 per student · per semester</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              The Sovereign Access Fee, charged per enrolled student per semester at public institutions and divided at the contract layer on settlement. The larger near-term Treasury line.
            </p>

            <div className="mb-4">
              <p className="font-mono text-[9px] tracking-wider uppercase text-on-surface-variant mb-2">Public institutions · 40 / 40 / 20</p>
              <div className="flex h-10 rounded-lg overflow-hidden text-[9px] font-bold font-mono">
                <div className="flex items-center justify-center bg-primary/20 text-[#2C4771]" style={{ width: '40%' }}>40% UNIVERSITY ($40)</div>
                <div className="flex items-center justify-center bg-[#B8862E] text-white" style={{ width: '40%' }}>40% PLATFORM ($40)</div>
                <div className="flex items-center justify-center bg-[#2C4771] text-white" style={{ width: '20%' }}>20% STATE ($20)</div>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-mono text-[9px] tracking-wider uppercase text-on-surface-variant mb-2">Private institutions · 50 / 50 (no state share)</p>
              <div className="flex h-10 rounded-lg overflow-hidden text-[9px] font-bold font-mono">
                <div className="flex items-center justify-center bg-primary/20 text-[#2C4771]" style={{ width: '50%' }}>50% UNIVERSITY ($50)</div>
                <div className="flex items-center justify-center bg-[#B8862E] text-white" style={{ width: '50%' }}>50% PLATFORM ($50)</div>
              </div>
              <p className="font-mono text-[9px] text-on-surface-variant/70 mt-2">No public workforce levy attaches to private institutions.</p>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4">
              <p className="font-mono text-[9px] tracking-wider uppercase text-on-surface-variant mb-2">Access Split · annual Treasury line by public enrollment</p>
              <table className="w-full text-xs font-mono">
                <tbody>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Public enrollment · 400,000</td><td className="py-2 text-right text-primary font-bold">$16M / yr</td></tr>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Public enrollment · 800,000</td><td className="py-2 text-right text-primary font-bold">$32M / yr</td></tr>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Texas reference · ~1.6M</td><td className="py-2 text-right text-primary font-bold">$64M / yr</td></tr>
                  <tr><td className="py-2">California reference · ~2.6M</td><td className="py-2 text-right text-primary font-bold">$104M / yr</td></tr>
                </tbody>
              </table>
              <p className="text-[10px] text-on-surface-variant mt-2 italic">Two semesters per academic year at full statewide public adoption. Pilot-stage figures scale from participating cohort only.</p>
            </div>
          </div>

          {/* Settlement Two */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-lg border border-outline-variant/10 relative overflow-hidden">
            <span className="font-mono text-[9px] tracking-[.18em] uppercase text-primary font-bold block mb-4">SETTLEMENT TWO · THE DIVIDEND SPLIT</span>
            <h3 className="font-headline font-bold text-2xl mb-2">20% of every in-state transaction</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              A separate instrument on a separate base — no student fee is involved. Every recruiter reveal and every Performance Bond issued against a hire in your corridor routes to Treasury per transaction, in perpetuity.
            </p>

            <div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-5 mb-6">
              <p className="font-mono text-[9px] uppercase text-amber-400 font-bold mb-3">Settlement Properties · B4</p>
              <ul className="space-y-1.5 text-xs">
                <li>· <strong className="text-primary-container">Atomic:</strong> Routes at the instant of transaction. Never accrues, never escrows.</li>
                <li>· <strong className="text-primary-container">Cryptographically locked:</strong> Enforced at the smart-contract layer. No admin keys.</li>
                <li>· <strong className="text-primary-container">Auditable:</strong> Every routed dollar carries a Merkle proof your Comptroller can verify.</li>
                <li>· <strong className="text-primary-container">Perpetual:</strong> Attaches to the graduate. A 2027 cohort still settles in 2047.</li>
                <li>· <strong className="text-primary-container">GASB-aligned:</strong> Revenue schedule formatted to your Comptroller's spec.</li>
              </ul>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4">
              <p className="font-mono text-[9px] tracking-wider uppercase text-on-surface-variant mb-2">Dividend Split · Treasury 20% by stage</p>
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-outline-variant/10 text-[9px] text-on-surface-variant">
                    <th className="text-left pb-1">Stage</th>
                    <th className="text-right pb-1">Bonded hires/yr</th>
                    <th className="text-right pb-1">Treasury 20%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Pilot · single corridor</td><td className="py-2 text-right">3,500</td><td className="py-2 text-right text-primary font-bold">$7.9M</td></tr>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Statewide rollout</td><td className="py-2 text-right">15,000</td><td className="py-2 text-right text-primary font-bold">$33.8M</td></tr>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Mature integration</td><td className="py-2 text-right">40,000</td><td className="py-2 text-right text-primary font-bold">$90M</td></tr>
                  <tr><td className="py-2">National anchor</td><td className="py-2 text-right">67,800</td><td className="py-2 text-right text-primary font-bold">$152.5M</td></tr>
                </tbody>
              </table>
              <p className="text-[10px] text-on-surface-variant mt-2 italic">Modeled at $11,250 average annual premium per bonded hire at Chubb Gold tier. Excludes reveal-credit volume (+22–34%).</p>
            </div>

            <div className="mt-4 bg-[#2C4771]/10 border border-[#2C4771]/20 rounded-xl p-4">
              <p className="font-mono text-[9px] uppercase text-[#2C4771] dark:text-[#5A7FB5] font-bold mb-1">The Double-Dip</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">Treasury receives the settlement <em>and</em> the widened tax base. Verified graduates in modeled corridors clear $15K–$20K above national median in first-role compensation. The income-tax and sales-tax effect of that delta, compounded across a graduating cohort, is a second-order return the settlement figures above do not include.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO STATS ───────────────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 md:px-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HERO_STATS.map(s => (
              <div key={s.label} className="bg-surface-container-lowest rounded-2xl p-5 shadow-lg">
                <p className="font-mono text-[10px] tracking-[.14em] uppercase text-on-surface-variant font-semibold mb-2">{s.label}</p>
                <p className="font-display font-medium text-3xl leading-none tracking-[-0.02em] bg-gradient-to-br from-[#2C4771] to-[#5A7FB5] bg-clip-text text-transparent mb-2">{s.value}</p>
                <p className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{s.delta}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── ONBOARDING SEQUENCE ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ The Onboarding Sequence · B2</p>
        <h2 className="font-headline text-3xl font-bold mb-2">Five stages · each terminating in a filable artifact</h2>
        <p className="text-on-surface-variant text-sm mb-10 max-w-2xl">
          The ninety-day timeline is not a projection — it is the measured average across comparable state-level MOU processes. Stage 02 (AG review) is the critical path and is worth not rushing.
        </p>
        <div className="space-y-4">
          {ONBOARDING_STAGES.map((stage, idx) => (
            <motion.div
              key={stage.code}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-start"
            >
              <div className="flex flex-col items-center gap-1 min-w-[3rem]">
                <span
                  className="w-10 h-10 rounded-full font-mono font-bold text-sm flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#2C4771,#5A7FB5)', color: '#fff' }}
                >{stage.code}</span>
                <span className="font-mono text-[9px] text-on-surface-variant text-center leading-tight">{stage.days}</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-base mb-2">{stage.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{stage.body}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:flex-col">
                {stage.artifacts.map(a => (
                  <span key={a} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container text-on-surface-variant font-mono text-[9px] tracking-wide">
                    <span className="text-emerald-500">→</span> {a}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TREASURY INTEGRATION SPEC ────────────────────────────────────── */}
      <section className="bg-surface-container-low py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">Treasury Integration · B4</p>
          <h2 className="font-headline text-3xl font-bold mb-2">Atomic settlement. Merkle-proof reconciliation. No escrow risk.</h2>
          <p className="text-on-surface-variant text-sm mb-8 max-w-2xl">
            There is no counterparty holding your money. The split executes at the contract layer at the instant of transaction — the platform never holds the state's share, so it cannot fail to remit it.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Spec terminal */}
            <div className="bg-[#0D1117] text-emerald-400 rounded-2xl p-6 font-mono text-xs leading-relaxed shadow-xl">
              <p className="text-amber-400 font-bold mb-3 tracking-widest text-[9px] uppercase">TENURED AI · STATE TREASURY SETTLEMENT SPEC · REV 1.8</p>
              <p className="text-on-surface-variant/40 mb-3">─────────────────────────────────────────────</p>
              <div className="space-y-0.5">
                <p className="text-primary-container font-bold">[ SETTLEMENT MECHANICS ]</p>
                <p><span className="text-on-surface-variant/50">split_enforcement</span>  smart contract · immutable</p>
                <p><span className="text-on-surface-variant/50">state_share</span>        20.00% · both splits · public</p>
                <p><span className="text-on-surface-variant/50">routing</span>            per-transaction · atomic</p>
                <p><span className="text-on-surface-variant/50">accrual</span>            none · no escrow held</p>
                <p><span className="text-on-surface-variant/50">clawback</span>           not permissible by contract</p>
              </div>
              <div className="mt-3 space-y-0.5">
                <p className="text-primary-container font-bold">[ RECIPIENT CONFIGURATION ]</p>
                <p><span className="text-on-surface-variant/50">designation</span>        Treasury | dedicated fund</p>
                <p><span className="text-on-surface-variant/50">reassignment</span>       state-initiated, 30-day</p>
                <p><span className="text-on-surface-variant/50">restriction</span>        none · unrestricted revenue</p>
              </div>
              <div className="mt-3 space-y-0.5">
                <p className="text-primary-container font-bold">[ RECONCILIATION & AUDIT ]</p>
                <p><span className="text-on-surface-variant/50">cadence</span>            quarterly settlement</p>
                <p><span className="text-on-surface-variant/50">reporting</span>          monthly detail statement</p>
                <p><span className="text-on-surface-variant/50">proof</span>              Merkle root · public chain</p>
                <p><span className="text-on-surface-variant/50">verification</span>       independent of platform</p>
                <p><span className="text-on-surface-variant/50">format</span>             GASB-aligned revenue schedule</p>
              </div>
              <div className="mt-3 space-y-0.5">
                <p className="text-primary-container font-bold">[ WIND-DOWN PROVISION ]</p>
                <p><span className="text-on-surface-variant/50">notice</span>             180 days, either party</p>
                <p><span className="text-on-surface-variant/50">routed_funds</span>       retained by state · final</p>
                <p><span className="text-on-surface-variant/50">credentials</span>        survive · on-chain anchored</p>
              </div>
              <p className="text-on-surface-variant/40 mt-3">─────────────────────────────────────────────</p>
              <p className="text-amber-400/70 text-[9px] mt-2">STATUS: reference implementation available at AG review</p>
            </div>

            {/* Revenue characteristics */}
            <div className="grid grid-cols-1 gap-4">
              {[
                { num: '01', title: 'Non-tax revenue', body: 'Transaction-derived, not levied on residents. Does not require a tax vote, does not count against a tax cap.' },
                { num: '02', title: 'Counter-cyclical', body: 'Tied to enrollment, which rises in downturns. The line strengthens exactly when general revenue weakens.' },
                { num: '03', title: 'Earmarkable by statute', body: 'Your legislature may direct it — workforce development, K-12 STEM, community college capital. We impose no restriction.' },
                { num: '04', title: 'Independently verifiable', body: 'Every routed dollar carries a Merkle proof anchored to public chain. Your Comptroller reconciles against the chain, not a statement we produce.' },
              ].map(p => (
                <div key={p.num} className="bg-surface-container-lowest rounded-2xl p-5 shadow-lg border border-outline-variant/10">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-1">{p.num}</p>
                  <h3 className="font-headline font-bold text-base mb-1">{p.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICES: RACI MAP ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">Four offices · no operational burden on the state</p>
        <h2 className="font-headline text-3xl font-bold mb-8">Who does what</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/10 text-left">
                <th className="pb-3 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Office</th>
                <th className="pb-3 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Commitment</th>
                <th className="pb-3 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Owns</th>
              </tr>
            </thead>
            <tbody>
              {RACI.map((row, i) => (
                <tr key={i} className="border-b border-outline-variant/10">
                  <td className="py-4 font-medium text-on-surface">{row.office}</td>
                  <td className="py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full font-mono text-[9px] font-bold tracking-widest uppercase ${row.commitment === 'Critical path' ? 'bg-amber-400/15 text-amber-600 dark:text-amber-400' : 'bg-primary/10 text-primary'}`}>
                      {row.commitment}
                    </span>
                  </td>
                  <td className="py-4 text-on-surface-variant">{row.owns}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── GOVERNANCE INSTRUMENT: AICI HEATMAP ─────────────────────────── */}
      <section className="bg-surface-container-low py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">The Governance Instrument · B6</p>
          <h2 className="font-headline text-3xl font-bold mb-2">The Statewide AICI Heatmap</h2>
          <p className="text-on-surface-variant text-sm mb-8 max-w-2xl leading-relaxed">
            A live map of where competence actually is. Provisioned at go-live to your designated office. Deep intellectual blue denotes verified density; ochre denotes decay and underemployment risk.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Live talent pipe for site selection',
                body: 'Your economic development office can show a prospective employer the exact count of verified graduates in a named competency cluster within a fifty-mile radius — a live count of cleared Hard-Gates, not a projection from degree conferrals.',
              },
              {
                num: '02',
                title: 'Brain-drain early warning',
                body: 'The Alumni Continuity Protocol tracks the share of certified graduates remaining in-state by corridor and institution. When a corridor\'s retention rate breaks trend, the office sees it in the quarter it happens.',
              },
              {
                num: '03',
                title: 'Institutional ROI leaderboard',
                body: 'Institutions ranked by skill velocity and verified artifact output, not enrollment or spend. A defensible basis for allocating scaling grants — and a defensible basis for declining to.',
              },
            ].map(p => (
              <div key={p.num} className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
                <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-2">Instrument {p.num}</p>
                <h3 className="font-headline font-bold text-base mb-2">{p.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-[#2C4771]/10 border border-[#2C4771]/20 rounded-2xl p-5">
            <p className="font-mono text-[9px] uppercase text-[#2C4771] dark:text-[#5A7FB5] font-bold mb-1">Privacy floor</p>
            <p className="text-sm text-on-surface-variant leading-relaxed">Every view in the Heatmap is aggregate and k-anonymity preserving. The state never sees an individual student, an individual score, or an individual employment record — at any zoom level, under any filter, for any office.</p>
          </div>
        </div>
      </section>

      {/* ── STATUTORY PATHWAYS ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ B8 · Statutory Pathways · Pilot, Then Scale</p>
        <h2 className="font-headline text-3xl font-bold mb-2">Three routes to statewide. The pilot needs none of them.</h2>
        <p className="text-on-surface-variant text-sm mb-8 max-w-2xl leading-relaxed">
          Phase 1 requires only an executive MOU. Phase 2 — moving from a three-institution corridor to a system-wide standard — has three viable paths.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {STAT_PATHS.map(p => (
            <div key={p.label} className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
              <p className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold mb-2">{p.label}</p>
              <h3 className="font-headline font-bold text-base mb-1">{p.instrument}</h3>
              <p className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold mb-3">{p.timeline}</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">{p.tradeoff}</p>
            </div>
          ))}
        </div>
        <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10">
          <p className="font-mono text-[9px] uppercase text-primary font-bold mb-2">Sequencing recommendation</p>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Run the ninety-day pilot under executive MOU with no statutory instrument at all. At Month 12, the first settlement and twelve months of Heatmap data exist. Take Path A or B into the following session with a live revenue line and a live governance dashboard rather than a projection. <strong className="text-on-surface">The pilot is not a step toward the legislation — it is the evidence that makes the legislation trivial.</strong>
          </p>
        </div>
      </section>

      {/* ── READINESS CHECKLIST ──────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ B9 · Before the Executive Briefing</p>
          <h2 className="font-headline text-3xl font-bold mb-8">Six things to have in the room. Nothing else.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-lg border border-outline-variant/10">
              <p className="font-mono text-[10px] tracking-widest uppercase text-on-surface-variant font-bold mb-5">State readiness checklist</p>
              <ul className="space-y-3">
                {STATE_CHECKLIST.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full border-2 border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-primary/50" />
                    </span>
                    <span className="text-sm text-on-surface-variant leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-inverse-surface text-inverse-on-surface rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(44,71,113,.2),transparent_70%)] pointer-events-none" />
              <p className="font-mono text-[10px] tracking-widest uppercase text-amber-400 font-bold mb-5 relative">What we bring to the same meeting</p>
              <ul className="space-y-3 relative">
                {[
                  'State revenue model run against your enrollment and corridor employment data',
                  'Procurement-posture memorandum for the AG, addressing competitive bid and appropriation directly',
                  'Treasury settlement specification and GASB revenue-recognition note for the Comptroller',
                  'Draft State MOU with perpetual 20% terms and wind-down provisions, ready for redline',
                  'Kill-Switch and Heatmap demonstration against synthetic statewide data',
                  'Reference corridor analysis — Houston Energy and NYC Finance, modeled in full',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-inverse-on-surface/80 leading-relaxed">
                    <span className="text-amber-400 shrink-0 mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ASK / CTA ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
        <p className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold mb-4">§ B10 · The Ask</p>
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto leading-tight">
          One briefing. One MOU. One pilot corridor.
        </h2>
        <p className="text-on-surface-variant text-base max-w-2xl mx-auto mb-4 leading-relaxed">
          We are not asking for an appropriation, a procurement, a mandate, or a bill. We are asking for a ninety-minute executive briefing and an MOU that names one corridor and three institutions.
        </p>
        <p className="text-on-surface-variant/60 font-mono text-xs mb-10 max-w-xl mx-auto">
          Phase 1 seats one state. First-mover terms, corridor origination status, and the founding seat on the multi-state governance council attach to the first signature and to no one after.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:state-partners@tenured.ai"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-mono text-sm font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg,#2C4771,#5A7FB5)', color: '#fff' }}
          >
            Schedule State Briefing
          </a>
          <a
            href="mailto:state-partners@tenured.ai"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-mono text-sm font-bold tracking-widest uppercase border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all"
          >
            Request MOU Draft
          </a>
        </div>
        <p className="font-mono text-[10px] text-on-surface-variant/40 tracking-widest mt-8">
          TENURED AI · STATE PARTNERSHIP OFFICE · state-partners@tenured.ai · Houston, TX
        </p>
      </section>

    </div>
  );
}
