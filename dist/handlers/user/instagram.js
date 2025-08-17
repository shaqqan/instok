"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loader_1 = require("../../loader");
const services_1 = require("../../services");
const storage_1 = require("../../services/storage");
const logger_1 = require("../../utils/logger");
const instagramPatterns = {
    post: /^https?:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+\/?(\?.*)?$/i,
    reel: /^https?:\/\/(www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+\/?(\?.*)?$/i,
    story: /^https?:\/\/(www\.)?instagram\.com\/stories\/[A-Za-z0-9_.]+\/[0-9]+\/?(\?.*)?$/i,
    tv: /^https?:\/\/(www\.)?instagram\.com\/tv\/[A-Za-z0-9_-]+\/?(\?.*)?$/i,
    profile: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?(\?.*)?$/i
};
function safeCaption(text, botUsername, ctx, limit = 1024) {
    const suffix = ctx.i18n.t("caption.suffix", { botUsername });
    const maxLength = limit - suffix.length;
    const trimmed = text?.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text || "";
    return ctx.i18n.t("caption.prefix", { text: trimmed }) + suffix;
}
function extractMediaInfo(message, caption, ctx) {
    if ("photo" in message && message.photo?.length) {
        return { type: ctx.i18n.t("media.photo"), media: message.photo.at(-1).file_id, caption };
    }
    if ("video" in message && message.video) {
        return { type: ctx.i18n.t("media.video"), media: message.video.file_id, caption };
    }
    return { type: "", media: "", caption };
}
const axios_1 = __importDefault(require("axios"));
const grammy_1 = require("grammy");
async function fetchAsInputFile(url, filename) {
    const res = await axios_1.default.get(url, { responseType: "arraybuffer" });
    return new grammy_1.InputFile(Buffer.from(res.data), filename);
}
async function sendMediaInChunks(ctx, url, mediaDetails, caption, botUsername) {
    try {
        const safeText = safeCaption(caption, botUsername, ctx);
        const chunkSize = 10;
        for (let i = 0; i < mediaDetails.length; i += chunkSize) {
            const chunk = await Promise.all(mediaDetails.slice(i, i + chunkSize).map(async (m, idx) => ({
                type: m.type === "image" ? "photo" : "video",
                media: await fetchAsInputFile(m.url, m.type === "image" ? "photo.jpg" : "video.mp4"),
                caption: i === 0 && idx === 0 ? safeText : undefined,
                thumbnail: m.thumbnail,
            })));
            const messageGroup = await ctx.replyWithMediaGroup(chunk);
            await storage_1.StorageService.saveMedia(BigInt(loader_1.STORAGE_CHANNEL_ID), BigInt(messageGroup[0].message_id), url, messageGroup.map(msg => extractMediaInfo(msg, safeText, ctx)));
        }
    }
    catch (err) {
        logger_1.logger.error("sendMediaInChunks error", err);
        await ctx.reply(ctx.i18n.t("instagram.download_error"));
    }
}
async function processInstagram(ctx, type) {
    const processingMsg = await ctx.replyWithSticker("CAACAgEAAxkBAAIJK2ibhK4FtDZAIWXLaaUF7kB5X5U0AAItAgACpyMhRD1AMMntg7S2NgQ", { reply_to_message_id: ctx.message?.message_id });
    try {
        const text = ctx.message?.text?.trim() || "";
        const savedMedia = await storage_1.StorageService.getMediaByUrl(text);
        if (savedMedia?.length) {
            await ctx.replyWithMediaGroup(savedMedia[0].media);
            console.log(ctx.i18n.t("instagram.sent_from_db"));
            return;
        }
        const urlData = await (0, services_1.instagramGetUrl)(text);
        if (!urlData?.results_number) {
            return ctx.reply(ctx.i18n.t("instagram.invalid_url"));
        }
        if (urlData.media_details?.length) {
            await sendMediaInChunks(ctx, text, urlData.media_details, urlData.post_info.caption, loader_1.bot.botInfo.username);
        }
        else {
            await ctx.reply(ctx.i18n.t("instagram.no_media"));
        }
    }
    catch (err) {
        logger_1.logger.error(`Instagram ${type} error (user: ${ctx.from?.id})`, err);
        await ctx.reply(ctx.i18n.t("instagram.error"));
    }
    finally {
        await ctx.api.deleteMessage(ctx.chat.id, processingMsg.message_id);
    }
}
Object.entries(instagramPatterns).forEach(([type, pattern]) => {
    loader_1.bot.hears(pattern, (ctx) => processInstagram(ctx, type));
});
//# sourceMappingURL=instagram.js.map