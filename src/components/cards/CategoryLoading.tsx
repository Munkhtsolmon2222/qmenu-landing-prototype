import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  return (
    <div className="p-1 z-50 text-sm md:text-base">
      <div className="rounded-lg flex items-center justify-center">
        <Skeleton className="w-12 h-12 rounded-lg" />
      </div>
      <Skeleton className="h-4 w-20 mt-1 mx-auto" />
    </div>
  );
}

function CategoryLoading({ count = 6 }) {
  return (
    <div className="gap-3  pt-2 overflow-y-auto no-scrollbar w-full  px-2  flex flex-row">
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
    </div>
  );
}

export default CategoryLoading;
