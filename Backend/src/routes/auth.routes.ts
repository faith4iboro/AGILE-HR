// src/routes/auth.routes.ts
// REPLACES the 11 separate app/api/auth/*/route.ts files from the Next.js
// version. Every handler's internal logic is unchanged — same schemas,
// same service calls, same rate limiting — only the request/response
// plumbing (Express req/res instead of NextRequest/NextResponse) differs.

import { Router } from "express";
import type { Request, Response } from "express";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "@/lib/validations/auth";
import { authService } from "@/services/auth.service";
import { sessionService } from "@/services/session.service";
import { passwordResetService } from "@/services/password-reset.service";
import { emailVerificationService } from "@/services/email-verification.service";
import {
  loginRateLimiter,
  registerRateLimiter,
  forgotPasswordRateLimiter,
  resendVerificationRateLimiter,
  getClientIp,
} from "@/lib/rate-limit";
import { getRequestMeta, sendError, sendSuccess } from "@/lib/respond";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setCsrfCookie,
  clearAuthCookies,
  COOKIE_NAMES,
} from "@/lib/auth/cookies";
import { ValidationError, TooManyRequestsError, UnauthenticatedError } from "@/lib/errors";
import { requireAuthenticated } from "@/middleware/require-auth";

export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const meta = getRequestMeta(req);

    const { allowed } = await registerRateLimiter.check(getClientIp(req.headers));
    if (!allowed) throw new TooManyRequestsError();

    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError("Please check the highlighted fields", parsed.error.flatten().fieldErrors);
    }

    const { user, tokens } = await authService.register(parsed.data, meta);

    setAccessTokenCookie(res, tokens.accessToken);
    setRefreshTokenCookie(res, tokens.refreshToken);
    setCsrfCookie(res, tokens.csrfToken);
    sendSuccess(res, { user }, 201);
  } catch (error) {
    sendError(res, error);
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const meta = getRequestMeta(req);

    const { allowed } = await loginRateLimiter.check(getClientIp(req.headers));
    if (!allowed) throw new TooManyRequestsError();

    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError("Please check the highlighted fields", parsed.error.flatten().fieldErrors);
    }

    const { user, tokens } = await authService.login(parsed.data, meta);

    setAccessTokenCookie(res, tokens.accessToken);
    setRefreshTokenCookie(res, tokens.refreshToken);
    setCsrfCookie(res, tokens.csrfToken);
    sendSuccess(res, { user });
  } catch (error) {
    sendError(res, error);
  }
});

authRouter.post("/logout", async (req: Request, res: Response) => {
  try {
    const meta = getRequestMeta(req);
    const refreshToken = req.cookies?.[COOKIE_NAMES.REFRESH_TOKEN];

    await sessionService.logout(refreshToken, meta);

    clearAuthCookies(res);
    sendSuccess(res, { loggedOut: true });
  } catch (error) {
    sendError(res, error);
  }
});

authRouter.post("/logout-all", requireAuthenticated, async (req: Request, res: Response) => {
  try {
    const meta = getRequestMeta(req);
    await sessionService.logoutAll(req.authClaims!.sub, meta);

    clearAuthCookies(res);
    sendSuccess(res, { loggedOutAllDevices: true });
  } catch (error) {
    sendError(res, error);
  }
});

authRouter.post("/refresh", async (req: Request, res: Response) => {
  try {
    const meta = getRequestMeta(req);
    const refreshToken = req.cookies?.[COOKIE_NAMES.REFRESH_TOKEN];

    const { user, tokens } = await sessionService.refresh(refreshToken, meta);

    setAccessTokenCookie(res, tokens.accessToken);
    setRefreshTokenCookie(res, tokens.refreshToken);
    setCsrfCookie(res, tokens.csrfToken);
    sendSuccess(res, { user });
  } catch (error) {
    sendError(res, error);
  }
});

authRouter.get("/me", requireAuthenticated, async (req: Request, res: Response) => {
  try {
    const user = await sessionService.getCurrentUser(req.authClaims!.sub);
    sendSuccess(res, { user });
  } catch (error) {
    sendError(res, error);
  }
});

authRouter.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const meta = getRequestMeta(req);

    const { allowed } = await forgotPasswordRateLimiter.check(getClientIp(req.headers));
    if (!allowed) throw new TooManyRequestsError();

    const parsed = forgotPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError("Enter a valid email address", parsed.error.flatten().fieldErrors);
    }

    await passwordResetService.requestPasswordReset(parsed.data.email, meta);

    sendSuccess(res, { message: "If an account exists for that email, a reset link is on its way." });
  } catch (error) {
    sendError(res, error);
  }
});

authRouter.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const meta = getRequestMeta(req);

    const parsed = resetPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError("Please check the highlighted fields", parsed.error.flatten().fieldErrors);
    }

    await passwordResetService.resetPassword(parsed.data.token, parsed.data.password, meta);

    sendSuccess(res, { message: "Password updated. Please sign in again." });
  } catch (error) {
    sendError(res, error);
  }
});

authRouter.post("/verify-email", async (req: Request, res: Response) => {
  try {
    const meta = getRequestMeta(req);

    const parsed = verifyEmailSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError("A verification token is required", parsed.error.flatten().fieldErrors);
    }

    await emailVerificationService.verifyEmail(parsed.data.token, meta);

    sendSuccess(res, { message: "Your email address has been verified." });
  } catch (error) {
    sendError(res, error);
  }
});

authRouter.post("/resend-verification", async (req: Request, res: Response) => {
  try {
    const meta = getRequestMeta(req);
    const token = req.cookies?.[COOKIE_NAMES.ACCESS_TOKEN];
    const { verifyAccessToken } = await import("@/lib/auth/jwt");
    const claims = token ? await verifyAccessToken(token) : null;
    if (!claims) throw new UnauthenticatedError();

    const { allowed } = await resendVerificationRateLimiter.check(claims.sub);
    if (!allowed) throw new TooManyRequestsError();

    await emailVerificationService.resendVerification(claims.sub, meta);

    sendSuccess(res, { message: "Verification email sent." });
  } catch (error) {
    sendError(res, error);
  }
});

authRouter.get("/sessions", requireAuthenticated, async (req: Request, res: Response) => {
  try {
    const claims = req.authClaims!;
    const sessions = await sessionService.listSessions(claims.sub, claims.sid);
    sendSuccess(res, { sessions });
  } catch (error) {
    sendError(res, error);
  }
});

authRouter.delete("/sessions/:id", requireAuthenticated, async (req: Request, res: Response) => {
  try {
    const meta = getRequestMeta(req);
    const claims = req.authClaims!;

    await sessionService.revokeSession(claims.sub, req.params.id, meta);

    sendSuccess(res, { revoked: true });
  } catch (error) {
    sendError(res, error);
  }
});