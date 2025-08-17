import { eq } from 'drizzle-orm';
import { db, users } from '../database';
export class UserService {
    static async createUser(telegramId, username = null, firstName = null, lastName = null) {
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
    static async getUserByTelegramId(telegramId) {
        const user = await db.select().from(users).where(eq(users.telegramId, BigInt(telegramId)));
        return user;
    }
    static async setUserLanguage(telegramId, language) {
        const user = await db.update(users).set({ language: language }).where(eq(users.telegramId, BigInt(telegramId)));
        return user;
    }
}
//# sourceMappingURL=user.js.map