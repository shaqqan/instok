"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader_1 = require("../../loader");
const container_1 = require("../../interfaces/telegram/container");
const logger_1 = require("../../utils/logger");
loader_1.bot.command("start", async (ctx) => {
    try {
        const telegramId = ctx.from?.id;
        const username = ctx.from?.username;
        const firstName = ctx.from?.first_name;
        const lastName = ctx.from?.last_name;
        if (!telegramId) {
            await ctx.reply("❌ Error: Could not identify user");
            return;
        }
        await container_1.useCases.registerOrUpdateUser.execute({
            telegramId,
            username: username ?? null,
            firstName: firstName ?? null,
            lastName: lastName ?? null,
        });
        const messageText = ctx.i18n.t("start.welcome");
        await ctx.reply(messageText, {
            parse_mode: "Markdown",
        });
    }
    catch (error) {
        logger_1.logger.error('Error in start command', error);
        await ctx.reply("❌ An error occurred. Please try again later.");
    }
});
//# sourceMappingURL=start.js.map