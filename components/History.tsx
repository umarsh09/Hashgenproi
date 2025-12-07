import React from 'react';
import { GenerationResult } from '../types';
import { PLATFORMS } from '../constants';
import { useToast } from './CustomToast';

interface HistoryProps {
  history: GenerationResult[];
  onBack?: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onBack }) => {
  const { showToast } = useToast();

  const copyContent = async (result: string[] | string) => {
    const text = Array.isArray(result) ? result.join(' ') : result;
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 animate-fade-in relative">
        {onBack && (
            <button 
                onClick={onBack}
                className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all z-20"
                title="Close"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
         )}
        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">📜</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No history yet</h3>
        <p>Your generated hashtags and bios will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your History</h2>
             <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{history.length} items</span>
        </div>
        {onBack && (
            <button 
                onClick={onBack}
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all z-20"
                title="Close"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
         )}
      </div>
      
      <div className="grid gap-4">
        {history.map((item) => {
          const platform = PLATFORMS[item.platform] || { name: item.platform, iconUrl: '' };
          const isBio = item.type === 'bio';
          
          return (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${isBio ? 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'bg-gray-50 dark:bg-gray-900/50'}`}>
                    {isBio ? '✍️' : (platform.iconUrl ? <img src={platform.iconUrl} alt={platform.name} className="w-6 h-6 object-contain" /> : '#')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white capitalize text-lg">{item.keyword}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">{platform.name}</span>
                      <span>•</span>
                      <span className="uppercase tracking-wider">{item.type}</span>
                      <span>•</span>
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => copyContent(item.result)}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-white dark:hover:text-gray-900 text-sm font-medium text-gray-600 dark:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  Copy
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700/50">
                {Array.isArray(item.result) ? (
                  <div className="flex flex-wrap gap-2">
                    {item.result.map((tag, i) => (
                       <span key={i} className="text-indigo-600 dark:text-indigo-300">{tag}</span>
                    ))}
                  </div>
                ) : (
                  <p className="italic leading-relaxed">"{item.result}"</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};