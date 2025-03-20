import { cn } from "@/lib/utils";

export const ButtonItem: React.FC<{
  active: boolean;
  title: React.ReactNode;
  onClick: () => void;
  desc?: string;
  className?: string;
  subActive?: boolean;
}> = ({ title, desc, onClick, active = false, className, subActive }) => {
  return (
    <div
      className={cn(
        "flex w-full max-w-24 font-medium cursor-pointer flex-col p-1.5 items-center justify-center rounded-lg",
        className,
        subActive
          ? "bg-current-2 text-white opacity-70"
          : active
          ? "bg-current-2 text-white"
          : "bg-primary-foreground text-primary"
      )}
      onClick={onClick}
    >
      <div className="text-nowrap">{title}</div>
      {desc && <div>{desc}</div>}
    </div>
  );
};
