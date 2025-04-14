"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = signJwt;
exports.verifyJwt = verifyJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
function signJwt(payload, options) {
    const privateKey = config_1.default.get("privateKey");
    return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: "RS256" }));
}
function verifyJwt(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get("privateKey"));
        return decoded;
    }
    catch (e) {
        return null;
    }
}
