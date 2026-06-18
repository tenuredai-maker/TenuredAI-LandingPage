import { motion } from 'motion/react';
import { Shield, Lock, Eye, History, Hand, Scale, AlertTriangle, UserCheck } from 'lucide-react';

export default function Institutional() {
  return (
    <div className="pt-32 pb-24 px-8 md:px-12 max-w-7xl mx-auto">
      <header className="mb-12">
        <h4 className="font-label text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4">Institutional Social Contract</h4>
        <h1 className="font-headline text-5xl md:text-7xl text-on-surface font-bold leading-tight max-w-4xl">Responsible AI & The Sovereignty Mandate.</h1>
        <p className="mt-8 text-xl text-secondary max-w-2xl leading-relaxed">A digital constitution governing the interaction between human intelligence and algorithmic precision. Integrity is not optional; it is baked into the code.</p>
      </header>

      {/* Atmospheric Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full h-64 md:h-[400px] rounded-3xl overflow-hidden relative mb-16 border border-outline-variant/20 shadow-2xl group"
      >
        <img 
          src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Institutional Compliance" 
          className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-tertiary/20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex items-center gap-3 z-10">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-on-surface drop-shadow-md bg-surface-container-lowest/50 px-3 py-1.5 rounded backdrop-blur-sm">Global Data Vault // SECURE</span>
        </div>
      </motion.div>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
        <div className="md:col-span-8 bg-surface-container-low p-10 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-primary w-8 h-8" />
              <h2 className="font-headline text-3xl font-bold">Redacted by Default</h2>
            </div>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              Your biological and cognitive data never leaves your local hardware in an unencrypted state. Tenured AI operates on a <b>Zero-Knowledge</b> architecture, ensuring that the institution only verifies the *result* of your mastery, never the raw data behind it.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/30">
            <div>
              <h4 className="font-bold text-primary mb-1">Local Processing</h4>
              <p className="text-sm text-secondary">Edge-only computation for biometric analysis.</p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-1">Quantum-Safe</h4>
              <p className="text-sm text-secondary">Encryption standards resistant to future decryption.</p>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 bg-primary-container text-on-primary-container p-10 rounded-xl relative overflow-hidden">
          <div className="relative z-10">
            <Shield className="w-12 h-12 mb-6" />
            <h2 className="font-headline text-2xl font-bold mb-4">The Permission Shield</h2>
            <p className="text-on-primary-container/80 text-sm leading-relaxed">
              A dynamic firewall that sits between your Sovereign Passport and institutional crawlers. Granular control over which AI modules can read your credentials and for how long.
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-10">
            <Shield className="w-60 h-60" />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-headline text-4xl font-bold">AI Use Policy: The Four Pillars</h2>
          <span className="text-xs font-label tracking-widest text-primary uppercase font-bold">Governance Protocol v4.2</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Eye, title: "Explainability", desc: "Every decision made by the system is accompanied by a human-readable trace of the logic used." },
            { icon: History, title: "Audit Logging", desc: "Immutable, time-stamped logs of every AI interaction, stored on a decentralized ledger for total transparency." },
            { icon: Hand, title: "Autonomy Limits", desc: "Hard-coded gates prevent AI from making life-altering decisions without a human 'Final Sign-off' protocol." },
            { icon: Scale, title: "Bias Detection", desc: "Continuous adversarial testing to identify and neutralize socio-economic and demographic biases." }
          ].map((pillar, i) => (
            <div key={i} className="bg-surface-container p-8 rounded-xl hover:bg-surface-container-high transition-colors">
              <pillar.icon className="text-primary w-8 h-8 mb-4" />
              <h3 className="font-headline font-bold text-lg mb-3">{pillar.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        <div className="bg-surface-container-highest p-1 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-surface p-8 md:p-12 rounded-[1.4rem] h-full border border-outline-variant/20 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="font-headline text-3xl font-bold text-error">Identity Scarring Protocol</h3>
              <span className="self-start sm:self-auto shrink-0 px-4 py-1.5 bg-error/10 border border-error/20 text-error rounded-full text-[10px] font-bold uppercase tracking-[0.1em]">High Stakes</span>
            </div>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed max-w-lg relative z-10">
              Attempting to circumvent the Hard-Gate through deepfakes or credential theft results in an <b>Identity Scar</b>. This is a permanent, cryptographically signed mark on your Sovereign Passport.
            </p>
            
            <div className="w-full h-48 md:h-56 rounded-2xl overflow-hidden mb-8 relative border border-error/20 flex-shrink-0">
               <img 
                 src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Digital forensics abstract" 
                 className="w-full h-full object-cover grayscale opacity-80"
               />
               <div className="absolute inset-0 bg-error/20 mix-blend-color"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
               {/* Terminal overlay */}
               <div className="absolute top-4 left-4 right-4 bottom-4 font-mono text-[9px] text-error/80 leading-relaxed overflow-hidden opacity-60">
                 {Array.from({ length: 8 }).map((_, i) => (
                   <div key={i} className="whitespace-nowrap">
                     {`> ERR_SIG_MISMATCH: SHA-256 CHECK FAILED [BLOCK ${1024 + i * 16}]`}
                     <br/>
                     {`> INJECTING SCAR PROTOCOL... [UID: ${Math.random().toString(36).substring(2, 10)}]`}
                   </div>
                 ))}
               </div>
            </div>

            <div className="mt-auto bg-error/5 p-6 rounded-2xl border border-error/10 relative z-10">
               <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="text-error w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-on-surface leading-snug pt-1">Instant revocation of all non-foundational mastery scores.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Hand className="text-error w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-on-surface leading-snug pt-1">Three-year quarantine from high-trust institutional networks.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex-1 bg-surface-container-low p-8 md:p-12 rounded-3xl relative overflow-hidden group border border-outline-variant/10">
            <h3 className="font-headline text-2xl font-bold mb-4">Age-Based Safeguards</h3>
            <p className="text-secondary leading-relaxed mb-8">
              Tiered AI interaction based on cognitive development. For users under 18, the system enters "Mentorship Mode," emphasizing learning over scoring and disabling all behavioral profiling.
            </p>
            <div className="mt-auto flex flex-wrap gap-4">
              <span className="px-5 py-2.5 bg-primary/10 text-primary font-bold rounded-xl text-[10px] uppercase tracking-wider">Lvl 1: Exploratory (6-12)</span>
              <span className="px-5 py-2.5 bg-primary/10 text-primary font-bold rounded-xl text-[10px] uppercase tracking-wider">Lvl 2: Apprentice (13-17)</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-tertiary to-[#2e3e60] p-8 md:p-12 rounded-3xl text-white relative overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <UserCheck className="w-48 h-48" />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-headline text-2xl font-bold">The Sovereign Passport</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-8 max-w-sm">
                  A single, decentralized hub for your trust score and mastery logs. Owned by you, managed by code, audited by everyone.
                </p>
                <button className="bg-white text-tertiary font-bold px-8 py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-white/90 transition-colors shadow-lg shadow-black/10">View My Ledger</button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
