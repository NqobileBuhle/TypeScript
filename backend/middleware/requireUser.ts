import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../Utils/jwt";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace("Bearer ", "") || "";

  const decoded = verifyJwt(accessToken);

  if (!decoded) {
    return res.sendStatus(403);
  }

  res.locals.user = decoded;
  return next();
};

export default requireUser;
