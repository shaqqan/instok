import { Bot } from 'grammy';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { connectDatabase } from './database/connection';
import { setupCommands } from './commands';
import { setupMiddleware } from './middleware';

// Load environment variables
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  logger.error('BOT_TOKEN is not provided in environment variables');
  process.exit(1);
}

// Create bot instance
const bot = new Bot(BOT_TOKEN);

// Setup middleware
setupMiddleware(bot);

// Setup commands
setupCommands(bot);

// Error handler
bot.catch((err) => {
  logger.error('Bot error:', err);
});

async function startBot() {
  try {
    // Connect to database
    await connectDatabase();
    logger.info('Database connected successfully');

    // Start the bot
    await bot.start();
    logger.info('Bot started successfully');
  } catch (error) {
    logger.error('Failed to start bot:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.once('SIGINT', () => {
  logger.info('Received SIGINT, shutting down gracefully...');
  bot.stop();
  process.exit(0);
});

process.once('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down gracefully...');
  bot.stop();
  process.exit(0);
});

// Start the bot
startBot();