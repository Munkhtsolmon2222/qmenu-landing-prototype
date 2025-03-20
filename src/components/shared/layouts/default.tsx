import { cn } from '@/lib/utils';
import { BottomNav } from './bottom-nav';
import { Footer } from './footer';

interface Props {
  className?: string;
}

type DefaultLayout = React.FC<React.PropsWithChildren<Props>>;

const DefaultLayout: DefaultLayout = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col justify-center h-max w-full items-center', className)}>
      {children}

      <Footer />

      <div className="max-w-[90rem] w-full justify-center items-center">
        <BottomNav />
      </div>
    </div>
  );
};

const DefaultLayoutContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return <div className={cn('w-full h-full mb-20 sm:mb-0', className)}>{children}</div>;
};

export { DefaultLayout, DefaultLayoutContent };
