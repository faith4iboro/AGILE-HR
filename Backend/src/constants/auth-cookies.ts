// src/constants/auth-cookies.ts
// Not in your original list, but cookies.ts / csrf.ts / middleware.ts all
// depend on it — dependency-free so it's also safe from client components.

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "aurahr_access_token",
  REFRESH_TOKEN: "aurahr_refresh_token",
  CSRF_TOKEN: "aurahr_csrf_token",
} as const;

export const CSRF_HEADER_NAME = "x-csrf-token";