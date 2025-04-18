import { Express } from "express";
import { createUserHandler } from "../controllers/userController";
import validate from "../middleware/validateResource";
import { createUserSchema } from "../schema/userSchema";
import {
  createSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "../controllers/sessionController";
import requireUser from "../middleware/requireUser";
import { createSessionSchema } from "../schema/sessionSchema";
import { createProductHandler,
        getProductsHandler,
        getProductHandler,
        updateProductHandler,
        deleteProductHandler,
} from "../controllers/productController";


function routes(app: Express) {
  app.get("/healthcheck", (_, res) => res.sendStatus(200));
  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.post("/api/sessions",validate(createSessionSchema), createSessionHandler);
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);
  app.post("/api/products", requireUser, createProductHandler);
  app.get("/api/products", getProductsHandler);
  app.get("/api/products/:productId", getProductHandler);
  app.put("/api/products/:productId", requireUser, updateProductHandler);
  app.delete("/api/products/:productId", requireUser, deleteProductHandler);
}

export default routes;
