import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

app = FastAPI(title="Audit API Backend")

# Allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],  # Update this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
# Provide the API key in the .env file as GROQ_API_KEY
groq_api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api_key)

class UserData(BaseModel):
    # Depending on what the frontend sends, let's catch it as a dict for now
    data: Dict[str, Any]

@app.post("/api/analyze")
async def analyze_life(user_data: dict):
    try:
        # Construct the prompt based on user_data
        prompt = f"""
        You are an expert life auditor and strategist.
        Please analyze the following user data and provide a detailed review, including a score and actionable steps.
        
        User Data:
        {json.dumps(user_data, indent=2)}
        
        Provide the result in a structured JSON format with the following keys:
        - overall_score (0-100)
        - summary (string)
        - strengths (list of strings)
        - areas_for_improvement (list of strings)
        - action_plan (list of objects with 'title' and 'description')
        """

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that outputs only valid JSON.",
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama3-8b-8192", # Using the requested Llama 3 8B model
            response_format={"type": "json_object"},
            temperature=0.7,
        )

        response_content = chat_completion.choices[0].message.content
        report_data = json.loads(response_content)

        return {"success": True, "reportData": report_data}

    except Exception as e:
        print(f"Error calling Groq: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
