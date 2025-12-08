import { useState } from "react";
import { Rating } from "@mui/material";
import { Button } from "./button";


interface ReviewFormProps {
    productId: string;
    onReviewAdded: () => void;
}

export default function ReviewForm({ productId, onReviewAdded }: ReviewFormProps) {
    const [text, setText] = useState("");
    const [rating, setRating] = useState<number | null>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!text.trim()) {
            setError("Please enter a review");
            return;
        }
        
        if (!rating || rating === 0) {
            setError("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text, rating }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit review");
            }

            setText("");
            setRating(0);
            onReviewAdded();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col p-6 border border-gray-200 rounded-lg bg-white shadow-sm"
    >
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Rating</label>
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
        <label className="block mb-2 text-sm font-medium text-gray-700">Review</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => !text && setIsExpanded(false)}
          placeholder="Write your review here..."
          className={`w-full h-[140px] p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 ease-in-out`}
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full mt-auto">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
    );
}
