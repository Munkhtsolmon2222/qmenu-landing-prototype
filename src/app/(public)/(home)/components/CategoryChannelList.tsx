import { ProductCarousel, ResultChannelList, ResultListSkeleton } from '@/components/shared';
import { withSuspense } from '@/lib/helpers';
import { HomeProps } from '../types';
import { GET_ES_CHANNELS_BY_CATEGORIES, GET_ES_PRODUCTS } from '@/actions';
import { CarouselHeader } from './Carousel/Header';
import { PAGE_PRODUCTS } from '@/lib/constant';

interface Props extends HomeProps {}

const channelSize = 20;
const productSize = 30;

const Component: React.FC<Props> = async ({ positionStr, awaitedSearchParams }) => {
  if (!positionStr) return <ResultListSkeleton />;

  const position = JSON.parse(positionStr);
  const { lat, lon } = position;

  const { data: { products = [] } = {} } = await GET_ES_PRODUCTS({
    lat,
    lon,
    params: awaitedSearchParams,
    size: productSize,
    itemSize: 1,
    distance: '10km',
  });

  const { data: { channels = [], afterKey } = {} } = await GET_ES_CHANNELS_BY_CATEGORIES({
    lat,
    lon,
    params: awaitedSearchParams,
    size: channelSize,
    distance: '10km',
  });

  const section1 = products.slice(0, Math.floor(productSize / 2));
  const section2 = products.slice(Math.floor(productSize / 2), productSize);

  return (
    <>
      {products.length > 0 && (
        <>
          <CarouselHeader name="Бүтээгдэхүүн" path={PAGE_PRODUCTS} withParams />
          <ProductCarousel products={section1} />
          <ProductCarousel products={section2} />
        </>
      )}

      <CarouselHeader name="Байгууллага" hideAll />
      <ResultChannelList
        initialData={channels}
        position={position}
        searchParams={awaitedSearchParams}
        size={channelSize}
        afterKey={afterKey}
      />
    </>
  );
};

export const CategoryChannelList = withSuspense(Component, <ResultListSkeleton />);
