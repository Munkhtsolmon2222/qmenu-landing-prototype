import { cn } from '@/lib/utils';

interface Props {
  name: string;
  icon?: React.ReactNode;
  active?: boolean;
  plain?: boolean;
  className?: string;
}

export const BranchTypeCard: React.FC<Props> = ({ icon, name, active, className }) => {
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center border px-5 py-2 gap-1 text-sm md:text-base',
        className,
        active ? 'bg-current-2 text-background dark:text-primary' : 'bg-current-1',
      )}
    >
      <div className={active ? '[&>*]:fill-primary-foreground' : ''}>{icon}</div>
      <p className="text-center font-semibold text-nowrap">{name}</p>
    </div>
  );
};
