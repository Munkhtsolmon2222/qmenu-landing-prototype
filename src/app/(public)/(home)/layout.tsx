import { FilterControl, Navigationlayout, NavigationlayoutContent } from '@/components/shared';
import { Separator } from '@/components/ui';
import { BranchFilters, Categories, HomeHeader } from './components';
import { isUserAuthenticated } from '@/actions';

interface Props extends React.PropsWithChildren {}

const Layout: React.FC<Props> = async ({ children }) => {
  const isAuthenticated = await isUserAuthenticated();

  return (
    <Navigationlayout>
      <HomeHeader isAuthenticated={isAuthenticated} />
      <NavigationlayoutContent>
        <Categories />
        <Separator className="mt-2" />
        <div className="flex flex-col h-max w-full justify-between px-3 z-0">
          <BranchFilters />
          <FilterControl />
          {children}
        </div>
      </NavigationlayoutContent>
    </Navigationlayout>
  );
};

export default Layout;
