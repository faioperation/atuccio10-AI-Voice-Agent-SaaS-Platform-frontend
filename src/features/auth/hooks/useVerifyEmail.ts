import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { AUTH_MUTATION_KEYS } from "../constants/auth.constants";
import type { VerifyEmailRequest } from "../api/auth.types";

export function useVerifyEmail() {
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.verifyEmail,
    mutationFn: (data: VerifyEmailRequest) => authApi.verifyEmail(data),
  });
}
