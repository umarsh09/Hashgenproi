import React, { useEffect } from 'react';
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

const APP_VERSION = 'v1.0.2-debug';

export const Home: React.FC<HomeProps> = ({ onStart, onPricing, user, history = [], isDashboard = false, onNavigate }) => {
  // Debug: Log when component mounts and props change
  useEffect(() => {
    console.log('🏠 Home component mounted/updated', {
      version: APP_VERSION,
      hasOnStart: typeof onStart,
      hasOnPricing: typeof onPricing,
      onStartValue: onStart,
      onPricingValue: onPricing,
      user: user?.email || 'No user',
      timestamp: new Date().toISOString()
    });
  }, [onStart, onPricing, user]);

  // Handle Start button click with explicit handler
  const handleStartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🚀 Start button clicked!', { hasOnStart: typeof onStart, user });
    if (onStart && typeof onStart === 'function') {
      onStart();
    } else {
      console.error('❌ onStart is not a function!', onStart);
      alert('Error: Start button handler not found. Check console.');
    }
  };

  // Handle Pricing button click
  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('💎 Pricing button clicked!', { hasOnPricing: typeof onPricing });
    if (onPricing && typeof onPricing === 'function') {
      onPricing();
    } else {
      console.error('❌ onPricing is not a function!', onPricing);
      alert('Error: Pricing button handler not found. Check console.');
    }
  };

  // Features Linked to Views
  const dashboardFeatures = [
    { title: 'Hashtag Generator', icon: '⚡', desc: 'Create viral tags', view: View.GENERATOR_HASHTAG, color: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
    { title: 'Bio Writer', icon: '✍️', desc: 'Craft perfect bios', view: View.GENERATOR_BIO, color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
    { title: 'Caption Generator', icon: '📝', desc: 'Write engaging captions', view: View.GENERATOR_CAPTION, color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    { title: 'Reels Script', icon: '🎬', desc: 'Viral video scripts', view: View.GENERATOR_SCRIPT, color: 'bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' },
    { title: 'Content Ideas', icon: '💡', desc: 'Get inspired daily', view: View.GENERATOR_IDEA, color: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' },
    { title: 'Competitor Analysis', icon: '🕵️', desc: 'Analyze competitors', view: View.ANALYZER_COMPETITOR, color: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
    { title: 'Profile Audit', icon: '🔍', desc: 'Check your score', view: View.ANALYZER_AUDIT, color: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
    { title: 'Emoji Maker', icon: '🎨', desc: 'Creative emoji art', view: View.GENERATOR_EMOJI, color: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
    { title: 'Content Scheduler', icon: '📅', desc: 'Plan your posts', view: View.GENERATOR_SCHEDULE, color: 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' },
    { title: 'Trend Watch', icon: '🔥', desc: 'Spot viral trends', view: View.GENERATOR_TREND, color: 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' },
    { title: 'Email Writer', icon: '📧', desc: 'Professional outreach', view: View.GENERATOR_EMAIL, color: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' },
  ];

  const faqs = [
    { q: "Is it free to use?", a: "Yes, we offer a free tier with daily credits. You can upgrade for unlimited access." },
    { q: "How does the AI work?", a: "We use DeepSeek's advanced AI models to analyze trends and generate context-aware content." },
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
    const creditsLeft = user?.plan === 'free' ? 5 - (history.filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString()).length) : '∞';
    const recentActivity = history.slice(0, 3);

    return (
      <div className="flex flex-col animate-fade-in space-y-8 pb-12">
        {/* Welcome Section with Gradient Background */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-3xl -z-10"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-full">Active</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Welcome back, <span className="text-indigo-600 dark:text-indigo-400 font-bold">{user?.name}</span> 👋
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex gap-3 self-start md:self-auto">
              <button
                onClick={() => onNavigate?.(View.GENERATOR_HASHTAG)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1 hover:shadow-indigo-500/50 flex items-center gap-2"
              >
                <span>⚡</span> Generate Now
              </button>
              <button
                onClick={() => onNavigate?.(View.HISTORY)}
                className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-200 dark:border-gray-700 transition-all transform hover:-translate-y-1 flex items-center gap-2"
              >
                <span>📜</span>
                <span className="hidden sm:inline">History</span>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 card-3d-container">
            <div className="card-3d bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
                <div className="flex items-start gap-3">
                    <span className="p-2.5 sm:p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl text-xl sm:text-2xl flex-shrink-0">📊</span>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-green-500 font-medium">+{history.filter(h => new Date(h.timestamp) > new Date(Date.now() - 86400000)).length} today</p>
                    </div>
                </div>
                <div className="mt-3">
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{totalGenerations}</h3>
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-xs sm:text-sm">Total Generated</span>
                </div>
            </div>

            <div className="card-3d bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
                <div className="flex items-start gap-3">
                    <span className="p-2.5 sm:p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-xl text-xl sm:text-2xl flex-shrink-0">🪙</span>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-400 font-medium">{user?.plan === 'free' ? 'Free Plan' : 'Premium'}</p>
                    </div>
                </div>
                <div className="mt-3">
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{creditsLeft}</h3>
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-xs sm:text-sm">Credits Left</span>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full" style={{ width: user?.plan === 'free' ? `${(Number(creditsLeft)/5)*100}%` : '100%' }}></div>
                    </div>
                </div>
            </div>

            <div className="card-3d bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
                <div className="flex items-start gap-3">
                    <span className="p-2.5 sm:p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl text-xl sm:text-2xl flex-shrink-0">💾</span>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">In history</p>
                    </div>
                </div>
                <div className="mt-3">
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{history.length}</h3>
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-xs sm:text-sm">Saved Items</span>
                </div>
            </div>

            <div className="card-3d bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-indigo-400/30 shadow-sm hover:shadow-xl flex flex-col justify-between min-h-[140px] sm:min-h-[160px] cursor-pointer group" onClick={onPricing}>
                <div className="flex items-start gap-3">
                    <span className="p-2.5 sm:p-3 bg-white/20 text-white rounded-xl text-xl sm:text-2xl flex-shrink-0">💎</span>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-indigo-100 font-medium flex items-center gap-1">Upgrade <span className="group-hover:translate-x-1 transition-transform">→</span></p>
                    </div>
                </div>
                <div className="mt-3">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white capitalize">{user?.plan}</h3>
                    <span className="text-indigo-100 font-medium text-xs sm:text-sm">Current Plan</span>
                </div>
            </div>
        </div>

        {/* Quick Actions & Trending Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all group cursor-pointer" onClick={() => onNavigate?.(View.GENERATOR_HASHTAG)}>
                <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm">
                        ⚡
                    </div>
                    <span className="text-white/80 text-xs font-medium bg-white/10 px-3 py-1 rounded-full">Popular</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Quick Generate</h3>
                <p className="text-purple-100 text-sm mb-4">Generate viral hashtags in seconds</p>
                <div className="flex items-center text-white font-medium text-sm group-hover:translate-x-1 transition-transform">
                    Start Now <span className="ml-2">→</span>
                </div>
            </div>

            {/* Trending Now */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🔥</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Trending Now</h3>
                </div>
                <div className="space-y-3">
                    {['#AIContent', '#SocialMedia2024', '#CreatorEconomy', '#ViralMarketing'].map((tag, i) => (
                        <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tag}</span>
                            <span className="text-xs text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                        </div>
                    ))}
                </div>
                <button onClick={() => onNavigate?.(View.GENERATOR_TREND)} className="w-full mt-4 py-2 text-sm text-center text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                    View All Trends
                </button>
            </div>

            {/* Pro Tip */}
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm mb-4">
                        💡
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Pro Tip</h3>
                    <p className="text-amber-50 text-sm leading-relaxed">
                        Use 3-5 high-engagement hashtags with 8-12 niche tags for maximum reach on Instagram!
                    </p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">📈</span>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Usage Analytics</h3>
                    </div>
                    <select className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 outline-none cursor-pointer hover:border-indigo-500 transition-colors">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>
                {/* Visual Chart Mockup */}
                <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
                    {[35, 55, 40, 70, 45, 90, 65].map((h, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                            <div className="relative w-full rounded-t-lg bg-gradient-to-t from-indigo-50 to-transparent dark:from-indigo-900/20 h-full flex items-end overflow-hidden">
                                 <div
                                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 dark:from-indigo-500 dark:to-indigo-300 rounded-t-lg transition-all duration-500 group-hover:from-purple-600 group-hover:to-pink-400 relative shadow-lg"
                                    style={{ height: `${h}%` }}
                                 >
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                                        <div className="font-bold">{h} items</div>
                                        <div className="text-[10px] text-gray-300">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                                    </div>
                                 </div>
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Total: <span className="font-bold text-gray-900 dark:text-white">{totalGenerations}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Avg: <span className="font-bold text-gray-900 dark:text-white">{Math.round(totalGenerations / 7)}/day</span></span>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl">⏱️</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                </div>
                <div className="space-y-4">
                    {recentActivity.length > 0 ? recentActivity.map((item, i) => (
                        <div key={i} className="flex gap-3 items-start group p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all cursor-pointer">
                             <div className={`mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm ${
                                item.type === 'bio' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                                item.type === 'hashtag' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                             }`}>
                                {item.type === 'bio' ? '✍️' : (item.type === 'hashtag' ? '#' : '✨')}
                             </div>
                             <div className="flex-1 min-w-0">
                                 <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.keyword}</p>
                                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize flex items-center gap-2">
                                    <span>{item.type}</span>
                                    <span>•</span>
                                    <span>{new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                 </p>
                             </div>
                        </div>
                    )) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-3xl">📭</span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">No activity yet</p>
                            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Start creating content!</p>
                        </div>
                    )}
                    {recentActivity.length > 0 && (
                        <button onClick={() => onNavigate?.(View.HISTORY)} className="w-full py-2.5 text-sm text-center text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all border border-transparent hover:border-indigo-200 dark:hover:border-indigo-500/30">
                            View All Activity →
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* Achievement Badge */}
        {totalGenerations >= 10 && (
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-2xl shadow-xl">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg transform -rotate-6">
                  🏆
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Achievement Unlocked!</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {totalGenerations >= 100 ? "Content Master 🎖️ - 100+ generations!" :
                     totalGenerations >= 50 ? "Rising Star ⭐ - 50+ generations!" :
                     "Creator 🚀 - 10+ generations!"}
                  </p>
                  <div className="mt-3 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((totalGenerations / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {totalGenerations < 100 ? `${100 - totalGenerations} more to reach Content Master!` : "You're a Content Master! 🎉"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tools Grid - 3D Perspective */}
        <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span>🛠️</span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Creative Studio</h2>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {dashboardFeatures.length} tools available
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 card-3d-container">
                {dashboardFeatures.map((feature, idx) => (
                <div
                    key={idx}
                    onClick={() => onNavigate?.(feature.view)}
                    className="card-3d group p-4 sm:p-5 rounded-xl sm:rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-500/50 cursor-pointer flex flex-col items-center text-center transition-all hover:shadow-xl"
                >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-3 transition-transform group-hover:scale-110 ${feature.color}`}>
                        {feature.icon}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{feature.desc}</p>
                </div>
                ))}
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
            Powered by DeepSeek AI
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Stop guessing. <br />
            Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 animate-pulse-glow">Going Viral.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Generate context-aware hashtags, compelling bios, and captions in seconds.
            The only AI tool you need for social media growth.
          </p>

          <SocialIcons />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              type="button"
              onClick={handleStartClick}
              aria-label="Start using HashGenPro for free"
              className="w-full sm:w-auto px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-base hover:bg-gray-800 dark:hover:bg-gray-200 transition-all transform hover:scale-105 shadow-2xl hover:shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span aria-hidden="true">✨</span> Start for Free
            </button>
            <button
              type="button"
              onClick={handlePricingClick}
              aria-label="View pricing plans"
              className="w-full sm:w-auto px-10 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white rounded-full font-bold text-base border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span aria-hidden="true">💎</span> See Pricing
            </button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
             <span>✓ No credit card</span>
             <span>✓ Free trial</span>
             <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-10 bg-indigo-600 text-white">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 card-3d-container">
                {[
                    { step: '01', title: 'Choose Platform', desc: 'Select Instagram, TikTok, LinkedIn or others.', icon: '📱' },
                    { step: '02', title: 'Describe Topic', desc: 'Type a few words about your post or image.', icon: '⌨️' },
                    { step: '03', title: 'Copy & Paste', desc: 'Get AI-optimized tags instantly and post.', icon: '🚀' }
                ].map((item, i) => (
                    <div key={i} className="card-3d relative p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group">
                        <div className="absolute -top-6 left-8 bg-indigo-600 text-white text-xl font-bold w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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
                  <span className="text-xl font-bold text-gray-900 dark:text-white">HashGenPro</span>
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
             <div className="flex flex-col sm:flex-row items-center gap-2">
               <p className="text-gray-400 text-sm">© {new Date().getFullYear()} HashGenPro AI. All rights reserved.</p>
               <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-mono rounded border border-indigo-200 dark:border-indigo-800">
                 {APP_VERSION}
               </span>
             </div>
             <div className="flex gap-4">
                <a href="#" aria-label="Follow us on X (Twitter)" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg" className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" alt="X (Twitter)" />
                </a>
                <a href="#" aria-label="Follow us on Instagram" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" alt="Instagram" />
                </a>
                <a href="#" aria-label="Follow us on LinkedIn" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" alt="LinkedIn" />
                </a>
                <a href="#" aria-label="Follow us on Facebook" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" alt="Facebook" />
                </a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};