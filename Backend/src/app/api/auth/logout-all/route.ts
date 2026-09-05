// src/app/api/auth/logout-all/route.ts

import { NextResponse } from "next/server";

import { requireAuthenticated } from "@/lib/auth/authorize";
import { sessionService } from "@/services/session.service";
import { getRequestMeta, jsonError, jsonSuccess } from "@/lib/api/respond";
import { clearAuthCookies } from "@/lib/auth/cookies";

export async function POST(request: Request) {
  try {
    const meta = getRequestMeta(request);
    const claims = await requireAuthenticated();

    await sessionService.logoutAll(claims.sub, meta);

    const response = jsonSuccess({ loggedOutAllDevices: true }) as NextResponse;
    clearAuthCookies(response);
    return response;
  } catch (error) {
    return jsonError(error);
  }
}