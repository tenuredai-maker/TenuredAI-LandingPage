import { motion } from 'motion/react';
import { Wallet, BarChart, Lock, CreditCard, History, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Rules() {
  const sections = [
    { id: "ledger", icon: Wallet, title: "The Sovereign Ledger", items: [
      { q: "What constitutes a 'Forensic Entry'?", a: "A Forensic Entry is any verifiable action indexed by the Tenured neural net. Unlike standard databases, every entry is cryptographically bound to your Grit Score and cannot be purged without a 40% performance penalty." },
      { q: "How is the Ledger audited?", a: "The Ledger is audited via a decentralized consensus protocol involving institutional nodes and the Tenured Agent's validation signature." }
    ]},
    { id: "indices", icon: BarChart, title: "The Three Indices", custom: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Velocity", val: "1.4x" },
            { label: "Precision", val: "0.99" },
            { label: "Entropy", val: "-0.04" }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-surface-container-high rounded-lg text-center">
              <div className="text-[10px] font-label font-bold uppercase tracking-widest text-outline">{item.label}</div>
              <div className="text-2xl font-headline font-bold text-primary">{item.val}</div>
            </div>
          ))}
        </div>
        <div className="bg-surface-container-lowest rounded-lg border-2 border-primary/10 overflow-hidden shadow-lg">
          <div className="p-6 bg-primary/5 flex items-center justify-between">
            <span className="font-headline font-bold text-xl text-primary">Calculation: Compound Index Score</span>
          </div>
          <div className="p-8 bg-surface-container-low font-mono text-sm space-y-4">
            <div className="flex items-center gap-4 text-on-surface">
              <span className="bg-primary text-white px-2 py-1 rounded">Score</span>
              <span>= (V * 0.4) + (P * 0.4) - (E * 0.2)</span>
            </div>
            <p className="text-xs text-on-surface-variant font-body italic">Where V is learner velocity, P is precision deviation, and E is neural entropy. Click variables to view live weightings.</p>
          </div>
        </div>
      </div>
    )},
    { id: "friction", icon: Lock, title: "Friction & Performance Bond", items: [
      { q: "Why do I need a Performance Bond?", a: "Tenured AI requires 'skin in the game.' Your performance bond is a stake of learning capital held in escrow. Failure to meet the 14-day Grit threshold results in a 'Friction Event', where 10% of the bond is redistributed to the high-performance pool." }
    ]},
    { id: "dividend", icon: CreditCard, title: "40/40/20 Dividend", custom: (
      <div className="p-8 bg-surface-container-lowest rounded-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-48 h-48 relative flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle className="stroke-surface-container-highest" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
              <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="40 100" strokeDashoffset="0" strokeWidth="3"></circle>
              <circle className="stroke-primary-container" cx="18" cy="18" fill="none" r="16" strokeDasharray="40 100" strokeDashoffset="-40" strokeWidth="3"></circle>
              <circle className="stroke-tertiary-container" cx="18" cy="18" fill="none" r="16" strokeDasharray="20 100" strokeDashoffset="-80" strokeWidth="3"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-xs font-label font-bold uppercase text-outline">Total</span>
              <span className="text-xl font-headline font-bold">100%</span>
            </div>
          </div>
          <div className="space-y-4 flex-grow">
            {[
              { label: "40% Re-Investment", desc: "Allocated to the Tenured Learning Core development.", color: "bg-primary" },
              { label: "40% Stakeholder Yield", desc: "Distributed among Top 10% of Grit Leaders.", color: "bg-primary-container" },
              { label: "20% Ecosystem Liquidity", desc: "Reserved for frictionless learner boarding.", color: "bg-tertiary-container" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={cn("w-3 h-3 rounded-full", item.color)}></div>
                <div>
                  <p className="font-label font-bold text-sm">{item.label}</p>
                  <p className="text-xs text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )},
    { id: "decay", icon: History, title: "Grit & Skill Decay", items: [
      { q: "The Decay Curve Protocol", a: "Knowledge is perishable. After 72 hours of inactivity, your Skill Index begins a linear decay at a rate of 0.5% per hour. To arrest decay, a 'Proof of Mastery' session must be successfully audited." }
    ]}
  ];

  return (
    <div className="pt-32 pb-24 px-8 md:px-12 max-w-7xl mx-auto">
      <header className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-label font-bold tracking-[0.3em] text-primary uppercase mb-4 block">Operational Protocol v4.0</span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-background tracking-tight leading-none mb-6">Rules of Engagement</h1>
            <p className="text-lg text-on-surface-variant leading-relaxed font-body">The governing forensic logic for all Tenured AI participants. Clarity on the Sovereign Ledger, performance friction, and the architecture of value.</p>
          </div>
          <div className="p-6 bg-surface-container-low rounded-lg flex flex-col gap-2 min-w-[240px]">
            <span className="text-[10px] font-label font-bold text-outline uppercase tracking-widest">Last Forensic Audit</span>
            <span className="text-2xl font-headline font-bold text-primary">02.NOV.2024</span>
            <div className="h-1 bg-surface-container-highest w-full rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3 space-y-6">
          <div className="p-6 bg-surface-container-high rounded-lg flex flex-col gap-4 sticky top-40">
            <h3 className="font-label font-bold text-xs uppercase tracking-widest text-on-surface">Categories</h3>
            <nav className="flex flex-col gap-3">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="text-sm font-label text-on-surface-variant hover:text-primary transition-colors flex items-center justify-between group">
                  {s.title}
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </nav>
          </div>
          <div className="relative rounded-lg overflow-hidden h-64 shadow-xl group">
            <img 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrOzpAj6VQOC-xi-04gJTwaN8sP2grmLrY_TkGr0x56UIZo7ebXUSWgpVz7DTuL-ul5BInyHiLAlkyxHL6P7sDFSvXlPHNuyUupg59N9yofm8jtEbm31-Sg6X0pfe3_KPxlF0rfes0PpIFuSusGtyD33hYC9qlM-fy6o07O0SlXfi_7C2CQazj-Bf9j9iSdJTY5tzZuwtB-UkBes7dXmTXOIKt8hDI_XVZ01XB5zlH5osaZ50YoXh16g6xLXFEaC1qyeqcZYY"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
              <span className="text-white font-headline text-lg italic">"Logic is the only immutable law."</span>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-9 space-y-12">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="space-y-4">
              <h2 className="text-2xl font-headline font-bold text-on-background border-b border-outline-variant/30 pb-4 flex items-center gap-3">
                <section.icon className="text-primary w-6 h-6" />
                {section.title}
              </h2>
              {section.items?.map((item, i) => (
                <div key={i} className="bg-surface-container-lowest rounded-lg overflow-hidden">
                  <div className="p-6 cursor-pointer hover:bg-surface-container-low transition-colors flex items-center justify-between group">
                    <span className="font-headline font-bold text-xl text-on-surface">{item.q}</span>
                    <ChevronDown className="text-outline group-hover:text-primary transition-transform" />
                  </div>
                  <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                    {item.a}
                  </div>
                </div>
              ))}
              {section.custom}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
