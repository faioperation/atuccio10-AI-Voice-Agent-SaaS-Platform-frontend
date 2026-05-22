"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "../api/auth.types";
import Loader from "@/components/Shared/Loader";

interface RoleGuardProps {
  /** Roles that are allowed to access the wrapped content */
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

const ROLE_HOME: Record<UserRole, string> = {
  system_admin: "/system_admin",
  business_admin: "/business_admin",
};

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    const hasAccess = user.roles.some((r) => allowedRoles.includes(r));
    if (!hasAccess) {
      // Send them to their own dashboard instead of a 403
      const homeRole = user.roles[0] as UserRole | undefined;
      router.replace(homeRole ? (ROLE_HOME[homeRole] ?? "/") : "/");
    }
  }, [user, loading, router, allowedRoles]);

  if (loading) {
    return <Loader variant="splash" message="Loading Dashboard..." />;
  }

  if (!user) return null;

  const hasAccess = user.roles.some((r) => allowedRoles.includes(r));
  if (!hasAccess) return null;

  return <>{children}</>;
}
