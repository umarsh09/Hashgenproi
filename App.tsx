import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Generator } from './components/Generator';
import { BioGenerator } from './components/BioGenerator';
import { UniversalGenerator } from './components/UniversalGenerator';
import { Analyzer } from './components/Analyzer';
import { History } from './components/History';
import { Home } from './components/Home';
import { Auth } from './components/Auth';
import { Pricing } from './components/Pricing';
import { Settings } from './components/Settings';
import { CustomToastProvider } from './components/CustomToast';
import { View, GenerationResult, UserProfile } from './types';

// Mock database type
interface RegisteredUser extends UserProfile {
  password: string;
}

// Splash Loader Component
const SplashLoader = () => (
  <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col items-center justify-center text-white">
    <div className="relative w-32 h-32 mb-8">
      <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-ping"></div>
      <div className="absolute inset-2 border-4 border-purple-500/50 rounded-full animate-spin-slow"></div>
      <div className="absolute inset-0 flex items-center justify-center">
         <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse">AI</span>
      </div>
    </div>
    <h1 className="text-3xl font-bold mb-2 tracking-widest animate-fade-in">HASHTAG GENIUS</h1>
    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-4">
      <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-[width_2.5s_ease-in-out_forwards]" style={{ width: '0%' }}></div>
    </div>
    <p className="text-gray-400 text-sm mt-4 animate-pulse">Initializing Neural Networks...</p>
  </div>
);

// Main App Container
const AppContainer: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [history, setHistory] = useState<GenerationResult[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loadingApp, setLoadingApp] = useState(true);
  
  // Persistence State
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('hg_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(() => {
    const saved = localStorage.getItem('hg_users');
    return saved ? JSON.parse(saved) : [];
  });

  // Initial App Load Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingApp(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Save to Local Storage on Change
  useEffect(() => {
    localStorage.setItem('hg_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('hg_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hg_current_user');
    }
  }, [user]);

  // Theme Handling
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // AUTHENTICATION LOGIC
  const handleLogin = (email: string, pass: string): boolean => {
    const foundUser = registeredUsers.find(u => u.email === email && u.password === pass);
    if (foundUser) {
      setUser({
        name: foundUser.name,
        email: foundUser.email,
        avatar: foundUser.avatar,
        plan: foundUser.plan
      });
      setCurrentView(View.HOME);
      return true;
    }
    return false;
  };

  const handleRegister = (name: string, email: string, pass: string): boolean => {
    if (registeredUsers.find(u => u.email === email)) {
      return false; // User exists
    }
    const newUser: RegisteredUser = {
      name,
      email,
      password: pass,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      plan: 'free'
    };
    setRegisteredUsers([...registeredUsers, newUser]);
    
    // Auto login after register
    setUser({
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      plan: newUser.plan
    });
    setCurrentView(View.HOME);
    return true;
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.HOME);
    setSidebarOpen(false);
  };

  const updateUserProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    setRegisteredUsers(prev => prev.map(u => u.email === updatedUser.email ? { ...u, ...updatedUser } : u));
  };

  const handlePasswordUpdate = (currentPass: string, newPass: string): boolean => {
    if (!user) return false;
    
    // Find the full user record including password
    const userIndex = registeredUsers.findIndex(u => u.email === user.email);
    if (userIndex === -1) return false;

    const registeredUser = registeredUsers[userIndex];

    // Check if current password matches
    if (registeredUser.password !== currentPass) {
      return false;
    }

    // Update password
    const updatedUsers = [...registeredUsers];
    updatedUsers[userIndex] = { ...registeredUser, password: newPass };
    setRegisteredUsers(updatedUsers);
    return true;
  };

  const addToHistory = (item: GenerationResult) => {
    setHistory(prev => [item, ...prev]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isAppMode = !!user && 
    currentView !== View.AUTH &&
    currentView !== View.PRICING;

  // Render Logic
  const renderContent = () => {
    const backToDashboard = () => setCurrentView(View.HOME);

    switch (currentView) {
      case View.HOME:
        return (
          <Home 
            user={user}
            history={history}
            onStart={() => setCurrentView(user ? View.GENERATOR_HASHTAG : View.AUTH)} 
            onPricing={() => setCurrentView(View.PRICING)}
            isDashboard={isAppMode} 
            onNavigate={setCurrentView}
          />
        );
      case View.AUTH:
        return <Auth onLogin={handleLogin} onRegister={handleRegister} onBack={backToDashboard} />;
      case View.PRICING:
        return <Pricing onSelectPlan={() => setCurrentView(user ? View.GENERATOR_HASHTAG : View.AUTH)} onBack={backToDashboard} isLoggedIn={!!user} />;
      case View.GENERATOR_HASHTAG:
        return <Generator onGenerate={addToHistory} onBack={backToDashboard} />;
      case View.GENERATOR_BIO:
        return <BioGenerator onGenerate={addToHistory} onBack={backToDashboard} />;
      case View.HISTORY:
        return <History history={history} onBack={backToDashboard} />;
      case View.SETTINGS:
        return <Settings user={user!} onUpdateUser={updateUserProfile} onUpdatePassword={handlePasswordUpdate} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onBack={backToDashboard} />;
      
      // New Tools
      case View.GENERATOR_CAPTION:
        return <UniversalGenerator type="caption" title="Caption AI" description="Write engaging captions." placeholder="Describe your photo or video here..." icon="📝" onGenerate={addToHistory} onBack={backToDashboard} />;
      case View.GENERATOR_SCRIPT:
        return <UniversalGenerator type="script" title="Reels Script" description="Viral video scripts in seconds." placeholder="What is your video about? e.g. How to make coffee..." icon="🎬" onGenerate={addToHistory} onBack={backToDashboard} />;
      case View.GENERATOR_IDEA:
        return <UniversalGenerator type="idea" title="Content Ideas" description="Never run out of inspiration." placeholder="Enter your niche e.g. Fitness, Tech, Beauty..." icon="💡" onGenerate={addToHistory} onBack={backToDashboard} />;
      case View.GENERATOR_EMAIL:
        return <UniversalGenerator type="email" title="Email Writer" description="Professional outreach emails." placeholder="Who are you emailing and why?" icon="📧" onGenerate={addToHistory} onBack={backToDashboard} />;
      case View.GENERATOR_SCHEDULE:
        return <UniversalGenerator type="schedule" title="Scheduler" description="Plan your week of content." placeholder="What is your main focus this week?" icon="📅" onGenerate={addToHistory} onBack={backToDashboard} />;
      case View.GENERATOR_TREND:
        return <UniversalGenerator type="trend" title="Trend Watch" description="Spot viral trends in your niche." placeholder="Enter your industry..." icon="🔥" onGenerate={addToHistory} onBack={backToDashboard} />;
      case View.GENERATOR_EMOJI:
        return <UniversalGenerator type="emoji" title="Emoji Maker" description="Creative emoji art & combos." placeholder="What vibe are you looking for?" icon="🎨" onGenerate={addToHistory} onBack={backToDashboard} />;
      
      case View.ANALYZER_COMPETITOR:
        return <Analyzer type="competitor" onGenerate={addToHistory} onBack={backToDashboard} />;
      case View.ANALYZER_AUDIT:
        return <Analyzer type="audit" onGenerate={addToHistory} onBack={backToDashboard} />;
        
      default:
        return <Home user={user} history={history} onStart={() => setCurrentView(View.AUTH)} onPricing={() => setCurrentView(View.PRICING)} isDashboard={isAppMode} onNavigate={setCurrentView} />;
    }
  };

  if (loadingApp) {
    return <SplashLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      {isAppMode ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar 
            currentView={currentView} 
            onViewChange={(v) => { setCurrentView(v); setSidebarOpen(false); }} 
            onLogout={handleLogout}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-gray-50 dark:bg-gray-900">
            <Navbar 
              user={user} 
              isAppMode={true} 
              onViewChange={setCurrentView} 
              onLogout={handleLogout}
              toggleSidebar={toggleSidebar}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
              <div className="max-w-6xl mx-auto">
                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
          {currentView !== View.AUTH && (
            <Navbar 
              user={user} 
              isAppMode={false} 
              onViewChange={setCurrentView} 
              onLogout={handleLogout} 
              toggleSidebar={() => {}}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
          )}
          <main className="flex-grow">
            {renderContent()}
          </main>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <CustomToastProvider>
    <AppContainer />
  </CustomToastProvider>
);

export default App;