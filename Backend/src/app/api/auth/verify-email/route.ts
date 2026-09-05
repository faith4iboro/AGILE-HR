// src/app/api/auth/verify-email/route.ts

import { verifyEmailSchema } from "@/lib/validations/auth";
import { emailVerificationService } from "@/services/email-verification.service";
import { getRequestMeta, jsonError, jsonSuccess } from "@/lib/api/respond";
import { ValidationError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const meta = getRequestMeta(request);

    const body = await request.json().catch(() => null);
    const parsed = verifyEmailSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError("A verification token is required", parsed.error.flatten().fieldErrors);
    }

    await emailVerificationService.verifyEmail(parsed.data.token, meta);

    return jsonSuccess({ message: "Your email address has been verified." });
  } catch (error) {
    return jsonError(error);
  }
}