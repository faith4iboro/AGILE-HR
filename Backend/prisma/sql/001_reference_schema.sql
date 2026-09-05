-- prisma/sql/001_reference_schema.sql
-- REFERENCE ONLY. Prisma Migrate manages the real schema — see prisma/README notes.
-- Run `npx prisma migrate dev --name init` instead of this file.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TYPE "user_status" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
CREATE TYPE "security_event_type" AS ENUM (
  'ACCOUNT_LOCKOUT', 'RATE_LIMIT_EXCEEDED', 'SUSPICIOUS_TOKEN_REUSE',
  'PASSWORD_RESET_REQUESTED', 'MULTIPLE_FAILED_LOGINS'
);
CREATE TYPE "security_severity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

CREATE TABLE "organizations" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "deleted_at" TIMESTAMPTZ
);
CREATE UNIQUE INDEX "organizations_slug_key" ON "organizations" ("slug");
CREATE INDEX ON "organizations" ("deleted_at");

CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "organization_id" UUID NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
  "full_name" TEXT NOT NULL,
  "email" CITEXT NOT NULL,
  "password_hash" TEXT NOT NULL,
  "status" "user_status" NOT NULL DEFAULT 'ACTIVE',
  "email_verified_at" TIMESTAMPTZ,
  "failed_login_attempts" INTEGER NOT NULL DEFAULT 0,
  "locked_until" TIMESTAMPTZ,
  "last_login_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "deleted_at" TIMESTAMPTZ
);
CREATE UNIQUE INDEX "users_org_email_key" ON "users" ("organization_id", "email");
CREATE INDEX ON "users" ("organization_id");
CREATE INDEX ON "users" ("email");
CREATE INDEX ON "users" ("deleted_at");

CREATE TABLE "roles" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "organization_id" UUID NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT,
  "is_system" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "deleted_at" TIMESTAMPTZ
);
CREATE UNIQUE INDEX "roles_org_slug_key" ON "roles" ("organization_id", "slug");
CREATE INDEX ON "roles" ("organization_id");

CREATE TABLE "permissions" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "key" TEXT NOT NULL,
  "module" TEXT NOT NULL,
  "description" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX "permissions_key_key" ON "permissions" ("key");
CREATE INDEX ON "permissions" ("module");

CREATE TABLE "role_permissions" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "role_id" UUID NOT NULL REFERENCES "roles"("id") ON DELETE CASCADE,
  "permission_id" UUID NOT NULL REFERENCES "permissions"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX "role_permissions_role_permission_key" ON "role_permissions" ("role_id", "permission_id");
CREATE INDEX ON "role_permissions" ("permission_id");

CREATE TABLE "user_roles" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "role_id" UUID NOT NULL REFERENCES "roles"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX "user_roles_user_role_key" ON "user_roles" ("user_id", "role_id");
CREATE INDEX ON "user_roles" ("role_id");

CREATE TABLE "sessions" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "organization_id" UUID NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
  "refresh_token_hash" TEXT NOT NULL,
  "user_agent" TEXT,
  "ip_address" TEXT,
  "last_active_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "expires_at" TIMESTAMPTZ NOT NULL,
  "revoked_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX "sessions_refresh_token_hash_key" ON "sessions" ("refresh_token_hash");
CREATE INDEX ON "sessions" ("user_id");
CREATE INDEX ON "sessions" ("expires_at");

CREATE TABLE "password_reset_tokens" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "token_hash" TEXT NOT NULL,
  "expires_at" TIMESTAMPTZ NOT NULL,
  "used_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX "password_reset_tokens_token_hash_key" ON "password_reset_tokens" ("token_hash");
CREATE INDEX ON "password_reset_tokens" ("user_id");
CREATE INDEX ON "password_reset_tokens" ("expires_at");

CREATE TABLE "email_verification_tokens" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "token_hash" TEXT NOT NULL,
  "expires_at" TIMESTAMPTZ NOT NULL,
  "used_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX "email_verification_tokens_token_hash_key" ON "email_verification_tokens" ("token_hash");
CREATE INDEX ON "email_verification_tokens" ("user_id");
CREATE INDEX ON "email_verification_tokens" ("expires_at");

CREATE TABLE "audit_logs" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "organization_id" UUID REFERENCES "organizations"("id") ON DELETE SET NULL,
  "user_id" UUID REFERENCES "users"("id") ON DELETE SET NULL,
  "action" TEXT NOT NULL,
  "metadata" JSONB,
  "ip_address" TEXT,
  "user_agent" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON "audit_logs" ("organization_id");
CREATE INDEX ON "audit_logs" ("user_id");
CREATE INDEX ON "audit_logs" ("action");
CREATE INDEX ON "audit_logs" ("created_at");

CREATE TABLE "security_events" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "organization_id" UUID REFERENCES "organizations"("id") ON DELETE SET NULL,
  "user_id" UUID REFERENCES "users"("id") ON DELETE SET NULL,
  "type" "security_event_type" NOT NULL,
  "severity" "security_severity" NOT NULL,
  "metadata" JSONB,
  "ip_address" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON "security_events" ("organization_id");
CREATE INDEX ON "security_events" ("type");
CREATE INDEX ON "security_events" ("severity");
CREATE INDEX ON "security_events" ("created_at");