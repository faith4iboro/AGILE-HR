// src/lib/auth/tokens.ts
// Built on Web Crypto (not Node's crypto module) so this is safely
// importable from both Node routes and Edge middleware.

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function generateSecureToken(byteLength: number = 32): string {
  const randomBytes = new Uint8Array(byteLength);
  crypto.getRandomValues(randomBytes);
  return toBase64Url(randomBytes);
}

export async function hashToken(token: string): Promise<string> {
  const encodedToken = new TextEncoder().encode(token);
  const digestBuffer = await crypto.subtle.digest("SHA-256", encodedToken);
  return toHex(digestBuffer);
}