import jwt from "jsonwebtoken";
import config from "config";
import * as fs from 'fs';
import * as path from 'path';

const privateKey = fs.readFileSync(path.join(__dirname, '../../backend/private.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../../backend/public.key'), 'utf8');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
