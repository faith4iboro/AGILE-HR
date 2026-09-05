// src/lib/respond.ts
// REPLACES src/lib/api/respond.ts from the Next.js version. Same response
// shape and same "never leak raw errors" guarantee, adapted to Express's
// res.json() instead of NextResponse.json().

import type { Request, Response } from "express";

import { AppError } from "@/lib/errors";
import type { RequestMeta } from "@/types/auth";

export function getRequestMeta(req: Request): RequestMeta {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ipFromHeader = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(",")[0]?.trim();

  return {
    ipAddress: ipFromHeader ?? req.ip ?? null,
    userAgent: req.get("user-agent") ?? null,
  };
}

export function sendSuccess<T>(res: Response, data: T, status = 200): void {
  res.status(status).json({ success: true, data });
}

export function sendError(res: Response, error: unknown): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        fieldErrors: "fieldErrors" in error ? (error as { fieldErrors?: unknown }).fieldErrors : undefined,
      },
    });
    return;
  }

  console.error("Unhandled API error:", error);
  res.status(500).json({
    success: false,
    error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
  });
}