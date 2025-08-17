"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = require("../database");
class StorageService {
    static async saveMedia(channel_id, channel_message_id, url, media) {
        const savedMedia = await database_1.db.insert(database_1.storage).values({
            channel_id: channel_id,
            channel_message_id: channel_message_id,
            url: url,
            media: media
        });
        return media;
    }
    static async getMediaByUrl(url) {
        const media = await database_1.db.select().from(database_1.storage).where((0, drizzle_orm_1.eq)(database_1.storage.url, url)).limit(1);
        return media;
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=storage.js.map