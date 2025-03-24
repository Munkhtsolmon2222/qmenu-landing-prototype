import { EsQueryResult } from '@/lib/types';
import { Skeleton } from '../ui';
import { SearchChannelCard, SearchEventCard, SearchProduct } from './cards';

interface Props {
  noResult: string;
  loading: boolean;
  value?: string;
  data?: EsQueryResult;
  text: {
    restaurant: string;
    product: string;
    event: string;
    total: string;
  };
}

export const SearchResult: React.FC<Props> = ({ loading, value, data, noResult, text }) => {
  if (loading) return <ResultSkeleton />;

  if (!value) return <></>;

  if (!data || (((data.channelTotal ?? 0) < 1 && data.productTotal) ?? 0 < 1))
    return <NoResult text={noResult} />;

  if (!data) return <></>;

  return (
    <>
      <ResultItem name={text.restaurant} total={data.channelTotal ?? 0} text={text.total}>
        {data.channels?.map((branch, index) => (
          <SearchChannelCard place={branch} key={index} />
        ))}
      </ResultItem>
      <ResultItem name={text.product} total={data.productTotal ?? 0} text={text.total}>
        {data.products?.map((food, index) => (
          <SearchProduct food={food} key={index} />
        ))}
      </ResultItem>
      <ResultItem name={text.event} total={data.eventTotal ?? 0} text={text.total}>
        {data.events?.map((event, index) => (
          <SearchEventCard key={index} event={event} />
        ))}
      </ResultItem>
    </>
  );
};

interface ResultItemProps extends React.PropsWithChildren {
  total: number;
  name: string;
  text: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ total, name, children, text }) => {
  return (
    <div className="p-3 pt-0 flex flex-col">
      <div className="sticky top-0 bg-background w-full h-14 z-50">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm">
          {text} {total}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 overflow-x-hidden max-h-[350px] sm:max-h-[250px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const ResultSkeleton = () => {
  return (
    <div className="p-3 pt-0 flex flex-col gap-3">
      <Skeleton className="w-20 h-8 my-2 sticky top-0" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 overflow-x-hidden max-h-[350px] sm:max-h-[250px] overflow-y-auto">
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
      </div>
      <Skeleton className="w-20 h-8 my-2 sticky top-0" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 overflow-x-hidden max-h-[350px] sm:max-h-[250px] overflow-y-auto">
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
        <Skeleton className="w-full sm:w-56 h-28 rounded-lg" />
      </div>
    </div>
  );
};

const NoResult = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center h-96">
      <h3 className="text-lg font-semibold opacity-50">{text}</h3>
    </div>
  );
};
