import { useQuery } from "@tanstack/react-query";
import { billingApi } from "../api/billing.api";
import { BILLING_QUERY_KEYS } from "../constants/pricing.constants";

export function useBillingPlans() {
  return useQuery({
    queryKey: BILLING_QUERY_KEYS.plans,
    queryFn: billingApi.getPlans,
    staleTime: 5 * 60 * 1000, // 5 minutes — pricing data changes rarely
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
