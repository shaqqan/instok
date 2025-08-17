import { CommandContext, Context } from 'grammy';
import { logger } from '../utils/logger';
import { createUser } from '../database/queries/user';

export async function startCommand(ctx: CommandContext<Context>) {
  try {
    const user = ctx.from;
    if (!user) {
      await ctx.reply('Unable to identify user.');
      return;
    }

    // Create or update user in database
    await createUser({
      telegram_id: user.id,
      username: user.username || null,
      first_name: user.first_name,
      last_name: user.last_name || null,
    });

    const welcomeMessage = `
🤖 Welcome to the Telegram Bot!

Hello ${user.first_name}! I'm here to help you.

Use /help to see available commands.
    `;

    await ctx.reply(welcomeMessage);
    
    logger.info(`User started bot`, { 
      userId: user.id, 
      username: user.username,
      firstName: user.first_name 
    });
  } catch (error) {
    logger.error('Error in start command:', error);
    await ctx.reply('Sorry, something went wrong. Please try again.');
  }
}