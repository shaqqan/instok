import { db, users } from "../../database";
import { eq } from "drizzle-orm";
export class DrizzleUserRepository {
    async findByTelegramId(telegramId) {
        const result = await db.select().from(users).where(eq(users.telegramId, BigInt(telegramId))).limit(1);
        return result.length ? result[0] : null;
    }
    async upsertUser(params) {
        const existing = await db.select().from(users).where(eq(users.telegramId, BigInt(params.telegramId))).limit(1);
        if (existing.length) {
            return existing[0];
        }
        const inserted = await db.insert(users).values({
            telegramId: BigInt(params.telegramId),
            username: params.username,
            firstName: params.firstName,
            lastName: params.lastName,
        }).returning();
        return inserted[0];
    }
    async setLanguage(telegramId, language) {
        await db.update(users).set({ language }).where(eq(users.telegramId, BigInt(telegramId)));
    }
}
//# sourceMappingURL=DrizzleUserRepository.js.map