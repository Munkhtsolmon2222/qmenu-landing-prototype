import { ChannelList, BranchListSkeleton } from '@/components/shared';
import { HomeProps } from '../types';
import { withSuspense } from '@/lib/helpers';
import { GET_ES_CHANNELS } from '@/actions';

interface Props extends HomeProps {}

const limit = 50;

const Component: React.FC<Props> = async ({ filters = [], positionStr }) => {
  if (!positionStr) return <BranchListSkeleton />;

  const position = JSON.parse(positionStr);
  const { lat, lon } = position;

  const { data: { channels = [] } = {} } = await GET_ES_CHANNELS({
    lat,
    lon,
    keywords: filters,
    limit,
    offset: 0,
    distance: '10km',
  });

  return (
    <ChannelList initialData={channels} position={position} keywords={filters} limit={limit} />
  );
};

export const FilterChannelList = withSuspense(Component, <BranchListSkeleton />);
