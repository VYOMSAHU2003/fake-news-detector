import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testAllModels() {
  console.log('Testing Gemini API with various model names...\n');
  console.log('API Key (first 10 chars):', process.env.GEMINI_API_KEY.substring(0, 10));
  
  const modelNames = [
    'gemini-pro',
    'gemini-1.0-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-1.5-pro-latest',
    'gemini-1.5-flash-latest',
    'models/gemini-pro',
    'models/gemini-1.5-pro',
    'models/gemini-1.5-flash'
  ];
  
  for (const modelName of modelNames) {
    try {
      console.log(`\n🔄 Testing: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say "OK" if you can read this');
      const response = await result.response;
      const text = response.text();
      
      console.log(`✅ SUCCESS! Model "${modelName}" works!`);
      console.log(`Response: ${text}`);
      console.log('\n🎉 Use this model name in your server.js file!');
      return modelName;
    } catch (err) {
      console.log(`❌ Failed: ${err.message.substring(0, 100)}`);
    }
  }
  
  console.log('\n❌ No working models found. Please check:');
  console.log('1. API key is valid and from https://aistudio.google.com/app/apikey');
  console.log('2. Gemini API is enabled in your Google Cloud project');
  console.log('3. You have internet connection');
}

testAllModels();
