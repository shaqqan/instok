import dotenv from "dotenv";
dotenv.config();
function parseNumber(value, fallback) {
    if (!value)
        return fallback;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}
export const config = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    LOG_LEVEL: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug"),
    DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://username:password@localhost:5432/instokbot",
    BOT_TOKEN: process.env.BOT_TOKEN ?? "",
    STORAGE_CHANNEL_ID: parseNumber(process.env.STORAGE_CHANNEL_ID, -1000000000000),
};
//# sourceMappingURL=index.js.map