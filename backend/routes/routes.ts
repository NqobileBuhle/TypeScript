import { Express } from "express";
import { createUserHandler } from "../controllers/userController";
import validate from "../middleware/validateResource";
import { createUserSchema } from "../schema/userSchema";

function routes(app: Express) {
  app.get("/healthcheck", (_, res) => res.sendStatus(200));
  app.post("/api/users", validate(createUserSchema), createUserHandler);
}

export default routes;
