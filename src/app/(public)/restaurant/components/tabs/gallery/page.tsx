"use client";
import useMediaQuery from "@/hooks/use-media-query";
import { Branch } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
interface Props {
  branch?: Branch;
}

const GalleryTab = ({ branch }: Props) => {
  const { width = window.innerWidth } = useMediaQuery();
  const { t } = useTranslation();
  const web = useMemo(() => width >= 1280, [width]);

  const images = useMemo(() => {
    const imgs = branch?.images ?? [];
    if (imgs.length < 1) return [];

    let count = 1;
    const result = imgs.reduce((res, img, i) => {
      if (web && [6, 7, 4].includes(count)) {
        if (count === 6 || count === 7) {
          if (count === 6) res.push([{ img }, { img: imgs[i + 1] }]);
        } else if (count === 4) res.push({ colSpan: true, img });
        else res.push({ img });
      } else {
        if (web || i % 3 !== 0) res.push({ img });
        else res.push({ colSpan: true, img });
      }

      if (count === 8) count = 1;
      count++;
      return res;
    }, []);

    return result;
  }, [branch, web]);

  if (!branch) return <></>;

  return (
    <div className="w-full space-y-4 h-max mb-16">
      <div className="my-2 flex justify-between w-full items-center gap-2">
        <div className="flex gap-2 mt-2">
          <div className="font-medium"> {t("Picture")}</div>
          <div className="text-current-2">
            ({(branch.images ?? []).length} {t("Picture")})
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className={cn("grid gap-2 grid-cols-3", !web && "grid-cols-2")}>
          {images.map((item, i) => {
            if (!Array.isArray(item)) {
              return (
                <ImgItem
                  key={i}
                  img={item.img}
                  className={item.colSpan ? "col-span-2" : "col-span-1"}
                />
              );
            }

            return (
              <div className="col-span-3 grid gap-2 grid-cols-4" key={i}>
                {item[1]?.img ? (
                  <>
                    <ImgItem img={item[0].img} className="col-span-2" />
                    <ImgItem img={item[1].img} className="col-span-2" />
                  </>
                ) : (
                  <ImgItem img={item[0].img} className="col-span-4" />
                )}
              </div>
            );
          })}
        </div>
      )}
      <br />
    </div>
  );
};

const ImgItem: React.FC<{ img: string; className?: string }> = ({
  img,
  className,
}) => {
  return (
    <div
      className={cn("rounded-lg overflow-hidden min-h-36 max-h-48", className)}
    >
      <Image
        width={100}
        height={100}
        alt="image"
        src={img}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default GalleryTab;
