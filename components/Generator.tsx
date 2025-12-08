import React, { useState } from 'react';
import { Platform } from '../types';
import { PLATFORMS, LANGUAGES } from '../constants';
import { generateHashtags } from '../services/geminiService';
import { useToast } from './CustomToast';

interface GeneratorProps {
  onGenerate: (result: any) => void;
  onBack?: () => void;
}

export const Generator: React.FC<GeneratorProps> = ({ onGenerate, onBack }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
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
    copyToClipboard(results.join(' '));
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-5xl mx-auto relative pb-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-500/30">
              #
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Hashtag Generator</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">AI-powered hashtags for maximum reach</p>
            </div>
          </div>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="p-2.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            title="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Platform Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Select Platform</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full">
            {PLATFORMS[selectedPlatform].maxTags} hashtags
          </span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {Object.values(PLATFORMS).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              title={`Generate for ${p.name}`}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 group
                ${selectedPlatform === p.id
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg shadow-indigo-500/10'
                  : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-800'}
              `}
            >
              {selectedPlatform === p.id && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <img src={p.iconUrl} alt={p.name} className="w-full h-full object-contain" />
              </div>
              <span className={`text-xs font-semibold ${selectedPlatform === p.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'}`}>
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center animate-fade-in">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-900"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin"></div>
              <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            <p className="text-lg font-bold text-gray-800 dark:text-white">Generating Hashtags...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Analyzing trends with AI</p>
          </div>
        )}

        <div className="p-6">
          {/* Language Selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌍</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Output Language</span>
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm rounded-xl px-4 py-2.5 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none cursor-pointer font-medium"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.name} value={lang.name}>{lang.flag} {lang.name}</option>
              ))}
            </select>
          </div>

          {/* Input Field */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              Describe your content
            </label>
            <div className="relative">
              <textarea
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleGenerate()}
                placeholder="e.g., Summer vacation photos in Italy, visiting the Colosseum in Rome with family..."
                disabled={isLoading}
                rows={3}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-base disabled:opacity-50 resize-none"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {keyword.length}/500
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2">
              {['Travel', 'Food', 'Fashion', 'Fitness', 'Tech'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setKeyword(tag.toLowerCase())}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-medium rounded-lg transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !keyword.trim()}
            className={`
              w-full py-4 rounded-xl font-bold text-white transition-all transform flex items-center justify-center gap-3 shadow-lg
              ${isLoading || !keyword.trim()
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/25 hover:-translate-y-0.5 active:scale-[0.98]'}
            `}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <span className="text-xl">⚡</span>
                <span>Generate Hashtags</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="animate-slide-up space-y-4">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Generated Successfully!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{results.length} hashtags ready to use</p>
              </div>
            </div>
            <button
              onClick={copyAll}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy All
            </button>
          </div>

          {/* Results Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="flex flex-wrap gap-2.5">
                {results.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => copyToClipboard(tag)}
                    title="Click to copy"
                    className="group px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
                    style={{ animation: `fadeIn 0.3s ease-out ${index * 0.03}s backwards` }}
                  >
                    <span className="flex items-center gap-2">
                      {tag}
                      <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Click any hashtag to copy</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={PLATFORMS[selectedPlatform].iconUrl} alt="" className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{PLATFORMS[selectedPlatform].name}</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/30">
            <div className="flex items-start gap-3">
              <span className="text-lg">💡</span>
              <div>
                <p className="text-sm font-medium text-indigo-900 dark:text-indigo-300">Pro Tip</p>
                <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-1">
                  Mix popular and niche hashtags for best results. Use 20-30 hashtags on Instagram for maximum reach!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
