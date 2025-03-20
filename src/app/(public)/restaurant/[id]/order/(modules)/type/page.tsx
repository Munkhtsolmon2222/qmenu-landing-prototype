import { withSuspense } from '@/lib/helpers';
import { Loader } from '@/components/shared';
import { TypeDialog } from './components/TypeDialog';
import { isUserAuthenticated } from '@/actions';

interface Props {}

const Page: React.FC<Props> = async ({}) => {
  const isAuthenticated = await isUserAuthenticated();

  return <TypeDialog isAuthenticated={isAuthenticated} />;
};

export default withSuspense(Page, <Loader className="h-full" />);
