import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { AUTH_MUTATION_KEYS } from "../constants/auth.constants";
import type { ForgotPasswordRequest } from "../api/auth.types";

export function useForgotPassword() {
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.forgotPassword,
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
  });
}
