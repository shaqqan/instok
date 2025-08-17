import { Bot, Context, NextFunction } from 'grammy';
import { logger } from '../utils/logger';

// Logging middleware
function loggingMiddleware(ctx: Context, next: NextFunction) {
  const start = Date.now();
  
  logger.info('Incoming update', {
    updateId: ctx.update.update_id,
    userId: ctx.from?.id,
    username: ctx.from?.username,
    chatId: ctx.chat?.id,
    messageType: ctx.message ? 'message' : ctx.callbackQuery ? 'callback_query' : 'other'
  });

  return next().finally(() => {
    const duration = Date.now() - start;
    logger.info('Update processed', {
      updateId: ctx.update.update_id,
      duration: `${duration}ms`
    });
  });
}

// Error handling middleware
function errorMiddleware(ctx: Context, next: NextFunction) {
  return next().catch((error) => {
    logger.error('Unhandled error in middleware chain:', error);
    return ctx.reply('An error occurred while processing your request.');
  });
}

export function setupMiddleware(bot: Bot) {
  // Add logging middleware
  bot.use(loggingMiddleware);
  
  // Add error handling middleware
  bot.use(errorMiddleware);
}