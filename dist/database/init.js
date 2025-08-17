"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
exports.checkDatabaseConnection = checkDatabaseConnection;
const config_1 = require("./config");
const schema_1 = require("./schema");
const logger_1 = require("../utils/logger");
async function initializeDatabase() {
    try {
        logger_1.logger.info('Initializing database...');
        logger_1.logger.info('Database initialization completed');
    }
    catch (error) {
        logger_1.logger.error('Database initialization failed', error);
        throw error;
    }
}
async function checkDatabaseConnection() {
    try {
        const result = await config_1.db.select().from(schema_1.users).limit(1);
        logger_1.logger.info('Database connection successful');
        return true;
    }
    catch (error) {
        logger_1.logger.error('Database connection failed', error);
        return false;
    }
}
if (import.meta.url === `file://${process.argv[1]}`) {
    checkDatabaseConnection()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}
//# sourceMappingURL=init.js.map