export class RegisterOrUpdateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        const user = await this.userRepository.upsertUser(input);
        return user;
    }
}
//# sourceMappingURL=RegisterOrUpdateUser.js.map