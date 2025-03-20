import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';

interface Props {
  className?: string;
}

export const Spinner: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex justify-center items-center', className)}>
      <LoaderIcon className="animate-spin" />
    </div>
  );
};
