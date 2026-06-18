import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, Shield, Users, Database, ArrowRight, Mail, Lock, UserPlus, Eye, EyeOff } from 'lucide-react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, setAuthPersistence } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { Check } from 'lucide-react';

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot-password'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      const from = (location.state as any)?.from?.pathname || "/underwriting";
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, location]);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      setError(null);
      await setAuthPersistence(rememberMe);
      await signInWithGoogle();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled or popup blocked. Please ensure popups are allowed or try opening the app in a new tab.');
      } else {
        setError(err.message || 'Failed to sign in with Google');
      }
      setIsSigningIn(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    // Client-side validation for registration
    if (authMode === 'register') {
      const minLength = password.length >= 8;
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[@$!%*?&]/.test(password);

      if (!minLength || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        setError('Password complexity requirement not met: Minimum 8 characters, plus uppercase, lowercase, numeric, and special character components required.');
        return;
      }
    }

    try {
      setIsSigningIn(true);
      setError(null);
      if (authMode === 'login') {
        await setAuthPersistence(rememberMe);
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try logging in instead.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || `Failed to ${authMode === 'login' ? 'sign in' : 'register'}`);
      }
      setIsSigningIn(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your email address.');
      return;
    }

    try {
      setIsSigningIn(true);
      setError(null);
      setSuccessMessage(null);
      await resetPassword(email);
      setSuccessMessage('Recovery instructions have been dispatched to your universal email address.');
      setIsSigningIn(false);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('No identity found matching this email address.');
      } else {
        setError(err.message || 'Failed to dispatch recovery instructions.');
      }
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-xs font-mono font-bold text-on-surface-variant animate-pulse uppercase tracking-widest">
            Validating Identity Sentinel...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Background Decors */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />
          
          <div className="text-center mb-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={authMode}
                initial={{ opacity: 0, x: authMode === 'login' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: authMode === 'login' ? 20 : -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-primary/20 shadow-inner">
                  {authMode === 'login' ? (
                    <LogIn className="w-10 h-10 text-primary" />
                  ) : authMode === 'register' ? (
                    <UserPlus className="w-10 h-10 text-primary" />
                  ) : (
                    <Shield className="w-10 h-10 text-primary" />
                  )}
                </div>
                
                <h1 className="text-4xl font-headline font-black text-on-surface tracking-tighter mb-4">
                  {authMode === 'login' ? 'Identity Portal' : authMode === 'register' ? 'Citizen Registry' : 'Access Recovery'}
                </h1>
                <p className="text-on-surface-variant font-body text-base leading-relaxed max-w-[320px] mx-auto opacity-80">
                  {authMode === 'login' 
                    ? 'Access the Sovereign Talent Ledger and authenticate your biometric hash.' 
                    : authMode === 'register'
                    ? 'Join the connectionist operating system for liquid professional identities.'
                    : 'Dispatch a recovery signal to your registered universal identity.'
                  }
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={authMode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {/* Email form */}
                {authMode === 'forgot-password' ? (
                  <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-primary/70 ml-1">
                        Recovery Target (Email)
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="hash@sovereign.ledger"
                          className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-6 text-sm font-sans text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSigningIn}
                      className={cn(
                        "w-full py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-sm transition-all active:scale-[0.98] relative overflow-hidden shadow-xl",
                        isSigningIn
                          ? "bg-surface-container-highest text-on-surface-variant cursor-not-allowed"
                          : "bg-primary text-on-primary hover:shadow-primary/25 hover:brightness-110"
                      )}
                    >
                      {isSigningIn ? 'Dispatching Pulse...' : 'Send Recovery Signal'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setError(null);
                        setSuccessMessage(null);
                      }}
                      className="w-full text-center text-xs font-mono font-bold text-on-surface-variant/60 hover:text-primary transition-colors uppercase tracking-widest"
                    >
                      Return to Portal
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleEmailAuth} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-primary/70 ml-1">
                          Universal Email Address
                        </label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="hash@sovereign.ledger"
                            className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-6 text-sm font-sans text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between ml-1">
                          <label className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-primary/70">
                            Command Key Phrase
                          </label>
                          {authMode === 'login' && (
                            <button
                              type="button"
                              onClick={() => {
                                setAuthMode('forgot-password');
                                setError(null);
                                setSuccessMessage(null);
                              }}
                              className="text-[9px] font-mono font-bold text-primary hover:text-primary/70 uppercase tracking-widest transition-colors"
                            >
                              Lost Key?
                            </button>
                          )}
                        </div>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-12 text-sm font-sans text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-primary transition-colors p-1"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {authMode === 'register' && (
                          <div className="mt-2 px-1">
                            <p className="text-[9px] font-mono font-bold text-on-surface-variant/50 uppercase tracking-wider leading-tight">
                              Min 8 chars: 1 Upper, 1 Lower, 1 Num, 1 Special (@$!%*?&)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {authMode === 'login' && (
                      <div className="flex items-center justify-between px-1">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="sr-only"
                            />
                            <div className={cn(
                              "w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center",
                              rememberMe 
                                ? "bg-primary border-primary shadow-sm" 
                                : "bg-surface-container-low border-outline-variant/30 group-hover:border-primary/50"
                            )}>
                              {rememberMe && <Check className="w-3.5 h-3.5 text-on-primary stroke-[4px]" />}
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider group-hover:text-on-surface transition-colors">
                            Persist Identity across sessions
                          </span>
                        </label>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSigningIn}
                      className={cn(
                        "w-full py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-sm transition-all active:scale-[0.98] relative overflow-hidden shadow-xl",
                        isSigningIn
                          ? "bg-surface-container-highest text-on-surface-variant cursor-not-allowed"
                          : "bg-primary text-on-primary hover:shadow-primary/25 hover:brightness-110"
                      )}
                    >
                      {isSigningIn ? 'Processing Authorization...' : authMode === 'login' ? 'Execute Sovereign Access' : 'Initialize Identity Sync'}
                    </button>
                  </form>
                )}
          </motion.div>
        </AnimatePresence>

        <div className="relative py-4 flex items-center gap-4">
              <div className="flex-grow h-[1px] bg-outline-variant/10" />
              <span className="text-[9px] font-mono font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">
                Third-Party Protocols
              </span>
              <div className="flex-grow h-[1px] bg-outline-variant/10" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className={cn(
                "w-full flex items-center justify-center gap-4 py-4 px-6 rounded-2xl font-bold transition-all active:scale-[0.98] group border border-outline-variant/20",
                isSigningIn 
                  ? "bg-surface-container-highest cursor-not-allowed text-on-surface-variant" 
                  : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
              )}
            >
              {isSigningIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-on-surface-variant/20 border-t-on-surface-variant rounded-full animate-spin" />
                  <span className="text-sm">Authenticating...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                    />
                  </svg>
                  <span className="text-sm">Authenticate via Google Cloud</span>
                </>
              )}
            </button>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-error/5 border border-error/20 rounded-2xl p-5"
              >
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-error shrink-0" />
                  <p className="text-xs text-error font-bold font-mono uppercase tracking-tight leading-relaxed">
                    ERROR: {error}
                  </p>
                </div>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-green-500/5 border border-green-500/20 rounded-2xl p-5"
              >
                <div className="flex gap-3">
                  <div className="w-5 h-5 text-green-500 shrink-0 flex items-center justify-center font-bold">✓</div>
                  <p className="text-xs text-green-700 font-bold font-mono uppercase tracking-tight leading-relaxed">
                    SUCCESS: {successMessage}
                  </p>
                </div>
              </motion.div>
            )}

            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="text-xs font-mono font-bold text-primary hover:text-primary/70 transition-colors uppercase tracking-[0.1em] border-b border-primary/20 pb-0.5"
              >
                {authMode === 'login' ? 'Initialize New User Link' : 'Return to Access Portal'}
              </button>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-[0.3em] mb-6">
              Network Authorized Modules
            </p>
            <div className="flex justify-center gap-10">
              <div className="flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-on-surface">Vault</span>
              </div>
              <div className="flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
                <Users className="w-5 h-5 text-on-surface" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-on-surface">Network</span>
              </div>
              <div className="flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
                <Database className="w-5 h-5 text-on-surface" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-on-surface">Ledger</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center space-y-4">
          <p className="text-[10px] text-on-surface-variant/50 font-mono uppercase tracking-[0.25em] leading-relaxed">
            Security Protocol 3.2.1-Alpha &middot; Institutional Access Only &middot; Immutable Telemetry Active
          </p>
          <div className="flex justify-center gap-4 text-[9px] font-mono font-bold text-on-surface-variant/40 uppercase tracking-widest">
            <span className="hover:text-primary cursor-help transition-colors">Privacy Lexicon</span>
            <span>&middot;</span>
            <span className="hover:text-primary cursor-help transition-colors">Service Mandates</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
