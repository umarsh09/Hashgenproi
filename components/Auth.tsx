import React, { useState } from 'react';

interface AuthProps {
  onLogin: (email: string, pass: string) => Promise<boolean>;
  onRegister: (name: string, email: string, pass: string) => Promise<boolean>;
  onBack: () => void;
  initialMode?: 'login' | 'signup';
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onRegister, onBack, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Error States
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{name?: boolean, email?: boolean, password?: boolean}>({});

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const newFieldErrors: {name?: boolean, email?: boolean, password?: boolean} = {};
    let hasError = false;

    // Validation
    if (!isLogin && !name) {
       newFieldErrors.name = true;
       hasError = true;
    }
    if (!email || !validateEmail(email)) {
       newFieldErrors.email = true;
       hasError = true;
    }
    if (!password || password.length < 6) {
       newFieldErrors.password = true;
       hasError = true;
    }

    if (hasError) {
        setFieldErrors(newFieldErrors);
        setErrorMsg("Please fix the errors highlighted below.");
        return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      if (isLogin) {
        const success = await onLogin(email, password);
        if (!success) {
          setErrorMsg("Invalid email or password. Please try again.");
          setFieldErrors({ email: true, password: true });
        }
      } else {
        const success = await onRegister(name, email, password);
        if (!success) {
          setErrorMsg("An account with this email already exists.");
          setFieldErrors({ email: true });
        }
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 animate-fade-in relative transition-colors duration-300">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 z-50 p-2 bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-full text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 shadow-sm group"
        title="Back to Home"
      >
        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white h-full">
          <h2 className="text-5xl font-bold mb-6 leading-tight">Ignite your <br/>social presence.</h2>
          <p className="text-xl text-indigo-100 max-w-md leading-relaxed">
            Join 10,000+ creators using AI to generate hashtags, bios, and captions that actually convert.
          </p>
          <div className="mt-12 flex gap-4">
            <div className="flex -space-x-4">
              <img className="w-10 h-10 rounded-full border-2 border-indigo-900" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="" />
              <img className="w-10 h-10 rounded-full border-2 border-indigo-900" src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" alt="" />
              <img className="w-10 h-10 rounded-full border-2 border-indigo-900" src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" alt="" />
            </div>
            <p className="flex items-center text-sm font-medium">Trusted by top creators</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-xl mb-6 shadow-lg shadow-indigo-500/20">
              #
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {isLogin ? 'Enter your details to access your workspace.' : 'Start your free journey today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Professional Alert Banner */}
            {errorMsg && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg animate-fade-in">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                                {errorMsg}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!isLogin && (
              <div className="animate-slide-up">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none transition-all ${fieldErrors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'}`} 
                  placeholder="John Doe" 
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none transition-all ${fieldErrors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'}`} 
                placeholder="you@example.com" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none transition-all ${fieldErrors.password ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'}`} 
                placeholder="Min 6 characters" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => {
                    setIsLogin(!isLogin);
                    setName('');
                    setEmail('');
                    setPassword('');
                    setErrorMsg(null);
                    setFieldErrors({});
                }} 
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
              >
                {isLogin ? 'Sign up for free' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};