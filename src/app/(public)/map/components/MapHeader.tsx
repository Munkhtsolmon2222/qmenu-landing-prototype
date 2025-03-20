'use client';
import { Icons } from '@/components/general';
import {
  HeaderItemWrapper,
  HeaderWrapper,
  SearchLocation,
  SelectLanguage,
} from '@/components/shared';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { PAGE_MAP } from '@/lib/constant';

interface Props {}

export const MapHeader: React.FC<Props> = ({}) => {
  const router = useRouter();

  const onBack = () => {
    nProgress.start();
    router.back();
  };

  return (
    <HeaderWrapper className="flex justify-between items-center mb-0 top-0 md:top-0">
      <HeaderItemWrapper onClick={onBack} className="h-max">
        <Icons.arrowLeft />
      </HeaderItemWrapper>
      <SearchLocation hideMobile={false} redirecPath={PAGE_MAP} />
      <SelectLanguage />
    </HeaderWrapper>
  );
};
