'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/general';
import { Review } from '@/lib/types';
import { LoaderIcon } from 'lucide-react';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import 'moment/locale/mn';
import { useTranslation } from 'react-i18next';
import { DialogTrigger, Icons } from '@/components/general';
import { ReviewForm, ReviewTypes } from '@/components/shared';
import { useAction } from '@/lib/hooks';
import { GET_REVIEWS } from '@/actions';

interface Props {
  branch?: string;
}

const ReviewTab = (props: Props) => {
  const { branch } = props;
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<any[]>([]);
  const [total, setTotal] = useState<any>({
    average: '0.0',
    stars: [],
    sum: 0,
  });

  const { action: getReviews, loading } = useAction(GET_REVIEWS, {
    lazy: true,
    onSuccess(data) {
      const summary = data?.summary ?? [];
      const total = data?.total ?? {
        average: '0.0',
        stars: [],
        sum: 0,
      };

      const reviews = (data?.reviews ?? [])
        .slice()
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

      setSummary(summary);
      setTotal(total);
      setReviews(reviews);
    },
  });

  useEffect(() => {
    if (branch) getReviews(branch, 'B');
  }, []);

  if (loading) {
    return (
      <div className="h-[200px] flex items-center justify-center w-full">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8 mt-4 py-3">
      <div className="w-full flex gap-2 sm:gap-4 sm:my-4">
        <div className="w-1/3 xl:w-1/4 flex flex-col gap-1">
          <span className="block font-bold text-center text-2xl sm:text-3xl">{total.average}</span>
          <div className="flex items-center justify-center gap-0.5 text-current-2">
            {Array.from({ length: 5 }).map((_, i) => {
              const active = i < +total.average.toString().split('.')[0];
              return (
                <div key={i}>
                  <Icons.star
                    className={`sm:w-7 sm:h-7 w-5 h-5 ${active ? 'fill-current-2' : ''}`}
                  />
                </div>
              );
            })}
          </div>
          {reviews.length > 0 && <div className="text-center">{reviews.length} үнэлгээ</div>}
        </div>
        <div className="w-2/3 xl:w-3/4 flex flex-col gap-1 sm:gap-2 px-1 sm:px-0">
          {Array.from({ length: 5 }).map((_, i) => {
            let r = 5;
            const itemsTotal = total.stars.find((e) => e.star === r - i);

            return (
              <div className="flex items-center justify-between gap-3" key={i}>
                <div className="w-full bg-border h-3 overflow-hidden rounded-lg">
                  <div
                    style={{ width: itemsTotal ? `${itemsTotal.percent}%` : 0 }}
                    className="bg-current-2 h-full rounded-lg"
                  />
                </div>
                <div className="font-bold text-sm sm:text-base w-10 text-end">
                  {(r - i).toFixed(1)}
                </div>
                <div className="sm:min-w-16 w-4 text-xs sm:text-base text-nowrap opacity-70 flex items-center gap-1 flex-nowrap">
                  <div>{itemsTotal?.count ?? 0}</div>
                  <div className="text-sm sm:block hidden"> {t('Rating')}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between gap-5 flex-col items-center">
        <div className="flex gap-2 w-full flex-wrap sm:flex-nowrap">
          {ReviewTypes.map((item, i) => {
            const val = summary.find((e) => e.type === item.type);
            const value = (val?.star ?? 5).toFixed(1);
            return (
              <Button
                className="text-sm sm:text-sm border border-[#FFEDEF] bg-[#FFFDFE] dark:bg-background hover:bg-[#fffdfe] text-primary flex sm:flex-row w-full sm:w-max py-2 sm:py-4 cursor-default"
                key={i}
              >
                <div className="mr-1 font-bold">{value}</div>
                <div>{item.name}</div>
              </Button>
            );
          })}
        </div>
        <ReviewForm update={(review) => setReviews([review, ...reviews])}>
          <DialogTrigger className="w-max ml-auto cursor-pointer">
            <Button className="min-w-32 bg-current-2 hover:bg-current-2 text-white">
              {t('Give a rating')}
            </Button>
          </DialogTrigger>
        </ReviewForm>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {reviews.map((item, index) => (
          <ReviewCard item={item} key={index} />
        ))}
      </div>
      <br />
      <br />
    </div>
  );
};

export default ReviewTab;

const ReviewCard: React.FC<{ item: Review }> = ({ item }) => {
  return (
    <div className="border rounded-xl p-4 px-2 sm:px-4">
      <div className="flex gap-3 w-full ">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="font-bold w-36 truncate">{item.name}</div>
          <div className="flex items-center gap-2 text-xs">
            <div className="font-bold">{item.stars.toFixed(1)}</div>
            <div className="opacity-70 text-current-2 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const active = i < item.stars;
                return (
                  <div key={i}>
                    <Icons.star className={`w-4 h-4 ${active ? 'fill-current-2' : ''}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="italic text-xs opacity-50 ml-auto">
          {moment(item.createdAt).locale('mn').fromNow()}
        </div>
      </div>
      <div className="text-sm mt-4">{item.comment}</div>
    </div>
  );
};
