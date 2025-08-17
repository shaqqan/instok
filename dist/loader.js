"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_CHANNEL_ID = exports.bot = void 0;
const grammy_1 = require("grammy");
const i18n_1 = require("./i18n");
const config_1 = require("./config");
const logger_1 = require("./utils/logger");
const STORAGE_CHANNEL_ID = config_1.config.STORAGE_CHANNEL_ID;
exports.STORAGE_CHANNEL_ID = STORAGE_CHANNEL_ID;
if (!config_1.config.BOT_TOKEN) {
    logger_1.logger.warn("BOT_TOKEN is not set. Bot will not be able to start.");
}
const bot = new grammy_1.Bot(config_1.config.BOT_TOKEN);
exports.bot = bot;
bot.use((0, i18n_1.i18nMiddleware)());
//# sourceMappingURL=loader.js.map