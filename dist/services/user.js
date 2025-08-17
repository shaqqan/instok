"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = require("../database");
class UserService {
    static async createUser(telegramId, username = null, firstName = null, lastName = null) {
        const user = await database_1.db.select().from(database_1.users).where((0, drizzle_orm_1.eq)(database_1.users.telegramId, BigInt(telegramId))).limit(1);
        if (user.length > 0) {
            return user;
        }
        const newUser = await database_1.db.insert(database_1.users).values({
            telegramId: BigInt(telegramId),
            username: username,
            firstName: firstName,
            lastName: lastName,
        });
        return newUser;
    }
    static async getUserByTelegramId(telegramId) {
        const user = await database_1.db.select().from(database_1.users).where((0, drizzle_orm_1.eq)(database_1.users.telegramId, BigInt(telegramId)));
        return user;
    }
    static async setUserLanguage(telegramId, language) {
        const user = await database_1.db.update(database_1.users).set({ language: language }).where((0, drizzle_orm_1.eq)(database_1.users.telegramId, BigInt(telegramId)));
        return user;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.js.map