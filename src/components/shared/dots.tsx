import React, { useEffect, useState } from "react";

interface Props {
  imageRefs: React.RefObject<HTMLImageElement[]>;
  length: number;
}

function Dots({ imageRefs, length }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
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

    const imageElements = imageRefs.current;

    imageElements.forEach((img) => {
      if (img) observer.observe(img);
    });
    return () => {
      imageElements.forEach((img) => {
        if (img) observer.unobserve(img);
      });
    };
  }, [imageRefs]);

  return (
    <div className="gap-1 overflow-y-auto no-scrollbar w-full justify-center md:hidden flex flex-row">
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full ${
            index === activeIndex ? "bg-current" : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
}

export default Dots;
