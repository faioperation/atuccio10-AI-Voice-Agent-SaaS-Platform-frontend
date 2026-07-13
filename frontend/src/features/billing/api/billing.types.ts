export type BillingCycle = "monthly" | "yearly";

export type Currency = string; // ISO 4217, e.g. "usd"

export interface BillingPrice {
  id: number;
  billing_cycle: BillingCycle;
  price: string;
  currency: Currency;
  is_active: boolean;
}

export interface PlanFeature {
  id: number;
  feature_key: string;
  feature_value: string;
}

export interface BillingPlan {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  prices: BillingPrice[];
  features: PlanFeature[];
}

export type BillingPlansResponse = BillingPlan[];

// ── Subscribe ─────────────────────────────────────────────────────────────────

export interface SubscribeRequest {
  plan_price_id: string;
}

export interface SubscribeResponse {
  checkout_url: string;
  session_id: string;
}

// ── Payment Session Verification ─────────────────────────────────────────────
// Backend activates subscription and returns session details.
// All detail fields are optional — the presence of any response means success.

export interface PaymentSessionResponse {
  // Core success indicators
  status?: string;
  message?: string;
  // Plan detail fields (backend uses "price", not "amount")
  plan_name?: string;
  billing_cycle?: BillingCycle;
  price?: string;
  currency?: Currency;
  customer_email?: string;
  plan_start_date?: string;
  plan_end_date?: string;
}

// ── UI-layer prop types ──────────────────────────────────────────────────────

export interface PricingCardProps {
  plan: BillingPlan;
  billingCycle: BillingCycle;
  featured?: boolean;
  onSubscribe?: (planPriceId: number) => void;
  isLoading?: boolean;
}
