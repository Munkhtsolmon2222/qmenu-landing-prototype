"use client";
import OrderDialog from "@/components/modal/OrderDialog/page";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useMediaQuery from "@/hooks/use-media-query";
import {
  PAGE_ORDER,
  PAGE_ORDER_TYPE,
  PAGE_RESTAURANT,
} from "@/lib/config/page";
import { BasketItem, useRestaurantStore } from "@/lib/providers/restaurant";
import { OrderType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";

const Basket = () => {
  const { id } = useParams();
  const { items, crudItem, totalPrice, setInput, input } = useRestaurantStore();
  const { width = window.innerWidth } = useMediaQuery();
  const [item, setItem] = useState<BasketItem>();
  const [visibleComment, setVisibleComment] = useState<boolean>();
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  const { t } = useTranslation();

  const showAddComment = (item: BasketItem) => {
    setItem(item);
    setVisibleComment(true);
  };

  const onOrder = () => {
    if (!input?.type) setInput((e) => ({ ...e, type: OrderType.PreOrder }));
    router.push(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_TYPE}`);
  };

  return (
    <>
      <OrderDialog.Header>{t("Your cart")}</OrderDialog.Header>

      <OrderDialog.Container className="flex flex-col gap-2.5">
        {items
          ?.slice()
          .sort((a, b) => a.sort - b.sort)
          .map((item, i) => (
            <div
              key={i}
              className="flex h-28 min-h-28 rounded-lg overflow-hidden border bg-background gap-2"
            >
              <div className="w-40 max-w-40 h-full place-self-center rounded-lg overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  alt="item.product"
                  className="rounded-lg h-full w-full"
                  src={item.product.image}
                />
              </div>

              <div
                className={cn(
                  "flex flex-col justify-between p-1 items-start",
                  width < 360 ? "max-w-36" : "max-w-40"
                )}
              >
                <span className="text-base font-medium line-clamp-2 ">
                  {item.variant.name}
                </span>

                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => showAddComment(item)}
                >
                  <Icons.pencilLine className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400 line-clamp-1 w-28">
                    {!item.input.comment
                      ? t("Addional request")
                      : item.input.comment}
                  </span>
                </div>

                <span className="text-base font-medium text-primary ">
                  {item.total.toLocaleString()} MNT
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 p-2 justify-center ml-auto">
                <Button
                  variant="outline"
                  className="w-8 h-8 text-current-2 border-current-2 p-0"
                  onClick={() => crudItem("add", { item })}
                >
                  <Icons.add className="text-current-2 w-4 h-4" />
                </Button>
                <span className="text-current-2">{item.input.quantity}</span>
                <Button
                  variant="outline"
                  className="w-8 h-8 text-current-2 border-current-2 p-0"
                  onClick={() => crudItem("remove", { item })}
                >
                  <Icons.minus className="text-current-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
      </OrderDialog.Container>

      {items.length > 0 && (
        <OrderDialog.Footer disabled={items.length < 1} onClick={onOrder}>
          {items.length > 0 ? (
            <>
              <span className="text-white">{t("Order")}</span>
              <span className="text-white">
                {totalPrice.toLocaleString()} MNT
              </span>
            </>
          ) : (
            <span className="text-white mx-auto">{t("Order")}</span>
          )}
        </OrderDialog.Footer>
      )}

      <Dialog
        open={visibleComment}
        onOpenChange={() => setVisibleComment(false)}
      >
        <DialogContent className="flex flex-col w-[380px] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-start">
              {t("Addional request")}
            </DialogTitle>
          </DialogHeader>
          <div className="h-full flex flex-col gap-1">
            <Textarea
              id="comment"
              placeholder={t("Addional request")}
              defaultValue={item?.input.comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="submit"
              className="gap-2 text-current-2 border-current-2"
              onClick={() => {
                if (item) {
                  crudItem("update", {
                    item: {
                      ...item,
                      input: { ...item.input, comment },
                    },
                  });
                  setVisibleComment(false);
                }
              }}
            >
              <span className="text-current-2">{t("Save")}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Basket;
