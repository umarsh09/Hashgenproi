import React, { forwardRef, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  icon?: string;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, errorMessage, icon, showPasswordToggle, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : props.type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 text-lg">{icon}</span>
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-xl ${
              icon ? 'pl-12' : 'pl-4'
            } ${
              showPasswordToggle ? 'pr-12' : 'pr-4'
            } py-3 sm:py-4 text-gray-900 dark:text-white focus:outline-none transition-all text-base disabled:opacity-50 ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:bg-white dark:focus:bg-gray-750'
            } ${className}`}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
          )}
        </div>
        {error && errorMessage && (
          <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
