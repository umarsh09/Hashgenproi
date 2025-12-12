import React, { useState } from 'react';
import { generateFigmaDesign } from '../services/deepseekService';
import { useToast } from './CustomToast';
import { LANGUAGES } from '../constants';

interface FigmaGeneratorProps {
  onGenerate: (result: any) => void;
  onBack: () => void;
}

export const FigmaGenerator: React.FC<FigmaGeneratorProps> = ({ onGenerate, onBack }) => {
  const [input, setInput] = useState('');
  const [designType, setDesignType] = useState('Social Media Post');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const { showToast } = useToast();

  const designTypes = [
    'Social Media Post',
    'Instagram Story',
    'Banner/Header',
    'Logo Concept',
    'UI Component',
    'Landing Page',
    'Mobile App Screen',
    'Presentation Slide'
  ];

  const handleGenerate = async () => {
    if (!input.trim()) {
      showToast('Please enter a design description', 'error');
      return;
    }
    setIsLoading(true);
    setResult('');

    try {
      const text = await generateFigmaDesign(input, designType, selectedLanguage);
      setResult(text);
      onGenerate({
        id: Date.now().toString(),
        timestamp: Date.now(),
        type: 'figma',
        platform: designType,
        keyword: input,
        result: text
      });
      showToast('Figma design concept generated!', 'success');
    } catch (e) {
      showToast('Error generating design concept', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    showToast('Copied to clipboard!', 'success');
  };

  // Lottie-style Loader
  const LottieLoader = () => (
    <div className="absolute inset-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in rounded-2xl">
        <div className="relative w-24 h-24 mb-6">
            <div className="loader-ring" style={{ borderStyle: 'dashed' }}></div>
            <div className="loader-ring" style={{ animationDirection: 'reverse', width: '70%', height: '70%' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-2xl animate-bounce">🎨</span>
            </div>
        </div>
        <p className="text-lg font-bold text-gray-800 dark:text-white animate-pulse">Generating Design Concept...</p>
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
             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                🎨
             </div>
             <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">Figma Design Generator</h2>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 truncate">AI-powered design concepts, layouts & color palettes</p>
             </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-lg relative min-h-[400px]">
         {isLoading && <LottieLoader />}

         <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Design Type</label>
                 <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="text-sm bg-gray-100 dark:bg-gray-700 border-none rounded-lg px-3 py-1 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 cursor-pointer outline-none"
                 >
                    {LANGUAGES.map(lang => (
                        <option key={lang.name} value={lang.name}>{lang.flag} {lang.name}</option>
                    ))}
                 </select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {designTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => setDesignType(type)}
                        className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all border ${
                          designType === type
                            ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/30'
                            : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
         </div>

         <div className="relative">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Design Description</label>
            <div className="relative">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your design needs... e.g., 'Modern fitness app social media post promoting a new workout program, vibrant colors, motivational theme'"
                    disabled={isLoading}
                    className="w-full h-48 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none transition-all disabled:opacity-50 text-base leading-relaxed"
                />
            </div>
            <button
                onClick={handleGenerate}
                disabled={isLoading}
                className={`mt-4 w-full py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white transition-all flex items-center justify-center gap-2 shadow-lg
                ${isLoading ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 hover:shadow-purple-500/25 transform active:scale-95'}
                `}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span className="text-lg sm:text-xl">🎨</span>
                  <span>Generate Design Concept</span>
                </>
              )}
            </button>
         </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-l-4 border-purple-500 shadow-xl overflow-hidden animate-slide-up">
            <div className="bg-purple-50 dark:bg-purple-900/20 px-6 py-4 flex justify-between items-center border-b border-purple-100 dark:border-purple-500/20">
                <span className="font-bold text-purple-700 dark:text-purple-300">🎨 Design Concept</span>
                <button onClick={copyToClipboard} className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-white flex items-center gap-1">
                    📋 Copy
                </button>
            </div>
            <div className="p-8 whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                {result}
            </div>
        </div>
      )}
    </div>
  );
};
