import jwt from "jsonwebtoken";
import config from "config";




export function signJwt(payload: Object, options?: jwt.SignOptions) {
  const privateKey = config.get<string>("privateKey");
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256"
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
