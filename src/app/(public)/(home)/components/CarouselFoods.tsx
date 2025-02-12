import FoodCard from "@/components/cards/FoodCard";
import { Food } from "@/lib/types";
import Link from "next/link";

interface Props {
  foods: Food[];
  name: string;
}

const CarouselFoods = (props: Props) => {
  const { foods } = props;

  if (foods?.length === 0) return <></>;

  return (
    <div className="overflow-hidden flex flex-col w-full md:gap-2 gap-1 ">
      <div className="flex items-center justify-between max-w-[90rem]  ">
        <h1 className="font-medium text-lg xl:text-xl">Хоол 🍔</h1>
        <Link href="/list">
          <p className="text-current text-sm text-end font-medium">Бүгд</p>
        </Link>
      </div>
      <div className="gap-4 overflow-y-auto no-scrollbar w-full  flex flex-row">
        {foods
          ?.slice()
          ?.sort((a, b) => {
            if (a.branch === null) return 1;
            if (b.branch === null) return -1;
            return 0;
          })
          .map((food, index) => (
            <div key={index} className="min-w-72">
              <FoodCard food={food} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CarouselFoods;
