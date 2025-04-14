"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../Utils/jwt");
const requireUser = (req, res, next) => {
    var _a;
    const accessToken = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) || "";
    const decoded = (0, jwt_1.verifyJwt)(accessToken);
    if (!decoded) {
        return res.sendStatus(403);
    }
    res.locals.user = decoded;
    return next();
};
exports.default = requireUser;
