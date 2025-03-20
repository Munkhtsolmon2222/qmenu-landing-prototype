import { isUserAuthenticated } from '@/actions';
import { withSuspense } from '@/lib/helpers';
import { Loader } from '@/components/shared';
import { UserDialog } from './components/UserDialog';

interface Props {}

const Page: React.FC<Props> = async ({}) => {
  const isAuthenticated = await isUserAuthenticated();

  return <UserDialog isAuthenticated={isAuthenticated} />;
};

export default withSuspense(Page, <Loader className="h-full" />);
