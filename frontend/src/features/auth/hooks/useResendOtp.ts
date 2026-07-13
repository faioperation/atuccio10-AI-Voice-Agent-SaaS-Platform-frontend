import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { AUTH_MUTATION_KEYS } from "../constants/auth.constants";
import type { ResendOtpRequest } from "../api/auth.types";

export function useResendOtp() {
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.resendOtp,
    mutationFn: (data: ResendOtpRequest) => authApi.resendOtp(data),
  });
}
