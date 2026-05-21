import { apiClient } from "@/lib/api/client";
import type { BillingPlansResponse, SubscribeRequest, SubscribeResponse } from "./billing.types";

export const billingApi = {
  getPlans: (): Promise<BillingPlansResponse> =>
    apiClient.get<BillingPlansResponse>("/billing/plans/"),

  subscribe: (data: SubscribeRequest): Promise<SubscribeResponse> =>
    apiClient.post<SubscribeResponse>("/billing/subscribe/", data),
};
