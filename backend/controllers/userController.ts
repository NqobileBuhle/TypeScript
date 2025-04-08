// src/controllers/userController.ts
import { Request, Response } from "express";
import { createUser } from "../services/userServices";
import { CreateUserInput } from "../schema/userSchema";
import log from "../Utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(201).send(user);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
