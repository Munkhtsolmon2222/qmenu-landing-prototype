import { cn } from '@/lib/utils';

interface Props extends React.PropsWithChildren {
  className?: string;
}

const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={cn('px-3 sm:pb-4 overflow-y-auto relative', className)}>{children}</div>;
};

export default Container;
