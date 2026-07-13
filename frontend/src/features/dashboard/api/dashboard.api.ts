import { apiClient } from "@/lib/api/client";
import type { BusinessDashboardResponse } from "./dashboard.types";

export const dashboardApi = {
  getBusinessDashboard: (): Promise<BusinessDashboardResponse> =>
    apiClient.get<BusinessDashboardResponse>("/dashboard/business-admin/"),
};
