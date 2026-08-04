import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, ShieldCheck, Terminal, Network, Brain, Database, Lock, 
  RefreshCw, Landmark, Loader2, Check, BarChart3, Badge, Link as LinkIcon,
  Mail, MessageSquare, Phone, Globe, Cpu, Zap, Award, Shield, Quote, Star,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Radar as RadarArea, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';
import TenuredLeaderboard from '../components/TenuredLeaderboard';

export default function Home() {
  const navigate = useNavigate();
  const [isRequestAccessLoading, setIsRequestAccessLoading] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [isProtocolLoading, setIsProtocolLoading] = useState(false);
  const [isDiagnosticLoading, setIsDiagnosticLoading] = useState(false);
  const [isHeatmapLoading, setIsHeatmapLoading] = useState(true);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);
  
  // Pricing state
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    // Simulate data fetching for perceived performance
    const timer = setTimeout(() => {
      setIsHeatmapLoading(false);
      setIsTestimonialsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    {
      question: "What is the Sovereign Ledger?",
      answer: "The Sovereign Ledger is an immutable, cryptographically secure database that tracks every verified performance event, credential, and skill acquisition. It ensures that your professional reputation is portable, verifiable, and owned exclusively by you."
    },
    {
      question: "How are AICI scores calculated?",
      answer: "AICI (AI Competency Index) is calculated through a multi-dimensional assessment that measures prompt fidelity, latent recall, complex orchestration, and ethical alignment. We use adversarial stress tests to ensure the score reflects real-world resilience."
    },
    {
      question: "Is my data private and secure?",
      answer: "Yes. We utilize a 'Redacted by Default' architecture. While your achievements are verified on the ledger, specific performance telemetry is only shared with your explicit consent via your Sovereign Passport."
    },
    {
      question: "What is the 40/40/20 Dividend Engine?",
      answer: "It is our connectionist economic model where platform value is distributed: 40% to institutional reinvestment, 40% directly to users based on their contribution, and 20% to social dividends for public infrastructure."
    },
    {
      question: "How do I join the waitlist?",
      answer: "You can request access through our secure onboarding portal. Once verified, you'll be placed on the waitlist and assigned a node ID for the Sovereign AI economy."
    }
  ];

  // Methodology state for radar
  const [aiciScores] = useState({
    'Prompt Fidelity': 92,
    'Latent Recall': 85,
    'Orchestration': 96,
    'Ethical Alignment': 89,
    'Debug Speed': 94,
  });

  const getRadarData = (scores: Record<string, number>) => 
    Object.entries(scores).map(([subject, value]) => ({
      subject,
      A: value,
      fullMark: 100,
    }));

  const aiciRadarData = useMemo(() => getRadarData(aiciScores), [aiciScores]);

  const companies = [
    { name: "NEURAL_NET", icon: Cpu },
    { name: "CORE_LOGIC", icon: Zap },
    { name: "SENTIENT_OS", icon: Brain },
    { name: "VECTOR_DB", icon: Database },
    { name: "SECURE_GATE", icon: Lock },
    { name: "PROTOCOL_X", icon: Shield },
    { name: "NODE_ALPHA", icon: Network },
    { name: "SYSTEM_G", icon: Landmark }
  ];

  const testimonials = [
    {
      text: "Tenured.ai has redefined how we underwrite technical risk. The sovereign ledger is the missing link in AI infrastructure.",
      author: "Sarah Chen",
      role: "CTO, Neural Systems",
      score: "0.98 ALPHA"
    },
    {
      text: "The AICI metrics provided us with the first objective measure of our team's AI literacy. Truly revolutionary.",
      author: "David Miller",
      role: "Head of AI, CoreLogic",
      score: "0.94 BETA"
    },
    {
      text: "A seamless integration of human intuition and agentic automation. The future of professional verification.",
      author: "James K.",
      role: "Senior Architect, ProtocolX",
      score: "L5 MASTER"
    }
  ];

  const individualPlans = [
    {
      name: "Explorer",
      price: "0",
      description: "Baseline skill assessment and career discovery.",
      features: [
        "Baseline skill assessment",
        "AI-powered skill discovery",
        "One exploratory pathway (0–30)",
        "View-only skill graph",
        "Limited AI guidance"
      ],
      cta: "Start Free",
      highlight: false
    },
    {
      name: "Builder",
      price: billingCycle === 'monthly' ? "39" : "33",
      description: "Guided learning with adaptive AI agents.",
      features: [
        "Full access to one learning pathway (0–70)",
        "Personal AI learning agent",
        "Adaptive learning paths",
        "Assessments & simulations",
        "Progress analytics",
        "1 verified skill badge included"
      ],
      cta: "Upgrade to Builder",
      highlight: true,
      popular: true
    },
    {
      name: "Pro",
      price: billingCycle === 'monthly' ? "99" : "83",
      description: "Mastery-level verification for elite architects.",
      features: [
        "Unlimited learning pathways",
        "Advanced role-based simulations",
        "Mastery confidence scoring",
        "Portfolio-ready evidence",
        "Multiple micro-credentials",
        "Public credential links"
      ],
      cta: "Go Pro",
      highlight: false
    }
  ];

  const handleSummaryClick = () => {
    setIsSummaryLoading(true);
    setTimeout(() => setIsSummaryLoading(false), 2000);
  };

  const handleReportClick = () => {
    setIsReportLoading(true);
    setTimeout(() => setIsReportLoading(false), 2000);
  };

  const handleProtocolClick = () => {
    setIsProtocolLoading(true);
    setTimeout(() => setIsProtocolLoading(false), 2000);
  };

  const handleDiagnosticClick = () => {
    setIsDiagnosticLoading(true);
    setTimeout(() => setIsDiagnosticLoading(false), 3000);
  };

  const handleRequestAccessClick = () => {
    setIsRequestAccessLoading(true);
    setTimeout(() => {
      setIsRequestAccessLoading(false);
      navigate('/request-access');
    }, 800);
  };

  return (
    <div className="pt-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-6 md:px-8 py-16 md:py-40 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <div className="space-y-4">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-primary font-bold">Platform Intelligence</span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight text-on-surface">
              Sovereign Intelligence. <br/> <span className="italic text-primary">Verified Worth.</span>
            </h1>
          </div>
          <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Tenured AI is the connectionist operating system for liquid professional identities. We bridge the trust gap through high-stakes adversarial testing and immutable telemetry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleRequestAccessClick}
              disabled={isRequestAccessLoading}
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold editorial-shadow hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-wait min-w-[220px]"
            >
              {isRequestAccessLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Request Access'
              )}
            </button>
            <button 
              onClick={handleReportClick}
              disabled={isReportLoading}
              className="text-on-surface-variant px-8 py-4 font-headline italic hover:text-tertiary transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isReportLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  View Intelligence Report <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[600px] bg-surface-container-high rounded-xl overflow-hidden editorial-shadow"
        >
          <img 
            alt="abstract digital geometry" 
            className="w-full h-full object-cover opacity-100" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdR35ylxhUa__i0NMh_tBelTtqSpLK53kj6KOmiTZGiOUAV2gV-L7MPiV059GOKLRDJBj5dqRx5-fubgKkXzwwnxl3IT2-x_BtMlTUUTlpS7mtGmwS8ZF10JIfkXU4y-mAeZxhvrJjobvWdKGxAw05-Eym9PGtWwKbInWbYnZjKwPJiuHhfAu8Go7Yl8BnVw9_DdYixI064lmroW8bA6PAli8hvqsY6JYU6h6KMHt9CVEJAU4KFenm6zcykkyr2u7OU23KRt0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
          <div className="absolute bottom-8 left-8 p-6 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg border border-outline-variant/15 max-w-xs">
            <div className="text-primary font-headline text-2xl mb-1">4,000+</div>
            <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Competency Ontology Nodes</div>
          </div>
        </motion.div>
      </section>

      {/* Trusted By Carousel */}
      <section className="bg-surface-container-lowest border-y border-outline-variant/10 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8 text-center">
          <span className="text-[10px] font-bold text-outline uppercase tracking-[0.3em]">Institutional Partners & Nodes</span>
        </div>
        <div className="relative flex">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 md:gap-24 items-center whitespace-nowrap"
          >
            {[...companies, ...companies].map((company, i) => (
              <div key={i} className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <company.icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-headline font-black tracking-widest text-on-surface">{company.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background overflow-hidden border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isTestimonialsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10 animate-pulse">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="w-3 h-3 bg-primary/20 rounded-full" />
                    ))}
                  </div>
                  <div className="h-4 bg-on-surface-variant/10 rounded w-full mb-3" />
                  <div className="h-4 bg-on-surface-variant/10 rounded w-5/6 mb-3" />
                  <div className="h-4 bg-on-surface-variant/10 rounded w-4/6 mb-8" />
                  <div className="flex justify-between items-end border-t border-outline-variant/10 pt-6">
                    <div className="space-y-2">
                      <div className="h-3 bg-on-surface/10 rounded w-24" />
                      <div className="h-2 bg-outline/10 rounded w-16" />
                    </div>
                    <div className="h-4 bg-primary/10 rounded w-12" />
                  </div>
                </div>
              ))
            ) : (
              testimonials.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10 relative group"
                >
                  <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-on-surface-variant italic leading-relaxed mb-8">
                    "{t.text}"
                  </p>
                  <div className="flex justify-between items-end border-t border-outline-variant/10 pt-6">
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">{t.author}</h4>
                      <p className="text-[10px] font-mono text-outline uppercase tracking-widest">{t.role}</p>
                    </div>
                    <div className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10">
                      {t.score}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Triple-Threat Scoring Section / Scores from /docs */}
      <section className="bg-surface-container-low py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Protocol Verification</span>
                <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">The Core <span className="italic text-primary">Trinity</span> Metrics</h2>
                <p className="text-on-surface-variant leading-relaxed text-lg font-body">
                  We don't just measure output; we measure the architecture of intelligence. Our proprietary algorithm weights cross-functional metrics to determine institutional grade.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: ShieldCheck, label: "AICI™ Competency", val: "94.2", desc: "Foundational literacy & strategic logic.", link: "/docs#aici-section" },
                  { icon: Network, label: "AIOI™ Orchestration", val: "91.8", desc: "Multi-agent workflow command.", link: "/docs#aioi-section" },
                  { icon: Terminal, label: "AIBS™ Builder", val: "L4", desc: "Technical mastery & RAG architecture.", link: "/docs#aibs-section" },
                  { icon: Brain, label: "Cognitive Integrity", val: "0.98", desc: "Sovereign agency under friction.", link: "/docs#integrity-section" }
                ].map((item, i) => (
                  <Link key={i} to={item.link}>
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="p-6 bg-surface-container-high rounded-xl border border-outline-variant/10 cursor-pointer hover:shadow-lg hover:shadow-primary/5 transition-all h-full"
                    >
                      <item.icon className="w-6 h-6 text-primary mb-3" />
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-secondary">{item.label}</h4>
                        <span className="text-sm font-bold text-primary">{item.val}</span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.01 }}
              viewport={{ once: true }}
              className="bg-surface p-8 md:p-12 rounded-3xl border border-outline-variant/10 shadow-2xl relative overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#775a19_1px,transparent_1px)] [background-size:30px_30px]"></div>
              <div className="aspect-square w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={aiciRadarData}>
                    <PolarGrid stroke="#d1c5b4" strokeDasharray="3 3" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#775a19', fontSize: 10, fontWeight: 'bold' }} 
                    />
                    <RadarArea 
                      name="Score" 
                      dataKey="A" 
                      stroke="#775a19" 
                      fill="#775a19" 
                      fillOpacity={0.4} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Verification Engine</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grit Heatmap & Sovereign Passport from /learners */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 block">Personal Agency</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">The Sovereign <span className="italic text-primary">Identity</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {isHeatmapLoading ? (
              <>
                <div className="md:col-span-7 bg-surface-container-low p-8 md:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-xl animate-pulse flex flex-col justify-between h-full">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-12 rounded-xl bg-on-surface/5" />
                      <div className="text-right space-y-2">
                        <div className="h-2 bg-primary/10 rounded w-20 ml-auto" />
                        <div className="h-3 bg-on-surface/5 rounded w-24 ml-auto" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-8 bg-on-surface/5 rounded w-48" />
                      <div className="h-4 bg-on-surface/5 rounded w-full" />
                      <div className="h-4 bg-on-surface/5 rounded w-5/6" />
                    </div>
                    <div className="grid grid-cols-12 gap-2 pt-6">
                      {Array.from({ length: 72 }).map((_, i) => (
                        <div key={i} className="aspect-square rounded-sm bg-primary/5" />
                      ))}
                    </div>
                  </div>
                  <div className="pt-10 flex justify-between items-end">
                    <div className="space-y-2">
                      <div className="h-2 bg-primary/10 rounded w-24" />
                      <div className="h-8 bg-on-surface/5 rounded w-16" />
                    </div>
                    <div className="h-4 bg-on-surface/5 rounded w-32" />
                  </div>
                </div>
                <div className="md:col-span-5 bg-[#485e8b]/20 p-8 md:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-xl animate-pulse flex flex-col justify-between h-full">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-on-surface/5" />
                      <div className="h-8 bg-on-surface/5 rounded w-48" />
                    </div>
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center bg-on-surface/5 p-4 rounded-xl">
                          <div className="space-y-2">
                            <div className="h-2 bg-on-surface/10 rounded w-16" />
                            <div className="h-4 bg-on-surface/10 rounded w-24" />
                          </div>
                          <div className="h-3 bg-on-surface/10 rounded w-12" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-12 bg-on-surface/5 rounded-xl w-full" />
                </div>
              </>
            ) : (
              <>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  viewport={{ once: true }}
                  className="md:col-span-7 bg-surface-container-low p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between border border-outline-variant/10 shadow-xl transition-all duration-500"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
                        <BarChart3 className="text-primary w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">Grit Heatmap</div>
                        <div className="text-xs font-mono font-bold text-on-surface">NODE_ALPHA_7</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-headline text-3xl font-bold text-on-surface mb-2 tracking-tight">Cognitive Consistency</h3>
                      <p className="text-on-surface-variant font-light text-base">Mathematical mapping of performance resilience over 72-hour adversarial cycles.</p>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-2 pt-6">
                      {Array.from({ length: 72 }).map((_, i) => {
                        const intensity = (0.2 + (Math.sin(i * 0.5) + 1) * 0.4).toFixed(2);
                        return (
                          <div 
                            key={i} 
                            className={cn(
                              "aspect-square rounded-sm transition-all duration-300",
                              parseFloat(intensity) > 0.8 ? "bg-primary" : 
                              parseFloat(intensity) > 0.5 ? "bg-[#485e8b] opacity-90" : 
                              parseFloat(intensity) > 0.3 ? "bg-primary/40" : "bg-primary/10"
                            )}
                          />
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="pt-10 flex flex-wrap justify-between items-end gap-6 text-[10px] font-mono uppercase font-bold tracking-widest text-secondary">
                    <div className="space-y-1">
                      <div className="text-primary mb-1">Retention Integrity</div>
                      <div className="text-2xl font-headline text-on-surface tracking-tighter">84.2%</div>
                    </div>
                    <div className="text-right max-w-[200px] leading-relaxed opacity-60">
                      *Skill decay calculated in real-time. Metabolic cooling active.
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-5 bg-[#485e8b] p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between border border-white/10 relative overflow-hidden group text-white shadow-2xl transition-all duration-500"
                >
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] mix-blend-overlay"></div>
                  
                  <div className="space-y-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <Badge className="text-primary-container w-6 h-6" />
                      </div>
                      <h3 className="font-headline text-3xl font-bold tracking-tight">Sovereign Passport</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { label: "Trust Score", value: "0.98 ALPHA", status: "VERIFIED" },
                        { label: "Global Rank", value: "TOP 2% PEER", status: "LIFTED" },
                        { label: "Auth Key", value: "RSA_4096_S_7", status: "SECURE" }
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-inner">
                          <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">{row.label}</span>
                          <span className="font-mono text-xs font-bold text-white tracking-tight">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-10 space-y-6 relative z-10">
                    <p className="text-sm italic text-white font-medium leading-relaxed opacity-80">
                      Forensic proof of performance, cryptographically bound and redacted by default for radical privacy.
                    </p>
                    <Link to="/learners" className="w-full py-4 bg-white text-[#485e8b] font-bold rounded-2xl flex justify-center items-center gap-2 hover:scale-[1.02] transition-all shadow-xl">
                      Explore Passport <LinkIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Tenured Leaderboard / The Human Moat Section */}
      <section id="leaderboard-section" className="py-16 md:py-24 px-6 md:px-8 bg-background relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4 text-left">
                <span className="font-label uppercase tracking-[0.2em] text-[10px] text-primary font-bold">The Collective Ledger</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
                  The <span className="italic text-primary">Tenured</span> Leaderboard
                </h2>
                <p className="text-lg text-on-surface-variant leading-relaxed font-body">
                  Professional credibility is no longer static. Our real-time leaderboard tracks participants who have demonstrated the highest levels of technical agility and adversarial resilience across the Sovereign AI economy.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "Immutable Reputation", desc: "Every point is backed by a verified telemetry event on the Sovereign Ledger." },
                  { label: "Adversarial Proof", desc: "Top nodes have successfully navigated shadow-docker sandbox drills." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">{feature.label}</h4>
                      <p className="text-sm text-on-surface-variant">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6">
                <Link
                  to="/leaderboard"
                  className="px-8 py-3 rounded-xl border border-primary/20 text-xs font-mono font-black uppercase tracking-[0.25em] text-primary hover:bg-primary/5 transition-all group inline-flex items-center gap-3"
                >
                  <span>Verification Protocols</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div>
              <TenuredLeaderboard />
            </div>
          </div>
        </div>
      </section>

      {/* Platform Architecture */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20 space-y-4">
            <span className="font-label uppercase tracking-widest text-[10px] text-primary font-bold">System Architecture</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">The Intelligence OS</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">A modular, secure, and connectionist architecture built to evolve with the AI economy.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Core Orchestrator", desc: "The 'Brain' of the platform. Directs specialized sub-agents (Tutors, Feedback, Analytics) for a seamless, AI-native journey." },
              { icon: Database, title: "Sovereign Ledger", desc: "The 'Memory'. Immutable telemetry tracking friction events and competencies across a 4,000-node hashed ontology." },
              { icon: Lock, title: "Governance Shell", desc: "Human-in-the-loop controls. Explicit explainability and risk-tier autonomy limits for responsible institutional AI." },
              { icon: RefreshCw, title: "Enterprise Sync", desc: "Seamless LMS and HRIS integration to provide a unified view of workforce maturity and identity recovery." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/15 hover:border-primary/30 hover:bg-surface-container-high hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-headline font-bold text-xl mb-3">{item.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dividend Engine Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-surface-container-lowest overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline font-bold">The 40/40/20 <br/> Dividend Engine</h2>
              <p className="text-on-surface-variant leading-relaxed text-lg">Our connectionist model ensures that intelligence output is equitably distributed across the three pillars of institutional power.</p>
            </div>
            <div className="space-y-8">
              {[
                { pct: "40%", title: "Institution", desc: "Capital reserves and operational reinvestment for platform longevity." },
                { pct: "40%", title: "User", desc: "Direct profit-sharing and governance weight for platform participants." },
                { pct: "20%", title: "State", desc: "Social dividend for public infrastructure and community resilience." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="text-4xl font-headline text-primary opacity-30 group-hover:opacity-100 transition-opacity">{item.pct}</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-on-surface-variant text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px] relative">
              <div className="absolute inset-0 border-[20px] sm:border-[30px] md:border-[40px] border-surface-container-high rounded-full"></div>
              <div className="absolute inset-0 border-[20px] sm:border-[30px] md:border-[40px] border-primary rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 90%, 50% 50%)' }}></div>
              <div className="absolute inset-0 border-[20px] sm:border-[30px] md:border-[40px] border-primary-container rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%, 50% 50%)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-surface-container-lowest rounded-full editorial-shadow flex items-center justify-center">
                  <Landmark className="text-primary w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sovereign Proof / Stats Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
            {[
              { value: "98.4%", label: "Verification Accuracy", desc: "Across 1.2M adversarial stress tests." },
              { value: "400k+", label: "Sovereign Identities", desc: "Verified professional nodes on the ledger." },
              { value: "$2.4B", label: "Dividend Settlement", desc: "Automated fiscal distribution via 40/40/20." }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="text-5xl md:text-6xl font-headline font-bold text-primary tracking-tighter">{stat.value}</div>
                <div className="space-y-2">
                  <h4 className="font-label text-xs uppercase tracking-[0.2em] font-bold text-on-surface">{stat.label}</h4>
                  <p className="text-sm text-on-surface-variant max-w-[200px] mx-auto">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-tertiary/10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* Pricing Section from Pricing.tsx */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="font-label text-xs tracking-[0.3em] text-primary uppercase font-bold block">Pricing Strategy</span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
              Pay for <span className="italic text-primary">Proven Capability.</span>
            </h2>
            
            <div className="flex justify-center items-center gap-4 pt-8">
              <span className={cn("text-[10px] font-bold uppercase tracking-widest transition-colors", billingCycle === 'monthly' ? "text-on-surface" : "text-outline")}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                className="w-10 h-5 bg-surface-container-highest rounded-full relative p-1 transition-colors"
              >
                <div className={cn("w-3 h-3 bg-primary rounded-full transition-transform", billingCycle === 'annual' ? "translate-x-5" : "translate-x-0")} />
              </button>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest transition-colors", billingCycle === 'annual' ? "text-on-surface" : "text-outline")}>
                Annual <span className="text-[10px] text-primary ml-1">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {individualPlans.map((plan, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={cn(
                  "p-8 md:p-10 rounded-3xl flex flex-col border transition-all duration-500 relative",
                  plan.highlight 
                    ? "bg-primary text-on-primary border-primary shadow-2xl scale-105 z-10 hover:shadow-primary/40" 
                    : "bg-surface-container-low border-outline-variant/15 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    ⭐ Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-headline font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-headline font-bold">${plan.price}</span>
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest", plan.highlight ? "text-primary-fixed" : "text-outline")}>
                      / {billingCycle === 'monthly' ? 'mo' : 'mo billed annually'}
                    </span>
                  </div>
                  <p className={cn("text-xs leading-relaxed", plan.highlight ? "text-on-primary/80" : "text-on-surface-variant")}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-xs">
                      <Check className={cn("w-3.5 h-3.5 mt-0.5 shrink-0", plan.highlight ? "text-on-primary" : "text-primary")} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/request-access"
                  className={cn(
                    "w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all active:scale-95 text-center shadow-lg",
                    plan.highlight 
                      ? "bg-surface-container-lowest text-primary hover:bg-white" 
                      : "bg-primary text-on-primary hover:opacity-90"
                  )}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-surface-container-highest">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-label uppercase tracking-widest text-[10px] text-primary">Security Protocol</span>
            <h2 className="text-3xl font-headline font-bold mt-2">Testing your AICI</h2>
            <p className="text-on-surface-variant mt-2 text-sm">Adversarial debugging via Shadow-Docker sandbox.</p>
          </div>
          
          <div className="bg-inverse-surface rounded-xl p-1 overflow-hidden editorial-shadow shadow-2xl">
            <div className="bg-surface-container-low/10 px-4 py-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error/40"></div>
              <div className="w-3 h-3 rounded-full bg-primary/40"></div>
              <div className="w-3 h-3 rounded-full bg-secondary-container/40"></div>
              <span className="text-[10px] font-label text-inverse-on-surface/40 ml-4">hard-gate-v4.0.1 --secure</span>
            </div>
            <div className="p-8 font-mono text-sm space-y-4">
              <div className="flex gap-4">
                <span className="text-primary opacity-50 shrink-0">01</span>
                <span className="text-inverse-on-surface/80 break-all">systemctl initialize sovereign-gate --tier executive</span>
              </div>
              <div className="flex gap-4">
                <span className="text-primary opacity-50 shrink-0">02</span>
                <span className="text-inverse-on-surface/80 break-all">evaluating local node: <span className="text-primary-container">Houston_South_04</span></span>
              </div>
              <div className="flex gap-4">
                <span className="text-primary opacity-50 shrink-0">03</span>
                <span className="text-primary font-bold">SUCCESS: Identity Verified via Sovereign Ledger.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-primary opacity-50 shrink-0">04</span>
                <span className="text-inverse-on-surface/40 animate-pulse">_</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button 
              onClick={handleDiagnosticClick}
              disabled={isDiagnosticLoading}
              className="bg-primary text-on-primary px-10 py-3 rounded-full font-label uppercase tracking-widest text-xs hover:scale-105 transition-transform border border-primary-container/20 flex items-center gap-2 disabled:opacity-70"
            >
              {isDiagnosticLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running Diagnostic...
                </>
              ) : (
                'Initiate Hard-Gate Diagnostic'
              )}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="font-label text-xs tracking-[0.3em] text-primary uppercase font-bold block">Clarification Protocols</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Frequently Asked <span className="italic text-primary">Inquiries.</span></h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={cn(
                  "rounded-2xl border transition-all duration-300 overflow-hidden",
                  openFaqIndex === i 
                    ? "bg-surface border-primary/30 shadow-lg" 
                    : "bg-surface-container-highest border-outline-variant/10 hover:border-primary/20"
                )}
              >
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className={cn(
                    "font-headline font-bold transition-colors",
                    openFaqIndex === i ? "text-primary" : "text-on-surface"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    openFaqIndex === i ? "bg-primary text-on-primary rotate-180" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary"
                  )}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-on-surface-variant text-sm leading-relaxed max-w-3xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-40 px-6 md:px-8 bg-background relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <span className="font-label text-xs tracking-[0.3em] text-primary uppercase font-bold block">Get in Touch</span>
            <h2 className="text-4xl md:text-7xl font-headline font-bold tracking-tighter">Initialize a <span className="italic text-primary">Connection.</span></h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg md:text-xl font-light">
              Ready to underwrite your institutional competence or secure your personal agency? Our tactical team is standing by.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { icon: Mail, label: "Direct Intelligence", value: "hello@tenured.ai", sub: "Operational support" },
              { icon: MessageSquare, label: "Strategic Inquiry", value: "Request Access", sub: "Priority onboarding", link: "/request-access" },
              { icon: Globe, label: "Global Presence", value: "Houston, TX", sub: "Protocol headquarters" }
            ].map((contact, i) => (
              <div key={i} className="p-8 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <contact.icon className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">{contact.label}</h4>
                {contact.link ? (
                  <Link to={contact.link} className="text-xl font-headline font-bold text-on-surface hover:text-primary transition-colors block mb-1">
                    {contact.value}
                  </Link>
                ) : (
                  <div className="text-xl font-headline font-bold text-on-surface block mb-1">{contact.value}</div>
                )}
                <p className="text-xs text-on-surface-variant italic opacity-60">{contact.sub}</p>
              </div>
            ))}
          </div>
          
          <div className="pt-12">
            <Link 
              to="/request-access"
              className="inline-flex items-center gap-3 px-12 py-5 bg-inverse-surface text-inverse-on-surface rounded-2xl font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl"
            >
              Start Onboarding Protocol <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Background Accents */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-tertiary/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 -z-10"></div>
      </section>
    </div>
  );
}
