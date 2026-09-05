// src/middleware/require-auth.ts
// REPLACES src/lib/auth/current-user.ts + src/lib/auth/authorize.ts from
// the Next.js version. This is the biggest conceptual change in the whole
// rewrite: Next.js let requirePermission() read the current request
// implicitly via next/headers, from anywhere. Express has no such implicit
// context — auth checks are now MIDDLEWARE, explicitly wired into each
// route, that reads req.cookies and attaches the verified claims onto
// req.authClaims for the route handler to read afterward.
//
// Usage in a route file:
//   router.get("/me", requireAuthenticated, (req, res) => { ... req.authClaims ... });
//   router.get("/audit-logs", requirePermission("audit:read"), (req, res) => { ... });

import type { NextFunction, Request, Response } from "express";

import { verifyAccessToken, type AccessTokenClaims } from "@/lib/auth/jwt";
import { hasPermission, hasRole } from "@/lib/auth/permission-checks";
import { COOKIE_NAMES } from "@/constants/auth-cookies";
import { sendError } from "@/lib/respond";
import { ForbiddenError, UnauthenticatedError } from "@/lib/errors";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      authClaims?: AccessTokenClaims;
    }
  }
}

/** Verifies the access token cookie and attaches claims to req.authClaims. Does NOT reject if missing — use requireAuthenticated for that. */
export async function attachSessionIfPresent(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies?.[COOKIE_NAMES.ACCESS_TOKEN];
  if (token) {
    req.authClaims = (await verifyAccessToken(token)) ?? undefined;
  }
  next();
}

/** Rejects with 401 if there's no valid session. Use on any protected route. */
export async function requireAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies?.[COOKIE_NAMES.ACCESS_TOKEN];
  const claims = token ? await verifyAccessToken(token) : null;

  if (!claims) {
    sendError(res, new UnauthenticatedError());
    return;
  }

  req.authClaims = claims;
  next();
}

/** Middleware FACTORY — call it with a permission string to get a middleware. */
export function requirePermission(permission: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies?.[COOKIE_NAMES.ACCESS_TOKEN];
    const claims = token ? await verifyAccessToken(token) : null;

    if (!claims) {
      sendError(res, new UnauthenticatedError());
      return;
    }
    if (!hasPermission(claims, permission)) {
      sendError(res, new ForbiddenError(`This action requires the "${permission}" permission.`));
      return;
    }

    req.authClaims = claims;
    next();
  };
}

export function requireRole(role: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies?.[COOKIE_NAMES.ACCESS_TOKEN];
    const claims = token ? await verifyAccessToken(token) : null;

    if (!claims) {
      sendError(res, new UnauthenticatedError());
      return;
    }
    if (!hasRole(claims, role)) {
      sendError(res, new ForbiddenError(`This action requires the "${role}" role.`));
      return;
    }

    req.authClaims = claims;
    next();
  };
}