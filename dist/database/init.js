import { db } from './config';
import { users } from './schema';
import { logger } from '../shared/logger';
export async function initializeDatabase() {
    try {
        logger.info('Initializing database...');
        // Create tables (this will be handled by migrations in production)
        // For development, you can use this to quickly set up the database
        logger.info('Database initialization completed');
    }
    catch (error) {
        logger.error('Database initialization failed', error);
        throw error;
    }
}
export async function checkDatabaseConnection() {
    try {
        // Simple query to test connection
        const result = await db.select().from(users).limit(1);
        logger.info('Database connection successful');
        return true;
    }
    catch (error) {
        logger.error('Database connection failed', error);
        return false;
    }
}
// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    checkDatabaseConnection()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}
//# sourceMappingURL=init.js.map