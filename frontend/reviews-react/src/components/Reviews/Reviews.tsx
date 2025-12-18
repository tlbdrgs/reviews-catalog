import type { Review } from "@/entities/types";
import ReviewItem from "./ReviewItem";

type ReviewsProps = {
  reviews: Review[];
};

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="flex-1 flex flex-col p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No reviews available for this product.
        </p>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[300px]">
          {reviews.map((review: Review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
