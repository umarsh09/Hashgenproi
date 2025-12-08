import React, { useState } from 'react';
import { Platform } from '../types';
import { PLATFORMS, LANGUAGES } from '../constants';
import { generateBio } from '../services/geminiService';
import { useToast } from './CustomToast';

interface BioGeneratorProps {
  onGenerate: (result: any) => void;
  onBack?: () => void;
}

const TONES = [
  { id: 'Professional', icon: '💼', desc: 'Corporate & serious' },
  { id: 'Funny', icon: '😄', desc: 'Witty & humorous' },
  { id: 'Inspirational', icon: '✨', desc: 'Motivating & uplifting' },
  { id: 'Casual', icon: '😎', desc: 'Relaxed & friendly' },
  { id: 'Sarcastic', icon: '🙃', desc: 'Edgy & ironic' },
  { id: 'Minimalist', icon: '🎯', desc: 'Short & sweet' },
];

export const BioGenerator: React.FC<BioGeneratorProps> = ({ onGenerate, onBack }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [keyword, setKeyword] = useState('');
  const [tone, setTone] = useState('Professional');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Bio copied to clipboard!', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 -m-4 md:-m-6 lg:-m-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-3xl">✍️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">AI Bio Writer</h1>
                <p className="text-pink-100">Craft the perfect profile bio in seconds</p>
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
                    className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                      selectedPlatform === p.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <img src={p.iconUrl} alt={p.name} className="w-5 h-5" />
                    <span className="text-sm font-medium">{p.name}</span>
                    {selectedPlatform === p.id && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">🎭</span> Choose Tone
              </h3>
              <div className="space-y-2">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                      tone === t.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="text-lg">{t.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-sm">{t.id}</div>
                      <div className={`text-xs ${tone === t.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {t.desc}
                      </div>
                    </div>
                    {tone === t.id && <span className="ml-auto">✓</span>}
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
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
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
                <span className="text-xl">📝</span> Describe Yourself
              </h3>
              <textarea
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., A fitness coach helping moms get back in shape. I love coffee, yoga, and spreading positivity. Based in NYC..."
                disabled={isLoading}
                className="w-full h-40 p-4 rounded-xl border-2 resize-none transition-all focus:outline-none bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:border-purple-500"
              />

              {/* Quick Templates */}
              <div className="mt-4">
                <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">Quick templates:</p>
                <div className="flex flex-wrap gap-2">
                  {['Entrepreneur', 'Content Creator', 'Fitness Coach', 'Photographer', 'Developer'].map(t => (
                    <button
                      key={t}
                      onClick={() => setKeyword(`I'm a ${t.toLowerCase()} who loves helping people achieve their goals.`)}
                      className="px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {t}
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
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Crafting Your Bio...
                  </>
                ) : (
                  <>
                    <span>✨</span> Generate Bio
                  </>
                )}
              </button>
            </div>

            {/* Results Section */}
            {result && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b border-purple-100 dark:border-purple-800">
                  <h3 className="font-semibold flex items-center gap-2 text-purple-700 dark:text-purple-300">
                    <span className="text-xl">🎉</span> Your New Bio
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800'
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
                  <p className="text-xl text-gray-800 dark:text-gray-100 whitespace-pre-line leading-relaxed font-medium">
                    {result}
                  </p>
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <img src={PLATFORMS[selectedPlatform].iconUrl} alt="" className="w-4 h-4" />
                      <span>{PLATFORMS[selectedPlatform].name}</span>
                    </div>
                    <span>•</span>
                    <span>{tone} tone</span>
                    <span>•</span>
                    <span>{result.length} characters</span>
                  </div>
                </div>
              </div>
            )}

            {/* Pro Tips */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-100 dark:border-purple-800 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="text-xl">💡</span> Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  Include your unique value proposition - what makes you different?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  Add a call-to-action to drive engagement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  Use emojis strategically to add personality
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  Keep it authentic - let your personality shine through
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
