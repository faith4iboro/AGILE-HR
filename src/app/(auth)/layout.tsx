import { AuthShell } from "@/components/layout/auth/auth-shell";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}
