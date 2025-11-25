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
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-white sticky top-5">
            {error && (
                <div className="mb-3 p-2 bg-red-100 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label className="block mb-1 text-sm font-medium">Rating</label>
                <Rating
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue)}
                />
            </div>

            <div className="mb-3">
                <label className="block mb-1 text-sm font-medium">Review</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={() => setIsExpanded(true)}
                    onBlur={() => !text && setIsExpanded(false)}
                    placeholder="Write your review here..."
                    className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all duration-300 ease-in-out ${
                        isExpanded ? 'min-h-[80px]' : 'min-h-[40px]'
                    }`}
                    disabled={isSubmitting}
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
        </form>
    );
}
