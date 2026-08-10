import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckSquare, Shield, DollarSign, Users, BookOpen, Lock, TrendingUp, BarChart3, GraduationCap } from 'lucide-react';

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

const ONBOARDING_STAGES = [
  {
    num: '01', days: 'Days 0–14', title: 'Executive briefing & Letter of Intent',
    body: 'A ninety-minute session with the Provost\'s office, the Dean of the candidate college, and Institutional Research. We present the ontology, the Hard-Gate architecture, and the settlement math against your actual graduate placement data. The LOI is non-binding and commits only a technical review window.',
    artifacts: ['Letter of Intent', 'Candidate cohort shortlist', 'Placement-data baseline'],
    terminal: false,
  },
  {
    num: '02', days: 'Days 15–45', title: 'Legal & compliance review',
    body: 'General Counsel receives the full FERPA compliance dossier, GDPR data-processing addendum, k-anonymity spec, and settlement terms. Concurrently, your CIO receives the security architecture packet — SSO spec, key policy, and Zero-Knowledge Session Isolation model.',
    artifacts: ['Executed Genesis MOU', 'Data Processing Addendum', 'Security review sign-off'],
    terminal: false,
  },
  {
    num: '03', days: 'Days 30–60', title: 'Technical intake',
    body: 'Registrar and IT stand up SSO and the enrollment-verification endpoint. Scoped API keys issued. A sandbox tenancy provisioned for your team to test against synthetic records before a single real record is touched.',
    artifacts: ['SSO handshake verified', 'Scoped API key pair', 'Sandbox tenancy live'],
    terminal: false,
  },
  {
    num: '04', days: 'Days 45–90', title: 'Ontology mapping',
    body: 'The faculty steering committee maps existing course outcomes to the AICI ontology nodes. The only meaningful faculty commitment — roughly forty hours across three to five faculty. No syllabus is rewritten. No course is replaced.',
    artifacts: ['Institutional Ontology v1', 'Hard-Gate alignment map', 'Steering committee charter'],
    terminal: false,
  },
  {
    num: '05', days: 'Days 75–120', title: 'Cohort activation',
    body: 'Students authenticate through your own SSO, review an itemized consent surface, and mint their Sovereign Passport individually. Forge drills deploy at calendar points the steering committee selected. Career services receives the recruiter-routing console.',
    artifacts: ['Cohort roster locked', 'Passports minted', 'Forge drill schedule'],
    terminal: false,
  },
  {
    num: '06', days: 'Month 10–18', title: 'First Hard-Gate & first settlement',
    body: 'The cohort clears senior Adversarial Audit Gates. Consensus Certificates mint against the Merkle root. Recruiter reveals begin — and the first quarterly dividend settles to your designated office with the F-100 Dashboard live for your finance team.',
    artifacts: ['Consensus Certificates', 'First settlement receipt', 'F-100 Dashboard credential'],
    terminal: true,
  },
];

const OFFICE_RACI = [
  { office: 'Provost / Academic Affairs', owns: 'MOU execution · cohort designation · steering committee appointment', decision: 'Which college, which cohort, which chair', effort: 'Executive · 2 sessions' },
  { office: 'General Counsel', owns: 'FERPA review · DPA execution · settlement-terms review', decision: 'Approve or condition the data posture', effort: '~6 hrs' },
  { office: 'CIO / IT Security', owns: 'SSO integration · API key custody · security architecture review', decision: 'Identity protocol and allowlist scope', effort: '~12 hrs' },
  { office: 'Registrar', owns: 'Enrollment-verification endpoint · cohort roster attestation', decision: 'Field scope confirmation', effort: '~8 hrs' },
  { office: 'Faculty Steering Committee', owns: 'Ontology mapping · Hard-Gate alignment · drill calendar placement', decision: 'Which outcomes map to which nodes', effort: '~40 hrs total' },
  { office: 'Treasurer / Foundation', owns: 'Settlement recipient designation · F-100 Dashboard custody', decision: 'Which fund receives the dividend', effort: '~3 hrs' },
  { office: 'Career Services', owns: 'Recruiter-routing console · cleared-graduate pipeline', decision: 'Corridor and employer prioritization', effort: 'Ongoing · absorbed' },
];

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
    <div className="pt-0 min-h-screen bg-background text-on-surface">

      {/* ── ONBOARDING HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-inverse-surface text-inverse-on-surface">
        <div className="absolute -top-6 -right-20 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.14),transparent_65%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-20 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[11px] tracking-[.22em] uppercase text-amber-400 font-bold mb-5">
              One-Pager · University Onboarding Brief · Genesis Institution MOU
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-light tracking-[-0.035em] leading-[1.03] mb-6 max-w-[22ch]">
              Ninety days from signature to{' '}
              <span
                className="italic font-medium"
                style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                live cohort.
              </span>
            </h1>
            <p className="text-inverse-on-surface/80 text-lg leading-relaxed max-w-[60ch] mb-12">
              Tenured AI is the verification infrastructure that sits <strong className="text-inverse-on-surface">over</strong> what you already teach. Onboarding does not replace a course, rewrite a syllabus, or touch your degree requirements. It opens a read-scoped identity channel, translates your existing course outcomes to an ontology, and activates one senior cohort.
            </p>

            {/* Key stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Institutional Cost', value: '$0', sub: 'No license. No seat fee. No capital outlay.' },
                { label: 'MOU to Live', value: '90–120d', sub: 'Signature to first cohort activation.' },
                { label: 'Curriculum Change', value: 'None', sub: 'Existing courses map as-is.' },
                { label: 'Faculty Hours · Intake', value: '~40', sub: 'Total, across the mapping window.' },
              ].map(s => (
                <div key={s.label} className="bg-white/6 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                  <p className="font-mono text-[9px] tracking-[.18em] uppercase text-amber-400 font-bold mb-2">{s.label}</p>
                  <p
                    className="font-display font-medium text-3xl leading-none tracking-[-0.02em] mb-2"
                    style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {s.value}
                  </p>
                  <p className="font-mono text-[10px] text-inverse-on-surface/55 leading-snug">{s.sub}</p>
                </div>
              ))}
            </div>

            <p className="text-inverse-on-surface/70 text-sm font-mono tracking-wider">
              PREPARED FOR · PROVOST · REGISTRAR · CIO · GENERAL COUNSEL · 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THE INSTRUMENT — MOU OBLIGATIONS ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ The Instrument · A2</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">It is a revenue agreement,<em className="font-normal text-on-surface-variant italic"> not a purchase order.</em></h2>
          <p className="text-on-surface-variant text-base leading-relaxed max-w-[66ch] mb-12">
            The Genesis Institution MOU is a perpetual, ledger-anchored revenue agreement. Your institution is a <strong className="text-on-surface">counterparty receiving settlement</strong>, not a customer paying a vendor — removing procurement, competitive bid, and capital-approval friction from the entire onboarding path.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Institution commits */}
            <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-lg border border-outline-variant/10">
              <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                The Institution Commits to Four Things
              </p>
              <ul className="space-y-4">
                {[
                  { title: 'Name one Genesis cohort.', body: 'One senior cohort in your strongest program — 80–150 students is the recommended pilot band.' },
                  { title: 'Seat a faculty steering committee.', body: 'Three to five faculty, chaired by a department head, to govern ontology mapping and Hard-Gate alignment.' },
                  { title: 'Open a read-scoped SIS/SSO channel.', body: 'SAML 2.0 or OIDC, plus an enrollment-verification endpoint. Registrar and IT, roughly 20 engineering hours.' },
                  { title: 'Designate a settlement recipient.', body: 'One office of record — Treasurer, Foundation, or Provost\'s discretionary fund — to receive quarterly dividend settlement.' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-on-surface-variant leading-relaxed"><strong className="text-on-surface">{item.title}</strong> {item.body}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tenured AI commits */}
            <div className="bg-inverse-surface text-inverse-on-surface rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-12 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.15),transparent_70%)] pointer-events-none" />
              <p className="font-mono text-[10px] tracking-widest uppercase text-amber-400 font-bold mb-5 relative">
                Tenured AI Commits to Four Things
              </p>
              <ul className="space-y-4 relative">
                {[
                  { title: 'Both settlements.', body: '40% of the per-semester Access Fee (50% if private), and 40% of every transaction originating from your alumni in perpetuity — two separate instruments, both ledger-enforced at the smart-contract layer. Detailed at §A7.' },
                  { title: 'Zero platform cost', body: 'to the institution — infrastructure, Forge drills, Proving Ground sandboxes, credential issuance, and settlement rails at our expense.' },
                  { title: 'F-100 Dividend Dashboard', body: 'provisioned to your finance office at settlement go-live, with departmental yield attribution and forensic inflow audit.' },
                  { title: 'Full FERPA / GDPR documentation', body: 'delivered to your General Counsel before technical intake begins, not after.' },
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
          </div>

          <p className="text-sm text-on-surface-variant mt-6 italic max-w-[82ch]">
            What is <em>not</em> in the MOU: no exclusivity on your students, no restriction on your other partnerships, no curriculum control, no enrollment mandate, no minimum-volume guarantee, and no obligation to continue past the pilot cohort.
          </p>
        </motion.div>
      </section>

      {/* ── ONBOARDING SEQUENCE ──────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ The Sequence · A3</p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
              Six stages.{' '}
              <em className="font-normal text-on-surface-variant italic">One hundred twenty days.</em>
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-[64ch] mb-10">
              Each stage terminates in a named artifact. No stage begins until the prior artifact is countersigned — the archival sequence your General Counsel will want to see before your Provost signs anything.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {ONBOARDING_STAGES.map((stage, idx) => (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={[
                  'grid grid-cols-1 md:grid-cols-[120px_1fr_200px] gap-6 rounded-2xl p-6 md:p-7',
                  stage.terminal
                    ? 'bg-inverse-surface text-inverse-on-surface'
                    : 'bg-surface-container-lowest shadow-lg border border-outline-variant/10',
                ].join(' ')}
              >
                {/* Stage number + days */}
                <div>
                  <p className={`font-mono text-[10px] tracking-[.16em] uppercase font-bold ${stage.terminal ? 'text-primary-container' : 'text-primary'}`}>Stage</p>
                  <p
                    className="font-display font-medium text-4xl leading-none tracking-tight mb-1"
                    style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {stage.num}
                  </p>
                  <p className={`font-mono text-[10px] tracking-wider uppercase ${stage.terminal ? 'text-inverse-on-surface/60' : 'text-on-surface-variant'}`}>{stage.days}</p>
                </div>

                {/* Description */}
                <div>
                  <h4 className={`font-headline font-bold text-base mb-2 ${stage.terminal ? 'text-primary-container' : ''}`}>{stage.title}</h4>
                  <p className={`text-sm leading-relaxed ${stage.terminal ? 'text-inverse-on-surface/80' : 'text-on-surface-variant'}`}>{stage.body}</p>
                </div>

                {/* Artifacts */}
                <div>
                  <p className={`font-mono text-[9px] tracking-[.12em] uppercase font-bold mb-2 ${stage.terminal ? 'text-amber-400' : 'text-primary'}`}>ARTIFACT →</p>
                  {stage.artifacts.map(a => (
                    <p key={a} className={`font-mono text-[10px] leading-loose ${stage.terminal ? 'text-inverse-on-surface/70' : 'text-on-surface-variant'}`}>{a}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNICAL INTAKE SPEC ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ Technical Intake · A4</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
            Twenty engineering hours. <em className="font-normal italic text-on-surface-variant">Read-scoped. Nothing writes back to your SIS.</em>
          </h2>
          <p className="text-on-surface-variant text-base leading-relaxed max-w-[62ch] mb-10">
            The specification your CIO will ask for. SAML 2.0 or OIDC, an enrollment-verification endpoint, and a sandbox tenancy — provisioned before a single real record is touched.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
            {/* Terminal / spec block */}
            <div className="bg-[#16140F] text-[#F3F0EC] rounded-2xl p-7 font-mono text-sm leading-loose relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,#FFF 0 1px,transparent 1px 3px)' }} />
              <p className="text-amber-400 text-[10px] tracking-[.14em] mb-4 uppercase font-bold">TENURED AI · INSTITUTION INTAKE SPECIFICATION · REV 2.4</p>
              <p className="text-[#C5A059] text-xs mb-1">[ IDENTITY ]</p>
              <p><span className="opacity-50 mr-2">protocol</span><span className="text-emerald-400">SAML 2.0</span> (encrypted assertions)</p>
              <p><span className="opacity-50 mr-2">alternate</span><span className="text-emerald-400">OpenID Connect 1.0</span></p>
              <p><span className="opacity-50 mr-2">mfa</span>inherited from institution IdP</p>
              <p><span className="opacity-50 mr-2">passwords</span><span className="text-sky-400">never seen · never issued</span></p>
              <br />
              <p className="text-[#C5A059] text-xs mb-1">[ ENROLLMENT VERIFICATION · READ ONLY ]</p>
              <p><span className="opacity-50 mr-2">student_id</span><span className="text-sky-400">hashed at edge · never stored raw</span></p>
              <p><span className="opacity-50 mr-2">enrollment</span>active | inactive | graduated</p>
              <p><span className="opacity-50 mr-2">program</span>degree program identifier</p>
              <p><span className="opacity-50 mr-2">standing</span>academic standing flag</p>
              <p><span className="opacity-50 mr-2">cohort_year</span>expected graduation term</p>
              <p className="opacity-40 text-xs">── the above is the complete field set ──</p>
              <br />
              <p className="text-[#C5A059] text-xs mb-1">[ NOT REQUESTED · NOT ACCEPTED ]</p>
              <p><span className="text-red-400 mr-2">✕</span>transcripts · course grades · GPA</p>
              <p><span className="text-red-400 mr-2">✕</span>disciplinary records · health records</p>
              <p><span className="text-red-400 mr-2">✕</span>financial aid · bursar · residency data</p>
              <p><span className="text-red-400 mr-2">✕</span>demographic attributes of any kind</p>
              <br />
              <p className="text-[#C5A059] text-xs mb-1">[ WRITE PATH ]</p>
              <p className="text-amber-400">NONE. The platform holds no write credential</p>
              <p className="text-amber-400">against any institutional system of record. Ever.</p>
              <br />
              <p className="text-emerald-400">STATUS: sandbox tenancy available on LOI execution</p>
            </div>

            {/* Compliance cards */}
            <div className="flex flex-col gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
                <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-3">Compliance Posture</p>
                <h3 className="font-headline font-bold text-base mb-3">FERPA by architecture, not by policy</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  The platform never receives an educational record as FERPA defines it. It receives an enrollment attestation and a consent token. Assessment outcomes belong to your faculty; performance telemetry belongs to the platform. <strong className="text-on-surface">Neither party can see the other's domain.</strong>
                </p>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
                <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-3">Sandbox Isolation</p>
                <h3 className="font-headline font-bold text-base mb-3">The Proving Ground never touches your network</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Student execution environments run in Zero-Knowledge Session Isolation on platform infrastructure. No agent, container, or process originating in a Forge drill has any route to institutional systems.
                </p>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
                <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-3">Effort Estimate · Institutional Side</p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  {[
                    ['IT / Identity:', '~12 hrs · SSO handshake and testing'],
                    ['Registrar:', '~8 hrs · enrollment endpoint scoping'],
                    ['General Counsel:', '~6 hrs · DPA and FERPA review'],
                    ['Faculty steering:', '~40 hrs · ontology mapping (Stage 04)'],
                    ['Finance:', '~3 hrs · settlement recipient designation'],
                  ].map(([who, task]) => (
                    <li key={who} className="flex gap-2"><strong className="text-on-surface shrink-0">{who}</strong><span>{task}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── STUDENT CONSENT / ENROLLMENT PATH ───────────────────────────── */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ Student Enrollment · A5</p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
              Five steps. <em className="font-normal italic text-on-surface-variant">Individually opted in. The student owns the asset.</em>
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-[64ch] mb-10">
              No student is enrolled by the institution. Every student opts in personally, through your own identity provider. A student who declines remains fully enrolled in their degree program with no academic consequence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { step: '01', title: 'Institutional SSO', body: "The student clicks an invitation and lands on your own login page. They authenticate with the credentials they already have. Tenured AI never sees a password, never issues one, and never becomes an alternate identity provider.", variant: 'soft' },
              { step: '02', title: 'The consent surface', body: "A single itemized screen: what is verified, what is published, what stays private, what the institution can see, what a recruiter can see, and what happens on withdrawal. Default state on every optional field is off.", variant: 'soft' },
              { step: '03', title: 'Passport mint', body: "The Sovereign Passport is issued to the student — not to the institution, not to the platform. It carries a k-anonymous public surface showing verified competency bands with zero personal identifiers until the student authorizes a reveal.", variant: 'soft' },
              { step: '04', title: 'Forge drills in-calendar', body: "Drills run inside the academic year at points the faculty steering committee chose. Telemetry accrues to the Passport. The student watches their AICI, AIOI and AIBS trajectories build across the term.", variant: 'blue' },
              { step: '05', title: 'Hard-Gate & certificate', body: "Senior-year Adversarial Audit Gate clears. A Consensus Certificate mints against the Merkle root and anchors on-chain. The credential is independently verifiable without the platform's servers — and it survives the platform.", variant: 'blue' },
            ].map(s => (
              <div
                key={s.step}
                className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10"
              >
                <span className={`inline-block font-mono text-[11px] font-bold px-3 py-1 rounded-full mb-4 ${s.variant === 'blue' ? 'bg-primary/15 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                  STEP {s.step}
                </span>
                <h3 className="font-headline font-bold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
              </div>
            ))}

            {/* Student rights vault */}
            <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-8 w-36 h-36 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.15),transparent_70%)] pointer-events-none" />
              <p className="font-mono text-[9px] tracking-[.18em] uppercase text-amber-400 font-bold mb-4">Student Rights · Non-Negotiable</p>
              <ul className="space-y-2 text-sm">
                {[
                  ['Owns', 'the Passport outright'],
                  ['Controls', 'every reveal and redaction'],
                  ['Pays', 'nothing additional, at any point'],
                  ['Exits', 'with credentials intact via Merkle proof'],
                  ['Declines', 'with zero academic consequence'],
                ].map(([verb, rest]) => (
                  <li key={verb} className="text-inverse-on-surface/85">
                    <strong className="text-primary-container">{verb}</strong> {rest}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-inverse-on-surface/55 mt-4 italic leading-relaxed">
                The 40% institutional dividend is the platform's payment for verification infrastructure. It is never a charge against the student.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO DOES WHAT / RACI ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ Ownership Map · A6</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
            Five offices. <em className="font-normal italic text-on-surface-variant">Five decisions. No standing committee required.</em>
          </h2>
          <p className="text-on-surface-variant text-base leading-relaxed max-w-[60ch] mb-8">
            Notably absent: Procurement. Because no institutional funds are disbursed, standard vendor-procurement review does not attach.
          </p>
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                  <th className="text-left font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-5 py-4">Office</th>
                  <th className="text-left font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-5 py-4">Owns</th>
                  <th className="text-left font-mono text-[10px] uppercase tracking-widest text-on-surface-variant px-5 py-4">Decision required</th>
                  <th className="text-right font-mono text-[10px] uppercase tracking-widest text-primary px-5 py-4">Effort</th>
                </tr>
              </thead>
              <tbody>
                {OFFICE_RACI.map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/10 last:border-none hover:bg-surface-container-low/60 transition-colors">
                    <td className="px-5 py-4 font-semibold">{row.office}</td>
                    <td className="px-5 py-4 text-on-surface-variant">{row.owns}</td>
                    <td className="px-5 py-4 text-on-surface-variant">{row.decision}</td>
                    <td className="px-5 py-4 text-right font-mono text-[11px] text-primary font-bold">{row.effort}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
      <div className="bg-inverse-surface text-inverse-on-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3 flex-wrap">
          <div className="flex gap-5 items-center flex-wrap font-mono text-[11px] tracking-[.12em]">
            <span className="text-primary-container font-bold">League / Q2 2026</span>
            <span className="text-inverse-on-surface/70">Published 2026-06-30 · Houston, TX</span>
            <span className="text-inverse-on-surface/70">Next publication · 2026-09-30</span>
          </div>
          <div className="flex gap-3 font-mono text-[10px]">
            <a href="mailto:institutions@tenured.ai?subject=League%20PDF%20Request" className="px-4 py-2 rounded-full border border-white/15 text-inverse-on-surface/80 hover:bg-white/8 transition-colors">Download PDF</a>
            <a href="mailto:institutions@tenured.ai?subject=League%20Data%20Request" className="px-4 py-2 rounded-full border border-white/15 text-inverse-on-surface/80 hover:bg-white/8 transition-colors">CSV · Schedule</a>
          </div>
        </div>
      </div>

      {/* ── League HERO ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="font-mono text-[10px] tracking-[.22em] uppercase text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              League League · Quarterly Genesis Institution Ranking · Q2 2026
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light tracking-[-0.035em] leading-[1.01] mb-6 max-w-[20ch]">
            The{' '}
            <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">League.</span>{' '}
            <em className="text-on-surface-variant italic font-light">The institutions that own the verification layer.</em>
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-[60ch] mb-10">
            The League ranks every Genesis Institution by GDA dollars settled, Triple-85 verification rate, and corridor dominance. Published quarterly. Smart-contract auditable. The labor market's first credentialed institutional league table — routing 40% of every alumna transaction to the institutions that lead it.
          </p>

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

      {/* ── THE ECONOMICS: TWO DIFFERENT 40/40/20S ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ The Economics · A7</p>
        <h2 className="font-headline text-3xl font-bold mb-3">Two Different 40/40/20s. <em className="font-normal text-on-surface-variant italic">Do not conflate them.</em></h2>
        <p className="text-on-surface-variant text-base max-w-3xl mb-8 leading-relaxed">
          Both settle 40/40/20, and they are routinely treated as one thing in briefing. They are not the same money and they do not settle on the same schedule. <strong>The Access Split divides a per-student enrollment fee. The Dividend Split divides a per-hire transaction.</strong> Your institution receives both, independently, on separate settlement schedules.
        </p>

        {/* The distinction in one line box */}
        <div className="bg-surface-container rounded-2xl p-6 mb-8 border border-outline-variant/10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold mb-2">The distinction in one line</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">The Access Split</strong> divides the <strong>$100 Sovereign Access Fee charged per enrolled student, per semester.</strong> Termly. Scales with headcount. Settles from the first term of the pilot cohort, whether or not a single graduate has yet been hired.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">The Dividend Split</strong> divides the <strong>transaction value a graduate generates after leaving.</strong> Perpetual. Scales with career outcomes. Begins at first Hard-Gate clearance and continues for the length of the alumna's career.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Settlement One: The Access Split */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-lg border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-container" />
            <span className="font-mono text-[9px] tracking-[.18em] uppercase text-primary font-bold block mb-4">SETTLEMENT ONE · THE ACCESS SPLIT</span>
            <h3 className="font-headline font-bold text-2xl mb-2">$100 per student · per semester</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              The Sovereign Access Fee is divided at the smart-contract layer at the moment of settlement. Scales with headcount.
            </p>

            <div className="mb-4">
              <p className="font-mono text-[9px] tracking-wider uppercase text-on-surface-variant mb-2">Public institutions · 40 / 40 / 20</p>
              <div className="flex h-10 rounded-lg overflow-hidden text-[9px] font-bold font-mono">
                <div className="flex items-center justify-center bg-primary/20 text-[#3D2914]" style={{ width: '40%' }}>40% UNIVERSITY ($40)</div>
                <div className="flex items-center justify-center bg-[#B8862E] text-white" style={{ width: '40%' }}>40% PLATFORM ($40)</div>
                <div className="flex items-center justify-center bg-[#2C4771] text-white" style={{ width: '20%' }}>20% STATE ($20)</div>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-mono text-[9px] tracking-wider uppercase text-on-surface-variant mb-2">Private institutions · 50 / 50</p>
              <div className="flex h-10 rounded-lg overflow-hidden text-[9px] font-bold font-mono">
                <div className="flex items-center justify-center bg-primary/20 text-[#3D2914]" style={{ width: '50%' }}>50% UNIVERSITY ($50)</div>
                <div className="flex items-center justify-center bg-[#B8862E] text-white" style={{ width: '50%' }}>50% PLATFORM ($50)</div>
              </div>
              <p className="font-mono text-[9px] text-on-surface-variant/70 mt-2">Private institutions receive the State Treasury share, because no state workforce levy attaches.</p>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4">
              <p className="font-mono text-[9px] tracking-wider uppercase text-on-surface-variant mb-2">Access Split · worked example by enrollment</p>
              <table className="w-full text-xs font-mono">
                <tbody>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Regional public · 12,000 students</td><td className="py-2 text-right text-primary font-bold">$960K / yr</td></tr>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Mid-size public · 40,000 students</td><td className="py-2 text-right text-primary font-bold">$3.2M / yr</td></tr>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Flagship public · 72,000 students</td><td className="py-2 text-right text-primary font-bold">$5.76M / yr</td></tr>
                  <tr><td className="py-2">Private research · 18,000 students</td><td className="py-2 text-right text-primary font-bold">$1.8M / yr</td></tr>
                </tbody>
              </table>
              <p className="text-[10px] text-on-surface-variant mt-2 italic">Two semesters per academic year. Unrestricted innovation funds.</p>
            </div>
          </div>

          {/* Card 2: Settlement Two: The Dividend Split */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-lg border border-outline-variant/10 relative overflow-hidden">
            <span className="font-mono text-[9px] tracking-[.18em] uppercase text-primary font-bold block mb-4">SETTLEMENT TWO · THE DIVIDEND SPLIT</span>
            <h3 className="font-headline font-bold text-2xl mb-2">40% of every alumna transaction</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              A separate instrument on a separate base — no student fee is involved. Every recruiter reveal, Performance Bond premium, and Hard-Gate transaction fee routes 40/40/20 in perpetuity.
            </p>

            <div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-5 mb-6">
              <p className="font-mono text-[9px] uppercase text-amber-400 font-bold mb-3">Settlement Properties</p>
              <ul className="space-y-1.5 text-xs">
                <li>· <strong className="text-primary-container">Atomic:</strong> Routes in real time. Never accrues, never escrows.</li>
                <li>· <strong className="text-primary-container">Cryptographically locked:</strong> Enforced at the contract layer.</li>
                <li>· <strong className="text-primary-container">Auditable:</strong> Every routed dollar carries a Merkle proof.</li>
                <li>· <strong className="text-primary-container">Perpetual:</strong> Attaches to the alumna. A 2027 graduate still settles in 2047.</li>
              </ul>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4">
              <p className="font-mono text-[9px] tracking-wider uppercase text-on-surface-variant mb-2">Dividend Split · worked example by placement</p>
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-outline-variant/10 text-[9px] text-on-surface-variant"><th className="text-left pb-1">Stage</th><th className="text-right pb-1">Hires</th><th className="text-right pb-1">Institution 40%</th></tr>
                </thead>
                <tbody>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Genesis cohort</td><td className="py-2 text-right">110</td><td className="py-2 text-right text-primary font-bold">$495K</td></tr>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Year 3 · 4 cohorts</td><td className="py-2 text-right">640</td><td className="py-2 text-right text-primary font-bold">$2.88M</td></tr>
                  <tr className="border-b border-outline-variant/10"><td className="py-2">Year 5 · full college</td><td className="py-2 text-right">1,900</td><td className="py-2 text-right text-primary font-bold">$8.55M</td></tr>
                  <tr><td className="py-2">Year 10 · compounding base</td><td className="py-2 text-right">6,400</td><td className="py-2 text-right text-primary font-bold">$28.8M</td></tr>
                </tbody>
              </table>
              <p className="text-[10px] text-on-surface-variant mt-2 italic">Modeled at $11,250 average annual premium per bonded hire. Excludes reveal credits (+22-34%).</p>
            </div>
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
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">League League · Q2 2026 · Top 20 of 200</p>
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
          <a href="mailto:institutions@tenured.ai?subject=League%20Full%20Schedule" className="text-primary font-bold hover:underline">
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
          Corridor dominance is the second axis of the League. A Genesis Institution that dominates its corridor is producing structurally more graduates the labor market wants — and earning a structurally higher dividend.
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
                <em className="italic text-on-surface-variant">League is </em>
                <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">ranked.</span>
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                The League ranking is a four-factor composite. Each factor is verifiable against the on-chain settlement record — the rankings cannot be game-able through marketing or self-reporting. Smart-contract auditable; CSV schedule available.
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

      {/* ── READINESS CHECKLIST ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">§ Readiness · A9 · Before the Executive Briefing</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-10">
            Six things to have in the room. <em className="font-normal italic text-on-surface-variant">Nothing else.</em>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-lg border border-outline-variant/10">
              <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-5">Institutional readiness checklist</p>
              <ul className="space-y-4">
                {[
                  ['Candidate college and cohort', 'your strongest program, senior year, 80–150 students'],
                  ['Three-year placement baseline', 'so we model settlement against your actual outcomes, not national averages'],
                  ['Identity provider details', 'SAML 2.0 or OIDC, and who owns it'],
                  ['Named settlement office', 'Treasurer, Foundation, or Provost discretionary'],
                  ['Faculty steering chair candidate', 'a department head with standing in the faculty senate'],
                  ['General Counsel availability', 'for the Stage 02 compliance window'],
                ].map(([title, body]) => (
                  <li key={title} className="flex gap-3 text-sm">
                    <span className="font-mono text-primary-container text-sm mt-0.5 shrink-0">▢</span>
                    <span className="text-on-surface-variant leading-relaxed"><strong className="text-on-surface">{title}</strong> — {body}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-lg border border-outline-variant/10">
              <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-5">What we bring to the same meeting</p>
              <ul className="space-y-4">
                {[
                  ['Settlement model', 'run against your placement baseline, not a generic deck'],
                  ['Full FERPA dossier', 'and the GDPR Data Processing Addendum, in final form'],
                  ['Security architecture packet', 'for your CIO — SSO spec, key policy, isolation model'],
                  ['Draft Genesis MOU', 'with the perpetual dividend terms, ready for redline'],
                  ['Sandbox tenancy credentials', 'so your team can test against synthetic records that week'],
                  ['League League Table position', 'projection for your institution at Year 3'],
                ].map(([title, body]) => (
                  <li key={title} className="flex gap-3 text-sm">
                    <span className="text-primary mt-0.5 shrink-0">·</span>
                    <span className="text-on-surface-variant leading-relaxed"><strong className="text-on-surface">{title}</strong> — {body}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-5 bg-surface-container-low rounded-xl border border-outline-variant/10">
                <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-2">The only irreversible decision</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  <strong className="text-on-surface">Sequence.</strong> The Genesis cohort is capped at three institutions in Phase 1. Perpetual dividend terms, founding steering-committee seats, and League origination status attach to the first three signatures — and to no one after.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section className="bg-inverse-surface text-inverse-on-surface py-24 relative overflow-hidden">
        <div className="absolute -top-40 -right-20 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.18),transparent_65%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <p className="font-mono text-[11px] tracking-[.22em] uppercase text-primary-container font-bold mb-6">
            § Become a Genesis Institution · One Briefing. One LOI. One Technical Review Window.
          </p>
          <h2 className="font-display font-light text-3xl md:text-5xl leading-[1.04] tracking-tight mb-6 max-w-[22ch]">
            Earn a gapless{' '}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
              perpetual 40% dividend
            </span>{' '}
            on every transaction your graduates originate.{' '}
            <em className="text-primary-container opacity-85">For the length of their career.</em>
          </h2>
          <p className="text-inverse-on-surface/85 max-w-[54ch] text-base leading-relaxed mb-4">
            Genesis Institutions receive smart-contract-enforced revenue from every transaction settled by their alumna — bond premiums, recruiter battles, enterprise placements — through the 40/40/20 settlement protocol. No admin keys retained. No termination clause that impairs retroactively-earned dividends.
          </p>
          <p className="font-headline font-semibold text-inverse-on-surface/90 max-w-[44ch] mb-8 text-base">
            We are not asking for budget, procurement, curriculum change, or a faculty senate vote. One ninety-minute briefing. The Genesis cohort is capped at three institutions — the decision is whether your institution sets the standard or follows it.
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
              href="mailto:institutions@tenured.ai?subject=League%20MOU%20Conversation"
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
