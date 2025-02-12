import { IEvent } from "@/lib/types";
import { Icons } from "../shared/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
interface Props {
  event: IEvent;
  onClick?: () => void;
  className?: string;
  imageClassName?: string;
}

const SearchEventCard: React.FC<Props> = ({
  event,
  onClick,
  className,
  imageClassName,
}) => {
  return (
    <div
      className={cn(
        "max-w-[28rem] min-w-72 w-full h-40 rounded-xl overflow-hidden shadow cursor-pointer border relative group",
        className
      )}
      onClick={() => onClick?.()}
    >
      <Image
        width={100}
        height={100}
        className={cn("w-full h-24 object-cover z-0", imageClassName)}
        src={event.image}
        alt="event-images"
      />
      <div className="w-full h-full rounded-md px-2 py-1">
        <div className="font-medium truncate">{event.name}</div>
        <div className="flex justify-between">
          {event.price > 0 && (
            <div className="text-primary font-bold">
              {event.price.toLocaleString()}₮
            </div>
          )}
          <div className="flex justify-between gap-5">
            <div className="flex gap-1 items-center flex-nowrap justify-between text-secondary-text opacity-80 text-sm">
              <div className="text-nowrap">{event.minGuests}</div>
              <Icons.minus className="w-3" />
              <div className="text-nowrap">{event.maxGuests}</div>
              <Icons.user className="w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchEventCard;
