import { Loader, Navigationlayout, NavigationlayoutContent } from '@/components/shared';
import { withSuspense } from '@/lib/helpers';
import { OrdersHeader } from './components/OrdersHeader';
import { CustomApolloProvider } from '@/lib/providers';

interface Props extends React.PropsWithChildren {}

const Layout: React.FC<Props> = async ({ children }) => {
  return (
    <Navigationlayout hideFooter className="flex-1">
      <OrdersHeader />

      <NavigationlayoutContent>
        <CustomApolloProvider loader={<Loader className="h-screen" />}>
          {children}
        </CustomApolloProvider>
      </NavigationlayoutContent>
    </Navigationlayout>
  );
};

export default withSuspense(Layout, <Loader className="h-screen" />);
