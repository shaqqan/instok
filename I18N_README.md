# Internationalization (i18n) System

This bot now supports multiple languages through a comprehensive i18n system.

## Supported Languages

- 🇺🇸 **English** (en) - Default language
- 🇺🇿 **O'zbekcha** (uz) - Uzbek language
- 🇷🇺 **Русский** (ru) - Russian language

## Features

### 1. Automatic Language Detection
The bot automatically detects the user's language preference (currently defaults to English).

### 2. Language Selection Command
Users can change their language using the `/lang` command, which shows an inline keyboard with language options.

### 3. Localized Messages
All bot messages are now localized and will appear in the user's selected language.

## Usage

### For Users
1. Send `/lang` to see language options
2. Click on your preferred language
3. The bot will confirm your language selection

### For Developers

#### Adding New Translations
To add new text that needs translation, add it to the `translations` object in `src/i18n/index.ts`:

```typescript
en: {
    "new.key": "English text here",
    // ... other translations
},
uz: {
    "new.key": "O'zbekcha matn bu yerda",
    // ... other translations
},
ru: {
    "new.key": "Русский текст здесь",
    // ... other translations
}
```

#### Using Translations in Code
```typescript
import { I18nContext } from "../../i18n";

// In your handler
async function myHandler(ctx: I18nContext) {
    const message = ctx.i18n.t("message.key");
    await ctx.reply(message);
}

// With parameters
const message = ctx.i18n.t("welcome.message", { username: "John" });
```

#### Translation Keys
Use descriptive keys with dot notation:
- `instagram.processing` - Instagram processing message
- `general.error` - General error message
- `language.select_language` - Language selection prompt

## Implementation Details

### I18nService
- Singleton pattern for efficient memory usage
- Automatic fallback to default language if translation is missing
- Parameter substitution support (e.g., `{username}`)

### Middleware
The i18n middleware is automatically applied to all bot interactions, making translations available in every context.

### Context Extension
The bot context is extended with an `i18n` object that provides:
- `t(key, params)` - Translate a key with optional parameters
- `getLanguage()` - Get current user language
- `setLanguage(lang)` - Set user language (placeholder for future implementation)

## Future Enhancements

1. **Database Integration**: Store user language preferences in the database
2. **Dynamic Language Detection**: Detect language from user's Telegram settings
3. **Admin Commands**: Allow admins to manage translations
4. **Translation Management**: Web interface for managing translations

## File Structure

```
src/
├── i18n/
│   └── index.ts          # Main i18n service and middleware
├── handlers/user/
│   ├── lang.ts           # Language selection handler
│   └── instagram.ts      # Instagram handler with i18n
└── loader.ts             # Bot loader with i18n middleware
```

## Adding New Languages

To add a new language:

1. Add the language code to `SupportedLanguage` type
2. Add translations to the `translations` object
3. Update the language keyboard in `src/keyboards/inline/languages.btn.ts`
4. Update the callback handler regex in `src/handlers/user/lang.ts`

Example for adding French:
```typescript
export type SupportedLanguage = "en" | "uz" | "ru" | "fr";

// In translations object
fr: {
    "instagram.processing": "⏳ Traitement du lien Instagram...",
    // ... other translations
}
```
