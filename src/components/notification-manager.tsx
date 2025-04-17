"use client";
import { Notification } from "./notification";
import { useAuth } from "@/providers/auth-provider";

export function NotificationManager() {
  const { alert, clearAlert } = useAuth();

  if (!alert.type || !alert.message) return null;

  return (
    <Notification
      type={alert.type}
      message={alert.message}
      onClose={clearAlert}
    />
  );
}
