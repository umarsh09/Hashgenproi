import React, { useState } from 'react';
import { UserProfile, View } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  toggleSidebar: () => void;
  onViewChange: (view: View) => void;
  onLogout: () => void;
  isAppMode: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  toggleSidebar, 
  onViewChange, 
  onLogout, 
  isAppMode,
  isDarkMode,
  toggleTheme
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Common Logo Component
  const Logo = () => (
    <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={() => onViewChange(View.HOME)}>
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300 transform group-hover:scale-105 flex-shrink-0">
        #
      </div>
      <span className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 group-hover:to-gray-800 dark:group-hover:to-white transition-all truncate">
        HashGenPro
      </span>
    </div>
  );

  // Theme Toggle Button
  const ThemeToggle = () => (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title="Toggle Theme"
    >
      {isDarkMode ? (
        <span className="text-xl">☀️</span>
      ) : (
        <span className="text-xl">🌙</span>
      )}
    </button>
  );

  if (!isAppMode) {
    // Landing Page & Public Navbar (Logged Out)
    return (
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/50 shadow-sm dark:shadow-lg transition-colors duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />

          {/* Just Theme Toggle for Public View, user asked to remove "Get Started" buttons from top bar */}
          <div className="flex items-center gap-4">
             <ThemeToggle />
          </div>
        </div>
      </nav>
    );
  }

  // App Dashboard Navbar (Logged In)
  return (
    <header className="h-20 bg-white/80 dark:bg-gray-900/50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Sidebar */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Logo in Dashboard */}
        <div className="hidden sm:block">
           <Logo />
        </div>
      </div>

      <div className="relative flex items-center gap-4">
        <ThemeToggle />

        <button 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-3 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none"
        >
          <div className="text-right hidden sm:block mr-2">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wide">{user?.plan || 'Free'} Plan</p>
          </div>
          <img 
            src={user?.avatar} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-indigo-600 shadow-md object-cover"
          />
        </button>

        {/* Profile Dropdown */}
        {showProfileMenu && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowProfileMenu(false)}
            />
            <div className="absolute right-0 top-14 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-1 z-20 animate-fade-in origin-top-right">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-900 dark:text-white font-bold truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{user?.email}</p>
              </div>
              <div className="py-1">
                <button 
                    onClick={() => { setShowProfileMenu(false); onViewChange(View.SETTINGS); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                >
                    <span>⚙️</span> Account Settings
                </button>
                <button 
                    onClick={() => { setShowProfileMenu(false); onViewChange(View.PRICING); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                >
                    <span>💎</span> Upgrade Plan
                </button>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 my-1"></div>
              <button 
                onClick={() => { setShowProfileMenu(false); onLogout(); }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-gray-800 flex items-center gap-2"
              >
                <span>🚪</span> Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};