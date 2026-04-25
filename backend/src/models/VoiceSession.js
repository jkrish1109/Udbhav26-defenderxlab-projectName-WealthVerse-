import mongoose from 'mongoose'

const voiceSessionSchema = new mongoose.Schema({
  user_id: { type: String, required: true, index: true },
  session_id: { type: String, required: true },
  audio_url: { type: String, required: true },
  transcript: { type: String, required: true },
  emotion_score: { type: Number },
  language: { type: String, default: 'en' },
  ai_response: { type: String },
  timestamp: { type: Date, default: Date.now }
})

export const VoiceSession = mongoose.model('VoiceSession', voiceSessionSchema)
