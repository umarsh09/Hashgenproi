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

  // Lottie-style Loader Component
  const LottieLoader = () => (
    <div className="absolute inset-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center animate-fade-in">
        <div className="relative w-24 h-24 mb-6">
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-indigo-600 rounded-full loader-core"></div>
            </div>
        </div>
        <p className="text-lg font-bold text-gray-800 dark:text-white animate-pulse">Analysing Trends...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Connecting to AI Neural Network</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-6xl mx-auto relative">
      {/* Close Button */}
      {onBack && (
        <button 
            onClick={onBack}
            className="absolute -top-2 right-0 md:top-0 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all z-20"
            title="Close Tool"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      )}

      <div className="flex items-center justify-between">
         <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Hashtag Generator</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Select a platform and describe your content to go viral.</p>
         </div>
      </div>

      {/* Platform Selector */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
        {Object.values(PLATFORMS).map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPlatform(p.id)}
            title={`Generate for ${p.name}`}
            className={`
              relative p-3 sm:p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 group
              ${selectedPlatform === p.id
                ? 'border-indigo-500 bg-white dark:bg-gray-800 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500'
                : 'border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}
            `}
          >
            {selectedPlatform === p.id && (
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${p.color} opacity-5 dark:opacity-10 -z-10`} />
            )}
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img src={p.iconUrl} alt={p.name} className="w-full h-full object-contain" />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wide truncate max-w-full ${selectedPlatform === p.id ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              {p.name}
            </span>
          </button>
        ))}
      </div>

      {/* Input Section - Improved Editor Style */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-xl border border-gray-200 dark:border-gray-700 transition-colors min-h-[240px]">
        {/* Loader Overlay */}
        {isLoading && <LottieLoader />}

        <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-4 ml-1">
                 <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-lg">⌨️</span> Topic or Description
                 </label>
                 <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="text-sm bg-gray-100 dark:bg-gray-700 border-none rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                 >
                    {LANGUAGES.map(lang => (
                        <option key={lang.name} value={lang.name}>{lang.flag} {lang.name}</option>
                    ))}
                 </select>
            </div>
            
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="e.g., Summer vacation in Italy visiting Rome..."
                    disabled={isLoading}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-5 pl-12 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner text-lg disabled:opacity-50"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </div>
                </div>
                
                <div className="flex justify-end mt-2">
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        title="Generate Hashtags"
                        className={`
                        px-8 py-4 rounded-xl font-bold text-white transition-all transform flex items-center justify-center gap-3 min-w-[200px] shadow-lg
                        ${isLoading 
                            ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed opacity-80' 
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/25 hover:-translate-y-0.5 active:scale-95'}
                        `}
                    >
                        <span className="text-xl">🚀</span>
                        <span>Generate</span>
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="animate-slide-up">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 animate-bounce">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Generation Successful</h2>
            </div>
            <button 
              onClick={copyAll}
              title="Copy all hashtags"
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors shadow-sm flex items-center gap-2"
            >
              <span>📋</span> Copy All
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-xl border-l-4 border-emerald-500">
             <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-6 rounded-r-xl">
                <div className="flex flex-wrap gap-2.5">
                {results.map((tag, index) => (
                    <button
                    key={index}
                    onClick={() => copyToClipboard(tag)}
                    title="Click to copy"
                    className="px-4 py-2 rounded-full bg-white dark:bg-gray-900 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-500/20 hover:border-emerald-300 dark:hover:border-emerald-500 text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium transition-all duration-200 select-all shadow-sm transform hover:-translate-y-0.5"
                    style={{ animation: `fadeIn 0.5s ease-out ${index * 0.03}s backwards` }}
                    >
                    {tag}
                    </button>
                ))}
                </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 rounded-b-xl flex justify-between items-center text-xs text-gray-500">
                 <span>Click any tag to copy individually</span>
                 <span className="text-emerald-600 dark:text-emerald-400 font-medium">{results.length} tags generated</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};