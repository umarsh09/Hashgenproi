import React, { useState } from 'react';
import { registerUser, loginUser, loginWithGoogle } from '../services/authService';
import { UserProfile } from '../types';

interface AuthProps {
  onSuccess: (user: UserProfile) => void;
  onBack: () => void;
  initialMode?: 'login' | 'signup';
}

export const Auth: React.FC<AuthProps> = ({ onSuccess, onBack, initialMode = 'login' }) => {
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
    const newFieldErrors: any = {};
    let hasError = false;

    // Validation
    if (!isLogin && !name.trim()) {
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
      let user: UserProfile;

      if (isLogin) {
        // Firebase Login
        user = await loginUser(email, password);
      } else {
        // Firebase Register
        user = await registerUser(email, password, name);
      }

      // Success!
      onSuccess(user);

    } catch (error: any) {
      setErrorMsg(error.message);
      setFieldErrors({ email: true, password: true });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const user = await loginWithGoogle();
      onSuccess(user);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 animate-fade-in relative transition-colors duration-300 overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-50 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-full text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl group transform hover:scale-110"
        title="Back to Home"
      >
        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white h-full">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Powered by Firebase
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Ignite your<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200">social presence</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-md leading-relaxed mb-12">
            Join thousands of creators using AI to generate hashtags, bios, and captions that actually convert.
          </p>

          {/* Social Proof */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img className="w-12 h-12 rounded-full border-4 border-indigo-600 ring-2 ring-white/50" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="" />
                <img className="w-12 h-12 rounded-full border-4 border-indigo-600 ring-2 ring-white/50" src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" alt="" />
                <img className="w-12 h-12 rounded-full border-4 border-indigo-600 ring-2 ring-white/50" src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" alt="" />
                <img className="w-12 h-12 rounded-full border-4 border-indigo-600 ring-2 ring-white/50" src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" alt="" />
              </div>
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-300 text-xl">★</span>
                  ))}
                </div>
                <p className="text-sm font-medium text-white/80">Rated 4.9/5 by creators</p>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 pt-6">
              {['AI-Powered Content Generation', 'Multi-Platform Support', '15+ Languages Available'].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white dark:bg-gray-900 transition-colors relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Title */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold text-2xl mb-6 shadow-2xl shadow-indigo-500/50 transform hover:scale-110 transition-transform">
              #
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              {isLogin ? 'Welcome back!' : 'Get started'}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              {isLogin ? 'Enter your details to access your workspace' : 'Create your free account today'}
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
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg">👤</span>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-xl pl-12 pr-4 py-3 sm:py-4 text-gray-900 dark:text-white focus:outline-none transition-all text-base disabled:opacity-50 ${fieldErrors.name ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:bg-white dark:focus:bg-gray-750'}`}
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-lg">✉️</span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-xl pl-12 pr-4 py-3 sm:py-4 text-gray-900 dark:text-white focus:outline-none transition-all text-base disabled:opacity-50 ${fieldErrors.email ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:bg-white dark:focus:bg-gray-750'}`}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-lg">🔒</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-xl pl-12 pr-4 py-3 sm:py-4 text-gray-900 dark:text-white focus:outline-none transition-all text-base disabled:opacity-50 ${fieldErrors.password ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:bg-white dark:focus:bg-gray-750'}`}
                  placeholder="Minimum 6 characters"
                />
              </div>
              {!isLogin && password.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          password.length < 6 ? 'w-1/3 bg-red-500' :
                          password.length < 8 ? 'w-2/3 bg-yellow-500' :
                          'w-full bg-green-500'
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      password.length < 6 ? 'text-red-500' :
                      password.length < 8 ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {password.length < 6 ? 'Weak' : password.length < 8 ? 'Good' : 'Strong'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 sm:py-4 px-4 border border-transparent rounded-xl shadow-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Please wait...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all hover:border-gray-300 dark:hover:border-gray-600 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
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
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors underline-offset-2 hover:underline"
              >
                {isLogin ? 'Sign up for free' : 'Sign in instead'}
              </button>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <span>No Credit Card</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
