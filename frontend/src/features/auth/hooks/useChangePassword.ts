import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { AUTH_MUTATION_KEYS } from "../constants/auth.constants";

export function useChangePassword() {
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.changePassword,
    mutationFn: authApi.changePassword,
  });
}
