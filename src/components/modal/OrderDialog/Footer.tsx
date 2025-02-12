import { ButtonProps } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { cn } from "@/lib/utils";

interface Props extends React.PropsWithChildren, ButtonProps {
  containerClassName?: string;
  loading?: boolean;
  containerChildren?: React.ReactNode;
}

const Footer: React.FC<Props> = ({
  children,
  className,
  containerClassName,
  containerChildren,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "bg-background p-3 m-0 mt-auto rounded-t-2xl border border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]",
        containerClassName
      )}
    >
      {containerChildren}
      <LoadingButton
        type="submit"
        {...rest}
        className={cn(
          "w-full flex py-6 justify-between items-center gap-2 text-white bg-current-2 rounded-3xl px-5 hover:bg-current-3",
          className
        )}
      >
        {children}
      </LoadingButton>
    </div>
  );
};

export default Footer;
