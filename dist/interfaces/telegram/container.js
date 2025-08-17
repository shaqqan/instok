import { DrizzleUserRepository } from "../../infrastructure/repositories/DrizzleUserRepository";
import { RegisterOrUpdateUserUseCase } from "../../core/application/usecases/RegisterOrUpdateUser";
import { SetUserLanguageUseCase } from "../../core/application/usecases/SetUserLanguage";
const userRepository = new DrizzleUserRepository();
export const useCases = {
    registerOrUpdateUser: new RegisterOrUpdateUserUseCase(userRepository),
    setUserLanguage: new SetUserLanguageUseCase(userRepository),
};
//# sourceMappingURL=container.js.map