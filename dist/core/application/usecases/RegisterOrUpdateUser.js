"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterOrUpdateUserUseCase = void 0;
class RegisterOrUpdateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        const user = await this.userRepository.upsertUser(input);
        return user;
    }
}
exports.RegisterOrUpdateUserUseCase = RegisterOrUpdateUserUseCase;
//# sourceMappingURL=RegisterOrUpdateUser.js.map