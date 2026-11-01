import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCheck,
  Trash2,
  X
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

function formatTimeAgo(isoString) {
  if (!isoString) return 'Just now';
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    if (isNaN(diffMs) || diffMs < 0) return 'Just now';
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 45) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return 'Recently';
  }
}

export default function NotificationDropdown() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-teal-500 shrink-0" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
        aria-expanded={isOpen}
        className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/30"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-saffron-500 text-[10px] font-extrabold text-white shadow-sm ring-2 ring-white dark:ring-slate-900 animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200/90 dark:border-slate-700/80 z-50 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark read</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-rose-500 transition-colors"
                  title="Clear all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* List of notifications */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/40">
            {!notifications || notifications.length === 0 ? (
              <div className="py-10 text-center px-4 space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700/60 text-slate-400 flex items-center justify-center mx-auto">
                  <Bell className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">No notifications yet</p>
                <p className="text-[11px] text-slate-400 max-w-[200px] mx-auto">
                  You will see booking updates and important alerts right here.
                </p>
              </div>
            ) : (
              notifications.filter(Boolean).map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer ${
                    !notif.read ? 'bg-teal-50/40 dark:bg-teal-950/20' : ''
                  }`}
                >
                  <div className="mt-0.5">{getIcon(notif.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className={`text-xs leading-snug truncate ${!notif.read ? 'font-bold text-slate-900 dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-300'}`}>
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {formatTimeAgo(notif.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-saffron-500 shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
