import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { config } from '../config';
import { logger } from '../utils/logger';

// Database connection configuration
const connectionString = config.DATABASE_URL;

// Create postgres client
const client = postgres(connectionString);

// Create drizzle instance
export const db = drizzle(client);

// Migration function
export async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    logger.info('Database migrations completed successfully');
  } catch (error) {
    logger.error('Migration error', error);
    throw error;
  }
}

// Close database connection
export async function closeConnection() {
  await client.end();
}
