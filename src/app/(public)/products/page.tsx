import { withSuspense } from '@/lib/helpers';
import { ProductList, DrawerFilter, FilterControl } from '@/components/shared';
import { PAGE_PRODUCTS } from '@/lib/constant';
import { EsProduct, ParamFilter, ParamFilterObjType } from '@/lib/types';
import { GET_ES_PRODUCTS } from '@/actions';
import { ProductsSkeleton } from './components';

interface Props {
  searchParams: Promise<ParamFilterObjType>;
}

const size = 25;
const itemSize = 2;
const total = size * itemSize;

const Page: React.FC<Props> = async ({ ...props }) => {
  const backPath = PAGE_PRODUCTS;

  const searchParams = await props.searchParams;

  let hasMore = true;
  let products: EsProduct[] = [];
  let afterKey: string | undefined;
  let itemOffset = 0;

  while (!afterKey && products.length < total) {
    const { data: { products: data = [], afterKey: aftkey } = {} } = await GET_ES_PRODUCTS({
      params: searchParams,
      itemSize,
      size,
      itemOffset,
    });

    afterKey = aftkey;
    products = [...products, ...data];

    if (!afterKey && data.length < 1) hasMore = false;
    if (!afterKey) itemOffset += itemSize;
    if (data.length < 1) break;
  }

  return (
    <>
      <div className="flex items-center gap-3 justify-start">
        <DrawerFilter
          backPath={backPath}
          className="w-max"
          accept={[ParamFilter.CATEGORY, ParamFilter.PRICE, ParamFilter.SERVICES]}
        />
        <FilterControl className="mb-0" backPath={backPath} />
      </div>

      <ProductList
        hasMore={hasMore}
        loaderClassName="my-20"
        initialData={products}
        afterKey={afterKey}
        size={size}
        itemSize={itemSize}
        itemOffset={itemOffset}
        total={total}
      />
      <br />
    </>
  );
};

export default withSuspense(Page, <ProductsSkeleton />);
