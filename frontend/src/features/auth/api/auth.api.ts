import { apiClient } from "@/lib/api/client";
import type {
  RegisterRequest,
  RegisterResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
  ChangePasswordResponse,
  AuthUser,
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

  login: (data: LoginRequest): Promise<LoginResponse> =>
    apiClient.auth.post<LoginResponse>("/login/", data),

  logout: (): Promise<LogoutResponse> =>
    apiClient.auth.post<LogoutResponse>("/logout/", {}),

  getProfile: (): Promise<AuthUser> =>
    apiClient.auth.get<AuthUser>("/user-profile/"),

  updateProfile: (data: UpdateProfileRequest): Promise<AuthUser> =>
    apiClient.auth.patch<AuthUser>("/user-profile/", data),

  changePassword: (data: ChangePasswordRequest): Promise<ChangePasswordResponse> =>
    apiClient.auth.post<ChangePasswordResponse>("/change-password/", data),

  forgotPassword: (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> =>
    apiClient.auth.post<ForgotPasswordResponse>("/forgot-password/", data),

  resetPassword: (data: ResetPasswordRequest): Promise<ResetPasswordResponse> =>
    apiClient.auth.post<ResetPasswordResponse>("/reset-password/", data),
};
