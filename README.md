# Fake News Detector 🔍

A modern, AI-powered fake news detection web application built with React, TypeScript, Tailwind CSS, and Google Gemini AI.

## ✨ Features

- 🤖 **Google Gemini AI Integration** - Real AI-powered analysis
- 🎨 Beautiful gradient animations and hover effects
- 📊 Confidence score visualization
- ⚡ Real-time analysis with Express.js backend
- 🎯 Detailed reasoning for each analysis
- 💫 Smooth transitions and glass morphism effects
- 🔒 Secure API key management

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling

### Backend
- **Express.js** - Server framework
- **Google Gemini AI** - AI/ML analysis
- **Node.js** - Runtime environment

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. **Install Frontend Dependencies:**
```bash
npm install
```

2. **Install Backend Dependencies:**
```bash
cd backend
npm install
```

3. **Configure API Key:**
   - Open `backend/.env`
   - Replace `your_google_gemini_api_key_here` with your actual Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

### Running the Application

1. **Start the Backend Server** (in a terminal):
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:3001

2. **Start the Frontend** (in another terminal):
```bash
npm run dev
```
The frontend will run on http://localhost:5173

3. **Open your browser** and navigate to http://localhost:5173

## 📖 How to Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the generated API key
5. Paste it in `backend/.env` file

## 🎯 How It Works

The application uses Google Gemini AI to analyze news articles based on:
- Sensationalist or clickbait language detection
- Verifiable facts vs unsubstantiated claims
- Source credibility indicators
- Emotional manipulation tactics
- Logical consistency and coherence
- Grammar and writing quality
- Balance and objectivity vs bias

## 📁 Project Structure

```
fake news/
├── src/                    # Frontend React code
│   ├── components/         # React components
│   ├── services/          # API service
│   └── ...
├── backend/               # Express.js backend
│   ├── server.js         # Main server file
│   ├── .env             # Environment variables
│   └── package.json     # Backend dependencies
├── index.html           # HTML entry point
└── package.json         # Frontend dependencies
```

## 🔧 API Endpoints

- `GET /api/health` - Check server status
- `POST /api/analyze` - Analyze news text
  ```json
  {
    "text": "Your news article text here"
  }
  ```

## 🎨 Features Demo

- **Real-time Analysis**: Enter any news article or headline
- **AI Confidence Score**: See how confident the AI is (0-100%)
- **Fake News Score**: Visual indicator of fake news probability
- **Detailed Reasoning**: Understand why content is flagged
- **Beautiful UI**: Modern design with smooth animations

## ⚠️ Important Notes

- Always verify important information with multiple trusted sources
- This tool is meant to assist, not replace critical thinking
- Keep your API key secure and never commit it to public repositories

## 📝 License

This project is for educational purposes.
