'use client';
import { ThumbsUp, Share2 } from 'lucide-react';
import { Food } from '@/lib/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Badge, Card, CardFooter } from '@/components/ui';
import { Icons } from '@/components/general';

interface Props {
  food: Food;
}

export const FoodCard = (props: Props) => {
  const { food } = props;
  const [share, setShare] = useState(false);
  const router = useRouter();

  return (
    <Card
      className="w-full max-w-sm overflow-hidden relative rounded-xl"
      onClick={() => router.push(`/restaurant/${food.channel}`)}
    >
      <div className="absolute inset-0">
        <Image
          width={100}
          height={100}
          src={food?.image}
          alt="BBQ Pizza"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10">
        <div className="">
          <div className="flex items-center space-x-2 mb-20 px-2 py-4">
            <Badge className="bg-red-500 text-white font-bold px-2 py-1 rounded-full">HOT</Badge>
            <Badge className="bg-red-500 text-white font-bold px-2 py-1 rounded-full">50%</Badge>
          </div>
          <div className="bg-gradient-to-b from-transparent via-white/90 to-white w-full">
            <div className="gap-2 flex flex-col w-full justify-between items-start py-2  px-2 bg-white bg-opacity-80">
              <div className="flex w-full justify-between items-center">
                <h2 className="text-lg font-semibold truncate  capitalize max-w-44">
                  {food?.name}
                </h2>
                <p className="text-sm font-semibold">
                  Үлдэгдэл: <span className="text-current-2 text-base">2</span>
                </p>
                {/* {food?.branch?.address && (
                  <div className="flex items-center cursor-pointer ">
                    <ThumbsUp className="w-4 h-4 mr-1 text-current-2" />
                    <p className=" text-sm  xl:text-base text-ellipsis truncate  text-secondary-text font-medium opacity-75">
                      {food?.branch?.address}
                    </p>
                  </div>
                )} */}
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center gap-1">
                  <div>
                    <Icons.store className="fill-white h-4 w-4 text-current-2" />
                  </div>
                  <p className="text-sm  xl:text-base text-ellipsis truncate text-secondary-text ">
                    {food.branch?.name}
                  </p>
                </div>
                <div className="flex items-center cursor-pointer gap-2">
                  <div className="flex items-center gap-1">
                    <div>
                      <Icons.navigation className="fill-white h-4 w-4 text-current-2" />
                    </div>
                    <p className="text-sm   text-ellipsis truncate  text-secondary-text ">4.5km</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <div>
                      <Icons.star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    </div>
                    <p className="text-sm   text-ellipsis truncate  text-secondary-text ">3.5</p>
                  </div>
                </div>
              </div>
            </div>
            <CardFooter className="px-1  py-2 border-t border-gray-500 border-opacity-20 flex justify-evenly bg-white bg-opacity-70">
              <div className="flex items-center cursor-pointer ">
                <ThumbsUp className="w-4 h-4 mr-1 text-current-2" />
                <span className="text-sm   text-ellipsis truncate  text-secondary-text ">
                  Like (100)
                </span>
              </div>
              <div
                className="flex items-center  cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShare(true);
                }}
              >
                <Share2 className="w-4 h-4 mr-1 text-current-2" />
                <span className="text-sm  text-ellipsis truncate  text-secondary-text ">
                  Share (50)
                </span>
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
      {/* <ShareModal onClose={() => setShare(false)} visible={share} /> */}
    </Card>
  );
};
