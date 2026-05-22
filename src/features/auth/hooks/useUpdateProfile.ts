import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { AUTH_MUTATION_KEYS } from "../constants/auth.constants";

export function useUpdateProfile() {
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.updateProfile,
    mutationFn: authApi.updateProfile,
  });
}
