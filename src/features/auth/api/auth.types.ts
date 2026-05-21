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
  active_subscription: string | null;
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
