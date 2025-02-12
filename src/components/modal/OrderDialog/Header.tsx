import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

interface Props extends React.PropsWithChildren {
  onClick?: () => void;
  className?: string;
  buttonClass?: string;
}

const Header: React.FC<Props> = ({
  onClick,
  className,
  buttonClass,
  children,
}) => {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-center bg-background pt-6 pb-4 text-center relative",
        className
      )}
    >
      {onClick && (
        <div
          onClick={onClick}
          className={cn(
            "absolute left-4 top-4 rounded-full border border-border flex items-center justify-center bg-background  cursor-pointer",
            buttonClass
          )}
        >
          <Icons.arrowLeft />
        </div>
      )}
      <div className="font-semibold ml-3">{children}</div>
    </div>
  );
};

export default Header;
