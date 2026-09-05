// src/middleware.ts

import { NextResponse, type NextRequest } from "next/server";

import { verifyAccessToken } from "@/lib/auth/jwt";
import { COOKIE_NAMES } from "@/constants/auth-cookies";
import { isValidCsrfRequest } from "@/lib/auth/csrf";

const PROTECTED_PATH_PREFIXES = [
  "/dashboard",
  "/employees",
  "/departments",
  "/attendance",
  "/leave",
  "/payroll",
  "/recruitment",
  "/performance",
  "/documents",
  "/reports",
  "/settings",
  "/sessions",
];

const AUTH_ONLY_PATHS = new Set(["/login", "/register"]);

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

const CSRF_EXEMPT_PATHS = new Set([
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/auth/verify-email",
]);

const PERMISSION_AWARE_ROUTE_MAP = new Map<string, { anyRole: string[] }>([
  // Example (not active): ["/settings", { anyRole: ["SUPER_ADMIN"] }],
]);

function matchesPrefix(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const claims = accessToken ? await verifyAccessToken(accessToken) : null;

  if (
    pathname.startsWith("/api/") &&
    MUTATING_METHODS.has(request.method) &&
    !CSRF_EXEMPT_PATHS.has(pathname)
  ) {
    const csrfCookie = request.cookies.get(COOKIE_NAMES.CSRF_TOKEN)?.value;
    if (!isValidCsrfRequest(request, csrfCookie)) {
      return NextResponse.json(
        { success: false, error: { code: "CSRF_VALIDATION_FAILED", message: "Invalid or missing CSRF token" } },
        { status: 403 }
      );
    }
  }

  const isProtectedRoute = matchesPrefix(pathname, PROTECTED_PATH_PREFIXES);

  if (isProtectedRoute && !claims) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (AUTH_ONLY_PATHS.has(pathname) && claims) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedRoute && claims) {
    for (const [prefix, rule] of PERMISSION_AWARE_ROUTE_MAP) {
      if (matchesPrefix(pathname, [prefix])) {
        const hasRequiredRole = rule.anyRole.some((role) => claims.roles.includes(role));
        if (!hasRequiredRole) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
    }
  }

  const response = NextResponse.next();
  if (claims) {
    response.headers.set("x-user-id", claims.sub);
    response.headers.set("x-org-id", claims.orgId);
    response.headers.set("x-session-id", claims.sid);
    response.headers.set("x-permissions", claims.permissions.join(","));
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif)$).*)",
  ],
};