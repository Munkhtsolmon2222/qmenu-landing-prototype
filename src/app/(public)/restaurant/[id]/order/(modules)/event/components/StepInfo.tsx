import { priceType } from '@/lib/types';
import { ItemWrapper } from '../../../components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Icons, Button } from '@/components/general';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { StepProps } from '../page';
import { OrderDialog } from '@/components/shared';
import Image from 'next/image';

interface Props extends StepProps {}

const imageWidth = 360;

export const StepInfo: React.FC<Props> = ({ event }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onNext = () => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft + imageWidth,
        behavior: 'smooth',
      });
    }
  };

  const onPrev = () => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft - imageWidth,
        behavior: 'smooth',
      });
    }
  };

  if (!event) return null;

  return (
    <>
      <OrderDialog.Header children="Хүлээн авалт" />

      <OrderDialog.Container className="flex flex-col gap-2.5 -mt-4">
        <div className="text-secondary-text opacity-75 flex gap-2 flex-nowrap text-nowrap text-sm items-center justify-end">
          <div>{event.startAt}</div>
          <div>
            <Icons.minus className="w-3" />
          </div>
          <div>{event.endAt}</div>
        </div>
        <ItemWrapper className="relative">
          {event.images && event.images.length > 0 && (
            <div className="rounded absolute top-0 left-2 z-50 h-full flex items-center">
              <Button
                size="icon"
                className="rounded-full opacity-60 bg-background text-primary hover:bg-background"
                onClick={onPrev}
              >
                <ChevronLeft className="cursor-pointer" />
              </Button>
            </div>
          )}
          <div ref={ref} className="gap-3 overflow-x-auto no-scrollbar w-full flex flex-row">
            {[event.image, ...(event.images ?? [])].map((e, index) => (
              <Image
                width={640}
                height={360}
                key={index}
                src={e ?? ''}
                className={cn(
                  'h-60 w-full rounded-md',
                  (event.images ?? []).length > 0 && 'max-w-[360px]',
                )}
                alt={event.name}
              />
            ))}
          </div>
          {event.images && event.images.length > 0 && (
            <div className="rounded absolute top-0 z-50 h-full flex items-center right-2">
              <Button
                size="icon"
                className="rounded-full opacity-60 bg-background text-primary hover:bg-background"
                onClick={onNext}
              >
                <ChevronRight className="cursor-pointer" />
              </Button>
            </div>
          )}
        </ItemWrapper>

        <ItemWrapper className="flex flex-wrap mt-2 gap-2">
          <div className="text-lg font-medium">{event.name}</div>
        </ItemWrapper>
        <ItemWrapper className="flex justify-between">
          <div className="text-secondary-text opacity-80">{priceType[event.priceType]}</div>
          <div className="text-lg font-medium text-current-2 ml-auto">
            {(event.price ?? 0).toLocaleString()} ₮
          </div>
        </ItemWrapper>
        <Separator />
        <ItemWrapper titleClassName="px-0">
          <div className="text-secondary-text opacity-80 line-clamp-6">{event.description}</div>
        </ItemWrapper>

        <ItemWrapper>
          <div className="flex gap-2 items-center">
            <div className="text-secondary-text opacity-80">Зочдын тоо: </div>
            <div className="flex gap-1 items-center flex-nowrap justify-between text-current-2">
              <div className="text-nowrap">{event.minGuests}</div>
              <Icons.minus className="w-3" />
              <div className="text-nowrap">{event.maxGuests}</div>
              <Icons.user className="w-4" />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="text-secondary-text opacity-80">Суух хугацаа:</div>
            <div className="text-current-2">{getDuration(event.duration ?? 0)}</div>
          </div>

          {(event.advancePrice ?? 0) > 0 && (
            <div className="flex gap-2 items-center">
              <div className="text-secondary-text opacity-80">Урьдчилгаа төлбөр:</div>
              <div className="text-current-2">{event!.advancePrice.toLocaleString()} ₮</div>
            </div>
          )}
        </ItemWrapper>
      </OrderDialog.Container>
    </>
  );
};

const getDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} мин`;
  if (mins === 0) return `${hours} цаг`;
  return `${hours} цаг ${mins} мин`;
};
