import { Link } from "react-router-dom";
import type { Product } from "../entity/types";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const imageId = product.id.split('-').reduce((acc, part) => acc + part.charCodeAt(0), 0);
    
    return (
        <Link to={`/products/${product.id}`}>
        <div className="p-5 bg-neutral-200 rounded-lg drop-shadow-xl/25 hover:scale-[1.02] transition-all hover:drop-shadow-xl/50">
            <div>
                <img className="w-full object-cover rounded-lg"
                    src={`https://picsum.photos/400/300?random=${imageId}`} 
                    alt={product.name}
                    />
            </div>
            <div>
                <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
                {/* <p>{product.description}</p> */}
                <div className="flex justify-between ">
                    <span>
                        {product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>
        </div>
        </Link>
    );
}
