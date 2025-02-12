import { BranchDetail } from "@/lib/types";
import { RestaurantGrid } from "../cards/RestaurantGridCard";

interface Props {
  locations: BranchDetail[] | undefined;
  resRefs;
}

export function CarouselRestaurant(props: Props) {
  const { locations, resRefs } = props;

  return (
    <div className="w-full overflow-hidden  mt-5  md:mt-5">
      <div className="gap-5 overflow-y-auto no-scrollbar w-full px-5 flex flex-row mb-2">
        {locations?.map((place, index) => (
          <div
            key={place.id}
            className="w-80"
            ref={(el) => {
              resRefs.current[index] = el;
            }}
            data-index={place.id}
          >
            <RestaurantGrid key={index} place={place} services={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
