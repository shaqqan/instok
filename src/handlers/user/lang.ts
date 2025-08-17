import { bot } from "../../loader";
import { LanguagesInlineBtn } from "../../keyboards";
import { I18nContext } from "../../i18n";
import { useCases } from "../../interfaces/telegram/container";
import { logger } from "../../utils/logger";

bot.command("lang", async (ctx) => {
    try {
        const i18nCtx = ctx as I18nContext;
        const messageText = i18nCtx.i18n.t("language.select_language");
        await ctx.reply(messageText, {
            reply_markup: LanguagesInlineBtn,
        });
    } catch (error) {
        logger.error("Language command error", error);
        const i18nCtx = ctx as I18nContext;
        await ctx.reply(i18nCtx.i18n.t("general.error"));
    }
});

// Handle language selection callbacks
bot.callbackQuery(/^(uz|kaa|ru|en)$/, async (ctx) => {
    try {
        const i18nCtx = ctx as I18nContext;
        const selectedLang = ctx.callbackQuery?.data as "uz" | "kaa" | "ru" | "en";
        
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

        await useCases.setUserLanguage.execute({ telegramId: ctx.from!.id, language: selectedLang });
        
    } catch (error) {
        logger.error("Language callback error", error);
        const i18nCtx = ctx as I18nContext;
        await ctx.answerCallbackQuery(i18nCtx.i18n.t("general.error"));
    }
});