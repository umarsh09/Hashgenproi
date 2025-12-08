import React, { useState } from 'react';
import { Platform } from '../types';
import { PLATFORMS, LANGUAGES } from '../constants';
import { generateHashtags } from '../services/geminiService';
import { useToast } from './CustomToast';

interface GeneratorProps {
  onGenerate: (result: any) => void;
  onBack?: () => void;
}

const HASHTAG_CATEGORIES = [
  { id: 'trending', name: 'Trending', icon: '🔥', desc: 'Hot & viral tags' },
  { id: 'niche', name: 'Niche', icon: '🎯', desc: 'Targeted audience' },
  { id: 'branded', name: 'Branded', icon: '💼', desc: 'Business & brand tags' },
  { id: 'community', name: 'Community', icon: '👥', desc: 'Engagement focused' },
  { id: 'location', name: 'Location', icon: '📍', desc: 'Geo-targeted tags' },
  { id: 'mixed', name: 'Mixed', icon: '✨', desc: 'Best of all types' },
];

export const Generator: React.FC<GeneratorProps> = ({ onGenerate, onBack }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCategory, setSelectedCategory] = useState('mixed');
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      showToast('Please enter a keyword or description', 'error');
      return;
    }

    setIsLoading(true);
    setResults([]);

    try {
      const config = PLATFORMS[selectedPlatform];
      const tags = await generateHashtags(keyword, selectedPlatform, config.maxTags, selectedLanguage);

      setResults(tags);
      onGenerate({
        id: Date.now().toString(),
        timestamp: Date.now(),
        type: 'hashtag',
        platform: selectedPlatform,
        keyword,
        result: tags
      });
      showToast(`Success! Generated ${tags.length} hashtags.`, 'success');
    } catch (error) {
      showToast('Failed to generate hashtags. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  const copyAll = () => {
    if (results.length === 0) return;
    navigator.clipboard.writeText(results.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('All hashtags copied!', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 -m-4 md:-m-6 lg:-m-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-3xl font-bold text-white">#</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Hashtag Generator</h1>
                <p className="text-indigo-100">AI-powered hashtags for maximum reach</p>
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Options */}
          <div className="lg:col-span-1 space-y-6">
            {/* Platform Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">📱</span> Select Platform
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(PLATFORMS).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      selectedPlatform === p.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <img src={p.iconUrl} alt={p.name} className="w-6 h-6" />
                    <span className="text-xs font-medium">{p.name}</span>
                    {selectedPlatform === p.id && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-indigo-700 dark:text-indigo-300">Max hashtags:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{PLATFORMS[selectedPlatform].maxTags}</span>
                </div>
              </div>
            </div>

            {/* Category Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">🏷️</span> Hashtag Type
              </h3>
              <div className="space-y-2">
                {HASHTAG_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-sm">{cat.name}</div>
                      <div className={`text-xs ${selectedCategory === cat.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {cat.desc}
                      </div>
                    </div>
                    {selectedCategory === cat.id && <span className="ml-auto">✓</span>}
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
          </div>

          {/* Right Panel - Generator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">✍️</span> Describe Your Content
              </h3>
              <textarea
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleGenerate()}
                placeholder="e.g., Summer vacation photos in Italy, visiting the Colosseum in Rome with family, enjoying gelato..."
                disabled={isLoading}
                className="w-full h-32 p-4 rounded-xl border-2 resize-none transition-all focus:outline-none bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500"
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{keyword.length}/500 characters</span>
                <span>Press Enter to generate</span>
              </div>

              {/* Quick Suggestions */}
              <div className="mt-4">
                <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {['Travel', 'Food', 'Fashion', 'Fitness', 'Tech', 'Photography', 'Business', 'Lifestyle'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setKeyword(tag.toLowerCase() + ' content')}
                      className="px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading || !keyword.trim()}
                className={`mt-6 w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  isLoading || !keyword.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating Hashtags...
                  </>
                ) : (
                  <>
                    <span>⚡</span> Generate Hashtags
                  </>
                )}
              </button>
            </div>

            {/* Results Section */}
            {results.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-b border-green-100 dark:border-green-800">
                  <h3 className="font-semibold flex items-center gap-2 text-green-700 dark:text-green-300">
                    <span className="text-xl">✅</span> {results.length} Hashtags Generated!
                  </h3>
                  <button
                    onClick={copyAll}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                    }`}
                  >
                    {copied ? (
                      <>
                        <span>✓</span> Copied All!
                      </>
                    ) : (
                      <>
                        <span>📋</span> Copy All
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {results.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => copyToClipboard(tag)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50 text-sm font-medium transition-all hover:scale-105"
                        style={{ animation: `fadeIn 0.3s ease-out ${index * 0.02}s backwards` }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Click any hashtag to copy</span>
                    <div className="flex items-center gap-2">
                      <img src={PLATFORMS[selectedPlatform].iconUrl} alt="" className="w-4 h-4" />
                      <span>{PLATFORMS[selectedPlatform].name}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pro Tips */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">💡</span> Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  Mix popular (1M+) and niche (&lt;100K) hashtags for best reach
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  Use 20-30 hashtags on Instagram, 3-5 on Twitter for optimal engagement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  Place hashtags in comments on Instagram to keep captions clean
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  Rotate your hashtag sets to avoid being flagged as spam
                </li>
              </ul>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                <div className="text-2xl mb-1">📱</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Platform</div>
                <div className="font-semibold text-gray-900 dark:text-white">{PLATFORMS[selectedPlatform].name}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                <div className="text-2xl mb-1">🏷️</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Max Tags</div>
                <div className="font-semibold text-gray-900 dark:text-white">{PLATFORMS[selectedPlatform].maxTags}</div>
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
