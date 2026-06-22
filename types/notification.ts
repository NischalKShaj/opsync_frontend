export interface Notification {
  id: string;
  userId: string;
  type: "mention" | "assignment" | "comment" | "system";
  title: string;
  message: string;
  read: boolean;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface MarkAsReadRequest {
  notificationIds: string[];
}

export interface NotificationPreferences {
  userId: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  mentionEnabled: boolean;
  assignmentEnabled: boolean;
  commentEnabled: boolean;
}
