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
exports.createUserHandler = createUserHandler;
const userServices_1 = require("../services/userServices");
const logger_1 = __importDefault(require("../Utils/logger"));
const lodash_1 = require("lodash");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Call the createUser function from the service and get the user
            const user = yield (0, userServices_1.createUser)(req.body);
            // Ensure the user object is valid before sending it in the response
            if (!user) {
                logger_1.default.error("User creation failed, user object is undefined.");
                return res.status(500).send("User creation failed.");
            }
            // Return the user without the password field
            return res.status(201).send((0, lodash_1.omit)(user, "password"));
        }
        catch (e) {
            // Log the error for debugging purposes
            logger_1.default.error("Error during user creation:", e);
            // Return an error response
            return res.status(409).send(e.message || "Error creating user");
        }
    });
}
