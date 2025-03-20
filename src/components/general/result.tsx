import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './button/button';

interface Action extends ButtonProps {
  name: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  path?: string;
  className?: string;
}

type Props = {
  title: string;
  className?: string;
  subtitle?: string;
  actions?: Action[];
};

export const Result: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  subtitle,
  className,
  actions,
  children,
}) => {
  return (
    <div className={cn('flex-1 flex justify-center items-center flex-col gap-2', className)}>
      <div className="opacity-50 text-center font-medium text-lg">{title}</div>
      {subtitle && <div className="opacity-50 text-center font-normal text-sm">{subtitle}</div>}
      {children}
      {actions && (
        <div className="flex gap-2 mt-4">
          {actions.map(({ className, ...action }, index) => {
            if (action.path) {
              return (
                <Link key={index} href={action.path}>
                  <Button
                    className={cn('font-normal text-sm hover:underline', className)}
                    {...action}
                  >
                    {action.name}
                  </Button>
                </Link>
              );
            }

            return (
              <Button
                key={index}
                onClick={(e) => action.onClick?.(e)}
                className={cn('font-normal text-sm hover:underline', className)}
                {...action}
              >
                {action.name}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};
