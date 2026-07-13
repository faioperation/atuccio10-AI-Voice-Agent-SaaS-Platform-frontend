import type { BillingPlan, BillingCycle, BillingPrice } from "../api/billing.types";
import { FEATURE_LABEL_MAP } from "../constants/pricing.constants";

export function getActivePriceForCycle(
  plan: BillingPlan,
  cycle: BillingCycle,
): BillingPrice | undefined {
  return plan.prices.find((p) => p.billing_cycle === cycle && p.is_active);
}

// export function formatCurrency(price: string, currency: string): string {
//   const amount = parseFloat(price);
//   if (isNaN(amount)) return price;
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: currency.toUpperCase(),
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(amount);
// }
export function formatCurrency(price: string, currency: string): string {
  const amount = parseFloat(price);

  if (isNaN(amount)) return price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getFeatureLabel(key: string): string {
  return (
    FEATURE_LABEL_MAP[key] ??
    key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export function formatFeatureValue(value: string): string {
  const num = parseInt(value, 10);
  if (!isNaN(num)) {
    return new Intl.NumberFormat("en-US").format(num);
  }
  return value;
}

// Combines formatted value + label into a single display string, e.g. "50,000 AI qualification calls/month"
export function buildFeatureDisplayLine(key: string, value: string): string {
  return `${formatFeatureValue(value)} ${getFeatureLabel(key)}`;
}

// Returns integer savings % when paying yearly vs monthly, or null if not computable
export function computeYearlySavingsPct(
  monthlyPrice: string,
  yearlyPrice: string,
): number | null {
  const m = parseFloat(monthlyPrice);
  const y = parseFloat(yearlyPrice);
  if (isNaN(m) || isNaN(y) || m === 0) return null;
  const annualIfMonthly = m * 12;
  return Math.round(((annualIfMonthly - y) / annualIfMonthly) * 100);
}
