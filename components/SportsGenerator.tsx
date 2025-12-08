import React, { useState, useCallback } from 'react';
import { Platform } from '../types';

interface SportsGeneratorProps {
  isDarkMode: boolean;
  onGenerate: (prompt: string) => Promise<string>;
}

type SportType = 'football' | 'cricket' | 'basketball' | 'tennis' | 'hockey' | 'baseball';
type ContentType = 'hashtags' | 'prediction' | 'playerBio' | 'teamAnalysis' | 'news' | 'motivation';

interface SportConfig {
  id: SportType;
  name: string;
  icon: string;
  color: string;
}

interface ContentTypeConfig {
  id: ContentType;
  name: string;
  icon: string;
  description: string;
}

const SPORTS: SportConfig[] = [
  { id: 'football', name: 'Football', icon: '⚽', color: 'from-green-500 to-emerald-600' },
  { id: 'cricket', name: 'Cricket', icon: '🏏', color: 'from-blue-500 to-indigo-600' },
  { id: 'basketball', name: 'Basketball', icon: '🏀', color: 'from-orange-500 to-red-600' },
  { id: 'tennis', name: 'Tennis', icon: '🎾', color: 'from-yellow-500 to-lime-600' },
  { id: 'hockey', name: 'Hockey', icon: '🏒', color: 'from-cyan-500 to-blue-600' },
  { id: 'baseball', name: 'Baseball', icon: '⚾', color: 'from-red-500 to-pink-600' },
];

const CONTENT_TYPES: ContentTypeConfig[] = [
  { id: 'hashtags', name: 'Sports Hashtags', icon: '#', description: 'Trending sports hashtags' },
  { id: 'prediction', name: 'Match Prediction', icon: '🔮', description: 'AI-powered predictions' },
  { id: 'playerBio', name: 'Player Bio', icon: '👤', description: 'Generate player profiles' },
  { id: 'teamAnalysis', name: 'Team Analysis', icon: '📊', description: 'In-depth team stats' },
  { id: 'news', name: 'Sports News', icon: '📰', description: 'Latest sports updates' },
  { id: 'motivation', name: 'Motivation', icon: '💪', description: 'Sports quotes & inspiration' },
];

const SportsGenerator: React.FC<SportsGeneratorProps> = ({ isDarkMode, onGenerate }) => {
  const [selectedSport, setSelectedSport] = useState<SportType>('football');
  const [selectedContentType, setSelectedContentType] = useState<ContentType>('hashtags');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getPrompt = useCallback(() => {
    const sport = SPORTS.find(s => s.id === selectedSport)?.name || 'Football';
    const contentType = CONTENT_TYPES.find(c => c.id === selectedContentType);

    switch (selectedContentType) {
      case 'hashtags':
        return `Generate 20 trending and relevant hashtags for ${sport} content about: "${inputText}". Include popular tags, niche tags, and viral potential tags. Format as a list with # prefix.`;
      case 'prediction':
        return `Provide an AI-powered match prediction analysis for ${sport}: "${inputText}". Include key factors, team strengths/weaknesses, probable outcome, and confidence level. Be professional and analytical.`;
      case 'playerBio':
        return `Create a compelling player bio/profile for ${sport} player: "${inputText}". Include achievements, playing style, career highlights, stats overview, and interesting facts. Make it engaging for social media.`;
      case 'teamAnalysis':
        return `Provide a comprehensive team analysis for ${sport} team: "${inputText}". Include recent performance, key players, tactical approach, strengths, weaknesses, and season outlook.`;
      case 'news':
        return `Write a professional sports news article about ${sport} topic: "${inputText}". Include headline, key points, quotes (if applicable), and context. Make it informative and engaging.`;
      case 'motivation':
        return `Generate 5 powerful motivational quotes and captions related to ${sport} about: "${inputText}". Include inspirational messages, famous quotes, and social media ready captions.`;
      default:
        return inputText;
    }
  }, [selectedSport, selectedContentType, inputText]);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setResult('');

    try {
      const prompt = getPrompt();
      const response = await onGenerate(prompt);
      setResult(response);
    } catch (error) {
      setResult('Error generating content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlaceholder = () => {
    switch (selectedContentType) {
      case 'hashtags':
        return 'Enter topic (e.g., "World Cup Final", "Champions League")';
      case 'prediction':
        return 'Enter match details (e.g., "Real Madrid vs Barcelona")';
      case 'playerBio':
        return 'Enter player name (e.g., "Lionel Messi", "Virat Kohli")';
      case 'teamAnalysis':
        return 'Enter team name (e.g., "Manchester United", "Mumbai Indians")';
      case 'news':
        return 'Enter news topic (e.g., "Transfer rumors", "Match highlights")';
      case 'motivation':
        return 'Enter theme (e.g., "Never give up", "Teamwork")';
      default:
        return 'Enter your topic...';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-green-900 to-emerald-800' : 'bg-gradient-to-r from-green-600 to-emerald-500'} py-8 px-6`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-3xl">🏆</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Sports Content Generator</h1>
              <p className="text-green-100">AI-powered content for sports enthusiasts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Options */}
          <div className="lg:col-span-1 space-y-6">
            {/* Sport Selection */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border p-6`}>
              <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-xl">🎯</span> Select Sport
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SPORTS.map((sport) => (
                  <button
                    key={sport.id}
                    onClick={() => setSelectedSport(sport.id)}
                    className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      selectedSport === sport.id
                        ? `bg-gradient-to-r ${sport.color} text-white shadow-lg scale-105`
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{sport.icon}</span>
                    <span className="text-xs font-medium">{sport.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Type Selection */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border p-6`}>
              <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-xl">📝</span> Content Type
              </h3>
              <div className="space-y-2">
                {CONTENT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedContentType(type.id)}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                      selectedContentType === type.id
                        ? isDarkMode
                          ? 'bg-green-600 text-white'
                          : 'bg-green-500 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-lg">{type.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-sm">{type.name}</div>
                      <div className={`text-xs ${selectedContentType === type.id ? 'text-white/80' : isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {type.description}
                      </div>
                    </div>
                    {selectedContentType === type.id && (
                      <span className="ml-auto">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Generator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border p-6`}>
              <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-xl">✍️</span> Enter Details
              </h3>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={getPlaceholder()}
                className={`w-full h-32 p-4 rounded-xl border-2 resize-none transition-all focus:outline-none ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-green-500'
                }`}
              />

              {/* Quick Suggestions */}
              <div className="mt-4">
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedContentType === 'hashtags' && ['World Cup', 'Champions League', 'Premier League', 'IPL'].map(s => (
                    <button key={s} onClick={() => setInputText(s)} className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{s}</button>
                  ))}
                  {selectedContentType === 'prediction' && ['El Clasico', 'India vs Pakistan', 'NBA Finals', 'Super Bowl'].map(s => (
                    <button key={s} onClick={() => setInputText(s)} className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{s}</button>
                  ))}
                  {selectedContentType === 'playerBio' && ['Ronaldo', 'Messi', 'LeBron James', 'Virat Kohli'].map(s => (
                    <button key={s} onClick={() => setInputText(s)} className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{s}</button>
                  ))}
                  {selectedContentType === 'teamAnalysis' && ['Real Madrid', 'Mumbai Indians', 'Lakers', 'All Blacks'].map(s => (
                    <button key={s} onClick={() => setInputText(s)} className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{s}</button>
                  ))}
                  {selectedContentType === 'news' && ['Transfer News', 'Match Highlights', 'Injury Update', 'Record Breaking'].map(s => (
                    <button key={s} onClick={() => setInputText(s)} className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{s}</button>
                  ))}
                  {selectedContentType === 'motivation' && ['Never Give Up', 'Teamwork', 'Victory', 'Training Hard'].map(s => (
                    <button key={s} onClick={() => setInputText(s)} className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{s}</button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading || !inputText.trim()}
                className={`mt-6 w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  isLoading || !inputText.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
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
                    <span>🚀</span> Generate Content
                  </>
                )}
              </button>
            </div>

            {/* Results Section */}
            {result && (
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <span className="text-xl">✨</span> Generated Content
                  </h3>
                  <button
                    onClick={handleCopy}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      copied
                        ? 'bg-green-500 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                <div className={`p-4 rounded-xl whitespace-pre-wrap ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
                  {result}
                </div>
              </div>
            )}

            {/* Features Info */}
            <div className={`${isDarkMode ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-800' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'} rounded-2xl border p-6`}>
              <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-xl">💡</span> Pro Tips
              </h3>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  Be specific with team names and player details for better results
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  Use hashtags for maximum social media engagement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  Match predictions work best with recent match context
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  Combine generated content with your personal insights
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsGenerator;
