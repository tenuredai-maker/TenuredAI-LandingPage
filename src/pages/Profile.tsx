import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User as UserIcon, 
  Settings, 
  Shield, 
  Activity, 
  LogOut, 
  Camera, 
  Mail, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Database,
  Loader2,
  Share2,
  X,
  Copy,
  Check
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../context/AuthContext';
import { logout, uploadAvatar } from '../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import ProfileCompletion from '../components/ProfileCompletion';
import ReputationBadges from '../components/ReputationBadges';
import LatestMilestones from '../components/LatestMilestones';
import TenuredPointsWidget from '../components/TenuredPointsWidget';
import RecentActivityWidget from '../components/RecentActivityWidget';
import PointsDistributionChart from '../components/PointsDistributionChart';
import NotificationSettings from '../components/NotificationSettings';
import TargetGoalWidget from '../components/TargetGoalWidget';
import ReputationGrowthChart from '../components/ReputationGrowthChart';
import SkillTreeProgress from '../components/SkillTreeProgress';
import SkillRadarChart from '../components/SkillRadarChart';
import ReputationVisualization from '../components/ReputationVisualization';
import EndorsementFeature from '../components/EndorsementFeature';
import Certifications from '../components/Certifications';
import ActivityStream from '../components/ActivityStream';
import CommunityLeaderboard from '../components/CommunityLeaderboard';
import RewardSummary, { Reward } from '../components/RewardSummary';
import PortfolioPrintView from '../components/PortfolioPrintView';
import SocialProofSidebar from '../components/SocialProofSidebar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  ShieldCheck, 
  Cpu, 
  History, 
  MapPin, 
  UserCircle,
  Zap,
  FileText
} from 'lucide-react';

export default function Profile() {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyRefCode = () => {
    if (!user) return;
    navigator.clipboard.writeText(user.uid).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Reward Summary State
  const [showRewards, setShowRewards] = useState(false);
  const [currentRewards, setCurrentRewards] = useState<Reward[]>([]);
  const prevBadgesRef = useRef<string[]>([]);
  const isInitialMount = useRef(true);
  
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPortfolio = async () => {
    if (!pdfRef.current) return;
    try {
      setIsGeneratingPdf(true);
      
      const element = pdfRef.current;
      element.style.left = '0';
      element.style.top = '0';
      element.style.zIndex = '-9999';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      element.style.left = '-9999px';

      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (contentHeight * pdfWidth) / contentWidth;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${user?.displayName?.replace(/\s+/g, '_') || 'portfolio'}_tenured.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const calculateBadges = (profile: any) => {
    return [
      { id: 'name', label: 'Cognitive ID', isUnlocked: !!profile?.displayName && profile.displayName !== 'Sovereign Citizen', icon: UserCircle },
      { id: 'photo', label: 'Visual Anchor', isUnlocked: !!profile?.photoURL, icon: ShieldCheck },
      { id: 'bio', label: 'Intel Architect', isUnlocked: !!profile?.bio, icon: History },
      { id: 'skills', label: 'Core Logic', isUnlocked: Array.isArray(profile?.skills) && profile.skills.length > 0, icon: Cpu },
      { id: 'location', label: 'Node Sovereign', isUnlocked: !!profile?.location, icon: MapPin },
    ];
  };

  useEffect(() => {
    if (loading || !userProfile) return;

    const currentBadges = calculateBadges(userProfile);
    const unlockedIds = currentBadges.filter(b => b.isUnlocked).map(b => b.id);

    if (isInitialMount.current) {
      prevBadgesRef.current = unlockedIds;
      isInitialMount.current = false;
      return;
    }

    const newBadges = currentBadges.filter(b => b.isUnlocked && !prevBadgesRef.current.includes(b.id));

    if (newBadges.length > 0) {
      const rewards: Reward[] = newBadges.map(b => ({
        type: 'badge',
        label: b.label,
        icon: b.icon
      }));

      // Grant points for each badge (100 points per badge)
      // This is conceptual since the server-side grant already happened or will happen
      // But we can show it in the summary
      newBadges.forEach((b) => {
        rewards.push({
          type: 'points',
          label: 'Merit Recognition',
          value: 100,
          icon: Zap
        });

        const badgeEvent = new CustomEvent('tenured-notification', {
          detail: {
            title: 'Badge Unlocked',
            message: `You earned the ${b.label} badge!`,
            type: 'achievement',
            actionUrl: '/profile'
          }
        });
        window.dispatchEvent(badgeEvent);
      });

      setCurrentRewards(rewards);
      setShowRewards(true);
      prevBadgesRef.current = unlockedIds;
    }
  }, [userProfile, loading]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      setUploadError('Identity verification requires a visual image file (base format: JPEG/PNG).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Identity hash exceeds maximum allowed payload (2MB limit).');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      await uploadAvatar(file);
    } catch (error: any) {
      console.error("Upload failed:", error);
      setUploadError(error.message || 'Failed to sync visual identity hash.');
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-xs font-mono font-bold text-on-surface-variant animate-pulse uppercase tracking-widest">
            Synchronizing Sovereign Data...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center space-y-6 max-w-sm">
          <div className="w-16 h-16 bg-error/10 rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-error" />
          </div>
          <h2 className="text-2xl font-headline font-bold text-on-surface">Identity Required</h2>
          <p className="text-on-surface-variant text-sm font-body">You must authenticate via the Identity Portal before accessing your personal ledger data.</p>
          <Link 
            to="/login"
            className="block w-full py-4 bg-primary text-on-primary rounded-xl font-bold uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
          >
            Authenticate Now
          </Link>
        </div>
      </div>
    );
  }

  const profileData = userProfile || {
    displayName: user.displayName || 'Sovereign Citizen',
    email: user.email,
    photoURL: user.photoURL,
    role: 'Alpha Contributor'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background relative overflow-hidden">
      {/* Background Layering */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 relative z-10"
      >
        <PortfolioPrintView ref={pdfRef} user={user} profileData={profileData} />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-headline font-black text-on-surface tracking-tight">Sovereign Identity</h1>
            <p className="text-on-surface-variant font-mono text-xs uppercase tracking-widest mt-1">Decentralized Trust Network</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={copyRefCode}
              className={cn("flex items-center gap-2 py-3 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all text-xs font-mono font-bold uppercase tracking-widest shadow-sm border border-outline-variant/10", copied ? "bg-primary/10 text-primary" : "bg-surface-container-highest text-on-surface")}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
            <button 
              onClick={() => setShowShareDialog(true)}
              className="flex items-center gap-2 bg-surface-container-highest text-on-surface py-3 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all text-xs font-mono font-bold uppercase tracking-widest shadow-sm border border-outline-variant/10"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button 
              onClick={handleDownloadPortfolio}
              disabled={isGeneratingPdf}
              className="flex items-center gap-2 bg-primary text-on-primary py-3 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all text-xs font-mono font-bold uppercase tracking-widest disabled:opacity-50 shadow-lg shadow-primary/20"
            >
              {isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              {isGeneratingPdf ? 'Generating...' : 'Download Portfolio'}
            </button>
          </div>
        </div>

        <RewardSummary 
          rewards={currentRewards} 
          isOpen={showRewards} 
          onClose={() => setShowRewards(false)} 
        />
        <ProfileCompletion profile={profileData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar / Core Identity */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              variants={sidebarVariants}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20" />
              
              <div className="relative inline-block group mb-6">
                <div className="w-32 h-32 rounded-[2rem] bg-surface-container-high border-4 border-surface-container-lowest shadow-2xl overflow-hidden mb-1 ring-1 ring-outline-variant/10 relative">
                  {profileData.photoURL ? (
                    <img src={profileData.photoURL} alt={profileData.displayName} className={cn("w-full h-full object-cover transition-opacity", isUploading && "opacity-50")} referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserIcon className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                      <Loader2 className="w-8 h-8 text-on-primary animate-spin" />
                    </div>
                  )}
                </div>
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-1 right-1 w-10 h-10 bg-on-surface text-surface rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform group-hover:bg-primary group-hover:text-on-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {uploadError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 p-3 bg-error/5 border border-error/20 rounded-xl"
                >
                  <p className="text-[10px] text-error font-mono font-bold uppercase leading-tight">
                    Audit Error: {uploadError}
                  </p>
                </motion.div>
              )}

              <h2 className="text-2xl font-headline font-black text-on-surface tracking-tighter leading-tight">
                {profileData.displayName}
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">
                  {profileData.role}
                </span>
                <span className="text-[10px] font-mono font-bold bg-secondary/10 text-secondary px-3 py-1 rounded-full uppercase tracking-widest border border-secondary/20">
                  Verified
                </span>
              </div>

              <div className="mt-8 space-y-4 text-left">
                <div className="flex items-center gap-3 p-3 bg-surface-container-high/50 rounded-2xl border border-outline-variant/10">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-sm">
                    <Mail className="w-5 h-5 text-on-surface-variant" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] font-mono font-bold text-on-surface-variant/60 uppercase tracking-widest">Universal Node</p>
                    <p className="text-xs font-medium text-on-surface truncate">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-container-high/50 rounded-2xl border border-outline-variant/10">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-sm">
                    <Shield className="w-5 h-5 text-on-surface-variant" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold text-on-surface-variant/60 uppercase tracking-widest">Security Status</p>
                    <p className="text-xs font-medium text-on-surface">Biometrically Locked</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full mt-8 py-4 bg-error/5 hover:bg-error/10 text-error rounded-[1.25rem] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-error/10"
              >
                {isLoggingOut ? (
                  <div className="w-4 h-4 border-2 border-error/20 border-t-error rounded-full animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                Terminating Session
              </button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-primary/5 border border-primary/20 rounded-[2rem] p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-widest">Command Key Status</h3>
              </div>
              <p className="text-[11px] font-body text-on-surface-variant/80 leading-relaxed italic">
                "Your identity hash is currently active on 1 node. Multi-factor authentication is enforced across all sovereign domains."
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SocialProofSidebar />
            </motion.div>

            <motion.div variants={itemVariants}>
              <LatestMilestones profile={profileData} />
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Tenured Points', val: profileData.tenuredPoints || '0', icon: Zap, color: 'text-amber-500' },
                { label: 'Skill Score', val: '782', icon: Activity, color: 'text-primary' },
                { label: 'Trust Index', val: 'A+', icon: Shield, color: 'text-secondary' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-[2rem] shadow-sm flex items-center justify-between group hover:border-primary/30 transition-colors"
                >
                  <div>
                    <p className="text-[9px] font-mono font-bold text-on-surface-variant/60 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                    <p className="text-3xl font-headline font-black text-on-surface tracking-tighter">{stat.val}</p>
                  </div>
                  <div className={cn("w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center transition-transform group-hover:scale-110", stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tenured Points Widget */}
            <motion.div variants={itemVariants}>
              <TenuredPointsWidget points={profileData.tenuredPoints || 0} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <RecentActivityWidget />
            </motion.div>

            <motion.div variants={itemVariants}>
              <PointsDistributionChart />
            </motion.div>

            {/* Target Goal Widget */}
            <motion.div variants={itemVariants}>
              <TargetGoalWidget 
                uid={user.uid} 
                currentPoints={profileData.tenuredPoints || 0} 
                initialTargetGoal={profileData.targetPointGoal} 
              />
            </motion.div>

            {/* Reputation Growth Chart */}
            <motion.div variants={itemVariants}>
              <ReputationGrowthChart currentPoints={profileData.tenuredPoints || 0} />
            </motion.div>

            {/* Analytical Insights Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="h-full">
                <SkillRadarChart />
              </motion.div>
              <motion.div variants={itemVariants} className="h-full">
                <ReputationVisualization />
              </motion.div>
            </div>

            {/* Peer Verification Network */}
            <motion.div variants={itemVariants}>
              <EndorsementFeature />
            </motion.div>

            {/* Skill Tree Progress */}
            <motion.div variants={itemVariants}>
              <SkillTreeProgress />
            </motion.div>

            {/* Certifications Section */}
            <motion.div variants={itemVariants}>
              <Certifications />
            </motion.div>

            {/* Activity Stream */}
            <motion.div variants={itemVariants}>
              <ActivityStream />
            </motion.div>

            {/* Notification Settings */}
            <motion.div variants={itemVariants}>
              <NotificationSettings />
            </motion.div>

            {/* Community Leaderboard */}
            <motion.div variants={itemVariants}>
              <CommunityLeaderboard />
            </motion.div>

            {/* Reputation Badges Section */}
            <motion.div variants={itemVariants}>
              <ReputationBadges profile={profileData} />
            </motion.div>

            {/* Account Settings / Actions */}
            <motion.div 
              variants={itemVariants}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] overflow-hidden shadow-xl"
            >
              <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-headline font-bold text-on-surface">Identity Configurations</h3>
                  <p className="text-xs text-on-surface-variant font-body mt-1">Manage your professional hash and sovereign privacy settings.</p>
                </div>
                <Settings className="w-6 h-6 text-on-surface-variant/40" />
              </div>
              
              <div className="divide-y divide-outline-variant/10">
                {[
                  { title: 'Update Citizen Data', desc: 'Modify your display name, bio, and visual signature', icon: UserIcon },
                  { title: 'Sovereign Privacy', desc: 'Data retention policies and visibility controls', icon: Shield },
                  { title: 'Session History', desc: 'Review active terminals and authentication logs', icon: Clock },
                  { title: 'Export Ledger', desc: 'Download your full identity history in cryptographically signed JSON', icon: ExternalLink }
                ].map((item, i) => (
                  <button 
                    key={item.title}
                    className="w-full flex items-center justify-between p-6 hover:bg-surface-container-highest/50 transition-all text-left group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-xs text-on-surface-variant opacity-70 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-on-surface-variant/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Audit log teaser */}
            <motion.div 
              variants={itemVariants}
              className="bg-on-surface rounded-[2rem] p-8 text-surface relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[200px] h-full bg-white/5 skew-x-[-20deg] translate-x-1/2 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-headline font-bold mb-2">Immutable Audit Chain</h3>
                  <p className="text-xs text-surface/60 font-mono tracking-wide leading-relaxed max-w-lg">
                    Every modification to your profile is cryptographically hashed and recorded on the Sovereign Talent Ledger for maximum trust verifyability.
                  </p>
                </div>
                <button className="px-6 py-3 bg-surface text-on-surface rounded-xl text-[11px] font-mono font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
                  Inspect Chain
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {showShareDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              onClick={() => setShowShareDialog(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-surface-container-lowest border border-outline-variant/10 p-8 rounded-[2rem] shadow-2xl relative w-full max-w-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setShowShareDialog(false)}
                  className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-headline font-black text-on-surface mb-6 text-center">Share Identity</h3>
                <div className="flex justify-center bg-white p-4 rounded-xl mb-6">
                  <QRCodeSVG 
                     value={`${window.location.origin}/profile/${user?.uid}`} 
                     size={256}
                     level="H"
                  />
                </div>
                <p className="text-xs font-mono text-center text-on-surface-variant/60 uppercase tracking-widest">
                  Scan to view public profile
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
