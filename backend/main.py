from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

# Import the local AI helper
from ai import ai_helper

load_dotenv()

app = FastAPI(title="Thinkr API", description="AI-powered Google Cloud Certification assistant")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    type: str
    content: str

class ChatRequest(BaseModel):
    query: str
    chatHistory: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    response: str

@app.get("/")
async def root():
    return {"message": "Thinkr API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        if not request.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        # Use the original Python AI helper with vector store and chat history
        response = ai_helper(request.query, request.chatHistory)
        
        return ChatResponse(response=response.content)
    
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Failed to get AI response")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
