import CategoryCard from "@/components/cards/CategoryCard";
import { useTag } from "@/hooks/useTags";
import { TagType } from "@/lib/config/constant";
import { FilterKey } from "@/lib/providers/filter.context";

interface Props {
  addFilter: (key: FilterKey, value: string | null) => void;
  loading: boolean;
}

const CarouselCategories = (props: Props) => {
  const { addFilter } = props;
  const { tags, loading } = useTag(TagType.C);

  return (
    <div className="gap-4  pt-2 overflow-y-auto no-scrollbar w-full  px-2  flex flex-row">
      {tags?.map((place, index) => (
        <div
          key={index}
          aria-disabled={loading}
          className={`cursor-pointer rounded-lg relative text-start`}
          onClick={() => addFilter("categories", place.name)}
        >
          <CategoryCard icon={place?.icon || ""} name={place.name} />
        </div>
      ))}
    </div>
  );
};

export default CarouselCategories;
