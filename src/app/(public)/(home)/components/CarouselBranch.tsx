"use client";
import BranchTypeCard from "@/components/cards/BranchTypeCard";
import HomeFilter from "@/components/shared/header/components/home/components/filter";
import { Icons } from "@/components/shared/icons";
import { useTag } from "@/hooks/useTags";
import { reviews } from "@/lib/config/categories";
import { ORDERS_ARRAY, TagType } from "@/lib/config/constant";
import { useFilterContext } from "@/lib/providers/filter.context";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";

interface Props {
  branches;
  branch?: string | null;
  plain?: boolean;
}
function CarouselBranch(props: Props) {
  const { branches, plain } = props;
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const { addFilter, removeFilter } = useFilterContext();

  const branchParam = searchParams.get("branch");

  const isActive = (filterType: string) => {
    return searchParams.get(filterType);
  };

  const handleSelectChange = (filterType: string, value: string) => {
    const currentValue = searchParams.get(filterType);
    if (currentValue !== value) {
      addFilter(filterType, value);
    } else {
      removeFilter(filterType);
    }
  };

  const { tags } = useTag(TagType.K);

  const selectFilters = [
    {
      type: "star",
      label: t("Rating"),
      options: reviews,
      valueKey: "star",
      textKey: "text",
    },
    {
      type: "food",
      label: t("National food"),
      options: tags,
      valueKey: "name",
      textKey: "name",
    },
    {
      type: "type",
      label: t("Order type"),
      options: ORDERS_ARRAY,
      valueKey: "type",
      textKey: "t",
    },
  ];

  return (
    <div className="w-full overflow-x-scroll no-scrollbar flex gap-3 flex-1 sticky top-16 md:top-20 bg-background  z-50">
      {/* <div className="flex w-full flex-row justify-between items-center">
        <h1 className="font-medium text-lg xl:text-xl">Газрууд</h1>
        <Link
          to={"/places"}
          children={
            <p className="text-current text-sm text-end font-medium">Бүгд</p>
          }
        />
      </div> */}
      <div className="py-2 flex flex-row items-center   gap-3">
        <div className="bg-background rounded-lg px-2 h-max  py-2 items-center border border-current flex ">
          <HomeFilter />
        </div>
        {selectFilters?.map((filter, index) => (
          <div key={index} className="relative">
            <select
              onChange={(e) =>
                handleSelectChange(
                  filter.type,
                  filter.type === "star"
                    ? Number(e.target.value ?? 5).toFixed(1)
                    : e.target.value
                )
              }
              value={isActive(filter.type) ?? ""}
              className={`w-max rounded-full text-nowrap font-semibold border text-sm md:text-base gap-1 px-2 py-2 pr-6 pl-3 ${
                isActive(filter.type)
                  ? "bg-current text-background"
                  : "bg-current-1"
              }`}
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option, optionIndex) => (
                <option
                  key={optionIndex}
                  value={option[filter.valueKey as keyof typeof option]}
                  className={`whitespace-nowrap w-full rounded-full font-semibold p-2 border text-sm md:text-base gap-1 ${
                    isActive(filter.type) ===
                    option[filter.valueKey as keyof typeof option]
                      ? "bg-current text-background"
                      : "bg-current-1 text-black"
                  }`}
                >
                  {filter.type === "star" && "⭐ "}
                  {t(option[filter.textKey as keyof typeof option])}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mr-2 mt-1">
              <Icons.chevronDown
                className={`w-4 h-4 ${
                  isActive(filter.type) ? "text-background" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full py-2 flex flex-row  gap-3">
        {branches?.map((place, index) => (
          <div
            key={index}
            className={`p-0 cursor-pointer `}
            onClick={() =>
              branchParam !== place.key
                ? addFilter("branch", place.key)
                : removeFilter("branch")
            }
          >
            <BranchTypeCard
              icon={place?.icons}
              name={t(place.text)}
              active={branchParam === place.key}
              plain={plain}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default CarouselBranch;
