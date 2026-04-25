import express from 'express';
import { getDB } from '../config/database.js';
import { sendOTPEmail } from '../services/emailService.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const router = express.Router();

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, universe: user.universe },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
};

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const db = getDB();
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 mins

    // Save OTP to DB
    await db.run(
      'INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)',
      [email, otp, expiresAt]
    );

    // Send Email
    const emailResult = await sendOTPEmail(email, otp);

    res.json({ 
      success: true, 
      message: 'OTP sent successfully',
      messageUrl: emailResult.messageUrl // Only for development/testing
    });
  } catch (error) {
    console.error('Error in send-otp:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

  try {
    const db = getDB();
    const record = await db.get(
      'SELECT * FROM otps WHERE email = ? AND otp = ? AND expires_at > CURRENT_TIMESTAMP ORDER BY created_at DESC LIMIT 1',
      [email, otp]
    );

    if (!record) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // OTP is valid!
    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error in verify-otp:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Normal Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const lowerEmail = email.toLowerCase();

  try {
    const db = getDB();
    const user = await db.get('SELECT * FROM users WHERE LOWER(email) = ?', [lowerEmail]);

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.json({ 
      success: true, 
      token,
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.full_name, 
        universe: user.universe 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Register with Universe Selection
router.post('/register', async (req, res) => {
  const { email, password, fullName, universe } = req.body;
  
  if (!email || !password || !fullName || !universe) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const lowerEmail = email.toLowerCase();

  try {
    const db = getDB();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = uuidv4();

    await db.run(
      'INSERT INTO users (id, email, password_hash, full_name, universe) VALUES (?, ?, ?, ?, ?)',
      [userId, lowerEmail, passwordHash, fullName, universe]
    );

    const user = { id: userId, email, fullName, universe };
    const token = generateToken(user);

    res.json({ success: true, token, user });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

export default router;
