"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./utils/logger");
const connection_1 = require("./database/connection");
const commands_1 = require("./commands");
const middleware_1 = require("./middleware");
dotenv_1.default.config();
const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
    logger_1.logger.error('BOT_TOKEN is not provided in environment variables');
    process.exit(1);
}
const bot = new grammy_1.Bot(BOT_TOKEN);
(0, middleware_1.setupMiddleware)(bot);
(0, commands_1.setupCommands)(bot);
bot.catch((err) => {
    logger_1.logger.error('Bot error:', err);
});
async function startBot() {
    try {
        await (0, connection_1.connectDatabase)();
        logger_1.logger.info('Database connected successfully');
        await bot.start();
        logger_1.logger.info('Bot started successfully');
    }
    catch (error) {
        logger_1.logger.error('Failed to start bot:', error);
        process.exit(1);
    }
}
process.once('SIGINT', () => {
    logger_1.logger.info('Received SIGINT, shutting down gracefully...');
    bot.stop();
    process.exit(0);
});
process.once('SIGTERM', () => {
    logger_1.logger.info('Received SIGTERM, shutting down gracefully...');
    bot.stop();
    process.exit(0);
});
startBot();
//# sourceMappingURL=index.js.map