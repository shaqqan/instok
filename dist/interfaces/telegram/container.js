"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCases = void 0;
const DrizzleUserRepository_1 = require("../../database/repositories/DrizzleUserRepository");
const RegisterOrUpdateUser_1 = require("../../core/application/usecases/RegisterOrUpdateUser");
const SetUserLanguage_1 = require("../../core/application/usecases/SetUserLanguage");
const userRepository = new DrizzleUserRepository_1.DrizzleUserRepository();
exports.useCases = {
    registerOrUpdateUser: new RegisterOrUpdateUser_1.RegisterOrUpdateUserUseCase(userRepository),
    setUserLanguage: new SetUserLanguage_1.SetUserLanguageUseCase(userRepository),
};
//# sourceMappingURL=container.js.map