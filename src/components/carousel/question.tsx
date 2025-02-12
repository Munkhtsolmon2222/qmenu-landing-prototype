"use client";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import questions from "./questions.json";
import { useEffect, useState } from "react";

export function CarouselQuestion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const moveNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === questions.length - 1 ? 0 : prevIndex + 1
      );
    };

    const intervalId = setInterval(moveNext, 1200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Carousel className="max-w-[14rem] w-screen">
      <div
        className=" transition-transform duration-500 ease-in-out w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <CarouselContent>
          {questions.map((place, index) => (
            <CarouselItem key={index}>
              <Card className="p-2 text-center w-full">{place.question}</Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
}
