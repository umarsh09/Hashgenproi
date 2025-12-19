import React, { useCallback, useMemo } from 'react';
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

const APP_VERSION = 'v1.0.4';

/* ----------------------------- CONSTANTS ----------------------------- */

const DASHBOARD_FEATURES = [
  { title: 'Hashtag Generator', icon: '⚡', view: View.GENERATOR_HASHTAG },
  { title: 'Bio Writer', icon: '✍️', view: View.GENERATOR_BIO },
  { title: 'Caption Generator', icon: '📝', view: View.GENERATOR_CAPTION },
  { title: 'Reels Script', icon: '🎬', view: View.GENERATOR_SCRIPT },
  { title: 'Content Ideas', icon: '💡', view: View.GENERATOR_IDEA },
  { title: 'Competitor Analysis', icon: '🕵️', view: View.ANALYZER_COMPETITOR },
  { title: 'Profile Audit', icon: '🔍', view: View.ANALYZER_AUDIT },
  { title: 'Emoji Maker', icon: '🎨', view: View.GENERATOR_EMOJI },
  { title: 'Content Scheduler', icon: '📅', view: View.GENERATOR_SCHEDULE },
  { title: 'Trend Watch', icon: '🔥', view: View.GENERATOR_TREND },
  { title: 'Email Writer', icon: '📧', view: View.GENERATOR_EMAIL },
];

const FAQS = [
  { q: 'Is it free to use?', a: 'Yes. Free tier with daily credits available.' },
  { q: 'How does the AI work?', a: 'Powered by DeepSeek for trend-aware generation.' },
  { q: 'Can I use it for business?', a: 'Yes. Built for creators, brands, and agencies.' },
  { q: 'Do you support multiple languages?', a: '15+ languages supported.' },
];

/* ----------------------------- COMPONENT ----------------------------- */

export const Home: React.FC<HomeProps> = ({
  onStart,
  onPricing,
  user,
  history = [],
  isDashboard = false,
  onNavigate,
}) => {

  /* ----------------------------- HANDLERS ----------------------------- */

  const handleStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onStart();
    },
    [onStart]
  );

  const handlePricing = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onPricing();
    },
    [onPricing]
  );

  /* ----------------------------- MEMOS ----------------------------- */

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return history.filter(h => new Date(h.timestamp).toDateString() === today).length;
  }, [history]);

  const totalGenerations = history.length;

  const creditsLeft = useMemo(() => {
    if (user?.plan !== 'free') return '∞';
    return Math.max(0, 5 - todayCount);
  }, [user, todayCount]);

  const recentActivity = useMemo(
    () => history.slice(0, 3),
    [history]
  );

  /* ----------------------------- DASHBOARD ----------------------------- */

  if (isDashboard) {
    return (
      <div className="space-y-10 animate-fade-in">

        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome back, <span className="font-semibold text-indigo-600 dark:text-indigo-400">{user?.name}</span>
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onNavigate?.(View.GENERATOR_HASHTAG)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              ⚡ Generate
            </button>
            <button
              onClick={() => onNavigate?.(View.HISTORY)}
              className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border-2 border-gray-200 dark:border-gray-700 transition-all"
            >
              📜 History
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Generated" value={totalGenerations} icon="📊" />
          <StatCard label="Credits Left" value={creditsLeft} icon="🪙" />
          <StatCard label="Saved Items" value={history.length} icon="💾" />
          <StatCard
            label="Plan"
            value={user?.plan ?? 'free'}
            icon="💎"
            clickable
            onClick={onPricing}
          />
        </section>

        {/* Tools */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Creative Studio</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {DASHBOARD_FEATURES.map(tool => (
              <button
                key={tool.title}
                onClick={() => onNavigate?.(tool.view)}
                className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex flex-col items-center gap-2 text-center group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{tool.icon}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{tool.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Recent Activity</h2>
          {recentActivity.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">📭</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400">No activity yet</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Start creating content!</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {recentActivity.map((item, i) => (
                <li key={i} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                  <span className="font-medium text-gray-900 dark:text-white">{item.keyword}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    );
  }

  /* ----------------------------- LANDING PAGE ----------------------------- */

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-6 pt-24 pb-16 transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-white/50 dark:bg-indigo-900/20 backdrop-blur-sm text-indigo-600 dark:text-indigo-300 text-sm font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Powered by DeepSeek AI
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Stop guessing. <br />
          Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">going viral.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-10">
          AI-powered hashtags, bios, captions, and scripts — built for creators.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 sm:gap-6 justify-center mb-10 items-center">
          <div className="w-14 h-14 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700">
            <img src={PLATFORMS.instagram.iconUrl} alt="Instagram" className="w-full h-full object-contain" />
          </div>
          <div className="w-14 h-14 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700">
            <img src={PLATFORMS.tiktok.iconUrl} alt="TikTok" className="w-full h-full object-contain" />
          </div>
          <div className="w-14 h-14 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700">
            <img src={PLATFORMS.linkedin.iconUrl} alt="LinkedIn" className="w-full h-full object-contain" />
          </div>
          <div className="w-14 h-14 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700">
            <img src={PLATFORMS.youtube.iconUrl} alt="YouTube" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleStart}
            className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-base hover:bg-gray-800 dark:hover:bg-gray-200 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
          >
            ✨ Start Free
          </button>
          <button
            onClick={handlePricing}
            className="px-10 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white rounded-full font-bold text-base border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            💎 Pricing
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <span>✓ No credit card</span>
          <span>✓ Free trial</span>
          <span>✓ Cancel anytime</span>
        </div>

        {/* Stats Banner */}
        <section className="mt-20 py-10 bg-indigo-600 rounded-2xl text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
              <div className="text-indigo-200 text-sm">Languages</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">4.9/5</div>
              <div className="text-indigo-200 text-sm">Rating</div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">FAQs</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQS.map((faq, i) => (
              <details key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 group">
                <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                  <span>{faq.q}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 dark:text-gray-400 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="mt-24 text-sm text-gray-400 dark:text-gray-500 flex items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} HashGenPro</span>
          <span>·</span>
          <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-mono rounded border border-indigo-200 dark:border-indigo-800">
            {APP_VERSION}
          </span>
        </footer>
      </div>
    </main>
  );
};

/* ----------------------------- SMALL COMPONENTS ----------------------------- */

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon: string;
  clickable?: boolean;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  clickable,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all ${
      clickable ? 'cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500' : ''
    }`}
  >
    <div className="flex items-center gap-3 mb-2">
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{label}</div>
  </div>
);
