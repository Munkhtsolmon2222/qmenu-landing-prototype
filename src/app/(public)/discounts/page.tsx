import { withSuspense } from '@/lib/helpers';
import { DiscountList, DrawerFilter, FilterControl } from '@/components/shared';
import { PAGE_DISCOUNT } from '@/lib/constant';
import { DiscountType, EsDiscount, ParamFilter, ParamFilterObjType } from '@/lib/types';
import { getAsArray } from '@/lib/utils';
import { GET_ES_DISCOUNTS } from '@/actions';
import { DiscountSkeleton } from './components';

interface Props {
  searchParams: Promise<ParamFilterObjType>;
}

const size = 25;
const itemSize = 4;
const total = size * itemSize;

const Page: React.FC<Props> = async ({ ...props }) => {
  const backPath = PAGE_DISCOUNT;

  let searchParams = await props.searchParams;

  const keywords = Object.entries(searchParams).reduce((res: string[], [key, value]) => {
    if (key === ParamFilter.DISCOUNT) return res;

    res = [...res, ...getAsArray(value)];
    return res;
  }, []);

  const types = Object.entries(searchParams).reduce((res: string[], [key, value]) => {
    if (key === ParamFilter.DISCOUNT) res = [...res, ...getAsArray(value)];
    return res;
  }, []);

  let hasMore = true;
  let discounts: EsDiscount[] = [];
  let afterKey: string | undefined;
  let itemOffset = 0;

  while (!afterKey && discounts.length < total) {
    const { data: { discounts: data = [], afterKey: aftkey } = {} } = await GET_ES_DISCOUNTS({
      keywords,
      types,
      itemSize,
      size,
      itemOffset,
    });

    afterKey = aftkey;
    discounts = [...discounts, ...data];

    if (!afterKey && data.length < 1) hasMore = false;
    if (!afterKey) itemOffset += itemSize;
    if (data.length < 1) break;
  }

  return (
    <>
      <div className="flex items-center gap-3 justify-start">
        <DrawerFilter backPath={backPath} className="w-max" accept={[ParamFilter.DISCOUNT]} />
        <FilterControl className="mb-0" backPath={backPath} />
      </div>

      <DiscountList
        hasMore={hasMore}
        loaderClassName="my-20"
        initialData={discounts}
        afterKey={afterKey}
        keywords={keywords}
        size={size}
        itemSize={itemSize}
        itemOffset={itemOffset}
        types={types as DiscountType[]}
        total={total}
      />
      <br />
    </>
  );
};

export default withSuspense(Page, <DiscountSkeleton />);
