'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { INotification } from '../types';
import { updateTitleWithUnreadCount } from '../utils';
import { useAction } from '../hooks';
import { GET_NOTIFICATIONS, READ_NOTIFICATION } from '@/actions';

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
  nextToken: '',
  unread: {
    order: 0,
    notification: 0,
    total: 0,
  },
  hasMore: true,
};

interface NotificationContextType {
  state: NotificationsState;
  getNotifications: (options: any) => void;
  refetch: () => void;
  markAsRead: (item: INotification) => void;
}

const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }: React.PropsWithChildren) => {
  const [state, setState] = useState<NotificationsState>(initialState);

  useEffect(() => {
    const originalTitle = document.title;
    updateTitleWithUnreadCount(state.unread.notification, originalTitle);
  }, [state.unread]);

  const { action: getNotifications, loading: loadingGetNotifications } = useAction(
    GET_NOTIFICATIONS,
    10,
    state.nextToken ?? '',
    {
      onSuccess(noti) {
        if (state.hasMore && noti) {
          if ((noti?.notifications ?? []).length >= 10) {
            setState((prevState) => ({
              ...prevState,
              nextToken: noti.nextToken,
              notifications: prevState.notifications.concat(
                noti.notifications.filter(
                  (item) => !prevState.notifications.find((e) => e.sk === item.sk),
                ),
              ),
              unread: {
                order: prevState.unread.order,
                notification: noti?.notifications?.filter((e) => !e.isRead).length,
                total:
                  prevState.unread.order + noti?.notifications?.filter((e) => !e.isRead).length,
              },
              hasMore: true,
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              notifications: prevState.notifications.concat(
                noti.notifications.filter(
                  (item) => !prevState.notifications.find((e) => e.sk === item.sk),
                ),
              ),
              unread: {
                order: prevState.unread.order,
                notification: noti?.notifications?.filter((e) => !e.isRead).length,
                total:
                  prevState.unread.order + noti?.notifications?.filter((e) => !e.isRead).length,
              },
              hasMore: false,
            }));
          }
        }
      },
    },
  );

  const { action: readNotification, loading: loadingMarkAsRead } = useAction(READ_NOTIFICATION, {
    lazy: true,
  });

  const markAsRead = (item: INotification) => {
    const sk = item.sk;
    if (!item.isRead) {
      readNotification(sk);
      const notification = state.notifications.find((e) => e.sk === sk);
      if (notification) {
        const updatedNotification = { ...notification, isRead: true };
        const updatedNotifications = state.notifications.map((e) =>
          e.sk === sk ? updatedNotification : e,
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
    refetch: getNotifications,
    markAsRead,
    setState,
  };

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
};
