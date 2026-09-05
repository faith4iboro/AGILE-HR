// src/app/api/auth/forgot-password/route.ts

import { forgotPasswordSchema } from "@/lib/validations/auth";
import { passwordResetService } from "@/services/password-reset.service";
import { forgotPasswordRateLimiter } from "@/lib/rate-limit";
import { getRequestMeta, jsonError, jsonSuccess } from "@/lib/api/respond";
import { ValidationError, TooManyRequestsError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const meta = getRequestMeta(request);

    const { allowed } = await forgotPasswordRateLimiter.check(meta.ipAddress ?? "unknown");
    if (!allowed) throw new TooManyRequestsError();

    const body = await request.json().catch(() => null);
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError("Enter a valid email address", parsed.error.flatten().fieldErrors);
    }

    await passwordResetService.requestPasswordReset(parsed.data.email, meta);

    return jsonSuccess({ message: "If an account exists for that email, a reset link is on its way." });
  } catch (error) {
    return jsonError(error);
  }
}