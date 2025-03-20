'use client';
import { BasketItem, getMainVariant, useRestaurantStore } from '@/lib/providers/restaurant';
import { Branch, FavouriteItemType, Product as ProductType } from '@/lib/types';
import { useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { ProductCardList } from './ProductCardList';
import { useMediaQuery } from '@/lib/hooks';
import { useFavourite } from '@/lib/providers';

interface Props {
  product: ProductType;
  onClick: () => void;
  list?: boolean;
  hideImage?: boolean;
  participant?: Branch;
}

export interface ProductChildProps {
  product: ProductType;
  onClick: (product: ProductType, type?: 'create' | 'add') => void;
  basketItem?: BasketItem;
  hideImage?: boolean;
  liked: boolean;
  onClickLike: () => void;
  loading: boolean;
  participant?: Branch;
}

export const Product = ({ product, onClick: cb, list, hideImage, participant }: Props) => {
  const { items, crudItem } = useRestaurantStore();
  const { width } = useMediaQuery();
  const { isFavourite, editFavourite, loading, editing, loadingId } = useFavourite();

  const liked = isFavourite(FavouriteItemType.PRODUCT, product.productId);

  const basketItem = useMemo(
    () => items.find((e) => e.variant.id === getMainVariant(product)?.id),
    [items],
  );

  const onClick = (product: ProductType, type?: 'create' | 'add') => {
    if (!product.variants || !product.variants[0]) return;
    if (product.variants.length > 1 || (getMainVariant(product)?.options ?? []).length > 0) {
      cb();
    } else {
      if (type === 'create') {
        crudItem('create', { product, variant: product.variants[0] });
      } else if (basketItem) {
        if (type === 'add') crudItem('add', { item: basketItem });
        else crudItem('remove', { item: basketItem });
      }
    }
  };

  if (list && (width || window.innerWidth) < 500)
    return (
      <ProductCardList
        participant={participant}
        loading={loading || (editing && loadingId === product.productId)}
        liked={liked}
        product={product}
        onClick={onClick}
        basketItem={basketItem}
        hideImage={hideImage}
        onClickLike={() => editFavourite(FavouriteItemType.PRODUCT, product.productId)}
      />
    );

  return (
    <ProductCard
      participant={participant}
      loading={loading || (editing && loadingId === product.productId)}
      liked={liked}
      product={product}
      onClick={onClick}
      basketItem={basketItem}
      hideImage={hideImage}
      onClickLike={() => editFavourite(FavouriteItemType.PRODUCT, product.productId)}
    />
  );
};
