// src/app.ts
// Builds the Express app: security headers (Helmet — this is the one
// place in the whole project Helmet genuinely applies, unlike the Next.js
// version which had to use next.config.ts's headers() instead), CORS
// (configured for credentialed cross-origin requests, matching
// CORS_ORIGIN), cookie parsing, JSON body parsing, CSRF, routes, and the
// error handler last.

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { env } from "@/lib/env";
import { csrfProtection } from "@/middleware/csrf";
import { errorHandler } from "@/middleware/error-handler";
import { authRouter } from "@/routes/auth.routes";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1); // required for req.ip / x-forwarded-for to be accurate behind a reverse proxy (Render, Railway, Fly, nginx, etc.)

  app.use(helmet());

  const allowedOrigins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true, // required for cookies to be sent/received cross-origin
    })
  );

  app.use(cookieParser());
  app.use(express.json());
  app.use(csrfProtection);

  app.get("/api/health", (_req, res) => {
    res.json({ success: true, data: { status: "ok" } });
  });

  app.use("/api/auth", authRouter);

  app.use(errorHandler);

  return app;
}