import { Link } from "react-router-dom";
import type { Product } from "../entity/types";
import Rating from "@mui/material/Rating";

interface ProductCardProps {
    product: Product;
}


export default function ProductCard({ product }: ProductCardProps) {
    const NumberOfReviews = product.reviews.length;
    const imageId = product.id.split('-').reduce((acc, part) => acc + part.charCodeAt(0), 0);
    const averageRating = NumberOfReviews > 0 ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / NumberOfReviews : 0;
    
    return (
        <Link to={`/products/${product.id}`}>
        <div className="bg-neutral-100 rounded-lg drop-shadow-xl/25 hover:scale-[1.01] transition-all hover:drop-shadow-xl/50 cursor-pointer group flex flex-col h-full">
            <div className="overflow-hidden rounded-t-lg flex-shrink-0">
                <img className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    src={`https://picsum.photos/400/300?random=${imageId}`} 
                    alt={product.name}
                    />
            </div>
            <div className="flex flex-col flex-1 p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">{product.name}</h2>
                <p className="text-xs mb-4 sm:mb-5 line-clamp-3 flex-1">{product.description}</p>
                <div className="flex items-center gap-2">
                    <Rating 
                        name="product-rating"
                        value={averageRating}
                        readOnly 
                        precision={0.1}
                        sx={{
                            '& .MuiRating-iconFilled': {
                                color: '#374151', // dark grey (gray-700)
                            },
                            '& .MuiRating-iconEmpty': {
                                color: '#d1d5db', // light grey (gray-300)
                            },
                        }}
                    />
                    <span className="text-xs text-gray-600">({NumberOfReviews})</span>
                </div>
            </div>
        </div>
        </Link>
    );
}
