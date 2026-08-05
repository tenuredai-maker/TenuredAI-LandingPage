import React, { useState } from 'react';
import { motion } from 'motion/react';

// ─── Types ─────────────────────────────────────────────────────────────────
type CorridorKey = 'all' | 'houston-energy' | 'nyc-finance' | 'boston-healthcare' | 'dc-defense' | 'genesis';

// ─── Data (sourced from TenuredAI_L200_Static.html + OnePager_University_Leadership.html) ────────
const HERO_STATS = [
  { label: 'Genesis · Q2 2026', value: '14', delta: '▲ +3 vs Q1' },
  { label: 'In qualification', value: '28', delta: '▲ +9 vs Q1' },
  { label: 'Cumulative GDA · paid', value: '$8.4M', delta: '▲ +$3.1M Q2' },
  { label: 'Verified candidates', value: '4,418', delta: '▲ +1,247 Q2' },
];

const REVENUE_ROWS = [
  { phase: 'Pilot · 3 cohorts onboarded', active: '340 active alumni', gda: '$2.9M / year' },
  { phase: 'Year 2 · 8 cohorts onboarded', active: '~840 active', gda: '$4.1M / year' },
  { phase: 'Year 4 · full undergrad participation', active: '~1,800 active', gda: '$6.2M / year' },
  { phase: 'Mature · graduate programs added', active: '~2,400 active', gda: '$8.4M / year' },
];

const LEAGUE_ROWS = [
  { rank: '01', delta: '—', deltaType: 'flat', inst: 'University of Houston', sub: 'Genesis · since 2026 Q1', corridor: 'Houston-Energy', corridorNote: 'Anchor', gda: '$1,840,000', gdaDelta: '+$520K vs Q1', triple: 74, verified: 812, genesis: true },
  { rank: '02', delta: '▲ 4', deltaType: 'up', inst: 'Rice University', sub: 'Genesis · since 2026 Q2', corridor: 'Houston-Energy', corridorNote: 'Co-anchor', gda: '$1,420,000', gdaDelta: '+$1.42M new', triple: 71, verified: 624, genesis: true },
  { rank: '03', delta: '▲ 2', deltaType: 'up', inst: 'University of Texas · Austin', sub: 'Genesis · since 2026 Q2', corridor: 'Houston-Energy', corridorNote: 'Statewide', gda: '$1,180,000', gdaDelta: '+$1.18M new', triple: 68, verified: 528, genesis: true },
  { rank: '04', delta: 'NEW', deltaType: 'new', inst: 'Columbia University', sub: 'Genesis · since 2026 Q2', corridor: 'NYC-Finance', corridorNote: 'Anchor', gda: '$988,000', gdaDelta: '+$988K new', triple: 79, verified: 412, genesis: true },
  { rank: '05', delta: 'NEW', deltaType: 'new', inst: 'NYU Stern', sub: 'Genesis · since 2026 Q2', corridor: 'NYC-Finance', corridorNote: 'Co-anchor', gda: '$842,000', gdaDelta: '+$842K new', triple: 76, verified: 358, genesis: true },
  { rank: '06', delta: 'NEW', deltaType: 'new', inst: 'Cornell · Cornell Tech', sub: 'Genesis · since 2026 Q2', corridor: 'NYC-Finance', corridorNote: 'Tech-Finance', gda: '$724,000', gdaDelta: '+$724K new', triple: 81, verified: 298, genesis: true },
  { rank: '07', delta: '▲ 1', deltaType: 'up', inst: 'Texas A&M University', sub: 'Genesis qualified · Q2', corridor: 'Houston-Energy', corridorNote: 'Statewide', gda: '$612,000', gdaDelta: '+$420K vs Q1', triple: 64, verified: 284, genesis: true },
  { rank: '08', delta: '▲ 3', deltaType: 'up', inst: 'MIT', sub: 'In qualification · Phase 2', corridor: 'Boston-Healthcare', corridorNote: 'Phase 2', gda: '$498,000', gdaDelta: 'pre-Genesis', triple: 83, verified: 214, genesis: false },
  { rank: '09', delta: '▲ 2', deltaType: 'up', inst: 'Stanford University', sub: 'In qualification · Phase 2', corridor: 'SF-Compute', corridorNote: 'Phase 2', gda: '$424,000', gdaDelta: 'pre-Genesis', triple: 80, verified: 186, genesis: false },
  { rank: '10', delta: '▼ 2', deltaType: 'down', inst: 'Carnegie Mellon University', sub: 'In qualification', corridor: 'Pittsburgh-Robotics', corridorNote: 'Phase 2', gda: '$386,000', gdaDelta: 'pre-Genesis', triple: 77, verified: 172, genesis: false },
  { rank: '11', delta: 'NEW', deltaType: 'new', inst: 'Harvard University', sub: 'In qualification', corridor: 'Boston-Healthcare', corridorNote: 'Phase 2', gda: '$348,000', gdaDelta: 'pre-Genesis', triple: 75, verified: 158, genesis: false },
  { rank: '12', delta: '▲ 5', deltaType: 'up', inst: 'Princeton University', sub: 'In qualification', corridor: 'NYC-Finance', corridorNote: 'Phase 1.5', gda: '$324,000', gdaDelta: 'pre-Genesis', triple: 78, verified: 142, genesis: false },
  { rank: '13', delta: '—', deltaType: 'flat', inst: 'UC Berkeley', sub: 'In qualification · Phase 2', corridor: 'SF-Compute', corridorNote: 'Phase 2', gda: '$298,000', gdaDelta: 'pre-Genesis', triple: 73, verified: 128, genesis: false },
  { rank: '14', delta: 'NEW', deltaType: 'new', inst: 'Georgia Institute of Technology', sub: 'In qualification', corridor: 'Atlanta-Compute', corridorNote: 'Phase 2', gda: '$272,000', gdaDelta: 'pre-Genesis', triple: 69, verified: 114, genesis: false },
  { rank: '15', delta: '▲ 8', deltaType: 'up', inst: 'Northwestern University', sub: 'In qualification', corridor: 'Chicago-Finance', corridorNote: 'Phase 2', gda: '$246,000', gdaDelta: 'pre-Genesis', triple: 72, verified: 98, genesis: false },
  { rank: '16', delta: '▲ 1', deltaType: 'up', inst: 'University of Pennsylvania', sub: 'In qualification', corridor: 'NYC-Finance', corridorNote: 'Phase 2', gda: '$224,000', gdaDelta: 'pre-Genesis', triple: 74, verified: 88, genesis: false },
  { rank: '17', delta: '▼ 3', deltaType: 'down', inst: 'Duke University', sub: 'In qualification', corridor: 'NC-Compute', corridorNote: 'Phase 2', gda: '$202,000', gdaDelta: 'pre-Genesis', triple: 67, verified: 82, genesis: false },
  { rank: '18', delta: 'NEW', deltaType: 'new', inst: 'Johns Hopkins University', sub: 'In qualification', corridor: 'DC-Defense', corridorNote: 'Phase 2', gda: '$184,000', gdaDelta: 'pre-Genesis', triple: 71, verified: 76, genesis: false },
  { rank: '19', delta: '▲ 2', deltaType: 'up', inst: 'Georgetown University', sub: 'In qualification', corridor: 'DC-Defense', corridorNote: 'Phase 2', gda: '$162,000', gdaDelta: 'pre-Genesis', triple: 69, verified: 68, genesis: false },
  { rank: '20', delta: '—', deltaType: 'flat', inst: 'University of Michigan', sub: 'In qualification', corridor: 'Detroit-Mobility', corridorNote: 'Phase 2', gda: '$148,000', gdaDelta: 'pre-Genesis', triple: 66, verified: 62, genesis: false },
];

const CORRIDORS = [
  { name: 'Houston-Energy', sub: 'Phase 1 anchor', leader: 'University of Houston', share: '39.2%', shareNum: 39, count: '4 Genesis institutions', totalGda: '$4.7M corridor GDA', key: 'houston-energy' as CorridorKey },
  { name: 'NYC-Finance', sub: 'Phase 1 co-anchor', leader: 'Columbia University', share: '37.8%', shareNum: 38, count: '3 Genesis institutions', totalGda: '$2.6M corridor GDA', key: 'nyc-finance' as CorridorKey },
  { name: 'Boston-Healthcare', sub: 'Phase 2 pipeline', leader: 'MIT (pre-Gen)', share: '58.7%', shareNum: 59, count: '0 Genesis · 4 qualifying', totalGda: '$0.85M pre-GDA', key: 'boston-healthcare' as CorridorKey },
  { name: 'DC-Defense', sub: 'Phase 2 pipeline', leader: 'Johns Hopkins (pre-Gen)', share: '53.2%', shareNum: 53, count: '0 Genesis · 2 qualifying', totalGda: '$0.35M pre-GDA', key: 'dc-defense' as CorridorKey },
];

const METHODOLOGY_ROWS = [
  { num: '01', title: 'Quarterly GDA settled', body: '40% of every transaction value originating from an alumna of the institution, settled on-chain to the institution\'s GDA wallet during the quarter.', weight: '45%' },
  { num: '02', title: 'Triple-85 verification rate', body: 'Percentage of the institution\'s verified candidates who achieved AICI ≥ 85, AIOI ≥ 85, and AIBS ≥ 85 — the bondable threshold.', weight: '25%' },
  { num: '03', title: 'Corridor share', body: 'Institution\'s share of total GDA settled within its primary corridor (Houston-Energy, NYC-Finance, Boston-Healthcare, DC-Defense, others).', weight: '20%' },
  { num: '04', title: 'Verified candidate volume', body: 'Absolute count of candidates affiliated with the institution who have cleared at least one Hard-Gate during the quarter.', weight: '10%' },
];

const NOTABLE_MOVES = [
  { tag: 'New entrant · Top 10', tagColor: 'primary', inst: 'Columbia · NYC-Finance anchor', sub: 'Genesis Q2 2026 · #04 debut', body: "Columbia's NYC-Finance Genesis MOU closed at the start of Q2, with the first cohort cleared through 412 Hard-Gates. 79% Triple-85 rate is third-highest in the league — driven by strength in AI risk and compliance roles.", stat: 'GDA · Q2', statVal: '$988K' },
  { tag: '▲ 4 positions', tagColor: 'mentor', inst: 'Rice University · Houston co-anchor', sub: 'Houston-Energy Genesis · #02', body: 'Rice closed its Genesis MOU as Houston\'s energy-AI co-anchor alongside UH in early Q2. 71% Triple-85 rate and 624 verified candidates produced the league\'s largest single-quarter GDA acceleration outside of UH itself.', stat: 'Δ Q1 → Q2', statVal: '+$1.42M' },
  { tag: 'Watch · Pre-Genesis', tagColor: 'tertiary', inst: 'MIT · Phase 2 Boston anchor', sub: 'Boston-Healthcare · #08', body: 'MIT is the highest-ranked institution still in qualification. 83% Triple-85 rate is the platform\'s highest — suggesting the institution is producing platform-grade candidates faster than any Genesis institution. MOU conversations advancing toward Q3 close.', stat: 'Triple-85 rate', statVal: '83% (#1)' },
];

const FILTER_PILLS: { label: string; key: CorridorKey }[] = [
  { label: 'All corridors', key: 'all' },
  { label: 'Houston-Energy', key: 'houston-energy' },
  { label: 'NYC-Finance', key: 'nyc-finance' },
  { label: 'Boston-Healthcare', key: 'boston-healthcare' },
  { label: 'DC-Defense', key: 'dc-defense' },
  { label: 'Genesis only', key: 'genesis' },
];

const corridorFilter: Record<CorridorKey, (r: typeof LEAGUE_ROWS[0]) => boolean> = {
  'all': () => true,
  'houston-energy': r => r.corridor.toLowerCase().includes('houston'),
  'nyc-finance': r => r.corridor.toLowerCase().includes('nyc'),
  'boston-healthcare': r => r.corridor.toLowerCase().includes('boston'),
  'dc-defense': r => r.corridor.toLowerCase().includes('dc'),
  'genesis': r => r.genesis,
};

// ─── Component ──────────────────────────────────────────────────────────────
export default function Universities() {
  const [activeFilter, setActiveFilter] = useState<CorridorKey>('all');

  const filteredRows = LEAGUE_ROWS.filter(corridorFilter[activeFilter]);

  const deltaStyle = (type: string) => {
    if (type === 'up') return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    if (type === 'down') return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    if (type === 'new') return 'bg-primary/12 text-primary';
    return 'bg-surface-container text-on-surface-variant';
  };

  return (
    <div className="pt-20 min-h-screen bg-background text-on-surface">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              L-200 League · Quarterly Genesis Institution Ranking · Q2 2026
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[5rem] font-light tracking-[-0.035em] leading-[1.01] mb-6 max-w-[20ch]">
            The{' '}
            <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">L-200.</span>{' '}
            <em className="text-on-surface-variant italic font-light">The institutions that own the verification layer.</em>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-[60ch] mb-10">
            The L-200 ranks every Genesis Institution by GDA dollars settled, Triple-85 verification rate, and corridor dominance. Published quarterly. Smart-contract auditable. The labor market's first credentialed institutional league table — and the one that routes 40% of every alumna transaction to the institutions that lead it.
          </p>

          {/* Hero stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HERO_STATS.map(s => (
              <div key={s.label} className="bg-surface-container-lowest rounded-2xl p-5 shadow-lg">
                <p className="font-mono text-[10px] tracking-[.14em] uppercase text-on-surface-variant font-semibold mb-2">{s.label}</p>
                <p className="font-display font-medium text-3xl leading-none tracking-[-0.02em] bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent mb-2">{s.value}</p>
                <p className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{s.delta}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── DATELINE BAR ─────────────────────────────────────────────────── */}
      <div className="bg-inverse-surface text-inverse-on-surface border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-3 flex-wrap">
          <div className="flex gap-5 items-center flex-wrap font-mono text-[11px] tracking-[.12em]">
            <span className="text-primary-container font-bold">L-200 / Q2 2026</span>
            <span className="text-inverse-on-surface/70">Published 2026-06-30 · Houston, TX</span>
            <span className="text-inverse-on-surface/70">Next publication · 2026-09-30</span>
          </div>
          <div className="flex gap-3 font-mono text-[10px]">
            <a href="mailto:institutions@tenured.ai?subject=L-200%20PDF%20Request" className="px-4 py-2 rounded-full border border-white/15 text-inverse-on-surface/80 hover:bg-white/8 transition-colors">Download PDF</a>
            <a href="mailto:institutions@tenured.ai?subject=L-200%20Data%20Request" className="px-4 py-2 rounded-full border border-white/15 text-inverse-on-surface/80 hover:bg-white/8 transition-colors">CSV · Schedule</a>
          </div>
        </div>
      </div>

      {/* ── 40% DIVIDEND PROPOSITION ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-stretch">

          {/* The "vault" card — dark inverse surface */}
          <div className="bg-inverse-surface text-inverse-on-surface rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.15),transparent_70%)] pointer-events-none" />
            <div className="relative">
              <p className="font-mono text-[9px] tracking-[.18em] uppercase text-amber-400 font-bold mb-3">Your institution's dividend share</p>
              <div
                className="font-display font-bold text-8xl leading-none mb-3"
                style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                40%
              </div>
              <p className="font-mono text-[12px] text-inverse-on-surface/80 leading-[1.65] mb-6">
                Of every verified hire's premium routes to your institution — perpetually, atomically, for the length of your alumna's career. Modeled: <strong className="text-primary-container">$8.4M / year</strong> at mature graduate-program participation. The platform turns each successful graduate into a recurring revenue line.
              </p>
              {/* Share stack bar */}
              <div className="mt-4 pt-4 border-t border-white/15">
                <div className="flex h-7 rounded-lg overflow-hidden text-[9px] font-bold font-mono">
                  <div className="flex items-center justify-center" style={{ width: '40%', background: '#C5A059', color: '#3D2914' }}>40% UNIVERSITY</div>
                  <div className="flex items-center justify-center" style={{ width: '40%', background: '#B8862E', color: '#fff' }}>40% PLATFORM</div>
                  <div className="flex items-center justify-center" style={{ width: '20%', background: '#2C4771', color: '#fff' }}>20% STATE</div>
                </div>
                <p className="font-mono text-[10px] text-inverse-on-surface/50 mt-2 tracking-wider">40/40/20 settlement · smart-contract enforced · no admin keys</p>
              </div>
            </div>
          </div>

          {/* Three value props */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { num: '01 · REVENUE', title: '40% perpetual dividend', body: 'Atomic, cryptographic settlement on every transaction. Unrestricted use by your board. The largest equity stake in your graduate\'s career.' },
              { num: '02 · RANK', title: 'L-200 League Table', body: 'Rank by real dollars (GDA) and corridor dominance, not editorial prestige. The L-200 anchors the financial-era successor to U.S. News.' },
              { num: '03 · CURRICULUM', title: 'No course changes', body: 'Verification layer over what you teach. Forge drills, Refresh Labs, senior Hard-Gates map to existing programs. FERPA-compliant by design.' },
            ].map(p => (
              <div key={p.num} className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
                <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-2">{p.num}</p>
                <h3 className="font-headline font-bold text-base mb-2">{p.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GDA REVENUE MATH ─────────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">GDA Revenue Math · 40% Institutional Share</p>
          <h2 className="font-headline text-3xl font-bold mb-2">The math compounds. So does your position.</h2>
          <p className="text-on-surface-variant text-sm mb-8 max-w-2xl">
            Modeled at $11,250 average annual premium per bonded hire. Excludes reveal-credit transactions (+28%) and B-300 Recruiter Battle premiums.
          </p>
          <div className="bg-surface-container-lowest rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                  <th className="text-left font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-6 py-4">Phase</th>
                  <th className="text-left font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-6 py-4">Active alumni</th>
                  <th className="text-right font-mono text-[10px] uppercase tracking-widest text-primary px-6 py-4">GDA to institution</th>
                </tr>
              </thead>
              <tbody>
                {REVENUE_ROWS.map((r, i) => (
                  <tr key={i} className="border-b border-outline-variant/10 last:border-none hover:bg-surface-container-low/60 transition-colors">
                    <td className="px-6 py-4 text-on-surface">{r.phase}</td>
                    <td className="px-6 py-4 text-on-surface-variant font-mono text-[12px]">{r.active}</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-primary text-base">{r.gda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-mono text-[10px] text-on-surface-variant/60 mt-3 tracking-wider text-center">
            One MOU · One Genesis cohort · 18 months to first GDA check
          </p>
        </div>
      </section>

      {/* ── FILTER BAND ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">L-200 League · Q2 2026 · Top 20 of 200</p>
        <h2 className="font-headline text-3xl font-bold mb-6">
          The institutions <em className="font-normal text-on-surface-variant italic">that own their corridors.</em>
        </h2>
        <div className="flex gap-3 flex-wrap mb-6 items-center">
          <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-semibold">Filter</span>
          {FILTER_PILLS.map(pill => (
            <button
              key={pill.key}
              onClick={() => setActiveFilter(pill.key)}
              className={[
                'px-4 py-2 rounded-full font-mono text-[11px] font-semibold tracking-wider border transition-all cursor-pointer',
                activeFilter === pill.key
                  ? 'bg-gradient-to-br from-primary to-primary-container text-white border-transparent shadow-md'
                  : 'bg-surface-container-low text-on-surface border-transparent hover:bg-surface-container',
              ].join(' ')}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── LEAGUE TABLE ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                <th className="text-left font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-5 py-4 w-16">Rank</th>
                <th className="text-center font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-5 py-4 w-16">Δ Q1</th>
                <th className="text-left font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-5 py-4">Institution</th>
                <th className="text-left font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-5 py-4">Corridor</th>
                <th className="text-right font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-5 py-4">GDA (Q2)</th>
                <th className="text-center font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-5 py-4">Triple-85 rate</th>
                <th className="text-right font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-5 py-4">Verified</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, i) => (
                <tr
                  key={row.rank}
                  className={[
                    'border-b border-outline-variant/10 last:border-none hover:bg-surface-container-low/60 transition-colors',
                    i === 0 && activeFilter === 'all' ? 'bg-gradient-to-r from-primary/5 to-transparent' : '',
                  ].join(' ')}
                >
                  <td className="px-5 py-4">
                    <span
                      className="font-display font-medium text-2xl leading-none tracking-tight"
                      style={i === 0 && activeFilter === 'all' ? { background: 'linear-gradient(135deg,#775A19,#C5A059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : { color: 'var(--on-surface)' }}
                    >
                      {row.rank}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-full inline-block ${deltaStyle(row.deltaType)}`}>{row.delta}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-2">
                      {row.genesis && <span className="w-0.5 h-8 rounded-full bg-primary-container mt-0.5 shrink-0" />}
                      <div>
                        <p className="font-display font-medium text-base tracking-[-0.018em]">{row.inst}</p>
                        <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">{row.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-mono text-[12px] font-semibold">{row.corridor}</p>
                    <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">{row.corridorNote}</p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <p className="font-mono font-bold text-sm">{row.gda}</p>
                    <p className="font-mono text-[10px] text-on-surface-variant">{row.gdaDelta}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 h-1 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${row.triple}%`, background: 'linear-gradient(135deg,#775A19,#C5A059)' }} />
                      </div>
                      <span className="font-mono text-[11px] font-bold">{row.triple}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <p className="font-mono font-bold text-sm">{row.verified.toLocaleString()}</p>
                    <p className="font-mono text-[10px] text-on-surface-variant">candidates</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center font-mono text-[11px] text-on-surface-variant mt-5">
          Ranks 21–200 published in the full quarterly schedule ·{' '}
          <a href="mailto:institutions@tenured.ai?subject=L-200%20Full%20Schedule" className="text-primary font-bold hover:underline">
            Request full data →
          </a>
        </p>
      </section>

      {/* ── NOTABLE MOVES ────────────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ Q2 2026 · Notable movement</p>
          <h2 className="font-headline text-3xl font-bold mb-8">
            The institutions that{' '}
            <em className="italic text-on-surface-variant font-normal">shifted</em>{' '}
            <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent">the league.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {NOTABLE_MOVES.map(m => (
              <div key={m.inst} className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
                <span className={[
                  'font-mono text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-full inline-block mb-4',
                  m.tagColor === 'primary' ? 'bg-primary/12 text-primary' : m.tagColor === 'mentor' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
                ].join(' ')}>
                  {m.tag}
                </span>
                <h4 className="font-display font-medium text-xl leading-tight mb-1">{m.inst}</h4>
                <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">{m.sub}</p>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-5">{m.body}</p>
                <div className="flex justify-between items-baseline pt-4 border-t border-outline-variant/15 font-mono text-[11px]">
                  <span className="text-on-surface-variant uppercase tracking-wider">{m.stat}</span>
                  <strong className="text-primary text-sm">{m.statVal}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORRIDOR BREAKDOWN ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ Corridor Dominance · Q2 2026</p>
        <h2 className="font-headline text-3xl font-bold mb-4">
          The four corridors.{' '}
          <em className="font-normal text-on-surface-variant italic">The institutions </em>
          <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic">that own them.</span>
        </h2>
        <p className="text-on-surface-variant text-sm max-w-2xl mb-10 leading-relaxed">
          Corridor dominance is the second axis of the L-200. A Genesis Institution that dominates its corridor is producing structurally more graduates the labor market wants — and earning a structurally higher dividend.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CORRIDORS.map(c => (
            <div key={c.name} className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
              <h3 className="font-headline font-bold text-sm mb-1">{c.name}</h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">{c.sub}</p>
              <p className="font-display font-medium text-lg tracking-tight mb-1">{c.leader}</p>
              <p className="font-mono text-[11px] text-on-surface-variant mb-4">{c.share} of corridor GDA</p>
              <div className="h-1.5 bg-surface-container rounded-full overflow-hidden mb-3">
                <div className="h-full rounded-full" style={{ width: `${c.shareNum}%`, background: 'linear-gradient(135deg,#775A19,#C5A059)' }} />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-on-surface-variant">
                <span>{c.count}</span>
                <strong className="text-on-surface">{c.totalGda}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── METHODOLOGY ──────────────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-16" id="methodology">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 items-start">
            <div>
              <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ Methodology</p>
              <h2 className="font-display font-light text-4xl leading-tight tracking-tight mb-4">
                How the{' '}
                <em className="italic text-on-surface-variant">L-200 is </em>
                <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">ranked.</span>
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                The L-200 ranking is a four-factor composite. Each factor is verifiable against the on-chain settlement record — the rankings cannot be game-able through marketing or self-reporting. Smart-contract auditable; CSV schedule available.
              </p>
              <p className="font-mono text-[10px] text-on-surface-variant/60 tracking-wider">Published quarterly · 30 days after quarter close · Q2 2026 · Houston</p>
            </div>
            <div className="space-y-4">
              {METHODOLOGY_ROWS.map(m => (
                <div key={m.num} className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg grid grid-cols-[56px_1fr_auto] gap-5 items-center">
                  <span className="font-display font-light text-4xl tracking-tight bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent leading-none">{m.num}</span>
                  <div>
                    <h4 className="font-headline font-bold text-sm mb-1">{m.title}</h4>
                    <p className="text-[13px] text-on-surface-variant leading-relaxed">{m.body}</p>
                  </div>
                  <span className="font-mono text-sm font-bold text-primary">{m.weight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section className="bg-inverse-surface text-inverse-on-surface py-24 relative overflow-hidden">
        <div className="absolute -top-40 -right-20 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.18),transparent_65%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <p className="font-mono text-[11px] tracking-[.22em] uppercase text-primary-container font-bold mb-6">
            § Become a Genesis Institution · Series A · 2026
          </p>
          <h2 className="font-display font-light text-3xl md:text-5xl leading-[1.04] tracking-tight mb-6 max-w-[22ch]">
            Earn a{' '}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
              perpetual 40% dividend
            </span>{' '}
            on every transaction your graduates originate.{' '}
            <em className="text-primary-container opacity-85">For the length of their career.</em>
          </h2>
          <p className="text-inverse-on-surface/85 max-w-[54ch] text-base leading-relaxed mb-8">
            Genesis Institutions receive smart-contract-enforced revenue from every transaction settled by their alumna — bond premiums, recruiter battles, enterprise placements — through the 40/40/20 settlement protocol. No admin keys retained. No termination clause that impairs retroactively-earned dividends. The dividend is enforced by the math, not by the platform's quarterly goodwill.
          </p>
          <p className="font-headline font-semibold text-inverse-on-surface/90 max-w-[44ch] mb-8 text-base">
            One MOU. One Genesis cohort. 18 months to first GDA check. The decision is whether your institution sets the standard or follows it.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:institutions@tenured.ai?subject=Genesis%20Institution%20Inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-headline font-semibold shadow-xl hover:opacity-95 transition-all text-sm text-white"
              style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)', boxShadow: '0 8px 32px rgba(197,160,89,.32)' }}
            >
              Become a Genesis Institution →
            </a>
            <a
              href="mailto:institutions@tenured.ai?subject=L-200%20MOU%20Conversation"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-headline font-medium text-sm text-inverse-on-surface border border-white/20 hover:bg-white/8 transition-all"
            >
              Begin the MOU conversation
            </a>
          </div>
          <div className="mt-6 font-mono text-[10px] text-inverse-on-surface/50 tracking-wider">
            institutions@tenured.ai · Tenured AI · Houston, TX
          </div>
        </div>
      </section>

    </div>
  );
}
