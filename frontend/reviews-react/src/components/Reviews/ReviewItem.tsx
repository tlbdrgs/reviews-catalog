import { useState } from "react";
import { Rating } from "@mui/material";
import type { Review } from "@/entities/types";
import { MAX_REVIEW_LENGTH, RATING_STYLES } from "@/lib/constants";

type ReviewItemProps = {
  review: Review;
};

export default function ReviewItem({ review }: ReviewItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsTruncation = review.text.length > MAX_REVIEW_LENGTH;
  const displayText =
    needsTruncation && !isExpanded
      ? review.text.slice(0, MAX_REVIEW_LENGTH) + "..."
      : review.text;

  return (
    <div className="p-4 border border rounded-lg">
      <div className="flex justify-between gap-3 mb-3">
        <Rating
          value={review.rating}
          readOnly
          size="small"
          sx={RATING_STYLES}
        />
        <p className="text-sm text-gray-500 shrink-0">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
      <p className="text-gray-700 leading-relaxed break-words overflow-wrap-anywhere">
        {displayText}
      </p>
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 text-sm text-gray-600 hover:text-gray-800 font-semibold underline-offset-2 transition-colors"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
