// ── Stat Metrics ──────────────────────────────────────────────────────────────

export interface StatMetric {
  total: number;
}

export interface ConversionMetric {
  rate: string; // e.g. "90%"
}

export interface DashboardStats {
  total_leads: StatMetric;
  total_calls: StatMetric;
  conversion_rate: ConversionMetric;
  total_appointments: StatMetric;
}

export type TrendDirection = "up" | "down";

export interface PercentageChange {
  total_leads?: number;
  total_calls?: number;
  conversion_rate?: number;
  total_appointments?: number;
}

export interface TrendData {
  total_leads?: TrendDirection;
  total_calls?: TrendDirection;
  conversion_rate?: TrendDirection;
  total_appointments?: TrendDirection;
}

// ── Graphs ────────────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface CallLogsGraph {
  this_week: ChartDataPoint[];
  last_week: ChartDataPoint[];
}

export interface DashboardGraphs {
  call_logs: CallLogsGraph;
}

// ── Recent Data ───────────────────────────────────────────────────────────────

export interface RecentCall {
  id: string | number;
  name: string;
  phone: string;
  location: string;
  duration: string;
  status: string;
}

export type NotificationType = "call" | "lead" | "video" | "meeting" | "appointment" | string;

export interface DashboardNotification {
  id: string | number;
  title: string;
  time: string;
  type?: NotificationType;
}

export interface DashboardRecent {
  calls: RecentCall[];
  notifications: DashboardNotification[];
}

// ── Full Response ─────────────────────────────────────────────────────────────

export interface BusinessDashboardResponse {
  stats: DashboardStats;
  percentage_change: PercentageChange;
  trend: TrendData;
  graphs: DashboardGraphs;
  recent: DashboardRecent;
}
