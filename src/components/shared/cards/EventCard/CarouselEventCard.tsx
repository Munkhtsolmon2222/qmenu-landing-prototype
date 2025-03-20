'use client';
import { IEvent, ITimetable } from '@/lib/types';
import { cn } from '@/lib/utils';
import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Button, Icons } from '@/components/general';

interface Props {
  event: IEvent;
  onClick?: () => void;
  className?: string;
  imageClassName?: string;
}

export const CarouselEventCard = forwardRef<HTMLDivElement, Props>(
  ({ event, onClick, className, imageClassName }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const branch = event?.branch;
    const { t } = useTranslation();

    useEffect(() => {
      const img = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (event.images ?? []).length);
      }, 5000);
      return () => clearInterval(img);
    }, [event.images?.length, event.images]);

    return (
      <div
        ref={ref}
        className={cn(
          'w-[87vw] min-w-[20rem] h-full max-w-[22rem] min-h-[440px] max-h-[440px] rounded-xl overflow-hidden shadow-sm border relative group cursor-pointer',
          className,
        )}
        onClick={() => onClick?.()}
      >
        <Image
          width={1280}
          height={720}
          className={cn(
            'w-full h-3/5 object-cover z-0 opacity-0 transition-opacity duration-300 ease-in-out transform',
            imageClassName,
          )}
          src={event.images?.[currentIndex] ?? ''}
          alt="event-images"
          onLoad={() => {
            setImageLoaded(true);
          }}
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
          }}
        />
        <div className="w-full h-2/5 rounded-md px-2 py-3">
          <div className="flex gap-2 items-center">
            <Image
              width={100}
              height={100}
              src={branch?.logo ?? ''}
              alt={`${branch?.name} logo`}
              className="w-16 h-16 rounded-2xl object-contain bg-transparent"
              loading="lazy"
            />
            <div>
              <div className="text-[14px] truncate font-bold">{event.name}</div>
              <p className="text-[11px] font-medium opacity-75 text-red-800 overflow-hidden max-w-[210px] line-clamp-2">
                {branch?.address}
              </p>
            </div>
          </div>
          <div className="border border-b-[0.5px] bg-red-800 my-4"></div>
          <div className="flex w-full mt-auto">
            <div>
              <div className="flex gap-1 items-center">
                <Icons.billing className="w-5 text-red-800" />
                <div className="text-sm">{event.price.toLocaleString()} ₮</div>
              </div>
              <div className="flex flex-nowrap items-center gap-1 rounded mt-3 outline-0 text-sm w-28 relative bottom-3">
                <Icons.user className="w-5 text-red-800" />
                <div className="whitespace-nowrap">{event.minGuests}</div>
                <Icons.minus className="w-3" />
                <div className="whitespace-nowrap">{event.maxGuests}</div>
              </div>
            </div>
            <Button
              className="bg-current-2 hover:bg-current-3 ml-auto mt-1"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              {t('More detail')}
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

CarouselEventCard.displayName = 'CarouselEventCard';

export const Times: React.FC<{ event: IEvent; onClick?: () => void }> = ({ event, onClick }) => {
  const dates = getOpenDays(event.timetable, 30, new Date(event.endAt));
  const days = dates.map((date) => date.getDate());

  return (
    <div onClick={() => onClick?.()} className="truncate">
      {days.join(' • ')}
    </div>
  );
};

export function getOpenDays(
  timetable?: ITimetable,
  numberOfDays: number = 7,
  endAt?: Date,
): Date[] {
  if (!timetable) return [];

  const openDays: Date[] = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  if (!timetable) return openDays;

  const daysOfWeek: ('sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat')[] = [
    'sun',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
  ];

  let daysAdded = 0;
  const currentDate = new Date(year, month, now.getDate());

  while (daysAdded < numberOfDays && (!endAt || currentDate <= endAt)) {
    const dayOfWeek = currentDate.getDay();

    if (timetable[daysOfWeek[dayOfWeek]]) {
      openDays.push(new Date(currentDate));
      daysAdded++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return openDays;
}
