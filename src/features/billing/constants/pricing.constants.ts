import type { BillingCycle } from "../api/billing.types";

export const BILLING_QUERY_KEYS = {
  all: ["billing"] as const,
  plans: ["billing", "plans"] as const,
} as const;

export const DEFAULT_BILLING_CYCLE: BillingCycle = "monthly";

export const BILLING_CYCLE_LABELS: Record<BillingCycle, string> = {
  monthly: "Monthly",
  yearly: "Yearly",
};

// Human-readable labels for API feature keys
export const FEATURE_LABEL_MAP: Record<string, string> = {
  max_calls_per_month: "AI qualification calls/month",
};

export const YEARLY_SAVINGS_LABEL = "Save up to 65%";

export const PLAN_CTA_LABEL = "Active Now";

// sessionStorage key used to persist selected plan_price_id across the login redirect
export const PENDING_PLAN_PRICE_KEY = "billing_pending_plan_price_id";
