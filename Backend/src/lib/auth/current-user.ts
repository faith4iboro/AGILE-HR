// src/lib/auth/current-user.ts

import "server-only";

import { cookies } from "next/headers";

import { verifyAccessToken, type AccessTokenClaims } from "@/lib/auth/jwt";
import { COOKIE_NAMES } from "@/constants/auth-cookies";

export async function getSessionClaims(): Promise<AccessTokenClaims | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}