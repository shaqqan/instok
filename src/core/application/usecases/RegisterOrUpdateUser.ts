import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserEntity } from "../../domain/entities/User";

export class RegisterOrUpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: {
        telegramId: number;
        username: string | null;
        firstName: string | null;
        lastName: string | null;
    }): Promise<UserEntity> {
        const user = await this.userRepository.upsertUser(input);
        return user;
    }
}


