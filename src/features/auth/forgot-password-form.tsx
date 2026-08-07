"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, MailCheck, SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validations/auth";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/constants/routes";

export function ForgotPasswordForm() {
  const [submittedEmail, setSubmittedEmail] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(values: ForgotPasswordValues) {
    await authService.requestPasswordReset(values.email);
    setSubmittedEmail(values.email);
  }

  if (submittedEmail) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <div className="bg-primary-soft text-primary mx-auto flex size-14 items-center justify-center rounded-2xl">
          <MailCheck className="size-6" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="font-display text-foreground text-2xl font-semibold">
            Check your inbox
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We&apos;ve sent password reset instructions to{" "}
            <strong className="text-foreground">{submittedEmail}</strong>.
          </p>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link href={ROUTES.login}>
            <ArrowLeft />
            Back to sign in
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-foreground text-2xl font-semibold">
          Reset your password
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your work email and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Work email</Label>
        <div className="relative">
          <Mail className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            className="pl-9"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-destructive text-xs">{errors.email.message}</p>
        )}
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full">
        <SendHorizontal />
        Send reset link
      </Button>

      <Link
        href={ROUTES.login}
        className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 text-sm font-medium"
      >
        <ArrowLeft className="size-3.5" />
        Back to sign in
      </Link>
    </form>
  );
}
