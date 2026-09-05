// src/lib/auth/csrf.ts
// MODIFIED: isValidCsrfRequest now takes an Express Request (plain header
// object with .get() via Express's own helper) instead of a Fetch API
// Request. generateCsrfToken is unchanged.

import type { Request } from "express";

import { generateSecureToken } from "@/lib/auth/tokens";
import { CSRF_HEADER_NAME } from "@/constants/auth-cookies";

export { CSRF_HEADER_NAME };

export function generateCsrfToken(): string {
  return generateSecureToken(24);
}

export function isValidCsrfRequest(req: Request, csrfCookieValue: string | undefined): boolean {
  if (!csrfCookieValue) return false;
  const headerValue = req.get(CSRF_HEADER_NAME);
  return Boolean(headerValue) && headerValue === csrfCookieValue;
}