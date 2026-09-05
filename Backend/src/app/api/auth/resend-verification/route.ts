// src/app/api/auth/resend-verification/route.ts

import { getSessionClaims } from "@/lib/auth/current-user";
import { emailVerificationService } from "@/services/email-verification.service";
import { resendVerificationRateLimiter } from "@/lib/rate-limit";
import { getRequestMeta, jsonError, jsonSuccess } from "@/lib/api/respond";
import { UnauthenticatedError, TooManyRequestsError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const meta = getRequestMeta(request);

    const claims = await getSessionClaims();
    if (!claims) throw new UnauthenticatedError();

    const { allowed } = await resendVerificationRateLimiter.check(claims.sub);
    if (!allowed) throw new TooManyRequestsError();

    await emailVerificationService.resendVerification(claims.sub, meta);

    return jsonSuccess({ message: "Verification email sent." });
  } catch (error) {
    return jsonError(error);
  }
}