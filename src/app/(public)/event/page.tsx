"use client";
import { CarouselEventCard } from "@/components/cards/EventCard/CarouselEventCard";
import { FILTER_EVENTS } from "@/graphql/query";
import { PAGE_EVENT } from "@/lib/config/page";
import { IEvent } from "@/lib/types";
import { useLazyQuery } from "@apollo/client";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";
const limit = 20;

const Events = () => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();
  const filters = searchParams.get("filters");

  const [getEvents, { loading }] = useLazyQuery<{ filterEvents: IEvent[] }>(
    FILTER_EVENTS,
    {
      fetchPolicy: "network-only",
      onCompleted({ filterEvents }) {
        if (filterEvents.length < limit) setHasMore(false);
        else setOffset((prev) => prev + limit);
        setEvents((prev) => [...prev, ...filterEvents]);
      },
    }
  );

  useEffect(() => {
    if (filters)
      getEvents({ variables: { filters: [filters], limit, offset } });
  }, [filters, getEvents, offset]);

  const refetch = () => {
    if (!hasMore) return;
    getEvents({ variables: { filters, offset: offset + limit, limit } });
  };

  const onScroll = (e) => {
    const target = e.target as HTMLDivElement;
    if (!target || !hasMore) return;

    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200) refetch();
  };

  return (
    <div className="p-4 pt-20 overflow-y-auto pb-24" onScroll={onScroll}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {events.map((event, index) => (
          <CarouselEventCard
            key={index}
            event={event}
            className="max-w-full w-full"
            onClick={() => router.push(`${PAGE_EVENT}/${event.id}`)}
          />
        ))}
      </div>
      {loading && (
        <div className="min-h-32 flex items-center justify-center w-full">
          <LoaderIcon className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Events;
