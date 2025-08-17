import { CommandContext, Context } from 'grammy';

export async function helpCommand(ctx: CommandContext<Context>) {
  const helpMessage = `
📋 Available Commands:

/start - Start the bot and register your account
/help - Show this help message
/ping - Check if the bot is responsive

🤖 This is a simple Telegram bot built with Grammy and TypeScript.
  `;

  await ctx.reply(helpMessage);
}