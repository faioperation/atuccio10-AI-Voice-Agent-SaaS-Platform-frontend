import { apiClient } from "@/lib/api/client";
import type {
  RegisterRequest,
  RegisterResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ResendOtpRequest,
  ResendOtpResponse,
} from "./auth.types";

// AUTH_BASE_URL = https://test21.fireai.agency/auth
// Paths here are relative to that base, e.g. /register/ → .../auth/register/
export const authApi = {
  register: (data: RegisterRequest): Promise<RegisterResponse> =>
    apiClient.auth.post<RegisterResponse>("/register/", data),

  verifyEmail: (data: VerifyEmailRequest): Promise<VerifyEmailResponse> =>
    apiClient.auth.post<VerifyEmailResponse>("/verify-email/", data),

  resendOtp: (data: ResendOtpRequest): Promise<ResendOtpResponse> =>
    apiClient.auth.post<ResendOtpResponse>("/resend-otp/", data),
};
