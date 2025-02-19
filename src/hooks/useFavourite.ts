"use client";
import { EDIT_FAVOURITE } from "@/graphql/mutation/favourite";
import { GET_FAVOURITES } from "@/graphql/query";
import { Favourite, FavouriteItemType } from "@/lib/types";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { toast as showToast } from "@/components/ui/use-toast";
import { getPayload } from "@/lib/providers/auth";

export const useFavourite = (
  type: FavouriteItemType,
  id: string,
  toast: boolean = true
) => {
  const [liked, setLiked] = useState<boolean>(false);
  const token = localStorage?.getItem("token");

  const {
    loading,
    data: { getFavourites: favourites } = { getFavourites: [] },
  } = useQuery<{
    getFavourites: Favourite[];
  }>(GET_FAVOURITES, {
    fetchPolicy: "cache-first",
    variables: { type },
    skip: !token,
    onCompleted({ getFavourites: arr }) {
      if (
        arr.find(
          (e) =>
            (type === FavouriteItemType.BRANCH ? e.branch : e.product)?.id ===
            id
        )
      )
        setLiked(true);
    },
  });

  const [editFavourite, { loading: editing }] = useMutation<{
    editFavourite: boolean;
  }>(EDIT_FAVOURITE);

  const onClickLike = () => {
    if (getPayload()?.role !== "customer") {
      showToast({
        title: "",
        description: "Та нэвтрэнэ үү",
      });
      return;
    }

    editFavourite({
      variables: { id, type },
      onCompleted: ({ editFavourite }) => {
        setLiked(editFavourite);

        if (editFavourite && toast) {
          showToast({
            title: "Амжилттай",
            description: "Амжилттай нэмэгдлээ",
          });
        }
      },
    });
  };

  return {
    loading,
    favourites,
    editing,
    onClickLike,
    liked,
  };
};
