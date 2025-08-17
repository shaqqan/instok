import { UserRepository } from "../../domain/repositories/UserRepository";
export declare class SetUserLanguageUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(input: {
        telegramId: number;
        language: string;
    }): Promise<void>;
}
//# sourceMappingURL=SetUserLanguage.d.ts.map