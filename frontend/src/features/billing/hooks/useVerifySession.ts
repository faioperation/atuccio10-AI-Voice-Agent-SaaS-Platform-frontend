import { useQuery } from "@tanstack/react-query";
import { billingApi } from "../api/billing.api";

export function useVerifySession(sessionId: string | null) {
  return useQuery({
    queryKey: ["billing", "session", sessionId],
    queryFn: () => billingApi.verifySession(sessionId!),
    enabled: !!sessionId,
    retry: 1,
    staleTime: Infinity,
  });
}
