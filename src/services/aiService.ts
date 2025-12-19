export interface AnalysisResult {
  isFake: boolean;
  confidence: number;
  reasons: string[];
  score: number;
  summary?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const analyzeNews = async (text: string): Promise<AnalysisResult> => {
  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to analyze news');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
};
