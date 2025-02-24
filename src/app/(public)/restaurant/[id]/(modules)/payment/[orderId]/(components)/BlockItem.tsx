import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";

const BlockItem: React.FC<
  React.PropsWithChildren<{
    className?: string;
    active?: boolean;
    onClick?: () => void;
  }>
> = ({ children, className, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "mx-3 bg-background p-4 rounded-md overflow-hidden",
        active && "border-2 border-primary",
        className
      )}
    >
      {active && (
        <div className="absolute top-2 left-2 w-5 h-5 border-2 rounded-full flex items-center justify-center border-primary bg-primary">
          <Icons.check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      {children}
    </div>
  );
};
export default BlockItem;
