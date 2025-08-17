"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUserLanguageUseCase = void 0;
class SetUserLanguageUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        await this.userRepository.setLanguage(input.telegramId, input.language);
    }
}
exports.SetUserLanguageUseCase = SetUserLanguageUseCase;
//# sourceMappingURL=SetUserLanguage.js.map