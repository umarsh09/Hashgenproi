import React from 'react';
import { View } from '../types';

interface PricingProps {
  onSelectPlan: () => void;
  onBack: () => void;
  isLoggedIn: boolean;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan, onBack, isLoggedIn }) => {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out the generator.',
      features: ['5 Daily Generations', 'Basic Hashtags', '1 Social Profile', 'Community Support'],
      buttonText: isLoggedIn ? 'Current Plan' : 'Start for Free',
      highlight: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'For serious content creators.',
      features: ['Unlimited Generations', 'AI Bio Writer', 'All Platforms', 'Analytics & History', 'Priority Support'],
      buttonText: 'Get Started',
      highlight: true
    },
    {
      name: 'Agency',
      price: '$49',
      period: '/month',
      description: 'Manage multiple brands.',
      features: ['Everything in Pro', 'Team Collaboration', 'White-label Reports', 'API Access', 'Dedicated Manager'],
      buttonText: 'Contact Sales',
      highlight: false
    }
  ];

  return (
    <div className="py-24 px-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-in relative transition-colors duration-300">
        {/* Close Button */}
        <button 
            onClick={onBack}
            className="absolute top-6 right-6 md:top-8 md:right-8 p-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all z-20"
            title="Back to Home"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

      <div className="max-w-7xl mx-auto mt-8 md:mt-0">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-500 dark:text-gray-400">Choose the plan that's right for your growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`
                rounded-2xl p-8 border flex flex-col relative transition-transform duration-300 hover:-translate-y-2
                ${plan.highlight 
                  ? 'bg-white dark:bg-gray-800 border-indigo-500 shadow-2xl shadow-indigo-500/20' 
                  : 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm'}
              `}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  POPULAR
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-8">{plan.description}</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <span className="text-indigo-600 dark:text-indigo-400 text-lg">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onSelectPlan}
                disabled={isLoggedIn && index === 0}
                className={`
                  w-full py-3 rounded-xl font-bold transition-colors
                  ${plan.highlight 
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                    : isLoggedIn && index === 0 
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-default'
                      : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'}
                `}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};