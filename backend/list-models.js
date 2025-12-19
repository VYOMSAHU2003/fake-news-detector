import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  console.log('Listing available models...');
  
  try {
    // Try common model names
    const modelNames = [
      'gemini-pro',
      'gemini-1.0-pro',
      'gemini-1.5-pro',
      'text-bison-001',
      'chat-bison-001'
    ];
    
    for (const modelName of modelNames) {
      try {
        console.log(`\nTrying model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hi');
        const response = await result.response;
        console.log(`✅ ${modelName} WORKS!`);
        console.log('Response:', response.text().substring(0, 50));
        break; // Found working model
      } catch (err) {
        console.log(`❌ ${modelName} failed:`, err.message);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

listModels();
