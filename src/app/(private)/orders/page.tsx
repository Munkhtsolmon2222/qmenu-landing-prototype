import { GET_PAYLOAD } from '@/actions';
import { Loader } from '@/components/shared';
import { withSuspense } from '@/lib/helpers';
import { CustomerOrders } from './components/CustomerOrders';

interface Props {}

const Page: React.FC<Props> = async () => {
  const { data: paylaod } = await GET_PAYLOAD();

  if (!paylaod) return null;
  return <CustomerOrders payload={paylaod} />;
};

export default withSuspense(Page, <Loader className="h-screen" />);
