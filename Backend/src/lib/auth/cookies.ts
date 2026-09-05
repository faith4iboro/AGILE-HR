// src/lib/auth/cookies.ts
// REWRITTEN for Express: uses res.cookie()/res.clearCookie() instead of
// NextResponse.cookies. Reads CROSS_SITE_COOKIES/COOKIE_DOMAIN from env
// (new in this backend) to decide SameSite/Secure/Domain — see this
// message's closing note on cross-origin cookies before deploying.

import type { Response } from "express";

import { env } from "@/lib/env";
import { COOKIE_NAMES } from "@/constants/auth-cookies";

export { COOKIE_NAMES };

const isProduction = env.NODE_ENV === "production";

// SameSite=None REQUIRES Secure=true (browsers enforce this) and requires
// HTTPS even in local testing — see the closing note in this message.
const sameSite = env.CROSS_SITE_COOKIES ? ("none" as const) : ("lax" as const);
const secure = env.CROSS_SITE_COOKIES ? true : isProduction;

const baseCookieOptions = {
  httpOnly: true,
  secure,
  sameSite,
  path: "/",
  ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
};

export function setAccessTokenCookie(res: Response, token: string): void {
  res.cookie(COOKIE_NAMES.ACCESS_TOKEN, token, {
    ...baseCookieOptions,
    maxAge: env.JWT_ACCESS_EXPIRES_IN_SECONDS * 1000,
  });
}

export function setRefreshTokenCookie(res: Response, token: string): void {
  res.cookie(COOKIE_NAMES.REFRESH_TOKEN, token, {
    ...baseCookieOptions,
    maxAge: env.JWT_REFRESH_EXPIRES_IN_SECONDS * 1000,
  });
}

export function setCsrfCookie(res: Response, token: string): void {
  res.cookie(COOKIE_NAMES.CSRF_TOKEN, token, {
    httpOnly: false, // deliberately readable by frontend JS — double-submit pattern
    secure,
    sameSite,
    path: "/",
    ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
    maxAge: env.JWT_REFRESH_EXPIRES_IN_SECONDS * 1000,
  });
}

export function clearAuthCookies(res: Response): void {
  const clearOptions = { ...baseCookieOptions, maxAge: 0 };
  res.cookie(COOKIE_NAMES.ACCESS_TOKEN, "", clearOptions);
  res.cookie(COOKIE_NAMES.REFRESH_TOKEN, "", clearOptions);
  res.cookie(COOKIE_NAMES.CSRF_TOKEN, "", { ...clearOptions, httpOnly: false });
}