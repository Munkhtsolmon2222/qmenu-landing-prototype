"use client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Toast, useToast } from "@/components/ui/use-toast";
import { SystemType } from "./config/constant";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Notification({ ...props }: Toast) {
  const { toast } = useToast();

  toast(props);
}

export const SystemTypeByPartner = {
  mbank: SystemType.MA,
};

export type PartnerSystemType = typeof SystemTypeByPartner;

export const getPartnerToken = (): string => {
  let token = "";

  try {
    token = JSON.parse(localStorage?.getItem("partnerToken") as string);
  } catch {}

  return token;
};

export const setPartnerToken = (token: string): void => {
  try {
    localStorage?.setItem("partnerToken", JSON.parse(token));
  } catch {}
};

export const removePartnerType = (): void => {
  localStorage?.removeItem("partnerToken");
};

export const shuffleArray = <T>(array: T[]) => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const formatTugrug = (value: string | number, locale = "mn-MN") => {
  const amount = typeof value === "string" ? Number(value) : value;

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "MNT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  let formattedAmount = formatter.format(amount);

  formattedAmount = formattedAmount.replace("MNT", "").trim();

  return `${formattedAmount} ₮`;
};

export const updateTitleWithUnreadCount = (
  unreadCount: number,
  originalTitle: string
) => {
  const titlePattern = /^\(\d+\)\s/;
  if (unreadCount > 0) {
    if (titlePattern.test(originalTitle)) {
      document.title = originalTitle.replace(titlePattern, `(${unreadCount}) `);
    } else {
      document.title = `(${unreadCount}) ${originalTitle}`;
    }
  } else {
    document.title = originalTitle.replace(titlePattern, "");
  }
};

export function calculateTimeDiffrence(date: string | Date): string {
  const now = new Date();
  const givenDate = new Date(date);
  const diffInSeconds = Math.floor(
    (now.getTime() - givenDate.getTime()) / 1000
  );

  if (diffInSeconds < 1) {
    return "1 секундийн өмнө";
  } else if (diffInSeconds < 60) {
    return `${diffInSeconds} секундийн өмнө`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} минутийн өмнө`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} цагийн өмнө`;
  } else if (diffInSeconds < 604800) {
    // less than 7 days
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return `${diffInDays} өдрийн өмнө`;
  } else if (diffInSeconds < 2592000) {
    // less than 30 days
    const diffInWeeks = Math.floor(diffInSeconds / 604800);
    return `${diffInWeeks}  долоо хоногийн өмнө`;
  } else if (diffInSeconds < 31536000) {
    // less than 365 days
    const diffInMonths = Math.floor(diffInSeconds / 2592000);
    return `${diffInMonths} сарийн өмнө`;
  } else {
    const diffInYears = Math.floor(diffInSeconds / 31536000);
    return `${diffInYears} жилийн өмнө`;
  }
}

export const getMonths: KeyValuePair[] = [
  {
    key: "1",
    label: "1",
  },
  {
    key: "2",
    label: "2",
  },
  {
    key: "3",
    label: "3",
  },
  {
    key: "4",
    label: "4",
  },
  {
    key: "5",
    label: "5",
  },
  {
    key: "6",
    label: "6",
  },
  {
    key: "7",
    label: "7",
  },
  {
    key: "8",
    label: "8",
  },
  {
    key: "9",
    label: "9",
  },
  {
    key: "10",
    label: "10",
  },
  {
    key: "11",
    label: "11",
  },
  {
    key: "12",
    label: "12",
  },
];

export interface KeyValuePair {
  key;
  label;
}

export const getDays: KeyValuePair[] = [
  {
    key: "1",
    label: "1",
  },
  {
    key: "2",
    label: "2",
  },
  {
    key: "3",
    label: "3",
  },
  {
    key: "4",
    label: "4",
  },
  {
    key: "5",
    label: "5",
  },
  {
    key: "6",
    label: "6",
  },
  {
    key: "7",
    label: "7",
  },
  {
    key: "8",
    label: "8",
  },
  {
    key: "9",
    label: "9",
  },
  {
    key: "10",
    label: "10",
  },
  {
    key: "11",
    label: "11",
  },
  {
    key: "12",
    label: "12",
  },
];

export function getKey(): number {
  return Math.floor(Math.random() * (30 - 1 + 1));
}

export const setDateTime = (
  hours: number,
  minute: number,
  second: number,
  date?: Date,
  millseconds?: number
) => {
  const futureDate = date ? new Date(date) : new Date();
  futureDate.setHours(hours);
  futureDate.setMinutes(minute);
  futureDate.setSeconds(second);

  if (millseconds) futureDate.setMilliseconds(millseconds);
  return futureDate;
};
