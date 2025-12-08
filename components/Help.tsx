import React, { useState } from 'react';

interface HelpProps {
  onBack?: () => void;
}

const FAQ_DATA = [
  {
    category: 'Getting Started',
    icon: '🚀',
    questions: [
      {
        q: 'How do I generate hashtags?',
        a: 'Go to the Hashtag Generator, select your platform, enter a description of your content, and click Generate. Our AI will create relevant, trending hashtags optimized for your chosen platform.'
      },
      {
        q: 'What platforms are supported?',
        a: 'We support all major social media platforms including Instagram, TikTok, Twitter/X, LinkedIn, YouTube, and Facebook. Each platform has optimized tag limits and suggestions.'
      },
      {
        q: 'How many hashtags can I generate?',
        a: 'Free users get 5 generations per day. Pro users get unlimited generations. Each generation provides up to 30 hashtags depending on the platform.'
      }
    ]
  },
  {
    category: 'Features',
    icon: '✨',
    questions: [
      {
        q: 'What is the Bio Writer?',
        a: 'The Bio Writer creates compelling profile bios tailored to your platform. Choose a tone (Professional, Funny, Inspirational, etc.) and describe yourself - our AI crafts the perfect bio.'
      },
      {
        q: 'How does the Competitor Spy work?',
        a: 'Paste your competitor\'s content, bio, or strategy and our AI analyzes their approach, identifies their tactics, and suggests ways you can differentiate and improve.'
      },
      {
        q: 'What is Profile Audit?',
        a: 'Profile Audit analyzes your social media presence and provides a comprehensive score with actionable recommendations for improvement.'
      },
      {
        q: 'Can I generate content in different languages?',
        a: 'Yes! We support 15+ languages including English, Spanish, Hindi, Arabic, Portuguese, French, German, and more. Select your preferred language before generating.'
      }
    ]
  },
  {
    category: 'Account & Billing',
    icon: '💳',
    questions: [
      {
        q: 'Is there a free plan?',
        a: 'Yes! Our free plan includes 5 generations per day across all tools. No credit card required to start.'
      },
      {
        q: 'What\'s included in Pro?',
        a: 'Pro plan includes unlimited generations, priority AI processing, access to all tools, and premium support for $9.99/month.'
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Absolutely! You can cancel your subscription at any time from your Settings page. No questions asked, no hidden fees.'
      }
    ]
  },
  {
    category: 'Tips & Best Practices',
    icon: '💡',
    questions: [
      {
        q: 'How do I get the best hashtag results?',
        a: 'Be specific with your descriptions. Instead of "travel", try "backpacking through Southeast Asia with budget tips". The more context, the better the results.'
      },
      {
        q: 'How many hashtags should I use?',
        a: 'It varies by platform: Instagram (20-30), TikTok (3-5), Twitter (2-3), LinkedIn (3-5). Our generator optimizes for each platform automatically.'
      },
      {
        q: 'Should I use the same hashtags every post?',
        a: 'No! Rotate your hashtags to avoid being flagged as spam. Our generator provides unique sets each time to keep your content fresh.'
      }
    ]
  }
];

const QUICK_GUIDES = [
  { title: 'Hashtag Generator', icon: '#', desc: 'Generate viral hashtags for any platform', color: 'from-indigo-500 to-purple-500' },
  { title: 'Bio Writer', icon: '✍️', desc: 'Craft compelling profile bios', color: 'from-purple-500 to-pink-500' },
  { title: 'Caption AI', icon: '📝', desc: 'Create engaging post captions', color: 'from-blue-500 to-cyan-500' },
  { title: 'Reels Script', icon: '🎬', desc: 'Write video scripts that hook viewers', color: 'from-pink-500 to-rose-500' },
  { title: 'Competitor Spy', icon: '🕵️', desc: 'Analyze competitor strategies', color: 'from-red-500 to-orange-500' },
  { title: 'Profile Audit', icon: '🔍', desc: 'Get expert profile feedback', color: 'from-green-500 to-emerald-500' },
];

export const Help: React.FC<HelpProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('Getting Started');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const toggleQuestion = (q: string) => {
    setExpandedQuestions(prev =>
      prev.includes(q) ? prev.filter(item => item !== q) : [...prev, q]
    );
  };

  const filteredFAQ = FAQ_DATA.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const activeQuestions = searchQuery
    ? filteredFAQ.flatMap(c => c.questions)
    : FAQ_DATA.find(c => c.category === activeCategory)?.questions || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 -m-4 md:-m-6 lg:-m-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-3xl">❓</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Help Center</h1>
                <p className="text-indigo-100">Find answers and learn how to use HashtagGenius</p>
              </div>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 mb-8">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Categories */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">📚</span> Categories
              </h3>
              <div className="space-y-2">
                {FAQ_DATA.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setActiveCategory(cat.category);
                      setSearchQuery('');
                    }}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                      activeCategory === cat.category && !searchQuery
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="font-medium text-sm">{cat.category}</span>
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      activeCategory === cat.category && !searchQuery
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}>
                      {cat.questions.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">💬</span> Need More Help?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg">
                Contact Support
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">📊</span> Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Articles</span>
                  <span className="font-bold text-gray-900 dark:text-white">{FAQ_DATA.reduce((acc, c) => acc + c.questions.length, 0)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Categories</span>
                  <span className="font-bold text-gray-900 dark:text-white">{FAQ_DATA.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                  <span className="font-bold text-green-600 dark:text-green-400">&lt; 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - FAQ Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Guides */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">🎯</span> Quick Guides
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {QUICK_GUIDES.map((guide, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${guide.color} flex items-center justify-center text-xl text-white mb-3 group-hover:scale-110 transition-transform shadow-md`}>
                      {guide.icon}
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{guide.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{guide.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                  <span className="text-xl">❓</span>
                  {searchQuery ? `Search Results (${activeQuestions.length})` : activeCategory}
                </h3>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {activeQuestions.length > 0 ? (
                  activeQuestions.map((q, i) => (
                    <div key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <button
                        onClick={() => toggleQuestion(q.q)}
                        className="w-full flex items-start justify-between gap-4 text-left"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">{q.q}</span>
                        <span className={`text-gray-400 transition-transform flex-shrink-0 ${expandedQuestions.includes(q.q) ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                      {expandedQuestions.includes(q.q) && (
                        <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed animate-fade-in">
                          {q.a}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="text-4xl mb-3">🔍</div>
                    <p className="text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Helpful Resources */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-100 dark:border-green-800 p-5">
                <div className="text-3xl mb-2">📖</div>
                <div className="font-semibold text-gray-900 dark:text-white">Documentation</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Full guides & tutorials</div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 p-5">
                <div className="text-3xl mb-2">🎥</div>
                <div className="font-semibold text-gray-900 dark:text-white">Video Tutorials</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Learn by watching</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
