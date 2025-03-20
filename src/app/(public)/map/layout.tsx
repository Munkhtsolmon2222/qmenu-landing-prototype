import { DefaultLayout, DefaultLayoutContent } from '@/components/shared';
import { MapHeader } from './components/MapHeader';

type Props = React.PropsWithChildren;

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <DefaultLayout>
      <MapHeader />
      <DefaultLayoutContent className="mb-0">{children}</DefaultLayoutContent>
    </DefaultLayout>
  );
};

export default Layout;
