import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Analyze news endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_google_gemini_api_key_here') {
      return res.status(500).json({ 
        error: 'API key not configured. Please add your Gemini API key to the .env file' 
      });
    }

    // Get the generative model - using gemini-2.5-flash (latest stable model)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Create a detailed prompt for fake news detection
    const prompt = `You are an expert fact-checker and fake news detector. Analyze the following text and determine if it appears to be fake news, misinformation, or credible information.

Text to analyze:
"${text}"

Please provide your analysis in the following JSON format (respond ONLY with valid JSON, no additional text):
{
  "isFake": boolean (true if likely fake news, false if appears credible),
  "confidence": number (0-100, how confident you are in your assessment),
  "score": number (0-100, where 0 is completely credible and 100 is definitely fake),
  "reasons": [
    "reason 1 for your assessment",
    "reason 2 for your assessment",
    "reason 3 for your assessment",
    "reason 4 for your assessment"
  ],
  "summary": "A brief 1-2 sentence summary of why this is or isn't fake news"
}

Base your analysis on:
1. Use of sensationalist or clickbait language
2. Verifiable facts vs unsubstantiated claims
3. Source credibility indicators
4. Emotional manipulation tactics
5. Logical consistency and coherence
6. Grammar and writing quality
7. Balance and objectivity vs bias`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    // Parse the JSON response
    let analysis;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', analysisText);
      // Fallback analysis if parsing fails
      analysis = {
        isFake: analysisText.toLowerCase().includes('fake') || analysisText.toLowerCase().includes('misinformation'),
        confidence: 70,
        score: 50,
        reasons: [
          'Analysis completed but response format was unexpected',
          'Manual review recommended',
          'Check sources independently',
          'Verify claims with trusted fact-checkers'
        ],
        summary: 'AI analysis completed with moderate confidence. Please verify independently.'
      };
    }

    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing news:', error);
    res.status(500).json({ 
      error: 'Failed to analyze news',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/analyze`);
  
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_google_gemini_api_key_here') {
    console.warn('⚠️  WARNING: GEMINI_API_KEY not configured in .env file');
  } else {
    console.log('✅ Gemini API configured');
  }
});
