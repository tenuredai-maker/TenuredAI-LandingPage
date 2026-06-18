import { motion } from 'motion/react';
import { Shield, ArrowRight } from 'lucide-react';

export default function Manifesto() {
  return (
    <div className="pt-32 pb-24 px-8 md:px-12 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <span className="font-label text-xs tracking-[0.3em] text-primary uppercase mb-4 block">Institutional Document 001</span>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-8">The Sovereign Manifesto</h1>
        <p className="font-headline italic text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          Defining the future of intellectual capital in the age of generative displacement.
        </p>
      </header>

      {/* Atmospheric Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full h-80 md:h-[500px] rounded-3xl overflow-hidden relative mb-24 shadow-2xl group border border-outline-variant/20"
      >
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
          alt="Editorial Architecture" 
          className="w-full h-full object-cover grayscale opacity-80 transition-transform duration-[2s] group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-tertiary/10 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-2xl text-left z-10 p-6 md:p-8 bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl border border-outline-variant/30">
           <h2 className="text-2xl md:text-4xl font-headline font-bold text-on-surface mb-3 tracking-tight">The Ledger of Human Agency</h2>
           <p className="text-on-surface-variant text-base md:text-lg">Defending the qualitative delta between sterile machine output and human-authored brilliance. The algorithm generates; the human curates, audits, and commands.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Proficiency Paradox */}
        <section className="md:col-span-8 bg-surface-container-low rounded-xl p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-headline text-3xl font-bold mb-6 text-on-surface">The Proficiency Paradox</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-xl">
              While legacy institutions issue degrees, AI benchmarks the underlying competency. We identify the critical delta where formal education fails and real-world AI proficiency begins.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 relative z-10">
            <div>
              <div className="text-primary text-4xl font-headline font-bold mb-2">84%</div>
              <div className="font-label text-xs uppercase tracking-widest text-outline">Degree Obsolescence</div>
            </div>
            <div>
              <div className="text-primary text-4xl font-headline font-bold mb-2">12.4x</div>
              <div className="font-label text-xs uppercase tracking-widest text-outline">Competency Premium</div>
            </div>
          </div>
          <div className="absolute right-[-10%] bottom-[-10%] w-2/3 h-2/3 opacity-10">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIp9hVYroYVn9sUt45TpZDmtmvrJlokxMaPieM5Dcdi2C5Kz0Ftue448RYUtjtsHyzWH5-4-7vmahjwlvdDO4iSfaHy6x7Cg6in9bvrkT5n3V_TC5a5wB5PZOJSltKw3DkTXpHr1hiYNmVUoYTsmkVEBeb3ANcNJPkD6PtkMXAnZkPWOzMFvTB0CQ6XREvyTY-eb3cdHV7_N_OX21bImMfx7-ZFkTBEdJsHEZ65tAl-LjWrxPpA8Ztdi8fWu1lrTJ04ihDSt0"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        {/* Command Authority */}
        <section className="md:col-span-4 bg-primary text-on-primary rounded-xl p-10 flex flex-col justify-center editorial-shadow gold-gradient">
          <div className="mb-4">
            <Shield className="w-10 h-10" />
          </div>
          <h3 className="font-headline text-2xl font-bold mb-4 italic">Command Authority ($CA$)</h3>
          <p className="font-body text-sm leading-relaxed opacity-90">
            The proprietary metric for human-in-the-loop orchestration. $CA$ measures the sovereign's ability to direct, audit, and refine machine output without losing creative agency.
          </p>
        </section>

        {/* Proof of Friction */}
        <section className="md:col-span-4 bg-surface-container-highest rounded-xl p-10 border-l-4 border-primary">
          <h3 className="font-headline text-xl font-bold mb-6">Proof of Friction (PoF)</h3>
          <div className="space-y-6">
            {[
              "Intention-to-Prompt verification protocols.",
              "Cognitive effort mapping for synthetic outputs.",
              "Verification of manual audit trails in AI workstreams."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="font-headline italic text-primary text-xl">0{i+1}</span>
                <p className="text-sm text-on-surface-variant">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Triple-Threat Scoring */}
        <section className="md:col-span-8 bg-surface-container-low rounded-xl p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <h2 className="font-headline text-3xl font-bold">Triple-Threat Forensic Audit</h2>
            <span className="px-4 py-1 bg-surface-container-high rounded-full font-label text-[10px] tracking-widest uppercase">Verified Tier 1</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "AICI", sub: "Competency Index", val: 75 },
              { label: "AIOI", sub: "Output Integrity", val: 92 },
              { label: "AIBS", sub: "Benchmark Sensitivity", val: 64 }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
                <div className="text-primary font-bold text-2xl mb-1">{item.label}</div>
                <div className="font-label text-[10px] text-outline uppercase tracking-wider mb-4">{item.sub}</div>
                <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${item.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="my-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-2xl border border-outline-variant/20 group">
            <img 
              src="https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="The Sovereign Contract" 
              className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-[2s] group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#3b4c73]/20 mix-blend-color transition-opacity duration-700 group-hover:opacity-40"></div>
          </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="space-y-8"
        >
          <span className="font-label text-sm uppercase tracking-widest text-primary font-bold">The Tenured Protocol</span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight">The Sovereign Contract</h2>
          <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
            <p>
              In the preceding epoch, intellectual labor was measured by time spent and credentials earned. In the Tenured epoch, labor is measured by cryptographic proof of cognitive endurance, remediation velocity, and editorial judgment in the face of machine hallucination.
            </p>
            <p className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary italic">
              "We do not reject the machine; we reject the unverified reliance upon it. Let the algorithm draft the first pass. We own the final truth."
            </p>
            <p>
              The <strong>Sovereign 31 Schema</strong> establishes an immutable ledger where an individual's <em>Grit Index</em> and <em>Command Authority</em> cannot be falsified, abstracted, or diminished without explicit cryptographic scarring. It is a new standard of trust—a moat protecting authentic human genius from synthetic dilution.
            </p>
          </div>
        </motion.div>
      </div>

      <footer className="mt-24 text-center max-w-2xl mx-auto">
        <h4 className="font-headline text-2xl italic mb-6">"The machine produces. The human certifies."</h4>
        <div className="h-px w-24 bg-primary mx-auto mb-8"></div>
        <p className="font-label text-xs tracking-widest text-outline uppercase">End of Manifesto</p>
      </footer>
    </div>
  );
}
