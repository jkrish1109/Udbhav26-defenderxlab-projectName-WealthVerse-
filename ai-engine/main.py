from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
import pandas as pd
from datetime import datetime
from dotenv import load_dotenv

# Load env variables safely
if os.path.exists(".env"):
    load_dotenv()
else:
    load_dotenv(override=False)

app = FastAPI(
    title="WealthVerse AI Engine",
    description="The intelligent core of India's premier financial simulator",
    version="1.1.0"
)

# CORS setup for frontend connectivity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SpendingData(BaseModel):
    user_id: str
    transactions: list

class AdviceRequest(BaseModel):
    user_id: str
    context: str

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "WealthVerse AI Engine",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/ai/analyze-spending")
async def analyze_spending(data: SpendingData):
    try:
        if not data.transactions:
            return {
                "status": "success",
                "insights": ["Start tracking transactions to see AI insights!"],
                "emergency_risk": "unknown"
            }
        
        # Load transactions into a DataFrame for analysis
        df = pd.DataFrame(data.transactions)
        
        # Simple analysis: top category and total spending
        total_spent = df['amount'].sum() if 'amount' in df else 0
        top_category = df['category'].mode()[0] if 'category' in df and not df['category'].empty else "N/A"
        
        # Simulate risk analysis
        risk = "low"
        if total_spent > 50000:
            risk = "medium"
        if total_spent > 150000:
            risk = "high"

        return {
            "status": "success", 
            "insights": [
                f"You spent a total of ₹{total_spent:,.2f} this period.",
                f"Your highest spending category is {top_category}.",
                "Consider setting a budget for dining out next month."
            ],
            "emergency_risk": risk,
            "stats": {
                "total": total_spent,
                "top_category": top_category
            }
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Analysis Error: {str(e)}")

@app.post("/api/ai/generate-advice")
async def generate_advice(req: AdviceRequest):
    try:
        # Placeholder for OpenAI integration
        # In production, you would call OpenAI here:
        # client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        advice_map = {
            "low_savings": "Your savings are below the 20% threshold. Try the 50/30/20 rule.",
            "high_spending": "You've exceeded your usual spending. Review your discretionary costs.",
            "default": "Based on your activity, you're on a steady path. Consider starting an SIP for long-term growth."
        }
        
        context_key = req.context.lower() if req.context else "default"
        advice = advice_map.get(context_key, advice_map["default"])

        return {
            "advice": advice,
            "generated_at": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/voice/process")
async def process_voice(
    audio_file: UploadFile = File(...),
    user_id: str = Form(...),
    language: str = Form("en")
):
    try:
        if not audio_file.filename:
            raise HTTPException(status_code=400, detail="Audio file missing.")
            
        # Simulated Voice-to-Action response
        return {
            "transcript": "Checking my portfolio...",
            "emotion_score": 0.9,
            "ai_response": "Your portfolio is currently up by 4.2%. Your recent investment in Index Funds is performing well.",
            "intent": "portfolio_query"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    # Note: Using "main:app" requires the file to be named main.py
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
