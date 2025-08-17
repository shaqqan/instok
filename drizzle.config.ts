import type { Config } from 'drizzle-kit';

export default {
  schema: './src/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/instokbot',
  },
  verbose: true,
  strict: true,
} satisfies Config;
