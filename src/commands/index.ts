import { Bot } from 'grammy';
import { startCommand } from './start';
import { helpCommand } from './help';
import { pingCommand } from './ping';

export function setupCommands(bot: Bot) {
  // Register commands
  bot.command('start', startCommand);
  bot.command('help', helpCommand);
  bot.command('ping', pingCommand);
  
  // Handle unknown commands
  bot.on('message:text', async (ctx, next) => {
    const text = ctx.message.text;
    if (text.startsWith('/')) {
      await ctx.reply('Unknown command. Use /help to see available commands.');
      return;
    }
    await next();
  });
}