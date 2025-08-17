import { eq, and, isNull } from 'drizzle-orm';
import { db, users, NewUser } from '../database';

export class UserService {
    static async createUser(telegramId: number, username: string | null = null, firstName: string | null = null, lastName: string | null = null) {
        const user = await db.select().from(users).where(eq(users.telegramId, BigInt(telegramId))).limit(1);
        if (user.length > 0) {
            return user;
        }
        const newUser = await db.insert(users).values({
            telegramId: BigInt(telegramId),
            username: username,
            firstName: firstName,
            lastName: lastName,
        });
        return newUser;
    }

    static async getUserByTelegramId(telegramId: number) {
        const user = await db.select().from(users).where(eq(users.telegramId, BigInt(telegramId)));
        return user;
    }
    static async setUserLanguage(telegramId: number, language: string) {
        const user = await db.update(users).set({ language: language }).where(eq(users.telegramId, BigInt(telegramId)));
        return user;
    }
}
