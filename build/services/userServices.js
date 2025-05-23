"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.validatePassword = validatePassword;
const userModel_1 = __importDefault(require("../models/userModel"));
const lodash_1 = require("lodash");
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.create(input);
            return (0, lodash_1.omit)(user.toJSON(), 'password');
        }
        catch (e) {
        }
    });
}
// Validate password for login
function validatePassword(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, password, }) {
        const user = yield userModel_1.default.findOne({ email });
        if (!user)
            return false;
        const isValid = yield user.comparePassword(password);
        if (!isValid)
            return false;
        return user; // ✅ Return full Mongoose doc, not plain object
    });
}
