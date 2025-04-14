"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const userSchema_1 = require("../schema/userSchema");
const sessionController_1 = require("../controllers/sessionController");
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
function routes(app) {
    app.get("/healthcheck", (_, res) => res.sendStatus(200));
    app.post("/api/users", (0, validateResource_1.default)(userSchema_1.createUserSchema), userController_1.createUserHandler);
    app.post("/api/sessions", sessionController_1.createSessionHandler);
    app.get("/api/sessions", requireUser_1.default, sessionController_1.getUserSessionsHandler);
    app.delete("/api/sessions", requireUser_1.default, sessionController_1.deleteSessionHandler);
}
exports.default = routes;
