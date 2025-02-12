import { Icons } from "@/components/shared/icons";
import Loader from "@/components/shared/loader";
import { GET_MASTER_CATEGORIES } from "@/graphql/query/menu";
import { useTag } from "@/hooks/useTags";
import { branchRates, reviews } from "@/lib/config/categories";
import { ORDERS_ARRAY, TagType } from "@/lib/config/constant";
import { FilterKey } from "@/lib/providers/filter.context";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
interface Props {
  filters: string[];
  onClear: () => void;
  removeFilter: (value: string) => void;
  addFilter: (key: FilterKey, value: string) => void;
}

function ListFilter(props: Props) {
  const { filters, addFilter, removeFilter } = props;
  const { t } = useTranslation();
  const { data: categories, loading } = useQuery(GET_MASTER_CATEGORIES);

  const { tags } = useTag(TagType.K);
  const { tags: filter } = useTag(TagType.F);

  const onChangefilter = (key: FilterKey, value: string) => {
    const exits = filters?.find((e) => e === value);

    if (exits) {
      removeFilter(value);
    } else {
      addFilter(key, value);
    }
  };

  const array = [
    {
      key: "cuisine",
      name: t("Food type"),
      filters: tags?.map((e) => e.name),
    },
    {
      key: "tags",
      name: t("Advantage"),
      filters: filter?.map((e) => e.name),
    },
    {
      key: "price",
      name: t("Price"),
      filters: branchRates,
    },
    {
      key: "recommended",
      name: t("Order type"),
      filters: ORDERS_ARRAY.map((e) => e.label),
    },
    {
      key: "category",
      name: t("Category"),
      filters: categories?.getMasterCategories?.map((e) => e.name),
    },
    {
      key: "reviews",
      name: t("Ratings and comments"),
      special: true,
      filters: reviews,
    },
  ];

  if (loading) return <Loader />;
  return (
    <div className="flex gap-3 flex-col pb-6 p-4 max-h-[90vh] overflow-x-hidden">
      {array?.map((e, index: number) => {
        if (e.special)
          return (
            <div key={index} className="flex gap-2 flex-col cursor-pointer ">
              <p className="font-bold">{e.name}</p>
              <div>
                {e.filters.map((filter) => {
                  const active = filters?.find(
                    (item) => filter.star.toString() === item
                  );
                  return (
                    <div
                      key={filter.text}
                      className="flex gap-2 justify-between"
                    >
                      <div className="flex gap-2">
                        {Array.from({ length: 5 }).map((star, index) => {
                          const fill =
                            filter.star <= index ? "gray-500" : "yellow-500";
                          return (
                            <Icons.star
                              key={index}
                              className={`fill-${fill} stroke-yellow-500`}
                            />
                          );
                        })}
                        <p>{filter.text}</p>
                      </div>
                      <div
                        onClick={() => {
                          console.log(filter.star.toFixed(1));
                          onChangefilter("reviews", filter.star.toFixed(1));
                        }}
                      >
                        <div className="w-2 h-2 rounded-full border p-2 flex justify-center items-center">
                          {active && (
                            <div className="bg-current w-2 h-2 rounded-full border p-1"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        return (
          <div
            key={index}
            className="flex flex-col gap-2 w-full cursor-pointer"
          >
            <p className="font-bold">{e.name}</p>
            <div className="gap-3 no-scrollbar w-full flex flex-row md:flex-wrap overflow-y-scroll">
              {e?.filters?.map((e, index2: number) => {
                const active = filters?.find((item) => e === item);
                return (
                  <div
                    key={index2}
                    onClick={() => onChangefilter(e.key, e)}
                    className={`${
                      active ? "bg-current text-background" : " bg-secondary"
                    }  rounded-full text-nowrap px-3 py-0.5 text-sm`}
                  >
                    {e}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListFilter;
