import React, { useState } from 'react';
import { registerUser, loginUser, loginWithGoogle, resetPassword, resendVerificationEmail } from '../services/authService';
import { UserProfile } from '../types';

interface AuthProps {
  onSuccess: (user: UserProfile) => void;
  onBack: () => void;
  initialMode?: 'login' | 'signup';
}

export const Auth: React.FC<AuthProps> = ({ onSuccess, onBack, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'verify-email'>(initialMode);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Store registered user temporarily
  const [registeredUser, setRegisteredUser] = useState<UserProfile | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (mode === 'forgot') {
      setLoading(true);
      try {
        await resetPassword(email);
        setSuccess('Password reset email sent! Check your inbox.');
        setTimeout(() => setMode('login'), 2000);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your name');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    setLoading(true);
    try {
      let user: UserProfile;

      if (mode === 'login') {
        user = await loginUser(email, password);
        if (rememberMe) {
          localStorage.setItem('userEmail', email);
        }
        onSuccess(user);
      } else {
        // Signup mode
        user = await registerUser(email, password, name);
        setRegisteredUser(user);
        setSuccess('✅ Account created! Please check your email to verify your account.');
        setMode('verify-email');
        // Don't call onSuccess yet - wait for email verification
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await resendVerificationEmail();
      setSuccess('✅ Verification email sent! Please check your inbox.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueWithoutVerification = () => {
    if (registeredUser) {
      onSuccess(registeredUser);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await loginWithGoogle();
      onSuccess(user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Email Verification Screen
  if (mode === 'verify-email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            {/* Email Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-5xl">📧</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Verify Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We've sent a verification link to <br />
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">{email}</span>
            </p>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm">
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">📌 Next Steps:</p>
              <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 ml-4 list-decimal">
                <li>Check your email inbox</li>
                <li>Click the verification link</li>
                <li>Return here and continue</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleContinueWithoutVerification}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Continue to App →
              </button>

              <button
                onClick={handleResendVerification}
                disabled={loading}
                className="w-full py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 transition-all"
              >
                {loading ? 'Sending...' : '↻ Resend Verification Email'}
              </button>

              <button
                onClick={() => setMode('login')}
                className="w-full py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                ← Back to Login
              </button>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
              Didn't receive the email? Check your spam folder or click resend above.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900 flex items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        aria-label="Go back to home"
        className="fixed top-4 left-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      {/* Auth Card */}
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">#</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {mode === 'login' ? 'Sign in to continue' : mode === 'signup' ? 'Start your journey' : 'Enter your email to reset'}
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name - Signup Only */}
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                  disabled={loading}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            {/* Password - Not for forgot */}
            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password - Signup Only */}
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••"
                  disabled={loading}
                />
              </div>
            )}

            {/* Remember Me - Login Only */}
            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </>
              ) : mode === 'login' ? (
                <>
                  <span>🚀</span>
                  <span>Sign In</span>
                </>
              ) : mode === 'signup' ? (
                <>
                  <span>✨</span>
                  <span>Create Account</span>
                </>
              ) : (
                <>
                  <span>📧</span>
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </form>

          {/* Google Login - Not for forgot */}
          {mode !== 'forgot' && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                aria-label="Continue with Google"
                className="w-full py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </>
          )}

          {/* Toggle Mode */}
          <div className="mt-6 text-center text-sm">
            {mode === 'forgot' ? (
              <button
                onClick={() => setMode('login')}
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                ← Back to login
              </button>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            Secure
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Verified
          </div>
        </div>
      </div>
    </div>
  );
};
