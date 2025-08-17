import { CommandContext, Context } from 'grammy';

export async function pingCommand(ctx: CommandContext<Context>) {
  const startTime = Date.now();
  
  const message = await ctx.reply('🏓 Pinging...');
  
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  
  await ctx.api.editMessageText(
    ctx.chat.id,
    message.message_id,
    `🏓 Pong! Response time: ${responseTime}ms`
  );
}