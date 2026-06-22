"use client";

import { Notification } from "@/types";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (notificationIds: string[]) => void;
}

export function NotificationList({
  notifications,
  onMarkAsRead,
}: NotificationListProps) {
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "mention":
        return <AlertCircle className="w-5 h-5 text-[#ffaa00]" />;
      case "assignment":
        return <CheckCircle className="w-5 h-5 text-[#00ff88]" />;
      case "comment":
        return <Info className="w-5 h-5 text-[#00f0ff]" />;
      default:
        return <Bell className="w-5 h-5 text-[#ff00ff]" />;
    }
  };

  const unreadNotifications = notifications.filter((n) => !n.read);

  return (
    <div className="space-y-2">
      {notifications.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No notifications</div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              notification.read
                ? "bg-white/5 border-[#2a2a3e] hover:border-[#2a2a3e]/50"
                : "bg-gradient-to-r from-[#00f0ff]/10 to-[#ff00ff]/10 border-[#00f0ff]/50 hover:border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-400">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
      {unreadNotifications.length > 0 && (
        <div className="mt-4">
          <Button
            onClick={() => onMarkAsRead(unreadNotifications.map((n) => n.id))}
            variant="outline"
            className="w-full bg-transparent border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300"
          >
            Mark all as read
          </Button>
        </div>
      )}
    </div>
  );
}
