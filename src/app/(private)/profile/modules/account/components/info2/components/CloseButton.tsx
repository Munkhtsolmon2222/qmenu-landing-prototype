import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  onClick?: () => void;
};

const CloseButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div
      onClick={() => onClick?.()}
      className={cn(
        "group absolute right-3 cursor-pointer top-3 bg-primary-foreground rounded-full p-1 z-50",
        className
      )}
    >
      <Icons.close className="transition-all opacity-50 h-5 w-5 group-hover:opacity-100" />
    </div>
  );
};
export default CloseButton;
