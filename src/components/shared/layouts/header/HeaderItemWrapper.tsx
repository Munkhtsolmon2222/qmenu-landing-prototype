import { cn } from '@/lib/utils';

type Props = React.HTMLProps<HTMLDivElement> & {
  loading?: boolean;
};

export const HeaderItemWrapper: React.FC<Props> = ({ className, loading, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        'relative cursor-pointer bg-background p-2 rounded-full flex items-center justify-center hover:shadow-md hover:border-border border border-transparent',
        loading && 'opacity-45',
        className,
      )}
    />
  );
};
