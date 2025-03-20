import { withSuspense } from '@/lib/helpers';
import { Loader } from '@/components/shared';
import { SuccessDialog } from './components/SuccessDialog';
import { GET_ORDER } from '@/actions';
import { Order } from '@/lib/types';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ order?: string }>;
}

const Page: React.FC<Props> = async (props) => {
  const { order: orderId } = await props.searchParams;
  const { id } = await props.params;

  let order: Order | undefined;

  if (orderId) {
    const { data } = await GET_ORDER(orderId);
    order = data;
  }

  return <SuccessDialog id={id} order={order} />;
};

export default withSuspense(Page, <Loader className="h-full" />);
