// src/app/api/auth/refresh/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { sessionService } from "@/services/session.service";
import { getRequestMeta, jsonError, jsonSuccess } from "@/lib/api/respond";
import { COOKIE_NAMES, setAccessTokenCookie, setRefreshTokenCookie, setCsrfCookie } from "@/lib/auth/cookies";

export async function POST(request: Request) {
  try {
    const meta = getRequestMeta(request);
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

    const { user, tokens } = await sessionService.refresh(refreshToken, meta);

    const response = jsonSuccess({ user }) as NextResponse;
    setAccessTokenCookie(response, tokens.accessToken);
    setRefreshTokenCookie(response, tokens.refreshToken);
    setCsrfCookie(response, tokens.csrfToken);
    return response;
  } catch (error) {
    return jsonError(error);
  }
}