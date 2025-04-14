import { Home, CategoryChannelList, FilterChannelList } from './components';
import { HomeProps } from './types';
import { ParamFilter } from '@/lib/types';
import { getPositionStorage } from '@/actions';

interface Props extends Pick<HomeProps, 'searchParams'> {}

const Page: React.FC<Props> = async (props) => {
  const position = await getPositionStorage();
  const searchParams = (await props.searchParams) || {};

  if (searchParams[ParamFilter.CATEGORY]) {
    return (
      <CategoryChannelList {...props} awaitedSearchParams={searchParams} position={position} />
    );
  }

  if (Object.keys(searchParams).length) {
    return <FilterChannelList {...props} awaitedSearchParams={searchParams} position={position} />;
  }

  return <Home position={position} searchParams={props.searchParams} />;
};

// export default withSuspense(Page, <Loader className="h-96" />);
export default Page;
