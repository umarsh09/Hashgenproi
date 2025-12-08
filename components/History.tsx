import React, { useState } from 'react';
import { GenerationResult } from '../types';
import { PLATFORMS } from '../constants';
import { useToast } from './CustomToast';

interface HistoryProps {
  history: GenerationResult[];
  onBack?: () => void;
}

const TYPE_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
  hashtag: { icon: '#', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  bio: { icon: '✍️', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  caption: { icon: '📝', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  script: { icon: '🎬', color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  idea: { icon: '💡', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  email: { icon: '📧', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
  schedule: { icon: '📅', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-100 dark:bg-teal-900/30' },
  trend: { icon: '🔥', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  emoji: { icon: '🎨', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  competitor: { icon: '🕵️', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  audit: { icon: '🔍', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  sports: { icon: '🏆', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
};

export const History: React.FC<HistoryProps> = ({ history, onBack }) => {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const copyContent = (result: string[] | string) => {
    const text = Array.isArray(result) ? result.join(' ') : result;
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  const filteredHistory = history.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.keyword.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const uniqueTypes = [...new Set(history.map(h => h.type))];

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 -m-4 md:-m-6 lg:-m-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <span className="text-3xl">📜</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Your History</h1>
                  <p className="text-gray-300">All your generated content in one place</p>
                </div>
              </div>
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <span className="text-5xl">📭</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No history yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Start generating content and all your hashtags, bios, captions, and more will appear here for easy access.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 -m-4 md:-m-6 lg:-m-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-3xl">📜</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Your History</h1>
                <p className="text-gray-300">{history.length} items saved</p>
              </div>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{history.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Items</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {history.filter(h => h.type === 'hashtag').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Hashtags</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
              {history.filter(h => h.type === 'bio').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Bios</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {uniqueTypes.length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Content Types</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search your history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  filter === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {uniqueTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    filter === type
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span>{TYPE_ICONS[type]?.icon || '📄'}</span>
                  <span className="capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Showing {filteredHistory.length} of {history.length} items
        </div>

        {/* History Items */}
        <div className="space-y-4">
          {filteredHistory.map((item) => {
            const platform = PLATFORMS[item.platform] || { name: item.platform, iconUrl: '' };
            const typeConfig = TYPE_ICONS[item.type] || { icon: '📄', color: 'text-gray-600', bg: 'bg-gray-100' };

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${typeConfig.bg} flex items-center justify-center text-xl`}>
                        {typeConfig.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{item.keyword}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span className={`px-2 py-0.5 rounded-lg ${typeConfig.bg} ${typeConfig.color} text-xs font-medium capitalize`}>
                            {item.type}
                          </span>
                          {platform.iconUrl && (
                            <div className="flex items-center gap-1">
                              <img src={platform.iconUrl} alt="" className="w-4 h-4" />
                              <span>{platform.name}</span>
                            </div>
                          )}
                          <span>•</span>
                          <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => copyContent(item.result)}
                      className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all opacity-0 group-hover:opacity-100"
                    >
                      Copy
                    </button>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-gray-700 dark:text-gray-300">
                    {Array.isArray(item.result) ? (
                      <div className="flex flex-wrap gap-2">
                        {item.result.slice(0, 10).map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.result.length > 10 && (
                          <span className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm">
                            +{item.result.length - 10} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="line-clamp-3 leading-relaxed">{item.result}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredHistory.length === 0 && history.length > 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
};
