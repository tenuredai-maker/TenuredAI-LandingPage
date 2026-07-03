import React, { useState, useRef, useEffect } from 'react';
import { Bell, Trophy, Shield, Info, CheckCircle2, Star, X } from 'lucide-react';
import { useNotifications, AppNotification } from '../context/NotificationContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'points': return <Star className="w-4 h-4 text-amber-500" />;
      case 'achievement': return <Trophy className="w-4 h-4 text-primary" />;
      case 'message': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Shield className="w-4 h-4 text-outline-variant" />;
    }
  };

  const getBg = (type: AppNotification['type']) => {
    switch (type) {
      case 'points': return 'bg-amber-500/10';
      case 'achievement': return 'bg-primary/10';
      case 'message': return 'bg-blue-500/10';
      default: return 'bg-surface-container-highest';
    }
  };

  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors outline-none"
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          key={unreadCount}
          animate={unreadCount > 0 ? { rotate: [0, -15, 15, -15, 15, 0] } : false}
          transition={{ duration: 0.5 }}
        >
          <Bell className="w-5 h-5" />
        </motion.div>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface-container-lowest animate-pulse" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 max-h-[400px] bg-surface-container border border-outline-variant/20 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-lowest/50">
              <h3 className="text-xs font-bold font-mono tracking-widest uppercase text-on-surface">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={() => markAllAsRead()}
                  className="text-[10px] uppercase font-bold tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Mark Read
                </button>
              )}
            </div>

            {/* List */}
            <div className="overflow-y-auto flex-1 p-2 space-y-1 scrollbar-thin scrollbar-thumb-outline-variant/20">
              {notifications.length === 0 ? (
                <div className="py-8 text-center text-on-surface-variant text-sm flex flex-col items-center">
                  <Shield className="w-8 h-8 mb-2 opacity-50" />
                  No new messages
                </div>
              ) : (
                notifications.map((notif) => (
                  <button
                    key={notif.id}
                    onClick={() => {
                      if (!notif.read) markAsRead(notif.id);
                      if (notif.actionUrl) {
                        window.location.href = notif.actionUrl;
                      }
                    }}
                    className={cn(
                      "w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 relative overflow-hidden group",
                      notif.read ? "bg-transparent hover:bg-surface-container-high" : "bg-surface-container-highest hover:bg-surface-container-highest/80 shadow-sm"
                    )}
                  >
                    {!notif.read && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    )}
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5", getBg(notif.type))}>
                      {getIcon(notif.type)}
                    </div>
                    <div>
                      <p className={cn("text-xs font-bold mb-0.5", notif.read ? "text-on-surface-variant" : "text-on-surface")}>
                        {notif.title}
                      </p>
                      <p className="text-[11px] text-on-surface-variant/80 leading-snug">
                        {notif.message}
                      </p>
                      {notif.value && (
                        <p className="text-[10px] font-bold text-amber-500 mt-1 uppercase tracking-wider font-mono">
                          +{notif.value} TP Awarded
                        </p>
                      )}
                      <p className="text-[9px] text-on-surface-variant/50 uppercase tracking-widest mt-1">
                        {formatTime(notif.timestamp)}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-2 border-t border-outline-variant/10 bg-surface-container-lowest/50 text-center">
                <button 
                  onClick={clearAll}
                  className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant hover:text-error transition-colors p-1"
                >
                  Clear Archive
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
