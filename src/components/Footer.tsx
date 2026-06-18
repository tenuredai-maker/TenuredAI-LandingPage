import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-20 px-8 bg-surface-container-low border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="font-headline text-2xl text-on-surface font-black tracking-tight">Tenured AI</div>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs">
              Mathematical underwriting of human competence for the autonomous era. Precise benchmarks for cognitive sovereignty.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-6">Protocol</h4>
            <ul className="space-y-4">
              <li><Link to="/underwriting" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Talent Underwriting</Link></li>
              <li><Link to="/learners" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Passport</Link></li>
              <li><Link to="/chaos-lab" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Proving Ground</Link></li>
              <li><Link to="/pricing" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Marketplace</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-6">Foundation</h4>
            <ul className="space-y-4">
              <li><Link to="/manifesto" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Manifesto</Link></li>
              <li><Link to="/docs" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Methodology</Link></li>
              <li><Link to="/responsible-ai" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Responsible AI</Link></li>
              <li><Link to="/rules" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Rules of Engagement</Link></li>
              <li><Link to="/podcasts" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Podcasts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-sm text-on-surface-variant hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/use-cases" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Use Cases</Link></li>
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
            © 2024 Tenured AI. All identity packets encrypted.
          </div>
        </div>
      </div>
    </footer>
  );
}
