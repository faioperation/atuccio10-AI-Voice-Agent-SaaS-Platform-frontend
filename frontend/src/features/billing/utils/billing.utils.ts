import { PENDING_PLAN_PRICE_KEY } from "../constants/pricing.constants";

// ── Pending plan persistence ──────────────────────────────────────────────────
// Stores the plan_price_id the user selected before being redirected to login.
// PricingGrid reads this on mount and auto-triggers checkout once auth resolves.

export function setPendingPlanPriceId(id: number): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_PLAN_PRICE_KEY, String(id));
}

export function getPendingPlanPriceId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PENDING_PLAN_PRICE_KEY);
}

export function clearPendingPlanPriceId(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_PLAN_PRICE_KEY);
}
