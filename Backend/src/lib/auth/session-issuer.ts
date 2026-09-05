// src/lib/auth/session-issuer.ts

import { randomUUID } from "crypto";

import { env } from "@/lib/env";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { hashToken } from "@/lib/auth/tokens";
import { generateCsrfToken } from "@/lib/auth/csrf";
import { sessionRepository } from "@/repositories/session.repository";
import type { AuthenticatedUser, IssuedTokens, RequestMeta } from "@/types/auth";

export async function issueSessionTokens(
  user: AuthenticatedUser,
  meta: RequestMeta
): Promise<IssuedTokens> {
  const sessionId = randomUUID();

  const refreshToken = await signRefreshToken({ sub: user.id, sid: sessionId });
  const refreshTokenHash = await hashToken(refreshToken);

  await sessionRepository.create({
    id: sessionId,
    userId: user.id,
    organizationId: user.organizationId,
    refreshTokenHash,
    userAgent: meta.userAgent,
    ipAddress: meta.ipAddress,
    expiresAt: new Date(Date.now() + env.JWT_REFRESH_EXPIRES_IN_SECONDS * 1000),
  });

  const accessToken = await signAccessToken({
    sub: user.id,
    sid: sessionId,
    orgId: user.organizationId,
    orgSlug: user.organizationSlug,
    email: user.email,
    roles: user.roles,
    permissions: user.permissions,
  });

  return { accessToken, refreshToken, csrfToken: generateCsrfToken() };
}