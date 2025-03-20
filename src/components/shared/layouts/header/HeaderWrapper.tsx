'use client';
import { useNavbar } from '@/lib/providers';
import { cn } from '@/lib/utils';

type Props = React.PropsWithChildren<{ className?: string }>;

export const HeaderWrapper: React.FC<Props> = ({ children, className }) => {
  const { show } = useNavbar();

  return (
    <div
      className={cn(
        'w-full sticky items-center px-5 py-3 rounded-b-xl bg-current-1 border-b h-[65px] md:h-[81px] mb-4 duration-500 z-50',
        show ? 'top-0' : '-top-[65px] md:-top-[81px]',
        className,
      )}
    >
      {children}
    </div>
  );
};
