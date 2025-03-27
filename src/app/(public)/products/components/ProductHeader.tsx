'use client';
import { Icons } from '@/components/general';
import { AuthButtons, HeaderItemWrapper, HeaderWrapper, ProfileButtons } from '@/components/shared';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.svg';
import { useTranslation } from 'react-i18next';

interface Props {
  isAuthenticated: boolean;
}

export const ProductHeader: React.FC<Props> = ({ isAuthenticated }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const onBack = () => {
    nProgress.start();
    router.back();
  };

  return (
    <HeaderWrapper className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <HeaderItemWrapper onClick={onBack} className="h-max">
          <Icons.arrowLeft />
        </HeaderItemWrapper>
        <Link href="/" className="w-12 sm:w-40 col-span-1 hidden sm:block">
          <Image
            width={40}
            height={40}
            src={logo}
            alt="logo"
            className="w-8 h-8 sm:w-28 sm:h-12 md:w-32 md:h-14"
          />
        </Link>
      </div>
      <div className="w-full text-center font-medium sm:text-lg md:text-xl line-clamp-1 max-w-44 sm:max-w-96 truncate px-2">
        {t('Product')}
      </div>

      {isAuthenticated ? <ProfileButtons /> : <AuthButtons />}
    </HeaderWrapper>
  );
};
