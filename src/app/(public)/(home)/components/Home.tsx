import { withSuspense } from '@/lib/helpers';
import { BannerType } from '@/lib/constant';
import { Fragment } from 'react';
import { SmartBanner } from '@/components/shared';
import { HomeLoader } from './Loaders';
import { HomeCarousel } from './Carousel';
import { HomeProps } from '../types';
import { GET_BRANCH_LIST, GET_BANNERS, GET_TAGS_BY_TYPE } from '@/actions';
import { TagType } from '@/lib/types';

interface Props extends HomeProps {}

const Component: React.FC<Props> = async ({ positionStr }) => {
  if (!positionStr) return <HomeLoader />;

  const { data: banners = [] } = await GET_BANNERS();
  const { data: list = [] } = await GET_BRANCH_LIST(positionStr);
  const { data: webTags = [] } = await GET_TAGS_BY_TYPE(TagType.W);

  return list.map((item, index) => (
    <Fragment key={index}>
      {index === 2 && <SmartBanner banners={banners} types={[BannerType.M]} dot />}

      <HomeCarousel key={index} item={item} tags={webTags} />

      {index === list.length - 1 && <SmartBanner banners={banners} types={[BannerType.E]} dot />}
    </Fragment>
  ));
};

export const Home = withSuspense(Component, <HomeLoader />);
