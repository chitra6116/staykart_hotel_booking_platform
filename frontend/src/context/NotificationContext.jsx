import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const NotificationContext = createContext(null);

const STORAGE_KEY = 'staykart_notifications';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-welcome',
    title: 'Welcome to StayKart!',
    message: 'Discover verified authentic stays across India with transparent GST tariffs.',
    type: 'info',
    timestamp: new Date().toISOString(),
    read: false
  }
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse notifications from localStorage', e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Failed to save notifications to localStorage', e);
    }
  }, [notifications]);

  const addNotification = useCallback(({ title, message, type = 'info' }) => {
    const newNotif = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: title || (type === 'success' ? 'Success' : type === 'error' ? 'Notice' : 'Update'),
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
    return newNotif;
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => n && !n.read).length
    : 0;

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    return {
      notifications: [],
      unreadCount: 0,
      addNotification: () => {},
      markAsRead: () => {},
      markAllAsRead: () => {},
      clearAll: () => {}
    };
  }
  return context;
}
