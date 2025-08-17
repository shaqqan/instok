import { bot, STORAGE_CHANNEL_ID } from "../../loader";
import { instagramGetUrl } from "../../services";
import { StorageService } from "../../services/storage";
import { I18nContext } from "../../i18n";
import { logger } from "../../shared/logger";

// Instagram URL patternlari
const instagramPatterns: Record<string, RegExp> = {
    post: /^https?:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+\/?(\?.*)?$/i,
    reel: /^https?:\/\/(www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+\/?(\?.*)?$/i,
    story: /^https?:\/\/(www\.)?instagram\.com\/stories\/[A-Za-z0-9_.]+\/[0-9]+\/?(\?.*)?$/i,
    tv: /^https?:\/\/(www\.)?instagram\.com\/tv\/[A-Za-z0-9_-]+\/?(\?.*)?$/i,
    profile: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?(\?.*)?$/i
};

// Caption xavfsiz kesish
function safeCaption(text: string, botUsername: string, ctx: I18nContext, limit = 1024): string {
    const suffix = ctx.i18n.t("caption.suffix", { botUsername });
    const maxLength = limit - suffix.length;
    const trimmed = text?.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text || "";
    return ctx.i18n.t("caption.prefix", { text: trimmed }) + suffix;
}

// Message dan file_id olish
function extractMediaInfo(message: any, caption: string, ctx: I18nContext) {
    if ("photo" in message && message.photo?.length) {
        return { type: ctx.i18n.t("media.photo"), media: message.photo.at(-1).file_id, caption };
    }
    if ("video" in message && message.video) {
        return { type: ctx.i18n.t("media.video"), media: message.video.file_id, caption };
    }
    return { type: "", media: "", caption };
}

import axios from "axios";
import { InputFile } from "grammy";
import { LikesInlineBtn } from "../../keyboards/inline";

async function fetchAsInputFile(url: string, filename: string) {
    const res = await axios.get(url, { responseType: "arraybuffer" });
    return new InputFile(Buffer.from(res.data), filename);
}

async function sendMediaInChunks(
    ctx: I18nContext,
    url: string,
    mediaDetails: { type: string; url: string; thumbnail?: string }[],
    caption: string,
    botUsername: string
) {
    try {
        const safeText = safeCaption(caption, botUsername, ctx);
        const chunkSize = 10;

        for (let i = 0; i < mediaDetails.length; i += chunkSize) {
            const chunk = await Promise.all(
                mediaDetails.slice(i, i + chunkSize).map(async (m, idx) => ({
                    type: m.type === "image" ? "photo" : "video",
                    media: await fetchAsInputFile(
                        m.url,
                        m.type === "image" ? "photo.jpg" : "video.mp4"
                    ),
                    caption: i === 0 && idx === 0 ? safeText : undefined,
                    thumbnail: m.thumbnail,

                }))
            );

            // Userga yuborish
            const messageGroup = await ctx.replyWithMediaGroup(chunk as any);

            await StorageService.saveMedia(
                BigInt(STORAGE_CHANNEL_ID),
                BigInt(messageGroup[0].message_id),
                url,
                messageGroup.map(msg => extractMediaInfo(msg, safeText, ctx))
            );
        }
    } catch (err) {
        logger.error("sendMediaInChunks error", err);
        await ctx.reply(ctx.i18n.t("instagram.download_error"));
    }
}

// Instagram linkni ishlovchi funksiya
async function processInstagram(ctx: I18nContext, type: string) {
    const processingMsg = await ctx.replyWithSticker(
        "CAACAgEAAxkBAAIJK2ibhK4FtDZAIWXLaaUF7kB5X5U0AAItAgACpyMhRD1AMMntg7S2NgQ",
        { reply_to_message_id: ctx.message?.message_id }
    );

    try {
        const text = ctx.message?.text?.trim() || "";

        // Avval DB tekshirish
        const savedMedia = await StorageService.getMediaByUrl(text);
        if (savedMedia?.length) {
            await ctx.replyWithMediaGroup(savedMedia[0].media as any[]);
            console.log(ctx.i18n.t("instagram.sent_from_db"));
            return;
        }

        // API dan olish
        const urlData = await instagramGetUrl(text);

        if (!urlData?.results_number) {
            return ctx.reply(ctx.i18n.t("instagram.invalid_url"));
        }

        if (urlData.media_details?.length) {
            await sendMediaInChunks(ctx, text, urlData.media_details, urlData.post_info.caption, bot.botInfo.username);
        } else {
            await ctx.reply(ctx.i18n.t("instagram.no_media"));
        }
    } catch (err) {
        logger.error(`Instagram ${type} error (user: ${ctx.from?.id})`, err);
        await ctx.reply(ctx.i18n.t("instagram.error"));
    } finally {
        await ctx.api.deleteMessage(ctx.chat!.id, processingMsg.message_id);
    }
}

// Barcha patternlarni ro'yxatdan o'tkazish
Object.entries(instagramPatterns).forEach(([type, pattern]) => {
    bot.hears(pattern, (ctx) => processInstagram(ctx as I18nContext, type));
});
