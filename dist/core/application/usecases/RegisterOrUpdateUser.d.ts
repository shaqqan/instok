import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserEntity } from "../../domain/entities/User";
export declare class RegisterOrUpdateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(input: {
        telegramId: number;
        username: string | null;
        firstName: string | null;
        lastName: string | null;
    }): Promise<UserEntity>;
}
//# sourceMappingURL=RegisterOrUpdateUser.d.ts.map