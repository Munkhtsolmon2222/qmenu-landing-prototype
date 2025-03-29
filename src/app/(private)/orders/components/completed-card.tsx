'use client';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import BaseCard, { OrderBaseCardProps } from './base-card';
import { Button } from '@/components/general';
import { PAGE_RESTAURANT } from '@/lib/constant';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';

interface Props extends OrderBaseCardProps {}

const CompletedCard: React.FC<Props> = ({ order, onClick }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const onClickReOrder = () => {
    if (!order.channelId) return;
    nProgress.start();
    router.push(PAGE_RESTAURANT + '/' + order.channelId);
  };

  return (
    <Card className="px-3 py-2">
      <BaseCard order={order} onClick={onClick} />
      <div className="w-full flex justify-between gap-2 py-1">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-secondary-background w-full text-current-2 whitespace-nowrap"
          onClick={onClickReOrder}
        >
          {t('Re-Order')}
        </Button>
        <Button
          size="sm"
          className="rounded-full bg-current-2 text-white dark:text-primary w-full "
        >
          {t('Comment')}
        </Button>
      </div>
    </Card>
  );
};

export default CompletedCard;
