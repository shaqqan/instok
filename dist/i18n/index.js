"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nService = void 0;
exports.getUserLanguage = getUserLanguage;
exports.i18nMiddleware = i18nMiddleware;
const DrizzleUserRepository_1 = require("../database/repositories/DrizzleUserRepository");
class I18nService {
    static instance;
    translations;
    defaultLanguage = "en";
    constructor() {
        this.translations = {
            en: {
                "instagram.processing": "⏳ Processing Instagram link...",
                "instagram.invalid_url": "❌ Invalid Instagram URL or no media found.",
                "instagram.no_media": "⚠️ No media found for this link.",
                "instagram.error": "❌ An error occurred. Please try again later.",
                "instagram.sent_from_db": "📱 Sent from database",
                "instagram.download_error": "❌ Media download error. Please try again later.",
                "general.error": "❌ An error occurred. Please try again later.",
                "general.processing": "⏳ Processing...",
                "caption.suffix": "\n\n📥 Downloaded from @{botUsername}",
                "caption.prefix": "📸 {text}",
                "media.photo": "photo",
                "media.video": "video",
                "success.downloaded": "✅ Media downloaded successfully!",
                "success.sent": "✅ Media sent successfully!",
                "language.select_language": "🌐 Please select your preferred language:",
                "language.language_changed": "✅ Language changed to {language}",
                "language.language_selected": "✅ Language set to {language}",
                "language.invalid_language": "❌ Invalid language selection",
                "start.welcome": "Hello! Send a video or audio link from TikTok, Likee, YouTube or Instagram, and I'll download it without watermark."
            },
            uz: {
                "instagram.processing": "⏳ Instagram havolasi qayta ishlanmoqda...",
                "instagram.invalid_url": "❌ Instagram havolasi noto'g'ri yoki media mavjud emas.",
                "instagram.no_media": "⚠️ Ushbu havola uchun media topilmadi.",
                "instagram.error": "❌ Xatolik yuz berdi. Keyinroq qayta urinib ko'ring.",
                "instagram.sent_from_db": "📱 Bazadan yuborildi",
                "instagram.download_error": "❌ Media yuklab olishda xatolik. Iltimos, keyinroq urinib ko'ring.",
                "general.error": "❌ Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.",
                "general.processing": "⏳ Qayta ishlanmoqda...",
                "caption.suffix": "\n\n📥 @{botUsername} orqali yuklab olingan",
                "caption.prefix": "📸 {text}",
                "media.photo": "photo",
                "media.video": "video",
                "success.downloaded": "✅ Media muvaffaqiyatli yuklab olindi!",
                "success.sent": "✅ Media muvaffaqiyatli yuborildi!",
                "language.select_language": "🌐 Sizning xavfsiz tilingizni tanlang:",
                "language.language_changed": "✅ Til {language} ga o'zgartirildi",
                "language.language_selected": "✅ Til {language} ga o'rnatildi",
                "language.invalid_language": "❌ Noto'g'ri til tanlash",
                "start.welcome": "Salom! TikTok, Likee, YouTube yoki Instagram havolasini yuboring, men uni suv belgisiz yuklab beraman."
            },
            ru: {
                "instagram.processing": "⏳ Обрабатывается ссылка Instagram...",
                "instagram.invalid_url": "❌ Неверная ссылка Instagram или медиа не найдено.",
                "instagram.no_media": "⚠️ Для этой ссылки медиа не найдено.",
                "instagram.error": "❌ Произошла ошибка. Попробуйте позже.",
                "instagram.sent_from_db": "📱 Отправлено из базы данных",
                "instagram.download_error": "❌ Ошибка загрузки медиа. Попробуйте позже.",
                "general.error": "❌ Произошла ошибка. Попробуйте позже.",
                "general.processing": "⏳ Обрабатывается...",
                "caption.suffix": "\n\n📥 Скачано через @{botUsername}",
                "caption.prefix": "📸 {text}",
                "media.photo": "photo",
                "media.video": "video",
                "success.downloaded": "✅ Медиа успешно загружено!",
                "success.sent": "✅ Медиа успешно отправлено!",
                "language.select_language": "🌐 Пожалуйста, выберите ваш предпочитаемый язык:",
                "language.language_changed": "✅ Язык изменен на {language}",
                "language.language_selected": "✅ Язык установлен на {language}",
                "language.invalid_language": "❌ Неверный выбор языка",
                "start.welcome": "Здравствуйте! Отправьте ссылку на видео или аудио из TikTok, Likee, YouTube или Instagram, и я скачаю без водяного знака."
            },
            kaa: {
                "instagram.processing": "⏳ Instagram siltemesi qayta islenbekte...",
                "instagram.invalid_url": "❌ Instagram siltemesi nadurıs yaǵasa media tabılmadı.",
                "instagram.no_media": "⚠️ Bul silteme ushın media tabılmadı.",
                "instagram.error": "❌ Qátelik júz berdi. Keyinirek qayta urınıp kóriń.",
                "instagram.sent_from_db": "📱 Bazadan jiberildi",
                "instagram.download_error": "❌ Medianı júklep alıwda qátelik. Iltimas, keyinirek urınıp kóriń.",
                "general.error": "❌ Qátelik júz berdi. Iltimas, keyinirek urınıp kóriń.",
                "general.processing": "⏳ Qayta islenbekte...",
                "caption.suffix": "\n\n📥 @{botUsername} arqalı júklep alındı",
                "caption.prefix": "📸 {text}",
                "media.photo": "foto",
                "media.video": "video",
                "success.downloaded": "✅ Media áwmetli júklep alındı!",
                "success.sent": "✅ Media áwmetli jiberildi!",
                "language.select_language": "🌐 Ózińizge qolaylı tildi saylań:",
                "language.language_changed": "✅ Til {language} tiline ózgertildi",
                "language.language_selected": "✅ Til {language} tiline ornatıldı",
                "language.invalid_language": "❌ Nadurıs til saylandı",
                "start.welcome": "Sálem! TikTok, Likee, YouTube yaǵasa Instagram siltemesin jiberiń, men onı suw belgisisiz júklep beremen."
            }
        };
    }
    static getInstance() {
        if (!I18nService.instance) {
            I18nService.instance = new I18nService();
        }
        return I18nService.instance;
    }
    t(lang, key, params) {
        const translation = this.translations[lang]?.[key] || this.translations[this.defaultLanguage][key] || key;
        if (params) {
            return translation.replace(/\{(\w+)\}/g, (match, param) => {
                return params[param]?.toString() || match;
            });
        }
        return translation;
    }
    getSupportedLanguages() {
        return Object.keys(this.translations);
    }
    getDefaultLanguage() {
        return this.defaultLanguage;
    }
    setDefaultLanguage(lang) {
        this.defaultLanguage = lang;
    }
}
exports.I18nService = I18nService;
async function getUserLanguage(ctx) {
    const repo = new DrizzleUserRepository_1.DrizzleUserRepository();
    const tgId = ctx.from?.id;
    const fallback = (code) => {
        const norm = (code ?? "en").slice(0, 2).toLowerCase();
        if (norm === "uz" || norm === "ru" || norm === "en" || norm === "kaa")
            return norm;
        return "en";
    };
    if (!tgId)
        return fallback(ctx.from?.language_code);
    try {
        const user = await repo.findByTelegramId(tgId);
        if (user?.language && (user.language === "en" || user.language === "uz" || user.language === "ru" || user.language === "kaa")) {
            return user.language;
        }
        return fallback(ctx.from?.language_code);
    }
    catch {
        return fallback(ctx.from?.language_code);
    }
}
function i18nMiddleware() {
    return async (ctx, next) => {
        const initialLang = await getUserLanguage(ctx);
        const i18n = I18nService.getInstance();
        let currentLang = initialLang;
        ctx.i18n = {
            t: (key, params) => i18n.t(currentLang, key, params),
            getLanguage: () => currentLang,
            setLanguage: (lang) => { currentLang = lang; }
        };
        await next();
    };
}
//# sourceMappingURL=index.js.map