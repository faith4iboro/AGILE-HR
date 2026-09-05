// src/lib/auth/jwt.ts

import { SignJWT, jwtVerify, type JWTPayload } from "jose";

import { env } from "@/lib/env";

const ALGORITHM = "HS256";

const accessTokenSecret = new TextEncoder().encode(env.JWT_ACCESS_SECRET);
const refreshTokenSecret = new TextEncoder().encode(env.JWT_REFRESH_SECRET);

export interface AccessTokenClaims extends JWTPayload {
  type: "access";
  sub: string;
  sid: string;
  orgId: string;
  orgSlug: string;
  email: string;
  roles: string[];
  permissions: string[];
}

export interface RefreshTokenClaims extends JWTPayload {
  type: "refresh";
  sub: string;
  sid: string;
}

export async function signAccessToken(
  claims: Omit<AccessTokenClaims, "type" | "iat" | "exp">
): Promise<string> {
  return new SignJWT({ ...claims, type: "access" })
    .setProtectedHeader({ alg: ALGORITHM })
    .setSubject(String(claims.sub))
    .setIssuedAt()
    .setExpirationTime(`${env.JWT_ACCESS_EXPIRES_IN_SECONDS}s`)
    .sign(accessTokenSecret);
}

export async function signRefreshToken(
  claims: Omit<RefreshTokenClaims, "type" | "iat" | "exp">
): Promise<string> {
  return new SignJWT({ ...claims, type: "refresh" })
    .setProtectedHeader({ alg: ALGORITHM })
    .setSubject(String(claims.sub))
    .setIssuedAt()
    .setExpirationTime(`${env.JWT_REFRESH_EXPIRES_IN_SECONDS}s`)
    .sign(refreshTokenSecret);
}

export async function verifyAccessToken(token: string): Promise<AccessTokenClaims | null> {
  try {
    const { payload } = await jwtVerify(token, accessTokenSecret, { algorithms: [ALGORITHM] });
    if (payload.type !== "access") return null;
    return payload as AccessTokenClaims;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenClaims | null> {
  try {
    const { payload } = await jwtVerify(token, refreshTokenSecret, { algorithms: [ALGORITHM] });
    if (payload.type !== "refresh") return null;
    return payload as RefreshTokenClaims;
  } catch {
    return null;
  }
}