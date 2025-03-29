import { GET_ORDER } from '@/actions';
import { Loader } from '@/components/shared';
import { PAGE_NOT_FOUND } from '@/lib/constant';
import { withSuspense } from '@/lib/helpers';
import { redirect } from 'next/navigation';
import {
  ItemsSection,
  OrderAction,
  OrderRestaurantInfo,
  OrderSection,
  PaymentSection,
} from './components';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ channelId: string }>;
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const { id } = await params;
  const { channelId } = await searchParams;

  const { data: order } = await GET_ORDER(id);
  if (!order || !channelId) return redirect(PAGE_NOT_FOUND);

  return (
    <div className="pt-6 pb-4 px-3 w-full max-w-3xl mx-auto">
      <OrderRestaurantInfo order={order} channelId={channelId} />
      <OrderAction order={order} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <OrderSection order={order} />
        <PaymentSection order={order} />
        <ItemsSection order={order} />
      </div>
    </div>
  );
};

export default withSuspense(Page, <Loader className="h-screen" />);
