"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function parseNumber(value, fallback) {
    if (!value)
        return fallback;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}
exports.config = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    LOG_LEVEL: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug"),
    DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://username:password@localhost:5432/instokbot",
    BOT_TOKEN: process.env.BOT_TOKEN ?? "",
    STORAGE_CHANNEL_ID: parseNumber(process.env.STORAGE_CHANNEL_ID, -1000000000000),
};
//# sourceMappingURL=index.js.map