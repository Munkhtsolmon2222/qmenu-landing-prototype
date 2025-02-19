"use client";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { getMainVariant, useRestaurantStore } from "@/lib/providers/restaurant";
import { ProductChildProps } from "./Product";
import { useTranslation } from "react-i18next";
import { Translate } from "@/components/translator";
import Image from "next/image";
export const ProductCard: React.FC<ProductChildProps> = ({
  product,
  basketItem,
  onClick,
  onClickLike,
  liked,
  loading,
  participant,
}) => {
  const { current } = useRestaurantStore();
  const { t } = useTranslation();

  return (
    <div className="rounded-xl overflow-hidden border relative min-h-[17rem] flex flex-col">
      <Image
        width={100}
        height={100}
        alt="product.image"
        className="w-full h-36 xl:h-48 object-cover"
        src={
          product.image === ""
            ? participant?.logo
            : product.image ?? participant?.logo
        }
      />
      <Icons.heart
        onClick={(e) => {
          e.stopPropagation();
          if (!loading) onClickLike();
        }}
        className={`w-7 h-7 cursor-pointer ${
          liked
            ? loading
              ? "opacity-45"
              : "fill-current-2"
            : loading
            ? "opacity-45"
            : "opacity-90"
        } stroke-current-2 absolute top-0 right-0 m-2 bg-secondary-background rounded-full p-1`}
      />
      <div className="relative p-2 flex flex-col flex-1 xl:gap-1">
        <h3 className="xl:w-36 font-semibold line-clamp-2 break-words">
          <Translate>{product.name}</Translate>
        </h3>
        <p className="text-sm italic dark:text-gray-400 text-gray-600 min-h-5 line-clamp-2">
          <Translate>{product.description}</Translate>
        </p>
        <div className="flex flex-wrap max-w-20 xl:absolute xl:top-0.5 xl:right-2 items-center justify-between my-2 ">
          <span className="text-sm font-semibold break-words">
            {product.variants.length > 1
              ? `${product.variants
                  .map((v) => v.salePrice ?? v.price)
                  .sort((a, b) => a - b)[0]
                  .toLocaleString()}₮ - ${product.variants
                  .map((v) => v.salePrice ?? v.price)
                  .sort((a, b) => b - a)[0]
                  .toLocaleString()}₮`
              : (
                  product.variants?.[0]?.salePrice ??
                  product.variants?.[0]?.price
                )?.toLocaleString()}
          </span>
        </div>
        {current?.orderable &&
          (!basketItem ||
          product.variants?.length > 1 ||
          (getMainVariant(product)?.options ?? []).length > 0 ? (
            <Button
              variant="outline"
              className="flex py-4 mt-auto items-center gap-2 w-full h-8 border-current-2"
              onClick={() => onClick(product, "create")}
            >
              {product.variants?.length > 1 ||
              (getMainVariant(product)?.options ?? []).length > 0 ? (
                <div className="text-current-2">{t("Order")}</div>
              ) : (
                <>
                  <Icons.shoppingCart className="text-current-2 w-5" />
                  <div className="text-current-2">{t("Order")}</div>
                </>
              )}
            </Button>
          ) : (
            <div className="flex items-center gap-3 mt-auto justify-center">
              <Button
                variant="outline"
                className="w-8 h-8 text-current-2 border-current-2 p-0"
                onClick={() => onClick(product)}
              >
                <Icons.minus className="text-current-2 w-4 h-4" />
              </Button>
              <span className="text-current-2">
                {basketItem.input.quantity}
              </span>
              <Button
                variant="outline"
                className="w-8 h-8 text-current-2 border-current-2 p-0"
                onClick={() => onClick(product, "add")}
              >
                <Icons.add className="text-current-2 w-4 h-4" />
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};
