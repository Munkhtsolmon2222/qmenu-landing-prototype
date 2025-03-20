'use client';
import { DialogTitle, Icons } from '@/components/general';
import { SheetTitle } from '@/components/ui';
import { useMediaQuery } from '@/lib/hooks';
import { cn } from '@/lib/utils';

interface Props extends React.PropsWithChildren {
  onClick?: () => void;
  className?: string;
  buttonClass?: string;
}

const Header: React.FC<Props> = ({ onClick, className, buttonClass, children }) => {
  const { device } = useMediaQuery();

  const Title = device === 'mobile' ? DialogTitle : SheetTitle;

  return (
    <Title
      className={cn(
        'w-full flex items-center justify-center bg-background pt-6 pb-4 text-center relative',
        className,
      )}
    >
      {onClick && (
        <div
          onClick={onClick}
          className={cn(
            'absolute left-4 top-4 rounded-full border border-border flex items-center justify-center bg-background cursor-pointer p-2',
            buttonClass,
          )}
        >
          <Icons.arrowLeft />
        </div>
      )}
      <div className="font-semibold ml-3">{children}</div>
    </Title>
  );
};

export default Header;
