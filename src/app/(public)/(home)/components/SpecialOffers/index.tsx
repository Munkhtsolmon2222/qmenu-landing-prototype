"use client";
import Loader from "@/components/shared/loader";
import special from "@/assets/images/special-offer.png";
import useMediaQuery from "@/hooks/use-media-query";
import { useEffect, useRef, useState } from "react";
import { PAGE_OFFERS } from "@/lib/config/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  categories;
  addFilter;
  loading;
  category;
}

function SpecialOffers({ categories, loading }: Props) {
  const router = useRouter();
  const { device } = useMediaQuery();
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!categories.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            setActiveIndex(Number(target.dataset.index));
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    const images = imageRefs.current;
    images.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => {
      images.forEach((img) => {
        if (img) observer.unobserve(img);
      });
    };
  }, [categories]);

  if (loading) return <Loader />;
  if (!categories.length) return null;

  return (
    <div>
      <div className="flex w-full flex-row justify-between items-center">
        <h1 className="font-medium text-lg xl:text-xl">Special Offers</h1>
        <Link href={PAGE_OFFERS}>
          <p className="text-current text-sm text-end font-medium z-50">Бүгд</p>
        </Link>
      </div>

      <div className="gap-4 overflow-y-auto no-scrollbar w-full py-2 flex flex-row">
        {categories.map((place, index) => (
          <Image
            width={100}
            height={100}
            key={index}
            src={special}
            alt={place.name || "Category Image"}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            data-index={index}
            onClick={() =>
              router.push(`/list?offer=${encodeURIComponent(place.name)}`)
            }
            className="rounded-lg cursor-pointer lg:max-w-96 h-auto "
          />
        ))}
      </div>

      {device === "mobile" && (
        <div className="gap-1 overflow-y-auto no-scrollbar w-full justify-center flex flex-row">
          {categories.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === activeIndex ? "bg-current" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SpecialOffers;
