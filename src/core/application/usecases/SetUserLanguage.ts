import { UserRepository } from "../../domain/repositories/UserRepository";

export class SetUserLanguageUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: { telegramId: number; language: string }): Promise<void> {
        await this.userRepository.setLanguage(input.telegramId, input.language);
    }
}


