// src/app/api/auth/reset-password/route.ts

import { resetPasswordSchema } from "@/lib/validations/auth";
import { passwordResetService } from "@/services/password-reset.service";
import { getRequestMeta, jsonError, jsonSuccess } from "@/lib/api/respond";
import { ValidationError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const meta = getRequestMeta(request);

    const body = await request.json().catch(() => null);
    const parsed = resetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError("Please check the highlighted fields", parsed.error.flatten().fieldErrors);
    }

    await passwordResetService.resetPassword(parsed.data.token, parsed.data.password, meta);

    return jsonSuccess({ message: "Password updated. Please sign in again." });
  } catch (error) {
    return jsonError(error);
  }
}