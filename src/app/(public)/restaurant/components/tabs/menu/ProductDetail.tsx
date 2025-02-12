"use client";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BasketItem,
  getMainVariant,
  useRestaurantStore,
} from "@/lib/providers/restaurant";
import { MenuItemState, Option, Product, Variant } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
interface Props {
  visible: boolean;
  onClose: () => void;
  product?: Product;
}

export const ProductDetail: React.FC<Props> = ({
  visible,
  onClose,
  product,
}) => {
  const [item, setItem] = useState<BasketItem>();
  const [visibleOption, setVisibleOption] = useState<boolean>();
  const [option, setOption] = useState<Option>();
  const { items, crudItem } = useRestaurantStore();

  const onFinish = () => {
    if (item && product) {
      crudItem("create", {
        product,
        variant: item.variant,
        options: item.input.options,
        quantity: item.input.quantity,
      });
      onClose();
    }
  };
  const buildItem = useCallback(
    (product: Product, variant: Variant): BasketItem => {
      return {
        id: "",
        sort: items.length,
        product,
        variant,
        input: { comment: "", id: variant.id, options: [], quantity: 1 },
        total: variant.salePrice,
      };
    },
    [items.length]
  );

  useEffect(() => {
    if (product) {
      const variant = getMainVariant(product);
      if (variant) setItem(buildItem(product, variant));
    }
  }, [product, buildItem]);

  const changeVariant = (variant: Variant) => {
    if (product) setItem(buildItem(product, variant));
  };

  const setCount = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: "add" | "remove"
  ) => {
    e.stopPropagation();

    if (item) {
      if (type === "add") {
        setItem({
          ...item,
          input: { ...item.input, quantity: item.input.quantity + 1 },
          total: item.total + item.variant.salePrice,
        });
      } else if (item.input.quantity > 1) {
        setItem({
          ...item,
          input: { ...item.input, quantity: item.input.quantity - 1 },
          total: item.total - item.variant.salePrice,
        });
      }
    }
  };

  const selectOptionValue = (val: Option, value: string) => {
    if (item) {
      let options = item.input.options ?? [];
      options = options.concat([{ id: val.id, value }]);
      setItem({
        ...item,
        input: { ...item.input, options },
        total: item.total + val.price,
      });
    }

    setVisibleOption(false);
  };

  const onSelectOption = (val: Option) => {
    if (item) {
      let options = item.input.options ?? [];
      const option = options.find((e) => e.id === val.id);

      if (option) {
        options = options.filter((e) => e.id !== val.id);
        setItem({
          ...item,
          input: { ...item.input, options },
          total: item.total - val.price,
        });
      } else if (val.values && Array.isArray(val.values)) {
        setOption(val);
        setVisibleOption(true);
      } else {
        options = options.concat([{ id: val.id, value: "" }]);
        setItem({
          ...item,
          input: { ...item.input, options },
          total: item.total + val.price,
        });
      }
    }
  };

  return (
    <>
      <Dialog open={visible} onOpenChange={onClose}>
        <DialogContent className="h-screen md:h-[calc(100vh_-_50px)] flex flex-col">
          <DialogHeader className="text-start">
            <DialogTitle>Дэлгэрэнгүй</DialogTitle>
          </DialogHeader>
          <div className="h-full flex flex-col gap-4 overflow-y-auto no-scrollbar">
            <Image
              width={100}
              height={100}
              className="w-full h-full max-h-[270px] object-cover rounded-lg"
              src={product?.image}
              alt={product?.name}
            />
            <div className="flex items-center justify-between">
              <span className="text-gray-400">{product?.name}</span>
              <span className="text-current-2">
                {product && getMainVariant(product)?.salePrice.toLocaleString()}{" "}
                MNT
              </span>
            </div>
            <p>Сонголт</p>
            <div className="flex overflow-y-hidden overflow-x-auto gap-4 min-h-24 no-scrollbar">
              {(
                mainFirst(product)?.variants?.filter(
                  (e) => e.state === MenuItemState.ACTIVE
                ) ?? []
              ).map((variant, i) => {
                const active = item?.variant.id === variant.id;
                return (
                  <div
                    onClick={() => changeVariant(variant)}
                    key={i}
                    className={`flex flex-col justify-between h-24 min-w-64 rounded-lg border-2 p-2 ${
                      active ? "border-current-2" : "border-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{variant.name}</span>
                      <div
                        className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                          active
                            ? "border-current-2 bg-current-2"
                            : "border-gray-300"
                        }`}
                      >
                        {active && (
                          <Icons.check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="whitespace-normal text-nowrap text-sm text-current-2">
                        {variant.salePrice.toLocaleString()} MNT
                      </span>
                      {item && active && (
                        <div className="flex items-center gap-3 justify-center">
                          <Button
                            variant="outline"
                            className="w-8 h-8 text-current-2 border-current-2 p-0"
                            onClick={(e) => setCount(e, "remove")}
                          >
                            <Icons.minus className="text-current-2 w-4 h-4" />
                          </Button>
                          <span className="text-current-2">
                            {item.input.quantity}
                          </span>
                          <Button
                            variant="outline"
                            className="w-8 h-8 text-current-2 border-current-2 p-0"
                            onClick={(e) => setCount(e, "add")}
                          >
                            <Icons.add className="text-current-2 w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-2">
              {item?.variant?.options
                ?.filter((e) => e.state === MenuItemState.ACTIVE)
                .map((option, i) => {
                  const active = item.input.options.find(
                    (e) => e.id === option.id
                  );
                  return (
                    <div
                      onClick={() => onSelectOption(option)}
                      key={i}
                      className={`flex items-center justify-between border-[1px] ${
                        active ? "border-current-2" : "border-gray-200"
                      } rounded-lg py-3 px-2`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                            active
                              ? "border-current-2 bg-current-2"
                              : "border-gray-300"
                          }`}
                        >
                          {active && (
                            <Icons.check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-sm">{option.name}</span>
                      </div>
                      {active?.value && (
                        <span className="text-sm">{active.value}</span>
                      )}
                      <span className="text-sm text-current-2">
                        {option.price.toLocaleString()} MNT
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
          <DialogFooter className="flex justify-between flex-row items-center">
            <span className="mr-auto">{item?.total.toLocaleString()} MNT</span>
            <Button
              variant="outline"
              type="submit"
              className="flex items-center gap-2 text-current-2 border-current-2"
              onClick={onFinish}
            >
              <Icons.shoppingCart className="w-4 h-4 md:w-6 md:h-6 text-current-2" />
              <span>Захиалах</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={visibleOption} onOpenChange={() => setVisibleOption(false)}>
        <DialogContent className="flex flex-col w-[380px] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-start">Сонголт</DialogTitle>
          </DialogHeader>
          <div className="h-full flex flex-col gap-1 overflow-y-auto">
            {option?.values.map((e, i) => (
              <div
                onClick={() => selectOptionValue(option, e)}
                key={i}
                className="p-2 py-3 hover:bg-gray-200 dark:hover:bg-gray-400 rounded cursor-pointer"
              >
                {e}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

function mainFirst(product?: Product): Product | undefined {
  if (!product) return undefined;
  const index = product.variants.findIndex(
    (variant) => variant.id === product.id
  );
  if (index > 0) {
    const filtered = product.variants?.filter((_e, i) => i !== index);
    return { ...product, variants: [product.variants[index], ...filtered] };
  }
  return product;
}
