import { MoreVertical, Phone, UserPlus, Video, CalendarCheck, Bell, BellOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DashboardNotification, NotificationType } from "@/features/dashboard/api/dashboard.types";

interface NotificationIconConfig {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

function getNotificationIcon(type?: NotificationType): NotificationIconConfig {
  switch (type) {
    case "call":        return { icon: Phone,         iconBg: "#E9FBF1", iconColor: "#16A34A" };
    case "lead":        return { icon: UserPlus,      iconBg: "#F3E8FF", iconColor: "#9333EA" };
    case "video":
    case "meeting":     return { icon: Video,         iconBg: "#EBF3FF", iconColor: "#1A6BDC" };
    case "appointment": return { icon: CalendarCheck, iconBg: "#DBEAFE", iconColor: "#1A6BDC" };
    default:            return { icon: Bell,           iconBg: "#F1F4F9", iconColor: "#64748B" };
  }
}

function SkeletonItem() {
  return (
    <div className="flex items-start gap-3 px-5 py-4">
      <div className="w-9 h-9 rounded-full bg-[#F1F4F9] animate-pulse flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1 pt-1">
        <div className="h-3 w-3/4 bg-[#F1F4F9] rounded animate-pulse" />
        <div className="h-2.5 w-1/2 bg-[#F1F4F9] rounded animate-pulse" />
      </div>
    </div>
  );
}

interface NotificationsProps {
  notifications?: DashboardNotification[];
  isLoading?: boolean;
}

export default function Notifications({ notifications, isLoading }: NotificationsProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-5 py-[18px] flex items-center justify-between border-b border-[#F1F4F9]">
        <h3 className="text-[15px] font-bold text-[#0C1824]">Notification</h3>
        <button className="text-[#94A3B8] hover:text-gray-600 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Items */}
      <div className="flex flex-col divide-y divide-[#F1F4F9]">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonItem key={i} />)
        ) : !notifications || notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <BellOff size={26} className="text-[#CBD5E1]" strokeWidth={1.5} />
            <p className="text-[13px] text-[#94A3B8] font-medium">No notifications</p>
          </div>
        ) : (
          notifications.map((notif) => {
            const { icon: Icon, iconBg, iconColor } = getNotificationIcon(notif.type);
            return (
              <div
                key={notif.id}
                className="flex items-start gap-3 px-5 py-4 hover:bg-[#F8FAFC] cursor-pointer transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: iconBg }}
                >
                  <Icon size={16} style={{ color: iconColor }} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[13px] font-semibold text-[#0C1824] leading-snug truncate">
                    {notif.title}
                  </span>
                  <span className="text-[11px] text-[#94A3B8]">{notif.time}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
