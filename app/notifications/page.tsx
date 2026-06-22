"use client";

import { useState, useEffect } from "react";
import { Notification } from "@/types";
import { notificationApi } from "@/lib/api";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { NotificationList } from "@/components/notification/NotificationList";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const DUMMY_NOTIFICATIONS: Notification[] = [
    {
      id: "1",
      userId: "1",
      type: "mention",
      title: "New Message",
      message: "John sent you a message",
      read: false,
      metadata: null,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "1",
      type: "assignment",
      title: "Task Assigned",
      message: "You have been assigned a new task",
      read: true,
      metadata: null,
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      userId: "1",
      type: "system",
      title: "System Update",
      message: "Application has been updated successfully",
      read: false,
      metadata: null,
      createdAt: new Date().toISOString(),
    },
  ];

  // const fetchNotifications = async () => {
  //   try {
  //     const data = await notificationApi.get<Notification[]>("/notifications");
  //     setNotifications(data);
  //   } catch {
  //     console.error("Failed to fetch notifications");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchNotifications = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setNotifications(DUMMY_NOTIFICATIONS);
    setIsLoading(false);
  };

  useEffect(() => {
    const loadNotifications = async () => {
      await fetchNotifications();
    };
    loadNotifications();
  }, []);

  // const handleMarkAsRead = async (notificationIds: string[]) => {
  //   try {
  //     await notificationApi.post("/notifications/mark-read", {
  //       notificationIds,
  //     });
  //     setNotifications(
  //       notifications.map((n) =>
  //         notificationIds.includes(n.id) ? { ...n, read: true } : n,
  //       ),
  //     );
  //   } catch {
  //     console.error("Failed to mark notifications as read");
  //   }
  // };

  const handleMarkAsRead = async (notificationIds: string[]) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notificationIds.includes(notification.id)
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AppLayout title="Notifications">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </AppLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AppLayout title="Notifications">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <NotificationList
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
