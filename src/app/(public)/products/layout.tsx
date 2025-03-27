import { DefaultLayout, DefaultLayoutContent } from '@/components/shared';
import { ProductHeader } from './components';
import { isUserAuthenticated } from '@/actions';

interface Props extends React.PropsWithChildren {}

const Layout: React.FC<Props> = async ({ children }) => {
  const isAuthenticated = await isUserAuthenticated();

  return (
    <DefaultLayout>
      <ProductHeader isAuthenticated={isAuthenticated} />
      <DefaultLayoutContent>
        <div className="flex flex-col h-max w-full justify-between px-3 z-0 gap-3">{children}</div>
      </DefaultLayoutContent>
    </DefaultLayout>
  );
};

export default Layout;
