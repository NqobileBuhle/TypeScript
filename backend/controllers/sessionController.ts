import { Request, Response } from "express";
import { validatePassword } from "../services/userServices";
import { createSession, findSessions, updateSession } from "../services/sessionService";
import {signJwt,verifyJwt} from "../Utils/jwt";
import config from "config";
import jwt from "jsonwebtoken";


export async function createSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  const session = await createSession(user._id, req.get("user-agent") || "");
  return res.status(200).send({
    user,
    session,
  });

  const accessToken = signJwt(
    { ...user.toJSON(), session: session._id },
    { expiresIn: config.get<number>("accessTokenTtl")}
  );

  const refreshToken = verifyJwt(
   { ...user.toJSON(), session: session._id },
    { expiresIn: config.get<number>("refreshTokenTtl")}
  );

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  await updateSession(sessionId, { valid: false });
  return res.send({ accessToken: null, refreshToken: null });
}
