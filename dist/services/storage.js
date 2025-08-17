import { eq } from "drizzle-orm";
import { db, storage } from "../database";
export class StorageService {
    static async saveMedia(channel_id, channel_message_id, url, media) {
        const savedMedia = await db.insert(storage).values({
            channel_id: channel_id,
            channel_message_id: channel_message_id,
            url: url,
            media: media
        });
        return media;
    }
    static async getMediaByUrl(url) {
        const media = await db.select().from(storage).where(eq(storage.url, url)).limit(1);
        return media;
    }
}
//# sourceMappingURL=storage.js.map