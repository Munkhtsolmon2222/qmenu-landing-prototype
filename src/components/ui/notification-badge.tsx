import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
const badgeVariants = cva("", {
  variants: {
    variant: {
      default: "bg-destructive",
      secondary: "bg-secondary ",
      destructive: "bg-destructive ",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface NotificationBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  badge: ReactNode | string | number | undefined | null;
}

function NotificationBadge({
  className,
  children,
  ...props
}: NotificationBadgeProps) {
  return (
    <div className={cn(className, "relative cursor-pointer")} {...props}>
      {children}
      <div
        className={
          "absolute top-0.5 h-[6px] w-[6px] right-[6px] border-[0.1px] border-current-2  items-center justify-center bg-current-3 rounded-full transform translate-x-1/2 -translate-y-1/2"
        }
      ></div>
    </div>
  );
}

export { NotificationBadge, badgeVariants };
