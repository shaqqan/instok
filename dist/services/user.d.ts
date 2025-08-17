export declare class UserService {
    static createUser(telegramId: number, username?: string | null, firstName?: string | null, lastName?: string | null): Promise<{
        id: number;
        telegramId: bigint;
        username: string | null;
        firstName: string | null;
        lastName: string | null;
        language: string | null;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        lastActivity: Date | null;
    }[]>;
    static getUserByTelegramId(telegramId: number): Promise<{
        id: number;
        telegramId: bigint;
        username: string | null;
        firstName: string | null;
        lastName: string | null;
        language: string | null;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        lastActivity: Date | null;
    }[]>;
    static setUserLanguage(telegramId: number, language: string): Promise<import("postgres").RowList<never[]>>;
}
//# sourceMappingURL=user.d.ts.map