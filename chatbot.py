import os
from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

# Configure Google Gemini API
GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY_HERE"  # Replace with your actual API key
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost"],  # Adjust if your frontend URL differs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class ChatRequest(BaseModel):
    message: str

# Initialize Gemini model
model = genai.GenerativeModel('gemini-pro')

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        prompt = f"Explain the legal term '{request.message}' in simple, everyday language that anyone can understand."
        response = model.generate_content(prompt)
        return {"response": response.text}
    except Exception as e:
        return {"response": f"Error: {str(e)}"}