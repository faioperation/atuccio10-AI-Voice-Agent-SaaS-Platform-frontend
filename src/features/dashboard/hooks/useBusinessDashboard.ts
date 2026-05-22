import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard.api";

export const BUSINESS_DASHBOARD_KEY = ["dashboard", "business-admin"] as const;

export function useBusinessDashboard() {
  return useQuery({
    queryKey: BUSINESS_DASHBOARD_KEY,
    queryFn: dashboardApi.getBusinessDashboard,
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
