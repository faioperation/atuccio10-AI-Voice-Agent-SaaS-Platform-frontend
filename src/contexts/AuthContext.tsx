"use client";

import React, { createContext, useCallback, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/auth.api";
import type { AuthUser } from "@/features/auth/api/auth.types";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (userData: AuthUser) => void;
  logout: () => Promise<void>;
  refetchUser: () => Promise<AuthUser | null>;
  updateUser: (userData: AuthUser) => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, refetch } = useQuery<AuthUser | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        return await authApi.getProfile();
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const login = useCallback(
    (userData: AuthUser) => {
      queryClient.setQueryData(["profile"], userData);
    },
    [queryClient]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // silently fail — still clear client state
    } finally {
      queryClient.clear();
      window.location.href = "/auth/login";
    }
  }, [queryClient]);

  const refetchUser = useCallback(async (): Promise<AuthUser | null> => {
    const res = await refetch();
    return res.data ?? null;
  }, [refetch]);

  const updateUser = useCallback(
    (userData: AuthUser) => {
      queryClient.setQueryData(["profile"], userData);
    },
    [queryClient]
  );

  // Listen for 401 events dispatched by the axios interceptor
  useEffect(() => {
    const handleUnauthorized = () => {
      queryClient.clear();
      window.location.href = "/auth/login";
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [queryClient]);

  const value: AuthContextType = {
    user: user ?? null,
    loading: isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refetchUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
