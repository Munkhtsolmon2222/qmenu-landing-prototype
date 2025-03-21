import { POSITION } from '@/lib/constant';
import { Home, CategoryChannelList, FilterChannelList } from './components';
import { HomeProps } from './types';
import { cookies } from 'next/headers';
import { ParamFilter } from '@/lib/types';
import { getAsArray } from '@/lib/utils';

interface Props extends Pick<HomeProps, 'searchParams'> {}

const Page: React.FC<Props> = async (props) => {
  const cookie = await cookies();
  const value = cookie.get(POSITION)?.value;

  let searchParams = await props.searchParams;

  const filters = Object.entries(searchParams).reduce((res: string[], [_, value]) => {
    res = [...res, ...getAsArray(value)];
    return res;
  }, []);

  if (searchParams[ParamFilter.CATEGORY]) {
    return <CategoryChannelList {...props} filters={filters} positionStr={value} />;
  }

  if (filters.length) {
    return <FilterChannelList {...props} filters={filters} positionStr={value} />;
  }

  return <Home positionStr={value} searchParams={props.searchParams} />;
};

// export default withSuspense(Page, <Loader className="h-96" />);
export default Page;
