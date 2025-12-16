import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
    return (
        <div className="bg-neutral-100 rounded-lg drop-shadow-xl/25 flex flex-col h-full">
            <div className="overflow-hidden rounded-t-lg flex-shrink-0">
                <Skeleton className="w-full h-48 sm:h-56 lg:h-64" />
            </div>
            <div className="flex flex-col flex-1 p-4 sm:p-5">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-5" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-8" />
                </div>
            </div>
        </div>
    );
}
