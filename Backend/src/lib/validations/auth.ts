// src/lib/validations/auth.ts

import { z } from "zod";

import { passwordPolicySchema } from "@/lib/auth/password";

const organizationSlugSchema = z
  .string()
  .min(2, "Workspace URL must be at least 2 characters")
  .max(63, "Workspace URL must be under 63 characters")
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only");

export const registerSchema = z
  .object({
    companyName: z.string().min(2, "Enter your company name").max(200),
    companySlug: organizationSlugSchema,
    fullName: z.string().min(2, "Enter your full name").max(200),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: passwordPolicySchema,
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is missing"),
    password: passwordPolicySchema,
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is missing"),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}