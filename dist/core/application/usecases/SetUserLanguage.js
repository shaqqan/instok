export class SetUserLanguageUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        await this.userRepository.setLanguage(input.telegramId, input.language);
    }
}
//# sourceMappingURL=SetUserLanguage.js.map