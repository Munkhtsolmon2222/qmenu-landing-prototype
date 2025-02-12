import { FilteredCard } from "@/components/cards/filteredCard";
import { useFilterContext } from "@/lib/providers/filter.context";
import Loader from "@/components/shared/loader";
import InfiniteScroll from "react-infinite-scroll-component";

function FilteredBranches() {
  const { branches, hasMore, applyFilters } = useFilterContext();

  return (
    <InfiniteScroll
      dataLength={branches.length}
      next={applyFilters}
      hasMore={hasMore}
      loader={<Loader />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
        {[...branches]
          .sort((a, b) => a.distance - b.distance)
          .map((branch, index) => (
            <div
              key={index}
              className="w-full flex flex-col items-center justify-center"
            >
              <FilteredCard place={branch} services />
            </div>
          ))}
      </div>
    </InfiniteScroll>
  );
}

export default FilteredBranches;
