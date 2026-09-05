// src/constants/routes.ts
// Not built earlier in this thread despite appearing in the original sketch
// — added now as a small, genuinely useful convenience constant.

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  dashboard: "/dashboard",
  sessions: "/sessions",
} as const;