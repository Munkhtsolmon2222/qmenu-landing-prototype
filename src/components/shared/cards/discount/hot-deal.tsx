import { Badge } from '@/components/ui';
import { CardProps } from '.';
import { Icons } from '@/components/general';
import { calculateDistance } from '@/lib/utils';
import defaultImage from '@/assets/images/restaurant.png';

interface Props extends CardProps {}

export const HotDeal: React.FC<Props> = ({ discount }) => {
  return (
    <>
      <div className="absolute inset-0">
        <img
          src={discount.image || defaultImage.src}
          alt={discount.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-24 px-2 py-4">
          <Badge className="bg-red-500 text-white font-bold px-2 py-1 rounded-full">HOT</Badge>
          <Badge className="bg-red-500 text-white font-bold px-2 py-1 rounded-full">
            {discount.value}%
          </Badge>
          <div className="ml-auto overflow-hidden shadow-md w-10 h-10 flex items-center justify-center bg-white rounded-full">
            <img
              src={discount.branch.logo}
              alt={discount.branch.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="bg-gradient-to-b from-transparent via-white/90 to-white w-full">
          <div className="gap-2 flex flex-col w-full justify-between items-start py-2 px-2 bg-white bg-opacity-80 shadow-md">
            <div className="flex w-full justify-between items-center">
              <h2 className="text-lg font-semibold truncate capitalize max-w-44">
                {discount.name}
              </h2>
              <p className="text-sm font-semibold">
                <span className="text-current-2 text-base">{discount.buyX}</span>
                {' үлдлээ'}
              </p>
            </div>

            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-1">
                <div>
                  <Icons.store className="fill-white h-4 w-4 text-current-2" />
                </div>
                <p className="text-sm  xl:text-base text-ellipsis truncate text-secondary-text ">
                  {discount.branch.name}
                </p>
              </div>
              {discount.distance && (
                <div className="flex items-center cursor-pointer gap-2">
                  <div className="flex items-center gap-1">
                    <div>
                      <Icons.navigation className="fill-white h-4 w-4 text-current-2" />
                    </div>
                    <p className="text-sm   text-ellipsis truncate  text-secondary-text ">
                      {calculateDistance(discount.distance)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
