import React, { useState } from 'react';
import { analyzeContent } from '../services/deepseekService';
import { useToast } from './CustomToast';
import { LANGUAGES } from '../constants';

interface AnalyzerProps {
  type: 'competitor' | 'audit';
  onGenerate: (result: any) => void;
  onBack: () => void;
}

export const Analyzer: React.FC<AnalyzerProps> = ({ type, onGenerate, onBack }) => {
  const [input, setInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const { showToast } = useToast();

  const isAudit = type === 'audit';
  const title = isAudit ? 'Profile Audit' : 'Competitor Spy';
  const desc = isAudit ? 'Get expert feedback on your bio and content strategy.' : 'Analyze competitor captions or bios to find their weakness.';
  const placeholder = isAudit ? 'Paste your bio and recent 3 post topics here...' : 'Paste competitor text/bio here...';
  const icon = isAudit ? '🔍' : '🕵️';

  const handleAnalyze = async () => {
    if (!input.trim()) return showToast('Please enter text to analyze', 'error');
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

  // Lottie-style Loader
  const LottieLoader = () => (
    <div className="absolute inset-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in rounded-2xl">
        <div className="relative w-24 h-24 mb-6">
            <div className="loader-ring" style={{ borderColor: 'rgba(249, 115, 22, 0.5)' }}></div>
            <div className="loader-ring" style={{ width: '70%', height: '70%', borderColor: 'rgba(239, 68, 68, 0.5)', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-3xl animate-bounce">📊</span>
            </div>
        </div>
        <p className="text-lg font-bold text-gray-800 dark:text-white animate-pulse">Scanning Data...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-5xl mx-auto relative">
      {/* Close Button */}
      <button 
          onClick={onBack}
          className="absolute -top-2 right-0 md:top-0 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all z-20"
          title="Close Tool"
      >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
      </button>

      <div className="flex items-center justify-between mb-2">
         <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">{title}</h2>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 truncate">{desc}</p>
            </div>
         </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 relative min-h-[300px]">
         {isLoading && <LottieLoader />}

         <div className="flex justify-end mb-3">
             <div className="flex items-center gap-2">
                 <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Output Language:</span>
                 <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="text-sm bg-gray-100 dark:bg-gray-700 border-none rounded-lg px-3 py-1 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 cursor-pointer outline-none"
                 >
                    {LANGUAGES.map(lang => (
                        <option key={lang.name} value={lang.name}>{lang.flag} {lang.name}</option>
                    ))}
                 </select>
             </div>
         </div>
         <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full h-48 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none transition-all mb-4 disabled:opacity-50 text-base leading-relaxed"
         />
         <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className={`w-full py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white transition-all flex items-center justify-center gap-2 shadow-lg
            ${isLoading ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transform active:scale-95'}
            `}
         >
           {isLoading ? (
             <>
               <div className="w-4 h-4 sm:w-5 sm:h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
               <span>Analyzing...</span>
             </>
           ) : (
             <>
               <span className="text-lg sm:text-xl">🚀</span>
               <span>Start {title}</span>
             </>
           )}
         </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-l-4 border-orange-500 shadow-xl overflow-hidden animate-slide-up">
            <div className="bg-orange-50 dark:bg-orange-900/20 px-6 py-4 border-b border-orange-100 dark:border-orange-500/20">
                <span className="font-bold text-orange-700 dark:text-orange-300">Analysis Report</span>
            </div>
            <div className="p-8 whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                {result}
            </div>
        </div>
      )}
    </div>
  );
};