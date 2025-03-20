import { GET_CURRENT_CUSTOMER } from '@/actions';
import { ChildWrapper, ProfileHeader, ProfileMenu } from './components';
import { Loader, Navigationlayout, NavigationlayoutContent } from '@/components/shared';
import { withSuspense } from '@/lib/helpers';
import { redirect } from 'next/navigation';
import { PAGE_HOME } from '@/lib/constant';

interface Props extends React.PropsWithChildren {}

const Layout: React.FC<Props> = async ({ children }) => {
  const { data: customer } = await GET_CURRENT_CUSTOMER();

  if (!customer) redirect(PAGE_HOME);

  return (
    <Navigationlayout hideFooter className="flex-1">
      <ProfileHeader />

      <NavigationlayoutContent className="h-full mb-10 min-h-full flex-1 sm:mb-0 p-2 grid gap-4 grid-cols-1 md:grid-cols-4">
        <ProfileMenu customer={customer} />

        <ChildWrapper>{children}</ChildWrapper>
      </NavigationlayoutContent>
    </Navigationlayout>
  );
};

export default withSuspense(Layout, <Loader className="h-screen" />);
