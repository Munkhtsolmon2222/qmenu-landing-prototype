import { cn } from "@/lib/utils";

interface Wrapper extends React.PropsWithChildren {
  title?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}
const ItemWrapper: React.FC<Wrapper> = ({
  children,
  title,
  className,
  titleClassName,
}) => {
  return (
    <div className={cn("rounded-md px-1", className)}>
      {title && (
        <h1 className={cn("font-medium text-lg px-1", titleClassName)}>
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};
export default ItemWrapper;
