import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsSkeleton() {
  return (
    <div className="flex-1 flex flex-col p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex-1 pr-2 space-y-3 max-h-[300px]">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 border border rounded-lg">
            <div className="flex justify-between gap-3 mb-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
