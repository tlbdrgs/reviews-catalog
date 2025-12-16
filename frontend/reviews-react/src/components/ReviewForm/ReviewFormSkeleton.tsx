import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewFormSkeleton() {
    return (
        <div className="flex-1 flex flex-col p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="mb-4">
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="mb-4 flex-1">
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-[140px] w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    );
}
