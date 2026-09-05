// src/app/api/auth/sessions/route.ts

import { requireAuthenticated } from "@/lib/auth/authorize";
import { sessionService } from "@/services/session.service";
import { jsonError, jsonSuccess } from "@/lib/api/respond";

export async function GET() {
  try {
    const claims = await requireAuthenticated();
    const sessions = await sessionService.listSessions(claims.sub, claims.sid);
    return jsonSuccess({ sessions });
  } catch (error) {
    return jsonError(error);
  }
}