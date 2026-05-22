export const AUTH_MUTATION_KEYS = {
  register: ["auth", "register"] as const,
  verifyEmail: ["auth", "verify-email"] as const,
  resendOtp: ["auth", "resend-otp"] as const,
  login: ["auth", "login"] as const,
  logout: ["auth", "logout"] as const,
  forgotPassword: ["auth", "forgot-password"] as const,
  resetPassword: ["auth", "reset-password"] as const,
  updateProfile: ["auth", "update-profile"] as const,
  changePassword: ["auth", "change-password"] as const,
} as const;

export const OTP_RESEND_COOLDOWN_SECONDS = 30;
export const RESET_OTP_COOLDOWN_SECONDS = 60;

export const REDIRECT_INTENT_KEY = "auth_redirect_intent";
export const PENDING_EMAIL_KEY = "auth_pending_email";
export const PENDING_RESET_EMAIL_KEY = "auth_pending_reset_email";
