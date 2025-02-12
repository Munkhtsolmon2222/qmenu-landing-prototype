"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { READ_NOTIFICATION } from "@/graphql/mutation/notification";
import { GET_NOTIFICATIONS } from "@/graphql/query";
import { INotification } from "../types";
import { updateTitleWithUnreadCount } from "../utils";

interface NotificationsState {
  notifications: INotification[];
  nextToken: string | null;
  hasMore: boolean;
  unread: Unread;
}

interface Unread {
  order: number;
  notification: number;
  total: number;
}

const initialState = {
  notifications: [],
  nextToken: "",
  unread: {
    order: 0,
    notification: 0,
    total: 0,
  },
  hasMore: true,
};

interface NotificationContextType {
  state: NotificationsState;
  getNotifications: (options) => void;
  refetch: () => void;
  markAsRead: (item: INotification) => void;
}

const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType
);

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [state, setState] = useState<NotificationsState>(initialState);

  useEffect(() => {
    const originalTitle = document.title;
    updateTitleWithUnreadCount(state.unread.notification, originalTitle);
  }, [state.unread]);

  const [getNotifications, { loading: loadingGetNotifications }] =
    useLazyQuery<{
      getNotifications: { notifications: INotification[]; nextToken: string };
    }>(GET_NOTIFICATIONS, {
      fetchPolicy: "network-only",
      variables: {
        limit: 10,
        nextToken: state.nextToken,
      },
      onCompleted(data) {
        if (state.hasMore) {
          const noti = data?.getNotifications;
          if (noti?.notifications?.length >= 10) {
            setState((prevState) => ({
              ...prevState,
              nextToken: noti.nextToken,
              notifications: prevState.notifications.concat(
                noti.notifications.filter(
                  (item) =>
                    !prevState.notifications.find((e) => e.sk === item.sk)
                )
              ),
              unread: {
                order: prevState.unread.order,
                notification: noti?.notifications?.filter((e) => !e.isRead)
                  .length,
                total:
                  prevState.unread.order +
                  noti?.notifications?.filter((e) => !e.isRead).length,
              },
              hasMore: true,
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              notifications: prevState.notifications.concat(
                noti.notifications.filter(
                  (item) =>
                    !prevState.notifications.find((e) => e.sk === item.sk)
                )
              ),
              unread: {
                order: prevState.unread.order,
                notification: noti?.notifications?.filter((e) => !e.isRead)
                  .length,
                total:
                  prevState.unread.order +
                  noti?.notifications?.filter((e) => !e.isRead).length,
              },
              hasMore: false,
            }));
          }
        }
      },
    });

  const refetch = () =>
    getNotifications({
      variables: { limit: 10, nextToken: state.nextToken },
    });

  const [readNotification, { loading: loadingMarkAsRead }] =
    useMutation(READ_NOTIFICATION);

  const markAsRead = (item: INotification) => {
    const sk = item.sk;
    if (!item.isRead) {
      readNotification({
        variables: { sk },
      });
      const notification = state.notifications.find((e) => e.sk === sk);
      if (notification) {
        const updatedNotification = { ...notification, isRead: true };
        const updatedNotifications = state.notifications.map((e) =>
          e.sk === sk ? updatedNotification : e
        );
        setState((prevState) => ({
          ...prevState,
          notifications: updatedNotifications,
        }));
      }
    }
  };

  const contextValue = {
    state,
    loadingGetNotifications,
    loadingMarkAsRead,
    getNotifications,
    refetch,
    markAsRead,
    setState,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
