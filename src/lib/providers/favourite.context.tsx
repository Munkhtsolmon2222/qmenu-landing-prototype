'use client';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useAction, usePayload } from '../hooks';
import { EDIT_FAVOURITE, GET_FAVOURITES } from '@/actions';
import { FavouriteItemType } from '../types';
import { CUSTOMER } from '../constant';
import { showToast } from '../helpers';

export interface FavouriteContextType {
  editFavourite: (type: FavouriteItemType, id: string, toast?: boolean) => void;
  isFavourite: (type: FavouriteItemType, id: string) => boolean;
  loading: boolean;
  editing: boolean;
  loadingId?: string | null;
}

export const FavouriteContext = createContext({} as FavouriteContextType);

export const FavouriteProvider = ({ children }: React.PropsWithChildren) => {
  const { payload } = usePayload();
  const [likedBranches, setLikedBranches] = useState<string[]>([]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const { loading: branchLoading } = useAction(GET_FAVOURITES, FavouriteItemType.BRANCH, {
    onSuccess(data) {
      if (!data) return;
      setLikedBranches(data.map((e) => e.branch.id));
    },
  });

  const { loading: productLoading } = useAction(GET_FAVOURITES, FavouriteItemType.PRODUCT, {
    onSuccess(data) {
      if (!data) return;
      setLikedProducts(data.map((e) => e.product.id));
    },
  });

  const { action, loading: editing } = useAction(EDIT_FAVOURITE, { lazy: true });

  const editFavourite = useCallback(
    (type: FavouriteItemType, id: string, toast?: boolean) => {
      if (payload?.role !== CUSTOMER) {
        showToast('Та нэвтрэнэ үү');
        return;
      }

      setLoadingId(id);
      action(id, type, {
        onSuccess: (editFavourite) => {
          if (type === FavouriteItemType.BRANCH) {
            if (editFavourite) setLikedBranches((prev) => [...prev, id]);
            else setLikedBranches((prev) => prev.filter((e) => e !== id));
          } else {
            if (editFavourite) setLikedProducts((prev) => [...prev, id]);
            else setLikedProducts((prev) => prev.filter((e) => e !== id));
          }

          if (toast) showToast(editFavourite ? 'Амжилттай нэмэгдлээ' : 'Амжилттай хасагдлаа');
        },
      });
    },
    [payload?.role, action, showToast, setLikedBranches, setLikedProducts, setLoadingId, loadingId],
  );

  const isFavourite = useCallback(
    (type: FavouriteItemType, id: string) => {
      return type === FavouriteItemType.BRANCH
        ? likedBranches.includes(id)
        : likedProducts.includes(id);
    },
    [likedBranches, likedProducts],
  );

  const context = useMemo(
    () => ({
      editFavourite,
      isFavourite,
      editing,
      loading: branchLoading || productLoading,
      loadingId,
    }),
    [editFavourite, isFavourite, editing, branchLoading, productLoading, loadingId],
  );

  return <FavouriteContext value={context}>{children}</FavouriteContext>;
};

export const useFavourite = () => {
  const context = useContext(FavouriteContext);

  if (!context) {
    throw new Error('useFavourite must be used within a FavouriteProvider');
  }

  return context;
};

export default FavouriteProvider;
