import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const CustomToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`
              pointer-events-auto min-w-[300px] px-4 py-4 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 animate-slide-up border
              ${toast.type === 'success' ? 'bg-white dark:bg-gray-800 border-green-500 text-gray-800 dark:text-white' : 
                toast.type === 'error' ? 'bg-white dark:bg-gray-800 border-red-500 text-gray-800 dark:text-white' : 
                'bg-white dark:bg-gray-800 border-blue-500 text-gray-800 dark:text-white'}
            `}
          >
            <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white
                ${toast.type === 'success' ? 'bg-green-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}
            `}>
                {toast.type === 'success' ? '✓' : toast.type === 'error' ? '!' : 'i'}
            </div>
            <p className="font-medium text-sm">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a CustomToastProvider');
  return context;
};