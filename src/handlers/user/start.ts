import { bot } from "../../loader";
import { useCases } from "../../interfaces/telegram/container";
import { logger } from "../../utils/logger";

bot.command("start", async (ctx) => {
    try {
        // Get user information from Telegram context
        const telegramId = ctx.from?.id;
        const username = ctx.from?.username;
        const firstName = ctx.from?.first_name;
        const lastName = ctx.from?.last_name;

        if (!telegramId) {
            await ctx.reply("❌ Error: Could not identify user");
            return;
        }

        // Create or update user in database via use case
        await useCases.registerOrUpdateUser.execute({
            telegramId,
            username: username ?? null,
            firstName: firstName ?? null,
            lastName: lastName ?? null,
        });

        const messageText = (ctx as any).i18n.t("start.welcome");

        await ctx.reply(messageText, {
            parse_mode: "Markdown",
        });

    } catch (error) {
        logger.error('Error in start command', error);
        await ctx.reply("❌ An error occurred. Please try again later.");
    }
});