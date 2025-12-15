import React from "react";
import { useProduct } from "@/service/products";
import type { Review } from "@/entity/types";
import { useParams, Link } from "react-router-dom";
import { Rating } from "@mui/material";
import ReviewForm from "@/components/ReviewForm";
import Reviews from "@/components/Reviews";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function DetailsPage() {
    const { productId } = useParams();
    const { product, isPending, isError } = useProduct(productId);

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

    return (
        <>
            <header className="border-b-2 border-gray-200 bg-white">
                <div className="py-3 px-4 md:py-4 md:px-5">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                    >
                        <ArrowBackIcon className="h-4 w-4" />
                        Back to Catalog
                    </Link>
                </div>
            </header>
            <div className="p-3 md:p-5">
                <div className="mb-6 flex flex-col lg:flex-row gap-4 lg:gap-0">
                <img className="w-full lg:max-w-3xl object-cover rounded-lg drop-shadow-xl/25" src={`https://picsum.photos/400/300?random=${imageId}`} alt={product.name} />
            <div className="lg:ml-12 p-4 md:p-8 lg:p-16">
            <h1 className="text-3xl md:text-5xl lg:text-7xl uppercase text-center font-bold mb-4">{product.name}</h1>

            
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 md:mb-6 my-4 md:my-8">
                <Rating value={averageRating} readOnly precision={0.1} size="large" sx={{
                            '& .MuiRating-iconFilled': {
                                color: '#374151', // dark grey (gray-700)
                            },
                            '& .MuiRating-iconEmpty': {
                                color: '#d1d5db', // light grey (gray-300)
                            },
                        }} />
                <span className="text-sm md:text-base text-gray-600">
                    {averageRating.toFixed(2)} ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
                </span>
            </div>
                    <p className="mb-6 text-base md:text-xl lg:text-2xl text-gray-700">{product.description}</p>
                </div>
            </div>
            <div className='col-span-4 my-4 md:my-8 border-b-2 border-gray-200'></div>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Side - Review Section */}
                <div className="w-full lg:w-2/3">
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">Reviews</h2>
                    <Reviews reviews={product.reviews} />
                </div>
                
                {/* Right side - Review Form */}
                <div className="w-full lg:w-1/3">
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">Add Review</h2>
                    <ReviewForm productId={product.id} />
                </div>
            </div>
            </div>
        </>
    );
}