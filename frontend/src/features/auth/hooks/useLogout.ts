import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { AUTH_MUTATION_KEYS } from "../constants/auth.constants";

export function useLogout() {
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.logout,
    mutationFn: () => authApi.logout(),
  });
}
