"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    telegramId: (0, pg_core_1.bigint)('telegram_id', { mode: 'bigint' }).notNull().unique(),
    username: (0, pg_core_1.varchar)('username', { length: 255 }),
    firstName: (0, pg_core_1.varchar)('first_name', { length: 255 }),
    lastName: (0, pg_core_1.varchar)('last_name', { length: 255 }),
    language: (0, pg_core_1.varchar)('language', { length: 10 }).default('en'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
    lastActivity: (0, pg_core_1.timestamp)('last_activity').defaultNow(),
});
exports.storage = (0, pg_core_1.pgTable)('storages', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    channel_id: (0, pg_core_1.bigint)('channel_id', { mode: 'bigint' }).notNull(),
    channel_message_id: (0, pg_core_1.bigint)('channel_message_id', { mode: 'bigint' }).notNull(),
    url: (0, pg_core_1.varchar)('url', { length: 1000 }).notNull().unique(),
    media: (0, pg_core_1.jsonb)('media'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
//# sourceMappingURL=schema.js.map