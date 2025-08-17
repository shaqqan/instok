import { UserEntity } from "../entities/User";
export interface UserRepository {
    findByTelegramId(telegramId: number): Promise<UserEntity | null>;
    upsertUser(params: {
        telegramId: number;
        username: string | null;
        firstName: string | null;
        lastName: string | null;
    }): Promise<UserEntity>;
    setLanguage(telegramId: number, language: string): Promise<void>;
}
//# sourceMappingURL=UserRepository.d.ts.map