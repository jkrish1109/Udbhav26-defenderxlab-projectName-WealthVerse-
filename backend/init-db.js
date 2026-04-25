import { connectDatabases } from './src/config/database.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

async function init() {
  const db = await connectDatabases();
  
  // Add a test user
  const email = 'test@example.com';
  const password = 'password';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  try {
    await db.run(
      'INSERT INTO users (id, email, password_hash, full_name) VALUES (?, ?, ?, ?)',
      [uuidv4(), email, hashedPassword, 'Test User']
    );
    console.log('Test user created: test@example.com / password');
  } catch (e) {
    if (e.message.includes('UNIQUE constraint failed')) {
      console.log('Test user already exists');
    } else {
      console.log('Error creating user:', e.message);
    }
  }
  
  process.exit(0);
}

init();
