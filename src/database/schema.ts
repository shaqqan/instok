import { pgTable, serial, bigint, varchar, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    telegramId: bigint('telegram_id', { mode: 'bigint' }).notNull().unique(),
    username: varchar('username', { length: 255 }),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    language: varchar('language', { length: 10 }).default('en'),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    lastActivity: timestamp('last_activity').defaultNow(),
});

export const storage = pgTable('storages', {
    id: serial('id').primaryKey(),
    channel_id: bigint('channel_id', { mode: 'bigint' }).notNull(),
    channel_message_id: bigint('channel_message_id', { mode: 'bigint' }).notNull(),
    url: varchar('url', { length: 1000 }).notNull().unique(),
    media: jsonb('media'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}); 