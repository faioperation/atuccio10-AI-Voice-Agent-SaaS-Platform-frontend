// ── Shared User ───────────────────────────────────────────────────────────────

export type UserRole = "system_admin" | "business_admin";

// Backend returns this object once a subscription is active
export interface ActiveSubscription {
  plan_name: string;
  billing_cycle: string;
  price: string;
  currency: string;
  status: string;
  plan_start_date: string;
  plan_end_date: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  profile_image: string | null;
  business: string | null;
  is_verified: boolean;
  roles: UserRole[];
  active_subscription: ActiveSubscription | string | null;
}

// ── Login ─────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  message: string;
}

export interface LoginErrorResponse {
  email?: string[];
  password?: string[];
  non_field_errors?: string[];
  detail?: string;
}

// ── Logout ────────────────────────────────────────────────────────────────────

export interface LogoutResponse {
  message: string;
}

// ── Register ─────────────────────────────────────────────────────────────────

export interface RegisterRequest {
  name: string;
  business_name: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  is_verified: boolean;
  roles: string[];
  active_subscription: ActiveSubscription | string | null;
}

export interface RegisterResponse {
  user: RegisteredUser;
  message: string;
}

export interface RegisterErrorResponse {
  email?: string[];
  phone?: string[];
  name?: string[];
  business_name?: string[];
  password?: string[];
  non_field_errors?: string[];
  detail?: string;
}

// ── Verify Email ──────────────────────────────────────────────────────────────

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export interface VerifyEmailErrorResponse {
  otp?: string[];
  email?: string[];
  non_field_errors?: string[];
  detail?: string;
}

// ── Forgot Password ───────────────────────────────────────────────────────────

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ForgotPasswordErrorResponse {
  email?: string[];
  detail?: string;
  non_field_errors?: string[];
}

// ── Reset Password ────────────────────────────────────────────────────────────

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ResetPasswordErrorResponse {
  otp?: string[];
  email?: string[];
  new_password?: string[];
  non_field_errors?: string[];
  detail?: string;
}

// ── Update Profile ────────────────────────────────────────────────────────────

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  profile_image?: string;
}

export interface UpdateProfileErrorResponse {
  name?: string[];
  phone?: string[];
  profile_image?: string[];
  non_field_errors?: string[];
  detail?: string;
}

// ── Change Password ───────────────────────────────────────────────────────────

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface ChangePasswordErrorResponse {
  old_password?: string[];
  new_password?: string[];
  confirm_password?: string[];
  non_field_errors?: string[];
  detail?: string;
}

// ── Resend OTP ────────────────────────────────────────────────────────────────

export interface ResendOtpRequest {
  email: string;
  type: "email_verify";
}

export interface ResendOtpResponse {
  message: string;
}

export interface ResendOtpErrorResponse {
  error: string;
  code: "rate_limit_exceeded" | string;
  wait_time?: number;
  detail?: string;
}
