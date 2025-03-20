'use client';
import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import logosmall from '@/assets/favicon.ico';
import { useMediaQuery } from '@/lib/hooks';
import Link from 'next/link';
import { Icons } from '@/components/general';
import { useTranslation } from 'react-i18next';
import { PAGE_MAP } from '@/lib/constant';
import {
  AuthButtons,
  HeaderWrapper,
  ProfileButtons,
  SearchInput,
  SearchLocation,
} from '@/components/shared';

interface Props {
  isAuthenticated?: boolean;
}

export const HomeHeader: React.FC<Props> = ({ isAuthenticated }) => {
  const { device } = useMediaQuery();
  const { t } = useTranslation();

  return (
    <HeaderWrapper className="flex justify-between items-center gap-1">
      <Link href="/" className="w-12 sm:w-40 col-span-1">
        <Image
          width={40}
          height={40}
          src={device === 'mobile' ? logosmall : logo}
          alt="logo"
          className="w-8 h-8 sm:w-28 sm:h-12 md:w-32 md:h-14"
        />
      </Link>

      <div className="w-full flex gap-2 max-w-[550px]">
        <SearchInput
          placeholder={t('Food, Restaurant')}
          prefix={
            <Icons.search className="hover:bg-transparent text-current-2 h-5 w-5 md:h-6 md:w-6 md:hidden " />
          }
          suffix={
            <Link
              className="py-2 px-4 text-primary-foreground bg-current-2 rounded-full hover:bg-current-2 hidden md:flex cursor-pointer dark:text-primary"
              href={PAGE_MAP}
            >
              <Icons.search />
            </Link>
          }
        />
        <SearchLocation />
      </div>

      {isAuthenticated ? <ProfileButtons /> : <AuthButtons />}
    </HeaderWrapper>
  );
};
