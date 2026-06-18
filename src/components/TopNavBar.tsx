import { Link, useLocation } from 'react-router-dom';
import { User as UserIcon, Menu, X, LogOut, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { logout } from '../lib/firebase';

export default function TopNavBar() {
  const location = useLocation();
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const navLinks = [
    { name: 'Command Center', path: '/underwriting' },
    { name: 'Passport', path: '/learners' },
    { name: 'Proving Ground', path: '/chaos-lab' },
    { name: 'Marketplace', path: '/pricing' },
    { name: 'Ledger', path: '/institutional' },
    { name: 'Podcasts', path: '/podcasts' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <div className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/20 rounded-full px-4 md:px-10 py-3 flex items-center justify-between shadow-xl">
        {/* Logo */}
        <Link to="/" className="text-xl font-headline font-black text-on-surface tracking-tight shrink-0">
          Tenured AI
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-[13px] font-medium transition-all duration-300",
                location.pathname === link.path 
                  ? "text-on-surface" 
                  : "text-on-surface-variant/70 hover:text-on-surface"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link 
            to="/request-access"
            className="hidden md:inline-block text-[13px] font-bold text-primary hover:text-primary/80 transition-colors px-2"
          >
            Request Access
          </Link>

          <Link 
            to="/underwriting"
            className="bg-primary text-on-primary text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-95"
          >
            App
          </Link>
          
          <div className="h-6 w-[1px] bg-outline-variant/30 hidden md:block" />

          {!loading && !user && (
            <Link 
              to="/login"
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-on-surface hover:text-primary transition-colors"
            >
              Sign In
            </Link>
          )}

          {!loading && user && (
            <div className="flex items-center gap-2">
              <div className="relative group">
                <button className="w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant/20 flex items-center justify-center overflow-hidden hover:border-primary/50 transition-all">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <UserIcon className="w-5 h-5 text-on-surface-variant" />
                  )}
                </button>
                
                {/* Simple Dropdown on Hover */}
                <div className="absolute right-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                  <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-2xl p-2 min-w-[160px]">
                    <div className="px-3 py-2 border-b border-outline-variant/10 mb-1">
                      <p className="text-xs font-bold text-on-surface truncate">{user.displayName}</p>
                      <p className="text-[10px] text-on-surface-variant truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile"
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      Citizen Profile
                    </Link>
                    <button 
                      onClick={() => logout()}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-error hover:bg-error/5 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-1.5 text-on-surface-variant z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-4 px-4">
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl shadow-2xl p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block text-lg font-medium py-2",
                  location.pathname === link.path ? "text-primary" : "text-on-surface-variant"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
