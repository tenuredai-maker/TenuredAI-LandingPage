import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Instagram, Facebook, Youtube, Music, X } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-20 px-8 bg-surface-container-low border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="shrink-0 flex items-center pr-[60px]">
              <img src="/tenured-1024.png" alt="Tenured AI" className="h-16" />
              <span className="hidden md:block text-xl font-headline font-black text-on-surface tracking-tight ml-3">Tenured AI</span>
            </Link>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs">
              Mathematical underwriting of human competence for the autonomous era. Precise benchmarks for cognitive sovereignty.
            </p>
            <div className="flex gap-4 pt-2 flex-wrap">
              <a href="https://x.com/tenuredai" className="p-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" aria-label="X">
                <X className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/113331068/admin/dashboard/" className="p-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/tenuredai/" className="p-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61586793629775" className="p-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@tenured.ai" className="p-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" aria-label="TikTok">
                <Music className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/channel/UC-CC4_R0CEbWFwqF2UDYc7g" className="p-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-6">Protocol</h4>
            <ul className="space-y-4">
              <li><Link to="/learners" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Passport</Link></li>
              <li><Link to="/chaos-lab" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Proving Ground</Link></li>
              <li><Link to="/pricing" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/recruiters" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Recruiters</Link></li>
              <li><Link to="/universities" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Universities</Link></li>
              <li><Link to="/enterprise" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Enterprise (EWARD)</Link></li>
              <li><Link to="/events" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Events &amp; Briefings</Link></li>
              <li><Link to="/tenured-agent" className="text-sm text-on-surface-variant hover:text-primary transition-colors">The Tenured Agent</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-6">Foundation</h4>
            <ul className="space-y-4">
              <li><Link to="/manifesto" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Manifesto</Link></li>
              <li><Link to="/learning-loop" className="text-sm text-on-surface-variant hover:text-primary transition-colors">The Learning Loop</Link></li>
              <li><Link to="/method" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Method &amp; Codex</Link></li>
              <li><Link to="/responsible-ai" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Responsible AI</Link></li>
              <li><Link to="/about" className="text-sm text-on-surface-variant hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/podcasts" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Podcasts</Link></li>
              <li><Link to="/underwriting" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Verification</Link></li>
              <li><Link to="/leaderboard" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-sm text-on-surface-variant hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/use-cases" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Use Cases</Link></li>
              <li><Link to="/k12" className="text-sm text-on-surface-variant hover:text-primary transition-colors">K-12 Initiative</Link></li>
              <li><Link to="/request-access" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Request Access</Link></li>
              <li className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest pt-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                System: Optimal
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/60 hover:text-primary">Privacy</Link>
            <Link to="/terms" className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/60 hover:text-primary">Terms</Link>
          </div>
          <div className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/40">
            © 2026 Tenured AI, Inc
          </div>
        </div>
      </div>
    </footer>
  );
}
