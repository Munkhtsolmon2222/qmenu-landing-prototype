"use client";
import { Icons } from "../shared/icons";
import defaultImage from "@/assets/images/restaurant.png";
import { formatTugrug } from "@/lib/utils";
import { TableInfo } from "@/lib/types/branch";
import { Food } from "@/lib/types/food";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface Props {
  food: Food;
}

type AvailabilityStatus = {
  percentage: number;
  color: string;
};

export function getAvailabilityStatus(
  tableInfo: TableInfo
): AvailabilityStatus {
  const { available, total } = tableInfo;

  const percentage = total === 0 ? 0 : (available ?? 0 / total) * 100;

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

export function SearchProduct(props: Props) {
  const { food } = props;
  // const [like, setLiked] = useState
  const router = useRouter();

  return (
    <div
      className="rounded-lg overflow-hidden border md:min-w-52 min-w-40 w-full"
      onClick={() => router.push(`/restaurant/${food.id}`)}
    >
      <div className="relative">
        <Image
          width={100}
          height={100}
          alt="picture"
          className="w-full h-20 object-cover"
          src={food.image ?? defaultImage}
          style={{
            objectFit: "cover",
          }}
        />
        {/* <div
          className={` stroke-white rounded-md overflow-hidden absolute top-0 left-0 m-2 flex flex-row  px-2 py-[0.1rem] bg-secondary-background`}
        >
          <Icons.starIcon className="w-[0.8rem] h-[0.8rem] md:w-[1rem] md:h-[1rem] mt-[0.2rem] md:mt-[0.1rem] p-0 fill-white" />
          <p className="text-sm text-white">
            {food.star} ({food.totalReviews})
          </p>
        </div> */}
      </div>
      <div className="p-2 pb-4 gap-2 flex flex-col justify-between overflow-hidden text-ellipsis">
        <div>
          <div className="flex justify-between items-center">
            <h4 className=" text-sm font-bold truncate">{food.name}</h4>
            <h4 className=" text-sm font-bold truncate">
              {formatTugrug(food.price)}
            </h4>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className=" text-ellipsis truncate  text-secondary-text text-sm">
            {food?.branch?.name ?? food.name}
          </p>
          <div className="w-[4px] h-[4px] rounded-full bg-secondary-text"></div>
          <div className="rounded-sm p-0 pl-[1px] pr-[2px] items-center flex   gap-[2px]">
            <Icons.starIcon className="w-[0.8rem] h-[0.8rem] xl:w-[1.1rem] xl:h-[1.1rem] p-0 fill-secondary-text" />
            <p className=" text-ellipsis truncate text-sm  text-secondary-text">
              {food?.branch?.star ?? 0}({food?.branch?.totalReviews ?? 0})
            </p>
          </div>
          <div className="w-[4px] h-[4px] rounded-full bg-secondary-text"></div>
          <p className=" text-ellipsis truncate  text-secondary-text text-sm">
            {Math.floor(Number(food?.branch?.distance ?? 0) * 10) / 10} km
          </p>
        </div>
      </div>
    </div>
  );
}
