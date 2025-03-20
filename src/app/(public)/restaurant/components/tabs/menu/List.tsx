'use client';
import { getFilteredItems } from '@/lib/providers/restaurant';
import { Branch, Category, Product as IProduct } from '@/lib/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Product } from './Product';
import { ChildProps } from '.';
import { MenuDetail } from './MenuDetail';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@/lib/hooks';
import { Translate } from '@/components/shared';
import { Icons, Input } from '@/components/general';
import { cn } from '@/lib/utils';

type ListCategory = Category & {
  child?: boolean;
  emptyParent?: boolean;
  parentId?: string;
  participant?: Branch;
};

export const List: React.FC<ChildProps> = ({
  hideImage = false,
  isList,
  menuCategories,
  participant,
  setVisibleDetail,
  setProduct,
}) => {
  const [search, setSearch] = useState<string>();
  const { t } = useTranslation();
  const { width = window.innerWidth } = useMediaQuery();
  const categoryWrapperRef = useRef<HTMLDivElement>(null);
  const isHover = useRef(false);

  const searchFilter = (e: IProduct): boolean => {
    return !search || e.name.toLowerCase().includes(search.toLowerCase());
  };

  const { categories, count } = useMemo(() => {
    let count = 0;

    const categories = menuCategories.reduce((res: ListCategory[], curr) => {
      if (curr.products && curr.products.length > 0) {
        const filteredProducts = getFilteredItems(curr.products ?? [], searchFilter);
        count += filteredProducts.length;
        res = res.concat([{ ...curr, products: filteredProducts }]);
      } else if (curr.children && curr.children.length > 0) {
        res = res.concat(
          { ...curr, emptyParent: true },
          curr.children.map((item) => {
            const filteredProducts = getFilteredItems(item.products, searchFilter);
            count += filteredProducts.length;
            return {
              ...item,
              products: filteredProducts,
              child: true,
              parentId: curr.id,
            };
          }),
        );
      }
      return res;
    }, []);

    return { categories, count };
  }, [search]);

  const handleScroll = () => {
    document.querySelectorAll('.list-category-item').forEach((e) => {
      e.className = cn(e.className, 'font-normal text-primary bg-background');
    });

    document.querySelectorAll('.list-category-item-before').forEach((e) => {
      e.className = cn(e.className, 'hidden');
    });

    const headers = document.querySelectorAll('.category-header');

    const elements: HTMLElement[] = [];

    headers.forEach((h) => {
      const element = h as HTMLElement;
      if (element.getBoundingClientRect().top <= 80) elements.push(element);
      else element.className = cn(element.className, 'border-b-0');
    });

    let element = elements[elements.length - 1];
    if (element) element.className = cn(element.className, 'border-b');

    if (!element) element = headers[0] as HTMLElement;

    const currentStickyCategory = (element as HTMLElement)?.dataset?.category;

    if (!currentStickyCategory) return;

    const categoryElement = document.querySelector(
      `[data-active-category='${currentStickyCategory}']`,
    );
    const beforeElemet = document.querySelector(
      `[data-category-before='${currentStickyCategory}']`,
    );
    if (!categoryElement || !beforeElemet) return;

    categoryElement.className = cn(
      categoryElement.className,
      'font-bold text-current-2 bg-primary-foreground',
    );
    beforeElemet.className = cn(beforeElemet.className, 'block');

    if (!categoryWrapperRef.current || isHover.current) return;

    categoryWrapperRef.current.scrollTo({
      top: (categoryElement as HTMLElement).offsetTop - 100,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onClickCategory = (e: ListCategory) => {
    const element = document.querySelector(`[data-category-relative='${e.id}']`);
    if (element) {
      const offset = (width ?? window.innerWidth) < 640 ? 0 : -64;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        // @ts-ignore
        behavior: 'instant',
      });
    }
  };

  return (
    <div className="flex w-full mb-20 relative">
      <MenuDetail count={count} className="absolute w-full" />
      <nav className="w-1/4 xl:w-1/5 sticky mt-10 z-40 sm:top-[62px] top-16 self-start bg-background min-w-[6rem]">
        <div
          onMouseEnter={() => (isHover.current = true)}
          onMouseLeave={() => (isHover.current = false)}
          onTouchStart={() => (isHover.current = true)}
          ref={categoryWrapperRef}
          className="overflow-y-auto px-0 sm:px-3 py-2 no-scrollbar gap-2 flex flex-col max-h-[calc(100vh-80px)] overflow-x-hidden pb-8"
        >
          {categories.map((e, index) => {
            return (
              <div
                key={index}
                data-active-category={e.id}
                className="list-category-item flex flex-nowrap relative px-2 text-start py-1.5 cursor-pointer xl:px-7 text-primary bg-background rounded-md"
                onClick={() => onClickCategory(e)}
              >
                <div
                  data-category-before={e.id}
                  className="hidden list-category-item-before h-full absolute top-0 left-0 w-1 sm:w-1.5 bg-current-2 rounded"
                />
                {e.child && (
                  <span className="mr-0 hidden sm:block sm:mr-1 text-primary opacity-40 truncate text-wrap">
                    -
                  </span>
                )}

                <span className="ml-1 sm:ml-3 text-sm sm:text-base">
                  <Translate>{e.name}</Translate>
                </span>
              </div>
            );
          })}
        </div>
      </nav>
      <div
        className="p-1 mt-10 sm:px-4 pt-0 w-3/4 xl:w-4/5"
        onTouchStart={() => (isHover.current = false)}
      >
        <div className="relative mt-2">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl px-11 sm:max-w-96"
            placeholder={t('Search')}
          />
          <Icons.search className="text-current-2 absolute top-2 left-3" />
        </div>
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div data-category-relative={category.id} />
            <div
              className={cn(
                'sticky z-40 sm:top-[62px] top-16 h-8 sm:h-12 flex items-center category-header bg-background font-medium text-base sm:text-xl',
                category.child && 'font-normal text-md',
                category.emptyParent && 'h-5 mt-2 sm:mt-5',
              )}
              data-category={category.id}
            >
              <Translate>{category.name}</Translate>
            </div>
            <div
              className={`${width < 500 ? 'grid-cols-1' : 'grid-cols-2'} grid xl:grid-cols-4 gap-4`}
            >
              {category.products
                .slice()
                .sort((a, b) => a.sort - b.sort)
                .map((item) => (
                  <Product
                    participant={participant}
                    hideImage={hideImage}
                    list={isList}
                    key={item.id}
                    product={item}
                    onClick={() => {
                      setProduct(item);
                      setVisibleDetail(true);
                    }}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
