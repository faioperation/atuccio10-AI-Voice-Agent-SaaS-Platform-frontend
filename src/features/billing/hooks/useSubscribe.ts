import { useMutation } from "@tanstack/react-query";
import { billingApi } from "../api/billing.api";

export function useSubscribe() {
  return useMutation({
    mutationFn: (planPriceId: number) =>
      billingApi.subscribe({ plan_price_id: String(planPriceId) }),
  });
}
