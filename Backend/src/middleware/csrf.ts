// src/middleware/csrf.ts
// Global Express middleware — replaces the CSRF-checking block that lived
// inside Next.js's middleware.ts. Applied once in app.ts, before routes.

import type { NextFunction, Request, Response } from "express";

import { COOKIE_NAMES } from "@/constants/auth-cookies";
import { isValidCsrfRequest } from "@/lib/auth/csrf";
import { sendError } from "@/lib/respond";
import { AppError } from "@/lib/errors";

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

// Endpoints that legitimately run BEFORE a session/CSRF cookie exists —
// each protected by its own mechanism instead (rate limiting, account
// lockout, or the single-use emailed/URL token itself).
const CSRF_EXEMPT_PATHS = new Set([
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/auth/verify-email",
]);

class CsrfValidationError extends AppError {
  constructor() {
    super("Invalid or missing CSRF token", 403, "CSRF_VALIDATION_FAILED");
  }
}

export function csrfProtection(req: Request, res: Response, next: NextFunction): void {
  if (!MUTATING_METHODS.has(req.method) || CSRF_EXEMPT_PATHS.has(req.path)) {
    next();
    return;
  }

  const csrfCookie = req.cookies?.[COOKIE_NAMES.CSRF_TOKEN];
  if (!isValidCsrfRequest(req, csrfCookie)) {
    sendError(res, new CsrfValidationError());
    return;
  }

  next();
}