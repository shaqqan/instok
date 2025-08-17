import { Context } from "grammy";
export type SupportedLanguage = "en" | "uz" | "ru" | "kaa";
export interface I18nContext extends Context {
    i18n: {
        t: (key: string, params?: Record<string, string | number>) => string;
        getLanguage: () => SupportedLanguage;
        setLanguage: (lang: SupportedLanguage) => void;
    };
}
export declare class I18nService {
    private static instance;
    private translations;
    private defaultLanguage;
    private constructor();
    static getInstance(): I18nService;
    t(lang: SupportedLanguage, key: string, params?: Record<string, string | number>): string;
    getSupportedLanguages(): SupportedLanguage[];
    getDefaultLanguage(): SupportedLanguage;
    setDefaultLanguage(lang: SupportedLanguage): void;
}
export declare function getUserLanguage(ctx: Context): Promise<SupportedLanguage>;
export declare function i18nMiddleware(): (ctx: Context, next: () => Promise<void>) => Promise<void>;
//# sourceMappingURL=index.d.ts.map