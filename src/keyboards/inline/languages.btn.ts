import { InlineKeyboard } from "grammy";

export const LanguagesInlineBtn = new InlineKeyboard().row(
    InlineKeyboard.text("🇺🇿 Uzbek", "uz"),
    InlineKeyboard.text("Karaqalpak", "kaa"),
).row(
    InlineKeyboard.text("🇷🇺 Russian", "ru"),
    InlineKeyboard.text("🇺🇸 English", "en"),
);