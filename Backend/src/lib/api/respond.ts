// src/lib/api/respond.ts
// Not in your original list under lib/, but every route handler below
// depends on it — the single chokepoint for the consistent API response
// shape and for never leaking raw errors to the client.

import { NextResponse } from "next/server";

import { AppError } from "@/lib/errors";
import { getClientIp } from "@/lib/rate-limit";
import type { RequestMeta } from "@/types/auth";

export function getRequestMeta(request: Request): RequestMeta {
  return {
    ipAddress: getClientIp(request),
    userAgent: request.headers.get("user-agent"),
  };
}

export function jsonSuccess<T>(data: T, init?: ResponseInit): NextResponse {
  return NextResponse.json({ success: true, data }, init);
}

export function jsonError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          fieldErrors: "fieldErrors" in error ? (error as { fieldErrors?: unknown }).fieldErrors : undefined,
        },
      },
      { status: error.statusCode }
    );
  }

  console.error("Unhandled API error:", error);

  return NextResponse.json(
    { success: false, error: { code: "INTERNAL_ERROR", message: "Something went wrong" } },
    { status: 500 }
  );
}