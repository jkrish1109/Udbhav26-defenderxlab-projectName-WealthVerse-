import { connectDatabases } from './src/config/database.js';

async function fix() {
  const db = await connectDatabases();
  
  try {
    await db.exec(`
      DROP TABLE IF EXISTS transactions;
      DROP TABLE IF EXISTS users;
    `);
    console.log('Tables dropped successfully.');
    
    // Re-initialize tables
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT,
        universe TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        category TEXT,
        date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    console.log('Tables recreated successfully.');
  } catch (e) {
    console.error('Error fixing db:', e);
  }
  
  process.exit(0);
}

fix();
