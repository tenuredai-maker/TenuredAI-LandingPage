import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Twitter, Linkedin, Mail, Check, Link as LinkIcon, Zap } from 'lucide-react';
import { Episode } from '../data/podcastEpisodes';
import { grantTenuredPoints } from '../lib/firebase';
import { sharePodcast } from '../lib/podcastService';

interface ShareModalProps {
  episode: Episode | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ episode, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = React.useState(false);
  const [pointsGranted, setPointsGranted] = React.useState(false);

  if (!episode) return null;

  const shareUrl = `${window.location.origin}/podcasts/${episode.id}`;
  const shareTitle = `Beyond Tech Frontiers: ${episode.title}`;

  const handleShareAction = async (method: string) => {
    try {
      await sharePodcast(episode.id);
    } catch (err) {
      console.warn("Failed to update podcast shares", err);
    }
    
    if (!pointsGranted) {
      await grantTenuredPoints(50, `Shared Episode: ${episode.title} via ${method}`);
      setPointsGranted(true);
    }
  };

  const handleCopy = async () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    await handleShareAction('Link Copy');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10',
      method: 'Twitter'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-[#0077B5] hover:bg-[#0077B5]/10',
      method: 'LinkedIn'
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-primary hover:bg-primary/10',
      method: 'Email'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-2xl z-[101]"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-headline font-black text-on-surface tracking-tighter">
                Dispatch Intel
              </h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-2xl bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8">
              <div className="p-4 bg-surface-container-low border border-outline-variant/10 rounded-2xl flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl flex-shrink-0 bg-primary/10 overflow-hidden border border-primary/20">
                  <img 
                    src={episode.imageUrl || `https://picsum.photos/seed/${episode.id}/100/100`} 
                    alt={episode.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-1">EPISODE {episode.episodeNumber}</p>
                  <h4 className="text-sm font-bold text-on-surface line-clamp-2 leading-tight">{episode.title}</h4>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleShareAction(option.method)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-3xl border border-outline-variant/10 transition-all group ${option.color}`}
                  >
                    <option.icon className="w-6 h-6" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{option.name}</span>
                  </a>
                ))}
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-mono font-bold text-on-surface-variant/60 uppercase tracking-widest ml-1">
                  Deep Link Corridor
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-12 text-xs font-mono text-on-surface-variant/80 truncate focus:outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-95"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-outline-variant/10">
              <p className="text-[9px] font-mono font-bold text-on-surface-variant/40 uppercase tracking-[0.25em] text-center">
                Security Protocol 7.1 &middot; Distributed Identity Verified
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
