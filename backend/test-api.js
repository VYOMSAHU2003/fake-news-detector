import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testAPI() {
  console.log('Testing Gemini API...');
  console.log('API Key (first 10 chars):', process.env.GEMINI_API_KEY?.substring(0, 10));
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const result = await model.generateContent('Say hello in one word');
    const response = await result.response;
    console.log('✅ API is working!');
    console.log('Response:', response.text());
  } catch (error) {
    console.error('❌ API Error:', error.message);
    
    // Try alternate model names
    console.log('\nTrying alternate model names...');
    const alternateModels = ['gemini-1.5-flash', 'gemini-1.5-pro-latest', 'gemini-1.5-pro'];
    
    for (const modelName of alternateModels) {
      try {
        console.log(`Testing ${modelName}...`);
        const altModel = genAI.getGenerativeModel({ model: modelName });
        const altResult = await altModel.generateContent('Hi');
        const altResponse = await altResult.response;
        console.log(`✅ ${modelName} WORKS!`);
        console.log('Response:', altResponse.text());
        return;
      } catch (err) {
        console.log(`❌ ${modelName} failed`);
      }
    }
  }
}

testAPI();
