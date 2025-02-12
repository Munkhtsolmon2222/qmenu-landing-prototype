"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { RestaurantChat } from "../cards/RestaurantChatCard";
import { useEffect, useState } from "react";
interface Props {
  places;
}

export function CarouselChat(props: Props) {
  const { places } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const moveNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === places.length - 1 ? 0 : prevIndex + 1
      );
    };

    const intervalId = setInterval(moveNext, 1200);

    return () => clearInterval(intervalId);
  }, [places.length]);

  return (
    <Carousel className="max-w-[10rem] w-screen">
      <div
        className=" transition-transform duration-500 ease-in-out w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <CarouselContent>
          {places.map((place, index) => (
            <CarouselItem key={index}>
              <div className="p-0">
                <RestaurantChat key={index} place={place} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
}
