import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type NotificationType = 'points' | 'achievement' | 'system' | 'message';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: number;
  read: boolean;
  value?: number; // e.g. for points
  actionUrl?: string;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    // Attempt to load from storage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('tenured_notifications');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse stored notifications");
        }
      }
    }
    return [
      {
        id: 'welcome-1',
        title: 'Welcome to Tenured AI',
        message: 'Your Sovereign Identity has been initialized.',
        type: 'system',
        timestamp: Date.now() - 3600000,
        read: false
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tenured_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Listen for global custom events
  useEffect(() => {
    const handleGlobalNotification = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        addNotification(customEvent.detail);
      }
    };

    window.addEventListener('tenured-notification', handleGlobalNotification);
    return () => window.removeEventListener('tenured-notification', handleGlobalNotification);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: uuidv4(),
      timestamp: Date.now(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
