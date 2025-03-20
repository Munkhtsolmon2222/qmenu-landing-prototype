'use client';
import user from '@/assets/images/profile/user.svg';
import favourite from '@/assets/images/profile/favourite.svg';
import discount from '@/assets/images/profile/discount.svg';
import loyalty from '@/assets/images/profile/loyalty.svg';
import gift from '@/assets/images/profile/gift.svg';
import logOut from '@/assets/images/profile/log-out.svg';
import { PAGE_PROFILE } from '@/lib/constant';
import { Customer } from '@/lib/types';
import { cn } from '@/lib/utils';
import { MenuHeader } from './header';
import { Fragment } from 'react';
import { Separator } from '@/components/ui';
import { Icons } from '@/components/general';
import { redirect, usePathname, useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { logout } from '@/actions';
import Image from 'next/image';

const MenuItems: (pathname: string) => {
  name: string;
  icon: React.ReactNode;
  active: boolean;
  path: string;
  comingsoon: boolean;
}[] = (pathname) => [
  {
    name: 'Хэрэглэгчийн мэдээлэл',
    icon: user.src,
    comingsoon: false,
    path: 'account',
    active: pathname === PAGE_PROFILE || pathname === PAGE_PROFILE + '/account',
    sort: 1,
  },
  {
    name: 'Дуртай',
    icon: favourite.src,
    comingsoon: true,
    path: 'favourite',
    active: pathname === PAGE_PROFILE + '/favourite',
    sort: 3,
  },
  {
    name: 'Хөнгөлөлтийн картууд',
    icon: discount.src,
    comingsoon: true,
    path: 'discount',
    active: pathname === PAGE_PROFILE + '/discount',
    sort: 4,
  },
  {
    name: 'Урамшуулал',
    icon: loyalty.src,
    comingsoon: true,
    path: 'loyalty',
    active: pathname === PAGE_PROFILE + '/loyalty',
    sort: 5,
  },
  {
    name: 'Бэлэг (Купон)',
    icon: gift.src,
    comingsoon: true,
    path: 'coupon',
    active: pathname === PAGE_PROFILE + '/coupon',
    sort: 6,
  },
  // {
  //   name: "Location",
  //   icon: "mappin",
  //   comingsoon: true,
  //   path: "location",
  //   active: pathname === PAGE_PROFILE + "/location",
  // },
  // {
  //   name: "Ebarimt",
  //   icon: "heart",
  //   comingsoon: true,
  //   path: "ebarimt",
  //   active: pathname === PAGE_PROFILE + "/ebarimt",
  // },
  {
    name: 'Гарах',
    icon: logOut.src,
    comingsoon: false,
    path: 'logout',
    active: false,
    sort: 7,
  },
];

type Props = {
  customer: Customer;
};

export const ProfileMenu: React.FC<Props> = ({ customer }) => {
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (path: string) => {
    nProgress.start();

    if (path === 'logout') {
      logout();
      return;
    }

    const fullPath = PAGE_PROFILE + '/' + path;

    if (window.innerWidth < 768) {
      router.push(fullPath);
      return;
    }

    redirect(fullPath);
  };

  return (
    <div
      className={cn(
        'col-span-1 relative flex-col gap-5',
        pathname !== PAGE_PROFILE && 'hidden md:flex',
      )}
    >
      <MenuHeader customer={customer} />

      <div className="flex flex-col px-2 gap-1 md:gap-4">
        {MenuItems(pathname).map((item, index) => {
          const lastItem = index === MenuItems('').length - 1;

          return (
            <Fragment key={index}>
              {lastItem && (
                <Separator
                  orientation="horizontal"
                  className="hidden md:block absolute bottom-14"
                />
              )}

              <div
                key={index}
                onClick={() => {
                  if (item.comingsoon) return;
                  navigate(item.path);
                }}
                className={cn(
                  'flex text-base sm:text-sm xl:text-base gap-3 py-3 cursor-pointer items-center justify-between rounded px-4 md:px-1 bottom-0',
                  item.active && 'md:bg-primary-foreground',
                  lastItem && 'md:absolute',
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary-foreground p-1 h-7 sm:h-8 rounded-md">
                    <Image
                      alt={item.name}
                      width={24}
                      height={24}
                      src={item.icon as string}
                      className="w-full h-full dark:filter-[brightness(0)_saturate(100%)_invert(100%)_sepia(94%)_saturate(0%)_hue-rotate(229deg)_brightness(105%)_contrast(107%)]"
                    />
                  </div>
                  <div>
                    {item.name}{' '}
                    {item.comingsoon && <span className="text-xs text-gray-400">Тун удагүй</span>}
                  </div>
                </div>
                <div className="md:hidden h-5">
                  <Icons.chevronRight className="w-full h-full text-gray-400" />
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
