import { bot } from "../../loader";
import { LanguagesInlineBtn } from "../../keyboards";
import { useCases } from "../../interfaces/telegram/container";
import { logger } from "../../shared/logger";
bot.command("lang", async (ctx) => {
    try {
        const i18nCtx = ctx;
        const messageText = i18nCtx.i18n.t("language.select_language");
        await ctx.reply(messageText, {
            reply_markup: LanguagesInlineBtn,
        });
    }
    catch (error) {
        logger.error("Language command error", error);
        const i18nCtx = ctx;
        await ctx.reply(i18nCtx.i18n.t("general.error"));
    }
});
// Handle language selection callbacks
bot.callbackQuery(/^(uz|ru|en)$/i, async (ctx) => {
    try {
        const i18nCtx = ctx;
        const selectedLang = ctx.callbackQuery?.data;
        if (!selectedLang) {
            await ctx.answerCallbackQuery(i18nCtx.i18n.t("language.invalid_language"));
            return;
        }
        // Here you would save the user's language preference to the database
        // For now, we'll just acknowledge the selection
        const successMessage = i18nCtx.i18n.t("language.language_changed", { language: selectedLang });
        await ctx.answerCallbackQuery(successMessage);
        // Update the message to show the selected language
        // update in-memory language for this request chain
        i18nCtx.i18n.setLanguage(selectedLang);
        const updatedMessage = i18nCtx.i18n.t("language.language_selected", { language: selectedLang });
        await ctx.editMessageText(updatedMessage);
        await useCases.setUserLanguage.execute({ telegramId: ctx.from.id, language: selectedLang });
    }
    catch (error) {
        logger.error("Language callback error", error);
        const i18nCtx = ctx;
        await ctx.answerCallbackQuery(i18nCtx.i18n.t("general.error"));
    }
});
//# sourceMappingURL=lang.js.map