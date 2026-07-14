import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Root entry — routes based on visitor state:
 *   - First-time visitor  → /onboarding (product intro)
 *   - Returning, signed-in → /dashboard
 *   - Returning, not signed-in → /login
 *
 * (Auth is mocked; we use localStorage flags set by the signup / login flows.)
 */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const visited = window.localStorage.getItem("rasel:onboarded");
      const authed = window.localStorage.getItem("rasel:authed");
      if (!visited) throw redirect({ to: "/onboarding" });
      if (authed) throw redirect({ to: "/dashboard" });
      throw redirect({ to: "/login" });
    }
    throw redirect({ to: "/onboarding" });
  },
});
