import React, { useState } from 'react';
import { Platform } from '../types';
import { PLATFORMS, LANGUAGES } from '../constants';
import { generateBio } from '../services/geminiService';
import { useToast } from './CustomToast';

interface BioGeneratorProps {
  onGenerate: (result: any) => void;
  onBack?: () => void;
}

export const BioGenerator: React.FC<BioGeneratorProps> = ({ onGenerate, onBack }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [keyword, setKeyword] = useState('');
  const [tone, setTone] = useState('Professional');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const { showToast } = useToast();

  const tones = ['Professional', 'Funny', 'Inspirational', 'Casual', 'Sarcastic', 'Minimalist'];

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      showToast('Please describe yourself or your brand', 'error');
      return;
    }

    setIsLoading(true);
    setResult('');

    try {
      const bio = await generateBio(keyword, selectedPlatform, tone, selectedLanguage);
      
      setResult(bio);
      onGenerate({
        id: Date.now().toString(),
        timestamp: Date.now(),
        type: 'bio',
        platform: selectedPlatform,
        keyword,
        result: bio
      });
      showToast('Bio generated successfully!', 'success');
    } catch (error) {
      showToast('Failed to generate bio.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    showToast('Bio copied to clipboard!', 'success');
  };

  // Lottie-style Loader
  const LottieLoader = () => (
    <div className="absolute inset-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in rounded-2xl">
        <div className="relative w-20 h-20 mb-6">
            <div className="loader-ring" style={{ borderColor: 'rgba(147, 51, 234, 0.5)' }}></div>
            <div className="loader-ring" style={{ borderColor: 'rgba(147, 51, 234, 0.5)', animationDelay: '0.2s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-600 rounded-full loader-core shadow-[0_0_20px_rgba(147,51,234,0.6)]"></div>
            </div>
        </div>
        <p className="text-lg font-bold text-gray-800 dark:text-white animate-pulse">Crafting Persona...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-5xl mx-auto relative">
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

      <div className="flex items-center justify-between mb-4">
        <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">AI Bio Writer</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Create the perfect first impression for your profile.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
            <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="text-lg">📱</span> Select Platform
                </label>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
              {Object.values(PLATFORMS).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  title={p.name}
                  className={`
                    flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 py-2.5 sm:px-3 sm:py-3 rounded-lg text-xs sm:text-sm font-medium border transition-all
                    ${selectedPlatform === p.id
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-800'}
                  `}
                >
                  <img src={p.iconUrl} alt="" className="w-5 h-5 object-contain" />
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
            <div className="flex justify-between items-center mb-4">
                 <label className="block text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="text-lg">🌐</span> Language
                </label>
                <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="text-sm bg-gray-100 dark:bg-gray-700 border-none rounded-lg px-3 py-1 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 cursor-pointer outline-none"
                 >
                    {LANGUAGES.map(lang => (
                        <option key={lang.name} value={lang.name}>{lang.flag} {lang.name}</option>
                    ))}
                 </select>
            </div>
            
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">🎭</span> Choose Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium border transition-all
                    ${tone === t
                      ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-500 text-purple-700 dark:text-purple-300' 
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'}
                  `}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input & Action - Improved Editor Style */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg flex flex-col h-full transition-colors relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
          
          {isLoading && <LottieLoader />}

          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3 ml-1 flex items-center gap-2">
            <span className="text-lg">📝</span> Describe yourself or Brand
          </label>
          <div className="flex-grow relative mb-6">
            <textarea
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                disabled={isLoading}
                placeholder="e.g., A fitness coach helping moms get back in shape. I love coffee, yoga, and positivity."
                className="w-full h-full min-h-[160px] bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none leading-relaxed shadow-inner disabled:opacity-50 text-base"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            title="Create Bio"
            className={`
              w-full py-4 rounded-xl font-bold text-white transition-all transform flex items-center justify-center gap-2 shadow-lg
              ${isLoading 
                ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed opacity-80' 
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/25 active:scale-95'}
            `}
          >
             ✨ Generate Bio
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="animate-slide-up mt-6">
           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-l-4 border-emerald-500">
             <div className="bg-emerald-50 dark:bg-emerald-900/10 px-6 py-3 flex justify-between items-center border-b border-emerald-100 dark:border-emerald-500/20">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Your New Bio</h3>
                </div>
                <button 
                    onClick={copyToClipboard} 
                    title="Copy Text"
                    className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-white text-sm font-bold flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    Copy
                </button>
             </div>
             <div className="p-8">
                <p className="text-xl md:text-2xl text-gray-800 dark:text-white whitespace-pre-line leading-relaxed font-medium font-serif selection:bg-emerald-200 dark:selection:bg-emerald-800">
                    {result}
                </p>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};