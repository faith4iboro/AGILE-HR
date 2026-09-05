// src/app/api/auth/sessions/[id]/route.ts

import { requireAuthenticated } from "@/lib/auth/authorize";
import { sessionService } from "@/services/session.service";
import { getRequestMeta, jsonError, jsonSuccess } from "@/lib/api/respond";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const meta = getRequestMeta(request);
    const claims = await requireAuthenticated();
    const { id } = await params;

    await sessionService.revokeSession(claims.sub, id, meta);

    return jsonSuccess({ revoked: true });
  } catch (error) {
    return jsonError(error);
  }
}