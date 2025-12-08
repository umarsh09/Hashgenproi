import React, { useState } from 'react';
import { analyzeContent } from '../services/geminiService';
import { useToast } from './CustomToast';
import { LANGUAGES } from '../constants';

interface AnalyzerProps {
  type: 'competitor' | 'audit';
  onGenerate: (result: any) => void;
  onBack: () => void;
}

const ANALYZER_CONFIG = {
  competitor: {
    title: 'Competitor Spy',
    description: 'Analyze competitor strategies and find opportunities',
    icon: '🕵️',
    gradient: 'from-red-500 to-pink-600',
    lightBg: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    border: 'border-red-100 dark:border-red-800',
    placeholder: 'Paste your competitor\'s bio, caption, or content strategy here...',
    features: [
      { icon: '🎯', title: 'Strategy Analysis', desc: 'Identify their winning tactics' },
      { icon: '📊', title: 'Content Breakdown', desc: 'See what makes them successful' },
      { icon: '💡', title: 'Gap Opportunities', desc: 'Find areas they\'re missing' },
      { icon: '🚀', title: 'Action Items', desc: 'Get specific improvements' },
    ],
    tips: [
      'Include their top-performing posts for better analysis',
      'Add multiple examples for more accurate insights',
      'Note their posting frequency and engagement patterns',
      'Look for patterns in their hashtag usage'
    ]
  },
  audit: {
    title: 'Profile Audit',
    description: 'Get expert feedback on your social media presence',
    icon: '🔍',
    gradient: 'from-emerald-500 to-teal-600',
    lightBg: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
    border: 'border-emerald-100 dark:border-emerald-800',
    placeholder: 'Paste your bio and describe your recent 3-5 posts, content themes, and goals...',
    features: [
      { icon: '⭐', title: 'Profile Score', desc: 'Overall rating of your profile' },
      { icon: '✅', title: 'What\'s Working', desc: 'Your current strengths' },
      { icon: '🔧', title: 'Improvements', desc: 'Areas to optimize' },
      { icon: '📈', title: 'Growth Tips', desc: 'Actionable growth strategies' },
    ],
    tips: [
      'Be honest about your current performance',
      'Include your target audience info',
      'Mention your main goals (sales, followers, engagement)',
      'Share your posting schedule for context'
    ]
  }
};

export const Analyzer: React.FC<AnalyzerProps> = ({ type, onGenerate, onBack }) => {
  const [input, setInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const config = ANALYZER_CONFIG[type];

  const handleAnalyze = async () => {
    if (!input.trim()) {
      showToast('Please enter text to analyze', 'error');
      return;
    }
    setIsLoading(true);
    setResult('');

    try {
      const text = await analyzeContent(type, input, selectedLanguage);
      setResult(text);
      onGenerate({
        id: Date.now().toString(),
        timestamp: Date.now(),
        type: type,
        platform: 'General',
        keyword: input,
        result: text
      });
      showToast('Analysis complete!', 'success');
    } catch (e) {
      showToast('Analysis failed', 'error');
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
                <span className="text-3xl">{config.icon}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{config.title}</h1>
                <p className="text-white/80">{config.description}</p>
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
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">📊</span> What You'll Get
              </h3>
              <div className="space-y-3">
                {config.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                    <span className="text-xl">{feature.icon}</span>
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-white">{feature.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language */}
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

            {/* Tips */}
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

          {/* Right Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">📝</span> Enter Content to Analyze
              </h3>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={config.placeholder}
                disabled={isLoading}
                className="w-full h-48 p-4 rounded-xl border-2 resize-none transition-all focus:outline-none bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500"
              />

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {input.length} characters
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Recommended: 200+ characters for best results
                </div>
              </div>

              <button
                onClick={handleAnalyze}
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
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span>🚀</span> Start {config.title}
                  </>
                )}
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
                <div className={`flex items-center justify-between p-4 bg-gradient-to-r ${config.lightBg} border-b ${config.border}`}>
                  <h3 className="font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-xl">📋</span> Analysis Report
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
                    <span>{config.title}</span>
                    <span>•</span>
                    <span>{selectedLanguage}</span>
                    <span>•</span>
                    <span>AI-Powered Analysis</span>
                  </div>
                </div>
              </div>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`bg-gradient-to-r ${config.lightBg} rounded-2xl border ${config.border} p-5`}>
                <div className="text-3xl mb-2">{config.icon}</div>
                <div className="font-semibold text-gray-900 dark:text-white">{config.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">AI-powered insights</div>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 p-5">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-semibold text-gray-900 dark:text-white">Actionable</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get specific next steps</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
