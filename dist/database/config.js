"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.runMigrations = runMigrations;
exports.closeConnection = closeConnection;
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const migrator_1 = require("drizzle-orm/postgres-js/migrator");
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const connectionString = config_1.config.DATABASE_URL;
const client = (0, postgres_1.default)(connectionString);
exports.db = (0, postgres_js_1.drizzle)(client);
async function runMigrations() {
    try {
        await (0, migrator_1.migrate)(exports.db, { migrationsFolder: './drizzle' });
        logger_1.logger.info('Database migrations completed successfully');
    }
    catch (error) {
        logger_1.logger.error('Migration error', error);
        throw error;
    }
}
async function closeConnection() {
    await client.end();
}
//# sourceMappingURL=config.js.map