'use client';
import { PAGE_PROFILE } from '@/lib/constant';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface Props extends React.PropsWithChildren {}

export const ChildWrapper: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className={cn('pb-10 md:col-span-3', pathname === PAGE_PROFILE && 'hidden md:block')}>
      {children}
    </div>
  );
};
