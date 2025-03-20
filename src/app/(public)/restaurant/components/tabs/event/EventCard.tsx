import { Icons } from '@/components/general';
import { IEvent } from '@/lib/types';

interface Props {
  event: IEvent;
  onClick?: () => void;
}

const EventCard: React.FC<Props> = ({ event, onClick }) => {
  return (
    <div
      className="h-80 w-full rounded-xl overflow-hidden shadow cursor-pointer border relative hover:scale-[1.03] transition-all group"
      onClick={() => onClick?.()}
    >
      <img className="w-full h-4/6 object-cover z-0" src={event.image} alt="event-images" />
      <div className="w-full h-full rounded-md px-4 py-3">
        <div className="text-lg font-medium truncate">{event.name}</div>
        {event.price > 0 && (
          <div className="text-primary font-bold">{event.price.toLocaleString()}₮</div>
        )}
        <div className="flex justify-between gap-5">
          <div className="flex gap-1 items-center flex-nowrap justify-between text-secondary-text opacity-80 text-sm">
            <div className="text-nowrap">{event.minGuests}</div>
            <Icons.minus className="w-3" />
            <div className="text-nowrap">{event.maxGuests}</div>
            <Icons.user className="w-4" />
          </div>
          <div className="flex gap-1 items-center flex-nowrap justify-between text-secondary-text opacity-80 text-sm">
            <div className="text-nowrap">{event.startAt}</div>
            <Icons.minus className="w-3" />
            <div className="text-nowrap">{event.endAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
