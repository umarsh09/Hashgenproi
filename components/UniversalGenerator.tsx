import React, { useState } from 'react';
import { generateCreativeContent } from '../services/geminiService';
import { useToast } from './CustomToast';
import { LANGUAGES } from '../constants';

interface UniversalGeneratorProps {
  type: 'caption' | 'script' | 'idea' | 'email' | 'schedule' | 'trend' | 'emoji';
  title: string;
  description: string;
  placeholder: string;
  icon: string;
  onGenerate: (result: any) => void;
  onBack: () => void;
}

const TYPE_CONFIG = {
  caption: {
    gradient: 'from-blue-600 to-cyan-500',
    lightBg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    border: 'border-blue-100 dark:border-blue-800',
    suggestions: ['Morning motivation', 'Behind the scenes', 'Product launch', 'Life update'],
    tips: [
      'Start with a hook to grab attention',
      'Use line breaks for readability',
      'End with a call-to-action',
      'Keep it authentic and relatable'
    ]
  },
  script: {
    gradient: 'from-pink-600 to-rose-500',
    lightBg: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
    border: 'border-pink-100 dark:border-pink-800',
    suggestions: ['Tutorial', 'Story time', 'Day in my life', 'Product review'],
    tips: [
      'Hook viewers in the first 3 seconds',
      'Keep it concise and punchy',
      'Include clear transitions',
      'End with engagement prompt'
    ]
  },
  idea: {
    gradient: 'from-yellow-500 to-orange-500',
    lightBg: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
    border: 'border-yellow-100 dark:border-yellow-800',
    suggestions: ['Fitness niche', 'Tech reviews', 'Food content', 'Travel vlogs'],
    tips: [
      'Mix trending and evergreen topics',
      'Consider your audience interests',
      'Plan content series for consistency',
      'Repurpose ideas across platforms'
    ]
  },
  email: {
    gradient: 'from-cyan-600 to-blue-600',
    lightBg: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20',
    border: 'border-cyan-100 dark:border-cyan-800',
    suggestions: ['Collaboration pitch', 'Follow-up', 'Introduction', 'Thank you note'],
    tips: [
      'Keep subject lines compelling',
      'Be clear about your ask',
      'Personalize your outreach',
      'Follow up politely after 3-5 days'
    ]
  },
  schedule: {
    gradient: 'from-teal-500 to-emerald-500',
    lightBg: 'from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20',
    border: 'border-teal-100 dark:border-teal-800',
    suggestions: ['Weekly plan', 'Launch week', 'Holiday content', 'Engagement boost'],
    tips: [
      'Batch similar content together',
      'Leave room for spontaneous posts',
      'Consider peak engagement times',
      'Balance promotional and value content'
    ]
  },
  trend: {
    gradient: 'from-red-500 to-orange-500',
    lightBg: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
    border: 'border-red-100 dark:border-red-800',
    suggestions: ['Technology', 'Fashion', 'Gaming', 'Health & Wellness'],
    tips: [
      'Act fast on trending topics',
      'Add your unique perspective',
      'Use trending sounds/audio',
      'Monitor hashtag performance'
    ]
  },
  emoji: {
    gradient: 'from-orange-500 to-amber-500',
    lightBg: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20',
    border: 'border-orange-100 dark:border-orange-800',
    suggestions: ['Happy vibes', 'Love & Romance', 'Celebration', 'Nature theme'],
    tips: [
      'Use emojis to break up text',
      'Match emoji tone to content',
      'Dont overuse - less is more',
      'Create unique emoji signatures'
    ]
  }
};

const PLATFORMS = [
  { id: 'Instagram', icon: '📸' },
  { id: 'TikTok', icon: '🎵' },
  { id: 'LinkedIn', icon: '💼' },
  { id: 'YouTube', icon: '🎬' },
  { id: 'Twitter', icon: '🐦' },
];

export const UniversalGenerator: React.FC<UniversalGeneratorProps> = ({
  type, title, description, placeholder, icon, onGenerate, onBack
}) => {
  const [input, setInput] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const config = TYPE_CONFIG[type];

  const handleGenerate = async () => {
    if (!input.trim()) {
      showToast('Please enter a topic', 'error');
      return;
    }
    setIsLoading(true);
    setResult('');

    try {
      const text = await generateCreativeContent(type, input, platform, selectedLanguage);
      setResult(text);
      onGenerate({
        id: Date.now().toString(),
        timestamp: Date.now(),
        type: type,
        platform: platform,
        keyword: input,
        result: text
      });
      showToast('Generated successfully!', 'success');
    } catch (e) {
      showToast('Error generating content', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Copied to clipboard!', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 -m-4 md:-m-6 lg:-m-8">
      {/* Header */}
      <div className={`bg-gradient-to-r ${config.gradient} py-8 px-6`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-3xl">{icon}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="text-white/80">{description}</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Options */}
          <div className="lg:col-span-1 space-y-6">
            {/* Platform Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">📱</span> Target Platform
              </h3>
              <div className="space-y-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                      platform === p.id
                        ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="text-lg">{p.icon}</span>
                    <span className="font-medium">{p.id}</span>
                    {platform === p.id && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">🌍</span> Output Language
              </h3>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.name} value={lang.name}>{lang.flag} {lang.name}</option>
                ))}
              </select>
            </div>

            {/* Pro Tips */}
            <div className={`bg-gradient-to-r ${config.lightBg} rounded-2xl border ${config.border} p-6`}>
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">💡</span> Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {config.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-500">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel - Generator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">✍️</span> Enter Your Topic
              </h3>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                disabled={isLoading}
                className="w-full h-40 p-4 rounded-xl border-2 resize-none transition-all focus:outline-none bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500"
              />

              {/* Quick Suggestions */}
              <div className="mt-4">
                <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {config.suggestions.map(s => (
                    <button
                      key={s}
                      onClick={() => setInput(s)}
                      className="px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading || !input.trim()}
                className={`mt-6 w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  isLoading || !input.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : `bg-gradient-to-r ${config.gradient} hover:opacity-90 shadow-lg hover:shadow-xl`
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <span>✨</span> Generate {title}
                  </>
                )}
              </button>
            </div>

            {/* Results Section */}
            {result && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
                <div className={`flex items-center justify-between p-4 bg-gradient-to-r ${config.lightBg} border-b ${config.border}`}>
                  <h3 className="font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-xl">🎉</span> Generated Content
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {copied ? (
                      <>
                        <span>✓</span> Copied!
                      </>
                    ) : (
                      <>
                        <span>📋</span> Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6">
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-100 leading-relaxed">
                    {result}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{platform}</span>
                    <span>•</span>
                    <span>{selectedLanguage}</span>
                    <span>•</span>
                    <span>{result.length} characters</span>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Tool</div>
                <div className="font-semibold text-gray-900 dark:text-white">{title}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Platform</div>
                <div className="font-semibold text-gray-900 dark:text-white">{platform}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                <div className="text-2xl mb-1">🌍</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Language</div>
                <div className="font-semibold text-gray-900 dark:text-white">{selectedLanguage}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
