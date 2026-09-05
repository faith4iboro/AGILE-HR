// src/lib/auth/password-strength.ts
// Dependency-free (no bcryptjs) so client components can safely import this
// for the strength meter without bundling password-hashing code.

export function getPasswordStrength(password: string): {
  score: 0 | 1 | 2 | 3 | 4;
  label: "Very weak" | "Weak" | "Fair" | "Strong" | "Very strong";
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
  };
} {
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[^A-Za-z0-9]/.test(password),
  };

  const passedCount = Object.values(checks).filter(Boolean).length;
  const score = Math.max(0, passedCount - 1) as 0 | 1 | 2 | 3 | 4;
  const labels = ["Very weak", "Weak", "Fair", "Strong", "Very strong"] as const;

  return { score, label: labels[score], checks };
}