"use client";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        lg: "h-10 w-10 min-w-10 min-h-10",
        md: "h-8 w-8 min-w-8 min-h-8",
        sm: "h-5 w-5 min-w-5 min-h-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> &
    VariantProps<typeof avatarVariants>
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    style={{
      fontSize: size === "sm" ? "0.5rem" : size === "md" ? "0.75rem" : "1rem",
    }}
    ref={ref}
    className={cn(avatarVariants({ className, size }), className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const avatarStackVariants = cva("flex", {
  variants: {
    variant: {
      default: "gap-1",
      stack:
        "hover:space-x-1.5 -space-x-2.5 rtl:space-x-reverse cursor-pointer",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AvatarType {
  name: string;
  url?: string;
  className?: string;
  wrapperClassName?: string;
  children?: React.ReactNode;
  tooltipChildren?: React.ReactNode;
}

export interface AvatarStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantProps<typeof avatarVariants>, `size`>,
    VariantProps<typeof avatarStackVariants> {
  id: string;
  avatars: AvatarType[];
  maxAvatarsAmount?: number;
}

const colors = [
  "bg-rose-400",
  "bg-emerald-400",
  "bg-purple-400",
  "bg-blue-400",
  "bg-orange-400",
  "bg-green-400",
  "bg-red-400",
  "bg-indigo-400",
  "bg-green-400",
  "bg-pink-400",
  "bg-yellow-400",
  "bg-gray-400",
  "bg-sky-400",
];

function AvatarStack({
  id,
  className,
  avatars,
  variant,
  size,
  maxAvatarsAmount = 4,
  ...props
}: AvatarStackProps) {
  const limitedAvatars = avatars.slice(0, maxAvatarsAmount);
  return (
    <div className={cn(avatarStackVariants({ variant }), className)} {...props}>
      {limitedAvatars.slice(0, maxAvatarsAmount).map((avatar, index) => (
        <TooltipProvider key={`${id}-${index}`}>
          <Tooltip open={avatar.name ? undefined : false}>
            <TooltipTrigger asChild>
              <Avatar size={size} className={cn(avatar.wrapperClassName)}>
                <AvatarImage src={avatar.url} />
                <AvatarFallback
                  className={cn(colors[index], "text-white", avatar.className)}
                >
                  {avatar.children ??
                    avatar.name
                      .split(" ")
                      .reduce((acc, subName) => acc + subName[0], "")}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              {avatar.tooltipChildren ?? <p>{avatar.name}</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      {limitedAvatars.length < avatars.length && (
        <Avatar size={size}>
          <AvatarFallback className="text-primary bg-gray-300 dark:bg-gray-500">
            +{avatars.length - limitedAvatars.length}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export { AvatarStack };
