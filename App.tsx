import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Generator } from './components/Generator';
import { BioGenerator } from './components/BioGenerator';
import { UniversalGenerator } from './components/UniversalGenerator';
import { FigmaGenerator } from './components/FigmaGenerator';
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

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// ERROR BOUNDARY: Catches app crashes (White Screen)
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-500 mb-6 max-w-md">The application encountered an unexpected error. This is often due to cached data conflicts.</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-xs text-left overflow-auto max-w-lg mb-8 w-full border border-gray-200 dark:border-gray-700">
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => {
              localStorage.clear(); 
              window.location.reload();
            }}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition-transform hover:scale-105"
          >
            Clear Cache & Restart
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Splash Loader Component
const SplashLoader = () => (
  <div className="fixed inset-0 z-[100] bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex flex-col items-center justify-center text-white overflow-hidden">
    {/* Animated Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>

    {/* Main Content */}
    <div className="relative z-10 flex flex-col items-center">
      {/* Logo with Advanced Animation */}
      <div className="relative w-40 h-40 mb-12">
        {/* Outer Rotating Ring */}
        <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>

        {/* Middle Pulsing Ring */}
        <div className="absolute inset-4 border-4 border-purple-500/40 rounded-full animate-ping"></div>

        {/* Inner Counter-Rotating Ring */}
        <div className="absolute inset-8 border-4 border-pink-500/30 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>

        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-indigo-500/50 animate-pulse">
            <span className="text-4xl font-bold">#</span>
          </div>
        </div>

        {/* Orbiting Dots */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-400 rounded-full shadow-lg shadow-indigo-500/50"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDelay: '2s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-lg shadow-pink-500/50"></div>
        </div>
      </div>

      {/* Brand Name */}
      <h1 className="text-5xl font-extrabold mb-3 tracking-tight animate-fade-in">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse-glow">
          HashGenPro
        </span>
      </h1>
      <p className="text-indigo-200 text-lg font-medium mb-8 animate-fade-in">Powered by AI</p>

      {/* Progress Bar */}
      <div className="w-80 h-2 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden mb-4 shadow-lg">
        <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-[width_2.5s_ease-in-out_forwards] shadow-lg shadow-indigo-500/50" style={{ width: '0%' }}></div>
      </div>

      {/* Loading Text */}
      <div className="flex items-center gap-2 text-indigo-200">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <p className="text-sm font-medium">Initializing AI Engine</p>
      </div>

      {/* Features Badges */}
      <div className="flex gap-3 mt-12 flex-wrap justify-center max-w-md">
        {['AI-Powered', 'Multi-Platform', 'Lightning Fast'].map((feature, i) => (
          <div
            key={i}
            className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-white/80 animate-fade-in"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Main App Container
const AppContainer: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  
  // Persistent History
  const [history, setHistory] = useState<GenerationResult[]>(() => {
    try {
      const saved = localStorage.getItem('hg_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("History parse error", e);
      return [];
    }
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loadingApp, setLoadingApp] = useState(true);
  
  // Persistence State with Safety Checks
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('hg_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Error parsing user data", e);
      return null;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(() => {
    try {
      const saved = localStorage.getItem('hg_users');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Error parsing registered users", e);
      return [];
    }
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
    try {
      localStorage.setItem('hg_users', JSON.stringify(registeredUsers));
    } catch (e) { console.error("Saving users failed", e); }
  }, [registeredUsers]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('hg_current_user', JSON.stringify(user));
      else localStorage.removeItem('hg_current_user');
    } catch (e) { console.error("Saving current user failed", e); }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('hg_history', JSON.stringify(history));
    } catch (e) { console.error("Saving history failed", e); }
  }, [history]);

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
    
    const userIndex = registeredUsers.findIndex(u => u.email === user.email);
    if (userIndex === -1) return false;

    const registeredUser = registeredUsers[userIndex];

    if (registeredUser.password !== currentPass) {
      return false;
    }

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
      case View.GENERATOR_FIGMA:
        return <FigmaGenerator onGenerate={addToHistory} onBack={backToDashboard} />;

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
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth relative">
              <div className="max-w-6xl mx-auto pb-10">
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
  <ErrorBoundary>
    <CustomToastProvider>
      <AppContainer />
    </CustomToastProvider>
  </ErrorBoundary>
);

export default App;