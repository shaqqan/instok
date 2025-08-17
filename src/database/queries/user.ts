import { getPool } from '../connection';
import { logger } from '../../utils/logger';

export interface User {
  id: number;
  telegram_id: number;
  username: string | null;
  first_name: string;
  last_name: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  telegram_id: number;
  username: string | null;
  first_name: string;
  last_name: string | null;
}

export async function createUser(userData: CreateUserData): Promise<User> {
  const pool = getPool();
  
  const query = `
    INSERT INTO users (telegram_id, username, first_name, last_name)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (telegram_id) 
    DO UPDATE SET 
      username = EXCLUDED.username,
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `;
  
  const values = [
    userData.telegram_id,
    userData.username,
    userData.first_name,
    userData.last_name
  ];
  
  try {
    const result = await pool.query(query, values);
    logger.info('User created/updated', { telegramId: userData.telegram_id });
    return result.rows[0];
  } catch (error) {
    logger.error('Error creating/updating user:', error);
    throw error;
  }
}

export async function getUserByTelegramId(telegramId: number): Promise<User | null> {
  const pool = getPool();
  
  const query = 'SELECT * FROM users WHERE telegram_id = $1';
  
  try {
    const result = await pool.query(query, [telegramId]);
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error fetching user by telegram ID:', error);
    throw error;
  }
}

export async function getAllUsers(): Promise<User[]> {
  const pool = getPool();
  
  const query = 'SELECT * FROM users ORDER BY created_at DESC';
  
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    logger.error('Error fetching all users:', error);
    throw error;
  }
}