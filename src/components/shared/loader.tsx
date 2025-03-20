import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';

interface Props {
  className?: string;
  spinnerClassName?: string;
}

export const Loader: React.FC<Props> = ({ className, spinnerClassName }) => {
  return (
    <div className={cn('flex justify-center items-center', className)}>
      <LoaderIcon className={cn('animate-spin text-current-3', spinnerClassName)} />
    </div>
  );
};
