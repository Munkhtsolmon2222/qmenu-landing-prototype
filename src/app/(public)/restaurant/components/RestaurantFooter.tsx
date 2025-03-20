'use client';
import { Icons } from '@/components/general';
import { OrderDialog } from '@/components/shared';
import {
  PAGE_ORDER,
  PAGE_ORDER_BASKET,
  PAGE_ORDER_USER,
  PAGE_RESTAURANT,
  PAGE_TABLE_ORDER,
} from '@/lib/constant';
import { useMediaQuery } from '@/lib/hooks';
import { useRestaurantStore } from '@/lib/providers';
import { OrderInput, OrderType } from '@/lib/types';
import { useTranslation } from 'react-i18next';
import { RestaurantProps } from '../types';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';

interface Props extends RestaurantProps {}

export const RestaurantFooter: React.FC<Props> = ({ participant, isAuthenticated }) => {
  const { total, totalPrice, items, setStore } = useRestaurantStore();
  const { device } = useMediaQuery();
  const { t } = useTranslation();
  const router = useRouter();

  const onClickOrder = () => {
    const tableOrder = items.length < 1 && device === 'mobile';
    let path = `${PAGE_RESTAURANT}/${participant.id}/${PAGE_ORDER}/${PAGE_ORDER_BASKET}`;

    if (tableOrder) {
      setStore((set) =>
        set({
          input: { type: OrderType.TableOrder } as OrderInput,
          inputParticipants: [],
        }),
      );

      if (isAuthenticated)
        path = `${PAGE_RESTAURANT}/${participant.id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`;
      else path = `${PAGE_RESTAURANT}/${participant.id}/${PAGE_ORDER}/${PAGE_ORDER_USER}`;
    }

    nProgress.start();
    router.push(path);
  };

  if (device === 'mobile')
    return (
      <OrderDialog.Footer
        onClick={onClickOrder}
        containerClassName="mx-auto inset-x-0 -bottom-1 z-50 fixed"
      >
        {items.length > 0 ? (
          <>
            <div className="flex items-center gap-1 text-white">
              <Icons.shoppingCart className="w-5 h-5" />
              <span>
                ( {total} ) {t('Order')}
              </span>
            </div>
            <span className="font-medium text-white">{totalPrice.toLocaleString()} MNT</span>
          </>
        ) : (
          <span className="text-white block mx-auto"> {t('Table order')}</span>
        )}
      </OrderDialog.Footer>
    );

  if (!participant.orderable) return <></>;

  return (
    <div
      onClick={onClickOrder}
      className={`fixed bottom-6 right-6 flex items-center justify-center z-50 rounded-full p-3 dissolve drop-shadow-3xl cursor-pointer ${
        total > 0 ? 'bg-primary-foreground' : 'bg-current-2'
      }`}
    >
      {total > 0 && (
        <div className="flex items-center justify-center h-5 w-5 bg-current-2 fixed bottom-14 right-5 rounded-full">
          <div className="text-white text-sm">{total}</div>
        </div>
      )}
      <span className="absolute h-7 w-7 rounded-full animate-dissolve z-50" />
      <Icons.shoppingCart className={`${total > 0 ? 'text-current-2' : 'text-white'}`} />
    </div>
  );
};
