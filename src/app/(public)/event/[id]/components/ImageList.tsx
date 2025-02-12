"use client";
import { IEvent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Photos } from "./Photos";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import Image from "next/image";
interface Props {
  event: IEvent;
}

export const ImageList: React.FC<Props> = ({
  event: { image, images: imgs = [] },
}) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState<number>(0);

  const images: string[] = image ? [image, ...imgs] : imgs;

  const row1Images = images.slice(0, 2);
  const row2Images = images.slice(2, images.length);

  const onClickImage = (e: string) => {
    const indx = images.indexOf(e);
    setIndex(indx);
    setVisible(true);
  };

  return (
    <div className="flex flex-col mt-2">
      <Row1 images={row1Images} onClick={onClickImage} />
      <Row2 images={row2Images} onClick={onClickImage} />

      <Photos
        images={images}
        setVisible={setVisible}
        visible={visible}
        index={index}
        setIndex={setIndex}
      />
    </div>
  );
};

interface ItemProps {
  images: string[];
  onClick: (e: string) => void;
}

const Row1: React.FC<ItemProps> = ({ images, onClick }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (images.length === 0) return <></>;
  return (
    <div
      className={cn(
        "w-full h-full max-h-56 min-h-56 sm:max-h-72 md:min-h-72 overflow-hidden mb-0.5 cursor-pointer",
        images.length > 1 ? "grid grid-cols-2 gap-0.5" : ""
      )}
    >
      {loading ? (
        <div className="flex justify-center items-center h-full  ">
          <FadeLoader color="#111010" height={14} width={6} />
        </div>
      ) : (
        images.map((e, index) => (
          <Image
            width={100}
            height={100}
            onClick={() => onClick(e)}
            src={e}
            key={index}
            alt="images"
            className="w-full object-cover h-full"
          />
        ))
      )}
    </div>
  );
};

const Row2: React.FC<ItemProps> = ({ images: imgs, onClick }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (imgs.length === 0) return <></>;
  const images = imgs.slice(0, 3);

  return (
    <div
      className={cn(
        "w-full h-full max-h-40 min-h-40 sm:max-h-56 md:min-h-56 overflow-hidden gap-0.5 cursor-pointer",
        images.length > 2
          ? "grid grid-cols-3"
          : images.length > 1
          ? "grid grid-cols-2 max-h-56 min-h-56 sm:max-h-72 md:min-h-72"
          : ""
      )}
    >
      {loading ? (
        <div className="flex justify-center items-center h-full pl-40 md:pl-80 ">
          <FadeLoader color="#111010" height={14} width={6} />
        </div>
      ) : (
        images.map((e, index) => (
          <div
            className="w-full h-full relative"
            key={index}
            onClick={() => onClick(e)}
          >
            <Image
              width={100}
              height={100}
              src={e}
              alt="images"
              className="w-full object-cover h-full"
            />
            {index === 2 && imgs.length > 3 && (
              <div className="absolute w-full h-full max-h-44 min-h-44 sm:max-h-56 md:min-h-56 top-0 left-0 bg-opacity-40 flex items-center justify-center bg-[#0000004d]">
                <span className="text-white text-3xl font-medium">
                  +{imgs.length - 3}
                </span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
