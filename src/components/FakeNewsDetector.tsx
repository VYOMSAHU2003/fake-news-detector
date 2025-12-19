import { useState } from 'react';
import { analyzeNews, AnalysisResult } from '../services/aiService';

const FakeNewsDetector = () => {
  const [newsText, setNewsText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!newsText.trim()) return;

    setIsAnalyzing(true);
    setShowResult(false);
    setResult(null);
    setError(null);

    try {
      const analysis = await analyzeNews(newsText);
      setResult(analysis);
      setShowResult(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze. Please check if the backend server is running.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setNewsText('');
    setResult(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 animate-float">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
          Fake News Detector
        </h1>
        <p className="text-xl text-gray-300">
          AI-Powered Truth Verification System
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <span className="px-3 py-1 bg-purple-500 bg-opacity-20 rounded-full text-sm border border-purple-400 border-opacity-30">
            Machine Learning
          </span>
          <span className="px-3 py-1 bg-blue-500 bg-opacity-20 rounded-full text-sm border border-blue-400 border-opacity-30">
            NLP Powered
          </span>
          <span className="px-3 py-1 bg-pink-500 bg-opacity-20 rounded-full text-sm border border-pink-400 border-opacity-30">
            Real-time Analysis
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect rounded-2xl p-8 shadow-2xl glow-effect transition-all duration-300 hover:scale-[1.01]">
          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3 text-gray-200">
              Enter News Article or Headline
            </label>
            <textarea
              value={newsText}
              onChange={(e) => setNewsText(e.target.value)}
              placeholder="Paste your news article, headline, or social media post here..."
              className="w-full h-48 px-4 py-3 bg-slate-800 bg-opacity-50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
              disabled={isAnalyzing}
            />
            <div className="mt-2 text-sm text-gray-400">
              {newsText.length} characters
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAnalyze}
              disabled={!newsText.trim() || isAnalyzing}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing with Google Gemini AI...
                </span>
              ) : (
                '🔍 Analyze with Google Gemini AI'
              )}
            </button>
            <button
              onClick={handleClear}
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Clear
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg">
              <p className="text-red-300">❌ {error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {showResult && result && (
          <div className={`mt-8 glass-effect rounded-2xl p-8 shadow-2xl animate-fade-in transition-all duration-500 ${
            result.isFake ? 'glow-effect border-2 border-red-500 border-opacity-30' : 'glow-effect border-2 border-green-500 border-opacity-30'
          }`}>
            {/* Result Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`text-6xl ${result.isFake ? 'animate-pulse' : ''}`}>
                  {result.isFake ? '⚠️' : '✅'}
                </div>
                <div>
                  <h2 className={`text-3xl font-bold ${result.isFake ? 'text-red-400' : 'text-green-400'}`}>
                    {result.isFake ? 'Likely Fake News' : 'Appears Credible'}
                  </h2>
                  <p className="text-gray-300 mt-1">AI Analysis Complete</p>
                </div>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-gray-200">Confidence Level</span>
                <span className="text-2xl font-bold gradient-text">{result.confidence.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    result.isFake 
                      ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>

            {/* Fake Score Meter */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-gray-200">Fake News Score</span>
                <span className="text-xl font-bold text-red-400">{result.score.toFixed(0)}/100</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 transition-all duration-1000"
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            {/* Reasons */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Analysis Details</h3>
              <div className="space-y-3">
                {result.reasons.map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-slate-800 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-300 transform hover:translate-x-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-2xl">{result.isFake ? '🔴' : '🟢'}</span>
                    <p className="text-gray-300 flex-1">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Summary */}
            {result.summary && (
              <div className="mt-6 p-4 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">AI Summary</h4>
                <p className="text-gray-300">{result.summary}</p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg">
              <p className="text-sm text-yellow-200">
                ⚡ <strong>Note:</strong> This analysis is powered by Google Gemini AI. Always verify important information with multiple trusted sources.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-12 text-center text-gray-400">
        <p className="text-sm">
          Powered by Google Gemini AI & Advanced Natural Language Processing
        </p>
      </div>
    </div>
  );
};

export default FakeNewsDetector;
