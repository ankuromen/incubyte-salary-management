import type { AccessTokenPayload } from "../auth/utils/token.js";

declare global {
  namespace Express {
    interface Request {
      auth?: AccessTokenPayload;
    }
  }
}

export {};
