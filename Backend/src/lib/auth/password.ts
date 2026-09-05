// src/lib/auth/password.ts

import bcrypt from "bcryptjs";
import { z } from "zod";

const BCRYPT_COST_FACTOR = 12;

export async function hashPassword(plainTextPassword: string): Promise<string> {
  return bcrypt.hash(plainTextPassword, BCRYPT_COST_FACTOR);
}

export async function verifyPassword(
  plainTextPassword: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, passwordHash);
}

export const passwordPolicySchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be under 128 characters")
  .regex(/[a-z]/, "Password must include a lowercase letter")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/[0-9]/, "Password must include a number");