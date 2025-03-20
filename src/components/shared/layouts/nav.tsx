import { cn } from '@/lib/utils';
import { BottomNav } from './bottom-nav';
import { Footer } from './footer';

interface Props {
  hideBottom?: boolean;
  hideFooter?: boolean;
  className?: string;
}

type NavigationLayout = React.FC<React.PropsWithChildren<Props>>;

const Navigationlayout: NavigationLayout = ({ hideFooter, children, hideBottom, className }) => {
  return (
    <div className={cn('flex flex-col justify-center h-max w-full items-center', className)}>
      {children}

      {!hideFooter && <Footer />}

      {!hideBottom && (
        <div className="max-w-[90rem] w-full justify-center items-center">
          <BottomNav />
        </div>
      )}
    </div>
  );
};

const NavigationlayoutContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('flex max-w-[90rem] flex-col w-full h-max min-h-screen', className)}>
      {children}
    </div>
  );
};

export { Navigationlayout, NavigationlayoutContent };
