import { bot } from "./loader";
import "./handlers";
import { runMigrations } from "./database";
import { logger } from "./shared/logger";
(async () => {
    try {
        // Run database migrations
        await runMigrations();
        // Start the bot
        await bot.start({
            onStart: (botInfo) => {
                logger.info(`Bot started as ${botInfo.username}`);
            },
        });
    }
    catch (error) {
        logger.error('Failed to start bot', error);
        process.exit(1);
    }
})();
//# sourceMappingURL=index.js.map