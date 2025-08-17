export interface UserEntity {
    id?: number;
    telegramId: bigint;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    language?: string | null;
    isActive?: boolean | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    lastActivity?: Date | null;
}


