import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Eye, FileText, History, Hand, Scale, AlertTriangle, UserCheck, Fingerprint, ShieldCheck, GraduationCap, Award, X, ExternalLink, BookOpen, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

interface Pillar {
  icon: any;
  title: string;
  desc: string;
  details: string;
  links: { label: string; href: string }[];
}

export default function ResponsibleAI() {
  const [activePillar, setActivePillar] = useState<Pillar | null>(null);

  const pillars: Pillar[] = [
    { 
      icon: Eye, 
      title: "Explainability", 
      desc: "Every decision made by the system is accompanied by a human-readable trace of the logic used.",
      details: "Our explainability engine decomposes complex neural decisions into a directed acyclic graph (DAG) of logical steps. This allows users to understand not just the 'what', but the 'why' behind every system output. We utilize SHAP and LIME-based attribution models tailored for connectionist architectures.",
      links: [
        { label: "Neural Trace Protocol", href: "#" },
        { label: "Logic Decomposition Standards", href: "#" }
      ]
    },
    { 
      icon: FileText, 
      title: "Audit Logging", 
      desc: "Immutable, time-stamped logs of every AI interaction, stored on a decentralized ledger for total transparency.",
      details: "Every interaction is hashed and committed to a decentralized, immutable ledger. This creates a permanent, tamper-proof record that can be audited by third-party nodes without compromising user privacy. Our 'Sovereign Ledger' ensures that even Tenured AI cannot modify historical logs.",
      links: [
        { label: "Ledger Architecture", href: "#" },
        { label: "Hashing Standards", href: "#" }
      ]
    },
    { 
      icon: Hand, 
      title: "Autonomy Limits", 
      desc: "Hard-coded gates prevent AI from making life-altering decisions without a human 'Final Sign-off' protocol.",
      details: "We implement hard-coded 'semantic gates' that identify high-stakes decision points. In these scenarios, the system is physically incapable of proceeding without an authenticated human signature. This 'Final Sign-off' protocol is enforced at the kernel level of our operating system.",
      links: [
        { label: "Gate Logic v4.2", href: "#" },
        { label: "HITL Framework", href: "#" }
      ]
    },
    { 
      icon: Scale, 
      title: "Bias Detection", 
      desc: "Continuous adversarial testing to identify and neutralize socio-economic and demographic biases.",
      details: "Our adversarial testing suite runs millions of synthetic simulations to identify edge cases where the model might exhibit demographic or socio-economic bias. If detected, the node is automatically quarantined and recalibrated against our 'Equity Baseline' dataset.",
      links: [
        { label: "Adversarial Stress-Testing", href: "#" },
        { label: "Bias Mitigation Roadmap", href: "#" }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <header className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <span className="font-label text-xs tracking-[0.3em] text-primary uppercase font-bold block">Institutional Social Contract</span>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface tracking-tight leading-tight max-w-4xl">
            Responsible AI & <br/><span className="italic text-primary">The Sovereignty Mandate.</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            A digital constitution governing the interaction between human intelligence and algorithmic precision. Integrity is not optional; it is baked into the code.
          </p>
        </motion.div>
      </header>

      {/* Bento Grid Section: Identity & Data Sovereignty */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-8 bg-surface-container-low p-10 rounded-xl flex flex-col justify-between border border-outline-variant/10"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-primary w-10 h-10" />
              <h2 className="font-headline text-3xl font-bold">Redacted by Default</h2>
            </div>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              Your biological and cognitive data never leaves your local hardware in an unencrypted state. Tenured AI operates on a <span className="font-bold text-on-surface">Zero-Knowledge</span> architecture, ensuring that the institution only verifies the <span className="italic">result</span> of your mastery, never the raw data behind it.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-outline-variant/30">
            <div>
              <h4 className="font-bold text-primary mb-1 uppercase text-xs tracking-widest">Local Processing</h4>
              <p className="text-sm text-on-surface-variant">Edge-only computation for biometric analysis and cognitive mapping.</p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-1 uppercase text-xs tracking-widest">Quantum-Safe</h4>
              <p className="text-sm text-on-surface-variant">Encryption standards resistant to future decryption and brute-force attacks.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4 bg-primary text-on-primary p-10 rounded-xl relative overflow-hidden flex flex-col justify-between"
        >
          <div className="relative z-10">
            <ShieldCheck className="w-12 h-12 mb-6" />
            <h2 className="font-headline text-2xl font-bold mb-4">The Permission Shield</h2>
            <p className="text-on-primary/80 text-sm leading-relaxed">
              A dynamic firewall that sits between your Sovereign Passport and institutional crawlers. Granular control over which AI modules can read your credentials and for how long.
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-10">
            <Shield className="w-60 h-60" />
          </div>
        </motion.div>
      </section>

      {/* 4 Pillars Section */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <h2 className="font-headline text-4xl font-bold">AI Use Policy: The Four Pillars</h2>
          <span className="text-[10px] font-label tracking-[0.3em] text-primary uppercase font-bold border-b border-primary/30 pb-1">Governance Protocol v4.2</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActivePillar(pillar)}
              className="bg-surface-container p-8 rounded-xl border border-outline-variant/10 hover:bg-surface-container-high hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer"
            >
              <pillar.icon className="text-primary w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-headline font-bold text-lg mb-3">{pillar.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{pillar.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Explore Pillar <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pillar Modal */}
      <AnimatePresence>
        {activePillar && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
              onClick={() => setActivePillar(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-surface-container-lowest max-w-2xl w-full p-8 md:p-12 rounded-3xl shadow-2xl border border-outline-variant/20 relative z-10"
            >
              <button 
                onClick={() => setActivePillar(null)}
                className="absolute top-6 right-6 p-2 hover:bg-surface-container rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-on-surface-variant" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <activePillar.icon className="text-primary w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Governance Pillar</span>
                  <h3 className="text-3xl font-headline font-bold text-on-surface">{activePillar.title}</h3>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                  <p className="text-on-surface leading-relaxed italic">
                    "{activePillar.desc}"
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> In-Depth Specification
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    {activePillar.details}
                  </p>
                </div>

                <div className="pt-6 border-t border-outline-variant/20">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Documentation & Frameworks</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePillar.links.map((link, i) => (
                      <a 
                        key={i}
                        href={link.href}
                        className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:border-primary/30 hover:bg-surface-container-high transition-all group"
                      >
                        <span className="text-sm font-bold text-on-surface">{link.label}</span>
                        <ExternalLink className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActivePillar(null)}
                className="w-full mt-10 py-4 bg-inverse-surface text-inverse-on-surface rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                Return to Protocol
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Identity Scarring & Age Safeguards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-surface-container-highest p-1 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="bg-surface p-10 rounded-xl h-full border border-outline-variant/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline text-3xl font-bold text-error">Identity Scarring Protocol</h3>
              <span className="px-3 py-1 bg-error/10 text-error rounded-full text-[10px] font-bold uppercase tracking-widest">High Stakes</span>
            </div>
            <p className="text-on-surface mb-8 leading-relaxed">
              Attempting to circumvent the Hard-Gate through deepfakes or credential theft results in an <span className="font-bold">Identity Scar</span>. This is a permanent, cryptographically signed mark on your Sovereign Passport.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <AlertTriangle className="text-error w-5 h-5 mt-1 shrink-0" />
                <span className="text-sm font-medium">Instant revocation of all non-foundational mastery scores across the global network.</span>
              </li>
              <li className="flex items-start gap-4">
                <Lock className="text-error w-5 h-5 mt-1 shrink-0" />
                <span className="text-sm font-medium">Three-year quarantine from high-trust institutional networks and liquid talent pools.</span>
              </li>
            </ul>
            <div className="mt-12 p-6 bg-error/5 rounded-lg border border-error/10">
              <p className="italic text-xs text-error font-bold text-center uppercase tracking-widest">
                "Integrity is the only currency that cannot be minted; only earned."
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-surface-container-low p-10 rounded-xl relative overflow-hidden group border border-outline-variant/10"
          >
            <h3 className="font-headline text-2xl font-bold mb-4">Age-Based Safeguards</h3>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              Tiered AI interaction based on cognitive development. For users under 18, the system enters <span className="font-bold text-on-surface">"Mentorship Mode,"</span> emphasizing learning over scoring and disabling all behavioral profiling.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-full text-[10px] uppercase tracking-widest">Lvl 1: Exploratory (6-12)</span>
              <span className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-full text-[10px] uppercase tracking-widest">Lvl 2: Apprentice (13-17)</span>
            </div>
            <Fingerprint className="absolute -right-8 -bottom-8 text-on-surface opacity-5 w-48 h-48 group-hover:scale-110 transition-transform duration-700" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gold-gradient p-10 rounded-xl text-on-primary shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <Award className="w-8 h-8" />
              <h3 className="font-headline text-2xl font-bold">The Sovereign Passport</h3>
            </div>
            <p className="text-on-primary/80 text-sm leading-relaxed mb-8">
              A single, decentralized hub for your trust score and mastery logs. Owned by you, managed by code, audited by everyone.
            </p>
            <button className="bg-surface-container-lowest text-primary font-bold px-8 py-3 rounded-lg text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
              View My Ledger
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
