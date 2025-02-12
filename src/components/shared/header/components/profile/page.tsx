"use client";
import { Icons } from "@/components/shared/icons";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
const themeIcons: Record<string, React.ReactNode> = {
  light: <Icons.sun />,
  dark: <Icons.moon />,
  system: <Icons.laptopMinimal />,
};

export const Profile = () => {
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  return (
    <div className="absolute top-0 w-full h-16 z-50 bg-background px-3 flex items-center justify-between">
      <ItemWrapper onClick={() => router.back()}>
        <Icons.chevronLeft />
      </ItemWrapper>
      <ItemWrapper
        onClick={() =>
          setTheme(
            theme === "dark" ? "system" : theme === "system" ? "light" : "dark"
          )
        }
      >
        {themeIcons[theme]}
      </ItemWrapper>
    </div>
  );
};

const ItemWrapper: React.FC<
  React.PropsWithChildren & {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  }
> = ({ children, className, onClick }) => {
  return (
    <div
      onClick={(e) => onClick?.(e)}
      className={cn(
        "cursor-pointer bg-primary-foreground p-2 rounded-full flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};
