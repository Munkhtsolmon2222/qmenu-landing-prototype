import { NavigationlayoutContent, Navigationlayout } from '@/components/shared';
import { RestaurantHeader } from './components';
import { isUserAuthenticated } from '@/actions';

interface Props extends React.PropsWithChildren {}

const Layout: React.FC<Props> = async ({ children }) => {
  const isAuthenticated = await isUserAuthenticated();

  return (
    <Navigationlayout hideBottom>
      <RestaurantHeader isAuthenticated={isAuthenticated} />
      <NavigationlayoutContent>
        <div className="flex flex-col h-max w-full justify-between z-0 gap-3">{children}</div>
      </NavigationlayoutContent>
    </Navigationlayout>
  );
};

export default Layout;
