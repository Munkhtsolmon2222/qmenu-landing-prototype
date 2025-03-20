'use client';
import { PAGE_ORDER, PAGE_ORDER_USER, PAGE_RESTAURANT, PAGE_TABLE_ORDER } from '@/lib/constant';
import { useRestaurantStore } from '@/lib/providers';
import { OrderInput, OrderType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import nProgress from 'nprogress';

interface Props {
  id: string;
  isAuthenticated?: boolean;
}

export const TableOrderButton: React.FC<Props> = ({ id, isAuthenticated }) => {
  const { setStore } = useRestaurantStore();
  const { t } = useTranslation();
  const router = useRouter();

  const onClick = () => {
    let path = `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`;

    setStore((set) =>
      set({
        input: { type: OrderType.TableOrder } as OrderInput,
        inputParticipants: [],
      }),
    );

    if (!isAuthenticated) path = `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_USER}`;

    nProgress.start();
    router.push(path);
  };

  return (
    <div
      onClick={onClick}
      className="hidden sm:flex text-center w-full bg-current-2 h-12 rounded-lg hover:bg-current-3 mt-auto text-white items-center justify-center font-medium cursor-pointer"
    >
      {t('Table order')}
    </div>
  );
};
