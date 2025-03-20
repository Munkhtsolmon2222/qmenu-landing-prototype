import { withSuspense } from '@/lib/helpers';
import {
  RestaurantAbout,
  RestaurantDialogWrapper,
  RestaurantFooter,
  RestaurantLoader,
  RestaurantTabs,
} from '../components';
import { isUserAuthenticated } from '@/actions';
import { GET_PARTICIPANT } from '@/actions';

interface Props extends React.PropsWithChildren {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    tab?: string;
  }>;
}

const Layout: React.FC<Props> = async ({ params, children }) => {
  const { id } = await params;

  const { data } = await GET_PARTICIPANT(id);
  const isAuthenticated = await isUserAuthenticated();

  if (!data) return null;
  return (
    <div className="w-full max-w-3xl xl:max-w-full xl:px-10 sm:mt-2 mx-auto px-0 sm:px-4 bg-background flex flex-col sm:gap-5">
      <RestaurantAbout participant={data} isAuthenticated={isAuthenticated} />
      <RestaurantTabs participant={data} isAuthenticated={isAuthenticated} />
      <RestaurantFooter participant={data} isAuthenticated={isAuthenticated} />
      <RestaurantDialogWrapper participant={data}>{children}</RestaurantDialogWrapper>
    </div>
  );
};

export default withSuspense(Layout, <RestaurantLoader />);
