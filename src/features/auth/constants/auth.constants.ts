export const AUTH_MUTATION_KEYS = {
  register: ["auth", "register"] as const,
  verifyEmail: ["auth", "verify-email"] as const,
  resendOtp: ["auth", "resend-otp"] as const,
} as const;

export const OTP_RESEND_COOLDOWN_SECONDS = 30;

export const REDIRECT_INTENT_KEY = "auth_redirect_intent";
export const PENDING_EMAIL_KEY = "auth_pending_email";
