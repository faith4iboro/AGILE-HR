// src/lib/env.ts
// MODIFIED from the Next.js version: added PORT, CORS_ORIGIN,
// CROSS_SITE_COOKIES, COOKIE_DOMAIN. Everything else identical.

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),

  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN is required"),
  APP_URL: z.string().url().default("http://localhost:3000"),

  CROSS_SITE_COOKIES: z.coerce.boolean().default(false),
  COOKIE_DOMAIN: z.string().optional().default(""),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DIRECT_URL: z.string().min(1, "DIRECT_URL is required"),

  JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
  JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
  JWT_ACCESS_EXPIRES_IN_SECONDS: z.coerce.number().int().positive().default(900),
  JWT_REFRESH_EXPIRES_IN_SECONDS: z.coerce.number().int().positive().default(2592000),

  PASSWORD_RESET_TOKEN_EXPIRES_MIN: z.coerce.number().int().positive().default(30),
  EMAIL_VERIFICATION_TOKEN_EXPIRES_MIN: z.coerce.number().int().positive().default(1440),

  ACCOUNT_LOCKOUT_MAX_ATTEMPTS: z.coerce.number().int().positive().default(5),
  ACCOUNT_LOCKOUT_DURATION_MIN: z.coerce.number().int().positive().default(15),

  RATE_LIMIT_LOGIN_MAX: z.coerce.number().int().positive().default(10),
  RATE_LIMIT_LOGIN_WINDOW_SECONDS: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_REGISTER_MAX: z.coerce.number().int().positive().default(5),
  RATE_LIMIT_REGISTER_WINDOW_SECONDS: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_FORGOT_PASSWORD_MAX: z.coerce.number().int().positive().default(5),
  RATE_LIMIT_FORGOT_PASSWORD_WINDOW_SECONDS: z.coerce.number().int().positive().default(300),
  RATE_LIMIT_RESEND_VERIFICATION_MAX: z.coerce.number().int().positive().default(3),
  RATE_LIMIT_RESEND_VERIFICATION_WINDOW_SECONDS: z.coerce.number().int().positive().default(300),

  EMAIL_PROVIDER: z.enum(["console", "resend", "sendgrid", "ses"]).default("console"),
  EMAIL_API_KEY: z.string().optional().default(""),
  EMAIL_FROM_ADDRESS: z.string().default("AuraHR <no-reply@aurahr.dev>"),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables. Check .env against .env.example.");
  }
  return parsed.data;
}

export const env = loadEnv();