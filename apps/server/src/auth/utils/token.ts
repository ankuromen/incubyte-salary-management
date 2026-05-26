import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
import { UnauthorizedError } from "../../errors/http-error.js";

export type AccessTokenPayload = {
  adminId: string;
  email: string;
};

export const signAccessToken = (payload: AccessTokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, env.JWT_SECRET, options);
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }
};
