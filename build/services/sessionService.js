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
exports.createSession = createSession;
exports.findSessions = findSessions;
exports.updateSession = updateSession;
const sessionModel_1 = __importDefault(require("../models/sessionModel"));
function createSession(userId, userAgent) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield sessionModel_1.default.create({ user: userId, userAgent });
        return session.toJSON();
    });
}
function findSessions(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return sessionModel_1.default.find(query).lean();
    });
}
function updateSession(sessionId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        return sessionModel_1.default.updateOne({ _id: sessionId }, update);
    });
}
