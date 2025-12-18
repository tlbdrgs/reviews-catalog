import { useProduct } from "@/services/products";
import { useParams, Link } from "react-router-dom";
import { Rating } from "@mui/material";
import ReviewForm from "@/components/ReviewForm/ReviewForm";
import Reviews from "@/components/Reviews/Reviews";
import ReviewFormSkeleton from "@/components/ReviewForm/ReviewFormSkeleton";
import ReviewsSkeleton from "@/components/Reviews/ReviewsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { calculateAverageRating, generateImageId } from "@/lib/utils";
import { RATING_STYLES } from "@/lib/constants";

export default function DetailsPage() {
  const { productId } = useParams();
  const { product, isPending, isError } = useProduct(productId);

  if (isPending) {
    return (
      <>
        <header className="border-b-2 border-gray-200 bg-white">
          <div className="py-3 px-4 md:py-4 md:px-5">
            <Skeleton className="h-5 w-32" />
          </div>
        </header>
        <div className="p-3 md:p-5">
          <div className="mb-6 flex flex-col lg:flex-row gap-4 lg:gap-0">
            <Skeleton className="w-full lg:max-w-3xl h-[300px] rounded-lg" />
            <div className="lg:ml-12 p-4 md:p-8 lg:p-16 flex-1">
              <Skeleton className="h-12 w-3/4 mb-4 mx-auto" />
              <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 md:mb-6 my-4 md:my-8">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-2/3" />
            </div>
          </div>
          <div className="col-span-4 my-4 md:my-8 border-b-2 border-gray-200"></div>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
              <ReviewsSkeleton />
            </div>
            <div className="w-full lg:w-1/3">
              <ReviewFormSkeleton />
            </div>
          </div>
        </div>
      </>
    );
  }

  const isLoadError = isError || !product;

  const imageId = product ? generateImageId(product.id) : 0;
  const averageRating = product ? calculateAverageRating(product.reviews) : 0;

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
        {isLoadError ? (
          <div className="text-center py-20 text-gray-700 text-lg">
            Failed to load product details
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col lg:flex-row gap-4 lg:gap-0">
              <img
                className="w-full lg:max-w-3xl object-cover rounded-lg drop-shadow-xl/25"
                src={`https://picsum.photos/400/300?random=${imageId}`}
                alt={product.name}
              />

              <div className="lg:ml-12 p-4 md:p-8 lg:p-16">
                <h1 className="text-3xl md:text-5xl lg:text-7xl uppercase text-center font-bold mb-4">
                  {product.name}
                </h1>

                <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 md:mb-6 my-4 md:my-8">
                  <Rating
                    value={averageRating}
                    readOnly
                    precision={0.1}
                    size="large"
                    sx={RATING_STYLES}
                  />
                  <span className="text-sm md:text-base text-gray-600">
                    {averageRating.toFixed(2)} ({product.reviews.length}{" "}
                    {product.reviews.length === 1 ? "review" : "reviews"})
                  </span>
                </div>

                <p className="mb-6 text-base md:text-xl lg:text-2xl text-gray-700">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="col-span-4 my-4 md:my-8 border-b-2 border-gray-200"></div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/3">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Reviews
                </h2>
                <Reviews reviews={product.reviews} />
              </div>

              <div className="w-full lg:w-1/3">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Add Review
                </h2>
                <ReviewForm productId={product.id} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
