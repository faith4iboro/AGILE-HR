// src/app/api/auth/register/route.ts

import type { NextResponse } from "next/server";

import { registerSchema } from "@/lib/validations/auth";
import { authService } from "@/services/auth.service";
import { registerRateLimiter } from "@/lib/rate-limit";
import { getRequestMeta, jsonError, jsonSuccess } from "@/lib/api/respond";
import { setAccessTokenCookie, setRefreshTokenCookie, setCsrfCookie } from "@/lib/auth/cookies";
import { ValidationError, TooManyRequestsError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const meta = getRequestMeta(request);

    const { allowed } = await registerRateLimiter.check(meta.ipAddress ?? "unknown");
    if (!allowed) throw new TooManyRequestsError();

    const body = await request.json().catch(() => null);
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError("Please check the highlighted fields", parsed.error.flatten().fieldErrors);
    }

    const { user, tokens } = await authService.register(parsed.data, meta);

    const response = jsonSuccess({ user }, { status: 201 }) as NextResponse;
    setAccessTokenCookie(response, tokens.accessToken);
    setRefreshTokenCookie(response, tokens.refreshToken);
    setCsrfCookie(response, tokens.csrfToken);
    return response;
  } catch (error) {
    return jsonError(error);
  }
}