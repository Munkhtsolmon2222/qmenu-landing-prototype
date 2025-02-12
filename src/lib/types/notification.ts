import { ReactNode } from "react";

export interface INotification {
  pk: string;
  sk: string;
  title: string;
  type: NotificationType;
  data: ReactNode;
  isRead: boolean;
  createdAt: ReactNode;
  actions: INotificationAction[];
}

export enum NotificationActionType {
  P = "P", // Primary
  S = "S", // Secondary
  L = "L", // Link
}

export enum NotificationType {
  WARNING = "WARNING",
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
export interface INotificationAction {
  name: string;
  value: string;
  type: NotificationActionType;
  mutation: string;
  variables: string;
}
