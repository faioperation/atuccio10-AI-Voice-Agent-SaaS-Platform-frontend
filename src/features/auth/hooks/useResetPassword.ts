import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { AUTH_MUTATION_KEYS } from "../constants/auth.constants";
import type { ResetPasswordRequest } from "../api/auth.types";

export function useResetPassword() {
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.resetPassword,
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
  });
}
