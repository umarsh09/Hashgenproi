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
  const menuItems = [
    { id: View.HOME, label: 'Dashboard', icon: '📊' },
    { id: View.GENERATOR_HASHTAG, label: 'Hashtag Generator', icon: '⚡' },
    { id: View.GENERATOR_BIO, label: 'Bio Writer', icon: '✍️' },
    { id: View.HISTORY, label: 'History', icon: '📜' },
    { id: View.PRICING, label: 'Upgrade Plan', icon: '💎' },
    { id: View.SETTINGS, label: 'Settings', icon: '⚙️' },
  ];

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

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              title={item.label}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
                ${currentView === item.id 
                  ? 'bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 shadow-sm translate-x-1' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:translate-x-1'}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
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