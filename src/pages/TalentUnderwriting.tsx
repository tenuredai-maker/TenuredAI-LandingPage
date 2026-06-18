import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { 
  Terminal, 
  Shield,
  Brain,
  RefreshCw,
  Activity,
  Fingerprint,
  Zap,
  AlertTriangle,
  Settings,
  Globe,
  Mail,
  X,
  CheckCircle2,
  Search,
  ChevronDown,
  FileBadge,
  History,
  ShieldCheck,
  Eye,
  BarChart3,
  Users,
  Code2,
  Compass,
  Wallet,
  Calculator,
  Coins,
  Timer,
  Bell, 
  LayoutGrid, 
  DollarSign, 
  ArrowRight,
  Cpu,
  BookOpen,
  Server,
  Layers,
  Radar as RadarIcon
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

const UserProfileNode = () => {
  const { user, userProfile } = useAuth();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-12 bg-surface-container-low p-10 rounded-3xl ambient-shadow border border-outline-variant/10 mt-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Fingerprint className="w-48 h-48" />
      </div>

      {!user ? (
        <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-surface-container-high flex items-center justify-center border border-outline-variant/20">
              <Users className="w-10 h-10 text-on-surface-variant/40" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase block mb-1">Identity State</span>
              <h2 className="text-3xl font-headline font-black text-on-surface-variant/60 italic">Guest Session</h2>
              <p className="text-xs text-on-surface-variant/40 font-mono mt-1">Initialize node authentication to persist underwriting data.</p>
            </div>
          </div>
          <div className="bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GUEST_READ_ONLY</span>
            </div>
            <p className="text-[10px] text-on-surface-variant max-w-[200px]">Node is operating in evaluation mode. Sign in to sync with the Sovereign Ledger.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl animate-pulse group-hover:scale-110 transition-transform"></div>
            <Users className="w-12 h-12 text-primary relative z-10" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="mb-2">
              <span className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase">Identity Verification Source</span>
              <h2 className="text-4xl font-headline font-black text-on-surface mt-1">
                {userProfile?.name || user?.displayName || 'Anonymous Identity'}
              </h2>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <div className="bg-surface-container-highest px-4 py-2 rounded-xl flex items-center gap-2 border border-outline-variant/10">
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-on-surface-variant">{userProfile?.email || user?.email || 'N/A'}</span>
              </div>
              <div className="bg-surface-container-highest px-4 py-2 rounded-xl flex items-center gap-2 border border-outline-variant/10">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-on-surface-variant">Role:</span>
                <span className="font-mono text-sm font-bold text-on-surface uppercase tracking-wider">{userProfile?.role || 'Guest Node'}</span>
              </div>
              <div className="bg-surface-container-highest px-4 py-2 rounded-xl flex items-center gap-2 border border-outline-variant/10">
                <Fingerprint className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-on-surface-variant opacity-60">ID: {user?.uid.slice(0, 12)}...</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block border-l border-outline-variant/10 pl-8 h-20">
            <div className="text-right">
              <span className="block text-[8px] font-bold text-primary-container bg-primary px-2 py-0.5 rounded-full inline-block mb-1 font-label">VERIFIED NODE</span>
              <span className="block font-mono text-[10px] text-on-surface-variant tracking-tighter opacity-50">Last Sync: {new Date().toLocaleTimeString()}</span>
              <div className="flex items-center justify-end gap-1 mt-2 text-green-500">
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                <span className="text-[10px] font-bold font-mono">CONNECTION_OPTIMAL</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Tooltip = ({ children, content }: { children: React.ReactNode; content: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-64 p-4 bg-surface-container-highest/90 backdrop-blur-xl rounded-xl ambient-shadow pointer-events-none"
          >
            <div className="relative z-10">
              {content}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-surface-container-highest/90" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MetricItem = ({ 
  icon: Icon, 
  label, 
  value, 
  description, 
  whyMatters,
  layout = "row"
}: { 
  icon: any; 
  label: string; 
  value: string; 
  description: string; 
  whyMatters: string;
  layout?: "row" | "card";
}) => (
  <Tooltip content={
    <div className="space-y-2">
      <div className="flex justify-between items-center border-b border-outline-variant/15 pb-1.5 mb-1.5">
        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.1em] font-label">{label}</span>
        <span className="font-mono text-xs font-bold">{value}</span>
      </div>
      <p className="text-[10px] text-on-surface leading-relaxed font-medium">
        {description}
      </p>
      <div className="pt-1.5 border-t border-outline-variant/15">
        <h4 className="text-[8px] font-bold text-primary uppercase tracking-[0.1em] font-label mb-1">Why this matters</h4>
        <p className="text-[9px] text-on-surface-variant leading-relaxed italic">
          {whyMatters}
        </p>
      </div>
    </div>
  }>
    <div className={`bg-surface-container-lowest rounded-2xl transition-all cursor-help group ambient-shadow hover:bg-white ${layout === 'row' ? 'p-4' : 'p-4 flex flex-col justify-between h-full'}`}>
      <div className={`flex items-center gap-2 ${layout === 'row' ? 'justify-between' : 'flex-col items-start mb-2'}`}>
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-label text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant">{label}</span>
        </div>
        <span className={`font-mono font-bold text-on-surface ${layout === 'row' ? 'text-sm' : 'text-xl mt-1'}`}>{value}</span>
      </div>
    </div>
  </Tooltip>
);

const SliderMetricItem = ({ 
  icon: Icon, 
  label, 
  value, 
  min, 
  max, 
  step, 
  unit = "",
  description, 
  whyMatters,
  status,
  onChange
}: { 
  icon: any; 
  label: string; 
  value: number; 
  min: number; 
  max: number; 
  step: number; 
  unit?: string;
  description: string; 
  whyMatters: string;
  status?: { label: string; color: string };
  onChange: (val: number) => void;
}) => (
  <Tooltip content={
    <div className="space-y-2">
      <div className="flex justify-between items-center border-b border-outline-variant/15 pb-1.5 mb-1.5">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.1em] font-label">{label}</span>
          {status && <span className={`text-[8px] font-black uppercase tracking-widest ${status.color}`}>{status.label}</span>}
        </div>
        <span className="font-mono text-xs font-bold">{value}{unit}</span>
      </div>
      <p className="text-[10px] text-on-surface leading-relaxed font-medium">
        {description}
      </p>
      <div className="pt-1.5 border-t border-outline-variant/15">
        <h4 className="text-[8px] font-bold text-primary uppercase tracking-[0.1em] font-label mb-1">Why this matters</h4>
        <p className="text-[9px] text-on-surface-variant leading-relaxed italic">
          {whyMatters}
        </p>
      </div>
    </div>
  }>
    <div className="bg-surface-container-lowest rounded-2xl p-5 transition-all group ambient-shadow hover:bg-white relative overflow-hidden">
      {status && (
        <div className={`absolute top-0 right-0 px-3 py-1 text-[8px] font-black uppercase tracking-widest ${status.color.replace('text-', 'bg-').replace('500', '500/10')} border-b border-l border-outline-variant/10 rounded-bl-xl`}>
          {status.label}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-label text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant">{label}</span>
        </div>
        <span className="font-mono font-bold text-on-surface text-sm">{value}{unit}</span>
      </div>
      <input 
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary"
      />
    </div>
  </Tooltip>
);

const RadarChartNode = ({ aici, aibs, aioi }: { aici: any, aibs: any, aioi: number }) => {
  const radarData = [
    { subject: 'Prompt Fidelity', A: Math.max(0, 100 - (aici.syncRate * 0.5)), fullMark: 100 },
    { subject: 'Latent Recall', A: Math.max(0, 100 - (aici.latentError * 50)), fullMark: 100 },
    { subject: 'Orchestration', A: aioi, fullMark: 100 },
    { subject: 'Ethical Alignment', A: 96, fullMark: 100 },
    { subject: 'Debug Speed', A: Math.max(0, 100 - (aibs.debugEfficiency * 20)), fullMark: 100 },
    { subject: 'Multi-agent Sync', A: Math.max(0, 100 - (aici.syncRate * 0.8)), fullMark: 100 },
    { subject: 'Loop Efficiency', A: aibs.codeVelocity * 100, fullMark: 100 },
    { subject: 'Context Management', A: aibs.architecture, fullMark: 100 },
    { subject: 'Strategic Routing', A: aici.stabilityTier * 10, fullMark: 100 },
    { subject: 'System Resilience', A: aici.stabilityTier * 9.5, fullMark: 100 },
    { subject: 'Vector RAG', A: aibs.architecture * 0.9, fullMark: 100 },
    { subject: 'Model Optimization', A: Math.max(0, 100 - (aici.latentError * 40)), fullMark: 100 },
    { subject: 'Schema Soundness', A: aibs.architecture * 0.95, fullMark: 100 },
    { subject: 'Deployment Velocity', A: aibs.codeVelocity * 95, fullMark: 100 },
    { subject: 'Infrastructure Integrity', A: aibs.architecture * 0.98, fullMark: 100 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="col-span-12 md:col-span-8 bg-surface-container-lowest p-8 rounded-3xl overflow-hidden relative min-h-[500px] ambient-shadow border border-outline-variant/10"
    >
      <div className="absolute top-6 left-8 z-10">
        <div className="flex items-center gap-3 mb-2">
          <RadarIcon className="w-5 h-5 text-primary" />
          <h3 className="text-2xl font-headline font-bold text-on-surface">Neural Competence Web</h3>
        </div>
        <p className="text-xs text-on-surface-variant font-mono uppercase tracking-[0.2em]">Sovereign Underwriting Visualization</p>
      </div>

      <div className="w-full h-full pt-16">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#e5e7eb" strokeOpacity={0.2} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 500 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Metrics"
              dataKey="A"
              stroke="#775a19"
              fill="#775a19"
              fillOpacity={0.25}
              animationDuration={800}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute bottom-8 right-8 text-right">
        <span className="block text-[10px] font-bold text-primary uppercase tracking-[0.1em] mb-1">Status</span>
        <span className="block font-mono text-xs text-green-500 font-bold animate-pulse">DYNAMIC_FETCH_ACTIVE</span>
      </div>
    </motion.div>
  );
};

export default function TalentUnderwriting() {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('console');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [aibs, setAibs] = useState({
    architecture: 98,
    codeVelocity: 0.94,
    debugEfficiency: 1.2
  });

  const [aici, setAici] = useState({
    latentError: 0.88,
    syncRate: 12,
    stabilityTier: 4
  });

  const [logs, setLogs] = useState<{msg: string, id: string, timestamp: number}[]>([]);
  const [lastLoggedValues, setLastLoggedValues] = useState<any>({
    architecture: 98,
    codeVelocity: 0.94,
    debugEfficiency: 1.2,
    latentError: 0.88,
    syncRate: 12,
    stabilityTier: 4
  });

  useEffect(() => {
    addLog("Command Sentinel A-101 initialized. Secure link established.");
    addLog("Neural telemetry synchronized with Sovereign Ledger.");
    addLog("Baseline attestation: Identity Hash 0x7E...4A verified.");
  }, []);

  const addLog = (message: string) => {
    const timestamp = Date.now();
    const id = `${timestamp}-${Math.random().toString(36).substring(2, 9)}`;
    setLogs(prev => [{ msg: message, id, timestamp }, ...prev].slice(0, 50));
  };

  const checkAndLog = (key: string, newValue: number, threshold: number, label: string) => {
    const diff = Math.abs(newValue - lastLoggedValues[key]);
    if (diff >= threshold) {
      const units: Record<string, string> = {
        architecture: '%',
        syncRate: 'ms',
        debugEfficiency: 'h',
        latentError: 'λ',
        stabilityTier: 'σ',
        codeVelocity: 'α'
      };
      const unit = units[key] || '';
      addLog(`[RECALIBRATION] ${label} adjusted to ${newValue}${unit} (variance: ${diff.toFixed(2)})`);
      setLastLoggedValues((prev: any) => ({ ...prev, [key]: newValue }));
    }
  };

  const calculateAibsOverall = () => {
    const nArch = aibs.architecture / 100;
    const nVelocity = aibs.codeVelocity;
    const nDebug = 1 - (aibs.debugEfficiency / 5.0); // Assuming 5h is max debug time for complex tasks
    const score = ((nArch + nVelocity + nDebug) / 3) * 100;
    return Math.round(score);
  };

  const aibsOverall = calculateAibsOverall();

  const getAibsTier = (score: number) => {
    if (score >= 95) return { label: "Tier I", sub: "Sovereign" };
    if (score >= 85) return { label: "Tier II", sub: "Elite" };
    if (score >= 70) return { label: "Tier III", sub: "Standard" };
    return { label: "Tier IV", sub: "Sub-Optimal" };
  };

  const aibsTier = getAibsTier(aibsOverall);

  const calculateAiciOverall = () => {
    const nLatent = (2 - aici.latentError) / 2;
    const nSync = (100 - aici.syncRate) / 100;
    const nStability = aici.stabilityTier / 10;
    const score = ((nLatent + nSync + nStability) / 3) * 100;
    return score;
  };

  const aiciOverallNum = calculateAiciOverall();
  const aiciOverall = aiciOverallNum.toFixed(1);

  const calculateAioiOverall = () => {
    // AIOI is a composite of AICI and AIBS
    const score = (aiciOverallNum * 0.6) + (calculateAibsOverall() * 0.4);
    return score;
  };

  const aioiOverallNum = calculateAioiOverall();
  const aioiOverall = aioiOverallNum.toFixed(1);
  
  const getArchitectureStatus = (val: number) => {
    if (val >= 90) return { label: 'Optimal', color: 'text-green-500' };
    if (val >= 75) return { label: 'Warning', color: 'text-yellow-500' };
    return { label: 'Critical', color: 'text-red-500' };
  };

  const getVelocityStatus = (val: number) => {
    if (val >= 0.8) return { label: 'Optimal', color: 'text-green-500' };
    if (val >= 0.5) return { label: 'Warning', color: 'text-yellow-500' };
    return { label: 'Critical', color: 'text-red-500' };
  };

  const getDebugStatus = (val: number) => {
    if (val <= 1.5) return { label: 'Optimal', color: 'text-green-500' };
    if (val <= 3.5) return { label: 'Warning', color: 'text-yellow-500' };
    return { label: 'Critical', color: 'text-red-500' };
  };

  const getLatentErrorStatus = (val: number) => {
    if (val <= 0.5) return { label: 'Optimal', color: 'text-green-500' };
    if (val <= 1.2) return { label: 'Warning', color: 'text-yellow-500' };
    return { label: 'Critical', color: 'text-red-500' };
  };

  const getSyncRateStatus = (val: number) => {
    if (val <= 20) return { label: 'Optimal', color: 'text-green-500' };
    if (val <= 50) return { label: 'Warning', color: 'text-yellow-500' };
    return { label: 'Critical', color: 'text-red-500' };
  };

  const getStabilityStatus = (val: number) => {
    if (val >= 8) return { label: 'Optimal', color: 'text-green-500' };
    if (val >= 5) return { label: 'Warning', color: 'text-yellow-500' };
    return { label: 'Critical', color: 'text-red-500' };
  };

  const saveResults = async () => {
    if (!user) {
      alert("Please sign in to save your results.");
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const resultsRef = collection(db, 'underwriting_results');
      await addDoc(resultsRef, {
        uid: user.uid,
        aici: aiciOverallNum,
        aioi: aioiOverallNum,
        aibs: aibsOverall,
        tier: aibsTier.label,
        timestamp: serverTimestamp()
      });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      handleFirestoreError(error, OperationType.CREATE, 'underwriting_results');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="pt-40 pb-24 px-8 max-w-[1440px] mx-auto">
      {/* Hero Section - Orchestrate View */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] text-on-surface-variant uppercase">I-100 / COMMAND CENTER</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-8xl font-headline font-black tracking-tight text-on-surface"
          >
            Orchestrate
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-container-low/50 backdrop-blur-sm border border-outline-variant/10 p-8 rounded-3xl min-w-[300px] ambient-shadow"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-4 block">SOVEREIGN DENSITY SCORE</span>
            <div className="flex items-baseline gap-2">
              <motion.span 
                key={aiciOverall}
                initial={{ opacity: 0.5, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-6xl font-headline font-black text-on-surface"
              >
                {aiciOverall}
              </motion.span>
              <span className="text-primary font-mono font-bold">σ</span>
            </div>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-12 flex justify-center">
        <div className="glass-nav p-1.5 rounded-full flex gap-1 ambient-shadow">
          {[
            { id: 'console', label: 'Command Console', icon: LayoutGrid },
            { id: 'methodology', label: 'Methodology', icon: BookOpen },
            { id: 'validator', label: 'Validator Node', icon: Server },
            { id: 'tiers', label: 'Scoring Tiers', icon: Layers },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-headline font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-on-primary shadow-lg' 
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-on-primary' : 'text-primary'}`} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'console' && (
          <motion.div 
            key="console"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-12 gap-6"
          >
            <UserProfileNode />
            {/* Index 1: AICI™ */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-7 bg-surface-container-low p-8 rounded-3xl flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-12">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Standard #001</span>
                <h2 className="text-5xl font-headline font-bold mt-2">AICI™</h2>
                <p className="text-on-surface-variant mt-1 font-mono text-sm tracking-tighter">AI Competence Index</p>
              </div>
                <div className="bg-surface-container-high px-5 py-3 rounded-2xl text-right">
                  <motion.span 
                    key={aiciOverall}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="block font-mono text-2xl font-bold text-on-surface"
                  >
                    {aiciOverall}
                  </motion.span>
                  <span className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Global Mean</span>
                </div>
              </div>
              <div className="mb-8 p-6 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest/50">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant">System Integrity</span>
                  <span className="font-mono text-sm font-bold text-primary">{aiciOverall}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <motion.div 
                    initial={false}
                    animate={{ width: `${aiciOverall}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-primary shadow-[0_0_12px_rgba(119,90,25,0.4)]"
                  />
                </div>
              </div>
              <p className="font-body text-on-surface-variant mb-8 leading-relaxed text-lg max-w-xl">
              The primary mathematical framework for underwriting technical proficiency and integration capacity within autonomous agent environments. AICI™ measures the friction between human intent and machine execution.
            </p>
            <div className="mt-8 p-6 rounded-2xl bg-primary/5">
              <h4 className="text-[10px] font-label font-bold text-primary uppercase tracking-[0.1em] mb-2">Why this matters</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed italic">
                Verifies that a candidate can translate complex business logic into machine-executable actions without friction, reducing technical debt and deployment risks.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            <SliderMetricItem 
              icon={AlertTriangle}
              label="Latent Error"
              value={aici.latentError}
              min={0}
              max={2}
              step={0.01}
              unit="λ"
              description="Mathematical variance between predicted and actual synthetic outputs."
              whyMatters="Lower latent error ensures higher reliability in autonomous decision-making loops."
              status={getLatentErrorStatus(aici.latentError)}
              onChange={(val) => {
                setAici(prev => ({ ...prev, latentError: val }));
                checkAndLog('latentError', val, 0.2, 'AICI Latent Error');
              }}
            />
            <SliderMetricItem 
              icon={RefreshCw}
              label="Sync Rate"
              value={aici.syncRate}
              min={1}
              max={100}
              step={1}
              unit="ms"
              description="The speed at which human intent is synchronized with machine execution."
              whyMatters="Faster sync rates reduce cognitive load and improve real-time collaboration efficiency."
              status={getSyncRateStatus(aici.syncRate)}
              onChange={(val) => {
                setAici(prev => ({ ...prev, syncRate: val }));
                checkAndLog('syncRate', val, 10, 'AICI Sync Rate');
              }}
            />
            <SliderMetricItem 
              icon={ShieldCheck}
              label="Stability Tier"
              value={aici.stabilityTier}
              min={1}
              max={10}
              step={1}
              unit="σ"
              description="A classification of the node's resistance to semantic drift and adversarial noise."
              whyMatters="Higher stability tiers are required for institutional-grade financial and security operations."
              status={getStabilityStatus(aici.stabilityTier)}
              onChange={(val) => {
                setAici(prev => ({ ...prev, stabilityTier: val }));
                checkAndLog('stabilityTier', val, 1, 'AICI Stability Tier');
              }}
            />
          </div>
        </motion.div>

        {/* CTA: Diagnostic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="col-span-12 md:col-span-5 gold-gradient p-10 rounded-3xl flex flex-col justify-center items-center text-center relative overflow-hidden group ambient-shadow"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
          <Brain className="text-on-primary w-14 h-14 mb-6" />
          <h3 className="text-3xl font-headline font-bold text-on-primary mb-4">Initialize Baseline Diagnostic</h3>
          <p className="text-on-primary/90 mb-10 max-w-xs text-base leading-relaxed">
            Begin the secure underwriting process for individual or institutional node integration.
          </p>
          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/request-access')}
            className="w-full bg-white text-on-surface py-5 rounded-xl font-bold tracking-tight ambient-shadow text-lg"
          >
            REQUEST ACCESS
          </motion.button>
        </motion.div>

        {/* Index 2: AIOI™ */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-5 lg:col-span-4 bg-surface-container-high p-8 sm:p-10 rounded-3xl flex flex-col"
        >
          <div className="mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Registry #042</span>
            <h2 className="text-4xl font-headline font-bold mt-2">AIOI™</h2>
            <p className="text-on-surface-variant font-mono text-xs">AI Orchestrator Index (Dynamic Composite)</p>
          </div>

          <div className="space-y-8 flex-1">
            <div className="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileBadge className="w-12 h-12 text-primary" />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-label text-xs font-bold uppercase tracking-widest text-on-surface">AIOI-ED™</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                </div>
                <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase shadow-sm">ELITE CERTIFIED</span>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant">Orchestration Fidelity</span>
                  <span className="font-mono text-sm font-bold text-primary">{aioiOverall}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <motion.div 
                    initial={false}
                    animate={{ width: `${aioiOverall}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-container-high/30 p-3 rounded-xl">
                  <span className="block text-[9px] font-label uppercase tracking-tighter text-on-surface-variant">Workflow Density</span>
                  <span className="block font-mono text-sm font-bold text-on-surface">0.882ω</span>
                </div>
                <div className="bg-surface-container-high/30 p-3 rounded-xl">
                  <span className="block text-[9px] font-label uppercase tracking-tighter text-on-surface-variant">Agent Stability</span>
                  <span className="block font-mono text-sm font-bold text-on-surface">σ-Elite</span>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed font-body italic mb-4">
                Highest-tier Orchestrator Designation for high-fidelity management of complex neural agent swarms.
              </p>

              <div className="pt-4 border-t border-outline-variant/10">
                <h4 className="text-[9px] font-label font-bold text-primary uppercase tracking-[0.1em] mb-2">Why this matters</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed italic">
                  Demonstrates capability in managing AI-driven educational platforms, ensuring data privacy and effective pedagogical outcomes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4">
              <MetricItem 
                icon={Brain}
                label="Systemic Orchestration"
                value="0.992"
                description="The capacity of the node to manage multiple concurrent agentic workflows without collision."
                whyMatters="High orchestration capacity allows for the scaling of complex autonomous operations."
                layout="row"
              />
              <MetricItem 
                icon={Compass}
                label="Workflow Fidelity"
                value="-0.04%"
                description="The rate at which orchestrated workflows deviate from the defined operational parameters."
                whyMatters="Minimal fidelity loss is critical for maintaining institutional governance over agent swarms."
                layout="row"
              />
            </div>

            <div className="p-6 rounded-2xl bg-primary/5">
              <h4 className="text-[10px] font-label font-bold text-primary uppercase tracking-[0.1em] mb-2">Why this matters</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed italic">
                Identifies "Orchestrators"—individuals capable of governing and scaling complex AI agent ecosystems, ensuring operational integrity.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Visualization / Graphic replaced with Radar Chart */}
        <RadarChartNode aici={aici} aibs={aibs} aioi={aioiOverallNum} />

        {/* Index 3: AIBS™ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-6 bg-surface-container-high p-10 rounded-3xl"
        >
          <div className="flex flex-col lg:flex-row items-start gap-10 mb-10">
            <div className="flex-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Protocol #009</span>
              <h2 className="text-4xl font-headline font-bold mt-2">AIBS™</h2>
              <p className="text-on-surface-variant font-mono text-xs mb-6">AI Builder Score</p>
              <p className="text-lg text-on-surface-variant leading-relaxed font-body">
                Quantifying technical proficiency in architectural design, code generation, and complex system building within AI-native environments.
              </p>
              <div className="mt-8 p-6 rounded-2xl bg-primary/5">
                <h4 className="text-[10px] font-label font-bold text-primary uppercase tracking-[0.1em] mb-2">Why this matters</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed italic">
                  Ensures that elite technical talent can build robust, scalable, and secure AI-driven applications with mathematical precision.
                </p>
              </div>
            </div>
            <div className="w-40 h-40 rounded-full border-[12px] border-primary-container flex items-center justify-center text-center p-6 bg-surface-container-lowest ambient-shadow shrink-0 relative">
              <motion.div 
                key={aibsOverall}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="z-10"
              >
                <span className="block font-mono text-3xl font-bold">{aibsOverall}%</span>
                <span className="block font-label text-[10px] uppercase tracking-widest text-primary font-bold">{aibsTier.label}</span>
                <span className="block font-label text-[8px] uppercase tracking-tighter text-on-surface-variant">{aibsTier.sub}</span>
              </motion.div>
              {/* Progress Ring Background */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="68"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-surface-container-high"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="68"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeDasharray={427.25}
                  animate={{ strokeDashoffset: 427.25 - (427.25 * aibsOverall) / 100 }}
                  className="text-primary"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <SliderMetricItem 
              icon={Activity}
              label="Architecture Precision"
              value={aibs.architecture}
              min={0}
              max={100}
              step={1}
              unit="%"
              description="The accuracy of system architectural design and component integration."
              whyMatters="High precision in architecture prevents technical debt and ensures long-term scalability."
              status={getArchitectureStatus(aibs.architecture)}
              onChange={(val) => {
                setAibs(prev => ({ ...prev, architecture: val }));
                checkAndLog('architecture', val, 5, 'AIBS Architecture');
              }}
            />
            <SliderMetricItem 
              icon={Timer}
              label="Code Velocity"
              value={aibs.codeVelocity}
              min={0}
              max={1}
              step={0.01}
              description="The speed of high-quality code generation and deployment cycles."
              whyMatters="Velocity is critical for maintaining competitive advantage in rapidly evolving AI markets."
              status={getVelocityStatus(aibs.codeVelocity)}
              onChange={(val) => {
                setAibs(prev => ({ ...prev, codeVelocity: val }));
                checkAndLog('codeVelocity', val, 0.1, 'AIBS Code Velocity');
              }}
            />
            <SliderMetricItem 
              icon={Zap}
              label="Debug Efficiency"
              value={aibs.debugEfficiency}
              min={0.1}
              max={5}
              step={0.1}
              unit="h"
              description="The time required to identify and resolve complex logical errors in AI-generated code."
              whyMatters="Efficient debugging reduces downtime and ensures the reliability of mission-critical systems."
              status={getDebugStatus(aibs.debugEfficiency)}
              onChange={(val) => {
                setAibs(prev => ({ ...prev, debugEfficiency: val }));
                checkAndLog('debugEfficiency', val, 0.5, 'AIBS Debug Efficiency');
              }}
            />
          </div>
        </motion.div>

        {/* Secondary CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-6 bg-surface-container rounded-3xl flex flex-col overflow-hidden group ambient-shadow"
        >
          <div className="p-10 flex flex-col justify-between items-start flex-1">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Wallet className="w-6 h-6 text-primary" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary font-bold">Audit Protocol</span>
              </div>
              <h3 className="text-3xl font-headline font-bold mb-3">Financial Governance</h3>
              <p className="text-base text-on-surface-variant mb-8 leading-relaxed font-body">
                Access institutional audit logs and dividend distribution schedules for sovereign nodes. Monitor real-time yield and compliance metrics through our secure ledger.
              </p>
            </div>
            
            <div className="w-full h-56 relative overflow-hidden rounded-2xl mb-8">
              <img 
                src="https://picsum.photos/seed/wallstreet/1200/400" 
                alt="Financial Governance"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-700" />
            </div>

            <motion.button 
              whileHover={{ x: 12 }}
              onClick={saveResults}
              disabled={isSaving}
              className={`group/btn flex items-center gap-5 font-headline font-bold text-xl transition-all ${isSaving ? 'opacity-50 cursor-not-allowed' : 'text-primary'}`}
            >
              {isSaving ? 'Saving...' : saveStatus === 'success' ? 'Results Saved' : 'Review Institutional Dividend'}
              <ArrowRight className={`w-6 h-6 group-hover/btn:translate-x-3 transition-transform ${saveStatus === 'success' ? 'text-green-500' : ''}`} />
            </motion.button>
          </div>
        </motion.div>

        {/* AIBS Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-12 bg-black rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Terminal className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-white tracking-tight">AIBS™ System Log</h3>
            </div>
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
              Node_X9 Real-time Stream
            </div>
          </div>

          <div className="h-48 overflow-y-auto space-y-2 font-mono text-xs custom-scrollbar">
            <AnimatePresence initial={false}>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-4 text-white/70"
                  >
                    <span className="text-white/20 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className="text-primary italic animate-pulse-slow shrink-0">&gt;</span>
                    <span className="leading-relaxed">{log.msg}</span>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-white/20 italic">
                  Awaiting system interaction...
                </div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </motion.div>
      </motion.div>
    )}

    {activeTab === 'methodology' && (
      <motion.div 
        key="methodology"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AICI™ Logic", 
              desc: "Measures the entropy between human prompt engineering and model response fidelity. High scores indicate a node's ability to minimize 'hallucination drift' in autonomous loops.",
              metrics: ["Prompt Entropy", "Response Fidelity", "Context Retention"]
            },
            { 
              title: "AIOI™ Orchestration", 
              desc: "Quantifies the capacity for multi-agent governance. It benchmarks the node's ability to synchronize heterogeneous neural swarms without systemic collision.",
              metrics: ["Swarm Sync", "Agent Collision Rate", "Governance Latency"]
            },
            { 
              title: "AIBS™ Construction", 
              desc: "A forensic audit of code-level construction. It evaluates the structural integrity of AI-native architectures and the node's efficiency in debugging synthetic logic.",
              metrics: ["Structural Integrity", "Synthetic Debug Rate", "Architecture Depth"]
            }
          ].map((item, i) => (
            <div key={i} className="bg-surface-container-low p-8 rounded-3xl ambient-shadow">
              <h3 className="text-2xl font-headline font-bold mb-4 text-primary">{item.title}</h3>
              <p className="text-on-surface-variant mb-6 leading-relaxed">{item.desc}</p>
              <div className="space-y-3">
                {item.metrics.map((m, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )}

    {activeTab === 'validator' && (
      <motion.div 
        key="validator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-surface-container-high p-10 rounded-3xl ambient-shadow">
          <div className="flex items-center gap-4 mb-8">
            <Server className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-headline font-bold">Node Requirements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold mb-4">Hardware Baseline</h4>
              <ul className="space-y-4">
                <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Neural Engine</span>
                  <span className="font-mono font-bold">M3 Ultra / RTX 6000</span>
                </li>
                <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Memory Bandwidth</span>
                  <span className="font-mono font-bold">800 GB/s min</span>
                </li>
                <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Local Storage</span>
                  <span className="font-mono font-bold">2TB NVMe Gen5</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold mb-4">Software Stack</h4>
              <ul className="space-y-4">
                <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Kernel</span>
                  <span className="font-mono font-bold">SovereignOS v2.4</span>
                </li>
                <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Sync Protocol</span>
                  <span className="font-mono font-bold">gRPC / Web3-Auth</span>
                </li>
                <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Encryption</span>
                  <span className="font-mono font-bold">AES-256-GCM</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 p-6 bg-primary text-on-primary rounded-2xl flex items-center justify-between">
            <div>
              <h3 className="text-xl font-headline font-bold">Ready to Validate?</h3>
              <p className="opacity-80 text-sm">Download the node initialization package.</p>
            </div>
            <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
              Get SDK
            </button>
          </div>
        </div>
      </motion.div>
    )}

    {activeTab === 'tiers' && (
      <motion.div 
        key="tiers"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-5xl mx-auto"
      >
        <div className="overflow-hidden rounded-3xl ambient-shadow bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high">
                <th className="p-6 font-headline font-bold text-primary">Classification</th>
                <th className="p-6 font-headline font-bold text-primary">Score Range</th>
                <th className="p-6 font-headline font-bold text-primary">Privileges</th>
                <th className="p-6 font-headline font-bold text-primary">Audit Frequency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {[
                { tier: "Tier I: Sovereign", range: "95% - 100%", priv: "Full Autonomous Governance", audit: "Real-time" },
                { tier: "Tier II: Elite", range: "85% - 94%", priv: "Multi-Agent Orchestration", audit: "Daily" },
                { tier: "Tier III: Standard", range: "70% - 84%", priv: "Guided Agent Integration", audit: "Weekly" },
                { tier: "Tier IV: Sub-Optimal", range: "< 70%", priv: "Restricted Sandbox Access", audit: "On-demand" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-highest transition-colors">
                  <td className="p-6 font-bold">{row.tier}</td>
                  <td className="p-6 font-mono text-sm">{row.range}</td>
                  <td className="p-6 text-on-surface-variant">{row.priv}</td>
                  <td className="p-6 text-on-surface-variant">{row.audit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

      {/* Footer Stats Section */}
      <div className="mt-24 pt-12 border-t border-outline-variant/30 grid grid-cols-2 md:grid-cols-4 gap-8">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="block text-on-surface-variant font-label text-[10px] uppercase tracking-[0.2em] mb-2">Underwritten Volume</span>
          <span className="font-mono text-2xl font-medium">$4.2T α</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <span className="block text-on-surface-variant font-label text-[10px] uppercase tracking-[0.2em] mb-2">Active Educators</span>
          <span className="font-mono text-2xl font-medium">12,804</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <span className="block text-on-surface-variant font-label text-[10px] uppercase tracking-[0.2em] mb-2">System Uptime</span>
          <span className="font-mono text-2xl font-medium">99.999%</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <span className="block text-on-surface-variant font-label text-[10px] uppercase tracking-[0.2em] mb-2">Node Stability</span>
          <span className="font-mono text-2xl font-medium text-primary">OPTIMAL</span>
        </motion.div>
      </div>
    </main>
  );
}
