import type { AuthUser } from "@/types/user";
import { wait } from "@/lib/utils";

/**
 * Placeholder auth service. Wires up to real endpoints once authentication
 * (NextAuth/custom JWT + Prisma) is implemented in a later milestone.
 */
export const authService = {
  async login(_email: string, _password: string): Promise<AuthUser> {
    await wait(600);
    return {
      id: "demo-user",
      name: "Amaka Obiora",
      email: _email,
      role: "HR Admin",
      organization: "AuraHR Demo Workspace",
    };
  },

  async register(_payload: {
    name: string;
    organization: string;
    email: string;
    password: string;
  }): Promise<AuthUser> {
    await wait(600);
    return {
      id: "demo-user",
      name: _payload.name,
      email: _payload.email,
      role: "Super Admin",
      organization: _payload.organization,
    };
  },

  async requestPasswordReset(_email: string): Promise<{ success: boolean }> {
    await wait(500);
    return { success: true };
  },

  async resetPassword(_token: string, _password: string): Promise<{ success: boolean }> {
    await wait(500);
    return { success: true };
  },
};
