// src/app/api/auth/me/route.ts

import { requireAuthenticated } from "@/lib/auth/authorize";
import { sessionService } from "@/services/session.service";
import { jsonError, jsonSuccess } from "@/lib/api/respond";

export async function GET() {
  try {
    const claims = await requireAuthenticated();
    const user = await sessionService.getCurrentUser(claims.sub);
    return jsonSuccess({ user });
  } catch (error) {
    return jsonError(error);
  }
}