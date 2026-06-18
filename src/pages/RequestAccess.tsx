import { motion } from 'motion/react';
import { Landmark, Shield, Lock, Building2, User, ShieldCheck, Circle, AlertCircle } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, signInWithGoogle } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export default function RequestAccess() {
  const { user, loading: authLoading } = useAuth();
  const [selectedTier, setSelectedTier] = useState('institutional');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const MAX_CHARS = 500;

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !reason.trim()) {
      setError("Please fill in all required fields (Identity, Email, and Reason).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please provide a valid secure protocol email address.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const requestsRef = collection(db, 'access_requests');
      await addDoc(requestsRef, {
        uid: user?.uid || null,
        tier: selectedTier,
        name: name.trim(),
        email: email.trim(),
        organization: organization.trim(),
        reason: reason.trim(),
        status: 'pending',
        timestamp: serverTimestamp()
      });
      setShowConfirmation(true);
    } catch (err) {
      setError("Failed to transmit request. Please verify your connection.");
      handleFirestoreError(err, OperationType.CREATE, 'access_requests');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen bg-background relative">
      <div className="max-w-5xl mx-auto">
        {/* Header Section: Editorial Hero */}
        <header className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase">Secure Comms Portal v.4.0</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-headline font-black text-on-surface tracking-tight mb-6"
          >
            Establish Connection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
          >
            Requesting authentication with the Tenured neural grid. Identity verification required for institutional node activation.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Context & Status */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 space-y-8"
          >
            {/* System Pulse */}
            <div className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/15">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">System Pulse</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-on-surface">Houston Node</span>
                  <span className="flex items-center gap-2 text-[10px] font-bold text-primary">
                    <Circle className="w-2 h-2 fill-primary" />
                    ONLINE
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-on-surface">NYC Node</span>
                  <span className="flex items-center gap-2 text-[10px] font-bold text-primary">
                    <Circle className="w-2 h-2 fill-primary" />
                    ONLINE
                  </span>
                </div>
                <div className="flex items-center justify-between opacity-50">
                  <span className="text-sm font-medium text-on-surface">London Node</span>
                  <span className="flex items-center gap-2 text-[10px] font-bold">
                    <Circle className="w-2 h-2" />
                    SYNCING
                  </span>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/10">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="text-primary w-4 h-4" />
                  <span className="text-sm font-bold">Sovereign Encryption</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  All communications are processed via AES-256 Sovereign Encryption. Identity fragments are Redacted by Default unless authorized.
                </p>
              </div>
            </div>

            {/* Visual Anchor */}
            <div className="relative group aspect-square rounded-xl overflow-hidden shadow-2xl">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Monolithic brutalist architecture" 
                src="https://picsum.photos/seed/monolith/800/800"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-bold text-primary-fixed tracking-widest uppercase mb-1">Location Authority</p>
                <p className="text-on-primary font-headline text-lg">The Gilded Slate Annex</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: The Form Shell */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8"
          >
            <div className="bg-surface-container-lowest p-6 md:p-12 rounded-xl shadow-sm border border-outline-variant/15 relative overflow-hidden">
              {/* Form Section */}
              <form action="#" className="space-y-10 relative z-10" method="POST" onSubmit={handleSubmit}>
                {/* Access Tier Selection */}
                <div>
                  <label className="block text-xs font-bold tracking-widest text-on-surface-variant uppercase mb-6">Select Access Tier</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'institutional', icon: Landmark, title: 'Institutional', desc: 'Activate University Nodes & Regents Protocol' },
                      { id: 'enterprise', icon: Building2, title: 'Enterprise', desc: 'HR E-100 Power Search & Talent Grid Access' },
                      { id: 'sovereign', icon: User, title: 'Sovereign', desc: 'Individual Identity Recovery & Private Inquiry' },
                    ].map((tier) => (
                      <label key={tier.id} className="relative cursor-pointer group">
                        <input 
                          checked={selectedTier === tier.id}
                          className="peer sr-only" 
                          name="tier" 
                          type="radio"
                          onChange={() => setSelectedTier(tier.id)}
                        />
                        <div className="p-6 h-full bg-surface-container-low rounded-lg border border-outline-variant/15 transition-all peer-checked:bg-primary/5 peer-checked:border-primary">
                          <tier.icon className="text-primary mb-3 w-6 h-6" />
                          <h4 className="text-sm font-bold mb-1">{tier.title}</h4>
                          <p className="text-[11px] text-on-surface-variant leading-tight">{tier.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Input Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest text-on-surface-variant uppercase" htmlFor="name">Full Identity</label>
                    <input 
                      className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none" 
                      id="name" 
                      placeholder="Director John Doe" 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest text-on-surface-variant uppercase" htmlFor="email">Secure Protocol Email</label>
                    <input 
                      className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none" 
                      id="email" 
                      placeholder="j.doe@institution.edu" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold tracking-widest text-on-surface-variant uppercase" htmlFor="org">Affiliated Organization</label>
                    <input 
                      className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none" 
                      id="org" 
                      placeholder="Department of Digital Humanities, Ivy League" 
                      type="text" 
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                    />
                  </div>
                </div>

                {/* Single-Column Layout for Reason */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold tracking-widest text-on-surface-variant uppercase" htmlFor="reason">Reason for Access</label>
                    <span className={`text-[10px] font-mono font-bold tracking-tighter ${reason.length >= MAX_CHARS ? 'text-error' : 'text-primary'}`}>
                      {reason.length} / {MAX_CHARS}
                    </span>
                  </div>
                  <div className="relative">
                    <textarea 
                      className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all resize-none outline-none" 
                      id="reason" 
                      placeholder="Describe the intended use case for the Tenured Grid..." 
                      rows={4}
                      value={reason}
                      onChange={(e) => setReason(e.target.value.slice(0, MAX_CHARS))}
                      required
                    ></textarea>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-container-highest rounded-b-lg overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                          animate={{ width: `${Math.min((reason.length / MAX_CHARS) * 100, 100)}%` }}
                          className={`h-full transition-colors duration-300 ${
                            reason.length >= MAX_CHARS ? 'bg-error' : 
                            reason.length >= MAX_CHARS * 0.8 ? 'bg-primary-container' : 'bg-primary'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-center gap-3 text-error text-xs font-bold"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}

                {/* Submission */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[11px] font-medium italic">
                      {isSubmitting ? 'Encrypting Request Packet...' : 'Pending Decryption of Request Packet'}
                    </span>
                  </div>
                  
                  <button 
                    className={`w-full md:w-auto px-10 py-4 gold-gradient text-on-primary font-headline font-bold text-lg rounded-lg shadow-xl shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Initialize Request'}
                  </button>
                </div>
              </form>
              {/* Decorative "Watermark" */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none select-none">
                <Shield className="w-64 h-64" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust & Social Proof Section */}
        <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-outline-variant/10">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-[10px] md:text-xs font-bold tracking-widest text-on-surface-variant uppercase">Integrated With Architect Nodes At</h3>
          </div>
          
          {/* Logo Ticker */}
          <div 
            className="flex overflow-hidden relative w-full mb-16 md:mb-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
             <div className="flex w-max animate-[scroll_40s_linear_infinite] items-center">
               {[...Array(2)].map((_, i) => (
                 <div key={i} className="flex gap-12 md:gap-24 px-6 md:px-12 items-center">
                   <span className="font-headline font-bold text-xl md:text-2xl text-on-surface">Palantir</span>
                   <span className="font-headline font-bold text-xl md:text-2xl text-on-surface">Stripe</span>
                   <span className="font-headline font-bold text-xl md:text-2xl italic text-on-surface">DeepMind</span>
                   <span className="font-headline font-black text-xl md:text-2xl tracking-tighter text-on-surface">SpaceX</span>
                   <span className="font-headline font-bold text-xl md:text-2xl uppercase text-on-surface">Anthropic</span>
                   <span className="font-headline font-bold text-xl md:text-2xl text-on-surface">Vercel</span>
                 </div>
               ))}
             </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                quote: "The Proving Ground environments are the closest thing to live-fire incidents. Our hiring precision improved by 80% when we switched to verified Tenure.",
                author: "Sarah J.",
                role: "VP of Engineering, Sovereign Tech",
                logo: "ST"
              },
              {
                 quote: "A cryptographic ledger of technical competence. Finally, a system that values forensic reality over keyword-stuffed resumes. It's the future of talent.",
                 author: "Dr. Marcus Vance",
                 role: "Lead Systems Architect, Global Neural",
                 logo: "GN"
              },
               {
                 quote: "Integrating Tenured AI's node allowed us to verify candidate grit in real-time. We've eliminated the technical screen entirely.",
                 author: "Elena R.",
                 role: "Director of Talent, Apex Systems",
                 logo: "AS"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/15 flex flex-col hover:bg-surface-container-highest transition-colors"
              >
                <div className="text-primary text-4xl font-headline leading-none mb-2 md:mb-4 opacity-50">"</div>
                <p className="text-on-surface-variant italic leading-relaxed mb-6 md:mb-8 flex-1 text-sm md:text-base">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center font-bold text-primary text-xs md:text-sm shrink-0">
                    {t.logo}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold font-headline text-on-surface text-sm truncate">{t.author}</h4>
                    <p className="text-[9px] uppercase tracking-widest text-primary font-bold mt-1 truncate">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
            onClick={() => setShowConfirmation(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-surface-container-lowest max-w-md w-full p-10 rounded-3xl shadow-2xl border border-outline-variant/20 relative z-10 text-center"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShieldCheck className="text-primary w-10 h-10" />
            </div>
            <h3 className="text-3xl font-headline font-bold text-on-surface mb-4">Request Received</h3>
            <p className="text-on-surface-variant leading-relaxed mb-10">
              Your authentication request has been securely transmitted to the Tenured neural grid. Our verification nodes are currently processing your identity packet.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                <Circle className="w-2 h-2 fill-primary animate-pulse" />
                Verification in Progress
              </div>
              <button 
                onClick={() => setShowConfirmation(false)}
                className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold hover:bg-surface-tint transition-colors shadow-lg shadow-primary/10"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
