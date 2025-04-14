"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deserializeUser;
const jwt_1 = require("../Utils/jwt");
function deserializeUser(req, res, next) {
    var _a;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(/^Bearer\s/, "");
    if (!accessToken)
        return next();
    const decoded = (0, jwt_1.verifyJwt)(accessToken);
    if (decoded) {
        res.locals.user = decoded;
    }
    return next();
}
