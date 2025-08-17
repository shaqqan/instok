"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader_1 = require("../../loader");
const keyboards_1 = require("../../keyboards");
const container_1 = require("../../interfaces/telegram/container");
const logger_1 = require("../../utils/logger");
loader_1.bot.command("lang", async (ctx) => {
    try {
        const i18nCtx = ctx;
        const messageText = i18nCtx.i18n.t("language.select_language");
        await ctx.reply(messageText, {
            reply_markup: keyboards_1.LanguagesInlineBtn,
        });
    }
    catch (error) {
        logger_1.logger.error("Language command error", error);
        const i18nCtx = ctx;
        await ctx.reply(i18nCtx.i18n.t("general.error"));
    }
});
loader_1.bot.callbackQuery(/^(uz|kaa|ru|en)$/, async (ctx) => {
    try {
        const i18nCtx = ctx;
        const selectedLang = ctx.callbackQuery?.data;
        if (!selectedLang) {
            await ctx.answerCallbackQuery(i18nCtx.i18n.t("language.invalid_language"));
            return;
        }
        const successMessage = i18nCtx.i18n.t("language.language_changed", { language: selectedLang });
        await ctx.answerCallbackQuery(successMessage);
        i18nCtx.i18n.setLanguage(selectedLang);
        const updatedMessage = i18nCtx.i18n.t("language.language_selected", { language: selectedLang });
        await ctx.editMessageText(updatedMessage);
        await container_1.useCases.setUserLanguage.execute({ telegramId: ctx.from.id, language: selectedLang });
    }
    catch (error) {
        logger_1.logger.error("Language callback error", error);
        const i18nCtx = ctx;
        await ctx.answerCallbackQuery(i18nCtx.i18n.t("general.error"));
    }
});
//# sourceMappingURL=lang.js.map