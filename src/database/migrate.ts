import { readFileSync } from 'fs';
import { join } from 'path';
import { connectDatabase } from './connection';
import { logger } from '../utils/logger';

export async function runMigrations(): Promise<void> {
  try {
    const pool = await connectDatabase();
    
    // Read the schema file
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    
    // Execute the schema
    await pool.query(schema);
    
    logger.info('Database migrations completed successfully');
  } catch (error) {
    logger.error('Failed to run database migrations:', error);
    throw error;
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      logger.info('Migrations completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Migration failed:', error);
      process.exit(1);
    });
}