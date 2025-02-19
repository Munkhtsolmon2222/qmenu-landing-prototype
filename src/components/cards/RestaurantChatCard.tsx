"use client";
import { Card } from "@/components/ui/card";
import { Icons } from "../shared/icons";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface Props {
  place;
}

export function RestaurantChat(props: Props) {
  const { place } = props;
  const router = useRouter();

  return (
    <Card
      key={place.logo}
      onClick={() => router.push(`/restaurant/${place.id}`)}
      className="relative w-full px-2 bg-primary-foreground h-max overflow-hidden"
    >
      <div className="bg-primary-foreground rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer">
        <div className="flex flex-col md:flex-row items-center justify-start gap-3  ">
          <Image
            width={80}
            height={80}
            alt="Restaurant Image"
            className="rounded-lg object-cover w-32 h-full"
            src={place.logo}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
            }}
          />
          <div className="pb-2 gap-1 flex flex-col items-start justify-start overflow-hidden text-ellipsis w-full h-full">
            <div>
              <h3 className="text-white text-sm font-bold truncate overflow-hidden">
                {place.name}
              </h3>
            </div>
            <div className="w-full flex items-center justify-between gap-2">
              <div className="flex gap-2 items-center">
                <div>
                  <Badge className="rounded-sm p-0 pl-[1px] pr-[2px] items-center bg-green-700  text-white gap-[2px]">
                    <Icons.starIcon className="w-[0.85rem] h-[0.85rem] p-0 fill-primary" />
                    <p className="text-sm text-ellipsis truncate">1.5</p>
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm text-ellipsis truncate ">
                  1.3 km
                </p>
              </div>
              <p className="text-green-600 text-sm text-ellipsis truncate ">
                Open
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
