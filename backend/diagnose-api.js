import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

console.log('=== API Key Diagnostics ===\n');
console.log('Full API Key:', apiKey);
console.log('Length:', apiKey?.length || 0, 'characters');
console.log('Starts with:', apiKey?.substring(0, 10));
console.log('Expected length: 39 characters');
console.log('Expected format: AIzaSy...\n');

// Test simple HTTP request
console.log('Testing direct API call...');

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
  .then(response => {
    console.log('Status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('\n✅ API Connection successful!');
    console.log('Available models:');
    if (data.models) {
      data.models.forEach(model => {
        if (model.supportedGenerationMethods?.includes('generateContent')) {
          console.log(`  ✓ ${model.name}`);
        }
      });
    } else {
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  })
  .catch(error => {
    console.error('\n❌ API Error:', error.message);
  });
