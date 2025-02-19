"use client";
import { EventType, IEvent, Participant } from "@/lib/types";
import EventCard from "./EventCard";
import { useState } from "react";
import useMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { PAGE_EVENT } from "@/lib/config/page";
import { useRouter } from "next/navigation";
interface Props {
  participant?: Participant;
}

const typeName: Record<EventType, string> = {
  HNY: "Happy New Year",
  HBD: "Happy Birthday",
};

const Event: React.FC<Props> = ({ participant }) => {
  const { events = [] } = participant ?? { events: [] };
  const { width } = useMediaQuery();
  const router = useRouter();

  const types: EventType[] = Array.from(
    new Set(events.map((event) => event.type))
  ).sort((a, b) => typeName[b].localeCompare(typeName[a]));

  const [type, setType] = useState<EventType>(types[0]);

  const onSelect = (event: IEvent) => {
    router.push(PAGE_EVENT + "/" + event.id);
  };

  return (
    <>
      <div
        className={cn(
          "w-full flex flex-col xl:flex-row gap-2 relative mb-10 sm:mb-0",
          width < 1280 ? "" : "mt-5"
        )}
      >
        {width < 1280 ? (
          <HorizontalTypes type={type} types={types} setType={setType} />
        ) : (
          <VerticalTypes type={type} types={types} setType={setType} />
        )}

        <div className="w-full xl:w-4/5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {events
            .filter((e) => e.type === type)
            .map((event, index) => (
              <EventCard
                event={event}
                key={index}
                onClick={() => onSelect(event)}
              />
            ))}
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

interface TypeProps {
  type: EventType;
  setType: React.Dispatch<React.SetStateAction<EventType>>;
  types: EventType[];
}

const VerticalTypes: React.FC<TypeProps> = ({ type, setType, types }) => {
  return (
    <nav className="w-1/4 xl:w-1/5 sticky z-40 sm:top-20 top-16 self-start bg-background col-span-2">
      <div className="overflow-y-auto px-0 sm:px-3 no-scrollbar gap-2 flex flex-col">
        {types.map((e, index) => {
          const active = e === type;
          return (
            <div
              key={index}
              className={`flex flex-nowrap relative px-2 text-start py-1.5 rounded-none cursor-pointer xl:px-7 ${
                active
                  ? "bg-background text-black font-bold dark:text-white"
                  : "text-primary bg-background"
              }
        `}
              onClick={() => setType(e)}
            >
              {active && (
                <div className="h-full absolute top-0 left-0 w-1 sm:w-1.5 bg-current-2" />
              )}
              <span className="ml-1 sm:ml-3 text-sm sm:text-base truncate">
                {typeName[e]}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

const HorizontalTypes: React.FC<TypeProps> = ({ type, setType, types }) => {
  return (
    <nav className="sticky z-40 sm:top-[62px] top-16 bg-background">
      <div className="overflow-x-scroll py-2 no-scrollbar gap-2 flex">
        {types.map((e, index) => {
          const active = e === type;
          return (
            <div
              key={index}
              className={`px-2 border justify-center h-9 flex items-center rounded-2xl cursor-pointer text-sm sm:text-base ${
                active ? "border-current-2 text-current-2 font-medium" : ""
              } ${e.length > 10 ? "w-max text-nowrap" : " min-w-28"}`}
              onClick={() => setType(e)}
            >
              {typeName[e]}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Event;
