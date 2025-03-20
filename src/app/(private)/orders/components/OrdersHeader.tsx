'use client';
import { Icons } from '@/components/general';
import { HeaderItemWrapper, HeaderWrapper } from '@/components/shared';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { useTranslation } from 'react-i18next';

interface Props {}

export const OrdersHeader: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const onBack = () => {
    nProgress.start();
    router.back();
  };

  return (
    <HeaderWrapper className="flex justify-between items-center mb-0">
      <HeaderItemWrapper onClick={onBack} className="h-max">
        <Icons.arrowLeft />
      </HeaderItemWrapper>
      <div className="w-full text-center font-medium text-lg my-2 text-secondary-text">
        {t('Order history')}
      </div>
      <div />
    </HeaderWrapper>
  );
};
