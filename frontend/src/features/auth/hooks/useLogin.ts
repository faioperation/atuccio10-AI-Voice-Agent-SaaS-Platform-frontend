import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { AUTH_MUTATION_KEYS } from "../constants/auth.constants";
import type { LoginRequest } from "../api/auth.types";

export function useLogin() {
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.login,
    mutationFn: (data: LoginRequest) => authApi.login(data),
  });
}
