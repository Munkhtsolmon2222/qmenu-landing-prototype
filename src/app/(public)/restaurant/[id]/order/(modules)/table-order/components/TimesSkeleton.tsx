import { Skeleton } from "@/components/ui/skeleton";

export const TimesSkeleton = () => {
  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-1 no-scrollbar">
      {new Array(5).fill(null).map((_, i) => (
        <Skeleton key={i} className="h-9 min-w-20 w-20 rounded-full" />
      ))}
    </div>
  );
};
