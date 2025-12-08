import React, { useState } from 'react';
import { View } from '../types';

interface PricingProps {
  onSelectPlan: () => void;
  onBack: () => void;
  isLoggedIn: boolean;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan, onBack, isLoggedIn }) => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for trying out the platform',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { text: '5 Daily Generations', included: true },
        { text: 'Basic Hashtags', included: true },
        { text: '1 Social Profile', included: true },
        { text: 'Community Support', included: true },
        { text: 'AI Bio Writer', included: false },
        { text: 'Analytics Dashboard', included: false },
      ],
      buttonText: isLoggedIn ? 'Current Plan' : 'Start for Free',
      highlight: false,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      name: 'Pro',
      description: 'For serious content creators',
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        { text: 'Unlimited Generations', included: true },
        { text: 'AI Bio Writer', included: true },
        { text: 'All Platforms', included: true },
        { text: 'Analytics & History', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Caption AI', included: true },
      ],
      buttonText: 'Get Started',
      highlight: true,
      badge: 'Most Popular',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      name: 'Agency',
      description: 'Manage multiple brands at scale',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Team Collaboration', included: true },
        { text: 'White-label Reports', included: true },
        { text: 'API Access', included: true },
        { text: 'Dedicated Manager', included: true },
        { text: 'Custom Integrations', included: true },
      ],
      buttonText: 'Contact Sales',
      highlight: false,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  const faqs = [
    {
      q: 'Can I cancel anytime?',
      a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, debit cards, and PayPal. Enterprise customers can also pay via invoice.',
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes! Our Starter plan is completely free forever. You can also try Pro features with our 7-day free trial.',
    },
    {
      q: 'Can I switch plans later?',
      a: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 animate-fade-in relative transition-colors duration-300">
      {/* Close Button */}
      <button
        onClick={onBack}
        className="absolute top-6 right-6 md:top-8 md:right-8 p-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all z-20"
        title="Back to Home"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 mb-4">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that's right for your growth. No hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${isYearly ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-700'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${isYearly ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                Save 17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 border flex flex-col transition-all duration-300 hover:-translate-y-2 ${
                plan.highlight
                  ? 'bg-white dark:bg-gray-800 border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 z-10'
                  : 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  plan.highlight
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {plan.monthlyPrice === 0 ? '/forever' : isYearly ? '/year' : '/month'}
                  </span>
                </div>
                {isYearly && plan.monthlyPrice > 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Save ${plan.monthlyPrice * 12 - plan.yearlyPrice} per year
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                    <span className={feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onSelectPlan}
                disabled={isLoggedIn && index === 0}
                className={`w-full py-3.5 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25'
                    : isLoggedIn && index === 0
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            All Features Comparison
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Starter</th>
                    <th className="text-center py-4 px-6 font-semibold text-indigo-600 dark:text-indigo-400">Pro</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Agency</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Daily Generations', starter: '5', pro: 'Unlimited', agency: 'Unlimited' },
                    { feature: 'Hashtag Generator', starter: true, pro: true, agency: true },
                    { feature: 'Bio Writer', starter: false, pro: true, agency: true },
                    { feature: 'Caption AI', starter: false, pro: true, agency: true },
                    { feature: 'Analytics', starter: false, pro: true, agency: true },
                    { feature: 'Team Members', starter: '1', pro: '3', agency: 'Unlimited' },
                    { feature: 'API Access', starter: false, pro: false, agency: true },
                    { feature: 'Priority Support', starter: false, pro: true, agency: true },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{row.feature}</td>
                      {['starter', 'pro', 'agency'].map((plan) => (
                        <td key={plan} className="text-center py-4 px-6">
                          {typeof row[plan as keyof typeof row] === 'boolean' ? (
                            row[plan as keyof typeof row] ? (
                              <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )
                          ) : (
                            <span className={`font-medium ${plan === 'pro' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>
                              {row[plan as keyof typeof row]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-gray-600 dark:text-gray-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to grow your social presence?</h3>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join 50,000+ creators who use HashtagGenius to generate viral content. Start your free trial today.
            </p>
            <button
              onClick={onSelectPlan}
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
