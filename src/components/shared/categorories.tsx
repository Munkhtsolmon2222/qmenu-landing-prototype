"use client";
import { useHome } from "@/hooks/useHome";
import CategoryLoading from "@/components/cards/CategoryLoading";
import { useFilterContext } from "@/lib/providers/filter.context";
import CarouselCategories from "@/app/(public)/(home)/components/CarouselCategories";
function Categories() {
  const { loading, categories } = useHome();
  const { addFilter } = useFilterContext();

  return (
    <div className="w-full border-b flex justify-center">
      <div className={`flex max-w-[90rem]  flex-col w-full h-max pt-2 pb-3  `}>
        {loading ? (
          <CategoryLoading count={12} />
        ) : (
          <>
            {categories && (
              <CarouselCategories addFilter={addFilter} loading={loading} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Categories;
