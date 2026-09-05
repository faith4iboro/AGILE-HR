// src/lib/email/email.service.ts
// UNCHANGED except: removed `import "server-only"` — that package guards
// against a Next.js CLIENT BUNDLE accidentally importing server code. This
// backend has no client bundle at all, so the import was meaningless here
// (and would fail to resolve, since "server-only" isn't even installed in
// this project's package.json above).

import { env } from "@/lib/env";

export interface EmailService {
  sendPasswordResetEmail(params: { to: string; fullName: string; resetUrl: string }): Promise<void>;
  sendEmailVerificationEmail(params: { to: string; fullName: string; verifyUrl: string }): Promise<void>;
}

class ConsoleEmailService implements EmailService {
  async sendPasswordResetEmail({
    to,
    fullName,
    resetUrl,
  }: {
    to: string;
    fullName: string;
    resetUrl: string;
  }): Promise<void> {
    this.logOrWarn(
      "Password Reset",
      to,
      `Hi ${fullName}, reset your AuraHR password using the link below.\n${resetUrl}\nThis link expires soon and can only be used once. If you didn't request this, you can ignore this email.`
    );
  }

  async sendEmailVerificationEmail({
    to,
    fullName,
    verifyUrl,
  }: {
    to: string;
    fullName: string;
    verifyUrl: string;
  }): Promise<void> {
    this.logOrWarn(
      "Email Verification",
      to,
      `Hi ${fullName}, verify your AuraHR email address using the link below.\n${verifyUrl}`
    );
  }

  private logOrWarn(subject: string, to: string, body: string): void {
    if (env.NODE_ENV === "production") {
      console.error(
        `[email:${subject}] SECURITY MISCONFIGURATION: EMAIL_PROVIDER="console" is active in ` +
          `production. An email to ${to} was NOT actually sent, and its content — including any ` +
          `sensitive link — has been withheld from this log. Configure a real EMAIL_PROVIDER ` +
          `before relying on this flow in production. See .env.example.`
      );
      return;
    }

    console.log(`\n[email:${subject}]\nTo: ${to}\n${body}\n`);
  }
}

class UnimplementedEmailService implements EmailService {
  constructor(private readonly providerName: string) {}

  async sendPasswordResetEmail(): Promise<void> {
    this.fail();
  }

  async sendEmailVerificationEmail(): Promise<void> {
    this.fail();
  }

  private fail(): never {
    throw new Error(
      `EMAIL_PROVIDER="${this.providerName}" is configured but not implemented yet. ` +
        `Implement the EmailService interface for this provider in src/lib/email/email.service.ts, ` +
        `or set EMAIL_PROVIDER="console" for development.`
    );
  }
}

function createEmailService(): EmailService {
  switch (env.EMAIL_PROVIDER) {
    case "console":
      return new ConsoleEmailService();
    default:
      return new UnimplementedEmailService(env.EMAIL_PROVIDER);
  }
}

export const emailService: EmailService = createEmailService();