import jwt from "jsonwebtoken";
import config from "config";


const privateKey = config.get<string>("privateKey");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, config.get<string>("privateKey"), {
    ...(options && options),
    algorithm: "HS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, config.get<string>("privateKey"));
    return decoded;
  } catch (e) {
    return null;
  }
}
