import { Icons } from "../shared/icons";
import defaultImage from "@/assets/images/restaurant.png";
import { BranchDetail, TableInfo } from "@/lib/types/branch";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Props {
  place: BranchDetail;
}

type AvailabilityStatus = {
  percentage: number;
  color: string;
};

export function getAvailabilityStatus(
  tableInfo: TableInfo
): AvailabilityStatus {
  const percentage =
    tableInfo?.total === 0
      ? 0
      : (tableInfo?.available / tableInfo?.total) * 100;

  let color;
  if (percentage === 0) {
    color = "green";
  } else if (percentage > 75) {
    color = "green";
  } else if (percentage > 50) {
    color = "yellow";
  } else if (percentage > 25) {
    color = "orange";
  } else {
    color = "red";
  }

  return { percentage, color };
}

export function SearchBranch(props: Props) {
  const { place } = props;
  const router = useRouter();

  const { color } = getAvailabilityStatus(place?.tableInfo);

  // const {} = useFavourite(FavouriteItemType.BRANCH, place.branch);

  return (
    <div
      className="rounded-lg overflow-hidden border md:min-w-52 min-w-40 w-full"
      onClick={() => router.push(`/restaurant/${place.id}`)}
    >
      <div className="relative">
        <div className="absolute m-3 ml-4 pt-1 flex items-center justify-center ">
          <span
            className={`absolute h-2 w-2 bg-${color}-700 rounded-full  dissolve drop-shadow-3xl opacity-75 z-50`}
          ></span>
          <span
            className={`absolute h-2 w-2  bg-${color}-700 rounded-full  animate-dissolve opacity-75 z-50`}
          ></span>
        </div>
        <Image
          width={100}
          height={100}
          alt="picture"
          className="w-full h-[8vh] object-cover"
          src={
            !place?.image || place.image === "" ? defaultImage : place?.image
          }
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="px-2 md:pb-3 pb-2 md:gap-2 gap-2 flex flex-col justify-between overflow-hidden text-ellipsis bg-background">
        <div className="ml-1 mt-1">
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold truncate ">{place.name}</p>
          </div>
          <div className=" pt-2 md:pt-0 w-full flex items-center justify-between ">
            <p
              className={`${
                place.open ? "text-green-600" : "text-red-600"
              } text-sm text-ellipsis truncate xl:text-base `}
            >
              {place.open ? "Open" : "Closed"}
            </p>
            <div className="w-[4px] h-[4px] rounded-full bg-secondary-text"></div>
            <div className="rounded-sm p-0 pl-[1px] pr-[2px] items-center flex   gap-[2px]">
              <Icons.starIcon className="w-[0.8rem] h-[0.8rem] xl:w-[1.1rem] xl:h-[1.1rem] p-0 fill-secondary-text" />
              <p className=" text-sm  xl:text-base text-ellipsis truncate  text-secondary-text">
                {place?.star ?? 0}({place?.totalReviews ?? 0})
              </p>
            </div>
            <div className="w-[4px] h-[4px] rounded-full bg-secondary-text"></div>
            <p className="text-sm  xl:text-base text-ellipsis truncate  text-secondary-text">
              {Math.floor(Number(place.distance) * 10) / 10} km
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
