// src/lib/errors.ts

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends AppError {
  constructor(message = "Invalid input", public readonly fieldErrors?: Record<string, string[]>) {
    super(message, 422, "VALIDATION_ERROR");
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message = "Unable to authenticate") {
    super(message, 401, "AUTH_INVALID_CREDENTIALS");
  }
}

export class UnauthenticatedError extends AppError {
  constructor(message = "You must be signed in to do that") {
    super(message, 401, "AUTH_UNAUTHENTICATED");
  }
}

export class AccountLockedError extends AppError {
  constructor(
    message = "This account is temporarily locked due to too many failed sign-in attempts"
  ) {
    super(message, 423, "AUTH_ACCOUNT_LOCKED");
  }
}

export class AccountInactiveError extends AppError {
  constructor(message = "This account is inactive") {
    super(message, 403, "AUTH_ACCOUNT_INACTIVE");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, 403, "AUTH_FORBIDDEN");
  }
}

export class ConflictError extends AppError {
  constructor(message = "This resource already exists") {
    super(message, 409, "CONFLICT");
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, 404, "NOT_FOUND");
  }
}

export class InvalidTokenError extends AppError {
  constructor(message = "This link is invalid or has expired") {
    super(message, 400, "AUTH_INVALID_TOKEN");
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests — please try again shortly") {
    super(message, 429, "TOO_MANY_REQUESTS");
  }
}

export class InternalError extends AppError {
  constructor(message = "Something went wrong") {
    super(message, 500, "INTERNAL_ERROR");
  }
}