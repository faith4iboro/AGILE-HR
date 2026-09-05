// src/app/api/auth/logout/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { sessionService } from "@/services/session.service";
import { getRequestMeta, jsonError, jsonSuccess } from "@/lib/api/respond";
import { COOKIE_NAMES, clearAuthCookies } from "@/lib/auth/cookies";

export async function POST(request: Request) {
  try {
    const meta = getRequestMeta(request);
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

    await sessionService.logout(refreshToken, meta);

    const response = jsonSuccess({ loggedOut: true }) as NextResponse;
    clearAuthCookies(response);
    return response;
  } catch (error) {
    return jsonError(error);
  }
}