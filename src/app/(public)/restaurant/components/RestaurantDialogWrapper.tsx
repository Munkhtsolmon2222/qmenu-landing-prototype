'use client';
import { RestaurantProps } from '../types';
import { OrderDialog } from '@/components/shared';
import { PAGE_ORDER, PAGE_PAYMENT } from '@/lib/constant';
import { useRestaurantStore } from '@/lib/providers';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = RestaurantProps & React.PropsWithChildren;

export const RestaurantDialogWrapper: React.FC<Props> = ({ children, participant }) => {
  const { loadParticipant } = useRestaurantStore();
  const pathname = usePathname();
  const router = useRouter();

  const lastPage = pathname.split('/');
  const isOrder =
    lastPage[lastPage.length - 2] === PAGE_ORDER || lastPage[lastPage.length - 1] === PAGE_ORDER;
  const isPayment = lastPage[lastPage.length - 2] === PAGE_PAYMENT;

  const onClose = () => router.back();

  const visible = isOrder || isPayment;

  useEffect(() => {
    loadParticipant(participant);
  }, [participant]);

  return (
    <OrderDialog visible={visible} onClose={onClose}>
      {children}
    </OrderDialog>
  );
};
