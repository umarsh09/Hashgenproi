import React, { useState } from 'react';
import { GenerationResult } from '../types';
import { PLATFORMS } from '../constants';
import { useToast } from './CustomToast';

interface HistoryProps {
  history: GenerationResult[];
  onBack?: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onBack }) => {
  const { showToast } = useToast();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const copyContent = (result: string[] | string) => {
    const text = Array.isArray(result) ? result.join(' ') : result;
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  // Filter and search logic
  const filteredHistory = history.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = item.keyword.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Group by date
  const groupedHistory = filteredHistory.reduce((acc, item) => {
    const date = new Date(item.timestamp).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, GenerationResult[]>);

  const historyGroups = Object.entries(groupedHistory) as [string, GenerationResult[]][];

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
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-6">
            <span className="text-5xl">📜</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No History Yet</h3>
        <p className="text-gray-500 dark:text-gray-400">Your generated content will appear here</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Start creating to build your history!</p>
      </div>
    );
  }

  const stats = {
    total: history.length,
    hashtags: history.filter(h => h.type === 'hashtag').length,
    bios: history.filter(h => h.type === 'bio').length,
    other: history.filter(h => h.type !== 'hashtag' && h.type !== 'bio').length,
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto relative">
      {/* Header with gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-3xl -z-10"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Your History
              </h2>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full">
                {filteredHistory.length} items
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">All your generated content in one place</p>
          </div>
          {onBack && (
              <button
                  onClick={onBack}
                  className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-200 dark:border-gray-700 transition-all transform hover:-translate-y-1 flex items-center gap-2"
              >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Close</span>
              </button>
           )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📊</span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Total</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">#</span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Hashtags</span>
          </div>
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.hashtags}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">✍️</span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Bios</span>
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.bios}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">✨</span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Other</span>
          </div>
          <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{stats.other}</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            🔍
          </span>
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all"
        >
          <option value="all">All Types</option>
          <option value="hashtag">Hashtags</option>
          <option value="bio">Bios</option>
          <option value="caption">Captions</option>
          <option value="script">Scripts</option>
          <option value="idea">Ideas</option>
        </select>
      </div>

      {/* History Items Grouped by Date */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <span className="text-5xl mb-4 block">🔍</span>
          <p className="text-gray-500 dark:text-gray-400">No results found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="space-y-6">
          {historyGroups.map(([date, items]) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{date}</h3>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="grid gap-4">
                {items.map((item) => {
                  const platform = PLATFORMS[item.platform] || { name: item.platform, iconUrl: '' };
                  const typeColors = {
                    bio: 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
                    hashtag: 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20',
                    caption: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
                    script: 'bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-500/20',
                    idea: 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20',
                  };
                  const colorClass = typeColors[item.type as keyof typeof typeColors] || 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600';

                  return (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all group shadow-sm hover:shadow-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border ${colorClass} shadow-sm`}>
                            {item.type === 'bio' && '✍️'}
                            {item.type === 'hashtag' && (platform.iconUrl ? <img src={platform.iconUrl} alt={platform.name} className="w-7 h-7 object-contain" /> : '#')}
                            {item.type === 'caption' && '📝'}
                            {item.type === 'script' && '🎬'}
                            {item.type === 'idea' && '💡'}
                            {!['bio', 'hashtag', 'caption', 'script', 'idea'].includes(item.type) && '✨'}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{item.keyword}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md font-medium text-gray-600 dark:text-gray-300">{platform.name}</span>
                              <span>•</span>
                              <span className="uppercase tracking-wider font-bold">{item.type}</span>
                              <span>•</span>
                              <span>{new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => copyContent(item.result)}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-indigo-500/30 flex items-center gap-2"
                        >
                          <span>📋</span>
                          <span>Copy</span>
                        </button>
                      </div>

                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl p-5 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        {Array.isArray(item.result) ? (
                          <div className="flex flex-wrap gap-2">
                            {item.result.map((tag, i) => (
                               <span key={i} className="px-3 py-1.5 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-300 rounded-lg font-medium border border-indigo-100 dark:border-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                                 {tag}
                               </span>
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
          ))}
        </div>
      )}
    </div>
  );
};