import { Loader, Navigationlayout, NavigationlayoutContent } from '@/components/shared';
import { withSuspense } from '@/lib/helpers';
import { LoginHeader } from './components';

interface Props extends React.PropsWithChildren {}

const Layout: React.FC<Props> = async ({ children }) => {
  return (
    <Navigationlayout hideFooter className="flex-1">
      <LoginHeader />

      <NavigationlayoutContent>{children}</NavigationlayoutContent>
    </Navigationlayout>
  );
};

export default withSuspense(Layout, <Loader className="h-screen" />);
