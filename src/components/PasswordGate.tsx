import React, { useState } from 'react';
import { ShieldAlert, Eye, EyeOff } from 'lucide-react';

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('partner_authenticated') === 'true';
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'TenuredAI2026!') {
      sessionStorage.setItem('partner_authenticated', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid access code. Please try again or contact support.');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md bg-surface-container rounded-3xl p-8 shadow-2xl border border-outline-variant/10 relative overflow-hidden">
        <div className="absolute -top-24 -right-16 w-52 h-52 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.08),transparent_65%)] pointer-events-none" />
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-semibold mb-2">Access Code Required</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            This briefing is restricted to Tenured AI partners and verified institutions. Please enter your partner access code to proceed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Access Code
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access code"
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/20 focus:outline-none focus:border-primary text-sm pr-12 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer border-0 bg-transparent"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-500 font-medium pt-1">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-mono text-xs font-bold tracking-widest uppercase cursor-pointer hover:opacity-95 active:scale-[.99] transition-all border-0 shadow-lg"
          >
            Verify Access →
          </button>
        </form>

        <p className="text-center font-mono text-[9px] text-on-surface-variant/40 tracking-wider mt-8">
          CONFIDENTIAL · PARTNER AGREEMENT GOVERNS ACCESS
        </p>
      </div>
    </div>
  );
}
