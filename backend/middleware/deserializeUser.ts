// middleware/deserializeUser.ts
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../Utils/jwt";
import {get}from 'lodash';

export default function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const accessToken =get( req,"headers.authorization","").replace(/^Bearer\s/, "");
  if (!accessToken) return next();

  const {decoded,expired} = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    
 
}
return next();
}

