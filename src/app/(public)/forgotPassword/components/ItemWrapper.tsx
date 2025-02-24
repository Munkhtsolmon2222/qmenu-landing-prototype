import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

const ItemWrapper: React.FC<
  React.PropsWithChildren<{
    title?: string;
    className?: string;
    titleClassName?: string;
    error?: FieldError;
    onClick?: () => void;
  }>
> = ({ title, children, className, titleClassName, error, onClick }) => {
  return (
    <div
      className={cn("flex flex-col gap-2 px-2 w-full", className)}
      onClick={() => onClick?.()}
    >
      {title && (
        <div
          className={cn("font-medium mb-1 text-secondary-text", titleClassName)}
        >
          {title}
        </div>
      )}
      {children}
      {error && <div className="text-current-3 text-sm">{error.message}</div>}
    </div>
  );
};
export default ItemWrapper;
