"use client";
import { Icons } from "../shared/icons";
import { useState } from "react";
import {
  FetchReview,
  ReviewInput,
  ReviewItemType,
  ReviewType,
  ReviewerType,
} from "@/lib/types";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "@/graphql/mutation/review";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { LoadingButton } from "../ui/loading-button";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import { Dialog, DialogContent } from "../ui/dialog";
import { GET_REVIEWS } from "@/graphql/query";
import clean from "@/assets/images/reviews/clean.svg";
import food from "@/assets/images/reviews/food.svg";
import service from "@/assets/images/reviews/service.svg";
import { useTranslation } from "react-i18next";
import { Translate } from "@/components/translator";
import Image from "next/image";
interface Props {
  onClose: () => void;
  visible: boolean;
  type?: ReviewItemType;
}

export const ReviewTypes = [
  {
    name: "Үйлчилгээ",
    icon: service,
    type: ReviewType.S,
  },
  {
    name: "Орчин",
    icon: clean,
    type: ReviewType.V,
  },
  {
    name: "Амт чанар",
    icon: food,
    type: ReviewType.F,
  },
];

const ReviewForm: React.FC<Props> = ({
  visible,
  onClose,
  type: propType = ReviewItemType.B,
}) => {
  const { current } = useRestaurantStore();
  const [stars, setStars] = useState(4);
  const [type, setType] = useState(ReviewType.S);
  const [comment, setComment] = useState("");
  const { t } = useTranslation();

  const [createReview, { loading }] = useMutation(CREATE_REVIEW, {
    update(cache, { data: { createReview } }) {
      const caches = cache.readQuery<{ getReviews: FetchReview }>({
        query: GET_REVIEWS,
        variables: { id: current?.branch.id, type: propType },
      });

      if (caches && caches.getReviews) {
        cache.writeQuery({
          query: GET_REVIEWS,
          variables: { id: current?.branch.id, type: propType },
          data: {
            getReviews: {
              ...caches.getReviews,
              reviews: caches.getReviews.reviews.concat([createReview]),
            },
          },
        });
      }
    },
    onCompleted() {
      onClose();
    },
  });

  const onSubmit = () => {
    if (current?.branch) {
      const input: ReviewInput = {
        stars: stars,
        type: type,
        item: current.branch.id,
        itemType: ReviewItemType.B,
        reviewerType: ReviewerType.C,
        comment: comment,
      };
      createReview({ variables: { input } });
    }
  };

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="rounded-xl w-[calc(100%_-_20px)]">
        <div className="flex flex-col gap-4">
          <p className="text-xl sm:text-2xl font-bold">
            {t("Make an assessment")}
          </p>
          <p className="font-bold text-sm sm:text-base">
            {t("Send us your feedback")}
          </p>
          <div className="grid gap-2 grid-cols-3 text-xs sm:text-sm">
            {ReviewTypes.map((item, i) => {
              const active = item.type === type;
              return (
                <div
                  onClick={() => setType(item.type)}
                  key={i}
                  className={cn(
                    "cursor-pointer relative border rounded-md p-1 py-2 flex flex-col gap-1 justify-center items-center",
                    active && "border-current-2"
                  )}
                >
                  {active && (
                    <div className="absolute right-1 top-1 w-5 h-5 bg-current-2 flex items-center justify-center rounded-full">
                      <Icons.check className="text-white w-4 h-4" />
                    </div>
                  )}
                  <Image
                    width={100}
                    height={100}
                    className="w-auto h-auto"
                    alt="photo"
                    src={item.icon}
                  />
                  <span className="block w-full text-center">
                    <Translate>{item.name}</Translate>
                  </span>
                </div>
              );
            })}
          </div>
          <p className="font-bold text-sm sm:text-base">{t("Rating")}</p>
          <div className="opacity-70 text-current-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const active = i < stars;
              return (
                <div
                  key={i}
                  className="cursor-pointer"
                  onClick={() => setStars(i + 1)}
                >
                  <Icons.star
                    className={`w-7 h-7 sm:w-8 sm:h-8 ${
                      active ? "fill-current-2" : ""
                    }`}
                  />
                </div>
              );
            })}
          </div>
          <p className="font-bold text-sm sm:text-base">{t("Comment")}</p>
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder={t("Comment")}
          />
          <LoadingButton
            loading={loading}
            className="bg-primary ml-auto"
            onClick={onSubmit}
          >
            {t("Send feedback")}
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
