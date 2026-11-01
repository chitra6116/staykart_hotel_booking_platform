import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useNotifications } from './NotificationContext';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const notifContext = useNotifications();

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 4000, title) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (notifContext?.addNotification) {
      notifContext.addNotification({
        title: title || (type === 'success' ? 'Action Completed' : type === 'error' ? 'Alert' : 'Notice'),
        message,
        type
      });
    }

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast, notifContext]);

  const toast = {
    success: (msg, dur, title) => addToast(msg, 'success', dur, title),
    error: (msg, dur, title) => addToast(msg, 'error', dur, title),
    info: (msg, dur, title) => addToast(msg, 'info', dur, title),
    warning: (msg, dur, title) => addToast(msg, 'warning', dur, title)
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
        {toasts.map((t) => {
          let bg = 'bg-slate-900 text-white dark:bg-slate-800';
          let Icon = Info;
          let iconColor = 'text-teal-400';

          if (t.type === 'success') {
            bg = 'bg-emerald-900 text-white border border-emerald-700';
            Icon = CheckCircle2;
            iconColor = 'text-emerald-400';
          } else if (t.type === 'error') {
            bg = 'bg-rose-950 text-white border border-rose-800';
            Icon = AlertCircle;
            iconColor = 'text-rose-400';
          } else if (t.type === 'warning') {
            bg = 'bg-amber-950 text-white border border-amber-800';
            Icon = AlertCircle;
            iconColor = 'text-amber-400';
          }

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl transition-all duration-300 animate-slide-in ${bg}`}
              role="alert"
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
              <div className="text-sm font-medium flex-1 leading-snug">{t.message}</div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
