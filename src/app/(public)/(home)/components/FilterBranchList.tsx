import { BranchList, BranchListSkeleton } from '@/components/shared';
import { HomeProps } from '../types';
import { withSuspense } from '@/lib/helpers';
import { FILTER_BRANCHES } from '@/actions';

interface Props extends HomeProps {}

const limit = 50;

const Component: React.FC<Props> = async ({ filters = [], positionStr }) => {
  if (!positionStr) return <BranchListSkeleton />;

  const position = JSON.parse(positionStr);
  const { lat, lon } = position;

  const { data = [] } = await FILTER_BRANCHES({
    lat,
    lon,
    filters,
    limit,
    offset: 0,
    distance: '10km',
  });

  return <BranchList initialData={data} position={position} filters={filters} limit={limit} />;
};

export const FilterBranchList = withSuspense(Component, <BranchListSkeleton />);
