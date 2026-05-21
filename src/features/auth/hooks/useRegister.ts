import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { AUTH_MUTATION_KEYS } from "../constants/auth.constants";
import type { RegisterRequest } from "../api/auth.types";

export function useRegister() {
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.register,
    mutationFn: (data: RegisterRequest) => authApi.register(data),
  });
}
