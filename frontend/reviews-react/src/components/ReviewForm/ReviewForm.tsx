import { useState } from "react";
import { Rating } from "@mui/material";
import { Button } from "../ui/button";
import { useAddReview } from "@/service/products";
import { toast } from "sonner";

type ReviewFormProps = {
  productId: string;
};

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const addReviewMutation = useAddReview(productId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!text.trim()) {
    //     setError("Please enter a review");
    //     return;
    // }

    // if (!rating || rating === 0) {
    //     setError("Please select a rating");
    //     return;
    // }

    // SWITCHED FROM ERROR STATE TO TOAST NOTIFICATIONS

    if (!text.trim()) {
      toast.error("Please enter a review");
      return;
    }
    if (!rating || rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    addReviewMutation.mutate(
      { text, rating },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully");
          setText("");
          setRating(0);
        },
        onError: (err) => {
          toast.error("Failed to submit review");
          // setError(err instanceof Error ? err.message : "Failed to submit review");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col p-6 border border-gray-200 rounded-lg bg-white shadow-sm"
    >
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Rating
        </label>
        <Rating
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#374151", // dark grey (gray-700)
            },
            "& .MuiRating-iconEmpty": {
              color: "#d1d5db", // light grey (gray-300)
            },
          }}
        />
      </div>

      <div className="mb-4 flex-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Review
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review here..."
          className={`w-full h-[140px] p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 ease-in-out`}
          disabled={addReviewMutation.isPending}
        />
      </div>

      <Button
        type="submit"
        disabled={addReviewMutation.isPending}
        className="w-full mt-auto"
      >
        {addReviewMutation.isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
