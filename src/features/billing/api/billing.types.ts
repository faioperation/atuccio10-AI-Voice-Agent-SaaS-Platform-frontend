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

// ── UI-layer prop types ──────────────────────────────────────────────────────

export interface PricingCardProps {
  plan: BillingPlan;
  billingCycle: BillingCycle;
  featured?: boolean;
  onSubscribe?: (planPriceId: number) => void;
  isLoading?: boolean;
}
