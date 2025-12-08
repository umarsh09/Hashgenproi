import React from 'react';
import { UserProfile, GenerationResult, View } from '../types';
import { PLATFORMS } from '../constants';

interface HomeProps {
  onStart: () => void;
  onPricing: () => void;
  user: UserProfile | null;
  history?: GenerationResult[];
  isDashboard?: boolean;
  onNavigate?: (view: View) => void;
}

export const Home: React.FC<HomeProps> = ({ onStart, onPricing, user, history = [], isDashboard = false, onNavigate }) => {
  // Features Linked to Views
  const dashboardFeatures = [
    { title: 'Hashtag Generator', icon: '⚡', desc: 'Viral tags for any platform.', view: View.GENERATOR_HASHTAG, color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { title: 'Bio Writer', icon: '✍️', desc: 'Craft the perfect profile bio.', view: View.GENERATOR_BIO, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { title: 'Caption AI', icon: '📝', desc: 'Write engaging post captions.', view: View.GENERATOR_CAPTION, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { title: 'Reels Script', icon: '🎬', desc: 'Video scripts that hook viewers.', view: View.GENERATOR_SCRIPT, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
    { title: 'Story Ideas', icon: '💡', desc: 'Never run out of content ideas.', view: View.GENERATOR_IDEA, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { title: 'Competitor Spy', icon: '🕵️', desc: 'Analyze top performing profiles.', view: View.ANALYZER_COMPETITOR, color: 'from-red-500 to-pink-500', bgColor: 'bg-red-50 dark:bg-red-900/20' },
    { title: 'Profile Audit', icon: '🔍', desc: 'Get a score on your profile.', view: View.ANALYZER_AUDIT, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { title: 'Emoji Maker', icon: '🎨', desc: 'Custom emoji combinations.', view: View.GENERATOR_EMOJI, color: 'from-orange-500 to-amber-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
    { title: 'Scheduler', icon: '📅', desc: 'Plan your posts ahead.', view: View.GENERATOR_SCHEDULE, color: 'from-teal-500 to-cyan-500', bgColor: 'bg-teal-50 dark:bg-teal-900/20' },
    { title: 'Trend Watch', icon: '🔥', desc: 'Real-time viral topics.', view: View.GENERATOR_TREND, color: 'from-rose-500 to-red-500', bgColor: 'bg-rose-50 dark:bg-rose-900/20' },
    { title: 'Email Writer', icon: '📧', desc: 'Draft outreach emails.', view: View.GENERATOR_EMAIL, color: 'from-cyan-500 to-blue-500', bgColor: 'bg-cyan-50 dark:bg-cyan-900/20' },
    { title: 'Sports Content', icon: '🏆', desc: 'Sports hashtags & predictions.', view: View.GENERATOR_SPORTS, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
  ];

  const faqs = [
    { q: "Is it free to use?", a: "Yes, we offer a free tier with daily credits. You can upgrade for unlimited access." },
    { q: "How does the AI work?", a: "We use Google's advanced Gemini models to analyze trends and generate context-aware content." },
    { q: "Can I use it for business?", a: "Absolutely! Our tools are designed for creators, businesses, and agencies." },
    { q: "Do you support multiple languages?", a: "Yes, we support over 15 languages including English, Spanish, Hindi, and more." }
  ];

  // Real Logo Icons
  const SocialIcons = () => (
    <div className="flex gap-4 sm:gap-6 justify-center mt-8 items-center perspective-1000">
      <div className="w-14 h-14 p-2 bg-white rounded-2xl shadow-lg transform animate-float flex items-center justify-center border border-gray-100">
        <img src={PLATFORMS.instagram.iconUrl} alt="Instagram" className="w-full h-full object-contain" />
      </div>
      <div className="w-14 h-14 p-2 bg-white rounded-2xl shadow-lg transform animate-float flex items-center justify-center border border-gray-100" style={{ animationDelay: '0.5s' }}>
        <img src={PLATFORMS.tiktok.iconUrl} alt="TikTok" className="w-full h-full object-contain" />
      </div>
      <div className="w-14 h-14 p-2 bg-white rounded-2xl shadow-lg transform animate-float flex items-center justify-center border border-gray-100" style={{ animationDelay: '1s' }}>
        <img src={PLATFORMS.linkedin.iconUrl} alt="LinkedIn" className="w-full h-full object-contain" />
      </div>
      <div className="w-14 h-14 p-2 bg-white rounded-2xl shadow-lg transform animate-float flex items-center justify-center border border-gray-100" style={{ animationDelay: '1.5s' }}>
        <img src={PLATFORMS.youtube.iconUrl} alt="YouTube" className="w-full h-full object-contain" />
      </div>
    </div>
  );

  // DASHBOARD VIEW (Logged In)
  if (isDashboard) {
    const totalGenerations = history.length;
    const todayGenerations = history.filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString()).length;
    const creditsLeft = user?.plan === 'free' ? Math.max(0, 5 - todayGenerations) : '∞';
    const recentActivity = history.slice(0, 5);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 -m-4 md:-m-6 lg:-m-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={user?.avatar}
                  alt="Avatar"
                  className="w-16 h-16 rounded-2xl border-2 border-white/30 shadow-lg"
                />
                <div>
                  <p className="text-indigo-100 text-sm">Welcome back,</p>
                  <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
                  <p className="text-indigo-100 text-sm mt-1">Ready to create viral content?</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onStart}
                  className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <span>⚡</span> Quick Generate
                </button>
                <button
                  onClick={() => onNavigate?.(View.HISTORY)}
                  className="px-6 py-3 bg-white/20 backdrop-blur text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all flex items-center gap-2"
                >
                  <span>📊</span> View History
                </button>
                <button
                  onClick={onPricing}
                  className="px-6 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-xl shadow-lg hover:bg-yellow-300 transition-all flex items-center gap-2"
                >
                  <span>💎</span> Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xl shadow-lg">
                  📊
                </div>
                <span className="text-xs font-medium text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  +{todayGenerations} today
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{totalGenerations}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Generated</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white text-xl shadow-lg">
                  🪙
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${user?.plan === 'free' ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' : 'text-green-500 bg-green-50 dark:bg-green-900/20'}`}>
                  {user?.plan === 'free' ? 'Free Plan' : 'Unlimited'}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{creditsLeft}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Credits Left</p>
              {user?.plan === 'free' && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full" style={{ width: `${(Number(creditsLeft)/5)*100}%` }}></div>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl shadow-lg">
                  💾
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{history.length}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Saved Items</p>
            </div>

            <div onClick={onPricing} className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group overflow-hidden relative">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white text-xl">💎</div>
                  <svg className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white capitalize">{user?.plan}</h3>
                <p className="text-sm text-indigo-100">Upgrade Plan →</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Panel - Recent Activity & Chart */}
            <div className="lg:col-span-1 space-y-6">
              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                    <span className="text-xl">🕐</span> Recent Activity
                  </h3>
                </div>
                <div className="p-4">
                  {recentActivity.length > 0 ? (
                    <div className="space-y-3">
                      {recentActivity.map((item, i) => (
                        <div key={i} className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${
                            item.type === 'bio' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
                            item.type === 'hashtag' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                            'bg-green-100 dark:bg-green-900/30 text-green-600'
                          }`}>
                            {item.type === 'bio' ? '✍️' : (item.type === 'hashtag' ? '#' : '✨')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.keyword}</p>
                            <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">📭</div>
                      <p className="text-sm text-gray-500">No activity yet</p>
                    </div>
                  )}
                </div>
                {recentActivity.length > 0 && (
                  <div className="px-4 pb-4">
                    <button onClick={() => onNavigate?.(View.HISTORY)} className="w-full py-3 text-sm text-center text-indigo-600 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors">
                      View Full History →
                    </button>
                  </div>
                )}
              </div>

              {/* Weekly Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <span className="text-xl">📈</span> Weekly Activity
                </h3>
                <div className="h-40 w-full flex items-end justify-between gap-2">
                  {[35, 55, 40, 70, 45, 90, 65].map((h, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg h-32 flex items-end overflow-hidden">
                        <div className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-lg transition-all" style={{ height: `${h}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tips */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                  <span className="text-xl">💡</span> Pro Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">•</span>
                    Be specific with descriptions for better results
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">•</span>
                    Use trending topics for higher engagement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">•</span>
                    Mix popular and niche hashtags
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Panel - Tools Grid */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>🎨</span> Creative Studio
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">AI-powered tools for content creation</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {dashboardFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigate?.(feature.view)}
                    className="group p-4 rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-500/50 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-3"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-xl text-white group-hover:scale-110 transition-transform shadow-md flex-shrink-0`}>
                      {feature.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">{feature.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PUBLIC LANDING PAGE
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 text-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-900/10 pointer-events-none -z-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-[100px] animate-pulse -z-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] animate-pulse delay-1000 -z-10" />

        {/* 3D Floating Elements */}
        <div className="absolute top-40 left-[10%] hidden lg:block animate-float" style={{ animationDuration: '8s' }}>
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex items-center justify-center text-3xl rotate-12">
                #
            </div>
        </div>
        <div className="absolute bottom-40 right-[10%] hidden lg:block animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}>
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex items-center justify-center text-3xl -rotate-12">
                ✨
            </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-white/50 dark:bg-indigo-900/20 backdrop-blur-sm text-indigo-600 dark:text-indigo-300 text-sm font-semibold mb-4 shadow-sm hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Powered by Google Gemini AI
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Stop guessing. <br />
            Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 animate-pulse-glow">Going Viral.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Generate context-aware hashtags, compelling bios, and captions in seconds.
            The only AI tool you need for social media growth.
          </p>

          <SocialIcons />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all transform hover:scale-105 shadow-2xl hover:shadow-indigo-500/20"
            >
              Start for Free
            </button>
            <button
              onClick={onPricing}
              className="w-full sm:w-auto px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white rounded-full font-bold text-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg"
            >
              See Pricing
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500 dark:text-gray-400">
             <span>✓ No credit card required</span>
             <span>✓ 7-day free trial</span>
             <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
         <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
               <div className="text-4xl font-bold mb-1">10M+</div>
               <div className="text-indigo-200 text-sm">Hashtags Generated</div>
            </div>
            <div>
               <div className="text-4xl font-bold mb-1">50k+</div>
               <div className="text-indigo-200 text-sm">Happy Creators</div>
            </div>
            <div>
               <div className="text-4xl font-bold mb-1">15+</div>
               <div className="text-indigo-200 text-sm">Languages Supported</div>
            </div>
            <div>
               <div className="text-4xl font-bold mb-1">4.9/5</div>
               <div className="text-indigo-200 text-sm">Average Rating</div>
            </div>
         </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black/20">
        <div className="container mx-auto px-6 text-center">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">Powering top brands & creators</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 items-center filter">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="h-10 hover:scale-110 transition-transform" alt="Instagram" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" className="h-10 hover:scale-110 transition-transform" alt="Facebook" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" className="h-10 hover:scale-110 transition-transform" alt="YouTube" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="h-10 hover:scale-110 transition-transform" alt="LinkedIn" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg" className="h-9 hover:scale-110 transition-transform" alt="X" />
            </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">How it works</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Three simple steps to skyrocket your engagement.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { step: '01', title: 'Choose Platform', desc: 'Select Instagram, TikTok, LinkedIn or others.', icon: '📱' },
                    { step: '02', title: 'Describe Topic', desc: 'Type a few words about your post or image.', icon: '⌨️' },
                    { step: '03', title: 'Copy & Paste', desc: 'Get AI-optimized tags instantly and post.', icon: '🚀' }
                ].map((item, i) => (
                    <div key={i} className="relative p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group">
                        <div className="absolute -top-6 left-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            {item.step}
                        </div>
                        <div className="mt-6 text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-gray-800/50">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg text-gray-900 dark:text-white">
                                <span>{faq.q}</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-gray-600 dark:text-gray-400 mt-4 group-open:animate-fade-in leading-relaxed">
                                {faq.a}
                            </p>
                        </details>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-black py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">#</div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">HashtagGenius</span>
               </div>
               <p className="text-gray-500 dark:text-gray-400 text-sm">AI-powered tools for the modern creator.</p>
            </div>

            {[
                { header: 'Product', links: ['Features', 'Pricing', 'API', 'Showcase'] },
                { header: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
                { header: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((col, i) => (
                <div key={i}>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">{col.header}</h4>
                    <ul className="space-y-2">
                        {col.links.map(link => (
                            <li key={link}><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white text-sm transition-colors">{link}</a></li>
                        ))}
                    </ul>
                </div>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-gray-400 text-sm">© 2025 HashtagGenius AI. All rights reserved.</p>
             <div className="flex gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg" className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer" alt="X" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer" alt="Instagram" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer" alt="LinkedIn" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer" alt="Facebook" />
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
