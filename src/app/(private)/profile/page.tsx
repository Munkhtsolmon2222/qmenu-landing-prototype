import { GET_CURRENT_CUSTOMER } from '@/actions';
import { Loader } from '@/components/shared';
import { withSuspense } from '@/lib/helpers';
import { Account } from './components';

interface Props {}

const Page: React.FC<Props> = async () => {
  const { data: customer } = await GET_CURRENT_CUSTOMER();

  if (!customer) return null;
  return <Account customer={customer} />;
};

export default withSuspense(Page, <Loader />);
