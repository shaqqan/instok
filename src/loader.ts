import { Bot } from "grammy";
import { i18nMiddleware } from "./i18n";
import { config } from "./config";
import { logger } from "./utils/logger";

const STORAGE_CHANNEL_ID = config.STORAGE_CHANNEL_ID;

if (!config.BOT_TOKEN) {
    logger.warn("BOT_TOKEN is not set. Bot will not be able to start.");
}

const bot = new Bot(config.BOT_TOKEN);

// Add i18n middleware
bot.use(i18nMiddleware());

export { bot, STORAGE_CHANNEL_ID };