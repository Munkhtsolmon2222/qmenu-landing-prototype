import { ResultList, ResultListSkeleton } from '@/components/shared';
import { withSuspense } from '@/lib/helpers';
import { HomeProps } from '../types';
import { GET_ES_CHANNELS_BY_PRODUCTS, GET_ES_PRODUCTS } from '@/actions';

interface Props extends HomeProps {}

const limit = 50;

const Component: React.FC<Props> = async ({ positionStr, filters = [] }) => {
  if (!positionStr) return <ResultListSkeleton />;

  const position = JSON.parse(positionStr);
  const { lat, lon } = position;

  // const { data: { branches } = { branches: [] } } = await FILTER_RESULT({
  //   lat,
  //   lon,
  //   filters,
  //   limit,
  //   offset: 0,
  //   distance: '10km',
  // });

  return <ResultList initialData={[]} position={position} filters={filters} limit={limit} />;
};

export const CategoryChannelList = withSuspense(Component, <ResultListSkeleton />);
