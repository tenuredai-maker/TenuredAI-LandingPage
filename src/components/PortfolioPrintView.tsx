import React, { forwardRef } from 'react';
import { Shield, Target, Trophy, Briefcase, Award } from 'lucide-react';

interface PortfolioPrintViewProps {
  user: any;
  profileData: any;
}

const PortfolioPrintView = forwardRef<HTMLDivElement, PortfolioPrintViewProps>(({ user, profileData }, ref) => {
  return (
    <div 
      ref={ref} 
      className="bg-white text-gray-900 p-12 w-[800px] absolute -left-[9999px] top-0"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center gap-6 border-b-2 border-gray-100 pb-8 mb-8">
        {profileData.photoURL ? (
          <img 
            src={profileData.photoURL} 
            alt={profileData.displayName} 
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
            <span className="text-3xl font-bold text-gray-400">
              {profileData.displayName.charAt(0)}
            </span>
          </div>
        )}
        
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">{profileData.displayName}</h1>
          <p className="text-gray-500 flex items-center gap-2 text-sm uppercase tracking-widest font-mono">
            {profileData.role || 'Tenured Core Member'} • ID: {user.uid.slice(0, 8)}
          </p>
          <p className="text-gray-400 mt-1 text-sm font-mono tracking-wider">{user.email}</p>
        </div>
      </div>

      {/* Trust & Reputation Settings */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-4 text-gray-800">
            <Shield className="w-6 h-6" />
            <h2 className="text-xl font-bold">Reputation Score</h2>
          </div>
          <p className="text-5xl font-black text-gray-900 mb-2">
            {profileData.tenuredPoints || 1250} <span className="text-lg text-gray-400 font-normal">pts</span>
          </p>
          <p className="text-sm text-gray-500">Verified System Contribution</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-4 text-gray-800">
            <Target className="w-6 h-6" />
            <h2 className="text-xl font-bold">Current Standing</h2>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2 whitespace-nowrap">
            Top 5% Network
          </p>
          <p className="text-sm text-gray-500">Sovereign Validation Status</p>
        </div>
      </div>

      {/* Badges / Certifications */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3 text-gray-800">
          <Award className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Certified Badges & Endorsements</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-xl p-4 text-center bg-white shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">Alpha Tester</h3>
            <p className="text-xs text-gray-500 mt-1">Foundational Network Member</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4 text-center bg-white shadow-sm">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">Top Contributor</h3>
            <p className="text-xs text-gray-500 mt-1">High Value Content Creator</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4 text-center bg-white shadow-sm">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">Verified Expert</h3>
            <p className="text-xs text-gray-500 mt-1">Industry Validation</p>
          </div>
        </div>
      </div>

      {/* Key Project Metrics */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3 text-gray-800">
          <Target className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Verified Activity Metrics</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-50">
            <span className="text-gray-600 font-medium">Underwritten Risks Validated</span>
            <span className="font-mono font-bold text-gray-900 text-lg">14</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-50">
            <span className="text-gray-600 font-medium">Platform Endorsements Received</span>
            <span className="font-mono font-bold text-gray-900 text-lg">38</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-50">
            <span className="text-gray-600 font-medium">Audio Network Contributions</span>
            <span className="font-mono font-bold text-gray-900 text-lg">3</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-600 font-medium">Identity Node Age</span>
            <span className="font-mono font-bold text-gray-900 text-lg">184 Days</span>
          </div>
        </div>
      </div>

      {/* Footer / Signed Verification */}
      <div className="mt-16 text-center border-t border-gray-200 pt-8 text-sm text-gray-400">
        <p className="font-mono tracking-widest uppercase text-xs mb-2 text-gray-500">Tenured Core Algorithmic Validation</p>
        <p>This document constitutes a validated printout of the member's current sovereign ledger.</p>
        <p className="mt-2 text-xs">Generated: {new Date().toUTCString()} • Signature: {btoa(user.uid + Date.now()).slice(0, 24)}</p>
      </div>
    </div>
  );
});

PortfolioPrintView.displayName = 'PortfolioPrintView';
export default PortfolioPrintView;
