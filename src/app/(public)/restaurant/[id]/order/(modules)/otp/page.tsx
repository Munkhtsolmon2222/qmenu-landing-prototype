import { withSuspense } from '@/lib/helpers';
import { Loader } from '@/components/shared';
import { OtpDialog } from './components/OtpDialog';
import { isUserAuthenticated } from '@/actions';

interface Props {}

const Page: React.FC<Props> = async ({}) => {
  const isAuthenticated = await isUserAuthenticated();

  return <OtpDialog isAuthenticated={isAuthenticated} />;
};

export default withSuspense(Page, <Loader className="h-full" />);
