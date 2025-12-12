import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20 rounded-xl p-6 text-center">
    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-3xl">⚠️</span>
    </div>
    <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-2">Generation Failed</h3>
    <p className="text-sm text-red-700 dark:text-red-400 mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
      >
        Try Again
      </button>
    )}
  </div>
);

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => (
  <div className="absolute inset-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center animate-fade-in">
    <div className="relative w-20 h-20 mb-6">
      <div className="loader-ring"></div>
      <div className="loader-ring"></div>
      <div className="loader-ring"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 bg-indigo-600 rounded-full loader-core"></div>
      </div>
    </div>
    <p className="text-base font-bold text-gray-800 dark:text-white animate-pulse">{message}</p>
  </div>
);

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-3xl">{icon}</span>
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-4">{description}</p>
    {action && (
      <button
        onClick={action.onClick}
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm"
      >
        {action.label}
      </button>
    )}
  </div>
);
