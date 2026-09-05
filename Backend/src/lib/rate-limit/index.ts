// src/lib/rate-limit/index.ts
// UNCHANGED except getClientIp: now reads Express's plain header object
// instead of the Fetch API's Headers class (which has .get()). Everything
// else — the RateLimiter interface, InMemoryRateLimiter, all 4 exported
// limiters — is identical to the Next.js version.

import { env } from "@/lib/env";

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export interface RateLimiter {
  check(key: string): Promise<RateLimitResult>;
}

class InMemoryRateLimiter implements RateLimiter {
  private buckets = new Map<string, RateLimitBucket>();

  constructor(
    private readonly max: number,
    private readonly windowSeconds: number
  ) {}

  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const windowMs = this.windowSeconds * 1000;
    const bucket = this.buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      this.buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: this.max - 1, resetAt: now + windowMs };
    }

    if (bucket.count >= this.max) {
      return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
    }

    bucket.count += 1;
    return { allowed: true, remaining: this.max - bucket.count, resetAt: bucket.resetAt };
  }
}

export const loginRateLimiter: RateLimiter = new InMemoryRateLimiter(
  env.RATE_LIMIT_LOGIN_MAX,
  env.RATE_LIMIT_LOGIN_WINDOW_SECONDS
);

export const registerRateLimiter: RateLimiter = new InMemoryRateLimiter(
  env.RATE_LIMIT_REGISTER_MAX,
  env.RATE_LIMIT_REGISTER_WINDOW_SECONDS
);

export const forgotPasswordRateLimiter: RateLimiter = new InMemoryRateLimiter(
  env.RATE_LIMIT_FORGOT_PASSWORD_MAX,
  env.RATE_LIMIT_FORGOT_PASSWORD_WINDOW_SECONDS
);

export const resendVerificationRateLimiter: RateLimiter = new InMemoryRateLimiter(
  env.RATE_LIMIT_RESEND_VERIFICATION_MAX,
  env.RATE_LIMIT_RESEND_VERIFICATION_WINDOW_SECONDS
);

/** Express-style header lookup (plain object), not the Fetch API's Headers class. */
export function getClientIp(headers: Record<string, string | string[] | undefined>): string {
  const forwardedFor = headers["x-forwarded-for"];
  if (forwardedFor) {
    return (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor).split(",")[0]!.trim();
  }
  const realIp = headers["x-real-ip"];
  if (realIp) return Array.isArray(realIp) ? realIp[0]! : realIp;
  return "unknown";
}