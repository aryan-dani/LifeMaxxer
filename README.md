# LifeMaxxer AI - Project Setup Guide

Welcome! This repository acts as your personal "Life Audit" app powered by AI. It consists of a **Next.js Frontend** (what you see in the browser) and a **FastAPI Backend** (what handles the Groq AI magic).

I've written this guide specifically for you to get up and running easily.

## Before You Start: Get a Groq API Key

For the AI to work, it uses a powerful model via Groq. You'll need to generate a key on their website:

1. Go to [console.groq.com](https://console.groq.com/).
2. Create an account or sign in.
3. Click on **API Keys** in the sidebar.
4. Click **Create API Key**. Give it a name (like "Life Audit App") and copy the key it gives you immediately. Save this key somewhere safe—you'll need it in the Backend step!

---

## 1. Setting Up the Backend (The Brain)

This uses Python to talk to the AI model.

1. Open your terminal/command prompt and navigate into the backend directory:
   `ash
   cd backend
   `
2. **Create a virtual environment** (this keeps the Python tools separate from your main system):
   * On Windows: python -m venv venv
   * On Mac/Linux: python3 -m venv venv
3. **Activate the virtual environment**:
   * On Windows: .\venv\Scripts\activate
   * On Mac/Linux: source venv/bin/activate
4. **Install the dependencies**:
   `ash
   pip install -r requirements.txt
   `
5. **Set up the Environment Variable**:
   * Create a file simply named .env inside the ackend folder (if it doesn't already exist).
   * Inside it, paste your Groq key like this (replace your_api_key_here with your actual key!):
     `env
     GROQ_API_KEY=gsk_abc123...
     `
6. **Start the backend server**:
   `ash
   python -m uvicorn main:app --reload
   `
   *(Leave this window open so the brain stays awake! It runs on http://127.0.0.1:8000)*

---

## 2. Setting Up the Frontend (The Face)

Open a **new** terminal window for this part.

1. Navigate to the frontend directory:
   `ash
   cd frontend
   `
2. **Install the Node.js packages** (make sure you have Node installed on your computer):
   `ash
   npm install
   `
3. **Start the development server**:
   `ash
   npm run dev
   `
   *(This starts the website locally. Leave this window running too!)*

## 3. Using the App

Once both the backend and frontend are running, open your web browser and go to:
**http://localhost:3000**

You should see the application load! The backend API is automatically pointed to http://localhost:8000, so no extra linking is necessary. 

Enjoy your Life Audits!
