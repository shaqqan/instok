import { Context } from "grammy";
import { DrizzleUserRepository } from "../database/repositories/DrizzleUserRepository";

export type SupportedLanguage = "en" | "uz" | "ru" | "kaa";

export interface I18nContext extends Context {
    i18n: {
        t: (key: string, params?: Record<string, string | number>) => string;
        getLanguage: () => SupportedLanguage;
        setLanguage: (lang: SupportedLanguage) => void;
    };
}

export class I18nService {
    private static instance: I18nService;
    private translations: Record<SupportedLanguage, Record<string, string>>;
    private defaultLanguage: SupportedLanguage = "en";

    private constructor() {
        this.translations = {
            en: {
                // Instagram messages
                "instagram.processing": "⏳ Processing Instagram link...",
                "instagram.invalid_url": "❌ Invalid Instagram URL or no media found.",
                "instagram.no_media": "⚠️ No media found for this link.",
                "instagram.error": "❌ An error occurred. Please try again later.",
                "instagram.sent_from_db": "📱 Sent from database",
                "instagram.download_error": "❌ Media download error. Please try again later.",

                // General messages
                "general.error": "❌ An error occurred. Please try again later.",
                "general.processing": "⏳ Processing...",

                // Caption suffix
                "caption.suffix": "\n\n📥 Downloaded from @{botUsername}",
                "caption.prefix": "📸 {text}",

                // Media types
                "media.photo": "photo",
                "media.video": "video",

                // Success messages
                "success.downloaded": "✅ Media downloaded successfully!",
                "success.sent": "✅ Media sent successfully!",

                // Language messages
                "language.select_language": "🌐 Please select your preferred language:",
                "language.language_changed": "✅ Language changed to {language}",
                "language.language_selected": "✅ Language set to {language}",
                "language.invalid_language": "❌ Invalid language selection",
                // Start
                "start.welcome": "Hello! Send a video or audio link from TikTok, Likee, YouTube or Instagram, and I'll download it without watermark."
            },
            uz: {
                // Instagram xabarlari
                "instagram.processing": "⏳ Instagram havolasi qayta ishlanmoqda...",
                "instagram.invalid_url": "❌ Instagram havolasi noto'g'ri yoki media mavjud emas.",
                "instagram.no_media": "⚠️ Ushbu havola uchun media topilmadi.",
                "instagram.error": "❌ Xatolik yuz berdi. Keyinroq qayta urinib ko'ring.",
                "instagram.sent_from_db": "📱 Bazadan yuborildi",
                "instagram.download_error": "❌ Media yuklab olishda xatolik. Iltimos, keyinroq urinib ko'ring.",

                // Umumiy xabarlar
                "general.error": "❌ Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.",
                "general.processing": "⏳ Qayta ishlanmoqda...",

                // Caption qo'shimchasi
                "caption.suffix": "\n\n📥 @{botUsername} orqali yuklab olingan",
                "caption.prefix": "📸 {text}",

                // Media turlari
                "media.photo": "photo",
                "media.video": "video",

                // Muvaffaqiyat xabarlari
                "success.downloaded": "✅ Media muvaffaqiyatli yuklab olindi!",
                "success.sent": "✅ Media muvaffaqiyatli yuborildi!",

                // Language messages
                "language.select_language": "🌐 Sizning xavfsiz tilingizni tanlang:",
                "language.language_changed": "✅ Til {language} ga o'zgartirildi",
                "language.language_selected": "✅ Til {language} ga o'rnatildi",
                "language.invalid_language": "❌ Noto'g'ri til tanlash",
                // Start
                "start.welcome": "Salom! TikTok, Likee, YouTube yoki Instagram havolasini yuboring, men uni suv belgisiz yuklab beraman."
            },
            ru: {
                // Сообщения Instagram
                "instagram.processing": "⏳ Обрабатывается ссылка Instagram...",
                "instagram.invalid_url": "❌ Неверная ссылка Instagram или медиа не найдено.",
                "instagram.no_media": "⚠️ Для этой ссылки медиа не найдено.",
                "instagram.error": "❌ Произошла ошибка. Попробуйте позже.",
                "instagram.sent_from_db": "📱 Отправлено из базы данных",
                "instagram.download_error": "❌ Ошибка загрузки медиа. Попробуйте позже.",

                // Общие сообщения
                "general.error": "❌ Произошла ошибка. Попробуйте позже.",
                "general.processing": "⏳ Обрабатывается...",

                // Суффикс подписи
                "caption.suffix": "\n\n📥 Скачано через @{botUsername}",
                "caption.prefix": "📸 {text}",

                // Типы медиа
                "media.photo": "photo",
                "media.video": "video",

                // Сообщения об успехе
                "success.downloaded": "✅ Медиа успешно загружено!",
                "success.sent": "✅ Медиа успешно отправлено!",

                // Language messages
                "language.select_language": "🌐 Пожалуйста, выберите ваш предпочитаемый язык:",
                "language.language_changed": "✅ Язык изменен на {language}",
                "language.language_selected": "✅ Язык установлен на {language}",
                "language.invalid_language": "❌ Неверный выбор языка",
                // Start
                "start.welcome": "Здравствуйте! Отправьте ссылку на видео или аудио из TikTok, Likee, YouTube или Instagram, и я скачаю без водяного знака."
            },
            kaa: {
                // Instagram xabarlari
                "instagram.processing": "⏳ Instagram siltemesi qayta islenbekte...",
                "instagram.invalid_url": "❌ Instagram siltemesi nadurıs yaǵasa media tabılmadı.",
                "instagram.no_media": "⚠️ Bul silteme ushın media tabılmadı.",
                "instagram.error": "❌ Qátelik júz berdi. Keyinirek qayta urınıp kóriń.",
                "instagram.sent_from_db": "📱 Bazadan jiberildi",
                "instagram.download_error": "❌ Medianı júklep alıwda qátelik. Iltimas, keyinirek urınıp kóriń.",

                // Ulıwma xabarlar
                "general.error": "❌ Qátelik júz berdi. Iltimas, keyinirek urınıp kóriń.",
                "general.processing": "⏳ Qayta islenbekte...",

                // Jazıwǵa qosımsha
                "caption.suffix": "\n\n📥 @{botUsername} arqalı júklep alındı",
                "caption.prefix": "📸 {text}",

                // Media túrleri
                "media.photo": "foto",
                "media.video": "video",

                // Tabıslı xabarlar
                "success.downloaded": "✅ Media áwmetli júklep alındı!",
                "success.sent": "✅ Media áwmetli jiberildi!",

                // Til xabarları
                "language.select_language": "🌐 Ózińizge qolaylı tildi saylań:",
                "language.language_changed": "✅ Til {language} tiline ózgertildi",
                "language.language_selected": "✅ Til {language} tiline ornatıldı",
                "language.invalid_language": "❌ Nadurıs til saylandı",

                // Start
                "start.welcome": "Sálem! TikTok, Likee, YouTube yaǵasa Instagram siltemesin jiberiń, men onı suw belgisisiz júklep beremen."
            }
        };
    }

    public static getInstance(): I18nService {
        if (!I18nService.instance) {
            I18nService.instance = new I18nService();
        }
        return I18nService.instance;
    }

    public t(lang: SupportedLanguage, key: string, params?: Record<string, string | number>): string {
        const translation = this.translations[lang]?.[key] || this.translations[this.defaultLanguage][key] || key;

        if (params) {
            return translation.replace(/\{(\w+)\}/g, (match, param) => {
                return params[param]?.toString() || match;
            });
        }

        return translation;
    }

    public getSupportedLanguages(): SupportedLanguage[] {
        return Object.keys(this.translations) as SupportedLanguage[];
    }

    public getDefaultLanguage(): SupportedLanguage {
        return this.defaultLanguage;
    }

    public setDefaultLanguage(lang: SupportedLanguage): void {
        this.defaultLanguage = lang;
    }
}

// Helper function to get user language from context
export async function getUserLanguage(ctx: Context): Promise<SupportedLanguage> {
    const repo = new DrizzleUserRepository();
    const tgId = ctx.from?.id;
    const fallback = (code?: string): SupportedLanguage => {
        const norm = (code ?? "en").slice(0, 2).toLowerCase();
        if (norm === "uz" || norm === "ru" || norm === "en" || norm === "kaa") return norm;
        return "en";
    };
    if (!tgId) return fallback(ctx.from?.language_code);
    try {
        const user = await repo.findByTelegramId(tgId);
        if (user?.language && (user.language === "en" || user.language === "uz" || user.language === "ru" || user.language === "kaa")) {
            return user.language as SupportedLanguage;
        }
        return fallback(ctx.from?.language_code);
    } catch {
        return fallback(ctx.from?.language_code);
    }
}

// Middleware to add i18n to context
export function i18nMiddleware() {
    return async (ctx: Context, next: () => Promise<void>) => {
        const initialLang = await getUserLanguage(ctx);
        const i18n = I18nService.getInstance();
        let currentLang: SupportedLanguage = initialLang;

        (ctx as I18nContext).i18n = {
            t: (key: string, params?: Record<string, string | number>) => i18n.t(currentLang, key, params),
            getLanguage: () => currentLang,
            setLanguage: (lang: SupportedLanguage) => { currentLang = lang; }
        };

        await next();
    };
}
