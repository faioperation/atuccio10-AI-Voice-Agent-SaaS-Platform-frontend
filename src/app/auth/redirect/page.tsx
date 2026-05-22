"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/Shared/Loader";
import type { UserRole } from "@/features/auth/api/auth.types";

const ROLE_HOME: Record<UserRole, string> = {
  system_admin: "/system_admin",
  business_admin: "/business_admin",
};

/**
 * Intermediate page used by middleware to route already-authenticated users
 * away from login/signup. Reads role from global auth state and pushes to
 * the correct dashboard. Falls back to "/" if role is unrecognised.
 */
export default function AuthRedirectPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/auth/login");
      return;
    }
    const role = user.roles.find((r): r is UserRole => r in ROLE_HOME);
    router.replace(role ? ROLE_HOME[role] : "/");
  }, [user, loading, router]);

  return <Loader variant="splash" message="Redirecting..." />;
}
