import React from "react";
import { useProducts } from "@/service/products";
import type { Product, Review } from "@/entity/types";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import ReviewForm from "@/components/ReviewForm";

export default function DetailsPage() {
    const { productId } = useParams();
    const { products, isPending, isError } = useProducts();
    const product: Product | undefined = products?.find(p => p.id === productId);

    if (isPending) {
        return <div>Loading product details...</div>;
    }

    if (isError || !product) {
        return <div>Failed to load product details</div>;
    }

    const imageId = product.id.split('-').reduce((acc, part) => acc + part.charCodeAt(0), 0);

    function calculateAverageRating(reviews: Review[]): number {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        return total / reviews.length;
    }

    const averageRating = calculateAverageRating(product.reviews);

    const handleReviewAdded = () => {
        // Refetch or invalidate the query to show new review
        window.location.reload();
    };

    return (
        <div className="p-5">
            <div className="max-w-md mb-6">
                <img className="w-full object-cover rounded-lg drop-shadow-xl/25" src={`https://picsum.photos/400/300?random=${imageId}`} alt={product.name} />
            </div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="mb-6">{product.description}</p>
            
            <div className="flex items-center gap-2 mb-6">
                <Rating value={averageRating} readOnly precision={0.1} />
                <span className="text-gray-600">
                    {averageRating} ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
                </span>
            </div>
            
            <div className="flex gap-6">
                {/* Left Side - Review Section */}
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
                    {product.reviews.length === 0 ? (
                        <p>No reviews available for this product.</p>
                    ) : (
                        <div className="max-h-[300px] overflow-y-auto pr-2">
                            {product.reviews.map((review: Review) => (
                                <div key={review.id} className="mb-4 p-4 border rounded bg-white">
                                    <p className="mb-2">{review.text}</p>
                                    <Rating value={review.rating} readOnly size="small" />
                                    <p className="text-sm text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Right side - Review Form */}
                <div className="w-96">
                    <h2 className="text-2xl font-semibold mb-3">Add Review</h2>
                    <ReviewForm productId={product.id} onReviewAdded={handleReviewAdded} />
                </div>
            </div>
        </div>
    );
}