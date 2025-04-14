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
exports.createSessionHandler = createSessionHandler;
exports.getUserSessionsHandler = getUserSessionsHandler;
exports.deleteSessionHandler = deleteSessionHandler;
const userServices_1 = require("../services/userServices");
const sessionService_1 = require("../services/sessionService");
const jwt_1 = require("../Utils/jwt");
const config_1 = __importDefault(require("config"));
function createSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, userServices_1.validatePassword)(req.body);
        if (!user) {
            return res.status(401).send("Invalid credentials");
        }
        const session = yield (0, sessionService_1.createSession)(user._id.toString(), req.get("user-agent") || "");
        const accessToken = (0, jwt_1.signJwt)(Object.assign(Object.assign({}, user.toJSON()), { session: session._id }), { expiresIn: config_1.default.get("accessTokenTtl") });
        const refreshToken = (0, jwt_1.signJwt)(Object.assign(Object.assign({}, user.toJSON()), { session: session._id }), { expiresIn: config_1.default.get("refreshTokenTtl") });
        return res.send({ accessToken, refreshToken });
    });
}
function getUserSessionsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const sessions = yield (0, sessionService_1.findSessions)({ user: userId, valid: true });
        return res.send(sessions);
    });
}
function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.session;
        yield (0, sessionService_1.updateSession)(sessionId, { valid: false });
        return res.send({ accessToken: null, refreshToken: null });
    });
}
