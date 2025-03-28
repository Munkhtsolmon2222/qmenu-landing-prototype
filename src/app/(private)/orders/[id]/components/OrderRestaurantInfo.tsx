'use client';
import { Order } from '@/lib/types';
import defaultImage from '@/assets/images/restaurant.png';
import { Button, Icons } from '@/components/general';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { PAGE_RESTAURANT } from '@/lib/constant';
import nProgress from 'nprogress';

interface Props {
  order: Order;
  channelId: string;
}

export const OrderRestaurantInfo: React.FC<Props> = ({ order, channelId }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const branch = order.branch;
  if (!branch) return null;

  const onBranch = () => {
    nProgress.start();
    router.push(`${PAGE_RESTAURANT}/${channelId}`);
  };

  return (
    <div className="mb-6">
      <div className="flex gap-5">
        <div
          className="min-w-20 min-h-20 w-20 h-20 rounded-2xl border-border border shadow overflow-hidden bg-background cursor-pointer"
          onClick={onBranch}
        >
          <img
            src={branch?.logo || defaultImage.src}
            alt={`${branch?.name} logo`}
            className="w-full h-full object-contain bg-transparent"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBranch}>
            <span className="text-xl truncate max-w-96 group-hover:underline">{branch?.name}</span>
            <div className="text-current-2 flex items-center">
              <Icons.chevronRight className="w-5 h-5" />
              <div className="hidden group-hover:block">{t('More detail')}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icons.store className="text-current-2 w-4 h-4" />
            <span className="text-secondary-text opacity-70">{branch?.type}</span>
          </div>

          <div className="flex items-center gap-2">
            <Icons.phone className="text-current-2 w-4 h-4" />
            <span className="text-secondary-text opacity-70">{branch?.phone}</span>
          </div>
        </div>
        <Button
          className="hidden sm:block bg-current-2 hover:bg-current-2 ml-auto"
          onClick={() => (window.location.href = `tel:${branch?.phone}`)}
        >
          {t('Contact')}
        </Button>
      </div>
    </div>
  );
};
