// src/middleware/error-handler.ts
// Express's catch-all error middleware (note the 4-arg signature — that's
// what makes Express recognize this as an error handler). Mounted LAST in
// app.ts. Route handlers call next(error) on failure, or you can just
// try/catch and call sendError directly inside each route (both patterns
// are used in routes/auth.routes.ts below — sendError directly, since
// that's more explicit and matches the Next.js version's structure).

import type { NextFunction, Request, Response } from "express";

import { sendError } from "@/lib/respond";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  sendError(res, err);
}