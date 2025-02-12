import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { get, set, del } from "idb-keyval";
import {
  Variant,
  Participant,
  Product,
  MenuItemState,
  OrderItemInput,
  OrderItemOptionInput,
  OrderInput,
  SectionInfo,
} from "../types";
import { v4 } from "uuid";
const storage = {
  name: "restaurant-storage",
  storage: createJSONStorage(() => ({
    getItem: async (name: string): Promise<string | null> => {
      return (await get(name)) || null;
    },
    setItem: async (name: string, value: string): Promise<void> => {
      await set(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
      await del(name);
    },
  })),
};

interface BasketParticipant {
  id: string;
  items: BasketItem[];
}

export interface BasketItem {
  id: string;
  product: Product;
  variant: Variant;
  input: OrderItemInput;
  total: number;
  sort: number;
}

type CRUDType = "create" | "add" | "remove" | "clear" | "update";

interface CRUDInput {
  variant?: Variant;
  product?: Product;
  item?: BasketItem;
  options?: OrderItemOptionInput[];
  quantity?: number;
}

type SetStore = (
  partial:
    | RestaurantStore
    | Partial<RestaurantStore>
    | ((state: RestaurantStore) => Partial<RestaurantStore>),
  replace?: boolean | undefined
) => void;

export interface InputParticipant {
  phone: string;
  id: string;
  name: string;
}

interface RestaurantStore {
  totalPrice: number;
  total: number;
  participants: BasketParticipant[];
  items: BasketItem[];
  loadParticipant: (e: Participant) => void;
  getOrderItemsInput: () => OrderItemInput[];
  crudItem: (type: CRUDType, input: CRUDInput) => void;
  current?: Participant;
  input?: OrderInput;
  setStore: (cb: (set: SetStore) => void) => void;
  setInput: (cb: (input: OrderInput) => OrderInput | undefined) => void;
  inputParticipants: InputParticipant[];
  sections: SectionInfo[];
}

export const useRestaurantStore = create<RestaurantStore>()(
  persist(
    (set, get) => ({
      total: 0,
      totalPrice: 0,
      participants: [],
      current: undefined,
      items: [],
      inputParticipants: [],
      sections: [],
      setStore: (cb) => cb(set),
      setInput: (cb) => {
        const input = cb(get()?.input ?? ({} as OrderInput));
        set({ input });
      },

      getOrderItemsInput: () => {
        const items = get()?.items ?? [];
        return items.map((item) => item.input);
      },

      loadParticipant: (current) =>
        set(({ participants }) => load(participants, current)),

      crudItem: (type, input) =>
        set(({ participants, current, items: old }) => {
          const items = crudItems[type](old, input);
          return summary(items, participants, current?.id);
        }),
    }),
    storage
  )
);

const crudItems: Record<
  CRUDType,
  (items: BasketItem[], input: CRUDInput) => BasketItem[]
> = {
  create: (items, { product, variant, options = [], quantity = 1 }) => {
    if (!product || !variant) return items;

    const input: OrderItemInput = {
      comment: "",
      id: variant.id,
      options,
      quantity,
    };

    const item = calculateItemTotal({
      id: v4(),
      product,
      variant,
      total: 0,
      sort: (items ?? []).length + 1,
      input,
    });

    return items.concat([item]);
  },
  update: (items, { item }) => {
    if (!item) return items;
    return items.map((e) => (e.id === item.id ? calculateItemTotal(item) : e));
  },
  add: (items, { item }) => {
    if (item) {
      item = calculateItemTotal({
        ...item,
        input: {
          ...item.input,
          quantity: item.input.quantity + 1,
        },
      });
      return items.map((e) => (e.id === item!.id ? item! : e));
    }

    return items;
  },
  remove: (items, { item }) => {
    if (!item) return items;

    if (item.input.quantity <= 1) return items.filter((e) => e.id !== item!.id);
    item = calculateItemTotal({
      ...item,
      input: {
        ...item.input,
        quantity: item.input.quantity - 1,
      },
    });

    return items.map((e) => (e.id === item!.id ? item! : e));
  },
  clear: () => [],
};

const summary = (
  items: BasketItem[] = [],
  participants: BasketParticipant[] = [],
  id?: string
): Partial<RestaurantStore> => {
  const index = participants.findIndex((e) => e.id === id);
  if (index === -1) return {};

  return {
    items,
    participants: participants.reduce((res: BasketParticipant[], curr) => {
      if (curr.id === id) res.push({ id, items });
      else if ((curr.items ?? []).length > 0) res.push(curr);
      return res;
    }, []),
    ...items.reduce(
      (res, curr) => {
        res.total += curr.input.quantity;
        res.totalPrice += curr.total;
        return res;
      },
      { total: 0, totalPrice: 0 }
    ),
  };
};

const calculateItemTotal = (item: BasketItem) => {
  let optionsTotal = 0;

  item.input.options?.forEach((e) => {
    const option = item.variant.options?.find((a) => a.id === e.id);
    if (option) optionsTotal += option.price;
  });

  const total = item.input.quantity * (item.variant.salePrice + optionsTotal);

  return { ...item, total };
};

const load = (
  participants: BasketParticipant[] = [],
  participant?: Participant
): Partial<RestaurantStore> => {
  if (!participant?.menu?.categories) return {};
  const i = participants.findIndex((e) => e.id === participant.id);

  const menuProducts = participant.menu.categories.reduce(
    (res: Product[], curr) => {
      let products = (curr.children ?? []).flatMap((e) => e.products ?? []);
      products = products.concat(curr.products ?? []);
      res = res.concat(getFilteredItems(products));
      return res;
    },
    []
  );

  let items: BasketItem[] = [];

  if (i !== -1) {
    items = (participants[i].items ?? []).reduce((res: BasketItem[], curr) => {
      const product = menuProducts.find((e) => e.id === curr.product.id);
      const variant = product?.variants.find((e) => e.id === curr.variant.id);

      if (variant) {
        const options = (curr.input.options ?? []).filter((e) =>
          variant.options?.find((a) => a.id === e.id)
        );

        res = crudItems.create(res, {
          variant,
          product,
          options,
          quantity: curr.input.quantity,
        });
      }

      return res;
    }, []);

    participants[i].items = items;
  } else participants.push({ id: participant.id, items });

  return {
    ...summary(items, participants, participant.id),
    current: participant,
  };
};

export const getMainVariant = (product: Product): Variant | undefined => {
  const variants =
    product.variants?.slice().sort((a, b) => a.salePrice - b.salePrice) ?? [];

  return variants.find((e) => e.id === product.id) ?? variants[0];
};

export const getFilteredItems = (
  items: Product[] = [],
  filter?: (product: Product) => boolean
) => {
  return items.reduce((products: Product[], product) => {
    const main = getMainVariant(product)?.state;

    const f1 = !filter || filter(product);

    if (
      product.state === MenuItemState.ACTIVE &&
      (!main || main === MenuItemState.ACTIVE) &&
      f1
    ) {
      products.push({
        ...product,
        variants: product.variants.reduce((variants: Variant[], variant) => {
          if (variant.state === MenuItemState.ACTIVE) {
            variants.push({
              ...variant,
              options: variant.options?.filter(
                (e) => e.state === MenuItemState.ACTIVE
              ),
            });
          }
          return variants;
        }, []),
      });
    }
    return products;
  }, []);
};
