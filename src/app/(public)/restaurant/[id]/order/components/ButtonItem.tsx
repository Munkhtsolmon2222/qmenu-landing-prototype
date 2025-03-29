import { cn } from '@/lib/utils';

export const ButtonItem: React.FC<{
  active: boolean;
  title: React.ReactNode;
  onClick: () => void;
  desc?: string;
  className?: string;
  subActive?: boolean;
  disabled?: boolean;
}> = ({ title, desc, disabled, onClick, active = false, className, subActive }) => {
  return (
    <div
      className={cn(
        'flex w-full max-w-24 font-medium cursor-pointer flex-col p-1.5 items-center justify-center rounded-lg',
        className,
        disabled && 'cursor-not-allowed opacity-50',
        subActive
          ? disabled
            ? 'bg-current-2 text-white'
            : 'bg-current-2 text-white opacity-70'
          : active
          ? disabled
            ? ''
            : 'bg-current-2 text-white'
          : disabled
          ? 'text-primary'
          : 'bg-primary-foreground text-primary',
      )}
      onClick={onClick}
    >
      <div className="text-nowrap">{title}</div>
      {desc && <div>{desc}</div>}
    </div>
  );
};
