import { REDIRECT_INTENT_KEY, PENDING_EMAIL_KEY } from "../constants/auth.constants";

// ── Redirect intent ───────────────────────────────────────────────────────────
// Persists the URL the user was on before entering the auth flow so they can
// be returned there after verification completes.

export function setRedirectIntent(url: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(REDIRECT_INTENT_KEY, url);
}

export function getRedirectIntent(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(REDIRECT_INTENT_KEY);
}

export function clearRedirectIntent(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(REDIRECT_INTENT_KEY);
}

// ── Pending verification email ────────────────────────────────────────────────
// Persists the email address across the registration → verify-email → otp pages.

export function setPendingVerificationEmail(email: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_EMAIL_KEY, email);
}

export function getPendingVerificationEmail(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PENDING_EMAIL_KEY);
}

export function clearPendingVerificationEmail(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_EMAIL_KEY);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Flattens a Django-style field error response into a plain Record<string, string>.
 * Both array values (["msg"]) and plain string values are handled.
 */
export function extractApiFieldErrors(data: unknown): Record<string, string> {
  if (!data || typeof data !== "object") return {};
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (Array.isArray(value) && value.length > 0) {
      result[key] = String(value[0]);
    } else if (typeof value === "string") {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Masks an email for display: "johndoe@example.com" → "j***e@example.com"
 */
export function maskEmail(email: string): string {
  const atIdx = email.indexOf("@");
  if (atIdx < 0) return email;
  const local = email.slice(0, atIdx);
  const domain = email.slice(atIdx);
  if (local.length <= 2) return `${local[0]}***${domain}`;
  return `${local[0]}***${local[local.length - 1]}${domain}`;
}
