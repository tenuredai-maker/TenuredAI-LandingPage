import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronDown, 
  ArrowRight, 
  Shield, 
  Brain, 
  Activity, 
  Fingerprint, 
  Zap, 
  AlertTriangle, 
  FileBadge, 
  History, 
  Settings, 
  Globe, 
  Mail, 
  X, 
  CheckCircle2,
  Eye,
  BarChart3,
  Users,
  Code2,
  Compass,
  Wallet,
  Calculator,
  Coins,
  Timer,
  SearchCheck
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const faqData: FAQSection[] = [
  {
    id: 'vision',
    title: 'General & Vision',
    icon: <Eye className="w-5 h-5 text-primary" />,
    items: [
      {
        question: 'What is Tenured AI?',
        answer: 'Tenured AI is an AI-native workforce intelligence platform. We move beyond static resumes and "certified" badges by using live, adversarial environments to verify a professional\'s true capability in an AI-augmented world.'
      },
      {
        question: 'What is a Sovereign Passport?',
        answer: 'Your Sovereign Passport is a dynamic, portable record of your verified skills. Unlike a LinkedIn profile, it is backed by real-time data from The Proving Ground and updated by the Grit Engine to reflect your current readiness.'
      }
    ]
  },
  {
    id: 'scoring',
    title: 'The Scoring System',
    icon: <BarChart3 className="w-5 h-5 text-primary" />,
    items: [
      {
        question: 'How is my Triple-Threat Score calculated?',
        answer: 'We measure three distinct pillars: AICI™ (AI Competency Index), AIOI™ (AI Orchestration Index), and AIBS™ (AI Builder Score). These are real-time measurements of AI competencies aggregated into a Radar Chart that gives employers a 360-degree view of your utility.'
      },
      {
        question: 'What is AIOI-ED™?',
        answer: 'AIOI-ED™ is a specialized sub-score for management and education, also known as the Educator Designation. It provides a real-time measurement focused on leadership and governance in learning environments, calculated using the Weighted Multi-Factor (WMF) Index (40% Efficiency, 30% Security, 30% Debug Speed).'
      },
      {
        question: 'What does "Grit" mean in my score?',
        answer: 'Grit is our measure of technical resilience. It is calculated by how you perform when the Tenured Agent injects "Chaos Scenarios"—like API failures or hallucinated code—into your assessment. It proves you can fix what the AI breaks.'
      },
      {
        question: 'How does the Grit Engine handle "Skill Decay"?',
        answer: 'AI tech moves fast. The Grit Engine applies a "half-life" to your scores. If you haven\'t performed a verified task in a specific competency within a certain window, your score will begin to dim until you complete a "Refresh Lab."'
      }
    ]
  },
  {
    id: 'technology',
    title: 'Platform & Technology',
    icon: <Settings className="w-5 h-5 text-primary" />,
    items: [
      {
        question: 'What is The Proving Ground?',
        answer: 'The Proving Ground is our proprietary, browser-based terminal. It provides a live containerized environment where you solve real-world engineering problems. It isn\'t a multiple-choice test; it’s a "Hard-Gate" execution environment.'
      },
      {
        question: 'Is my data stored on a blockchain?',
        answer: 'For Version 1, we utilize a Neutral Outcome Registry based on secure, server-side webhooks and hashed event signatures. This provides the transparency of a ledger with the speed and low friction of a modern web app.'
      }
    ]
  },
  {
    id: 'partners',
    title: 'For Employers & Partners',
    icon: <Users className="w-5 h-5 text-primary" />,
    items: [
      {
        question: 'How can I verify a candidate\'s score?',
        answer: 'Each Sovereign Passport has a unique, shareable URL. Additionally, enterprises can use our Talent Query API to programmatically verify scores and "Performance Bonds" for high-stakes hiring.'
      },
      {
        question: 'What is a Performance Bond?',
        answer: 'A Performance Bond is a reputation-based (and eventually financial) "stake" that backs a user\'s skills. It provides an extra layer of insurance for employers, effectively "underwriting" the talent\'s ability to deliver.'
      }
    ]
  },
  {
    id: 'ledger',
    title: 'The Sovereign Ledger',
    icon: <Wallet className="w-5 h-5 text-primary" />,
    items: [
      {
        question: 'What constitutes a \'Forensic Entry\'?',
        answer: 'A Forensic Entry is any verifiable action indexed by the Tenured neural net. Unlike standard databases, every entry is cryptographically bound to your Grit Score and cannot be purged without a 40% performance penalty.'
      },
      {
        question: 'How is the Ledger audited?',
        answer: 'The Ledger is audited via a Three-Way Handshake: 1. The User’s Session Token; 2. The Proving Ground’s Execution Log; 3. The Tenured Agent’s Validation Signature. A score is only committed when all three cryptographic hashes align.'
      }
    ]
  },
  {
    id: 'indices',
    title: 'The Three Indices',
    icon: <Calculator className="w-5 h-5 text-primary" />,
    items: [
      {
        question: 'How are the indices weighted?',
        answer: (
          <div className="space-y-4">
            <p>The Compound Index Score is calculated using the following formula:</p>
            <div className="p-4 bg-surface-container-low rounded-lg font-mono text-sm border border-outline-variant/10">
              <div className="flex items-center gap-4 text-on-surface">
                <span className="bg-primary text-on-primary px-2 py-1 rounded">Score</span>
                <span>= (V * 0.4) + (P * 0.4) - (E * 0.2)</span>
              </div>
            </div>
            <p className="text-xs italic text-on-surface-variant">
              Where V is learner velocity, P is precision deviation, and E is neural entropy.
            </p>
          </div>
        )
      }
    ]
  },
  {
    id: 'friction',
    title: 'Friction & Bond',
    icon: <Shield className="w-5 h-5 text-primary" />,
    items: [
      {
        question: 'Why do I need a Performance Bond?',
        answer: 'Tenured AI requires "skin in the game." Your performance bond is a stake of learning capital held in escrow. Failure to meet the 14-day Grit threshold results in a \'Friction Event\', where 10% of the bond is redistributed to the high-performance pool.'
      }
    ]
  },
  {
    id: 'dividend',
    title: '40/40/20 Dividend',
    icon: <Coins className="w-5 h-5 text-primary" />,
    items: [
      {
        question: 'How is the ecosystem value distributed?',
        answer: (
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 relative flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle className="stroke-surface-container-highest" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="40 100" strokeDashoffset="0" strokeWidth="3"></circle>
                <circle className="stroke-primary-container" cx="18" cy="18" fill="none" r="16" strokeDasharray="40 100" strokeDashoffset="-40" strokeWidth="3"></circle>
                <circle className="stroke-tertiary-container" cx="18" cy="18" fill="none" r="16" strokeDasharray="20 100" strokeDashoffset="-80" strokeWidth="3"></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-[8px] font-label font-bold uppercase text-outline">Total</span>
                <span className="text-sm font-headline font-bold">100%</span>
              </div>
            </div>
            <div className="space-y-3 flex-grow text-xs">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p><span className="font-bold">40% Re-Investment:</span> Allocated to the Tenured Learning Core development.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                <p><span className="font-bold">40% Stakeholder Yield:</span> Distributed among Top 10% of Grit Leaders.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-tertiary-container"></div>
                <p><span className="font-bold">20% Ecosystem Liquidity:</span> Reserved for frictionless learner boarding.</p>
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: 'decay',
    title: 'Grit & Skill Decay',
    icon: <Timer className="w-5 h-5 text-primary" />,
    items: [
      {
        question: 'The Decay Curve Protocol',
        answer: 'Knowledge is perishable. After 72 hours of inactivity, your Skill Index begins a linear decay at a rate of 0.5% per hour. To arrest decay, a \'Proof of Mastery\' session must be successfully audited.'
      }
    ]
  },
  {
    id: 'deep-dive',
    title: 'Technical Deep Dive',
    icon: <Code2 className="w-5 h-5 text-primary" />,
    items: [
      {
        question: 'How does The Proving Ground handle state persistence?',
        answer: 'The Proving Ground utilizes ephemeral WebContainers. Each assessment session is a clean-slate environment. However, your Grit Engine tracks your command history and "time-to-remediation" across sessions to build a longitudinal profile of your debugging patterns.'
      },
      {
        question: 'What is the "Chaos Injection" frequency?',
        answer: 'Chaos events are algorithmic. The Tenured Agent triggers an injection (e.g., a simulated 503 or malformed JSON) based on your current AIOI-ED trajectory. If tasks are solved too easily, the system increases the "Entropy Level" to find your true breaking point.'
      },
      {
        question: 'Can I export my Sovereign Passport data?',
        answer: 'Yes. We support Portable Professional Identity. You can export your verified competency hashes as a signed JSON-LD schema, making your Tenured AI scores compatible with other decentralized identity (DID) standards in the future.'
      },
      {
        question: 'How does the "Neutral Outcome Registry" prevent spoofing?',
        answer: 'Every task completion is verified via a Three-Way Handshake: 1. The User’s Session Token; 2. The Proving Ground’s Execution Log; 3. The Tenured Agent’s Validation Signature. A score is only committed when all three cryptographic hashes align.'
      }
    ]
  },
  {
    id: 'strategic',
    title: 'Strategic Value',
    icon: <Compass className="w-5 h-5 text-primary" />,
    items: [
      {
        question: 'Is Tenured AI a replacement for a University degree?',
        answer: 'We view Tenured AI as a Continuous Validation Layer. While a degree proves you can learn, Tenured AI proves you are capable of executing with the latest AI tools right now. We don\'t replace the foundation; we verify the utility.'
      },
      {
        question: 'Does the AIOI-ED score matter if I’m not a developer?',
        answer: 'If you are in a technical-adjacent role, a baseline AIOI score proves you understand the "Physics of AI." It shows you can\'t be "hallucinated" by technical teams because you understand how the stack actually functions.'
      },
      {
        question: 'What is a "Hard-Gate" vs. a "Soft-Skill" assessment?',
        answer: 'A Hard-Gate (AIOI-ED) is binary: the code works or it doesn\'t. A Soft-Skill assessment (AIBS) is behavioral: how did you react when it didn\'t work? The intersection of these two—staying calm and solving the problem—is the modern workforce\'s most valuable asset.'
      }
    ]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredData = faqData.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(section => section.items.length > 0);

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 md:py-32">
      {/* Hero Header */}
      <header className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-1 rounded-full bg-primary/10 text-primary mb-6"
            >
              <FileBadge className="w-4 h-4 mr-2" />
              <span className="text-xs font-label font-bold tracking-[0.3em] uppercase">Operational Protocol v4.0</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-headline font-bold text-on-background tracking-tight leading-none mb-6"
            >
              Forensic <span className="italic text-primary">FAQ.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-on-surface-variant leading-relaxed font-body max-w-xl"
            >
              The governing forensic logic for all Tenured AI participants. Clarity on the Sovereign Ledger, performance friction, and the architecture of value.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10 flex flex-col gap-2 min-w-[240px] shadow-sm"
          >
            <span className="text-[10px] font-label font-bold text-outline uppercase tracking-widest">Last Forensic Audit</span>
            <span className="text-2xl font-headline font-bold text-primary">02.NOV.2024</span>
            <div className="h-1.5 bg-surface-container-highest w-full rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-primary"
              />
            </div>
          </motion.div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="sticky top-32 space-y-8">
            <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10 shadow-sm">
              <h3 className="font-label font-bold text-xs uppercase tracking-widest text-outline mb-6">Protocol Categories</h3>
              <nav className="flex flex-col gap-2">
                {faqData.map((section) => (
                  <a 
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-all"
                  >
                    <span className="text-sm font-label text-on-surface-variant group-hover:text-primary transition-colors">{section.title}</span>
                    <ArrowRight className="w-3 h-3 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl group border border-outline-variant/10">
              <img 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                src="https://picsum.photos/seed/logic/600/800"
                alt="Abstract logic visualization"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex flex-col justify-end p-6">
                <p className="text-white font-headline text-lg italic leading-tight">"Logic is the only immutable law."</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="lg:col-span-9 space-y-16">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input 
              type="text"
              placeholder="Search the forensic ledger..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-label"
            />
          </div>

          {filteredData.map((section) => (
            <motion.div 
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-headline font-bold text-on-background border-b border-outline-variant/20 pb-4 mb-8 flex items-center gap-3">
                {section.icon}
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.items.map((item, idx) => {
                  const itemId = `${section.id}-${idx}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <div 
                      key={itemId}
                      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                      <button 
                        onClick={() => toggleItem(itemId)}
                        className="w-full p-6 text-left flex items-center justify-between group"
                      >
                        <span className="font-headline font-bold text-xl text-on-surface group-hover:text-primary transition-colors">
                          {item.question}
                        </span>
                        <div className={`p-2 rounded-full bg-surface-container-low group-hover:bg-primary/10 transition-all ${isOpen ? 'rotate-180' : ''}`}>
                          <ChevronDown className={`w-5 h-5 text-outline group-hover:text-primary transition-colors`} />
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 text-on-surface-variant leading-relaxed font-body border-t border-outline-variant/5 pt-4">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant/30">
              <SearchCheck className="w-12 h-12 text-outline mx-auto mb-4 opacity-20" />
              <p className="text-on-surface-variant font-headline italic">No forensic matches found in the current ledger.</p>
            </div>
          )}

          {/* Inquiry CTA */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 p-12 bg-surface-container-high rounded-[2.5rem] text-center relative overflow-hidden border border-outline-variant/10"
          >
            <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
              <Search className="w-[400px] h-[400px]" />
            </div>
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="text-3xl font-headline font-bold mb-4">Inquiry Not Resolved?</h2>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Run a deep-net forensic query against the Tenured Ledger. Our AI Curator will pull the exact clause from the Rules of Engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  className="flex-grow bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:outline-none font-label" 
                  placeholder="Explain the entropy calculation..." 
                  type="text"
                />
                <button className="px-8 py-4 bg-primary text-on-primary rounded-xl font-label font-bold tracking-widest uppercase text-sm hover:bg-surface-tint transition-all shadow-lg shadow-primary/20 active:scale-95">
                  Query
                </button>
              </div>
            </div>
          </motion.section>
        </section>
      </div>
    </main>
  );
}
