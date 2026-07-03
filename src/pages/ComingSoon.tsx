import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Twitter, Linkedin, Github, Copy, Check, ChevronDown } from 'lucide-react';
import { db, grantTenuredPoints } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, getCountFromServer, query, where, doc, updateDoc, increment } from 'firebase/firestore';
import ReferralStats from '../components/ReferralStats';
import WaitlistLeaderboard from '../components/WaitlistLeaderboard';

const faqs = [
  {
    id: "faq-1",
    question: "What is Tenured AI?",
    answer: "Tenured AI is a sovereign, self-verifying framework designed to validate competency autonomously. By bypassing traditional middlemen and centralized gatekeepers, we empower verified professionals and technical creators to assert their skills in a secure, digital, cryptographic format."
  },
  {
    id: "faq-2",
    question: "What are Tenured points and how do I earn them?",
    answer: "Tenured points measure your early contribution and support. You instantly earn 10 points when you join the waitlist. Additionally, you earn 5 bonus points for every peer who joins using your unique referral link."
  },
  {
    id: "faq-3",
    question: "How does the referral program work?",
    answer: "As soon as you sign up, a unique tracking link is generated with your waitlist ID. Share this link on Twitter, LinkedIn, GitHub, or privately. When anyone registers through it, our secure database credits your record with 5 extra points, growing your queue priority."
  },
  {
    id: "faq-4",
    question: "When is the launch timeline, and what comes next?",
    answer: "We are tracking towards a premier sovereign platform release scheduled for mid-June 2026. Waitlist members will get early previews and rolling beta test invitations according to their standing in the waitlist queue."
  }
];

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [totalJoiners, setTotalJoiners] = useState<number | null>(null);
  const [totalReferrals, setTotalReferrals] = useState<number | null>(null);
  const [referredBy, setReferredBy] = useState<string>('');
  const [createdRefLink, setCreatedRefLink] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [recentWaitlistId, setRecentWaitlistId] = useState<string>('');
  const [showLookup, setShowLookup] = useState(false);

  useEffect(() => {
    // Parse referral code from URL parameters (supports `ref` or `referral`)
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref') || params.get('referral');
    if (refParam) {
      setReferredBy(refParam);
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const snap = await getCountFromServer(collection(db, 'waitlist'));
        setTotalJoiners(snap.data().count);

        const refSnap = await getCountFromServer(
          query(collection(db, 'waitlist'), where('referredBy', '!=', ''))
        );
        setTotalReferrals(refSnap.data().count);
      } catch (err) {
        console.error('Failed to fetch count', err);
      }
    };
    fetchStats();
  }, [status]);

  useEffect(() => {
    const target = new Date('June 19, 2026 00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    try {
      // 1. Create directory record in waitlist with referrals tracked
      const newDoc = await addDoc(collection(db, 'waitlist'), {
        email,
        points: 10,
        referrals: 0,
        referredBy: referredBy || '',
        createdAt: serverTimestamp(),
      });

      // 2. Grant 10 points to registered user if signed in
      try {
        await grantTenuredPoints(10, 'Joined the waitlist!');
      } catch (err) {
        console.warn('User not signed in or profile points update skipped:', err);
      }

      // 3. If signed up via a referrer's link, reward that referrer with +5 points & +1 referral count!
      if (referredBy) {
        try {
          const referrerRef = doc(db, 'waitlist', referredBy);
          await updateDoc(referrerRef, {
            points: increment(5),
            referrals: increment(1)
          });
        } catch (err) {
          console.error('Failed to reward referrer:', err);
        }
      }

      // 4. Generate their unique referral link
      const link = `${window.location.origin}${window.location.pathname}?ref=${newDoc.id}`;
      setCreatedRefLink(link);
      setRecentWaitlistId(newDoc.id);

      // 5. Sync email to optional external marketing service proxy (ConvertKit / Mailchimp)
      try {
        await fetch('/api/waitlist/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
      } catch (err) {
        console.warn('Failed to sync to external marketing integration:', err);
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Waitlist error:', error);
      setStatus('error');
    }
  };

  const handleCopyLink = async () => {
    if (!createdRefLink) return;
    try {
      await navigator.clipboard.writeText(createdRefLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-y-auto py-16 px-4">
      {/* Background Image */}
      <img 
        src="/TheHabituationEngine.png" 
        alt="Habituation Engine Background"
        className="fixed inset-0 w-full h-full object-cover z-0" 
      />
      <div className="fixed inset-0 bg-black/75 z-0 pointer-events-none" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4 w-full max-w-2xl"
      >
        <div className="flex gap-4 justify-center mb-8 font-mono text-xl">
          <div>{timeLeft.days}d</div>
          <div>{timeLeft.hours}h</div>
          <div>{timeLeft.mins}m</div>
          <div>{timeLeft.secs}s</div>
        </div>
        
        {referredBy && (
          <div className="inline-block mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs text-gray-300 font-mono">
            Referred by code: <span className="text-white font-semibold">{referredBy}</span> (+10 Points for you, +5 for them!)
          </div>
        )}

        <h1 className="text-5xl md:text-7xl font-sans font-medium mb-6 tracking-tight">Something Sovereign is coming.</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-lg mx-auto">
          We’re building the future of autonomous competency verification. Join the waitlist for early access.
        </p>

        {/* Waitlist Form with Micro-Interaction Animations */}
        {!recentWaitlistId && !showLookup && (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <motion.div 
              animate={status === 'success' ? {
                scale: [1, 1.05, 0.96, 1.02, 1],
                y: [0, -8, 4, -2, 0],
              } : {}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative w-full sm:w-80"
            >
              <input 
                type="email" 
                value={status === 'success' ? 'Joined Waitlist!' : email}
                disabled={status === 'success' || status === 'submitting'}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`px-6 py-3 bg-white/10 backdrop-blur-md border rounded-full focus:outline-none w-full transition-all duration-300 ${
                  status === 'success' 
                    ? 'border-green-500 shadow-lg shadow-green-500/30 text-green-300 font-medium pl-6 pr-12' 
                    : 'border-white/20 focus:border-white text-white pl-6 pr-6'
                }`}
                required
              />
              {status === 'success' && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                </motion.div>
              )}
            </motion.div>
            <motion.button 
              type="submit" 
              disabled={status === 'success' || status === 'submitting'}
              animate={status === 'success' ? {
                scale: [1, 0.95, 1],
                backgroundColor: '#22c55e',
                color: '#ffffff'
              } : {}}
              transition={{ duration: 0.4 }}
              className={`px-8 py-3 font-semibold rounded-full min-w-[140px] transition-colors duration-300 ${
                status === 'success'
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {status === 'submitting' && 'Submitting...'}
              {status === 'idle' && 'Join Waitlist'}
              {status === 'success' && 'Registered!'}
            </motion.button>
          </form>
        )}

        {/* Option to look up status manually */}
        {!recentWaitlistId && !showLookup && (
          <div className="mb-8">
            <button 
              onClick={() => setShowLookup(true)}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors underline decoration-dotted"
              id="lookup-toggle-btn"
            >
              Already on the list? Check your rank & referrals
            </button>
          </div>
        )}

        {/* Detailed real-time lookup stats */}
        {showLookup && (
          <div className="mb-8">
            <ReferralStats onClose={() => setShowLookup(false)} />
          </div>
        )}

        {/* Interactive stats reveal right after successful signup */}
        {recentWaitlistId && (
          <div className="mb-8">
            <div className="text-center mb-4">
              <span className="inline-block py-1 px-3 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold font-mono mb-2">
                🎉 Verification Recorded Successfully
              </span>
            </div>
            <ReferralStats initialWaitlistId={recentWaitlistId} />
          </div>
        )}

        {status === 'error' && <p className="mt-4 text-red-500 font-semibold mb-6">Failed to join. Please try again.</p>}

        {/* Dynamic Dual stats counter */}
        {(totalJoiners !== null || totalReferrals !== null) && (
          <div className="space-y-4">
            <div className="flex gap-8 justify-center mt-8 p-4 rounded-xl bg-white/5 border border-white/10 max-w-sm mx-auto backdrop-blur-sm">
              <div className="text-center">
                <span className="block text-2xl font-bold font-mono text-white">
                  {totalJoiners !== null ? totalJoiners.toLocaleString() : '0'}
                </span>
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Total Joiners</span>
              </div>
              <div className="w-[1px] bg-white/10 self-stretch" />
              <div className="text-center">
                <span className="block text-2xl font-bold font-mono text-white">
                  {totalReferrals !== null ? totalReferrals.toLocaleString() : '0'}
                </span>
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Total Referrals</span>
              </div>
            </div>

            {/* Visual Milestone Progress Bar to incentivize referrals */}
            {totalJoiners !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full max-w-sm mx-auto p-4 rounded-xl bg-white/5 border border-white/10 text-left backdrop-blur-sm"
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-semibold text-gray-400 font-mono uppercase tracking-wider">Milestone Progress</span>
                  <span className="text-[10px] font-bold text-green-400 font-mono bg-green-500/10 px-1.5 py-0.5 rounded-md">
                    {totalJoiners >= 1000 
                      ? '100% Completed' 
                      : `${Math.max(1, Math.min(100, Math.round((totalJoiners / 1000) * 100)))}% to Sovereign Launch`
                    }
                  </span>
                </div>

                {/* Progress bar tracks */}
                <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(1, (totalJoiners / 1000) * 100))}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 rounded-full shadow-lg shadow-green-500/20"
                  />
                </div>

                {/* Milestones markers */}
                <div className="grid grid-cols-3 gap-1 text-center text-[9px] font-mono text-gray-400">
                  <div className={`flex flex-col items-start ${totalJoiners >= 100 ? 'text-green-400 font-semibold font-mono' : ''}`}>
                    <span>100</span>
                    <span className="text-[7.5px] text-gray-500 uppercase tracking-tight">Alpha Launch</span>
                  </div>
                  <div className={`flex flex-col items-center ${totalJoiners >= 500 ? 'text-green-400 font-semibold font-mono' : ''}`}>
                    <span>500</span>
                    <span className="text-[7.5px] text-gray-500 uppercase tracking-tight">Beta Preview</span>
                  </div>
                  <div className={`flex flex-col items-end ${totalJoiners >= 1000 ? 'text-green-400 font-semibold font-mono' : ''}`}>
                    <span>1,000</span>
                    <span className="text-[7.5px] text-gray-500 uppercase tracking-tight">Sovereign Main</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
        
        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-8">
          <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="Twitter">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="GitHub">
            <Github className="w-6 h-6" />
          </a>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-white/10 mx-auto my-12" id="faq-divider" />

        {/* FAQ Accordion Section */}
        <div className="w-full max-w-lg mx-auto text-left" id="faq-section">
          <h2 className="text-xl font-sans font-medium text-white text-center mb-6 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={faq.id} 
                  className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-300"
                  id={`faq-item-${idx}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                    id={`faq-btn-${idx}`}
                  >
                    <span className="font-medium text-sm text-white pr-4">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-xs leading-relaxed text-gray-300 border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Waitlist Leaderboard */}
        <WaitlistLeaderboard />
      </motion.div>
    </div>
  );
}
