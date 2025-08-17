import { UserRepository } from "../../core/domain/repositories/UserRepository";
import { UserEntity } from "../../core/domain/entities/User";
import { db, users } from "../../database";
import { eq } from "drizzle-orm";

export class DrizzleUserRepository implements UserRepository {
    async findByTelegramId(telegramId: number): Promise<UserEntity | null> {
        const result = await db.select().from(users).where(eq(users.telegramId, BigInt(telegramId))).limit(1);
        return result.length ? (result[0] as unknown as UserEntity) : null;
    }

    async upsertUser(params: { telegramId: number; username: string | null; firstName: string | null; lastName: string | null; }): Promise<UserEntity> {
        const existing = await db.select().from(users).where(eq(users.telegramId, BigInt(params.telegramId))).limit(1);
        if (existing.length) {
            return existing[0] as unknown as UserEntity;
        }
        const inserted = await db.insert(users).values({
            telegramId: BigInt(params.telegramId),
            username: params.username,
            firstName: params.firstName,
            lastName: params.lastName,
        }).returning();
        return inserted[0] as unknown as UserEntity;
    }

    async setLanguage(telegramId: number, language: string): Promise<void> {
        await db.update(users).set({ language }).where(eq(users.telegramId, BigInt(telegramId)));
    }
}


