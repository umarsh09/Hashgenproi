import React, { useEffect, useState } from 'react';
import { onAuthStateChange } from '../services/authService';
import { UserProfile } from '../types';

interface ProtectedRouteProps {
  children: React.ReactElement;
  fallback?: React.ReactElement;
  onUnauthorized?: () => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
  onUnauthorized
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (!firebaseUser && onUnauthorized) {
        onUnauthorized();
      }
    });

    return () => unsubscribe();
  }, [onUnauthorized]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You need to be logged in to access this page.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

// HOC version - alternative usage pattern
export const withProtectedRoute = <P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    fallback?: React.ReactElement;
    onUnauthorized?: () => void;
  }
) => {
  return (props: P) => (
    <ProtectedRoute
      fallback={options?.fallback}
      onUnauthorized={options?.onUnauthorized}
    >
      <Component {...props} />
    </ProtectedRoute>
  );
};
