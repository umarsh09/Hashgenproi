import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onLogout, isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const menuSections = [
    {
      title: 'Main',
      items: [
        { id: View.HOME, label: 'Dashboard', icon: '📊' },
      ]
    },
    {
      title: 'Generators',
      items: [
        { id: View.GENERATOR_HASHTAG, label: 'Hashtags', icon: '⚡' },
        { id: View.GENERATOR_BIO, label: 'Bio Writer', icon: '✍️' },
        { id: View.GENERATOR_CAPTION, label: 'Captions', icon: '📝' },
        { id: View.GENERATOR_SCRIPT, label: 'Reels Script', icon: '🎬' },
        { id: View.GENERATOR_IDEA, label: 'Content Ideas', icon: '💡' },
        { id: View.GENERATOR_EMAIL, label: 'Email Writer', icon: '📧' },
        { id: View.GENERATOR_EMOJI, label: 'Emoji Maker', icon: '🎨' },
        { id: View.GENERATOR_TREND, label: 'Trend Watch', icon: '🔥' },
        { id: View.GENERATOR_SCHEDULE, label: 'Scheduler', icon: '📅' },
      ]
    },
    {
      title: 'Analyzers',
      items: [
        { id: View.ANALYZER_COMPETITOR, label: 'Competitor', icon: '🕵️' },
        { id: View.ANALYZER_AUDIT, label: 'Profile Audit', icon: '🔍' },
      ]
    },
    {
      title: 'Account',
      items: [
        { id: View.HISTORY, label: 'History', icon: '📜' },
        { id: View.PRICING, label: 'Upgrade Plan', icon: '💎' },
        { id: View.SETTINGS, label: 'Settings', icon: '⚙️' },
      ]
    }
  ];

  // Filter menu items based on search query
  const filteredSections = menuSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <>
      {/* Mobile Backdrop with Strong Blur */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-40 md:hidden transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col shadow-2xl md:shadow-none
      `}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center cursor-pointer group" onClick={() => onViewChange(View.HOME)} title="Go to Dashboard">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg mr-3 shadow-lg group-hover:shadow-indigo-500/50 transition-shadow">
              #
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Genius AI</span>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Close Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 overflow-y-auto space-y-4">
          {filteredSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-4 mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onViewChange(item.id); onClose(); }}
                    title={item.label}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm
                      ${currentView === item.id
                        ? 'bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 shadow-sm translate-x-1'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:translate-x-1'}
                    `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {filteredSections.length === 0 && (
            <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
              No tools found
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={onLogout}
            title="Sign out of your account"
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 rounded-xl transition-colors font-medium"
          >
            <span className="text-xl">🚪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};