import { UserRepository } from "../../core/domain/repositories/UserRepository";
import { UserEntity } from "../../core/domain/entities/User";
export declare class DrizzleUserRepository implements UserRepository {
    findByTelegramId(telegramId: number): Promise<UserEntity | null>;
    upsertUser(params: {
        telegramId: number;
        username: string | null;
        firstName: string | null;
        lastName: string | null;
    }): Promise<UserEntity>;
    setLanguage(telegramId: number, language: string): Promise<void>;
}
//# sourceMappingURL=DrizzleUserRepository.d.ts.map