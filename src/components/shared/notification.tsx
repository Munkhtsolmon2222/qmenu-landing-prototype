"use client";
import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Icons } from "./icons";
import { useNotificationContext } from "@/lib/providers/notification.context";
import { useEffect, useState } from "react";
import { INotification } from "@/lib/types";
import { calculateTimeDiffrence } from "@/lib/utils";

export function NotificationDrawer() {
  const [open, setOpen] = useState(false);
  const {
    state: {
      notifications,
      unread: { notification },
    },
    refetch,
  } = useNotificationContext();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Drawer open={open} direction="right">
      <DrawerTrigger asChild>
        <div className={"relative cursor-pointer"}>
          <Icons.bell
            className="stroke-primary-foreground fill-primary-foreground h-5 w-5 md:h-6 md:w-6 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          {notification && (
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
              1
            </div>
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent className="left-0 flex items-end justify-end md:w-3/12 w-8/12 md:ml-[75%] ml-[33%]">
        <div className="h-screen w-full">
          <DrawerHeader>
            <Icons.close onClick={() => setOpen(!open)} />
          </DrawerHeader>
          <section className="w-full bg-background h-screen overflow-scroll">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 gap-4">
                {notifications.map((e) => (
                  <NotificationCard key={e.sk} notification={e} />
                ))}
              </div>
            </div>
          </section>
          <DrawerFooter>
            <DrawerClose asChild></DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface NotificationProps {
  notification: INotification;
}

export default function NotificationCard(props: NotificationProps) {
  const { notification } = props;

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <BellIcon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium">{notification.title}</h3>
          <p className="text-sm text-muted-foreground">{notification.data}</p>
          <p className="text-xs font-medium">
            {calculateTimeDiffrence(new Date(Number(notification.sk)))}
          </p>
        </div>
      </div>
    </div>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
