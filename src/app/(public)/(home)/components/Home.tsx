import { withSuspense } from '@/lib/helpers';
import { BannerType } from '@/lib/constant';
import { Fragment } from 'react';
import { SmartBanner } from '@/components/shared';
import { HomeLoader } from './Loaders';
import { DiscountsCarousel, HomeCarousel } from './Carousel';
import { HomeProps } from '../types';
import { GET_ES_CHANNEL_LIST, GET_BANNERS, GET_TAGS_BY_TYPE, GET_ES_DISCOUNTS } from '@/actions';
import { DiscountType, TagType } from '@/lib/types';

interface Props extends HomeProps {}

const Component: React.FC<Props> = async ({ positionStr }) => {
  if (!positionStr) return <HomeLoader />;

  const { data: banners = [] } = await GET_BANNERS();
  const { data: list = [] } = await GET_ES_CHANNEL_LIST(positionStr);
  const { data: webTags = [] } = await GET_TAGS_BY_TYPE(TagType.W);
  // const { data: { discounts: hotdeals = [] } = {} } = await GET_ES_DISCOUNTS({
  //   types: [DiscountType.HOT],
  //   size: 10,
  //   itemSize: 4,
  // });
  const { data: { discounts: flashdeals = [] } = {} } = await GET_ES_DISCOUNTS({
    types: [DiscountType.FLD],
    size: 10,
    itemSize: 4,
  });

  return list.map((item, index) => (
    <Fragment key={index}>
      {/* {index === 0 && (
        <DiscountsCarousel discounts={hotdeals} name="Hot Deals 🍔" type={DiscountType.HOT} />
      )} */}

      {index === 2 && <SmartBanner banners={banners} types={[BannerType.M]} dot />}

      {index === 4 && (
        <DiscountsCarousel
          discounts={flashdeals}
          name="Хөнглөлттэй бүтээгдэхүүн 🍟"
          type={DiscountType.FLD}
        />
      )}

      <HomeCarousel key={index} item={item} tags={webTags} />

      {index === list.length - 1 && <SmartBanner banners={banners} types={[BannerType.E]} dot />}
    </Fragment>
  ));
};

export const Home = withSuspense(Component, <HomeLoader />);
