'use client';
import { DialogTrigger, Icons } from '@/components/general';
import { HeaderItemWrapper, SelectLanguage, ShareModal } from '@/components/shared';
import { PAGE_LOGIN, PAGE_ORDER, PAGE_ORDERS, PAGE_PAYMENT, PAGE_PROFILE } from '@/lib/constant';
import { useMediaQuery } from '@/lib/hooks';
import { useFavourite, useRestaurantStore } from '@/lib/providers';
import { FavouriteItemType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { useEffect } from 'react';

interface Props {
  isAuthenticated: boolean;
}

export const RestaurantHeader: React.FC<Props> = ({ isAuthenticated }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { current } = useRestaurantStore();
  const { width = window.innerWidth } = useMediaQuery();

  const { isFavourite, editFavourite, editing } = useFavourite();

  const liked = isFavourite(FavouriteItemType.BRANCH, current?.branch.id ?? '');

  const hideHeader = () => {
    const tabsElement = document.getElementById('restaurant-sticky-tab');
    if (!tabsElement) return;

    const header = document.getElementById('restaurant-header-container');
    if (!header) return;

    const top = tabsElement.getBoundingClientRect().top;

    if (top > 50) header.style.display = 'flex';
    else header.style.display = 'none';
  };

  useEffect(() => {
    hideHeader();

    window.addEventListener('scroll', hideHeader);
    window.addEventListener('resize', hideHeader);

    return () => {
      window.removeEventListener('scroll', hideHeader);
      window.removeEventListener('resize', hideHeader);
    };
  }, []);

  const lastPage = pathname.split('/');

  const sub =
    lastPage[lastPage.length - 2] === PAGE_ORDER || lastPage[lastPage.length - 2] === PAGE_PAYMENT;

  const lastPath = lastPage.pop();

  if ((lastPath && [PAGE_ORDER].includes(lastPath)) || sub) return <></>;

  const navigate = (path?: string) => {
    nProgress.start();
    if (!path) router.back();
    else router.push(path);
  };

  return (
    <div
      id="restaurant-header-container"
      className={cn(
        'fixed top-0 w-full h-16 z-30 px-3 flex items-center justify-between sm:px-6 pt-2',
        width >= 768
          ? width >= 1280
            ? width >= 1440
              ? 'max-w-[1390px]'
              : 'max-w-[calc(100%_-_50px)]'
            : 'max-w-3xl'
          : '',
      )}
    >
      <HeaderItemWrapper className="shadow-md" onClick={() => navigate()}>
        <Icons.arrowLeft />
      </HeaderItemWrapper>

      <div className="flex gap-2 items-center">
        <HeaderItemWrapper className="shadow-md h-11 w-11 p-0">
          <SelectLanguage />
        </HeaderItemWrapper>
        <ShareModal title={current?.branch.name}>
          <DialogTrigger>
            <HeaderItemWrapper className="shadow-md">
              <Icons.share2 />
            </HeaderItemWrapper>
          </DialogTrigger>
        </ShareModal>
        <HeaderItemWrapper
          className="shadow-md"
          loading={editing}
          onClick={() => editFavourite(FavouriteItemType.BRANCH, current?.branch.id ?? '')}
        >
          <Icons.heart className={`${!liked ? '' : 'text-current-2 fill-current-2'}`} />
        </HeaderItemWrapper>
        {isAuthenticated && (
          <HeaderItemWrapper className="shadow-md" onClick={() => navigate(PAGE_ORDERS)}>
            <Icons.notePad />
          </HeaderItemWrapper>
        )}
        <HeaderItemWrapper
          className="shadow-md"
          onClick={() => {
            if (isAuthenticated) navigate(PAGE_PROFILE);
            else navigate(PAGE_LOGIN + '?back=true');
          }}
        >
          <Icons.user />
        </HeaderItemWrapper>
      </div>
    </div>
  );
};
