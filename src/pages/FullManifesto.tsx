import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FullManifesto() {
  return (
    <div className="pt-20 min-h-screen bg-background flex flex-col">
      {/* Back to Manifesto Header bar */}
      <div className="bg-surface-container border-b border-outline-variant/15 px-6 py-4 flex items-center justify-between">
        <Link 
          to="/manifesto" 
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Manifesto Overview
        </Link>
        <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold hidden sm:inline">
          Official Release · Technical Dossier
        </span>
      </div>

      {/* Embedded Technical Dossier Frame */}
      <div className="flex-1 w-full bg-background relative overflow-hidden">
        <iframe
          src="/The_Sovereign_Manifesto_and_Technical_Dossier.html"
          className="w-full h-[calc(100vh-140px)] border-0"
          title="The Sovereign Manifesto & Technical Dossier"
        />
      </div>
    </div>
  );
}
